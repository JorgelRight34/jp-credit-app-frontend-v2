import type { BreadcrumbSpec } from '../../breadcrumb'
import type { PageLayoutProps } from './page-layout'
import type { CacheKey } from '@/models'
import type { PermissionsProvider } from '@/components/organisms'
import type { ConfirmationModalProps } from '@/components/organisms/modal/components/confirmation-modal'
import PageLayout from './page-layout'
import { AddIcon, EditIcon } from '@/components/atoms'
import PageLayoutBreadcrumb from './page-layout-breadcrumb'

export type FormPageLayoutProps = React.PropsWithChildren &
  PageLayoutProps &
  Partial<ConfirmationModalProps> & {
    cacheKey?: CacheKey
    deleteConfirmationMessage?: string
    permissionProvider: PermissionsProvider
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
  permissionProvider,
  title,
  breadcrumbs,
  children,
}: FormPageLayoutProps) => {
  return (
    <PageLayout
      title={title}
      permissionProvider={permissionProvider}
      isAuthorizedFn={(p) => p.canCreate}
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
  permissionProvider,
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
      permissionProvider={permissionProvider}
      isAuthorizedFn={(p) => p.canEdit}
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
