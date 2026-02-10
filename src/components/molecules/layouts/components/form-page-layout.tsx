import type { BreadcrumbSpec } from '../../breadcrumb'
import type { PageLayoutProps } from './page-layout'
import type { CacheKey } from '@/models'
import type { PermissionsProvider } from '@/components/organisms'
import type { ConfirmationModalProps } from '@/components/organisms/modal/components/confirmation-modal'
import { ConfirmationModal } from '@/components/organisms'
import PageLayout from './page-layout'
import {
  AccentPillBtn,
  AddIcon,
  DeleteIcon,
  EditIcon,
} from '@/components/atoms'
import PageLayoutBreadcrumb from './page-layout-breadcrumb'
import { useState } from 'react'
import { useFormPage } from '../hooks/useFormPage'

export type FormPageLayoutProps = React.PropsWithChildren &
  PageLayoutProps &
  Partial<ConfirmationModalProps> & {
    cacheKey?: CacheKey
    deleteConfirmationMessage?: string
    permissionProvider: PermissionsProvider
    breadcrumbs: Array<BreadcrumbSpec>
    onDelete?: () => Promise<void>
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
          breadcrumbs={breadcrumbs.concat({
            title: 'Crear',
            icon: AddIcon,
            pathname: '.',
          })}
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
  onDelete,
  cacheKey,
  deleteConfirmationMessage,
  description,
  children,
  ...props
}: FormPageLayoutProps) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const { onDelete: handleOnDelete } = useFormPage({ onDelete })

  return (
    <>
      <PageLayout
        {...props}
        title={title}
        permissionProvider={permissionProvider}
        isAuthorizedFn={(p) => p.canEdit}
        breadcrumb={
          <PageLayoutBreadcrumb
            breadcrumbs={breadcrumbs.concat({
              title: 'Editar',
              icon: EditIcon,
              pathname: '.',
              disabled: true,
            })}
          />
        }
        options={
          onDelete
            ? [
                {
                  title: 'Borrar',
                  component: AccentPillBtn,
                  icon: DeleteIcon,
                  onClick: () => setShowConfirmationModal(true),
                },
              ]
            : []
        }
      >
        {children}
      </PageLayout>
      <ConfirmationModal
        height="auto"
        destructive={true}
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        description={description}
        onConfirm={handleOnDelete}
        cacheKey={cacheKey}
        confirmationMessage={deleteConfirmationMessage ?? ''}
      />
    </>
  )
}
