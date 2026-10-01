import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { locale } from '@/lib/i18n'

/* Chunk-fail guard: reload once on stale deploy */
const RETRY_KEY = 'oracle-chunk-retry'
function safeImport(load: () => Promise<{ default: unknown }>): () => Promise<{ default: unknown }> {
  return () =>
    load().catch((err) => {
      try {
        const last = Number(sessionStorage.getItem(RETRY_KEY) || 0)
        if (Date.now() - last < 5000) throw err
        sessionStorage.setItem(RETRY_KEY, String(Date.now()))
      } catch { /* ignore */ }
      window.location.reload()
      throw err
    })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    /* ── 东方命理 ── */
    { path: '/bazi',       name: 'bazi',       component: safeImport(() => import('@/views/eastern/BaziView.vue')) },
    { path: '/ziwei',      name: 'ziwei',      component: safeImport(() => import('@/views/eastern/ZiweiView.vue')) },
    { path: '/liuyao',     name: 'liuyao',     component: safeImport(() => import('@/views/eastern/LiuyaoView.vue')) },
    { path: '/meihua',     name: 'meihua',     component: safeImport(() => import('@/views/eastern/MeihuaView.vue')) },
    { path: '/qimen',      name: 'qimen',      component: safeImport(() => import('@/views/eastern/QimenView.vue')) },
    { path: '/xiaoliuren',  name: 'xiaoliuren',  component: safeImport(() => import('@/views/eastern/XiaoLiurenView.vue')) },
    { path: '/jiaobei',    name: 'jiaobei',    component: safeImport(() => import('@/views/eastern/JiaobeiView.vue')) },
    { path: '/almanac',    name: 'almanac',    component: safeImport(() => import('@/views/eastern/AlmanacView.vue')) },
    { path: '/shuzi',      name: 'shuzi',      component: safeImport(() => import('@/views/eastern/ShuziView.vue')) },
    { path: '/wuxing',     name: 'wuxing',     component: safeImport(() => import('@/views/eastern/WuxingView.vue')) },

    /* ── 西方占卜 ── */
    { path: '/tarot',      name: 'tarot',      component: safeImport(() => import('@/views/western/TarotView.vue')) },
    { path: '/astrology',  name: 'astrology',  component: safeImport(() => import('@/views/western/AstrologyView.vue')) },
    { path: '/synastry',   name: 'synastry',   component: safeImport(() => import('@/views/western/SynastryView.vue')) },
    { path: '/transits',   name: 'transits',   component: safeImport(() => import('@/views/western/TransitsView.vue')) },
    { path: '/numerology', name: 'numerology', component: safeImport(() => import('@/views/western/NumerologyView.vue')) },
    { path: '/runes',      name: 'runes',      component: safeImport(() => import('@/views/western/RunesView.vue')) },
    { path: '/palmistry',  name: 'palmistry',  component: safeImport(() => import('@/views/western/PalmistryView.vue')) },
    { path: '/dreams',     name: 'dreams',     component: safeImport(() => import('@/views/western/DreamView.vue')) },
    { path: '/crystal',    name: 'crystal',    component: safeImport(() => import('@/views/western/CrystalView.vue')) },
    { path: '/pendulum',   name: 'pendulum',   component: safeImport(() => import('@/views/western/PendulumView.vue')) },
    { path: '/orrery',     name: 'orrery',     component: safeImport(() => import('@/views/western/OrreryView.vue')) },
    { path: '/moonbreath', name: 'moonbreath', component: safeImport(() => import('@/views/western/MoonBreathView.vue')) },
    { path: '/biorhythm',  name: 'biorhythm',  component: safeImport(() => import('@/views/western/BioRhythmView.vue')) },
    { path: '/gesture',    name: 'gesture',    component: safeImport(() => import('@/views/western/GestureView.vue')) },

    /* ── 图鉴 & 工具 ── */
    { path: '/library',    name: 'library',    component: safeImport(() => import('@/views/library/LibraryView.vue')) },
    { path: '/classics',   name: 'classics',   component: safeImport(() => import('@/views/library/ClassicsView.vue')) },
    { path: '/geju',       name: 'geju',       component: safeImport(() => import('@/views/library/GejuView.vue')) },
    { path: '/rules',      name: 'rules',      component: safeImport(() => import('@/views/library/RulesView.vue')) },
    { path: '/cases',      name: 'cases',      component: safeImport(() => import('@/views/library/CasesView.vue')) },
    { path: '/arcade',     name: 'arcade',     component: safeImport(() => import('@/views/fun/ArcadeView.vue')) },
    { path: '/musicbox',   name: 'musicbox',   component: safeImport(() => import('@/views/fun/MusicBoxView.vue')) },
    { path: '/journey',    name: 'journey',    component: safeImport(() => import('@/views/fun/JourneyView.vue')) },
    { path: '/story',      name: 'story',      component: safeImport(() => import('@/views/fun/StoryView.vue')) },
    { path: '/yanyi',      name: 'yanyi',      component: safeImport(() => import('@/views/fun/YanYiView.vue')) },
    { path: '/sages',      name: 'sages',      component: safeImport(() => import('@/views/fun/SagesView.vue')) },

    /* ── 设置 ── */
    { path: '/history',    name: 'history',    component: safeImport(() => import('@/views/HistoryView.vue')) },
    { path: '/settings',   name: 'settings',   component: safeImport(() => import('@/views/SettingsView.vue')) },

    /* ── 兼容旧路由 ── */
    { path: '/chart', redirect: '/bazi' },
    { path: '/daily', redirect: '/' },
    { path: '/oracle', redirect: '/' },
    { path: '/map', redirect: '/' },
    { path: '/memory', redirect: '/history' },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: (_to, _from, savedPos) => savedPos ?? { top: 0 },
})

/* ── Dynamic page title ── */
const TITLES: Record<string, [string, string]> = {
  '/':           ['天机阁 · 神谕', 'Oracle Pavilion'],
  '/bazi':       ['八字排盘', 'BaZi Chart'],
  '/ziwei':      ['紫微命盘', 'ZiWei Chart'],
  '/liuyao':     ['六爻纳甲', 'Liu Yao'],
  '/meihua':     ['梅花易数', 'Plum Blossom'],
  '/qimen':      ['奇门遁甲', 'Qi Men'],
  '/xiaoliuren': ['小六壬', 'Xiao Liu Ren'],
  '/jiaobei':    ['杯筊问事', 'Moon Blocks'],
  '/almanac':    ['今日黄历', 'Almanac'],
  '/shuzi':      ['数字能量', 'Number Energy'],
  '/wuxing':     ['五行天穹', 'Five Elements'],
  '/tarot':      ['塔罗占卜', 'Tarot Reading'],
  '/astrology':  ['西洋占星', 'Natal Chart'],
  '/synastry':   ['合盘缘分', 'Synastry'],
  '/transits':   ['行运天象', 'Transits'],
  '/numerology': ['生命灵数', 'Numerology'],
  '/runes':      ['卢恩符文', 'Runes'],
  '/palmistry':  ['手相', 'Palmistry'],
  '/dreams':     ['解梦词典', 'Dreams'],
  '/crystal':    ['水晶', 'Crystals'],
  '/pendulum':   ['灵摆', 'Pendulum'],
  '/orrery':     ['天象仪', 'Orrery'],
  '/moonbreath': ['月相呼吸', 'Moon Breath'],
  '/biorhythm':  ['生物节律', 'Biorhythm'],
  '/gesture':    ['手势占卜', 'Gesture'],
  '/library':    ['塔罗图鉴', 'Card Library'],
  '/classics':   ['典籍语料', 'Classics'],
  '/geju':       ['格局辞典', 'Patterns'],
  '/rules':      ['规则库', 'Rules'],
  '/cases':      ['案例库', 'Cases'],
  '/arcade':     ['趣味占卜', 'Arcade'],
  '/musicbox':   ['星光八音盒', 'Music Box'],
  '/journey':    ['愚人之旅', "Fool's Journey"],
  '/story':      ['易道长卷', 'Yi Scroll'],
  '/yanyi':      ['推演长卷', 'Derivation'],
  '/sages':      ['道长图鉴', 'Sages'],
  '/history':    ['占卜历史', 'History'],
  '/settings':   ['设置', 'Settings'],
}

router.afterEach((to) => {
  const pair = TITLES[to.path]
  if (pair) {
    const idx = locale.value === 'zh' ? 0 : 1
    document.title = `${pair[idx]} · 天机阁`
  }
})

export default router
