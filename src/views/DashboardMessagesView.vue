<template>
  <div class="space-y-6">
    <section class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div>
        <p class="text-xs font-bold tracking-widest uppercase text-primary mb-3">Inbox</p>
        <h1 class="font-headline font-bold text-3xl text-on-surface mb-2">消息</h1>
        <p class="text-on-surface-variant max-w-2xl">
          这里集中展示导师反馈、系统提醒和活动通知，重点不是看过多少条消息，而是每条消息都能推动下一步动作。
        </p>
      </div>
      <button @click="markAllRead"
        class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-5 py-3 rounded-xl font-bold hover:bg-surface-container-high transition-all">
        全部标记为已读
        <span class="material-symbols-outlined text-[18px]">done_all</span>
      </button>
    </section>

    <section class="flex flex-wrap gap-2">
      <button v-for="filter in filters" :key="filter.value" @click="activeFilter = filter.value"
        class="px-4 py-2 rounded-full text-sm font-bold transition-all"
        :class="activeFilter === filter.value
          ? 'bg-primary text-white'
          : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'">
        {{ filter.label }}
      </button>
    </section>

    <section class="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <div class="xl:col-span-7 bg-surface-container-lowest rounded-2xl p-6"
           style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
        <div class="flex items-center justify-between mb-5">
          <h2 class="font-headline font-bold text-2xl text-on-surface">消息流</h2>
          <span class="text-sm text-on-surface-variant">{{ filteredMessages.length }} 条消息</span>
        </div>
        <div class="space-y-3">
          <button v-for="item in filteredMessages" :key="item.id" @click="openMessage(item.id)"
            class="w-full text-left p-5 rounded-2xl transition-all border"
            :class="selectedMessageId === item.id
              ? 'bg-surface-container-low border-primary/20'
              : 'bg-white border-outline-variant/10 hover:bg-surface-container-low'">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                :class="messageTypeIconBg[item.type]">
                <span class="material-symbols-outlined text-[20px]" :class="messageTypeIconText[item.type]">
                  {{ item.icon }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-4 mb-1">
                  <p class="text-sm font-bold text-on-surface">{{ item.title }}</p>
                  <div class="flex items-center gap-2">
                    <span v-if="item.unread" class="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span class="text-[11px] text-on-surface-variant">{{ item.time }}</span>
                  </div>
                </div>
                <p class="text-sm text-on-surface-variant leading-relaxed mb-3">{{ item.body }}</p>
                <div class="inline-flex items-center gap-1 text-xs font-bold text-primary">
                  {{ item.cta }}
                  <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div class="xl:col-span-5 space-y-6">
        <section class="bg-surface-container-lowest rounded-2xl p-6"
                 style="box-shadow: 0 2px 12px rgba(15,23,42,0.04)">
          <p class="text-xs font-bold tracking-widest uppercase text-primary mb-3">Message Detail</p>
          <h2 class="font-headline font-bold text-2xl text-on-surface mb-3">{{ selectedMessage.title }}</h2>
          <p class="text-sm text-on-surface-variant leading-relaxed mb-5">{{ selectedMessage.detail }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <router-link to="/consult"
              class="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
              预约咨询
              <span class="material-symbols-outlined text-[18px]">event_available</span>
            </router-link>
            <router-link :to="detailLink"
              class="inline-flex items-center justify-center gap-2 bg-surface-container-low text-on-surface px-4 py-3 rounded-xl font-bold hover:bg-surface-container-high transition-all">
              {{ selectedMessage.cta }}
              <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </router-link>
          </div>
        </section>

        <section class="blue-banner rounded-2xl p-6 text-white">
          <p class="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-3">Quick Actions</p>
          <div class="space-y-3">
            <router-link to="/consult"
              class="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <span class="font-semibold text-white">预约咨询</span>
              <span class="material-symbols-outlined text-[18px] text-white">event_available</span>
            </router-link>
            <router-link to="/content"
              class="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <span class="font-semibold text-white">查看内容建议</span>
              <span class="material-symbols-outlined text-[18px] text-white">article</span>
            </router-link>
            <router-link to="/dashboard/progress"
              class="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <span class="font-semibold text-white">回到科研进度</span>
              <span class="material-symbols-outlined text-[18px] text-white">analytics</span>
            </router-link>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDashboardState } from '../composables/useDashboardState.js'

const filters = [
  { value: 'all', label: '全部' },
  { value: 'mentor', label: '导师反馈' },
  { value: 'system', label: '系统提醒' },
  { value: 'event', label: '活动通知' },
]

const activeFilter = ref('all')
const { messages, markAllMessagesRead, selectMessage } = useDashboardState()
const selectedMessageId = ref(messages[0]?.id ?? '')

const filteredMessages = computed(() => {
  if (activeFilter.value === 'all') return messages
  return messages.filter((item) => item.type === activeFilter.value)
})

const selectedMessage = computed(() => {
  const currentPool = filteredMessages.value
  return (
    currentPool.find((item) => item.id === selectedMessageId.value) ??
    currentPool[0] ??
    messages[0]
  )
})

const detailLink = computed(() => {
  if (!selectedMessage.value) return '/dashboard'
  if (selectedMessage.value.type === 'mentor') return '/dashboard/resources'
  if (selectedMessage.value.type === 'event') return '/content'
  return '/dashboard/progress'
})

const messageTypeIconBg = {
  mentor: 'bg-blue-100',
  system: 'bg-primary-soft/30',
  event: 'bg-primary-soft',
}

const messageTypeIconText = {
  mentor: 'text-blue-700',
  system: 'text-primary',
  event: 'text-primary',
}

function markAllRead() {
  markAllMessagesRead()
}

function openMessage(id) {
  selectedMessageId.value = id
  selectMessage(id)
}
</script>
