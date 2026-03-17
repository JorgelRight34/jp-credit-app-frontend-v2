import { useMemo } from 'react'
import { getRoleString } from '../lib/utils'
import type { InputProps, TransferItem } from '@/components'
import { Pagination, TransferList } from '@/components'
import { useDataWithPagination } from '@/hooks/useData'
import { rolesQueryKey } from '../lib/constants'
import { getRoles } from '../services/authService'
import { PagedResponse } from '@/models'
import { Role } from '../models/role'

const UserRolesTransferList = (props: InputProps) => {
  const {
    result: { data },
    page,
    setPage,
  } = useDataWithPagination({
    key: [rolesQueryKey, 'form-list-options'],
    staleTime: 1,
    loader: (page) => getRoles({ page, limit: 25, orderBy: 'name' }),
  })

  if (!data) return null

  return (
    <UserRolesTransferListInner
      data={data}
      page={page}
      setPage={setPage}
      {...props}
    />
  )
}

const UserRolesTransferListInner = ({
  data,
  page,
  value,
  setPage,
  ...props
}: InputProps & {
  data: PagedResponse<Role>
  page: number
  setPage: (p: number) => void
}) => {
  const rolesListClaims = useMemo<Array<TransferItem>>(
    () =>
      data.items.map((item) => ({
        id: item.normalizedName,
        label: getRoleString(item),
      })),
    [data],
  )

  return (
    <div className="flex flex-1 flex-col">
      <TransferList
        items={rolesListClaims}
        value={value}
        leftTitle="Disponibles"
        rightTitle="Seleccionados"
        rightSubtitle='Elija los roles seleccionándolos y luego seleccione el botón de flecha "Elegir".'
        leftSubtitle='Elimine roles seleccionándolos y luego seleccione el botón de flecha "Eliminar".'
        {...props}
      />
      <div className="flex justify-end flex-shrink-0 pt-3">
        <Pagination
          count={data?.totalPages}
          page={page}
          onChange={(_, val) => setPage(val)}
        />
      </div>
    </div>
  )
}

export default UserRolesTransferList
