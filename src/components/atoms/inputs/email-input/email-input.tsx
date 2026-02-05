import { EmailIcon } from '../../icon'
import Input from '../input/components/input'
import type { InputProps } from '../input/components/input'

const EmailInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      icon={{ icon: EmailIcon, iconDirection: 'right' }}
      type="email"
    />
  )
}

export default EmailInput
