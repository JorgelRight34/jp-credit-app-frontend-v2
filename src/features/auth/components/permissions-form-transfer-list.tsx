import { InputProps, TransferItem, TransferList } from '@/components'
import { useSuspenseData } from '@/hooks/useData'
import { allPossibleClaimsQueryOptions } from '../lib/query-keys'
import { useMemo } from 'react'
import { IdentityClaims } from '../models/identityClaims'

const PermissionsFormTransferList = ({ value, ...props }: InputProps) => {
  const { data: identityClaims } = useSuspenseData(
    allPossibleClaimsQueryOptions,
  )

  const claimTransferItems = useMemo(
    () => mapIdentityClaimsToTransferItems(identityClaims.claims),
    [identityClaims.claims],
  )

  return (
    <TransferList
      items={claimTransferItems}
      value={value as Array<string>}
      leftTitle="Disponibles"
      rightTitle="Seleccionados"
      rightSubtitle='Elija los permisos seleccionándolos y luego seleccione el botón de flecha "Elegir".'
      leftSubtitle='Elimine permisos seleccionándolos y luego seleccione el botón de flecha "Eliminar".'
      {...props}
    />
  )
}

const mapIdentityClaimsToTransferItems = (
  claims: IdentityClaims['claims'],
): Array<TransferItem<string>> => {
  return Object.entries(claims).flatMap(([domain, values]) =>
    values.map(({ value, description }) => ({
      id: value,
      label: `${domain} | ${value}${description ? ` | ${description}` : ''}`,
    })),
  )
}

export default PermissionsFormTransferList
