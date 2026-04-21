<template>
  <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold"
    :style="{ backgroundColor: bg, color: fg }">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: { type: String, default: 'gray' },
})

const palette = {
  yellow: { bg: 'rgba(234,179,8,0.15)',  fg: '#854D0E' },
  blue:   { bg: 'rgba(59,130,246,0.15)', fg: '#1E40AF' },
  purple: { bg: 'rgba(168,85,247,0.15)', fg: '#581C87' },
  red:    { bg: 'rgba(239,68,68,0.15)',  fg: '#991B1B' },
  gray:   { bg: 'rgba(100,116,139,0.15)',fg: '#1E293B' },
  green:  { bg: 'rgba(16,185,129,0.15)', fg: '#065F46' },
  teal:   { bg: 'rgba(0,106,97,0.15)',   fg: '#006a61' },
}

const bg = computed(() => palette[props.color]?.bg ?? palette.gray.bg)
const fg = computed(() => palette[props.color]?.fg ?? palette.gray.fg)
</script>
