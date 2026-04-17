import {
  createContext,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  startTransition,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react'

type Listener<T> = (value: T | null) => void

interface Emitter<T> {
  current: () => T | null
  emit: (value: T | null) => void
  subscribe: (fn: Listener<T>) => () => void
}

const createEmitter = <T,>(): Emitter<T> => {
  const listeners = new Set<Listener<T>>()
  let current: T | null = null

  return {
    current: () => current,
    emit: (value) => {
      current = value
      startTransition(() => {
        for (const listener of listeners) listener(value)
      })
    },
    subscribe: (fn) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
  }
}

export const createPickerContext = <T,>(): [
  ({ children }: { children?: ReactNode }) => ReactElement,
  () => (value: T | null) => void,
  () => T | null,
] => {
  const Context = createContext<Emitter<T> | null>(null)

  const Provider = ({ children }: PropsWithChildren) => {
    const emitter = useRef(createEmitter<T>()).current
    return <Context.Provider value={emitter}>{children}</Context.Provider>
  }

  const useEmit = () => {
    const ctx = useContext(Context)
    if (!ctx) throw new Error('useEmit must be used within a Provider')
    return ctx.emit
  }

  const useValue = () => {
    const ctx = useContext(Context)
    if (!ctx) throw new Error('useValue must be used within a Provider')
    return useSyncExternalStore(ctx.subscribe, ctx.current)
  }

  return [Provider, useEmit, useValue]
}
