import React, { useState } from 'react'
import Modal from '../../modal/components/modal'
import FileForm from './file-form'
import type { FileFormProps } from './file-form'
import type { FileFormFieldValues } from '../lib/form'
import type { ModalProps } from '../../modal/models/modalProps'
import { AddIcon } from '@/components/atoms'

type FileFormTriggerProps = React.PropsWithChildren &
  FileFormProps & {
    modalProps?: Partial<ModalProps>
  }

const FileFormTrigger = ({
  modalProps,
  children,
  onSubmit,
  ...props
}: FileFormTriggerProps) => {
  const [showModal, setShowModal] = useState(false)

  const handleOnSubmit = async (data: FileFormFieldValues) => {
    const response = await onSubmit(data)
    setShowModal(false)

    return response
  }

  return (
    <>
      <span onClick={() => setShowModal(true)}>{children}</span>
      <Modal
        title="Crear archivo"
        width="50dvw"
        icon={AddIcon}
        {...modalProps}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <FileForm {...props} onSubmit={handleOnSubmit} />
      </Modal>
    </>
  )
}

export default FileFormTrigger
