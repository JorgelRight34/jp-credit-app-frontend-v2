import { FormControl, InputLabel, Select } from '@mui/material'
import clsx from 'clsx'
import { getIconInputSlot } from '../input/lib/react-utils'
import { SX_CONFIG } from '../../../constants'
import type { SelectOptions } from './select-option'
import type { InputProps } from '../input/components/input'
import { type ReactNode } from 'react'
import { MenuItem } from '@/components/molecules'

export type SelectInputProps<T> = Omit<
  InputProps,
  'onChange' | 'ref' | 'size' | 'slotProps'
> & {
  options?: SelectOptions<T>
  children?: ReactNode
  allowNoOption?: boolean
  onChange?: (val: T) => void
}

const SelectInput = <T,>({
  options,
  children,
  label,
  icon,
  readOnly,
  allowNoOption = true,
  value = '',
  onChange,
  ...props
}: SelectInputProps<T>) => {
  return (
    <FormControl
      className={clsx('flex-shrink-0', props.className)}
      sx={SX_CONFIG}
      fullWidth
    >
      <InputLabel size="small" id={label?.toString()} shrink>
        {label}
      </InputLabel>
      <Select
        {...props}
        size="small"
        label={label}
        labelId={label?.toString()}
        value={value}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: 'var(--surface)',
            },
          },
        }}
        onChange={(e) => onChange?.(e.target.value)}
        sx={{ width: 'auto', minWidth: 'fit-content' }}
        IconComponent={readOnly ? () => null : undefined}
        readOnly={readOnly}
        {...getIconInputSlot(icon)}
      >
        {options &&
          options.map((option, key) => (
            <MenuItem key={key} value={(option[0] as string) ?? ''}>
              {option[1]}
            </MenuItem>
          ))}
        {children}
      </Select>
    </FormControl>
  )
}

export default SelectInput
