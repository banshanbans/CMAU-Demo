<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-16 mb-10">
        <div class="lg:col-span-7">
          <p class="text-xs font-bold tracking-widest text-primary uppercase mb-4">Research Scholar Platform</p>
          <h1 class="font-headline font-bold text-4xl md:text-5xl tracking-tight text-primary leading-tight mb-5">
            用数据化诊断，帮你把科研准备变成一条可执行的升学路径。
          </h1>
          <p class="text-lg text-on-surface-variant leading-relaxed max-w-2xl mb-8">
            见数不是“申请代理”，而是先判断你当前的科研准备度，再给出提升方案与国际资源对接路径，
            让测评、服务和持续陪跑连成一个完整产品闭环。
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/assessment"
              class="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined text-[20px]">bolt</span>
              免费开始测评
            </router-link>
            <router-link to="/services"
              class="inline-flex items-center justify-center gap-2 bg-surface-container-lowest text-on-surface px-8 py-4 rounded-xl font-bold border border-outline-variant/20 hover:bg-white transition-all">
              查看服务体系
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </router-link>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.05)">
            <div class="absolute -right-8 -top-8 w-32 h-32 bg-primary-soft/30 rounded-full blur-3xl pointer-events-none" />
            <div class="relative">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <span class="material-symbols-outlined filled text-[24px]">analytics</span>
                </div>
                <div>
                  <p class="text-xs font-bold tracking-widest text-primary uppercase">3 秒理解产品</p>
                  <p class="text-sm text-on-surface-variant">诊断当前状态，再匹配提升服务</p>
                </div>
              </div>

              <div class="space-y-4">
                <div v-for="item in heroPoints" :key="item.title"
                  class="flex items-start gap-4 bg-surface-container-low rounded-xl p-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-white text-primary flex-shrink-0">
                    <span class="material-symbols-outlined text-[20px]">{{ item.icon }}</span>
                  </div>
                  <div>
                    <p class="font-semibold text-on-surface mb-1">{{ item.title }}</p>
                    <p class="text-sm text-on-surface-variant leading-relaxed">{{ item.body }}</p>
                  </div>
                </div>
              </div>

              <div class="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-bold">
                <span class="w-2 h-2 rounded-full bg-primary"></span>
                从陌生访客到测评用户的第一跳
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="stat in trustStats" :key="stat.label"
            class="bg-surface-container-lowest rounded-2xl p-6"
            style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">{{ stat.label }}</p>
            <p class="font-headline font-bold text-3xl text-primary mb-1">{{ stat.value }}</p>
            <p class="text-sm text-on-surface-variant">{{ stat.note }}</p>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <div class="flex items-center justify-between mb-8 gap-6">
          <div>
            <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">从诊断到服务的三层闭环</h2>
            <p class="text-sm text-on-surface-variant">首页只做极简预览，完整方案在服务页展开。</p>
          </div>
          <router-link to="/services"
            class="text-primary font-bold text-sm whitespace-nowrap hover:underline">
            查看完整服务体系
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <router-link v-for="layer in layers" :key="layer.title" to="/services"
            class="group bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <div class="absolute top-0 right-0 p-6 opacity-[0.05] pointer-events-none">
              <span class="material-symbols-outlined text-[80px]">{{ layer.bgIcon }}</span>
            </div>
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              :class="layer.iconBg">
              <span class="material-symbols-outlined text-[24px]" :class="layer.iconColor">{{ layer.icon }}</span>
            </div>
            <p class="text-xs font-bold tracking-widest uppercase mb-2" :class="layer.labelColor">{{ layer.step }}</p>
            <h3 class="font-headline font-bold text-xl text-on-surface mb-3">{{ layer.title }}</h3>
            <p class="text-sm text-on-surface-variant leading-relaxed mb-5">{{ layer.desc }}</p>
            <div class="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              进入服务页
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </router-link>
        </div>
      </section>

      <section class="mb-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">找找你是哪一种用户</h2>
            <p class="text-sm text-on-surface-variant">四类典型画像都能直通同一套测评，但看到的是不同问题感受。</p>
          </div>
          <router-link to="/assessment"
            class="text-primary font-bold text-sm whitespace-nowrap hover:underline">
            直接进入测评
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <router-link v-for="persona in personas" :key="persona.title" to="/assessment"
            class="group bg-surface-container-lowest rounded-2xl p-7 border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
            style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <div class="flex items-start justify-between gap-5 mb-5">
              <div>
                <p class="text-xs font-bold tracking-widest uppercase text-primary mb-2">{{ persona.kicker }}</p>
                <h3 class="font-headline font-bold text-xl text-on-surface mb-2">{{ persona.title }}</h3>
                <p class="text-sm text-on-surface-variant leading-relaxed">{{ persona.pain }}</p>
              </div>
              <div class="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:bg-primary-soft/25 group-hover:text-primary transition-colors flex-shrink-0">
                <span class="material-symbols-outlined text-[22px]">{{ persona.icon }}</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mb-5">
              <TagChip v-for="tag in persona.tags" :key="tag.text" :color="tag.color">
                {{ tag.text }}
              </TagChip>
            </div>

            <div class="flex items-center justify-between pt-5 border-t border-surface-container-high">
              <span class="text-sm font-semibold text-on-surface">{{ persona.goal }}</span>
              <span class="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                找找你是哪种
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import AppNav from '../components/AppNav.vue'
import TagChip from '../components/TagChip.vue'

const heroPoints = [
  {
    icon: 'quiz',
    title: '先判断你在哪个阶段',
    body: '用 5 分钟测评识别科研积累、方向清晰度、时间规划和焦虑状态。',
  },
  {
    icon: 'conversion_path',
    title: '再决定你需要什么服务',
    body: '根据标签把用户从诊断页自然引导到最匹配的科研提升方案，而不是一上来卖套餐。',
  },
  {
    icon: 'forum',
    title: '最后进入持续陪跑',
    body: '把咨询、任务、复盘和资源对接放进一个连续流程，而不是一次性交易。',
  },
]

const trustStats = [
  { label: '高校合作', value: '3000+', note: '高校合作资源网络，支撑科研提升和导师匹配场景。' },
  { label: '企业客户', value: '4000+', note: '成熟数据服务基础，让“诊断层”具备可信度。' },
  { label: '海外节点', value: 'Credamo Inc.', note: '美国分公司与国际合作网络，承接对接层叙事。' },
]

const layers = [
  {
    step: '第 1 层',
    title: '诊断',
    desc: '先判断用户当前的科研准备状态，给出标签和优先行动建议。',
    icon: 'biotech',
    bgIcon: 'search',
    iconBg: 'bg-primary-soft/30',
    iconColor: 'text-primary',
    labelColor: 'text-primary',
  },
  {
    step: '第 2 层',
    title: '提升',
    desc: '围绕科研方向、文献理解、课题参与和写作训练进行能力提升。',
    icon: 'school',
    bgIcon: 'auto_stories',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    labelColor: 'text-blue-600',
  },
  {
    step: '第 3 层',
    title: '对接',
    desc: '把已形成的科研积累接入国际院校与资源网络，承接升学出口。',
    icon: 'public',
    bgIcon: 'flight',
    iconBg: 'bg-primary-soft',
    iconColor: 'text-primary',
    labelColor: 'text-primary',
  },
]

const personas = [
  {
    kicker: '本科起步型',
    title: '本科生，想做科研但不知道从哪开始',
    pain: '没有实验室经历，信息很多但抓不住重点，担心起步太晚。',
    goal: '先建立科研方向感',
    icon: 'school',
    tags: [
      { text: '科研空白', color: 'yellow' },
      { text: '方向不清', color: 'blue' },
      { text: '轻焦虑', color: 'gray' },
    ],
  },
  {
    kicker: '申博准备型',
    title: '研究生，想申博但核心产出还不够',
    pain: '有一定学术基础，但课题聚焦、成果表达和申请节奏还不稳定。',
    goal: '补强核心竞争力',
    icon: 'biotech',
    tags: [
      { text: 'PhD 意向', color: 'purple' },
      { text: '产出不足', color: 'red' },
      { text: '备战期', color: 'blue' },
    ],
  },
  {
    kicker: 'Gap / 备考型',
    title: '正在 Gap 或备考，担心时间被白白消耗',
    pain: '最焦虑的是时间推进感很弱，不知道现在先补什么最有效。',
    goal: '把时间线重新拉直',
    icon: 'schedule',
    tags: [
      { text: '高焦虑', color: 'red' },
      { text: '时间混乱', color: 'yellow' },
      { text: '重新规划', color: 'teal' },
    ],
  },
  {
    kicker: '在职转申型',
    title: '在职人士，想转向更学术或国际化的发展路径',
    pain: '工作经验不少，但如何转化为可讲述的申请故事仍然不清楚。',
    goal: '把经历转成申请资产',
    icon: 'work',
    tags: [
      { text: '在职转申', color: 'gray' },
      { text: '路径转换', color: 'purple' },
      { text: '需要诊断', color: 'teal' },
    ],
  },
]
</script>
