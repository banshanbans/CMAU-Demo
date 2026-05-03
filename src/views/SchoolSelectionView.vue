<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <section class="py-10 mb-8">
        <p class="text-xs font-bold tracking-widest uppercase text-primary mb-4">School Selection</p>
        <h1 class="font-headline font-bold text-4xl md:text-5xl tracking-tight text-primary mb-5">
          选校清单
        </h1>
        <p class="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          按研究方向、地区偏好和申请阶段筛选目标院校，先加入清单，再生成下一步申请节奏。
        </p>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 space-y-6">
          <section class="bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-card">
            <div class="flex flex-col xl:flex-row xl:items-center gap-5">
              <div class="flex-1">
                <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">筛选条件</p>
                <h2 class="font-headline font-bold text-2xl text-on-surface">匹配目标项目</h2>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:w-[520px]">
                <div>
                  <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">
                    地区
                  </label>
                  <select v-model="activeRegion"
                    class="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface outline-none focus:border-primary">
                    <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">
                    阶段
                  </label>
                  <select v-model="activeStage"
                    class="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface outline-none focus:border-primary">
                    <option v-for="stage in stages" :key="stage" :value="stage">{{ stage }}</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="mt-5 flex flex-wrap gap-2">
              <button v-for="field in fields" :key="field" @click="activeField = field"
                class="rounded-full px-4 py-2 text-sm font-bold transition-all"
                :class="activeField === field
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-primary-soft/70'">
                {{ field }}
              </button>
            </div>
          </section>

          <section>
            <div class="flex items-center justify-between gap-4 mb-5">
              <div>
                <p class="text-sm text-on-surface-variant">匹配结果</p>
                <h2 class="font-headline font-bold text-2xl text-on-surface">{{ filteredSchools.length }} 个项目</h2>
              </div>
              <button @click="resetFilters"
                class="inline-flex items-center gap-1 rounded-xl bg-surface-container-low px-4 py-2 text-sm font-bold text-on-surface-variant hover:text-primary hover:bg-primary-soft/70 transition-all">
                重置
                <span class="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
            </div>

            <div class="grid grid-cols-1 gap-5">
              <article v-for="school in filteredSchools" :key="school.id"
                class="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 shadow-card transition-all hover:border-primary/30">
                <div class="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-5">
                  <div>
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                      <span class="status-badge bg-primary-soft text-primary">{{ school.region }}</span>
                      <span class="status-badge bg-surface-container-high text-on-surface-variant">{{ school.stage }}</span>
                    </div>
                    <h3 class="font-headline font-bold text-2xl text-on-surface mb-2">{{ school.name }}</h3>
                    <p class="text-sm font-semibold text-on-surface mb-2">{{ school.program }}</p>
                    <p class="text-sm text-on-surface-variant leading-relaxed max-w-2xl">{{ school.reason }}</p>
                  </div>
                  <button @click="toggleSchool(school)"
                    class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all"
                    :class="isSelected(school.id)
                      ? 'bg-primary-soft text-primary'
                      : 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20'">
                    {{ isSelected(school.id) ? '已加入' : '加入选校车' }}
                    <span class="material-symbols-outlined text-[18px]">
                      {{ isSelected(school.id) ? 'check_circle' : 'add_shopping_cart' }}
                    </span>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  <div v-for="item in school.metrics" :key="school.id + item.label"
                    class="rounded-2xl bg-surface-container-low p-4">
                    <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2">{{ item.label }}</p>
                    <p class="font-semibold text-on-surface">{{ item.value }}</p>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2">
                  <TagChip v-for="tag in school.tags" :key="school.id + tag.label" :color="tag.color">
                    {{ tag.label }}
                  </TagChip>
                </div>
              </article>
            </div>
          </section>
        </div>

        <aside class="lg:col-span-4">
          <div class="sticky top-24 space-y-6">
            <section class="bg-surface-container-lowest rounded-2xl p-6 shadow-card">
              <div class="flex items-center justify-between mb-5">
                <div>
                  <p class="text-xs font-bold tracking-widest uppercase text-primary mb-2">Selection Cart</p>
                  <h2 class="font-headline font-bold text-2xl text-on-surface">选校车</h2>
                </div>
                <span class="inline-flex min-w-8 items-center justify-center rounded-full bg-primary px-2.5 py-1 text-sm font-bold text-white">
                  {{ selectedSchools.length }}
                </span>
              </div>

              <div v-if="selectedSchools.length" class="space-y-3 mb-6">
                <div v-for="school in selectedSchools" :key="'cart-' + school.id"
                  class="rounded-2xl bg-surface-container-low p-4">
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <p class="font-semibold text-on-surface mb-1">{{ school.name }}</p>
                      <p class="text-xs text-on-surface-variant">{{ school.program }}</p>
                    </div>
                    <button @click="removeSchool(school.id)"
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-on-surface-variant hover:bg-white hover:text-danger transition-colors"
                      :aria-label="`移除 ${school.name}`">
                      <span class="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                </div>
              </div>

              <div v-else class="rounded-2xl bg-surface-container-low p-6 text-center mb-6">
                <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary">
                  <span class="material-symbols-outlined text-[24px]">travel_explore</span>
                </div>
                <p class="font-semibold text-on-surface mb-1">还没有加入院校</p>
                <p class="text-sm text-on-surface-variant">先选择 3-6 个目标项目。</p>
              </div>

              <button
                class="primary-button w-full"
                :class="selectedSchools.length ? '' : 'pointer-events-none opacity-50'">
                生成选校方案
                <span class="material-symbols-outlined text-[18px]">assignment</span>
              </button>
            </section>

            <section class="blue-banner rounded-2xl p-6 text-white">
              <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">Next Step</p>
              <h3 class="font-headline font-bold text-2xl mb-3">把清单带进咨询。</h3>
              <p class="text-sm text-white/80 leading-relaxed mb-5">
                结合科研准备度、预算区间和申请时间线，完成冲刺、匹配、保底梯度。
              </p>
              <router-link to="/consult"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-primary transition-all hover:bg-primary-soft">
                预约选校咨询
                <span class="material-symbols-outlined text-[18px]">event_available</span>
              </router-link>
            </section>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppNav from '../components/AppNav.vue'
import TagChip from '../components/TagChip.vue'

const regions = ['全部地区', '美国', '英国', '新加坡', '香港']
const stages = ['全部阶段', '硕士申请', '博士申请', '交流项目']
const fields = ['全部方向', '教育科技', '学习分析', '心理测量', '社会科学方法']

const activeRegion = ref('全部地区')
const activeStage = ref('全部阶段')
const activeField = ref('全部方向')
const selectedSchools = ref([])

const schools = [
  {
    id: 'stanford-lstd',
    name: 'Stanford University',
    region: '美国',
    stage: '博士申请',
    field: '教育科技',
    program: 'Learning Sciences and Technology Design',
    reason: '适合已有教育科技研究兴趣、希望继续做学习环境与技术设计的申请者。',
    metrics: [
      { label: '申请节奏', value: '9-12 月准备材料' },
      { label: '科研重点', value: '研究计划 + 导师匹配' },
      { label: '清单角色', value: '冲刺' },
    ],
    tags: [
      { label: 'PhD 意向', color: 'teal' },
      { label: '导师沟通', color: 'purple' },
      { label: '高匹配', color: 'green' },
    ],
  },
  {
    id: 'ucl-education-data',
    name: 'University College London',
    region: '英国',
    stage: '硕士申请',
    field: '学习分析',
    program: 'Education, Data and Society',
    reason: '适合从教育学、数据分析或社会科学背景切入国际化研究训练的学生。',
    metrics: [
      { label: '申请节奏', value: '滚动准备' },
      { label: '科研重点', value: '项目经历 + 文书表达' },
      { label: '清单角色', value: '匹配' },
    ],
    tags: [
      { label: '数据能力', color: 'blue' },
      { label: '文书表达', color: 'gray' },
      { label: '硕士申请', color: 'yellow' },
    ],
  },
  {
    id: 'nus-learning-sciences',
    name: 'National University of Singapore',
    region: '新加坡',
    stage: '博士申请',
    field: '学习分析',
    program: 'Learning Sciences and Analytics',
    reason: '适合关注学习数据、课堂行为和教育评估的科研型申请者。',
    metrics: [
      { label: '申请节奏', value: '提前联系导师' },
      { label: '科研重点', value: '方法能力 + 研究问题' },
      { label: '清单角色', value: '匹配' },
    ],
    tags: [
      { label: '学习分析', color: 'blue' },
      { label: '方法训练', color: 'teal' },
      { label: '导师匹配', color: 'purple' },
    ],
  },
  {
    id: 'hku-psychometrics',
    name: 'The University of Hong Kong',
    region: '香港',
    stage: '硕士申请',
    field: '心理测量',
    program: 'Educational Psychology',
    reason: '适合希望从心理学、教育评估和学习支持方向建立申请叙事的学生。',
    metrics: [
      { label: '申请节奏', value: '10-1 月集中推进' },
      { label: '科研重点', value: '实习经历 + 研究兴趣' },
      { label: '清单角色', value: '匹配' },
    ],
    tags: [
      { label: '心理测量', color: 'red' },
      { label: '案例佐证', color: 'green' },
      { label: '方向初步', color: 'teal' },
    ],
  },
  {
    id: 'oxford-comparative-education',
    name: 'University of Oxford',
    region: '英国',
    stage: '博士申请',
    field: '社会科学方法',
    program: 'Comparative and International Education',
    reason: '适合已有国际教育议题积累、需要强化研究设计与理论框架的申请者。',
    metrics: [
      { label: '申请节奏', value: '暑期前完成研究计划' },
      { label: '科研重点', value: '理论框架 + 论文样本' },
      { label: '清单角色', value: '冲刺' },
    ],
    tags: [
      { label: '国际教育', color: 'purple' },
      { label: '研究计划', color: 'blue' },
      { label: '冲刺', color: 'red' },
    ],
  },
  {
    id: 'nus-summer-research',
    name: 'NUS Short-term Research Visit',
    region: '新加坡',
    stage: '交流项目',
    field: '教育科技',
    program: '短期研究访问项目',
    reason: '适合希望补充国际化研究经历、提前熟悉英文科研协作的学生。',
    metrics: [
      { label: '申请节奏', value: '提前 3 个月准备' },
      { label: '科研重点', value: '邮件沟通 + 项目动机' },
      { label: '清单角色', value: '经历补强' },
    ],
    tags: [
      { label: '国际交流', color: 'teal' },
      { label: '科研空白', color: 'yellow' },
      { label: '低门槛', color: 'green' },
    ],
  },
]

const filteredSchools = computed(() =>
  schools.filter((school) => {
    const regionMatched = activeRegion.value === '全部地区' || school.region === activeRegion.value
    const stageMatched = activeStage.value === '全部阶段' || school.stage === activeStage.value
    const fieldMatched = activeField.value === '全部方向' || school.field === activeField.value
    return regionMatched && stageMatched && fieldMatched
  })
)

function isSelected(id) {
  return selectedSchools.value.some((school) => school.id === id)
}

function toggleSchool(school) {
  if (isSelected(school.id)) {
    removeSchool(school.id)
    return
  }
  selectedSchools.value.push(school)
}

function removeSchool(id) {
  selectedSchools.value = selectedSchools.value.filter((school) => school.id !== id)
}

function resetFilters() {
  activeRegion.value = '全部地区'
  activeStage.value = '全部阶段'
  activeField.value = '全部方向'
}
</script>
