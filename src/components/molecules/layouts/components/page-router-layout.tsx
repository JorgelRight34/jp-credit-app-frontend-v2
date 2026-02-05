import PageLayout from './page-layout'
import type {
  TabsRouterBreadcrumbProps,
  TabsRouterProviderProps,
} from '@/components/organisms'
import type { PageLayoutProps } from './page-layout'
import {
  TabsRouterBreadcrumb,
  TabsRouterProvider,
} from '@/components/organisms'

type PageRouterLayoutProps = Omit<PageLayoutProps, 'breadcrumb'> & {
  routerConfig: Omit<
    TabsRouterBreadcrumbProps & TabsRouterProviderProps,
    'children'
  >
}

const PageRouterLayout = ({
  routerConfig: { defaultActive, tabBreadcrumbMap, baseBreadcrumbs },
  children,
  ...props
}: PageRouterLayoutProps) => {
  return (
    <TabsRouterProvider defaultActive={defaultActive}>
      <PageLayout
        {...props}
        breadcrumb={
          <TabsRouterBreadcrumb
            tabBreadcrumbMap={tabBreadcrumbMap}
            baseBreadcrumbs={baseBreadcrumbs}
          />
        }
      >
        {children}
      </PageLayout>
    </TabsRouterProvider>
  )
}

export default PageRouterLayout
