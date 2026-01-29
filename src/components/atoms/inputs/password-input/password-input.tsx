import { useState } from 'react'
import Input from '../input/components/input'
import { VisibilityIcon, VisibilityOffIcon } from '../../icon'
import type { InputProps } from '../input/components/input'

const PasswordInput = ({ ...props }: InputProps) => {
  const [show, setShow] = useState(false)

  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      icon={{
        icon: show ? VisibilityOffIcon : VisibilityIcon,
        iconDirection: 'right',
        onClick: () => setShow((prev) => !prev),
      }}
    />
  )
}

export default PasswordInput
