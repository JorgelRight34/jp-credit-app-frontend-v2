import { FieldValues, useFormState } from 'react-hook-form'
import { UseFormBuilderReturn } from '../models/useFormBuilderReturn'
import { useMemo } from 'react'
import { FormError } from '../models/formError'
import { ApiError } from '../models/apiError'
import { AxiosError } from 'axios'

interface FormErrorsPanelProps<T extends FieldValues> {
  control: UseFormBuilderReturn<T>['form']['control']
  mutationError: any
}

const FormErrorsPanel = <T extends FieldValues>({
  control,
  mutationError,
}: FormErrorsPanelProps<T>) => {
  const { errors } = useFormState({ control })

  const apiErrors = useMemo(() => {
    if (!(mutationError instanceof AxiosError)) return []

    const apiErrs = mutationError.response?.data as ApiError | undefined
    if (!apiErrs?.errors) return []

    return Object.values(apiErrs.errors).flat()
  }, [mutationError])

  const formErrors = useMemo<Array<FormError>>(() => {
    return Object.keys(errors).map((key) => ({
      src: key,
      message: errors[key]?.message?.toString() || '',
    }))
  }, [errors])

  return (
    <>
      {apiErrors.length > 0 && (
        <ul className="list-disc">
          {apiErrors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
      {
        <ul className="list-disc">
          {formErrors.map((err, index) => (
            <li key={index}>
              {err.src} - {err.message}
            </li>
          ))}
        </ul>
      }
    </>
  )
}

export default FormErrorsPanel
