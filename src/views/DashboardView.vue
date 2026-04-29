<template>
  <div class="min-h-screen bg-background font-body text-on-background flex">
    <aside class="h-screen w-64 fixed left-0 top-0 bg-surface-subtle flex flex-col p-4 z-40">
      <div class="px-3 py-5 flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-card">
          <span class="text-white font-headline font-bold text-lg">见</span>
        </div>
        <div>
          <h1 class="font-headline font-bold text-on-surface tracking-tight leading-tight">见数·科研</h1>
          <p class="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Research Scholar</p>
        </div>
      </div>

      <div class="mb-6 px-2">
        <div class="bg-white rounded-xl p-4 flex items-center gap-3 shadow-card">
          <div class="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center
                      text-primary font-bold">李</div>
          <div class="flex-1 overflow-hidden">
            <p class="text-sm font-bold text-on-surface truncate">李同学</p>
            <p class="text-[11px] text-on-surface-variant">Master Candidate</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 space-y-1">
        <router-link v-for="item in dashboardNavItems" :key="item.to" :to="item.to"
          class="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all text-sm"
          :class="isActive(item.to)
            ? 'bg-primary-soft font-bold text-primary shadow-sm'
            : 'text-on-surface-variant hover:bg-white hover:text-primary'">
          <span class="flex items-center gap-3 min-w-0">
            <span class="material-symbols-outlined text-[20px]"
              :style="isActive(item.to) ? 'font-variation-settings: FILL 1, wght 400, GRAD 0, opsz 24' : ''">
              {{ item.icon }}
            </span>
            <span>{{ item.label }}</span>
          </span>
          <span v-if="item.to === '/dashboard/messages' && unreadCount > 0"
            class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-bold"
            :class="isActive(item.to)
              ? 'bg-red-500 text-white'
              : 'bg-red-100 text-red-600'">
            {{ unreadCount > 9 ? '9+' : unreadCount }}
          </span>
        </router-link>
      </nav>

      <div class="pt-4">
        <router-link to="/assessment"
          class="flex items-center gap-3 px-3 py-2 text-on-surface-variant
                 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all text-sm">
          <span class="material-symbols-outlined text-[20px]">logout</span>
          退出 / 重新测评
        </router-link>
      </div>
    </aside>

    <main class="ml-64 flex-1 min-h-screen p-8 bg-background">
      <header class="mb-8 flex justify-between items-center min-h-14">
        <div>
          <h2 class="font-headline text-2xl font-semibold text-on-surface mb-1">
            你好，李同学 👋
          </h2>
          <p class="text-on-surface-variant font-medium flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">calendar_today</span>
            距离申请季还有 <span class="text-primary font-bold mx-1">8</span> 个月
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button class="w-9 h-9 flex items-center justify-center rounded-xl
                         bg-surface-container-low text-on-surface hover:bg-primary-soft hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px]">search</span>
          </button>
          <router-link to="/consult"
            class="primary-button px-5 py-2.5 text-sm">
            <span class="material-symbols-outlined text-[18px]">edit_calendar</span>
            预约咨询
          </router-link>
        </div>
      </header>

      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useDashboardState } from '../composables/useDashboardState.js'
import { dashboardNavItems } from '../data/dashboard.js'

const route = useRoute()
const { unreadCount } = useDashboardState()

function isActive(path) {
  if (path === '/dashboard') return route.path === '/dashboard'
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
