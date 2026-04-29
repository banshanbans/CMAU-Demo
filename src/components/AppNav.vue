<template>
  <header class="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-2xl shadow-card">
    <div class="relative flex items-center h-16 px-6 max-w-screen-2xl mx-auto">
      <!-- Brand -->
      <router-link to="/home"
        class="text-xl font-bold tracking-tighter text-primary font-headline select-none">
        见数Credamo
      </router-link>

      <!-- Nav Links -->
      <nav class="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
        <router-link v-for="item in navItems" :key="item.to" :to="item.to"
          class="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-lg"
          :class="isActive(item.to)
            ? 'text-primary bg-primary-soft'
            : 'text-on-surface-variant hover:text-primary hover:bg-primary-soft/70'">
          <span class="material-symbols-outlined text-[18px]"
            :class="isActive(item.to) ? 'filled' : ''"
            :style="isActive(item.to) ? 'font-variation-settings: FILL 1, wght 400, GRAD 0, opsz 24' : ''">
            {{ item.icon }}
          </span>
          {{ item.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/home',       label: '首页',   icon: 'home' },
  { to: '/assessment', label: '测评',   icon: 'fact_check' },
  { to: '/results',    label: '报告',   icon: 'analytics' },
  { to: '/services',   label: '服务',   icon: 'school' },
  { to: '/content',    label: '内容',   icon: 'article' },
  { to: '/cases',      label: '案例',   icon: 'workspaces' },
  { to: '/dashboard',  label: '控制台', icon: 'dashboard' },
]

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
