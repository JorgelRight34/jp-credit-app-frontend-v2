import EntityLayoutContent from './entity-layout-content'
import EntityLayoutOptionsContainer from './entity-layout-options-container'
import EntityLayoutBreadcrumb from './entity-layout-breadcrumb'
import type { ReactNode } from 'react'
import type { PermissionsProvider } from '@/models/permissionsProvider'
import type { BreadcrumbSpec } from '@/components'
import type { LayoutOption } from '../models/entityLayoutOption'
import { BigTitle } from '@/components'

export interface EntityLayoutProps {
  children: ReactNode
  title: string
  height?: string
  permissionProvider: PermissionsProvider
  showTopOptions?: boolean
  breadcrumbs?: Array<BreadcrumbSpec>
  options: Array<LayoutOption>
  validateProject?: boolean
}

const EntityLayout = ({
  children,
  title,
  breadcrumbs = [],
  options,
  ...props
}: EntityLayoutProps) => {
  return (
    <div
      className="flex !h-full w-full flex-col overflow-y-auto border !bg-white px-6 pb-6 shadow-sm"
      {...props}
    >
      <div className="border-b mb-3 w-full bg-white p-2">
        <EntityLayoutBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <div className="pt-lg-0 px-lg-3 flex w-full flex-shrink-0 items-center justify-between pb-6 flex-shrink-0">
        {/* Title */}
        <BigTitle className="border-left-accent mb-0 truncate text-3xl pl-2">
          {title}
        </BigTitle>
        <EntityLayoutOptionsContainer options={options} />
      </div>
      {/* Body */}
      <div className="px-lg-3 flex flex-1 flex-col p-0">
        <EntityLayoutContent {...props}>{children}</EntityLayoutContent>
      </div>
    </div>
  )
}

export default EntityLayout
