import PageLayoutOptionsContainer from './page-layout-options-container'
import { Suspense, type ReactNode } from 'react'
import type { LayoutOption } from '../models/pageLayoutOption'
import { BigTitle } from '@/components'

export interface PageLayoutProps {
  children: ReactNode
  title: string
  options?: Array<LayoutOption>
  breadcrumb?: ReactNode
}

const PageLayout = ({
  children,
  title,
  breadcrumb,
  options = [],
}: PageLayoutProps) => {
  return (
    <div className="flex flex-1 w-full flex-col pb-6 shadow-sm">
      <div className="border-b w-full p-2 px-6">{breadcrumb}</div>
      <div className="pt-lg-0 px-6 px-lg-3 flex w-full flex-shrink-0 items-center justify-between py-3 h-[4.2rem] overflow-y-auto flex-shrink-0">
        {/* Title */}
        <BigTitle className="border-left-accent mb-0 truncate pl-2">
          {title}
        </BigTitle>
        <PageLayoutOptionsContainer options={options} />
      </div>
      {/* Body */}
      <div className="flex flex-col flex-1 flex flex-1 flex-col p-0 bg-background">
        <div className="flex flex-1 flex-col px-3">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
