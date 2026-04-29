<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-28 pb-24 px-6 max-w-3xl mx-auto min-h-screen flex flex-col">

      <!-- Progress -->
      <div class="mb-10">
        <div class="flex justify-between items-end mb-2">
          <span class="text-xs font-bold tracking-widest text-primary uppercase">
            {{ steps[current].section }}
          </span>
          <span class="text-sm font-semibold text-on-surface">
            {{ Math.round(((current + 1) / steps.length) * 100) }}% 完成
          </span>
        </div>
        <div class="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full transition-all duration-500"
            :style="{ width: ((current + 1) / steps.length * 100) + '%' }" />
        </div>
        <p class="text-xs text-on-surface-variant mt-2">第 {{ current + 1 }} 步 / 共 {{ steps.length }} 步</p>
      </div>

      <!-- Question Header -->
      <div class="mb-8 text-center">
        <h1 class="font-headline font-semibold text-3xl mb-3 tracking-tight text-on-surface">
          {{ steps[current].title }}
        </h1>
        <p class="text-on-surface-variant text-lg">{{ steps[current].question }}</p>
        <p v-if="steps[current].multi" class="text-xs text-on-surface-variant mt-1 opacity-60">
          可多选
        </p>
      </div>

      <!-- Options Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <button v-for="opt in steps[current].options" :key="opt.value"
          @click="toggleOption(opt.value)"
          class="group relative flex flex-col items-start p-6 rounded-xl text-left transition-all duration-300"
          :class="isSelected(opt.value)
            ? 'bg-white border-2 border-primary shadow-sm'
            : 'bg-surface-container-lowest border-2 border-transparent hover:border-primary/20 hover:bg-white'">

          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors"
            :class="isSelected(opt.value)
              ? 'bg-primary-soft/40'
              : 'bg-surface-container group-hover:bg-primary-soft/20'">
            <span class="material-symbols-outlined transition-colors text-[22px]"
              :class="isSelected(opt.value) ? 'filled text-primary' : 'text-on-surface-variant group-hover:text-primary'"
              :style="isSelected(opt.value) ? 'font-variation-settings: FILL 1, wght 400, GRAD 0, opsz 24' : ''">
              {{ opt.icon }}
            </span>
          </div>

          <h3 class="font-semibold text-on-surface mb-1">{{ opt.label }}</h3>
          <p class="text-sm text-on-surface-variant">{{ opt.desc }}</p>

          <!-- Check indicator -->
          <div class="absolute top-4 right-4 transition-all">
            <div v-if="isSelected(opt.value)"
              class="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-[14px]"
                style="font-variation-settings: 'wght' 700">check</span>
            </div>
            <div v-else
              class="w-4 h-4 rounded-full border-2 border-outline-variant opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>

      <!-- Info Card -->
      <div class="mt-auto mb-8 p-6 bg-surface-container-low rounded-2xl border-l-4 border-primary/40">
        <div class="flex items-start gap-4">
          <span class="material-symbols-outlined text-primary mt-0.5">info</span>
          <div>
            <p class="text-sm font-semibold text-on-surface mb-1">{{ steps[current].hint.title }}</p>
            <p class="text-sm text-on-surface-variant leading-relaxed">{{ steps[current].hint.body }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between pt-4">
        <button @click="prev"
          class="px-8 py-3 rounded-xl font-medium text-on-surface-variant
                 hover:bg-surface-container-high transition-colors flex items-center gap-2"
          :class="current === 0 ? 'opacity-30 pointer-events-none' : ''">
          <span class="material-symbols-outlined text-[20px]">arrow_back</span>
          上一步
        </button>

        <button @click="next"
          :disabled="!canProceed"
          class="px-10 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all"
          :class="canProceed
            ? 'bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20'
            : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'">
          {{ current === steps.length - 1 ? '查看报告' : '下一步' }}
          <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppNav from '../components/AppNav.vue'

const router = useRouter()
const current = ref(0)

// answers: Map<stepIndex, Set<value>>
const answers = ref({})

const steps = [
  {
    section: '基本信息',
    title: '你目前的身份是？',
    question: '选择最符合你现状的一项',
    multi: false,
    options: [
      { value: 'ug',    icon: 'school',      label: '本科生',    desc: '目前就读于本科阶段' },
      { value: 'pg',    icon: 'psychology',  label: '研究生',    desc: '目前就读于硕士或博士阶段' },
      { value: 'gap',   icon: 'pending',     label: '备考/Gap',  desc: '暂时没有在读，正在准备' },
      { value: 'work',  icon: 'work',        label: '在职人士',  desc: '已参加工作，计划深造' },
    ],
    hint: {
      title: '为什么要问这个？',
      body: '不同身份的用户，科研准备的优先级和节奏差异很大。这一步帮助我们为你匹配最合适的路径建议。',
    },
  },
  {
    section: '深造意向',
    title: '你的目标深造方向是？',
    question: '可多选，选择你感兴趣的方向',
    multi: true,
    options: [
      { value: 'ms',   icon: 'emoji_objects', label: '海外硕士（Master）', desc: '申请海外 1-2 年制硕士项目' },
      { value: 'phd',  icon: 'biotech',       label: '海外博士（PhD）',   desc: '申请全奖博士，以科研为主' },
      { value: 'mba',  icon: 'business_center',label: 'MBA / 商科',      desc: '管理、金融、咨询等方向' },
      { value: 'exch', icon: 'flight',        label: '交换 / 访学',      desc: '短期学术交流或联合培养' },
    ],
    hint: {
      title: '申请方向决定科研策略',
      body: 'PhD 申请对科研产出要求远高于 Master。提前明确方向，才能有针对性地规划科研积累路径。',
    },
  },
  {
    section: '科研背景评估',
    title: '科研背景评估',
    question: '你目前拥有哪些科研经历？',
    multi: true,
    options: [
      { value: 'none',    icon: 'radio_button_unchecked', label: '无科研经历',     desc: '目前还没有正式参与过任何学术科研活动' },
      { value: 'paper',   icon: 'description',            label: '课程论文',       desc: '完成过高质量的课程期末论文或文献综述' },
      { value: 'project', icon: 'science',                label: '课题参与',       desc: '在实验室或导师课题组中承担研究辅助工作' },
      { value: 'pub',     icon: 'emoji_events',           label: '论文 / 竞赛成果', desc: '已发表学术刊物或在全国性学科竞赛中获奖' },
    ],
    hint: {
      title: '为什么评估科研背景？',
      body: '科研经历是海外硕博申请及保研夏令营的核心竞争力。通过详细评估，见数将为你匹配最合适的提升方案。',
    },
  },
  {
    section: '申请准备度',
    title: '你的申请准备状态如何？',
    question: '选择最接近你现在情况的描述',
    multi: false,
    options: [
      { value: 'early',  icon: 'explore',       label: '初步探索期',   desc: '有想法，但还没有开始准备任何材料' },
      { value: 'plan',   icon: 'event_note',    label: '规划中',       desc: '已开始了解要求，准备时间线' },
      { value: 'active', icon: 'task_alt',      label: '积极准备中',   desc: '已在准备语言考试、科研或文书' },
      { value: 'final',  icon: 'rocket_launch', label: '冲刺阶段',     desc: '申请季在即，正在提交材料' },
    ],
    hint: {
      title: '准备状态影响服务优先级',
      body: '处于冲刺阶段的用户和初步探索期用户需要完全不同的支持类型。告诉我们你在哪里，我们为你推荐最有效的路径。',
    },
  },
  {
    section: '心理状态',
    title: '你现在的申请焦虑程度？',
    question: '诚实作答，这会帮我们更好地支持你',
    multi: false,
    options: [
      { value: 'calm',    icon: 'sentiment_satisfied', label: '心态平稳',   desc: '整体有计划，不过分焦虑' },
      { value: 'mild',    icon: 'sentiment_neutral',   label: '轻度焦虑',   desc: '有些担心，但还在掌控中' },
      { value: 'high',    icon: 'sentiment_stressed',  label: '明显焦虑',   desc: '经常感到压力，不确定自己够不够' },
      { value: 'extreme', icon: 'crisis_alert',        label: '非常焦虑',   desc: '焦虑感强烈，感觉无从下手' },
    ],
    hint: {
      title: '焦虑感是正常的',
      body: '申请过程中有焦虑是普遍现象。了解你的状态，帮助我们在合适的时候给你"确定感"，而不是更多信息。',
    },
  },
]

function isSelected(val) {
  return answers.value[current.value]?.has(val) ?? false
}

function toggleOption(val) {
  if (!answers.value[current.value]) {
    answers.value[current.value] = new Set()
  }
  const step = steps[current.value]
  if (!step.multi) {
    answers.value[current.value] = new Set([val])
  } else {
    if (answers.value[current.value].has(val)) {
      answers.value[current.value].delete(val)
    } else {
      // If "none" selected, clear others; if other selected, clear "none"
      if (val === 'none') {
        answers.value[current.value] = new Set(['none'])
      } else {
        answers.value[current.value].delete('none')
        answers.value[current.value].add(val)
      }
    }
  }
  answers.value = { ...answers.value }
}

const canProceed = computed(() => {
  const set = answers.value[current.value]
  return set && set.size > 0
})

function next() {
  if (!canProceed.value) return
  if (current.value < steps.length - 1) {
    current.value++
  } else {
    router.push('/results')
  }
}

function prev() {
  if (current.value > 0) current.value--
}
</script>
