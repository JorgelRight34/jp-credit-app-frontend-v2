import { lazy, useState } from 'react'
import { useFormPage } from '../hooks/useFormPage'
import PageLayout from './page-layout'
import PageLayoutBreadcrumb from './page-layout-breadcrumb'
import type { FormPageLayoutProps } from './form-page-layout'
import { AccentBtn, AddIcon, DeleteIcon, EditIcon } from '@/components'

const ConfirmationModal = lazy(
  () => import('@/components/organisms/modal/components/confirmation-modal'),
)

const FormPageLayoutContent = ({
  title,
  breadcrumbs,
  children,
  mode,
  permissionProvider,
  ...props
}: FormPageLayoutProps) => {
  switch (mode) {
    case 'create':
      return (
        <CreateFormPageLayoutContent
          permissionProvider={permissionProvider}
          title={title}
          breadcrumbs={breadcrumbs}
        >
          {children}
        </CreateFormPageLayoutContent>
      )
    case 'edit':
      return (
        <EditFormPageLayoutContent
          permissionProvider={permissionProvider}
          title={title}
          breadcrumbs={breadcrumbs}
          {...props}
        >
          {children}
        </EditFormPageLayoutContent>
      )
  }
}

const CreateFormPageLayoutContent = ({
  title,
  breadcrumbs = [],
  children,
  permissionProvider,
}: Pick<
  FormPageLayoutProps,
  'title' | 'children' | 'breadcrumbs' | 'permissionProvider'
>) => {
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
            disabled: true,
          })}
        />
      }
      options={[]}
    >
      {children}
    </PageLayout>
  )
}

const EditFormPageLayoutContent = ({
  title,
  breadcrumbs = [],
  cacheKey,
  confirmationMessage,
  children,
  description,
  deleteConfirmationMessage,
  ...props
}: FormPageLayoutProps) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const { onDelete } = useFormPage({ onDelete: props.onDelete })

  return (
    <>
      <PageLayout
        {...props}
        title={title}
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
        options={[
          {
            title: 'Borrar',
            component: AccentBtn,
            icon: DeleteIcon,
            onClick: () => setShowConfirmationModal(true),
          },
        ]}
      >
        {children}
      </PageLayout>
      <ConfirmationModal
        height="auto"
        destructive={true}
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        description={description}
        onConfirm={onDelete}
        cacheKey={cacheKey}
        confirmationMessage={deleteConfirmationMessage ?? ''}
      />
    </>
  )
}

export default FormPageLayoutContent
