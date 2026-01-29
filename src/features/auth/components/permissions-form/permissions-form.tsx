const Default = () => <></>

export default Default

/*
import { EntityFormProps, FormBuilder } from '@/components'
import usePermissionsForm from '../../hooks/usePermissionsForm'
import { User } from '../../models/user'

interface PermissionsFormProps extends EntityFormProps<object> {
  edit?: User
}

const PermissionsForm = ({
  edit,
  onDirtyChange,
  ...props
}: PermissionsFormProps) => {
  const config = usePermissionsForm({
    profile: edit,
  })

  return <FormBuilder onDirtyChange={onDirtyChange} {...config} {...props} />
}

export default PermissionsForm
*/
