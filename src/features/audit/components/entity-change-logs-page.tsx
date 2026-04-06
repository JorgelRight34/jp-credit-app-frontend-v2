import {
  BreadcrumbSpec,
  HistoryEduIcon,
  PageLayout,
  PageLayoutBreadcrumb,
  PageLayoutProps,
} from '@/components'

interface EntityChangeLogsPageProps extends Omit<
  PageLayoutProps,
  'children' | 'breadcrumb'
> {
  type: string
  breadcrumbs: Array<BreadcrumbSpec>
}

const breadcrumb: BreadcrumbSpec = {
  title: 'Cambios',
  icon: HistoryEduIcon,
  disabled: true,
}

const EntityChangeLogsPage = ({
  type,
  breadcrumbs,
  ...props
}: EntityChangeLogsPageProps) => {
  return (
    <PageLayout
      breadcrumb={
        <PageLayoutBreadcrumb breadcrumbs={breadcrumbs.concat(breadcrumb)} />
      }
      {...props}
    >
      aun
    </PageLayout>
  )
}

export default EntityChangeLogsPage
