import {
  AccentBtn,
  Container,
  Input,
  Paragraph,
  Subtitle,
} from '@/components/atoms'
import { LayoutRow } from '@/components/molecules'
import { useDataClient } from '@/hooks/useDataClient'
import { useDataMutation } from '@/hooks/useMutate'
import { CacheKey } from '@/models'
import { ReactNode, useMemo, useState } from 'react'

export interface ConfirmationFormProps {
  confirmationMessage: string
  cacheKey?: CacheKey
  destructive?: boolean
  confirmText?: string
  cancelText?: string
  description?: string | ReactNode
  className?: string
  onConfirm: () => Promise<void>
}

const ConfirmationForm = ({
  confirmationMessage,
  description,
  cacheKey,
  confirmText,
  className = 'border-danger-subtle text-danger-emphasis',
  onConfirm,
}: ConfirmationFormProps) => {
  const [input, setInput] = useState('')

  const dataClient = useDataClient()

  const { mutateAsync, isPending } = useDataMutation({
    mutationFn: async () => {
      if (!isInputValid) return
      await onConfirm()
    },
    onSuccess: () => {
      if (cacheKey) dataClient.invalidate({ key: [cacheKey] })
    },
  })

  const normalizedConfirmationMessage = confirmationMessage.trim().toLowerCase()

  const isInputValid = useMemo(
    () => input.trim().toLowerCase() === normalizedConfirmationMessage,
    [input, confirmationMessage],
  )

  return (
    <Container className="flex flex-col">
      <div className="flex-1">
        <Paragraph>
          <strong>
            Para proceder, escriba exactamente el siguiente texto:
          </strong>
        </Paragraph>
        <LayoutRow>
          <div
            className={`bg-danger-subtle rounded-xl border p-3 ${className}`}
          >
            <code className="font-bold select-none">{confirmationMessage}</code>
          </div>
        </LayoutRow>
        <LayoutRow>
          <Paragraph>{description}</Paragraph>
        </LayoutRow>
        <LayoutRow>
          <Input
            placeholder="Escriba el texto de confirmación..."
            value={input}
            onChange={setInput}
            error={!isInputValid && !!input}
            className="w-full"
            autoFocus
          />
          {input && !isInputValid && (
            <Subtitle className="block text-red-500">
              El texto no coincide con el mensaje de confirmación
            </Subtitle>
          )}
        </LayoutRow>
      </div>
      <div className="flex-shrink-0">
        <AccentBtn
          className="w-full"
          disabled={!isInputValid || isPending}
          onClick={() => mutateAsync()}
        >
          {confirmText}
        </AccentBtn>
      </div>
    </Container>
  )
}

export default ConfirmationForm
