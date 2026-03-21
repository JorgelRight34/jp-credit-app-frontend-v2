import { CheckCircleIcon, Icon } from '@/components/atoms'
import { SnackbarProps } from './snackbar'

const SnackbarSuccess = ({ data }: SnackbarProps) => {
  return (
    <div className="bg-surface flex">
      <Icon icon={CheckCircleIcon} className="text-green-400">
        {data.title}
      </Icon>
    </div>
  )
}

export default SnackbarSuccess
