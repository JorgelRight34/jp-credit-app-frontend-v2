import {
  BreadcrumbSpec,
  HistoryEduIcon,
  PageLayout,
  PageLayoutBreadcrumb,
  PageLayoutProps,
  PagePanel,
} from '@/components'

interface ChangeHistoryPageProps extends Omit<PageLayoutProps, 'breadcrumb'> {
  breadcrumbs: Array<BreadcrumbSpec>
}

const breadcrumb: BreadcrumbSpec = {
  title: 'Cambios',
  icon: HistoryEduIcon,
  disabled: true,
}

const ChangeHistoryPageLayout = ({
  breadcrumbs,
  children,
  title,
  ...props
}: ChangeHistoryPageProps) => {
  return (
    <PageLayout
      breadcrumb={
        <PageLayoutBreadcrumb breadcrumbs={breadcrumbs.concat(breadcrumb)} />
      }
      title={title + ' / Historial'}
      {...props}
    >
      <PagePanel>{children}</PagePanel>
    </PageLayout>
  )
}

export default ChangeHistoryPageLayout
