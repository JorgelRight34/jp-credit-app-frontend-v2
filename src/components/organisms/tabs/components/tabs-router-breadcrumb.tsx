import { useActiveTabRoute } from '../contexts/tabs-router-context'
import type { BreadcrumbSpec, RouteBreadcrumbMap } from '@/components/molecules'
import EntityLayoutBreadcrumb from '@/components/molecules/layouts/components/entity-layout-breadcrumb'

interface TabsRouterBreadcrumbProps {
  tabBreadcrumbMap: RouteBreadcrumbMap
  baseBreadcrumbs: Array<BreadcrumbSpec>
}

const TabsRouterBreadcrumb = ({
  tabBreadcrumbMap,
  baseBreadcrumbs,
}: TabsRouterBreadcrumbProps) => {
  const activeRoute = useActiveTabRoute()

  return (
    <EntityLayoutBreadcrumb
      breadcrumbs={baseBreadcrumbs.concat(tabBreadcrumbMap[activeRoute])}
    />
  )
}

export default TabsRouterBreadcrumb
