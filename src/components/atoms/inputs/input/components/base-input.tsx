import { TextField } from '@mui/material'
import clsx from 'clsx'
import { getIconInputSlot } from '../lib/react-utils'
import type { IconInputSlotProps } from '../lib/react-utils'
import type { InputBaseComponentProps } from '@mui/material'
import type { ElementType } from 'react'
import type { BaseTextFieldProps } from '../models/baseTextFieldProps'
import { SX_CONFIG } from '@/components/atoms/constants'

export type BaseInputProps = BaseTextFieldProps & {
  icon?: IconInputSlotProps
  readOnly?: boolean
  value?: any
  defaultValue?: any
  min?: number
  max?: number
  step?: number
  inputComponent?: ElementType<InputBaseComponentProps>
  onIconClick?: () => void
}

const BaseInput = ({
  readOnly,
  value = '', // If value is undefined the component stops being reactive to value changes
  className,
  inputComponent,
  icon,
  min,
  max,
  step,
  disabled,
  ...props
}: BaseInputProps) => {
  return (
    <TextField
      className={clsx('rounded-xl', className, {
        'bg-white': !disabled,
        'bg-gray-100': disabled,
      })}
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
        inputLabel: { shrink: true },
        ...props.slotProps,
      }}
      disabled={disabled}
      sx={SX_CONFIG}
      size="small"
      {...props}
    />
  )
}

export default BaseInput
