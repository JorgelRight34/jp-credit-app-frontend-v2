import React, {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Theme = 'light' | 'dark' // Change to numbers

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const THEME_KEY = 'theme'

function applyThemeToDom(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as Theme | null) ?? null
    const systemPrefersDark =
      window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false

    setTheme(saved ?? (systemPrefersDark ? 'dark' : 'light'))
  }, [])

  const toggle = () => {
    startTransition(() =>
      setTheme((value) => {
        const newTheme = value === 'dark' ? 'light' : 'dark'
        localStorage.setItem(THEME_KEY, newTheme)
        applyThemeToDom(newTheme)
        return newTheme
      }),
    )
  }

  const value = useMemo<ThemeContextValue>(() => {
    return {
      theme,
      setTheme,
      toggle,
    }
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
