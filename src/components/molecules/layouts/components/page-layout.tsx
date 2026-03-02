import PageLayoutContent from './page-layout-content'
import PageLayoutOptionsContainer from './page-layout-options-container'
import type { ReactNode } from 'react'
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
  ...props
}: PageLayoutProps) => {
  return (
    <div className="flex flex-1 w-full flex-col pb-6 shadow-sm">
      <div className="border-b w-full bg-white p-2 px-6">{breadcrumb}</div>
      <div className="flex flex-col flex-1 px-6">
        <div className="pt-lg-0 px-lg-3 flex w-full flex-shrink-0 items-center justify-between py-3 h-[4.2rem] overflow-y-auto flex-shrink-0">
          {/* Title */}
          <BigTitle className="border-left-accent mb-0 truncate text-2xl pl-2">
            {title}
          </BigTitle>
          <PageLayoutOptionsContainer options={options} />
        </div>
        {/* Body */}
        <div className="px-lg-3 flex flex-1 flex-col p-0">
          <PageLayoutContent {...props}>{children}</PageLayoutContent>
        </div>
      </div>
    </div>
  )
}

export default PageLayout
