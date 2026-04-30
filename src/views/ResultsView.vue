<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <AppNav />

    <main class="pt-24 pb-16 px-6 max-w-5xl mx-auto">

      <!-- Header -->
      <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="font-headline font-bold text-3xl md:text-4xl tracking-tight text-primary mb-2">
            你的科研准备度报告
          </h1>
          <p class="text-on-surface-variant font-medium">
            生成时间：2025年4月15日 · 测评编号 #JS-2025042
          </p>
        </div>
        <div class="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-full"
             style="box-shadow: 0 2px 8px rgba(15,23,42,0.06)">
          <div class="w-9 h-9 rounded-full bg-primary-soft flex items-center justify-center
                      text-primary font-bold text-sm">李</div>
          <div>
            <p class="text-xs font-bold text-primary leading-tight uppercase tracking-wider">Research Scholar</p>
            <p class="text-[10px] text-on-surface-variant uppercase tracking-widest">Master Candidate</p>
          </div>
        </div>
      </header>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">

        <!-- Radar Chart -->
        <section class="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-8
                        flex flex-col items-center justify-center relative overflow-hidden"
                 style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
          <div class="absolute top-0 right-0 p-6 opacity-[0.04] pointer-events-none">
            <span class="material-symbols-outlined text-[120px]">analytics</span>
          </div>
          <h3 class="font-headline font-semibold text-lg self-start mb-6 flex items-center gap-2">
            <span class="w-2 h-5 bg-primary rounded-full"></span>
            核心能力维度
          </h3>
          <RadarChart :scores="radarScores" :labels="radarLabels" :size="280" />
        </section>

        <!-- Status + Tags -->
        <section class="lg:col-span-5 flex flex-col gap-5">
          <!-- Status card -->
          <div class="blue-banner text-white p-7 rounded-2xl flex-1 flex flex-col justify-center">
            <p class="text-[10px] font-label tracking-widest uppercase mb-2 opacity-60">CURRENT STATUS</p>
            <p class="text-3xl font-headline font-bold mb-5">{{ result.statusTitle }}</p>
            <div class="flex flex-wrap gap-2">
              <TagChip v-for="tag in result.tags" :key="tag.label" :color="tag.color">
                {{ tag.label }}
              </TagChip>
            </div>
          </div>

          <!-- Conclusion -->
          <div class="bg-surface-container-low p-6 rounded-2xl"
               style="border: 1px solid rgba(198,198,205,0.15)">
            <h4 class="font-bold text-sm mb-3 text-on-surface-variant flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-primary">lightbulb</span>
              评估结论
            </h4>
            <p class="text-sm leading-relaxed text-on-surface italic">
              "{{ result.conclusion }}"
            </p>
          </div>
        </section>
      </div>

      <!-- Dimension Scores Bar Chart -->
      <section class="bg-surface-container-lowest rounded-2xl p-8 mb-10"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
        <h2 class="font-headline font-bold text-xl mb-6 flex items-center gap-2">
          <span class="w-2 h-5 bg-primary rounded-full"></span>
          各维度评分详情
        </h2>
        <div class="space-y-4">
          <div v-for="(item, i) in dimensionDetails" :key="i">
            <div class="flex justify-between items-center mb-1.5">
              <span class="text-sm font-medium text-on-surface">{{ item.label }}</span>
              <span class="text-sm font-bold" :class="item.score >= 0.6 ? 'text-primary' : item.score >= 0.4 ? 'text-yellow-600' : 'text-error'">
                {{ Math.round(item.score * 100) }}分
              </span>
            </div>
            <div class="h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700"
                :style="{ width: item.score * 100 + '%', background: item.score >= 0.6 ? '#2D4AAB' : item.score >= 0.4 ? '#EAB308' : '#EF4444' }" />
            </div>
            <p class="text-xs text-on-surface-variant mt-1">{{ item.note }}</p>
          </div>
        </div>
      </section>

      <!-- Recommendations -->
      <section class="mb-10">
        <div class="flex items-center justify-between mb-7">
          <h2 class="font-headline font-bold text-2xl tracking-tight">适合你的下一步</h2>
          <div class="h-px flex-1 bg-surface-container-high mx-8 hidden md:block" />
          <router-link to="/services"
            class="text-primary font-bold text-sm hover:underline whitespace-nowrap">
            查看全部服务
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Card 1: Highlighted -->
          <div class="group bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden
                      border-2 border-primary-soft transition-all duration-300 hover:scale-[1.02]"
               style="box-shadow: 0 4px 20px rgba(45,74,171,0.08)">
            <div class="absolute -right-6 -top-6 w-28 h-28 bg-primary-soft/20 rounded-full blur-2xl pointer-events-none" />
            <div class="flex justify-between items-start mb-5">
              <div>
                <span class="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block uppercase tracking-wider">
                  {{ primaryPlan.badge }}
                </span>
                <h3 class="font-headline font-bold text-xl text-primary">{{ primaryPlan.name }}</h3>
              </div>
              <div class="text-right">
                <span class="block text-2xl font-bold text-primary">{{ primaryPlan.price }}</span>
                <span class="text-xs text-on-surface-variant">{{ primaryPlan.period }}</span>
              </div>
            </div>
            <ul class="space-y-3 mb-7">
              <li v-for="feat in primaryPlan.features" :key="feat" class="flex items-start gap-2.5">
                <span class="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">check_circle</span>
                <span class="text-sm text-on-surface-variant">{{ feat }}</span>
              </li>
            </ul>
            <router-link :to="primaryPlan.link"
              class="flex items-center justify-center w-full bg-primary text-on-primary
                     py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all gap-2">
              {{ primaryPlan.cta }}
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </router-link>
          </div>

          <!-- Card 2 -->
          <div class="group bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden
                      border border-outline-variant/20 transition-all duration-300 hover:scale-[1.02]"
               style="box-shadow: 0 4px 16px rgba(15,23,42,0.04)">
            <div class="flex justify-between items-start mb-5">
              <div>
                <span class="bg-surface-container-high text-on-surface-variant text-[10px] font-bold
                             px-2 py-0.5 rounded-full mb-2 inline-block uppercase tracking-wider">
                  单次咨询
                </span>
                <h3 class="font-headline font-bold text-xl text-primary">单次方向咨询</h3>
              </div>
              <div class="text-right">
                <span class="block text-2xl font-bold text-primary">¥800</span>
                <span class="text-xs text-on-surface-variant">60分钟专家咨询</span>
              </div>
            </div>
            <ul class="space-y-3 mb-7">
              <li v-for="feat in pkg2features" :key="feat" class="flex items-start gap-2.5">
                <span class="material-symbols-outlined text-on-surface-variant/40 text-[18px] mt-0.5 flex-shrink-0">chevron_right</span>
                <span class="text-sm text-on-surface-variant">{{ feat }}</span>
              </li>
            </ul>
            <router-link to="/consult"
              class="flex items-center justify-center w-full bg-surface-container-high text-on-surface
                           py-3.5 rounded-xl font-bold text-sm hover:bg-surface-dim transition-all gap-2">
              预约咨询
              <span class="material-symbols-outlined text-[18px]">event_available</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- Footer Note -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8
                  border-t border-surface-container-high opacity-60">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-surface-container-high rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-on-surface-variant text-[18px]">psychology</span>
          </div>
          <div class="text-xs">
            <p class="font-bold text-on-surface">想更新结果？</p>
            <p class="text-on-surface-variant">
              <router-link to="/assessment" class="hover:text-primary">重新测评</router-link>
              ，重新生成准备度建议
            </p>
          </div>
        </div>
        <div class="flex gap-6 text-xs text-on-surface-variant">
          <a href="#" class="hover:text-primary">隐私条款</a>
          <a href="#" class="hover:text-primary">技术支持</a>
          <a href="#" class="hover:text-primary">联系我们</a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppNav    from '../components/AppNav.vue'
import RadarChart from '../components/RadarChart.vue'
import TagChip   from '../components/TagChip.vue'
import { buildAssessmentResult } from '../composables/useAssessmentResult.js'

const result = buildAssessmentResult()
const radarLabels = result.radarLabels
const radarScores = result.radarScores
const dimensionDetails = result.dimensionDetails
const primaryPlan = result.recommendedPlan

const pkg2features = [
  '海外博士导师 1v1 深度沟通',
  '现有科研背景及 RP 雏形诊断',
  '申请院校梯度及专业方向锚定',
]
</script>
