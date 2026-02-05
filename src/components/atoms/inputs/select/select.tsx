import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import clsx from 'clsx'
import { muiSxConfig } from '../constants'
import { getIconInputSlot } from '../input/lib/react-utils'
import type { SelectOptions } from './select-option'
import type { InputProps } from '../input/components/input'
import type { ReactNode } from 'react'
import { toTitleCase } from '@/lib/utils/utils'

export type SelectInputProps = Omit<
  InputProps,
  'onChange' | 'ref' | 'size' | 'slotProps'
> & {
  options?: SelectOptions
  children?: ReactNode
  label?: string
  allowNoOption?: boolean
  onChange?: (val: string) => void
}

const SelectInput = ({
  options,
  children,
  label,
  allowNoOption = true,
  value,
  icon,
  ...props
}: SelectInputProps) => {
  return (
    <FormControl className={clsx('flex-shrink-0', props.className)} fullWidth>
      <InputLabel size="small" id={label?.toString()}>
        {label}
      </InputLabel>
      <Select
        {...props}
        size="small"
        label={label}
        labelId={label?.toString()}
        value={value}
        onChange={(e) => props.onChange?.(e.target.value as string)}
        sx={{ width: 'auto', minWidth: 'fit-content', ...muiSxConfig }}
        {...getIconInputSlot(icon)}
      >
        {allowNoOption && <MenuItem value="">---</MenuItem>}
        {options &&
          options.map((option, key) => (
            <MenuItem key={key} value={option[0] ?? ''}>
              {toTitleCase(option[1])}
            </MenuItem>
          ))}
        {children}
      </Select>
    </FormControl>
  )
}

export default SelectInput
