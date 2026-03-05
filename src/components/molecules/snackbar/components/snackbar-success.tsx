import { CheckCircleIcon, Icon } from '@/components/atoms'
import { SnackbarProps } from './snackbar'

const SnackbarSuccess = ({ data }: SnackbarProps) => {
  return (
    <div className="flex">
      <Icon icon={CheckCircleIcon} iconClassName="text-green-400">
        {data.title}
      </Icon>
    </div>
  )
}

export default SnackbarSuccess
