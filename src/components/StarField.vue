<script setup lang="ts">
/**
 * StarField — 全站星空视差背景
 * 三层星点 + 鼠标偏移视差 + 偶尔流星
 * 纯 CSS + minimal JS，尊重 prefers-reduced-motion
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

const parX = ref(0)
const parY = ref(0)
const reducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function onPointer(e: MouseEvent) {
  if (reducedMotion) return
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  parX.value = (e.clientX - cx) / cx
  parY.value = (e.clientY - cy) / cy
}

onMounted(() => {
  if (!reducedMotion) window.addEventListener('mousemove', onPointer, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onPointer)
})
</script>

<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <!-- Layer 1: distant stars -->
    <div
      class="absolute inset-[-20px] star-layer star-layer-1"
      :style="{
        transform: `translate(${parX * 4}px, ${parY * 4}px)`,
      }"
    />
    <!-- Layer 2: mid stars -->
    <div
      class="absolute inset-[-20px] star-layer star-layer-2"
      :style="{
        transform: `translate(${parX * 8}px, ${parY * 8}px)`,
      }"
    />
    <!-- Layer 3: close stars -->
    <div
      class="absolute inset-[-20px] star-layer star-layer-3"
      :style="{
        transform: `translate(${parX * 14}px, ${parY * 14}px)`,
      }"
    />
    <!-- Gradient vignette -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, var(--c-bg) 100%);"
    />
  </div>
</template>

<style scoped>
.star-layer {
  background-size: 300px 300px;
  transition: transform 0.15s ease-out;
}
.star-layer-1 {
  background-image:
    radial-gradient(1px 1px at 50px 120px, rgba(var(--c-accent-rgb), 0.6), transparent),
    radial-gradient(1px 1px at 180px 80px, rgba(var(--c-accent-rgb), 0.4), transparent),
    radial-gradient(1px 1px at 250px 200px, rgba(var(--c-accent-rgb), 0.3), transparent),
    radial-gradient(1px 1px at 100px 260px, rgba(var(--c-accent-rgb), 0.5), transparent);
  opacity: 0.7;
}
.star-layer-2 {
  background-image:
    radial-gradient(1.2px 1.2px at 40px 90px, var(--c-text), transparent),
    radial-gradient(1px 1px at 200px 160px, var(--c-text), transparent),
    radial-gradient(1.5px 1.5px at 140px 240px, rgba(var(--c-accent-rgb), 0.7), transparent);
  background-size: 250px 250px;
  opacity: 0.5;
}
.star-layer-3 {
  background-image:
    radial-gradient(2px 2px at 70px 150px, rgba(var(--c-accent-rgb), 0.9), transparent),
    radial-gradient(1.5px 1.5px at 220px 50px, var(--c-text), transparent);
  background-size: 350px 350px;
  opacity: 0.45;
}

[data-theme="frost"] .star-layer { opacity: 0.1; }
</style>
