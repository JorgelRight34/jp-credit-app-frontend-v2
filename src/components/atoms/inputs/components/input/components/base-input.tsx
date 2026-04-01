import { TextField } from '@mui/material'
import clsx from 'clsx'
import { getIconInputSlot } from '../lib/react-utils'
import type { IconInputSlotProps } from '../lib/react-utils'
import type { InputBaseComponentProps } from '@mui/material'
import { useMemo, type ElementType } from 'react'
import type { BaseTextFieldProps } from '../models/baseTextFieldProps'
import { SX_CONFIG } from '@/components/atoms/constants'

export type BaseInputProps = BaseTextFieldProps & {
  icon?: IconInputSlotProps
  readOnly?: boolean
  value?: any
  defaultValue?: any
  min?: number
  max?: number | string
  step?: number
  inputComponent?: ElementType<InputBaseComponentProps>
  onIconClick?: () => void
}

const BaseInput = ({
  children,
  readOnly,
  value = '',
  className,
  inputComponent,
  icon,
  min,
  max,
  step,
  disabled,
  ...props
}: BaseInputProps) => {
  const iconSlot = useMemo(() => getIconInputSlot(icon), [icon])
  const slotProps = useMemo(
    () => ({
      input: {
        value,
        ...iconSlot,
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
    }),
    [
      value,
      iconSlot,
      inputComponent,
      props.slotProps,
      readOnly,
      min,
      max,
      step,
    ],
  )

  return (
    <TextField
      className={clsx('rounded-xl', className)}
      value={value}
      slotProps={slotProps}
      disabled={disabled}
      sx={SX_CONFIG}
      size="small"
      {...props}
    >
      {children}
    </TextField>
  )
}

export default BaseInput
