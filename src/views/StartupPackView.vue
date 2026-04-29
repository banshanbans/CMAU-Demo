<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div class="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden"
             style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
          <div class="absolute top-0 right-0 p-6 opacity-[0.04] pointer-events-none">
            <span class="material-symbols-outlined text-[120px]">school</span>
          </div>
          <p class="text-xs font-bold tracking-widest uppercase text-primary mb-4">Service Detail</p>
          <h1 class="font-headline font-bold text-4xl tracking-tight text-primary mb-4">科研启动包</h1>
          <p class="text-lg text-on-surface-variant leading-relaxed max-w-2xl mb-6">
            面向科研起步、方向不清、焦虑感较强但已有明确升学意向的学生，
            用 3 个月把“还没开始”推进到“知道该怎么做、每周在做什么”。
          </p>
          <div class="flex flex-wrap gap-2 mb-8">
            <TagChip color="yellow">科研空白</TagChip>
            <TagChip color="blue">方向不清</TagChip>
            <TagChip color="red">高焦虑</TagChip>
            <TagChip color="purple">备战期</TagChip>
          </div>
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/assessment"
              class="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined text-[20px]">bolt</span>
              回到测评
            </router-link>
            <router-link to="/consult"
              class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-8 py-4 rounded-xl font-bold hover:bg-surface-container-high transition-all">
              立即预约咨询
              <span class="material-symbols-outlined text-[20px]">event_available</span>
            </router-link>
          </div>
        </div>

        <div class="lg:col-span-4 flex flex-col gap-5">
          <div class="blue-banner text-white rounded-2xl p-7"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.06)">
            <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-2">Package Price</p>
            <p class="font-headline font-bold text-4xl mb-1">¥4,999</p>
            <p class="text-sm text-white/80 mb-5">3 个月进阶计划 · 12 周 milestones</p>
            <div class="space-y-3 text-sm">
              <div v-for="item in summaryItems" :key="item.label" class="flex justify-between gap-4">
                <span class="text-white/70">{{ item.label }}</span>
                <span class="font-semibold text-white text-right">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/15">
            <p class="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">lightbulb</span>
              适合你的原因
            </p>
            <p class="text-sm text-on-surface-variant leading-relaxed">
              如果你科研基础较弱、方向还不够清晰，启动包会把接下来 12 周拆成可完成的阅读、
              选题和表达任务。
            </p>
          </div>
        </div>
      </section>

      <section class="bg-surface-container-lowest rounded-2xl p-8 mb-10"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
        <div class="flex items-center justify-between gap-6 mb-8">
          <div>
            <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">3 个月 × 12 周里程碑</h2>
            <p class="text-sm text-on-surface-variant">每一周都有明确任务、反馈重点和阶段产出。</p>
          </div>
          <div class="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary">
            <span>Week by Week</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div v-for="stage in milestoneStages" :key="stage.title"
            class="bg-surface-container-low rounded-2xl p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-xs font-bold tracking-widest uppercase text-primary mb-2">{{ stage.phase }}</p>
                <h3 class="font-headline font-bold text-xl text-on-surface">{{ stage.title }}</h3>
              </div>
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-[20px]">{{ stage.icon }}</span>
              </div>
            </div>
            <div class="space-y-3">
              <div v-for="item in stage.weeks" :key="item.week"
                class="bg-white rounded-xl p-4 border border-outline-variant/10">
                <p class="text-[11px] font-bold tracking-widest uppercase text-on-surface-variant mb-1">{{ item.week }}</p>
                <p class="text-sm font-semibold text-on-surface mb-1">{{ item.title }}</p>
                <p class="text-sm text-on-surface-variant leading-relaxed">{{ item.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div class="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-8"
             style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
          <div class="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">导师支持方向</h2>
              <p class="text-sm text-on-surface-variant">根据你的学科兴趣和申请目标，匹配相近方向的导师反馈资源。</p>
            </div>
            <span class="text-[10px] font-bold tracking-widest uppercase text-primary">导师资源</span>
          </div>

          <div class="space-y-4">
            <div v-for="mentor in mentors" :key="mentor.name"
              class="bg-surface-container-low rounded-2xl p-5">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-headline font-bold text-on-surface flex-shrink-0">
                  {{ mentor.badge }}
                </div>
                <div class="flex-1">
                  <div class="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p class="font-semibold text-on-surface">{{ mentor.name }}</p>
                      <p class="text-sm text-on-surface-variant">{{ mentor.title }}</p>
                    </div>
                    <span class="px-2 py-1 rounded-full bg-white text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
                      资源方向
                    </span>
                  </div>
                  <p class="text-sm text-on-surface mb-2">{{ mentor.focus }}</p>
                  <p class="text-sm text-on-surface-variant leading-relaxed">{{ mentor.note }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-8"
             style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
          <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">适合你的情况</h2>
          <p class="text-sm text-on-surface-variant mb-6">以下情况通常适合先从 3 个月基础训练开始。</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div v-for="match in tagMatches" :key="match.tag"
              class="bg-surface-container-low rounded-2xl p-5 border-l-4 border-primary/40">
              <div class="mb-3">
                <TagChip :color="match.color">{{ match.tag }}</TagChip>
              </div>
              <p class="font-semibold text-on-surface mb-2">{{ match.title }}</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ match.body }}</p>
            </div>
          </div>

          <div class="blue-banner rounded-2xl p-6 text-white">
            <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-2">Recommended Path</p>
            <p class="text-sm leading-relaxed text-white">
              科研启动包适合需要建立方向、补齐阅读基础并获得外部推进节奏的学生。
            </p>
          </div>
        </div>
      </section>

      <section class="bg-surface-container-lowest rounded-2xl p-8 mb-12"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">学员阶段变化</h2>
            <p class="text-sm text-on-surface-variant">以下为典型学员路径，呈现 3 个月训练前后的准备度变化。</p>
          </div>
          <span class="text-[10px] font-bold tracking-widest uppercase text-primary">案例路径</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-4 bg-surface-container-low rounded-2xl p-6">
            <p class="text-xs font-bold tracking-widest uppercase text-primary mb-3">案例概况</p>
            <h3 class="font-headline font-bold text-xl text-on-surface mb-2">李同学 · 经济学本科</h3>
            <p class="text-sm text-on-surface-variant leading-relaxed mb-4">
              目标申请海外硕士，之前只有课程论文经历，没有形成稳定研究兴趣，也缺乏申请推进节奏。
            </p>
            <div class="flex flex-wrap gap-2 mb-5">
              <TagChip color="yellow">科研空白</TagChip>
              <TagChip color="blue">方向初步</TagChip>
              <TagChip color="red">高焦虑</TagChip>
            </div>
            <div class="space-y-3 text-sm">
              <div v-for="item in caseSummary" :key="item.label" class="flex justify-between gap-4">
                <span class="text-on-surface-variant">{{ item.label }}</span>
                <span class="font-semibold text-on-surface text-right">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center">
                <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Before</p>
                <RadarChart :scores="beforeScores" :labels="radarLabels" :size="240" />
                <p class="text-sm text-on-surface-variant mt-5 text-center leading-relaxed">
                  进入服务前：目标模糊，科研阅读零散，最突出的问题是焦虑感大于行动感。
                </p>
              </div>
              <div class="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center">
                <p class="text-xs font-bold tracking-widest uppercase text-primary mb-4">After</p>
                <RadarChart :scores="afterScores" :labels="radarLabels" :size="240" />
                <p class="text-sm text-on-surface-variant mt-5 text-center leading-relaxed">
                  3 个月后：明确了研究题目方向，完成基础文献库搭建，并能按周推进阅读与表达任务。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="text-center">
        <h2 class="font-headline font-bold text-2xl text-on-surface mb-3">先确认它是否适合你</h2>
        <p class="text-on-surface-variant mb-7">完成测评后，你可以更清楚地判断是否需要启动 12 周训练。</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/assessment"
            class="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-xl shadow-black/10">
            先做免费测评
            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
          </router-link>
          <router-link to="/services"
            class="inline-flex items-center justify-center gap-2 bg-surface-container-lowest text-on-surface px-10 py-4 rounded-xl font-bold border border-outline-variant/20 hover:bg-white transition-all">
            查看全部服务
            <span class="material-symbols-outlined text-[20px]">apps</span>
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import AppNav from '../components/AppNav.vue'
import RadarChart from '../components/RadarChart.vue'
import TagChip from '../components/TagChip.vue'

const summaryItems = [
  { label: '服务周期', value: '12 周' },
  { label: '适配阶段', value: '科研起步 / 备战期' },
  { label: '交付形式', value: '诊断 + 周任务 + 复盘' },
]

const milestoneStages = [
  {
    phase: '第 1 月',
    title: '方向诊断与文献起步',
    icon: 'explore',
    weeks: [
      { week: 'Week 1', title: '背景诊断', body: '梳理现有经历、目标国家和申请方向，明确当前最薄弱的一环。' },
      { week: 'Week 2', title: '方向初筛', body: '从兴趣、学科基础和可执行性三方面收窄细分研究主题。' },
      { week: 'Week 3', title: '文献入口搭建', body: '建立第一批核心文献池，学会区分综述、方法和实证文章。' },
      { week: 'Week 4', title: '阅读节奏建立', body: '固定每周阅读模板，开始输出简短阅读笔记和问题清单。' },
    ],
  },
  {
    phase: '第 2 月',
    title: '课题理解与研究训练',
    icon: 'science',
    weeks: [
      { week: 'Week 5', title: '研究问题拆解', body: '把泛方向进一步拆成可讨论的问题意识和变量关系。' },
      { week: 'Week 6', title: '方法认识', body: '识别目标方向常见研究方法，知道不同方法分别回答什么问题。' },
      { week: 'Week 7', title: '小型训练任务', body: '围绕一个主题完成一次资料整理、问题归纳或 mini proposal 练习。' },
      { week: 'Week 8', title: '中期复盘', body: '复盘节奏执行情况，重新校正研究兴趣、学习负担和申请优先级。' },
    ],
  },
  {
    phase: '第 3 月',
    title: '写作表达与成果打磨',
    icon: 'edit_note',
    weeks: [
      { week: 'Week 9', title: '表达结构训练', body: '把“读了什么、想做什么、为什么值得做”讲清楚。' },
      { week: 'Week 10', title: '初稿产出', body: '完成一份研究兴趣陈述、文献综述片段或 RP 雏形。' },
      { week: 'Week 11', title: '反馈迭代', body: '根据导师或教练反馈调整逻辑、表达和证据支撑方式。' },
      { week: 'Week 12', title: '阶段总结', body: '整理 3 个月成果，输出下一阶段可继续推进的学习路径。' },
    ],
  },
]

const mentors = [
  {
    badge: 'LSE',
    name: '导师画像 A',
    title: '社会科学研究方法方向',
    focus: '擅长把零散学术兴趣收束为可申请叙事，并建立文献阅读框架。',
    note: '适合问题意识和研究表达较弱、需要先完成“看懂文献”和“说清兴趣”的学生。',
  },
  {
    badge: 'UCL',
    name: '导师画像 B',
    title: '教育 / 心理交叉研究方向',
    focus: '擅长引导初学者从课程论文过渡到更规范的研究表达和任务推进。',
    note: '适合已准备升学但执行混乱、需要外部督导和节奏拆解的学生。',
  },
]

const tagMatches = [
  {
    tag: '科研空白',
    color: 'yellow',
    title: '明确第一批阅读材料',
    body: '用文献入口、阅读模板和研究问题拆解替代无序搜索，让起步变具体。',
  },
  {
    tag: '方向不清',
    color: 'blue',
    title: '把兴趣收束为可讨论的选题',
    body: '通过导师沟通和问题梳理，把“想读这个专业”转成“我想研究这个问题”。',
  },
  {
    tag: '高焦虑',
    color: 'red',
    title: '建立稳定推进节奏',
    body: '把训练拆成每周任务，帮助你减少拖延和反复调整。',
  },
  {
    tag: '备战期',
    color: 'purple',
    title: '补齐申请前的科研基础',
    body: '用 3 个月完成基础研究训练，为后续更深的科研陪跑或申请准备打底。',
  },
]

const radarLabels = ['科研积累', '方向清晰度', '时间规划', '核心竞争力', '英语能力']
const beforeScores = [0.2, 0.3, 0.25, 0.28, 0.55]
const afterScores = [0.48, 0.68, 0.62, 0.5, 0.58]

const caseSummary = [
  { label: '进入服务前', value: '只有课程论文经历' },
  { label: '选择服务', value: '科研启动包' },
  { label: '3 个月后', value: '形成方向 + 文献库 + RP 雏形' },
]
</script>
