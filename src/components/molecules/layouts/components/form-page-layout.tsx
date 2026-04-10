import type { BreadcrumbSpec } from '../../breadcrumb'
import type { PageLayoutProps } from './page-layout'
import type { CacheKey } from '@/models'
import {
  ClosedProcessPanel,
  ConfirmationModalProps,
} from '@/components/organisms'
import PageLayout from './page-layout'
import { AddIcon, EditIcon } from '@/components/atoms'
import PageLayoutBreadcrumb from './page-layout-breadcrumb'
import PagePanel from './page-panel'

export type FormPageLayoutProps = React.PropsWithChildren &
  Omit<PageLayoutProps, 'breadcrumb'> &
  Partial<ConfirmationModalProps> & {
    cacheKey?: CacheKey
    deleteConfirmationMessage?: string
    breadcrumbs: Array<BreadcrumbSpec>
  }

export const editBreadcrumb: BreadcrumbSpec = {
  title: 'Editar',
  icon: EditIcon,
  pathname: '.',
  disabled: true,
}

export const createBreadcrumb: BreadcrumbSpec = {
  title: 'Crear',
  icon: AddIcon,
  pathname: '.',
}

export const CreateFormPageLayout = ({
  title,
  breadcrumbs,
  children,
}: FormPageLayoutProps) => {
  return (
    <PageLayout
      title={title}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={breadcrumbs.concat(createBreadcrumb)}
        />
      }
      options={[]}
    >
      {children}
    </PageLayout>
  )
}

export const EditFormPageLayout = ({
  title,
  breadcrumbs,
  cacheKey,
  deleteConfirmationMessage,
  description,
  children,
  ...props
}: FormPageLayoutProps) => {
  return (
    <PageLayout
      {...props}
      title={title}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={breadcrumbs.concat(editBreadcrumb)}
        />
      }
    >
      {children}
    </PageLayout>
  )
}

export const DeleteFormPageLayout = ({
  title,
  disabled,
  breadcrumbs,
  children,
}: FormPageLayoutProps & { disabled?: boolean }) => (
  <PageLayout
    title={title}
    breadcrumb={<PageLayoutBreadcrumb breadcrumbs={breadcrumbs} />}
  >
    <PagePanel>{disabled ? <ClosedProcessPanel /> : children}</PagePanel>
  </PageLayout>
)
