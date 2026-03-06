import { forwardRef, useImperativeHandle, useState } from 'react'
import Modal, { ModalProps } from './modal'
import type { ReactNode } from 'react'

interface ModalTriggerProps extends Omit<ModalProps, 'show' | 'onHide'> {
  trigger: ReactNode
}

export type ModalTriggerRef = {
  hide: () => void
}

const ModalTrigger = forwardRef<ModalTriggerRef, ModalTriggerProps>(
  ({ trigger, children, ...props }, ref) => {
    const [showModal, setShowModal] = useState(false)

    useImperativeHandle(ref, () => ({
      hide: () => setShowModal(false),
    }))

    return (
      <>
        <span
          className="cursor-pointer inline"
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
