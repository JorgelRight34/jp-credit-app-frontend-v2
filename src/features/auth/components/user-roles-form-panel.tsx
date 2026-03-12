import { useMemo } from 'react'
import { useUserRolesForm } from '../hooks/useUserRolesForm'
import { getRoleString } from '../lib/utils'
import { allRolesQueryOptions } from '../lib/query-keys'
import type { DataModuleFormProps, FormRef, TransferItem } from '@/components'
import type { UserRolesFormValues } from '../lib/schemas/userRolesFormSchema'
import type { User } from '../models/user'
import { Form, FormInput, TransferList } from '@/components'
import { useSuspenseData } from '@/hooks/useData'

export type UserRolesFormProps = DataModuleFormProps<null, UserRolesFormValues>
export type UserRolesFormRef = FormRef<UserRolesFormValues>

type UserRolesFormPanelProps = UserRolesFormProps & {
  form: ReturnType<typeof useUserRolesForm>
  user?: User
}

const UserRolesFormPanel = ({ form, ref }: UserRolesFormPanelProps) => {
  const { data } = useSuspenseData(allRolesQueryOptions)
  const rolesListClaims = useMemo<Array<TransferItem>>(
    () =>
      data.items.map((item) => ({
        id: item.normalizedName,
        label: getRoleString(item),
      })),
    [data],
  )

  return (
    <Form ref={ref} form={form}>
      <FormInput
        name="roles"
        as={({ value, ...inputProps }) =>
          TransferList({
            items: rolesListClaims,
            value: value as Array<string>,
            leftTitle: 'Disponibles',
            rightTitle: 'Seleccionados',
            rightSubtitle: `Elija los roles seleccionándolos y luego seleccione el botón de flecha "Elegir".`,
            leftSubtitle: `Elimine roles seleccionándolos y luego seleccione el botón de flecha "Eliminar".`,
            ...inputProps,
          })
        }
      />
    </Form>
  )
}

export default UserRolesFormPanel
