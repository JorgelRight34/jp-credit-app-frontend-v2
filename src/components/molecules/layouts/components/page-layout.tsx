import PageLayoutContent from './page-layout-content'
import PageLayoutOptionsContainer from './page-layout-options-container'
import type { ReactNode } from 'react'
import type { LayoutOption } from '../models/pageLayoutOption'
import type { IsAuthorizedFn, PermissionsProvider } from '@/components'
import { BigTitle } from '@/components'

export interface PageLayoutProps {
  children: ReactNode
  title: string
  permissionProvider: PermissionsProvider
  options?: Array<LayoutOption>
  validateProject?: boolean
  breadcrumb?: ReactNode
  isAuthorizedFn?: IsAuthorizedFn
}

const PageLayout = ({
  children,
  title,
  breadcrumb,
  options = [],
  ...props
}: PageLayoutProps) => {
  return (
    <div className="flex flex-1 w-full flex-col  px-6 pb-6 shadow-sm">
      <div className="border-b mb-3 w-full bg-white p-2">{breadcrumb}</div>
      <div className="pt-lg-0 px-lg-3 flex w-full flex-shrink-0 items-center justify-between pb-3 flex-shrink-0">
        {/* Title */}
        <BigTitle className="border-left-accent mb-0 truncate text-3xl pl-2">
          {title}
        </BigTitle>
        <PageLayoutOptionsContainer options={options} />
      </div>
      {/* Body */}
      <div className="px-lg-3 flex flex-1 flex-col p-0">
        <PageLayoutContent {...props}>{children}</PageLayoutContent>
      </div>
    </div>
  )
}

export default PageLayout
