import { ErrorIcon, Icon, Paragraph } from '@/components/atoms'
import { SnackbarProps } from './snackbar'

const SnackbarError = ({ data }: SnackbarProps) => {
  return (
    <div className="bg-surface flex">
      <Icon icon={ErrorIcon} className="text-red-400" />
      <Paragraph>{data.title}</Paragraph>
    </div>
  )
}

export default SnackbarError
