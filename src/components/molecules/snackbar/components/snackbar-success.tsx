import { CheckCircleIcon, Icon, Paragraph } from '@/components/atoms'
import { SnackbarProps } from './snackbar'

const SnackbarSuccess = ({ data }: SnackbarProps) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg">
      <Icon icon={CheckCircleIcon} className="text-green-400" />
      <Paragraph>{data.title}</Paragraph>
    </div>
  )
}

export default SnackbarSuccess
