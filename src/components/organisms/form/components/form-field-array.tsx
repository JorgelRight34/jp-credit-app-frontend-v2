import { AddIcon, Icon, LightBtn } from '@/components/atoms'
import { ReactNode } from 'react'
import {
  ArrayPath,
  Control,
  FieldArray,
  FieldValues,
  useFieldArray,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
} from 'react-hook-form'

export interface ArrayFieldProps<T extends FieldValues> {
  control: Control<T>
  index: number
  value: object
  remove: UseFieldArrayRemove
  update: UseFieldArrayUpdate<T, ArrayPath<T>>
}

interface FormFieldArrayProps<T extends FieldValues> {
  name: ArrayPath<T>
  control: Control<T>
  appendDefaultValues:
    | FieldArray<T, ArrayPath<T>>
    | FieldArray<T, ArrayPath<T>>[]
  render: (props: ArrayFieldProps<T>) => ReactNode
}

const FormFieldArray = <T extends FieldValues>({
  control,
  name,
  appendDefaultValues,
  render: Component,
}: FormFieldArrayProps<T>) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  })

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-col space-y-3">
        {fields.map((field, index) => (
          <Component
            key={field.id}
            value={field}
            control={control}
            index={index}
            remove={remove}
            update={update}
          />
        ))}
      </div>
      <div className="flex-shrink-0 pt-3">
        <LightBtn onClick={() => append(appendDefaultValues)}>
          <Icon icon={AddIcon}>Agregar</Icon>
        </LightBtn>
      </div>
    </div>
  )
}

export default FormFieldArray
