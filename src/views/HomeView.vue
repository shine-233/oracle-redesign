<script setup lang="ts">
/**
 * HomeView — 天机阁 · 神谕 首页
 *
 * 布局：
 * 1. 英雄区：大标题 + 副标题 + 今日概览
 * 2. 东方命理模块网格
 * 3. 西方占卜模块网格
 * 4. 图鉴与趣味探索
 */
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { locale, useT } from '@/lib/i18n'

const t = useT({
  tagline:    ['星辰不语，自有答案', 'The stars answer in silence'],
  subtitle:   ['东西方命理殿堂 · 纯浏览器本地运算 · 数据不出本机', 'Eastern & Western divination · Pure browser-side · Your data stays local'],
  eastern:    ['东方命理', 'Eastern Arts'],
  easternSub: ['子平八字 · 紫微斗数 · 六爻纳甲 · 奇门遁甲', 'BaZi · ZiWei · Liu Yao · Qi Men'],
  western:    ['西方占卜', 'Western Oracle'],
  westernSub: ['塔罗 · 占星 · 灵数 · 卢恩 · 解梦', 'Tarot · Astrology · Numerology · Runes · Dreams'],
  explore:    ['图鉴与探索', 'Library & Explore'],
  exploreSub: ['典籍语料 · 格局辞典 · 趣味占卜', 'Classics · Patterns · Fun Divination'],
})

interface ModuleCard {
  to: string
  icon: string
  label: [string, string]
  desc: [string, string]
  accent?: string
}

const easternModules: ModuleCard[] = [
  { to: '/bazi',   icon: '命', label: ['八字排盘', 'BaZi Chart'],   desc: ['四柱翻牌 · 七维雷达 · 百分位评分', 'Pillar cards · Radar · Percentile scoring'], accent: 'var(--c-fire)' },
  { to: '/ziwei',  icon: '紫', label: ['紫微命盘', 'ZiWei Dou Shu'], desc: ['十二宫交互 · 三方四正 · 四化飞星', '12 palaces · Triads · Flying stars'], accent: 'var(--c-water)' },
  { to: '/liuyao', icon: '爻', label: ['六爻纳甲', 'Liu Yao'],      desc: ['铜钱摇卦 · 六亲六兽 · 世应旬空', 'Coin toss · Six relations · Void cycles'], accent: 'var(--c-earth)' },
  { to: '/meihua', icon: '梅', label: ['梅花易数', 'Plum Blossom'], desc: ['时间起卦 · 体用生克 · 全链推演', 'Time hexagram · Body/use cycle'], accent: 'var(--c-wood)' },
  { to: '/qimen',  icon: '门', label: ['奇门遁甲', 'Qi Men'],      desc: ['九宫飞盘 · 奇仪格局 · 吉凶判断', 'Nine palaces · Stars · Verdicts'], accent: 'var(--c-metal)' },
  { to: '/wuxing', icon: '行', label: ['五行天穹', 'Five Elements'], desc: ['3D 体素建模 · 生克联动 · 拖拽交互', '3D voxels · Generation/restraint'], accent: 'var(--c-accent)' },
]

const westernModules: ModuleCard[] = [
  { to: '/tarot',      icon: '✦', label: ['塔罗牌阵', 'Tarot'],       desc: ['78 张韦特 · 四种牌阵 · 3D 翻牌', '78 RWS cards · 4 spreads · 3D flip'], accent: '#a78bfa' },
  { to: '/astrology',  icon: '☉', label: ['西洋占星', 'Natal Chart'], desc: ['18 星体 · SVG 星盘 · 格局检测', '18 bodies · SVG wheel · Pattern detect'], accent: '#fbbf24' },
  { to: '/synastry',   icon: '☍', label: ['合盘缘分', 'Synastry'],    desc: ['双环星盘 · 交叉相位 · 缘分指数', 'Dual wheel · Cross aspects · Score'], accent: '#f472b6' },
  { to: '/transits',   icon: '⟳', label: ['行运天象', 'Transits'],    desc: ['实时行星 × 本命 · 今日主线', 'Live planets × natal · Today story'], accent: '#5eead4' },
  { to: '/numerology', icon: '∴', label: ['生命灵数', 'Numerology'],  desc: ['五数分析 · 约减链动画 · 流日', '5 numbers · Reduction chain · Day flow'], accent: '#c084fc' },
  { to: '/runes',      icon: 'ᛟ', label: ['卢恩符文', 'Runes'],       desc: ['古弗萨克 24 符 · 正倒位', 'Elder Futhark 24 · Upright/reversed'], accent: '#94a3b8' },
]

const moreModules: ModuleCard[] = [
  { to: '/dreams',    icon: '💭', label: ['解梦词典', 'Dreams'],   desc: ['Miller 2250 词条', '2250 entries'] },
  { to: '/palmistry', icon: '🖐', label: ['手相', 'Palmistry'],   desc: ['SVG 掌纹 · 逐线解读', 'SVG palm · Line readings'] },
  { to: '/crystal',   icon: '💎', label: ['水晶', 'Crystals'],    desc: ['宝石民俗 · 能量日历', 'Gem folklore · Energy calendar'] },
  { to: '/orrery',    icon: '🪐', label: ['天象仪', 'Orrery'],    desc: ['真实星历 · 时间加速', 'Real ephemeris · Time warp'] },
  { to: '/classics',  icon: '📜', label: ['典籍语料', 'Classics'], desc: ['七书 × 八主题 · 密度矩阵', '7 books × 8 topics'] },
  { to: '/library',   icon: '📖', label: ['塔罗图鉴', 'Library'],  desc: ['78 张全图鉴 · 详解', '78 card gallery'] },
  { to: '/arcade',    icon: '🎮', label: ['趣味占卜', 'Arcade'],   desc: ['骰子 · 转盘 · 御神签', 'Dice · Wheel · Fortune slips'] },
  { to: '/musicbox',  icon: '🎵', label: ['八音盒', 'Music Box'],  desc: ['北斗七星键盘 · 音序器', 'Star keys · Sequencer'] },
]

function l(pair: [string, string]): string {
  return pair[locale.value === 'zh' ? 0 : 1]
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- ═══ Hero ═══ -->
    <section class="pt-20 pb-16 sm:pt-28 sm:pb-20 text-center">
      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        style="font-family: var(--font-display);"
      >
        <span class="text-gradient">天机阁</span>
        <span class="mx-3 inline-block" style="color: var(--c-text-muted);">·</span>
        <span style="color: var(--c-text);">神谕</span>
      </h1>
      <p
        class="text-xl sm:text-2xl mb-3 italic tracking-wide"
        style="font-family: var(--font-display); color: var(--c-text-dim);"
      >
        {{ t('tagline') }}
      </p>
      <p class="text-sm max-w-lg mx-auto" style="color: var(--c-text-muted);">
        {{ t('subtitle') }}
      </p>

      <!-- Quick action buttons -->
      <div class="flex flex-wrap justify-center gap-3 mt-10">
        <RouterLink
          to="/bazi"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold no-underline transition-all duration-200 hover:scale-105"
          style="background: linear-gradient(135deg, var(--c-btn-from), var(--c-btn-to)); color: var(--c-btn-ink); box-shadow: 0 4px 20px rgba(var(--c-accent-rgb), 0.3);"
        >
          <span>命</span>
          {{ locale === 'zh' ? '排八字' : 'BaZi Chart' }}
        </RouterLink>
        <RouterLink
          to="/tarot"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold no-underline transition-all duration-200 hover:scale-105"
          style="border: 1px solid var(--c-border); color: var(--c-text); background: var(--c-glass);"
        >
          <span>✦</span>
          {{ locale === 'zh' ? '抽塔罗' : 'Tarot Reading' }}
        </RouterLink>
        <RouterLink
          to="/astrology"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold no-underline transition-all duration-200 hover:scale-105"
          style="border: 1px solid var(--c-border); color: var(--c-text); background: var(--c-glass);"
        >
          <span>☉</span>
          {{ locale === 'zh' ? '看星盘' : 'Natal Chart' }}
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Eastern Modules ═══ -->
    <section class="mb-20">
      <div class="flex items-baseline gap-3 mb-2">
        <h2 class="text-2xl font-bold" style="color: var(--c-text);">{{ t('eastern') }}</h2>
        <span class="text-xs tracking-widest" style="color: var(--c-text-muted);">
          {{ t('easternSub') }}
        </span>
      </div>
      <div class="ink-divider mb-8" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RouterLink
          v-for="mod in easternModules"
          :key="mod.to"
          :to="mod.to"
          class="group glass glow-border rounded-2xl p-5 no-underline transition-all duration-300 hover:scale-[1.02]"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 transition-colors"
              :style="{ background: `${mod.accent || 'var(--c-accent)'}15`, color: mod.accent || 'var(--c-accent)' }"
            >
              {{ mod.icon }}
            </div>
            <div class="min-w-0">
              <h3 class="text-base font-semibold mb-1 group-hover:text-gradient transition-colors" style="color: var(--c-text);">
                {{ l(mod.label) }}
              </h3>
              <p class="text-xs leading-relaxed" style="color: var(--c-text-dim);">
                {{ l(mod.desc) }}
              </p>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Western Modules ═══ -->
    <section class="mb-20">
      <div class="flex items-baseline gap-3 mb-2">
        <h2 class="text-2xl font-bold" style="color: var(--c-text);">{{ t('western') }}</h2>
        <span class="text-xs tracking-widest" style="color: var(--c-text-muted);">
          {{ t('westernSub') }}
        </span>
      </div>
      <div class="ink-divider mb-8" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RouterLink
          v-for="mod in westernModules"
          :key="mod.to"
          :to="mod.to"
          class="group glass glow-border rounded-2xl p-5 no-underline transition-all duration-300 hover:scale-[1.02]"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors"
              :style="{ background: `${mod.accent || 'var(--c-accent)'}15`, color: mod.accent || 'var(--c-accent)' }"
            >
              {{ mod.icon }}
            </div>
            <div class="min-w-0">
              <h3 class="text-base font-semibold mb-1 group-hover:text-gradient transition-colors" style="color: var(--c-text);">
                {{ l(mod.label) }}
              </h3>
              <p class="text-xs leading-relaxed" style="color: var(--c-text-dim);">
                {{ l(mod.desc) }}
              </p>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Library & Explore ═══ -->
    <section class="mb-20">
      <div class="flex items-baseline gap-3 mb-2">
        <h2 class="text-2xl font-bold" style="color: var(--c-text);">{{ t('explore') }}</h2>
        <span class="text-xs tracking-widest" style="color: var(--c-text-muted);">
          {{ t('exploreSub') }}
        </span>
      </div>
      <div class="ink-divider mb-8" />

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <RouterLink
          v-for="mod in moreModules"
          :key="mod.to"
          :to="mod.to"
          class="group glass glow-border rounded-xl p-4 no-underline text-center transition-all duration-300 hover:scale-[1.03]"
        >
          <div class="text-2xl mb-2">{{ mod.icon }}</div>
          <h3 class="text-sm font-semibold mb-1" style="color: var(--c-text);">{{ l(mod.label) }}</h3>
          <p class="text-xs" style="color: var(--c-text-dim);">{{ l(mod.desc) }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Footer ═══ -->
    <footer class="text-center py-12">
      <div class="ink-divider mb-8" />
      <p class="text-xs" style="color: var(--c-text-muted);">
        {{ locale === 'zh'
          ? '仅供传统文化研究与娱乐参考，不构成人生建议。纯浏览器本地运算，数据不出本机。'
          : 'For cultural research and entertainment only. All computations run locally in your browser.'
        }}
      </p>
      <p class="text-xs mt-2" style="color: var(--c-text-muted);">
        MIT License · {{ new Date().getFullYear() }}
      </p>
    </footer>
  </div>
</template>
