import {
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  LightPillLinkBtn,
  LinkProps,
  PageLayout,
  PageLayoutBreadcrumb,
  PagePanel,
  PrintIcon,
  ReportIcon,
} from '@/components'
import { PropsWithChildren } from 'react'

export const reportsBreadcrumb: BreadcrumbSpec = {
  title: 'Reportes',
  icon: ReportIcon,
  pathname: '..',
}

interface ReportsPageLayoutProps extends PropsWithChildren {
  title?: string
  breadcrumb: BreadcrumbSpec
  generateRoute: LinkProps['to']
  createRoute: LinkProps['to']
}

const ReportsPageLayout = ({
  title = 'Reportes',
  breadcrumb,
  children,
  generateRoute,
  createRoute,
}: ReportsPageLayoutProps) => (
  <PageLayout
    title={title}
    options={[
      {
        title: 'Generar',
        to: generateRoute,
        icon: PrintIcon,
        component: LightPillLinkBtn,
      },
      buildPageLayoutCreateOption(createRoute),
    ]}
    breadcrumb={
      <PageLayoutBreadcrumb breadcrumbs={[breadcrumb, reportsBreadcrumb]} />
    }
  >
    <PagePanel>{children}</PagePanel>
  </PageLayout>
)

export default ReportsPageLayout
