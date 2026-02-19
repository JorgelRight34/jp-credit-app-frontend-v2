import { ErrorIcon, Icon } from '@/components/atoms'
import { SnackbarProps } from './snackbar'

const SnackbarError = ({ data }: SnackbarProps) => {
  return (
    <div className="flex">
      <Icon icon={ErrorIcon}>{data.title}</Icon>
    </div>
  )
}

export default SnackbarError
