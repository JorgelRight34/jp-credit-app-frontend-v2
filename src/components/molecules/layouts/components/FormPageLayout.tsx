import { CacheKey } from '@/models'
import { EntityLayoutProps } from '../components/entity-layout'
import FormPageLayoutContent from './FormPageLayoutContent'
import LayoutPermissionsWrapper from './layout-permissions-wrapper'
import { ConfirmationModalProps } from '@/components'

export type FormPageLayoutProps = React.PropsWithChildren &
  EntityLayoutProps &
  Partial<ConfirmationModalProps> & {
    edit?: boolean
    cacheKey?: CacheKey
    deleteConfirmationMessage?: string
  }

const FormPageLayout = ({
  permissionsProvider,
  children,
  edit = false,
  ...props
}: FormPageLayoutProps) => {
  return (
    <LayoutPermissionsWrapper
      provider={permissionsProvider}
      isAuthorizedFn={(permissions) =>
        (edit && permissions?.canEdit) || (!edit && permissions?.canCreate)
      }
    >
      <FormPageLayoutContent edit={edit} {...props}>
        {children}
      </FormPageLayoutContent>
    </LayoutPermissionsWrapper>
  )
}

export default FormPageLayout
