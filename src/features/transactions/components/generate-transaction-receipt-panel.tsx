import { useSuspenseData } from '@/hooks/useData'
import { getTransactionReceiptReport } from '../services/transactionClient'
import { useDataClient } from '@/hooks/useDataClient'
import {
  buildReportQueryKey,
  buildReportQueryKeyByReportKey,
  SavedReportGenerationForm,
} from '@/features/reports'
import { Transaction } from '../models/transaction'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { GuardPanel, ReceiptLongIcon } from '@/components'
import { TransactionType } from '../models/transactionType'
import { transactionReceiptReportKeyParts } from '../lib/constants'

interface GenerateTransactionReceiptPanelProps {
  id: Transaction['id']
  type: TransactionType
}

const GenerateTransactionReceiptPanel = ({
  id,
  type,
}: GenerateTransactionReceiptPanelProps) => {
  return (
    <Suspense>
      <ErrorBoundary
        fallbackRender={() => (
          <GuardPanel
            icon={ReceiptLongIcon}
            title={`Aún no tienes una plantilla para este tipo de transacciones (${type})`}
            subtitle="Para poder generar recibos en tus transacciones, primero debes crear una plantilla. 
                      Esta definirá el formato y la información que aparecerá en cada recibo."
            createLink="/transactions/receipt-report-template/create"
            createLinkSearch={{ type }}
            createLabel="Crear plantilla de recibo"
          />
        )}
      >
        <GenerateTransactionReceiptPanelInner id={id} type={type} />
      </ErrorBoundary>
    </Suspense>
  )
}

const GenerateTransactionReceiptPanelInner = ({
  id,
  type,
}: GenerateTransactionReceiptPanelProps) => {
  const dataClient = useDataClient()

  const { data } = useSuspenseData({
    key: buildReportQueryKeyByReportKey(
      transactionReceiptReportKeyParts.key,
      transactionReceiptReportKeyParts.buildSubkey(type),
    ),
    loader: async () => {
      const report = await getTransactionReceiptReport(type)

      dataClient.set(buildReportQueryKey(report.id), report)

      return report
    },
  })

  return <SavedReportGenerationForm report={data} initialValues={{ id }} />
}

export default GenerateTransactionReceiptPanel
