<template>
  <div class="space-y-6">
    <section class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div>
        <p class="text-xs font-bold tracking-widest uppercase text-primary mb-3">Resource Matching</p>
        <h1 class="font-headline font-bold text-3xl text-on-surface mb-2">资源对接</h1>
        <p class="text-on-surface-variant max-w-2xl">
          当前已经从“诊断结果”进入“资源承接”阶段，系统会根据你的标签和节奏推荐可跟进资源。
        </p>
      </div>
      <router-link to="/consult"
        class="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all">
        发起匹配咨询
        <span class="material-symbols-outlined text-[18px]">hub</span>
      </router-link>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="card in statusCards" :key="card.title"
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
      <div class="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-8"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">可对接资源</h2>
        <p class="text-sm text-on-surface-variant mb-6">资源不是随机推送，而是从当前阶段、兴趣方向和焦虑状态反推出的匹配候选。</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div v-for="card in resourceCards" :key="card.title"
            class="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/10">
            <div class="flex items-start justify-between gap-4 mb-3">
              <div>
                <p class="text-xs font-bold tracking-widest uppercase text-primary mb-2">{{ card.type }}</p>
                <h3 class="font-semibold text-on-surface">{{ card.title }}</h3>
              </div>
              <span class="px-2 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                :class="resourceStatusStyles[card.status]">
                {{ card.status }}
              </span>
            </div>
            <p class="text-sm text-on-surface-variant leading-relaxed mb-4">{{ card.desc }}</p>
            <div class="flex flex-wrap gap-2">
              <TagChip v-for="tag in card.tags" :key="card.title + tag" :color="tagColor(tag)">
                {{ tag }}
              </TagChip>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 flex flex-col gap-6">
        <section class="bg-surface-container-lowest rounded-2xl p-6"
                 style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
          <h2 class="font-headline font-bold text-2xl text-on-surface mb-2">匹配逻辑</h2>
          <p class="text-sm text-on-surface-variant mb-5">标签不是为了展示，而是为了决定先推哪类资源。</p>
          <div class="space-y-3">
            <div v-for="rule in matchingRules" :key="rule.from"
              class="bg-surface-container-low rounded-2xl p-4">
              <p class="text-sm font-semibold text-on-surface mb-2">{{ rule.from }}</p>
              <p class="text-sm text-on-surface-variant leading-relaxed">{{ rule.to }}</p>
            </div>
          </div>
        </section>

        <section class="blue-banner rounded-2xl p-6 text-white">
          <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">Saved & Next Step</p>
          <div class="space-y-3 mb-5">
            <div v-for="item in savedResources" :key="item.title" class="bg-white/5 rounded-xl p-4 border border-white/10">
              <p class="font-semibold text-white mb-1">{{ item.title }}</p>
              <p class="text-xs text-white/75">{{ item.nextStep }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <router-link to="/consult"
              class="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
              预约咨询
              <span class="material-symbols-outlined text-[18px]">event_available</span>
            </router-link>
            <button class="inline-flex items-center justify-center gap-2 bg-white text-on-surface px-5 py-3 rounded-xl font-bold hover:bg-surface-container-low transition-all">
              加入本周计划
              <span class="material-symbols-outlined text-[18px]">playlist_add</span>
            </button>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import TagChip from '../components/TagChip.vue'
import { resourceCards, savedResources } from '../data/dashboard.js'

const statusCards = [
  { title: '当前匹配方向', value: '教育心理交叉', note: '匹配结果更偏向学习分析与教育评估场景。', icon: 'explore' },
  { title: '已解锁资源数', value: '5', note: '包括导师画像、公开活动与助研机会。', icon: 'hub' },
  { title: '下一次对接节点', value: '导师沟通', note: '建议在完成文献归纳后进入下一轮咨询。', icon: 'calendar_month' },
]

const matchingRules = [
  { from: 'PhD 意向 + 方向初步', to: '优先推荐导师画像、研究主题沟通与方法对齐资源。' },
  { from: '科研空白 + 高焦虑', to: '优先推荐入门研讨会、文献训练和低门槛资源。' },
  { from: '冲刺期', to: '优先推荐申请表达、材料反馈与高价值节点资源。' },
]

const resourceStatusStyles = {
  推荐中: 'bg-primary-soft/40 text-primary',
  可申请: 'bg-blue-100 text-blue-700',
  已收藏: 'bg-emerald-100 text-emerald-700',
  待沟通: 'bg-yellow-100 text-yellow-700',
}

function tagColor(tag) {
  const colorMap = {
    科研空白: 'yellow',
    高焦虑: 'red',
    冲刺期: 'purple',
    方向不清: 'blue',
    'PhD 意向': 'teal',
    时间规划弱: 'gray',
    备战期: 'purple',
    资源对接: 'green',
  }
  return colorMap[tag] ?? 'gray'
}
</script>
