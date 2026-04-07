import { useRef } from 'react'
import ConfirmationModal, {
  ConfirmationModalProps,
  ConfirmationModalRef,
} from './confirmation-modal'
import type { ElementType, ReactNode } from 'react'

interface ConfirmationModalTriggerProps extends Omit<
  ConfirmationModalProps,
  'ref'
> {
  wrapper?: ElementType
  disabled?: boolean
  children?: ReactNode
}

const ConfirmationModalTrigger = ({
  children,
  wrapper: Component = 'span',
  disabled,
  ...props
}: ConfirmationModalTriggerProps) => {
  const confirmationModalRef = useRef<ConfirmationModalRef>(null)

  return (
    <>
      <Component
        className="w-full cursor-pointer"
        onClick={() => confirmationModalRef.current?.show()}
        disabled={disabled}
      >
        {children}
      </Component>
      <ConfirmationModal ref={confirmationModalRef} {...props} />
    </>
  )
}

// {
//   "header": "Borrar garantía",
//   "confirmationMessage": "Deseo borrar esta garantía",
//   "title": "No puede eliminar una garantía que ha sido usada para pago o esté inactiva",
//   "data-tsd-source": "/src/components/molecules/layouts/components/page-layout-option.tsx:12:5"
// }
export default ConfirmationModalTrigger
