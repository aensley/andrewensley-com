import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(next: Theme): void {
  document.documentElement.setAttribute('data-bs-theme', next)
  try {
    localStorage.setItem('theme', next)
  } catch {}

  const id = 'hljs-dark-theme'
  if (next === 'dark') {
    if (document.getElementById(id) === null) {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = '/hljs-dark.css'
      document.head.appendChild(link)
    }
  } else {
    document.getElementById(id)?.remove()
  }
}

export function useTheme(): { theme: Theme; toggle: () => void; mounted: boolean } {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setThemeState(readTheme())
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      applyTheme(next)
      return next
    })
  }, [])

  return { theme, toggle, mounted }
}
