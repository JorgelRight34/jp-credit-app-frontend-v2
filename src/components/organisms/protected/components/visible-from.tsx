import { useWindowBreakpoint } from '@/hooks/useWindowBreakpoint'
import { PropsWithChildren } from 'react'

const VisibleFrom = ({
  breakpoint,
  children,
}: PropsWithChildren<{ breakpoint: number }>) => {
  const isBreakpoint = useWindowBreakpoint(breakpoint)

  if (isBreakpoint) return children

  return null
}

export default VisibleFrom
