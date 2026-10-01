<script setup lang="ts">
/**
 * TopBar — 顶部导航
 * Desktop: 水平菜单（东方 | 西方 | 图鉴 | 趣味）+ 语言/主题切换
 * Mobile:  汉堡菜单 + 底部 tab bar（在 CSS 里处理位置）
 */
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { locale, toggleLocale, useT } from '@/lib/i18n'
import { theme, setTheme, THEMES, type ThemeKey } from '@/lib/theme'

const route = useRoute()
const menuOpen = ref(false)
const themeOpen = ref(false)

const t = useT({
  eastern: ['东方命理', 'Eastern'],
  western: ['西方占卜', 'Western'],
  library: ['图鉴典籍', 'Library'],
  fun:     ['趣味探索', 'Explore'],
  settings:['设置', 'Settings'],
  history: ['历史', 'History'],
})

interface NavGroup {
  label: string
  items: { to: string; label: string; icon: string }[]
}

const groups = computed<NavGroup[]>(() => {
  const zh = locale.value === 'zh'
  return [
    {
      label: t('eastern'),
      items: [
        { to: '/bazi',       label: zh ? '八字排盘' : 'BaZi',         icon: '命' },
        { to: '/ziwei',      label: zh ? '紫微命盘' : 'ZiWei',        icon: '紫' },
        { to: '/liuyao',     label: zh ? '六爻纳甲' : 'Liu Yao',      icon: '爻' },
        { to: '/meihua',     label: zh ? '梅花易数' : 'Plum Blossom',  icon: '梅' },
        { to: '/qimen',      label: zh ? '奇门遁甲' : 'Qi Men',       icon: '门' },
        { to: '/xiaoliuren',  label: zh ? '小六壬' : 'Xiao Liu Ren',   icon: '掌' },
        { to: '/jiaobei',    label: zh ? '杯筊' : 'Moon Blocks',      icon: '筊' },
        { to: '/almanac',    label: zh ? '黄历' : 'Almanac',          icon: '历' },
        { to: '/shuzi',      label: zh ? '数字能量' : 'Numbers',       icon: '数' },
        { to: '/wuxing',     label: zh ? '五行天穹' : 'Five Elements', icon: '行' },
      ],
    },
    {
      label: t('western'),
      items: [
        { to: '/tarot',      label: zh ? '塔罗牌阵' : 'Tarot',        icon: '✦' },
        { to: '/astrology',  label: zh ? '西洋占星' : 'Astrology',     icon: '☉' },
        { to: '/synastry',   label: zh ? '合盘缘分' : 'Synastry',      icon: '☍' },
        { to: '/transits',   label: zh ? '行运天象' : 'Transits',      icon: '⟳' },
        { to: '/numerology', label: zh ? '生命灵数' : 'Numerology',    icon: '∴' },
        { to: '/runes',      label: zh ? '卢恩符文' : 'Runes',         icon: 'ᛟ' },
        { to: '/palmistry',  label: zh ? '手相' : 'Palmistry',        icon: '🖐' },
        { to: '/dreams',     label: zh ? '解梦' : 'Dreams',           icon: '💭' },
        { to: '/crystal',    label: zh ? '水晶' : 'Crystals',         icon: '💎' },
        { to: '/pendulum',   label: zh ? '灵摆' : 'Pendulum',         icon: '🔮' },
        { to: '/orrery',     label: zh ? '天象仪' : 'Orrery',         icon: '🪐' },
        { to: '/moonbreath', label: zh ? '月亮呼吸' : 'Moon Breath',   icon: '🌙' },
        { to: '/biorhythm',  label: zh ? '生物节律' : 'Biorhythm',     icon: '📈' },
        { to: '/gesture',    label: zh ? '手势' : 'Gesture',          icon: '✍️' },
      ],
    },
    {
      label: t('library'),
      items: [
        { to: '/library',    label: zh ? '塔罗图鉴' : 'Card Library',  icon: '📖' },
        { to: '/classics',   label: zh ? '典籍语料' : 'Classics',      icon: '📜' },
        { to: '/geju',       label: zh ? '格局辞典' : 'Patterns',      icon: '局' },
        { to: '/rules',      label: zh ? '规则库' : 'Rules',           icon: '条' },
        { to: '/cases',      label: zh ? '案例库' : 'Cases',           icon: '例' },
      ],
    },
    {
      label: t('fun'),
      items: [
        { to: '/arcade',     label: zh ? '奇趣占卜' : 'Arcade',       icon: '🎮' },
        { to: '/musicbox',   label: zh ? '八音盒' : 'Music Box',      icon: '🎵' },
        { to: '/journey',    label: zh ? '愚人之旅' : "Fool's Journey", icon: '🃏' },
        { to: '/story',      label: zh ? '易道长卷' : 'Yi Scroll',     icon: '📜' },
        { to: '/yanyi',      label: zh ? '推演' : 'Derivation',       icon: '☯' },
        { to: '/sages',      label: zh ? '道长图鉴' : 'Sages',         icon: '👘' },
      ],
    },
  ]
})

function closeMenu() {
  menuOpen.value = false
}

const isActive = (path: string) => route.path === path
</script>

<template>
  <!-- ═══ Top bar ═══ -->
  <header
    class="fixed top-0 inset-x-0 z-50 h-16 flex items-center px-4 lg:px-8 gap-4"
    :style="{ background: 'var(--c-topbar)', backdropFilter: 'blur(16px) saturate(1.4)' }"
  >
    <!-- Logo -->
    <RouterLink to="/" class="flex items-center gap-2 shrink-0 no-underline" @click="closeMenu">
      <span class="text-2xl">☯</span>
      <span class="text-gradient font-semibold text-lg tracking-wide hidden sm:inline">
        天机阁 · 神谕
      </span>
    </RouterLink>

    <!-- Desktop nav groups -->
    <nav class="hidden lg:flex items-center gap-1 ml-4 flex-1">
      <div v-for="group in groups" :key="group.label" class="relative group/nav">
        <button
          class="px-3 py-2 text-sm rounded-lg transition-colors"
          :style="{ color: 'var(--c-text-dim)' }"
          @mouseenter=""
        >
          {{ group.label }}
        </button>
        <!-- Dropdown -->
        <div
          class="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200"
        >
          <div
            class="glass rounded-xl p-2 min-w-56 grid gap-0.5"
            :style="{ boxShadow: 'var(--c-shadow)' }"
          >
            <RouterLink
              v-for="item in group.items"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm no-underline transition-colors"
              :class="isActive(item.to)
                ? 'text-gradient font-medium'
                : ''"
              :style="isActive(item.to)
                ? { background: 'rgba(var(--c-accent-rgb), 0.1)' }
                : { color: 'var(--c-text)' }"
              @mouseenter="($event.currentTarget as HTMLElement).style.background = 'rgba(var(--c-accent-rgb), 0.08)'"
              @mouseleave="($event.currentTarget as HTMLElement).style.background = isActive(item.to) ? 'rgba(var(--c-accent-rgb), 0.1)' : ''"
            >
              <span class="w-6 text-center text-base">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Right controls -->
    <div class="flex items-center gap-2 ml-auto">
      <!-- Language toggle -->
      <button
        class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors"
        :style="{ color: 'var(--c-text-dim)', border: '1px solid var(--c-border)' }"
        @click="toggleLocale"
        :title="locale === 'zh' ? 'Switch to English' : '切换中文'"
      >
        {{ locale === 'zh' ? 'EN' : '中' }}
      </button>

      <!-- Theme picker -->
      <div class="relative">
        <button
          class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          :style="{ color: 'var(--c-text-dim)', border: '1px solid var(--c-border)' }"
          @click="themeOpen = !themeOpen"
          title="主题"
        >
          {{ THEMES.find(t => t.key === theme)?.icon }}
        </button>
        <Transition name="page">
          <div
            v-if="themeOpen"
            class="absolute right-0 top-full mt-2 glass rounded-xl p-2 min-w-40 z-50"
            :style="{ boxShadow: 'var(--c-shadow)' }"
          >
            <button
              v-for="t in THEMES"
              :key="t.key"
              class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-left transition-colors"
              :style="theme === t.key
                ? { background: 'rgba(var(--c-accent-rgb), 0.12)', color: 'var(--c-accent)' }
                : { color: 'var(--c-text)' }"
              @click="setTheme(t.key); themeOpen = false"
            >
              <span>{{ t.icon }}</span>
              <span>{{ t.label[locale === 'zh' ? 0 : 1] }}</span>
            </button>
          </div>
        </Transition>
      </div>

      <!-- History -->
      <RouterLink
        to="/history"
        class="w-8 h-8 rounded-lg items-center justify-center no-underline transition-colors hidden sm:flex"
        :style="{ color: 'var(--c-text-dim)', border: '1px solid var(--c-border)' }"
        title="历史"
      >
        📜
      </RouterLink>

      <!-- Settings -->
      <RouterLink
        to="/settings"
        class="w-8 h-8 rounded-lg items-center justify-center no-underline transition-colors hidden sm:flex"
        :style="{ color: 'var(--c-text-dim)', border: '1px solid var(--c-border)' }"
        title="设置"
      >
        ⚙
      </RouterLink>

      <!-- Mobile hamburger -->
      <button
        class="w-8 h-8 rounded-lg flex items-center justify-center lg:hidden"
        :style="{ color: 'var(--c-text-dim)', border: '1px solid var(--c-border)' }"
        @click="menuOpen = !menuOpen"
      >
        <span class="text-lg">{{ menuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>
  </header>

  <!-- ═══ Mobile slide-out menu ═══ -->
  <Transition name="page">
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-40 lg:hidden"
      @click.self="closeMenu"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60" />
      <!-- Panel -->
      <aside
        class="absolute top-16 right-0 bottom-0 w-72 overflow-y-auto p-4 space-y-4"
        :style="{ background: 'var(--c-bg-2)' }"
      >
        <div v-for="group in groups" :key="group.label">
          <h3
            class="text-xs font-bold uppercase tracking-widest mb-2 px-2"
            :style="{ color: 'var(--c-text-muted)' }"
          >
            {{ group.label }}
          </h3>
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline transition-colors"
            :class="isActive(item.to) ? 'text-gradient' : ''"
            :style="isActive(item.to)
              ? { background: 'rgba(var(--c-accent-rgb), 0.1)' }
              : { color: 'var(--c-text)' }"
            @click="closeMenu"
          >
            <span class="w-6 text-center">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </div>

        <!-- Mobile-only links -->
        <div class="ink-divider my-4" />
        <RouterLink to="/history" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline" :style="{ color: 'var(--c-text)' }" @click="closeMenu">
          <span class="w-6 text-center">📜</span>
          <span>{{ t('history') }}</span>
        </RouterLink>
        <RouterLink to="/settings" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm no-underline" :style="{ color: 'var(--c-text)' }" @click="closeMenu">
          <span class="w-6 text-center">⚙</span>
          <span>{{ t('settings') }}</span>
        </RouterLink>
      </aside>
    </div>
  </Transition>
</template>
