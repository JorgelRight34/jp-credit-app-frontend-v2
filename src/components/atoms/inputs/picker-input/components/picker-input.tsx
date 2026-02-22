import { startTransition, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { CacheKey } from '@/models'
import type { InputProps } from '@/components/atoms'
import type { ModalTriggerRef } from '@/components/organisms'
import { Input } from '@/components/atoms'
import { useData } from '@/hooks/useData'
import { ModalTrigger } from '@/components/organisms'

interface PickerInputProps<T, TValue> extends Omit<InputProps, 'ref'> {
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
      <DisplayInput value={value} {...props} />
    </>
  )
}

const DisplayInput = <T, TValue>({
  cacheKey,
  isDisabled,
  value: controlledValue,
  modalProps,
  onSelect,
  accesorFn,
  onChange,
  visibleValueFn,
  render,
  loader,
  ...props
}: PickerInputProps<T, TValue>) => {
  const [selected, setSelected] = useState<T | null>(null)
  const modalTriggerRef = useRef<ModalTriggerRef>(null)

  const { data: fetchedDefaultValue } = useData<T>({
    key: cacheKey,
    loader: () => loader(controlledValue),
    enabled: Boolean(controlledValue && selected === null),
  })

  const displayInputValue = useMemo(() => {
    if (!controlledValue) return ''

    return visibleValueFn(selected ?? fetchedDefaultValue ?? null) ?? ''
  }, [controlledValue, selected, fetchedDefaultValue])

  const handleSelect = (val: T | null) => {
    startTransition(() => {
      onChange?.(accesorFn(val))
      setSelected(val)
      onSelect?.(val)
      modalTriggerRef.current?.hide()
    })
  }

  return (
    <ModalTrigger
      {...modalProps}
      modalOverlay="bg-black/25"
      width="75dvw"
      height="95dvh"
      ref={modalTriggerRef}
      trigger={
        <Input
          value={displayInputValue}
          disabled={isDisabled}
          readOnly={true}
          {...props}
        />
      }
    >
      {render(handleSelect)}
    </ModalTrigger>
  )
}

export default PickerInput
