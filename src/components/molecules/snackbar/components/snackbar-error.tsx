import { ErrorIcon, Icon } from '@/components/atoms'
import { SnackbarProps } from './snackbar'

const SnackbarError = ({ data }: SnackbarProps) => {
  return (
    <div className="bg-surface flex">
      <Icon icon={ErrorIcon} className="text-red-400">
        {data.title}
      </Icon>
    </div>
  )
}

export default SnackbarError
