import { useState } from 'react'
import Modal from '../../../organisms/modal/components/modal'
import type { ReactNode } from 'react'
import type { CacheKey } from '@/models'
import { Input } from '@/components/atoms'
import { useData } from '@/hooks/useData'

type SearchableComboBoxComponentProps<T> = {
  placeholder?: string
  label?: string
  className?: string
  isDisabled?: boolean
  value?: string | number
  error?: boolean
  modalProps: { title: string; height: string; width: string }
  cacheKey: CacheKey
  onChange?: (entity: T) => void
  accesorFn: (val: T | null) => any
  visibleValueFn: (val: T | null) => string | undefined
  render: (setValue: (val: T) => void) => ReactNode
  loader: (val: any) => Promise<T>
}

const SearchableComboBox = <T,>({
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
  ...props
}: SearchableComboBoxComponentProps<T>) => {
  return (
    <>
      <input
        type="hidden"
        value={value ?? ''}
        {...props}
        className="hidden"
        readOnly
      />
      <DisplayInput
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
      />
    </>
  )
}

const DisplayInput = <T,>({
  cacheKey,
  className,
  placeholder,
  isDisabled,
  label,
  error,
  value: controlledValue,
  modalProps,
  onChange,
  visibleValueFn,
  render,
  loader,
}: Omit<SearchableComboBoxComponentProps<T>, 'accesorFn'>) => {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<T>()

  const { data: fetchedDefaultValue } = useData<T>({
    key: cacheKey,
    loader: () => loader(controlledValue),
    enabled: !!selected,
  })

  const handleSelect = (val: T) => {
    onChange?.(val)
    setSelected(val)
    setShowModal(false)
  }

  return (
    <>
      <Input
        className={className}
        onClick={() => setShowModal(true)}
        placeholder={placeholder}
        value={visibleValueFn(selected ?? fetchedDefaultValue ?? null) ?? ''}
        disabled={isDisabled}
        label={label}
        error={error}
        readOnly={true}
      />
      <Modal
        {...modalProps}
        onHide={() => setShowModal(false)}
        show={showModal}
      >
        {render(handleSelect)}
      </Modal>
    </>
  )
}

export default SearchableComboBox
