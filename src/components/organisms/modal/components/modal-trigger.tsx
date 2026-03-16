import { forwardRef, useImperativeHandle, useState } from 'react'
import Modal, { ModalProps } from './modal'
import type { ReactNode } from 'react'

export interface ModalTriggerProps extends Omit<ModalProps, 'show' | 'onHide'> {
  trigger: ReactNode
  triggerClassName?: string
}

export type ModalTriggerRef = {
  hide: () => void
}

const ModalTrigger = forwardRef<ModalTriggerRef, ModalTriggerProps>(
  ({ trigger, triggerClassName = '', children, ...props }, ref) => {
    const [showModal, setShowModal] = useState(false)

    useImperativeHandle(ref, () => ({
      hide: () => setShowModal(false),
    }))

    return (
      <>
        <span
          className={`cursor-pointer ${triggerClassName}`}
          onClick={() => setShowModal(true)}
        >
          {trigger}
        </span>
        <Modal {...props} show={showModal} onHide={() => setShowModal(false)}>
          {children}
        </Modal>
      </>
    )
  },
)

export default ModalTrigger
