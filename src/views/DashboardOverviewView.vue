<template>
  <div>
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-2xl p-6
                  hover:scale-[1.01] transition-transform"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <div class="flex justify-between items-start mb-4">
          <p class="text-xs font-bold text-on-surface-variant tracking-wider uppercase">科研准备度</p>
          <span class="material-symbols-outlined text-primary text-[20px]">bolt</span>
        </div>
        <div class="flex items-center gap-5">
          <div class="relative w-20 h-20 flex-shrink-0">
            <svg class="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="transparent" stroke="#eceef0" stroke-width="8" />
              <circle cx="40" cy="40" r="34" fill="transparent" stroke="#2D4AAB" stroke-width="8"
                stroke-dasharray="213.6" stroke-dashoffset="123.9" stroke-linecap="round" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-headline font-bold text-on-surface">42%</span>
            </div>
          </div>
          <div>
            <p class="text-sm text-on-surface-variant mb-1">超越了 68% 的同届学生</p>
            <div class="flex items-center text-emerald-600 text-xs font-bold gap-0.5">
              <span class="material-symbols-outlined text-[14px]">arrow_upward</span>
              +12% 本月
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-2xl p-6
                  hover:scale-[1.01] transition-transform"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <div class="flex justify-between items-start mb-4">
          <p class="text-xs font-bold text-on-surface-variant tracking-wider uppercase">当前服务</p>
          <span class="material-symbols-outlined text-primary text-[20px]">package_2</span>
        </div>
        <h3 class="text-xl font-headline font-bold text-on-surface mb-2">科研启动包</h3>
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          第 2 月 / 共 3 月
        </div>
      </div>

      <div class="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-2xl p-6
                  hover:scale-[1.01] transition-transform"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <div class="flex justify-between items-start mb-4">
          <p class="text-xs font-bold text-on-surface-variant tracking-wider uppercase">下次复盘</p>
          <span class="material-symbols-outlined text-error text-[20px]">event</span>
        </div>
        <h3 class="text-3xl font-headline font-bold text-on-surface mb-1">4月22日</h3>
        <p class="text-sm text-on-surface-variant">周一 · 下午 14:30 · 线上视频</p>
        <a href="#" class="text-xs font-bold text-primary flex items-center gap-1 mt-3 hover:underline">
          查看会议详情
          <span class="material-symbols-outlined text-[14px]">chevron_right</span>
        </a>
      </div>

      <div class="col-span-12 xl:col-span-6 bg-surface-container-lowest rounded-2xl p-8"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-headline font-bold text-on-surface flex items-center gap-2.5">
            <span class="w-1.5 h-6 bg-primary rounded-full"></span>
            本周任务
          </h3>
          <span class="text-xs font-medium text-on-surface-variant">
            {{ tasks.filter(t => t.done).length }}/{{ tasks.length }} 已完成
          </span>
        </div>

        <div class="space-y-2.5">
          <div v-for="(task, i) in tasks" :key="i"
            @click="tasks[i].done = !tasks[i].done"
            class="group flex items-center p-4 rounded-xl cursor-pointer transition-all"
            :class="task.done
              ? 'bg-surface-container-low/50'
              : 'bg-white border border-surface-container-high hover:border-primary'">
            <div class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
              :class="task.done ? 'bg-emerald-100' : 'border-2 border-outline-variant group-hover:border-primary'">
              <span v-if="task.done"
                class="material-symbols-outlined text-emerald-600 text-[16px]"
                style="font-variation-settings: 'wght' 700">check</span>
            </div>

            <span class="ml-4 text-sm font-medium flex-1"
              :class="task.done ? 'text-on-surface-variant line-through' : 'text-on-surface'">
              {{ task.label }}
            </span>

            <span v-if="task.tag && !task.done"
              class="ml-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase"
              :class="{
                'bg-yellow-100 text-yellow-700': task.tag === 'urgent',
                'bg-blue-100 text-blue-700': task.tag === 'learning',
                'bg-primary-soft text-primary': task.tag === 'meeting',
              }">
              {{ task.tagLabel }}
            </span>
          </div>
        </div>

        <button class="mt-5 w-full py-3 rounded-xl border-2 border-dashed border-surface-container-high
                       text-on-surface-variant text-sm font-medium flex items-center justify-center gap-2
                       hover:border-primary/40 hover:text-primary transition-all">
          <span class="material-symbols-outlined text-[18px]">add</span>
          添加新任务
        </button>
      </div>

      <div class="col-span-12 xl:col-span-3 bg-surface-container-lowest rounded-2xl p-6"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <div class="flex justify-between items-start mb-4">
          <p class="text-xs font-bold text-on-surface-variant tracking-wider uppercase">本周复盘反馈</p>
          <span class="material-symbols-outlined text-primary text-[20px]">psychology</span>
        </div>
        <p class="text-sm text-on-surface mb-2">本周复盘已整理出 3 条重点反馈。</p>
        <p class="text-sm text-on-surface-variant leading-relaxed mb-4">
          下周建议把文献阅读结果整理成问题清单，再带着问题进入导师沟通。
        </p>
        <button @click="showReviewModal = true"
          class="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
          查看本周复盘反馈
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      <section class="col-span-12 xl:col-span-3 relative overflow-hidden blue-banner rounded-2xl p-6 text-white"
               style="box-shadow: 0 2px 12px rgba(15,23,42,0.08)">
        <div class="relative z-10">
          <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">本周活动</p>
          <h3 class="font-headline font-bold text-xl text-white mb-3">探索科研前沿</h3>
          <p class="text-sm text-white/80 leading-relaxed mb-5">
              参加本周六线上研讨会，了解跨学科研究如何转化为申请中的项目叙事。
          </p>
          <div class="flex flex-col gap-3">
            <button class="inline-flex items-center justify-center gap-2 bg-white text-on-surface px-4 py-3 rounded-xl text-sm font-bold hover:bg-surface-container-low transition-colors">
              立即报名
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <router-link to="/dashboard/resources"
              class="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl text-sm font-bold border border-white/10 hover:bg-white/15 transition-colors">
              查看资源对接
              <span class="material-symbols-outlined text-[18px]">hub</span>
            </router-link>
          </div>
        </div>
        <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div class="absolute right-4 top-4 opacity-10 pointer-events-none">
          <span class="material-symbols-outlined text-[84px]">school</span>
        </div>
      </section>

      <div class="col-span-12">
        <section class="bg-primary-soft text-primary rounded-2xl p-10
                        flex flex-col md:flex-row items-center justify-between gap-8"
                 style="box-shadow: 0 2px 12px rgba(15,23,42,0.05)">
          <div class="max-w-xl">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-black/30
                         text-primary text-[10px] font-bold uppercase tracking-widest mb-5">
              本月观察
            </span>
            <h3 class="text-2xl md:text-3xl font-headline font-bold mb-4 leading-tight text-on-surface">
              跨学科研究经历正在成为申请材料里的重要亮点。
            </h3>
            <p class="text-sm leading-relaxed opacity-70 mb-5">
              如果你计划申请教育、数据、社会科学或管理相关方向，可以尽早沉淀一个可说明问题意识和方法能力的项目。
            </p>
            <router-link to="/content"
              class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              查看内容建议
              <span class="material-symbols-outlined text-[18px]">article</span>
            </router-link>
          </div>
          <div class="flex-shrink-0">
            <div class="w-56 h-36 rounded-2xl bg-white flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-card">
              <span class="material-symbols-outlined text-[64px] text-primary opacity-70">trending_up</span>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div v-if="showReviewModal"
      class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center px-6">
      <div class="w-full max-w-2xl bg-surface-container-lowest rounded-3xl p-8 relative"
           style="box-shadow: 0 20px 60px rgba(15,23,42,0.18)">
        <button @click="showReviewModal = false"
          class="absolute top-5 right-5 w-10 h-10 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div class="pr-10 mb-6">
          <p class="text-xs font-bold tracking-widest uppercase text-primary mb-3">Weekly Review</p>
          <h3 class="font-headline font-bold text-3xl text-on-surface mb-3">本周复盘反馈</h3>
          <p class="text-sm text-on-surface-variant leading-relaxed">
            这份复盘结合了本周任务完成情况、当前服务阶段和最近一次导师反馈，帮助你确定下周优先事项。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div v-for="item in dashboardReviewFeedback" :key="item.title"
            class="bg-surface-container-low rounded-2xl p-5">
            <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3"
              :class="item.iconColor">
              <span class="material-symbols-outlined text-[20px]">{{ item.icon }}</span>
            </div>
            <p class="font-semibold text-on-surface mb-2">{{ item.title }}</p>
            <p class="text-sm text-on-surface-variant leading-relaxed">{{ item.body }}</p>
          </div>
        </div>

        <div class="blue-banner rounded-2xl p-6 text-white mb-6">
          <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">Recommended Actions</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div v-for="action in dashboardRecommendedActions" :key="action.title"
              class="bg-white/5 rounded-xl p-4 border border-white/10">
              <p class="font-semibold text-white mb-1">{{ action.title }}</p>
              <p class="text-xs text-white/75 leading-relaxed">{{ action.body }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <router-link to="/consult"
            class="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all">
            预约咨询
            <span class="material-symbols-outlined text-[18px]">event_available</span>
          </router-link>
          <router-link to="/content"
            class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-6 py-3.5 rounded-xl font-bold hover:bg-surface-container-high transition-all">
            查看内容建议
            <span class="material-symbols-outlined text-[18px]">article</span>
          </router-link>
          <button @click="showReviewModal = false"
            class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-6 py-3.5 rounded-xl font-bold hover:bg-surface-container-high transition-all">
            稍后再看
            <span class="material-symbols-outlined text-[18px]">schedule</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  dashboardRecommendedActions,
  dashboardReviewFeedback,
  dashboardTasks,
} from '../data/dashboard.js'

const tasks = ref(dashboardTasks.map((task) => ({ ...task })))
const showReviewModal = ref(true)
</script>
