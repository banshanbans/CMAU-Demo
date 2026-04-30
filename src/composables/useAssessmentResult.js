export const ASSESSMENT_STORAGE_KEY = 'jianshuo_assessment'

export const radarLabels = ['科研积累', '方向清晰度', '时间规划', '核心竞争力', '英语能力']

const defaultAnswers = {
  0: ['ug'],
  1: ['phd'],
  2: ['paper'],
  3: ['active'],
  4: ['high'],
}

const planCatalog = {
  startup: {
    key: 'startup',
    name: '科研启动包',
    badge: '推荐',
    price: '¥4,999',
    period: '3个月进阶计划',
    link: '/services/startup-pack',
    cta: '了解详情',
    features: ['定制化科研文献库建设（1v1）', '每周学术进度督导及复盘报告', '核心期刊论文写作基础课程'],
  },
  mentor: {
    key: 'mentor',
    name: '导师配对与科研陪跑',
    badge: '深度服务',
    price: '¥12,800',
    period: '6个月起',
    link: '/consult',
    cta: '预约咨询',
    features: ['海外博士导师 1v1 深度沟通', '现有科研背景及 RP 雏形诊断', '申请院校梯度及专业方向锚定'],
  },
  full: {
    key: 'full',
    name: '全程陪跑套餐',
    badge: '旗舰',
    price: '¥16,800',
    period: '12个月',
    link: '/consult',
    cta: '预约咨询',
    features: ['申请材料节奏统筹', '科研表达与项目叙事整合', '关键节点复盘与风险提醒'],
  },
  consult: {
    key: 'consult',
    name: '单次方向咨询',
    badge: '单次咨询',
    price: '¥800',
    period: '60分钟专家咨询',
    link: '/consult',
    cta: '预约咨询',
    features: ['当前背景与目标方向诊断', '两周行动优先级拆解', '后续服务路径建议'],
  },
}

function toPlainAnswers(answerSets) {
  return Object.fromEntries(
    Object.entries(answerSets).map(([key, value]) => [
      key,
      Array.isArray(value) ? value : Array.from(value ?? []),
    ])
  )
}

function normalizeAnswers(payload) {
  const raw = payload?.answers ?? payload ?? defaultAnswers
  return Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [
      key,
      Array.isArray(value) ? value : Array.from(value ?? []),
    ])
  )
}

function selected(answers, step) {
  return answers[step] ?? []
}

function hasAny(values, candidates) {
  return values.some((value) => candidates.includes(value))
}

function clamp(value) {
  return Math.max(0.2, Math.min(0.9, Number(value.toFixed(2))))
}

export function saveAssessmentAnswers(answerSets) {
  const payload = {
    version: 1,
    submittedAt: new Date().toISOString(),
    answers: toPlainAnswers(answerSets),
  }
  localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(payload))
  return payload
}

export function loadAssessmentAnswers() {
  try {
    const raw = localStorage.getItem(ASSESSMENT_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function buildAssessmentResult(payload = loadAssessmentAnswers()) {
  const answers = normalizeAnswers(payload)
  const target = selected(answers, 1)
  const research = selected(answers, 2)
  const stage = selected(answers, 3)[0]
  const anxiety = selected(answers, 4)[0]

  const hasResearchOutput = research.includes('pub')
  const hasResearchBase = hasAny(research, ['paper', 'project'])
  const isResearchBlank = research.includes('none') || research.length === 0
  const isHighAnxiety = hasAny([anxiety], ['high', 'extreme'])
  const isFinal = stage === 'final'
  const isActive = stage === 'active'
  const isPhd = target.includes('phd')

  const researchTag = hasResearchOutput
    ? { label: '有积累', color: 'green' }
    : hasResearchBase
      ? { label: '科研初级', color: 'yellow' }
      : { label: '科研空白', color: 'yellow' }

  const directionTag = isPhd
    ? { label: 'PhD 意向', color: 'teal' }
    : target.length > 1
      ? { label: '方向初步', color: 'blue' }
      : { label: '方向聚焦', color: 'blue' }

  const stageTag = isFinal
    ? { label: '冲刺期', color: 'purple' }
    : isActive
      ? { label: '备战期', color: 'purple' }
      : { label: '探索期', color: 'gray' }

  const anxietyTag = isHighAnxiety
    ? { label: '高焦虑', color: 'red' }
    : { label: '平稳型', color: 'green' }

  const researchScore = hasResearchOutput ? 0.75 : research.includes('project') ? 0.55 : research.includes('paper') ? 0.45 : 0.25
  const directionScore = target.length <= 1 ? 0.68 : target.length === 2 ? 0.58 : 0.48
  const timeScore = ({ early: 0.35, plan: 0.52, active: 0.65, final: 0.75 })[stage] ?? 0.5
  const anxietyScore = ({ calm: 0.7, mild: 0.58, high: 0.42, extreme: 0.32 })[anxiety] ?? 0.5
  const competitivenessScore = clamp(researchScore * 0.62 + directionScore * 0.22 + timeScore * 0.16 - (isPhd && researchScore < 0.55 ? 0.08 : 0))
  const englishScore = 0.6
  const radarScores = [
    clamp(researchScore),
    clamp(directionScore),
    clamp(timeScore),
    competitivenessScore,
    englishScore,
  ]
  const readinessPercent = Math.round((radarScores.reduce((sum, score) => sum + score, 0) / radarScores.length) * 100)

  const recommendedPlan = isFinal
    ? planCatalog.full
    : isPhd && hasResearchOutput
      ? planCatalog.mentor
      : isResearchBlank || isHighAnxiety
        ? planCatalog.startup
        : planCatalog.consult

  const statusTitle = isFinal
    ? '申请冲刺期'
    : isActive
      ? '备战推进期'
      : stage === 'plan'
        ? '规划建立期'
        : '方向探索期'

  const conclusion = isFinal
    ? '你已经进入申请冲刺阶段，当前重点是整合科研表达、申请材料和时间节点，避免关键任务分散推进。'
    : isResearchBlank
      ? '你的科研积累仍处于起步阶段，建议先建立文献入口、研究问题意识和每周任务节奏。'
      : isPhd && hasResearchOutput
        ? '你已经具备一定科研积累，下一步应把成果转化为更清晰的导师沟通和申请叙事。'
        : '你已经进入准备期，但科研积累和方向表达还不够稳定，建议先收窄研究方向并保持每周推进。'

  return {
    answers,
    submittedAt: payload?.submittedAt,
    tags: [researchTag, directionTag, stageTag, anxietyTag],
    tagLabels: [researchTag.label, directionTag.label, stageTag.label, anxietyTag.label],
    statusTitle,
    radarLabels,
    radarScores,
    readinessPercent,
    peerPercent: Math.min(92, Math.max(55, readinessPercent + 24)),
    recommendedPlan,
    serviceStage: recommendedPlan.key === 'startup' ? '第 1 月 / 共 3 月' : recommendedPlan.key === 'full' ? '规划中 / 共 12 月' : '待预约',
    conclusion,
    dimensionDetails: [
      {
        label: '科研积累',
        score: radarScores[0],
        note: hasResearchOutput ? '已有论文、竞赛或阶段性成果，可继续强化成果表达' : hasResearchBase ? '已有课程论文或课题经历，需进一步形成稳定研究产出' : '目前科研经历较少，建议先建立文献阅读和问题拆解入口',
      },
      {
        label: '方向清晰度',
        score: radarScores[1],
        note: target.length <= 1 ? '目标方向相对聚焦，可继续细化到具体议题' : '目标方向较多，建议先收窄优先级和目标场景',
      },
      {
        label: '时间规划',
        score: radarScores[2],
        note: isFinal ? '申请季临近，建议把材料、科研表达和沟通节点统一排期' : isActive ? '已有推进意识，下一步要把任务拆到每周交付' : '准备节奏仍需建立，建议先明确未来 2-4 周行动',
      },
      {
        label: '核心竞争力',
        score: radarScores[3],
        note: isPhd ? 'PhD 申请更依赖可验证研究表达，需要强化导师沟通材料' : '当前竞争力取决于科研经历、项目叙事和可沉淀成果',
      },
      {
        label: '英语能力',
        score: radarScores[4],
        note: '当前问卷尚未采集语言成绩，建议后续补充标化考试和学术表达评估',
      },
    ],
  }
}

export function getDefaultAssessmentResult() {
  return buildAssessmentResult({ version: 1, answers: defaultAnswers })
}
