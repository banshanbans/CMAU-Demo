<template>
  <div class="relative flex items-center justify-center" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- Grid rings -->
      <polygon v-for="r in [1, 0.75, 0.5, 0.25]" :key="r"
        :points="gridPoints(r)"
        fill="none" stroke="#c6c6cd" stroke-width="0.8" opacity="0.5" />

      <!-- Axis lines -->
      <line v-for="(pt, i) in outerPoints" :key="'ax'+i"
        :x1="cx" :y1="cy" :x2="pt.x" :y2="pt.y"
        stroke="#c6c6cd" stroke-width="0.8" opacity="0.4" />

      <!-- Data shape -->
      <polygon :points="dataPoints"
        fill="rgba(45,74,171,0.12)" stroke="#2D4AAB" stroke-width="1.5"
        stroke-linejoin="round" />

      <!-- Data dots -->
      <circle v-for="(pt, i) in scaledPoints" :key="'dot'+i"
        :cx="pt.x" :cy="pt.y" r="3" fill="#2D4AAB" />
    </svg>

    <!-- Axis labels -->
    <div v-for="(label, i) in labels" :key="'lbl'+i"
      class="absolute text-[11px] font-bold text-on-surface text-center leading-tight pointer-events-none"
      :style="labelStyle(i)">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scores: { type: Array, default: () => [0.4, 0.6, 0.5, 0.35, 0.55] },
  labels: { type: Array, default: () => ['科研积累','方向清晰度','时间规划','核心竞争力','英语能力'] },
  size:   { type: Number, default: 260 },
})

const cx = computed(() => props.size / 2)
const cy = computed(() => props.size / 2)
const radius = computed(() => props.size * 0.38)
const n = computed(() => props.scores.length)

// Angle: start from top (-90°)
function angleFor(i) {
  return (2 * Math.PI * i) / n.value - Math.PI / 2
}

const outerPoints = computed(() =>
  props.scores.map((_, i) => ({
    x: cx.value + radius.value * Math.cos(angleFor(i)),
    y: cy.value + radius.value * Math.sin(angleFor(i)),
  }))
)

const scaledPoints = computed(() =>
  props.scores.map((s, i) => ({
    x: cx.value + radius.value * s * Math.cos(angleFor(i)),
    y: cy.value + radius.value * s * Math.sin(angleFor(i)),
  }))
)

const dataPoints = computed(() =>
  scaledPoints.value.map(p => `${p.x},${p.y}`).join(' ')
)

function gridPoints(ratio) {
  return props.scores.map((_, i) => {
    const x = cx.value + radius.value * ratio * Math.cos(angleFor(i))
    const y = cy.value + radius.value * ratio * Math.sin(angleFor(i))
    return `${x},${y}`
  }).join(' ')
}

function labelStyle(i) {
  const angle = angleFor(i)
  const offset = props.size * 0.46
  const x = cx.value + offset * Math.cos(angle)
  const y = cy.value + offset * Math.sin(angle)
  return {
    left: x - 32 + 'px',
    top:  y - 16 + 'px',
    width: '64px',
  }
}
</script>
