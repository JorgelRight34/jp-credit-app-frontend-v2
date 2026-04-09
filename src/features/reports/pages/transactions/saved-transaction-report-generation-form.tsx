import { TransactionSearchInput } from '@/features/transactions'
import SavedReportGenerationForm from '../../components/saved-report-generation-form'
import { transactionTemplateDefinition } from '../../lib/templates/transaction-template-definition'
import { PropsWithReport } from '../../models/report'
import { generateTransactionReport } from '../../services/reportsClient'

const SavedTransactionReportGenerationForm = ({
  report,
  id,
}: PropsWithReport<{ id: number }>) => {
  return (
    <SavedReportGenerationForm
      report={report}
      templateDefinition={transactionTemplateDefinition}
      initialValues={{ id }}
      reset={false}
      searchInput={TransactionSearchInput}
      onSubmit={generateTransactionReport}
      initializeAsDirty
    />
  )
}

export default SavedTransactionReportGenerationForm
