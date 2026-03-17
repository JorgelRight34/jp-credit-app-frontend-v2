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
    <div className="flex w-full flex-1 flex-col pb-3 shadow-sm">
      <div className="hidden w-full border-b p-2 px-3 md:block md:px-5">
        {breadcrumb}
      </div>
      <div className="flex h-[4.2rem] w-full flex-shrink-0 items-center justify-between overflow-y-auto border-l px-3 py-3 md:px-5">
        {/* Title */}
        <BigTitle className="border-left-accent mb-0 truncate pl-2">
          {title}
        </BigTitle>
        <PageLayoutOptionsContainer options={options} />
      </div>
      {/* Body */}
      <div className="bg-background flex flex-1 flex-col">
        <div className="flex flex-1 flex-col px-3 md:px-5">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
