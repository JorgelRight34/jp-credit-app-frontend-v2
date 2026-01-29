import { Controller } from 'react-hook-form'
import type { ReactNode } from 'react'
import type { InputProps } from '@/components/atoms'

interface FormInputProps extends InputProps {
  name: string
  as: (props: { onChange: (e: unknown) => unknown }) => ReactNode
}

const FormInput = ({ as, name, ...props }: FormInputProps) => {
  const Component = as

  return (
    <Controller
      name={name}
      render={({ field }) => {
        return <Component {...props} {...field} />
      }}
    />
  )
}

export default FormInput
