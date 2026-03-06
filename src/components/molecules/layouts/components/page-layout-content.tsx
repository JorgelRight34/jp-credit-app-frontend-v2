import { Suspense } from 'react'
import type { ReactNode } from 'react'

interface PageLayoutContentProps {
  children: ReactNode
  validateProject?: boolean
}

const PageLayoutContent = ({ children }: PageLayoutContentProps) => {
  return (
    <div className="p-3 flex flex-1 flex-col p-0">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  )
}

export default PageLayoutContent
