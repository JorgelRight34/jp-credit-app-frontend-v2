import { usePermissionsForm } from '../hooks/usePermissionsForm'
import type { UpdatePermissionsHandler } from '../hooks/usePermissionsForm'
import type { DataModuleFormProps, FormRef } from '@/components'
import type { PermissionsFormValues } from '../lib/schemas/permissionsFormSchema'
import { Form, FormInput, TransferList } from '@/components'

export type PermissionsFormProps = DataModuleFormProps<
  null,
  PermissionsFormValues
> & {
  handler: UpdatePermissionsHandler
}

export type PermissionsFormRef = FormRef<PermissionsFormValues>

const PermissionsForm = ({ ref, ...props }: PermissionsFormProps) => {
  const { form, claimListOptions } = usePermissionsForm({ ...props })

  return (
    <Form ref={ref} form={form}>
      <FormInput
        name="claims"
        as={({ value, ...inputProps }) =>
          TransferList({
            items: claimListOptions,
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
