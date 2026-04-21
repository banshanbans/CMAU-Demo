<template>
  <header class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl"
          style="box-shadow: 0 1px 0 rgba(15,23,42,0.06);">
    <div class="relative flex items-center h-16 px-6 max-w-screen-2xl mx-auto">
      <!-- Brand -->
      <router-link to="/home"
        class="text-xl font-bold tracking-tighter text-on-surface font-headline select-none">
        见数Credamo
      </router-link>

      <!-- Nav Links -->
      <nav class="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
        <router-link v-for="item in navItems" :key="item.to" :to="item.to"
          class="text-sm font-medium transition-colors duration-200 pb-0.5"
          :class="isActive(item.to)
            ? 'text-on-surface border-b-2 border-on-surface'
            : 'text-on-surface-variant hover:text-secondary'">
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
  { to: '/home',       label: '首页' },
  { to: '/assessment', label: '测评' },
  { to: '/results',    label: '报告' },
  { to: '/services',   label: '服务' },
  { to: '/content',    label: '内容' },
  { to: '/cases',      label: '案例' },
  { to: '/dashboard',  label: '控制台' },
]

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
