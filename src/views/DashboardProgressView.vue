<template>
  <div class="space-y-6">
    <section class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div>
        <p class="text-xs font-bold tracking-widest uppercase text-primary mb-3">Progress Tracking</p>
        <h1 class="font-headline font-bold text-3xl text-on-surface mb-2">科研进度</h1>
        <p class="text-on-surface-variant max-w-2xl">
          当前处于科研启动包第 2 月第 3 周，重点从“看文献”切换到“做归纳”和“带问题沟通”。
        </p>
      </div>
      <router-link to="/consult"
        class="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all">
        预约复盘
        <span class="material-symbols-outlined text-[18px]">event_available</span>
      </router-link>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="card in overviewCards" :key="card.title"
        class="bg-surface-container-lowest rounded-2xl p-6"
        style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <div class="flex justify-between items-start mb-4">
          <p class="text-xs font-bold tracking-wider uppercase text-on-surface-variant">{{ card.title }}</p>
          <span class="material-symbols-outlined text-primary text-[20px]">{{ card.icon }}</span>
        </div>
        <p class="font-headline font-bold text-3xl text-on-surface mb-2">{{ card.value }}</p>
        <p class="text-sm text-on-surface-variant">{{ card.note }}</p>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-8"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">里程碑时间线</h2>
        <p class="text-sm text-on-surface-variant mb-6">近 5 周重点任务已经被拆成可追踪的阶段动作。</p>
        <div class="space-y-4">
          <div v-for="item in progressMilestones" :key="item.phase"
            class="flex gap-4 p-5 rounded-2xl bg-surface-container-low">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                :class="statusStyles[item.status].dot">
                {{ item.phase.replace('第 ', '').replace(' 周', '') }}
              </div>
              <div class="w-0.5 h-full bg-surface-container-high mt-3" />
            </div>
            <div class="pb-2">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="font-semibold text-on-surface">{{ item.title }}</h3>
                <span class="px-2 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                  :class="statusStyles[item.status].pill">
                  {{ item.status }}
                </span>
              </div>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ item.note }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-8"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">复盘摘要</h2>
        <p class="text-sm text-on-surface-variant mb-6">当前最重要的是把阅读输入转成可交流的输出。</p>
        <div class="space-y-4 mb-6">
          <div v-for="item in dashboardReviewFeedback" :key="item.title"
            class="bg-surface-container-low rounded-2xl p-5">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center" :class="item.iconColor">
                <span class="material-symbols-outlined text-[20px]">{{ item.icon }}</span>
              </div>
              <h3 class="font-semibold text-on-surface">{{ item.title }}</h3>
            </div>
            <p class="text-sm text-on-surface-variant leading-relaxed">{{ item.body }}</p>
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <router-link to="/content"
            class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-5 py-3 rounded-xl font-bold hover:bg-surface-container-high transition-all">
            查看详细复盘
            <span class="material-symbols-outlined text-[18px]">article</span>
          </router-link>
          <router-link to="/content"
            class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-5 py-3 rounded-xl font-bold hover:bg-surface-container-high transition-all">
            查看相关文章
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </router-link>
        </div>
      </div>
    </section>

    <section class="bg-surface-container-lowest rounded-2xl p-8"
             style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">本周任务板</h2>
          <p class="text-sm text-on-surface-variant">任务按阅读、导师沟通和输出分类，而不是混成一个待办列表。</p>
        </div>
        <span class="text-sm font-bold text-primary">{{ tasks.filter((item) => item.done).length }}/{{ tasks.length }} 已完成</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div v-for="group in taskGroups" :key="group.name" class="bg-surface-container-low rounded-2xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-on-surface">{{ group.name }}</h3>
            <span class="text-xs font-bold tracking-widest uppercase text-on-surface-variant">{{ group.items.length }} 项</span>
          </div>
          <div class="space-y-3">
            <div v-for="task in group.items" :key="task.label"
              class="bg-white rounded-xl p-4 border border-outline-variant/10">
              <div class="flex items-start justify-between gap-3 mb-2">
                <p class="text-sm font-medium" :class="task.done ? 'text-on-surface-variant line-through' : 'text-on-surface'">
                  {{ task.label }}
                </p>
                <span v-if="task.tag" class="px-2 py-1 rounded text-[10px] font-bold uppercase"
                  :class="tagStyles[task.tag]">
                  {{ task.tagLabel }}
                </span>
              </div>
              <p class="text-xs text-on-surface-variant">截止时间：{{ task.due }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  dashboardReviewFeedback,
  dashboardTasks,
  progressMilestones,
} from '../data/dashboard.js'

const tasks = ref(dashboardTasks.map((task) => ({ ...task })))

const overviewCards = [
  { title: '当前阶段', value: '科研启动包 · 第 2 月', note: '当前重点从方向建立进入文献归纳与表达训练。', icon: 'route' },
  { title: '本周完成率', value: '3 / 4', note: '已完成高价值任务 3 项，节奏比上周更稳定。', icon: 'task_alt' },
  { title: '下一关键节点', value: '导师复盘', note: '下周将围绕方向初稿与阅读归纳做中期对齐。', icon: 'flag' },
]

const statusStyles = {
  已完成: {
    dot: 'bg-emerald-100 text-emerald-700',
    pill: 'bg-emerald-100 text-emerald-700',
  },
  进行中: {
    dot: 'bg-primary-soft/40 text-primary',
    pill: 'bg-primary-soft/40 text-primary',
  },
  即将开始: {
    dot: 'bg-surface-container-high text-on-surface-variant',
    pill: 'bg-surface-container-high text-on-surface-variant',
  },
}

const tagStyles = {
  urgent: 'bg-yellow-100 text-yellow-700',
  learning: 'bg-blue-100 text-blue-700',
  meeting: 'bg-primary-soft text-primary',
}

const taskGroups = computed(() => {
  const groups = ['阅读任务', '导师沟通', '输出任务']
  return groups.map((name) => ({
    name,
    items: tasks.value.filter((task) => task.category === name),
  }))
})
</script>
