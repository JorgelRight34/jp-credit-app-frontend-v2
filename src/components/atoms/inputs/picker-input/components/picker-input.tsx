import type { ReactNode } from 'react'
import type { CacheKey } from '@/models'
import type { InputProps } from '@/components/atoms'
import PickerInputDisplay from './picker-input-display'

export interface PickerInputProps<T, TValue> extends Omit<InputProps, 'ref'> {
  placeholder?: string
  label?: ReactNode
  className?: string
  isDisabled?: boolean
  error?: boolean
  modalProps: { title: ReactNode }
  cacheKey: CacheKey
  onChange?: (val: TValue | undefined) => TValue
  onSelect?: (value: T | null) => void
  accesorFn: (val: T | undefined | null) => TValue | undefined
  visibleValueFn: (val: T | null) => string | undefined
  render: (setValue: (val: T | null) => void) => ReactNode
  loader: (val: TValue) => Promise<T> | T
}

const PickerInput = <T, TValue>({
  value,
  ...props
}: PickerInputProps<T, TValue>) => {
  return (
    <>
      <input type="hidden" value={value ?? ''} className="hidden" readOnly />
      <PickerInputDisplay value={value} {...props} />
    </>
  )
}

export default PickerInput
