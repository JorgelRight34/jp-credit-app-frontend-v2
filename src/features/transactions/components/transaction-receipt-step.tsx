import { useDataMutation } from '@/hooks/useMutate'
import {
  BigTitle,
  CheckCircleIcon,
  DoneAllIcon,
  Icon,
  MediumTitle,
  Paragraph,
  useFormConfirmationFlowActiveStep,
  useFormConfirmationFlowData,
} from '@/components'
import { useDataClient } from '@/hooks/useDataClient'
import { CacheKey } from '@/models'
import { ReactNode, useEffect, useState } from 'react'
import { Transaction } from '../models/transaction'

interface TransactionReceiptStepProps {
  keysToInvalidate: Array<CacheKey>
  successText: ReactNode
  loader: (data: any) => Promise<Transaction>
}

const TransactionReceiptStep = (props: TransactionReceiptStepProps) => {
  const [active] = useFormConfirmationFlowActiveStep()
  const [hasRendered, setHasRendered] = useState(false)

  useEffect(() => {
    if (active === 2) setHasRendered(true)
  }, [active])

  if (!hasRendered) return null

  return <TransactionReceiptStepInner {...props} />
}

const TransactionReceiptStepInner = ({
  loader,
  successText,
  keysToInvalidate,
}: TransactionReceiptStepProps) => {
  const dataClient = useDataClient()
  const [body] = useFormConfirmationFlowData()
  const { data, isPending, mutateAsync } = useDataMutation({
    mutationFn: () => loader(body),
    onSuccess: () => {
      for (const key of keysToInvalidate) {
        dataClient.invalidate({ key })
      }
    },
  })

  useEffect(() => {
    mutateAsync()
  }, [])

  if (isPending) return null

  return (
    <div className="flex flex-col justify-center py-3">
      <Paragraph>
        Nos place informar que la transacción fue realizada satisfactoriamente.
        A continuación los detalles de la transacción:
      </Paragraph>
      <header className="flex py-3 items-center justify-center">
        <span className="flex flex-col ">
          <Icon
            style={{ fontSize: '10rem' }}
            className="text-accent"
            icon={DoneAllIcon}
          />
          <MediumTitle>
            <b>{successText}</b>
          </MediumTitle>
        </span>
      </header>
      <aside></aside>
    </div>
  )
}

export default TransactionReceiptStep
