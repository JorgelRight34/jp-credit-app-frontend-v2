import { InputProps, TransferItem, TransferList } from '@/components'
import { useSuspenseData } from '@/hooks/useData'
import { allPossibleClaimsQueryOptions } from '../lib/query-keys'
import { useMemo } from 'react'
import { mapIdentityClaimsToTransferItems } from '../lib/utils'

const PermissionsFormTransferList = ({ value, ...props }: InputProps) => {
  const { data: identityClaims } = useSuspenseData(
    allPossibleClaimsQueryOptions,
  )

  const claimListOptions = useMemo<Array<TransferItem>>(
    () => mapIdentityClaimsToTransferItems(identityClaims.claims),
    [identityClaims.claims],
  )

  return (
    <TransferList
      items={claimListOptions}
      value={value as Array<string>}
      leftTitle="Disponibles"
      rightTitle="Seleccionados"
      rightSubtitle='Elija los permisos seleccionándolos y luego seleccione el botón de flecha "Elegir".'
      leftSubtitle='Elimine permisos seleccionándolos y luego seleccione el botón de flecha "Eliminar".'
      {...props}
    />
  )
}

export default PermissionsFormTransferList
