import { ConfirmationForm } from '@/components'
import { Report } from '../models/report'

interface DeleteReportFormProps {
  report: Report
  onDelete: (id: Report['id']) => Promise<void>
}

const DeleteReportForm = ({ report, onDelete }: DeleteReportFormProps) => (
  <ConfirmationForm
    confirmationMessage="Seguro?"
    onConfirm={() => onDelete(report.id)}
  />
)

export default DeleteReportForm
