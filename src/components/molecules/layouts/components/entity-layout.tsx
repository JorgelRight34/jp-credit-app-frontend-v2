import EntityLayoutContent from './entity-layout-content'
import EntityLayoutOptionsContainer from './entity-layout-options-container'
import type { ReactNode } from 'react'
import type { PermissionsProvider } from '@/models/permissionsProvider'
import type { BreadcrumbSpec } from '@/components'
import type { LayoutOption } from '../models/entityLayoutOption'
import { SMALL_SCREEN_BREAKPOINT } from '@/lib/utils/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Breadcrumb } from '@/components'

export interface EntityLayoutProps {
  children: ReactNode
  title: string
  height?: string
  permissionsProvider?: PermissionsProvider
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
      className="flex !h-full w-full flex-col overflow-y-auto border bg-white px-3 pb-3 shadow-sm"
      {...props}
    >
      <div className="border-bottom mb-3 w-full bg-white p-2">
        <EntityLayoutBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <div className="pt-lg-0 px-lg-3 flex w-full flex-shrink-0 items-center justify-between pb-2 flex-shrink-0">
        {/* Title */}
        <h3 className="border-left-accent mb-0 truncate pl-2">{title}</h3>
        <EntityLayoutOptionsContainer options={options} />
      </div>
      {/* Body */}
      <div className="px-lg-3 flex flex-1 flex-col p-0">
        <EntityLayoutContent {...props}>{children}</EntityLayoutContent>
      </div>
    </div>
  )
}

const EntityLayoutBreadcrumb = ({
  breadcrumbs,
}: {
  breadcrumbs: Array<BreadcrumbSpec>
}) => {
  const isSmallScreen = useMediaQuery(SMALL_SCREEN_BREAKPOINT)

  return (
    <Breadcrumb maxItems={isSmallScreen ? 3 : 4} breadcrumbs={breadcrumbs} />
  )
}

export default EntityLayout
