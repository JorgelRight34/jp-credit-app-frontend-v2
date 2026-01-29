import FormPageLayoutContent from './form-page-layout-content'
import LayoutPermissionsWrapper from './layout-permissions-wrapper'
import type { EntityLayoutProps } from './entity-layout'
import type { CacheKey } from '@/models'
import type { FormPageMode } from '../models/formPageMode'
import type { ConfirmationModalProps } from '@/components/organisms'

export type FormPageLayoutProps = React.PropsWithChildren &
  EntityLayoutProps &
  Partial<ConfirmationModalProps> & {
    mode?: FormPageMode
    cacheKey?: CacheKey
    deleteConfirmationMessage?: string
    onDelete?: () => Promise<void>
  }

const FormPageLayout = ({
  permissionsProvider,
  children,
  mode = 'create',
  ...props
}: FormPageLayoutProps) => {
  return (
    <LayoutPermissionsWrapper
      provider={permissionsProvider}
      isAuthorizedFn={(permissions) =>
        (mode === 'edit' && permissions.canEdit) ||
        (mode === 'create' && permissions.canCreate)
      }
    >
      <FormPageLayoutContent mode={mode} {...props}>
        {children}
      </FormPageLayoutContent>
    </LayoutPermissionsWrapper>
  )
}

export default FormPageLayout
