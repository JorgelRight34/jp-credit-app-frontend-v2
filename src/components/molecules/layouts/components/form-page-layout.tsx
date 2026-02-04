import FormPageLayoutContent from './form-page-layout-content'
import type { BreadcrumbSpec } from '../../breadcrumb'
import type { EntityLayoutProps } from './entity-layout'
import type { CacheKey } from '@/models'
import type { FormPageMode } from '../models/formPageMode'
import type {
  ConfirmationModalProps,
  PermissionsProvider,
} from '@/components/organisms'
import { ProtectedComponent } from '@/components/organisms'

export type FormPageLayoutProps = React.PropsWithChildren &
  EntityLayoutProps &
  Partial<ConfirmationModalProps> & {
    mode?: FormPageMode
    cacheKey?: CacheKey
    deleteConfirmationMessage?: string
    permissionProvider: PermissionsProvider
    breadcrumbs: Array<BreadcrumbSpec>
    onDelete?: () => Promise<void>
  }

const FormPageLayout = ({
  permissionProvider,
  children,
  mode = 'create',
  ...props
}: FormPageLayoutProps) => {
  return (
    <ProtectedComponent
      provider={permissionProvider}
      isAuthorizedFn={(permissions) =>
        (mode === 'edit' && permissions.canEdit) ||
        (mode === 'create' && permissions.canCreate)
      }
    >
      <FormPageLayoutContent
        permissionProvider={permissionProvider}
        mode={mode}
        {...props}
      >
        {children}
      </FormPageLayoutContent>
    </ProtectedComponent>
  )
}

export default FormPageLayout
