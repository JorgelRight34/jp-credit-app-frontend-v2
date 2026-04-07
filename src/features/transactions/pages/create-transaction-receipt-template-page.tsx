import { CreateFormPageLayout, ReceiptLongIcon } from '@/components'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import { CreateReportForm } from '@/features/reports'
import { transactionReceiptReportKeyParts } from '../lib/constants'
import { TransactionType } from '../models/transactionType'
import { transactionBreadcrumb } from './transactions-page'

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
      permissionProvider={transactionPermissionProvider}
    >
      <CreateReportForm
        reportKey="Transaction"
        defaultValues={{
          subkey: transactionReceiptReportKeyParts.buildSubkey(type),
          description: 'Recibo',
        }}
      />
    </CreateFormPageLayout>
  )
}

export default CreateTransactionReceiptTemplatePage
