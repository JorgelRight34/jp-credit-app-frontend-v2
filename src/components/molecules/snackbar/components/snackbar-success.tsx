import { CheckCircleIcon, Icon } from '@/components/atoms'
import { SnackbarProps } from './snackbar'

const SnackbarSuccess = ({ data }: SnackbarProps) => {
  return (
    <div className="flex">
      <Icon icon={CheckCircleIcon}>{data.title}</Icon>
    </div>
  )
}

export default SnackbarSuccess
