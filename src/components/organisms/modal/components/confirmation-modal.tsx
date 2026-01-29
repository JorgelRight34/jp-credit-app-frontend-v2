import { useState } from 'react'
import clsx from 'clsx'
import Modal from './modal'
import type { ReactNode } from 'react'
import type { ModalProps } from '../models/modalProps'
import type { CacheKey } from '@/models'
import { useDataClient } from '@/hooks/useDataClient'
import { AccentBtn, Input, SecondaryBtn, Subtitle } from '@/components/atoms'
import { useDataMutation } from '@/hooks/useMutate'

export type ConfirmationModalProps = ModalProps & {
  title?: string
  confirmationMessage: string
  cacheKey?: CacheKey
  destructive?: boolean
  confirmText?: string
  cancelText?: string
  description?: string | ReactNode
  onConfirm: () => Promise<void>
}

const ConfirmationModal = ({
  title = 'Confirmar Acción',
  confirmationMessage = '',
  destructive = false,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  description,
  cacheKey,
  onHide,
  onConfirm,
  ...props
}: ConfirmationModalProps) => {
  const [input, setInput] = useState('')

  const dataClient = useDataClient()
  const { mutateAsync } = useDataMutation({
    mutationFn: onConfirm,
    onSuccess: () => {
      dataClient.invalidate({ key: [cacheKey] })
    },
  })

  const isInputValid = () => {
    return (
      input.trim().toLowerCase() === confirmationMessage.trim().toLowerCase()
    )
  }

  const handleConfirm = async () => {
    if (!isInputValid()) return
    await mutateAsync()
  }

  return (
    <Modal onHide={onHide} {...props} title={title}>
      <div className="mb-5 space-y-3">
        {/* Instruction text */}
        <div>
          <p className="mb-3">
            <strong>
              Para proceder, escriba exactamente el siguiente texto:
            </strong>
          </p>
          {/* Confirmation message display */}
          <div
            className={clsx(`rounded border p-3`, {
              'bg-danger-subtle border-danger-subtle text-danger-emphasis':
                destructive,
              'bg-warning-subtle border-warning-subtle text-warning-emphasis':
                !destructive,
            })}
          >
            <code className="font-bold select-none">{confirmationMessage}</code>
          </div>
        </div>
        {/* Optional description */}
        {description && (
          <div>
            <p className="mb-5 text-gray-500">{description}</p>
          </div>
        )}

        {/* Input field */}
        <div>
          <Input
            placeholder="Escriba el texto de confirmación..."
            value={input}
            onChange={setInput}
            error={isInputValid()}
            className="w-full"
            autoFocus
          />
          {input && !isInputValid() && (
            <Subtitle className="block text-red-500">
              El texto no coincide con el mensaje de confirmación
            </Subtitle>
          )}
        </div>
      </div>

      {/* Modal Footer with Action Buttons */}
      <div className="mt-auto flex flex-shrink-0">
        <div className="w-6/12 pr-1">
          <SecondaryBtn
            className="w-full"
            onClick={() => {
              setInput('')
              onHide()
            }}
          >
            {cancelText}
          </SecondaryBtn>
        </div>
        <div className="w-6/12 pl-1">
          <AccentBtn
            className="w-full"
            disabled={!isInputValid()}
            onClick={handleConfirm}
          >
            {confirmText}
          </AccentBtn>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
