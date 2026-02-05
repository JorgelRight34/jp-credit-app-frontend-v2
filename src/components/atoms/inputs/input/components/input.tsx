import { TextField } from '@mui/material'
import clsx from 'clsx'
import { getIconInputSlot } from '../lib/react-utils'
import type { IconInputSlotProps } from '../lib/react-utils'
import type { InputBaseComponentProps } from '@mui/material'
import type { ElementType } from 'react'
import type { BaseTextFieldProps } from '../models/baseTextFieldProps'
import { SX_CONFIG } from '@/components/atoms/constants'

export type InputProps = BaseTextFieldProps & {
  icon?: IconInputSlotProps
  readOnly?: boolean
  min?: number
  max?: number
  step?: number
  onChange?: ((value: string) => void) | any
  inputComponent?: ElementType<InputBaseComponentProps>
  onIconClick?: () => void
}

const Input = ({
  readOnly,
  value = '', // If value is undefined the component stops being reactive to value changes
  className,
  inputComponent,
  icon,
  min,
  max,
  step,
  disabled,
  onChange,
  ...props
}: InputProps) => {
  return (
    <TextField
      className={clsx('rounded-xl', className, {
        'bg-white': !disabled,
        'bg-gray-100': disabled,
      })}
      {...props}
      value={value}
      slotProps={{
        input: {
          value,
          ...getIconInputSlot(icon),
          inputComponent,
          ...props.slotProps?.input,
          readOnly,
        },
        htmlInput: {
          min,
          max,
          step,
        },
        ...props.slotProps,
      }}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      sx={SX_CONFIG}
      size="small"
    />
  )
}

export default Input
