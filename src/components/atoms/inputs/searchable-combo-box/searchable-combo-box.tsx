import { useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { CacheKey } from '@/models'
import type { InputProps } from '@/components/atoms'
import type { ModalTriggerRef } from '@/components/organisms'
import { Input } from '@/components/atoms'
import { useData } from '@/hooks/useData'
import { ModalTrigger } from '@/components/organisms'

interface SearchableComboBoxProps<T, TValue> extends Omit<InputProps, 'ref'> {
  placeholder?: string
  label?: ReactNode
  className?: string
  isDisabled?: boolean
  error?: boolean
  modalProps: { title: ReactNode }
  cacheKey: CacheKey
  onChange?: (val: TValue) => TValue
  accesorFn: (val: T | null) => TValue
  visibleValueFn: (val: T | null) => string | undefined
  render: (setValue: (val: T) => void) => ReactNode
  loader: (val: TValue) => Promise<T> | T
}

const SearchableComboBox = <T, TValue>({
  value,
  placeholder,
  label = '',
  className,
  isDisabled = false,
  modalProps,
  cacheKey,
  error,
  render,
  loader,
  onChange,
  accesorFn,
  visibleValueFn,
  icon,
  ...props
}: SearchableComboBoxProps<T, TValue>) => {
  return (
    <>
      <input type="hidden" value={value ?? ''} className="hidden" readOnly />
      <DisplayInput
        accesorFn={accesorFn}
        cacheKey={cacheKey}
        className={className}
        placeholder={placeholder}
        isDisabled={isDisabled}
        label={label}
        error={error}
        value={value}
        modalProps={modalProps}
        onChange={onChange}
        visibleValueFn={visibleValueFn}
        render={render}
        loader={loader}
        icon={icon}
        {...props}
      />
    </>
  )
}

const DisplayInput = <T, TValue>({
  cacheKey,
  className,
  placeholder,
  isDisabled,
  label,
  error,
  value: controlledValue,
  modalProps,
  accesorFn,
  onChange,
  visibleValueFn,
  render,
  loader,
  ...props
}: SearchableComboBoxProps<T, TValue>) => {
  const [selected, setSelected] = useState<T>()
  const modalTriggerRef = useRef<ModalTriggerRef>(null)

  const { data: fetchedDefaultValue } = useData<T>({
    key: cacheKey,
    loader: () => loader(controlledValue),
    enabled: Boolean(controlledValue && selected === undefined),
  })

  const handleSelect = useCallback(
    (val: T) => {
      onChange?.(accesorFn(val))
      setSelected(val)
      modalTriggerRef.current?.hide()
    },
    [onChange],
  )

  return (
    <>
      <ModalTrigger
        {...modalProps}
        width="auto"
        ref={modalTriggerRef}
        trigger={
          <Input
            className={className}
            placeholder={placeholder}
            value={
              controlledValue
                ? (visibleValueFn(selected ?? fetchedDefaultValue ?? null) ??
                  '')
                : ''
            }
            disabled={isDisabled}
            label={label}
            error={error}
            readOnly={true}
            {...props}
          />
        }
      >
        {render(handleSelect)}
      </ModalTrigger>
    </>
  )
}

export default SearchableComboBox
