import { ref, watchEffect } from 'vue'

export type ThemeKey = 'ink' | 'frost' | 'cinnabar' | 'plum'

export interface ThemeMeta {
  key: ThemeKey
  label: [string, string]   // [zh, en]
  icon: string
}

export const THEMES: ThemeMeta[] = [
  { key: 'ink',       label: ['墨玉星辰', 'Ink & Stars'],    icon: '🌌' },
  { key: 'frost',     label: ['月白清霜', 'Frost Moon'],     icon: '🌙' },
  { key: 'cinnabar',  label: ['朱砂血月', 'Cinnabar Moon'],  icon: '🔴' },
  { key: 'plum',      label: ['青梅烟雨', 'Plum Rain'],      icon: '🌿' },
]

const STORAGE_KEY = 'oracle-theme'
const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const validKeys = THEMES.map(t => t.key) as string[]

export const theme = ref<ThemeKey>(
  saved && validKeys.includes(saved) ? saved as ThemeKey : 'ink'
)

export function setTheme(key: ThemeKey): void {
  theme.value = key
  try { localStorage.setItem(STORAGE_KEY, key) } catch { /* private mode */ }
}

// Apply to DOM automatically
watchEffect(() => {
  const t = theme.value
  if (typeof document === 'undefined') return
  const el = document.documentElement
  if (t === 'ink') {
    el.removeAttribute('data-theme')
  } else {
    el.setAttribute('data-theme', t)
  }
  // Update meta theme-color for PWA
  const meta = document.querySelector('meta[name="theme-color"]')
  const colors: Record<ThemeKey, string> = {
    ink: '#080b14',
    frost: '#f0f2f5',
    cinnabar: '#0e0708',
    plum: '#0a110e',
  }
  if (meta) meta.setAttribute('content', colors[t])
})
