import {
  forwardRef,
  startTransition,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import Modal, { ModalProps } from './modal'

import { ConfirmationForm, ConfirmationFormProps } from '../../confirmation'

export type ConfirmationModalRef = {
  show: () => void
  hide: () => void
}

export type ConfirmationModalProps = Omit<ModalProps, 'onHide' | 'show'> &
  ConfirmationFormProps & {
    header?: string
    onHide?: () => void
  }

const ConfirmationModal = forwardRef<
  ConfirmationModalRef,
  ConfirmationModalProps
>(({ header, onHide, width, height, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false)

  const hide = useCallback(() => {
    setIsOpen(false)
    startTransition(() => {
      onHide?.()
    })
  }, [onHide])

  const show = useCallback(() => {
    setIsOpen(true)
  }, [])

  useImperativeHandle(ref, () => ({ show, hide }), [show, hide])

  return (
    <Modal
      width={width}
      height={height}
      title={header}
      show={isOpen}
      onHide={hide}
    >
      <ConfirmationForm {...props} />
    </Modal>
  )
})

ConfirmationModal.displayName = 'ConfirmationModal'

export default ConfirmationModal
