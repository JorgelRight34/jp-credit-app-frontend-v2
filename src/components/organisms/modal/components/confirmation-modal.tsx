import {
  forwardRef,
  startTransition,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import clsx from 'clsx'
import Modal, { ModalProps } from './modal'
import type { ReactNode } from 'react'
import type { CacheKey } from '@/models'
import { useDataClient } from '@/hooks/useDataClient'
import { AccentBtn, Input, SecondaryBtn, Subtitle } from '@/components/atoms'
import { useDataMutation } from '@/hooks/useMutate'

export type ConfirmationModalRef = {
  show: () => void
  hide: () => void
}

export type ConfirmationModalProps = Omit<ModalProps, 'onHide' | 'show'> & {
  header?: string
  confirmationMessage: string
  cacheKey?: CacheKey
  destructive?: boolean
  confirmText?: string
  cancelText?: string
  description?: string | ReactNode
  onConfirm: () => Promise<void>
  onHide?: () => void
}

const ConfirmationModal = forwardRef<
  ConfirmationModalRef,
  ConfirmationModalProps
>(
  (
    {
      header = 'Confirmar acción',
      confirmationMessage = '',
      destructive = false,
      confirmText = 'Confirmar',
      cancelText = 'Cancelar',
      description,
      cacheKey,
      onHide,
      onConfirm,
      ...props
    },
    ref,
  ) => {
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const dataClient = useDataClient()

    const { mutateAsync, isPending } = useDataMutation({
      mutationFn: async () => {
        if (!isInputValid) return
        await onConfirm()
      },
      onSuccess: () => {
        if (cacheKey) dataClient.invalidate({ key: [cacheKey] })
        hide()
      },
    })

    const isInputValid = useMemo(
      () =>
        input.trim().toLowerCase() === confirmationMessage.trim().toLowerCase(),
      [input, confirmationMessage],
    )

    const hide = useCallback(() => {
      setIsOpen(false)
      startTransition(() => {
        setInput('')
        onHide?.()
      })
    }, [onHide])

    const show = useCallback(() => {
      setIsOpen(true)
    }, [])

    useImperativeHandle(ref, () => ({ show, hide }), [show, hide])

    return (
      <Modal {...props} title={header} show={isOpen} onHide={hide}>
        <div className="mb-5 w-full space-y-3">
          <div>
            <p className="mb-3">
              <strong>
                Para proceder, escriba exactamente el siguiente texto:
              </strong>
            </p>

            <div
              className={clsx('rounded-xl border p-3', {
                'bg-danger-subtle border-danger-subtle text-danger-emphasis':
                  destructive,
                'bg-warning-subtle border-warning-subtle text-warning-emphasis':
                  !destructive,
              })}
            >
              <code className="font-bold select-none">
                {confirmationMessage}
              </code>
            </div>
          </div>

          {description && (
            <div>
              <p className="text-muted mb-5">{description}</p>
            </div>
          )}

          <div>
            <Input
              placeholder="Escriba el texto de confirmación..."
              value={input}
              onChange={setInput}
              error={!isInputValid && !!input}
              className="w-full"
              autoFocus={isOpen}
            />
            {input && !isInputValid && (
              <Subtitle className="block text-red-500">
                El texto no coincide con el mensaje de confirmación
              </Subtitle>
            )}
          </div>
        </div>

        <div className="mt-auto flex w-full flex-shrink-0">
          <div className="w-6/12 pr-1">
            <SecondaryBtn
              className="w-full"
              onClick={hide}
              disabled={isPending}
            >
              {cancelText}
            </SecondaryBtn>
          </div>
          <div className="w-6/12 pl-1">
            <AccentBtn
              className="w-full"
              disabled={!isInputValid || isPending}
              onClick={() => mutateAsync()}
            >
              {confirmText}
            </AccentBtn>
          </div>
        </div>
      </Modal>
    )
  },
)

ConfirmationModal.displayName = 'ConfirmationModal'

export default ConfirmationModal
