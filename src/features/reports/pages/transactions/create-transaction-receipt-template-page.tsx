import { CreateFormPageLayout, ReceiptLongIcon } from '@/components'
import {
  CreateReportForm,
  createTransactionReport,
  uploadTransactionReportFiles,
} from '@/features/reports'
import {
  transactionBreadcrumb,
  transactionReceiptReportKeyParts,
  TransactionType,
} from '@/features/transactions'
import { transactionTemplateDefinition } from '../../lib/templates/transaction-template-definition'

const CreateTransactionReceiptTemplatePage = ({
  type,
}: {
  type: TransactionType
}) => {
  return (
    <CreateFormPageLayout
      title={`Crear plantilla de transacción (${type.toUpperCase()}) `}
      breadcrumbs={[
        transactionBreadcrumb,
        { icon: ReceiptLongIcon, title: 'Plantilla de recibo' },
      ]}
    >
      <CreateReportForm
        defaultValues={{
          subkey: transactionReceiptReportKeyParts.buildSubkey(type),
          description: 'Recibo',
        }}
        templateDefinition={transactionTemplateDefinition}
        onUpload={uploadTransactionReportFiles}
        onSubmit={createTransactionReport}
      />
    </CreateFormPageLayout>
  )
}

export default CreateTransactionReceiptTemplatePage
