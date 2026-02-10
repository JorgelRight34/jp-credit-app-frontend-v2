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
  routerConfig: { defaultActive, breadcrumbsByRoute, baseBreadcrumbs },
  children,
  ...props
}: PageRouterLayoutProps) => {
  return (
    <TabsRouterProvider defaultActive={defaultActive}>
      <PageLayout
        {...props}
        breadcrumb={
          <TabsRouterBreadcrumb
            breadcrumbsByRoute={breadcrumbsByRoute}
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
