import {
  collateralConditionTranslations,
  collateralTypeTranslations,
} from '../lib/constants'
import type { Collateral } from '../models/collateral'
import { FormReadOnlyGroup, FormRow } from '@/components'

interface CollateralOverviewProps {
  collateral: Collateral
}

const CollateralOverview = ({ collateral }: CollateralOverviewProps) => {
  return (
    <section>
      <FormRow>
        <FormReadOnlyGroup
          label="Título"
          name="title"
          value={collateral.title}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          label="Valor"
          name="value"
          value={collateral.value}
        />
        <FormReadOnlyGroup
          name="loanId"
          label="Préstamo"
          value={`Préstamo No.${collateral.loanId}`}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="condition"
          label="Condición"
          value={collateralConditionTranslations[collateral.condition]}
        />
        <FormReadOnlyGroup
          name="type"
          label="Tipo"
          value={collateralTypeTranslations[collateral.type]}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="location"
          label="Localidad"
          value={collateral.location}
          optional
        />
        <FormReadOnlyGroup
          name="expirationDate"
          label="Expiración"
          value={collateral.expirationDate}
          optional
        />
      </FormRow>
      <FormReadOnlyGroup
        name="description"
        label="Descripción"
        value={collateral.description}
        optional
      />
    </section>
  )
}

export default CollateralOverview
