import { lazy, useState } from 'react'
import { useFormPage } from '../hooks/useFormPage'
import EntityLayout from './entity-layout'
import type { FormPageLayoutProps } from './form-page-layout'
import { toAllTitleCase } from '@/lib/utils/utils'
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
  'title' | 'breadcrumbs' | 'children' | 'permissionProvider'
>) => {
  return (
    <EntityLayout
      title={toAllTitleCase('Crear' + ' ' + title)}
      permissionProvider={permissionProvider}
      breadcrumbs={breadcrumbs.concat({
        title: 'Crear',
        icon: AddIcon,
        pathname: '.',
      })}
      options={[]}
    >
      {children}
    </EntityLayout>
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
      <EntityLayout
        {...props}
        title={toAllTitleCase('Editar' + ' ' + title)}
        breadcrumbs={breadcrumbs.concat({
          title: 'Editar',
          icon: EditIcon,
          pathname: '.',
        })}
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
      </EntityLayout>
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
