<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <section class="py-10 mb-8">
        <p class="text-xs font-bold tracking-widest uppercase text-primary mb-4">Case Stories</p>
        <h1 class="font-headline font-bold text-4xl tracking-tight text-primary mb-4">
          真实成长来自持续训练、反馈和阶段性产出。
        </h1>
        <p class="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          这些学生在起点、目标和压力上各不相同，但都通过更清晰的任务节奏，
          把科研准备推进到可沟通、可复盘、可沉淀的阶段成果。
        </p>
      </section>

      <section class="space-y-6 mb-10">
        <div v-for="study in caseStudies" :key="study.id"
          class="bg-surface-container-lowest rounded-2xl p-8"
          style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
          <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            <div class="max-w-2xl">
              <p class="text-xs font-bold tracking-widest uppercase text-primary mb-2">{{ study.persona }}</p>
              <h2 class="font-headline font-bold text-3xl text-on-surface mb-3">{{ study.student }}</h2>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ study.background }}</p>
            </div>
            <button @click="activeCase = activeCase === study.id ? null : study.id"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all whitespace-nowrap">
              {{ activeCase === study.id ? '收起案例' : '查看案例' }}
              <span class="material-symbols-outlined text-[18px]">
                {{ activeCase === study.id ? 'expand_less' : 'expand_more' }}
              </span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-surface-container-low rounded-2xl p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">起始状态</p>
              <div class="flex flex-wrap gap-2">
                <TagChip v-for="tag in study.beforeTags" :key="study.id + tag" :color="tagColor(tag)">
                  {{ tag }}
                </TagChip>
              </div>
            </div>
            <div class="bg-surface-container-low rounded-2xl p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">使用的服务</p>
              <p class="font-semibold text-on-surface">{{ study.service }}</p>
            </div>
            <div class="bg-surface-container-low rounded-2xl p-5">
              <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-3">阶段变化</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ study.afterSummary }}</p>
            </div>
          </div>

          <div v-if="activeCase === study.id" class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-surface-container-high">
            <div class="lg:col-span-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center">
                  <p class="text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-4">Before</p>
                  <RadarChart :scores="study.beforeScores" :labels="radarLabels" :size="230" />
                </div>
                <div class="bg-surface-container-low rounded-2xl p-6 flex flex-col items-center">
                  <p class="text-xs font-bold tracking-widest uppercase text-primary mb-4">After</p>
                  <RadarChart :scores="study.afterScores" :labels="radarLabels" :size="230" />
                </div>
              </div>
            </div>

            <div class="lg:col-span-4 blue-banner rounded-2xl p-6 text-white">
              <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">阶段成果</p>
              <ul class="space-y-3 mb-6">
                <li v-for="item in study.resultHighlights" :key="item" class="flex items-start gap-2.5 text-sm text-white">
                  <span class="material-symbols-outlined text-white text-[18px] mt-0.5">check_circle</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
              <div class="flex flex-col gap-3">
                <router-link to="/assessment"
                  class="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
                  开始测评
                  <span class="material-symbols-outlined text-[18px]">bolt</span>
                </router-link>
                <router-link to="/consult"
                  class="inline-flex items-center justify-center gap-2 bg-white text-on-surface px-4 py-3 rounded-xl font-bold hover:bg-surface-container-low transition-all">
                  预约咨询
                  <span class="material-symbols-outlined text-[18px]">event_available</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-surface-container-lowest rounded-2xl p-8 text-center"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
        <h2 class="font-headline font-bold text-2xl text-on-surface mb-3">先了解自己的准备状态，再安排下一步。</h2>
        <p class="text-on-surface-variant mb-6">
          完成测评后，你会看到更适合当前阶段的行动建议和服务选择。
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/assessment"
            class="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all">
            去做测评
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </router-link>
          <router-link to="/consult"
            class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-8 py-4 rounded-xl font-bold hover:bg-surface-container-high transition-all">
            预约咨询
            <span class="material-symbols-outlined text-[18px]">event_available</span>
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNav from '../components/AppNav.vue'
import RadarChart from '../components/RadarChart.vue'
import TagChip from '../components/TagChip.vue'
import { caseStudies } from '../data/cases.js'

const activeCase = ref(caseStudies[0]?.id ?? null)
const radarLabels = ['科研积累', '方向清晰度', '时间规划', '核心竞争力', '英语能力']

function tagColor(tag) {
  const colorMap = {
    科研空白: 'yellow',
    高焦虑: 'red',
    冲刺期: 'purple',
    方向不清: 'blue',
    'PhD 意向': 'teal',
    时间规划弱: 'gray',
    备战期: 'purple',
  }

  return colorMap[tag] ?? 'gray'
}
</script>
