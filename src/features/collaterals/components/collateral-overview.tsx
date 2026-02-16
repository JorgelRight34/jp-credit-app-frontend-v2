import { toCurrency } from '@/lib/utils'
import {
  collateralConditionTranslations,
  collateralTypeTranslations,
  defaultCollateralPicFileModel,
} from '../lib/constants'
import type { Collateral } from '../models/collateral'
import {
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  FormReadonlyGroupLabelLink,
  FormRow,
  PhotoGallery,
} from '@/components'

interface CollateralOverviewProps {
  collateral: Collateral
}

const CollateralOverview = ({ collateral }: CollateralOverviewProps) => {
  return (
    <section>
      <div className="flex mb-6">
        <div className="flex items-center justify-center w-6/12 pr-6">
          <PhotoGallery
            className="w-full shadow-sm"
            photos={
              collateral.files.length > 0
                ? collateral.files.filter((c) => c.isImage)
                : [defaultCollateralPicFileModel]
            }
          />
        </div>
        <aside className="w-6/12">
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
              value={toCurrency(collateral.value)}
            />
            <FormReadOnlyGroup
              name="loanId"
              label={
                <FormReadonlyGroupLabelLink
                  to="/loans/$id"
                  params={{ id: collateral.loanId.toString() }}
                >
                  Préstamo
                </FormReadonlyGroupLabelLink>
              }
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
        </aside>
      </div>
      <FormHtmlDisplayGroup
        name="description"
        label="Descripción"
        value={collateral.description}
        optional
      />
    </section>
  )
}

export default CollateralOverview
