import { useActiveTabRoute } from '../providers/tabs-router-provider'
import type { BreadcrumbSpec, BreadcrumbsByRoute } from '@/components/molecules'
import EntityLayoutBreadcrumb from '@/components/molecules/layouts/components/page-layout-breadcrumb'

export interface TabsRouterBreadcrumbProps {
  breadcrumbsByRoute: BreadcrumbsByRoute
  baseBreadcrumbs: Array<BreadcrumbSpec>
}

const TabsRouterBreadcrumb = ({
  breadcrumbsByRoute,
  baseBreadcrumbs,
}: TabsRouterBreadcrumbProps) => {
  const activeRoute = useActiveTabRoute()

  return (
    <EntityLayoutBreadcrumb
      breadcrumbs={baseBreadcrumbs.concat(breadcrumbsByRoute[activeRoute])}
    />
  )
}

export default TabsRouterBreadcrumb
