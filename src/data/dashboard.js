export const dashboardNavItems = [
  { label: '概览', icon: 'dashboard', to: '/dashboard' },
  { label: '科研进度', icon: 'analytics', to: '/dashboard/progress' },
  { label: '资源对接', icon: 'school', to: '/dashboard/resources' },
  { label: '消息', icon: 'description', to: '/dashboard/messages' },
]

export const dashboardTasks = [
  { label: '完成科研方向初稿', done: true, tag: null, due: '已完成', category: '输出任务' },
  { label: '与导师确认课题参与', done: false, tag: 'urgent', tagLabel: '紧急', due: '周三前', category: '导师沟通' },
  { label: '阅读 3 篇目标方向文献', done: false, tag: 'learning', tagLabel: '学习', due: '本周内', category: '阅读任务' },
  { label: '预约下次复盘会议', done: false, tag: 'meeting', tagLabel: '会议', due: '周五前', category: '导师沟通' },
]

export const dashboardMessages = [
  {
    id: 'msg-report',
    type: 'system',
    icon: 'description',
    title: '科研诊断报告已生成',
    body: '根据你上周提交的背景资料，导师已完成初步评估，点击查看详情及建议。',
    time: '1 小时前',
    unread: true,
    cta: '查看报告',
    detail:
      '系统已根据你最近一次测评结果、当前服务阶段和任务推进情况生成最新诊断报告。建议优先查看“方向清晰度”和“时间规划”两个维度的变化，再决定是否进入下一轮科研训练。',
  },
  {
    id: 'msg-mentor',
    type: 'mentor',
    icon: 'mark_chat_unread',
    title: '导师回复了你的问题',
    body: '关于深度学习课题的研究方向，导师给出了详细反馈。',
    time: '昨天 18:45',
    unread: true,
    cta: '查看反馈',
    detail:
      '导师建议你先收窄为“教育场景中的学习分析”这一细分方向，再去阅读更聚焦的文献。现阶段不建议同时追两个完全不同的方法路径。',
  },
  {
    id: 'msg-seminar',
    type: 'event',
    icon: 'school',
    title: '本周六线上研讨会开放报名',
    body: '主题为“跨学科研究如何成为申请亮点”，目前仍有少量席位。',
    time: '昨天 10:20',
    unread: false,
    cta: '立即报名',
    detail:
      '本次研讨会将围绕 AI+教育、社会学+数据分析等方向展开，适合目前处于方向探索期和科研起步期的用户。',
  },
  {
    id: 'msg-review',
    type: 'system',
    icon: 'psychology',
    title: '本周复盘建议已更新',
    body: '系统发现你最近的任务完成率提升，但文献归纳仍缺少稳定输出。',
    time: '2 天前',
    unread: false,
    cta: '查看任务',
    detail:
      '建议你下周把“阅读 3 篇文献”调整为“阅读 2 篇 + 完成 1 次文献归纳整理”，避免继续停留在输入状态。',
  },
  {
    id: 'msg-resource',
    type: 'mentor',
    icon: 'hub',
    title: '新的资源匹配建议已生成',
    body: '系统为你解锁了 2 个与当前研究兴趣匹配的导师画像和 1 场公开活动。',
    time: '3 天前',
    unread: false,
    cta: '查看资源',
    detail:
      '当前推荐更适合“教育心理交叉”方向的用户，若你准备进一步锁定问题意识，可以先从这两个导师画像对应的研究主题入手。',
  },
  {
    id: 'msg-reminder',
    type: 'event',
    icon: 'calendar_today',
    title: '下次复盘会议提醒',
    body: '你的下次复盘时间为 4 月 22 日下午 14:30，请提前整理本周输出材料。',
    time: '4 天前',
    unread: false,
    cta: '查看安排',
    detail:
      '复盘前建议准备：本周任务完成情况、1 份方向初稿、1 份文献笔记摘要，以及你最希望导师帮助判断的问题。',
  },
]

export const dashboardReviewFeedback = [
  {
    title: '做得好的点',
    body: '你已经开始稳定推进高价值任务，本周最强信号是主动完成了科研方向初稿。',
    icon: 'thumb_up',
    iconColor: 'text-emerald-600',
  },
  {
    title: '当前风险点',
    body: '文献阅读与导师沟通之间还没形成连接，容易继续停留在“读了很多但没有沉淀”。',
    icon: 'warning',
    iconColor: 'text-yellow-600',
  },
  {
    title: '下周建议',
    body: '优先完成 1 次针对目标方向的文献归纳，再带着问题去约下一次复盘，效率会明显更高。',
    icon: 'flag',
    iconColor: 'text-primary',
  },
]

export const dashboardRecommendedActions = [
  {
    title: '继续阅读本周文献',
    body: '先把 3 篇目标方向文献按统一模板做成可复用笔记。',
  },
  {
    title: '预约下一次复盘',
    body: '把方向初稿和阅读问题带进咨询，减少无效推进。',
  },
  {
    title: '查看相关文章',
    body: '先补一篇“方向诊断”和一篇“文献阅读模板”文章，再进入下一轮任务。',
  },
]

export const progressMilestones = [
  { phase: '第 1 周', title: '完成背景诊断', status: '已完成', note: '已梳理当前经历、目标方向与短板。' },
  { phase: '第 2 周', title: '锁定研究兴趣主题', status: '已完成', note: '从泛方向收窄到教育心理交叉场景。' },
  { phase: '第 3 周', title: '建立核心文献池', status: '进行中', note: '已完成首批 8 篇核心文献筛选。' },
  { phase: '第 4 周', title: '完成第一次文献归纳', status: '即将开始', note: '下一步重点是把输入转成结构化输出。' },
  { phase: '第 5 周', title: '与导师做中期对齐', status: '即将开始', note: '将围绕方向初稿与方法理解进行沟通。' },
]

export const resourceCards = [
  {
    type: '导师画像',
    title: '教育心理交叉研究导师画像 A',
    desc: '更适合正在从教育学或心理学课程背景过渡到研究问题聚焦的用户。',
    tags: ['方向初步', 'PhD 意向'],
    status: '推荐中',
  },
  {
    type: '实验室机会',
    title: '学习分析方向线上助研机会',
    desc: '适合希望补充研究协作经历、但暂时还无法进入线下课题组的用户。',
    tags: ['科研空白', '备战期'],
    status: '可申请',
  },
  {
    type: '公开活动',
    title: '跨学科研究趋势线上研讨会',
    desc: '帮助用户判断“AI+教育”和“社会学+数据分析”类交叉主题的表达方式。',
    tags: ['方向不清', '高焦虑'],
    status: '已收藏',
  },
  {
    type: '海外项目',
    title: '短期研究访问项目画像',
    desc: '适合准备在后续申请材料中补充国际化研究经历的用户。',
    tags: ['冲刺期', '资源对接'],
    status: '待沟通',
  },
  {
    type: '导师画像',
    title: '社会科学方法方向导师画像 B',
    desc: '更适合需要补强研究方法理解和文献综述表达的用户。',
    tags: ['时间规划弱', '科研空白'],
    status: '推荐中',
  },
]

export const savedResources = [
  { title: '教育心理交叉研究导师画像 A', nextStep: '预约匹配咨询' },
  { title: '学习分析方向线上助研机会', nextStep: '整理申请材料' },
  { title: '跨学科研究趋势线上研讨会', nextStep: '加入本周计划' },
]
