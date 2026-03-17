import { ModalTrigger, ModalTriggerRef } from '@/components/organisms'
import { useData } from '@/hooks/useData'
import { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import Input from '../../input/components/input'
import { PickerInputProps } from './picker-input'

const PickerInputDisplay = <T, TValue>({
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

  useEffect(() => {
    if (onSelect && fetchedDefaultValue) onSelect(fetchedDefaultValue)
  }, [fetchedDefaultValue])

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
      triggerClassName="w-full"
      modalClassName="!w-[97dvw] md:!w-[75dvw] !h-[95dvh]"
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

export default PickerInputDisplay
