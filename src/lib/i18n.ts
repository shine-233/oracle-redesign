import { ref, computed } from 'vue'

export type Locale = 'zh' | 'en'

const STORAGE_KEY = 'oracle-locale'
const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
export const locale = ref<Locale>((saved === 'en' ? 'en' : 'zh'))

export function setLocale(l: Locale): void {
  locale.value = l
  try { localStorage.setItem(STORAGE_KEY, l) } catch { /* private mode */ }
}

export function toggleLocale(): void {
  setLocale(locale.value === 'zh' ? 'en' : 'zh')
}

/**
 * Simple i18n dictionary helper.
 * Usage: const t = useT({ hello: ['你好', 'Hello'] })
 *        t('hello') → '你好' or 'Hello'
 */
type Dict = Record<string, [string, string]>

export function useT<T extends Dict>(dict: T) {
  return (key: keyof T): string => {
    const pair = dict[key]
    if (!pair) return String(key)
    return pair[locale.value === 'zh' ? 0 : 1]
  }
}

export const isZh = computed(() => locale.value === 'zh')
