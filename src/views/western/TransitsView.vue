<script setup lang="ts">
import { useT } from '@/lib/i18n'
const t = useT({ title: ['行运天象', 'Transits'], wip: ['施工中…', 'Under construction…'] })
</script>
<template>
  <div class="max-w-4xl mx-auto px-4 py-12 text-center">
    <h1 class="text-3xl font-bold mb-4 text-gradient">{{ t('title') }}</h1>
    <p style="color: var(--c-text-dim);">{{ t('wip') }}</p>
  </div>
</template>
