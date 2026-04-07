import {
  forwardRef,
  ReactElement,
  Ref,
  useImperativeHandle,
  useState,
  type ReactNode,
} from 'react'

export type PickerInputDataControllerRef<T> = {
  setValue: (value: T | null) => void
}

export type PickerInputDataControllerProps<T> = {
  render: (value: T | null) => ReactNode
}

export const PickerInputDataControllerInner = <T,>(
  { render }: PickerInputDataControllerProps<T>,
  ref: Ref<PickerInputDataControllerRef<T>>,
) => {
  const [value, setValue] = useState<T | null>(null)

  useImperativeHandle(ref, () => ({ setValue }), [])

  return render(value)
}

export const PickerInputDataController = forwardRef(
  PickerInputDataControllerInner,
) as <T>(
  props: PickerInputDataControllerProps<T> & {
    ref: Ref<PickerInputDataControllerRef<T>>
  },
) => ReactElement
