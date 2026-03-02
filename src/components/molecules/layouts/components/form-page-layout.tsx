import type { BreadcrumbSpec } from '../../breadcrumb'
import type { PageLayoutProps } from './page-layout'
import type { CacheKey } from '@/models'
import {
  ConfirmationModalProps,
  ProtectedComponent,
  type PermissionsProvider,
} from '@/components/organisms'
import PageLayout from './page-layout'
import { AddIcon, EditIcon } from '@/components/atoms'
import PageLayoutBreadcrumb from './page-layout-breadcrumb'
import Unauthorized from '../../pages/unathorized'

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
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={breadcrumbs.concat(createBreadcrumb)}
        />
      }
      options={[]}
    >
      <ProtectedComponent
        provider={permissionProvider}
        isAuthorizedFn={(p) => p.canCreate}
        fallback={<Unauthorized />}
      >
        {children}
      </ProtectedComponent>
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
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={breadcrumbs.concat(editBreadcrumb)}
        />
      }
    >
      <ProtectedComponent
        provider={permissionProvider}
        isAuthorizedFn={(p) => p.canEdit}
        fallback={<Unauthorized />}
      >
        {children}
      </ProtectedComponent>
    </PageLayout>
  )
}
