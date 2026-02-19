import { toCurrency, toFormattedDate } from '@/lib/utils'
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
  ViewMore,
} from '@/components'
import { getCollateralStatus } from '../lib/utils'

interface CollateralOverviewProps {
  collateral: Collateral
}

const CollateralOverview = ({ collateral }: CollateralOverviewProps) => {
  return (
    <section>
      <div className="flex gap-6">
        <div className="flex items-center justify-center w-6/12">
          <CollateralPhotoGallery collateral={collateral} />
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
              value={
                collateral.expirationDate
                  ? toFormattedDate(collateral.expirationDate)
                  : null
              }
              optional
            />
          </FormRow>
        </aside>
      </div>
      <ViewMore className="mb-6">
        <div className="flex gap-6">
          <div className="w-6/12">
            <FormRow>
              <FormReadOnlyGroup
                name="status"
                label="Estado"
                value={getCollateralStatus(collateral)}
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="soldFor"
                label="Vendido por"
                value={
                  collateral.soldFor ? toCurrency(collateral.soldFor) : null
                }
              />
            </FormRow>
          </div>
          <div className="w-6/12">
            <FormRow>
              <FormReadOnlyGroup
                name="sellDate"
                label="Fecha de venta"
                value={toFormattedDate(collateral.sellDate)}
              />
              <FormReadOnlyGroup
                name="liquidationDate"
                label="Fecha de liquidación"
                optional
                value={toFormattedDate(collateral.liquidationDate)}
              />
            </FormRow>
            <FormRow>
              <FormReadOnlyGroup
                name="createdAt"
                label="Fecha de creación"
                value={toFormattedDate(collateral.createdAt)}
              />
              <FormReadOnlyGroup
                name="updatedAt"
                label="Última actualización"
                value={toFormattedDate(collateral.updatedAt)}
              />
            </FormRow>
          </div>
        </div>
      </ViewMore>
      <FormHtmlDisplayGroup
        name="description"
        label="Descripción"
        value={collateral.description}
        optional
      />
    </section>
  )
}

const CollateralPhotoGallery = ({ collateral }: CollateralOverviewProps) => {
  const images = collateral.files.filter((c) => c.isImage)

  return (
    <PhotoGallery
      className="w-full shadow-sm max-h-[400px]"
      itemBackground="black"
      itemHeight={350}
      photos={images.length > 0 ? images : [defaultCollateralPicFileModel]}
    />
  )
}

export default CollateralOverview
