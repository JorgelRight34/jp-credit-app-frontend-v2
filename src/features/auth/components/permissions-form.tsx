import { usePermissionsForm } from '../hooks/usePermissionsForm'
import { useIdentityClaims } from '../hooks/useIdentityClaims'
import type { Ref } from 'react'
import type { FormRef, UseDataModuleFormProps } from '@/components'
import type { PermissionsFormValues } from '../lib/schemas/permissionsFormSchema'
import { Form, FormInput, TransferList } from '@/components'

export type PermissionsFormProps = UseDataModuleFormProps<
  null,
  PermissionsFormValues
>

const PermissionsForm = ({ ref, ...props }: PermissionsFormProps) => {
  const form = usePermissionsForm({ ...props })
  const { claims } = useIdentityClaims()

  return (
    <Form ref={ref as Ref<FormRef<PermissionsFormValues>>} form={form}>
      <FormInput
        name="claims"
        as={({ value, ...inputProps }) =>
          TransferList({
            items: claims,
            value: value as Array<string>,
            leftTitle: 'Disponibles',
            rightTitle: 'Seleccionados',
            rightSubtitle: `Elija los permisos seleccionándolos y luego seleccione el botón de flecha "Elegir".`,
            leftSubtitle: `Elimine permisos seleccionándolos y luego seleccione el botón de flecha "Eliminar".`,
            ...inputProps,
          })
        }
      />
    </Form>
  )
}

export default PermissionsForm
