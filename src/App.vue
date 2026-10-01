<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from '@/components/TopBar.vue'
import StarField from '@/components/StarField.vue'
</script>

<template>
  <StarField />
  <TopBar />
  <main class="relative z-10 min-h-dvh pt-16 pb-24 lg:pb-8">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>
