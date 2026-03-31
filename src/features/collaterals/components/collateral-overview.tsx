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
  LayoutRow,
  OverviewLayout,
  PhotoGallery,
  ViewMore,
} from '@/components'
import { getCollateralStatus } from '../lib/utils'
import { buildLoanLabelById } from '@/features/loans'

interface CollateralOverviewProps {
  collateral: Collateral
}

const CollateralOverview = ({ collateral }: CollateralOverviewProps) => {
  return (
    <OverviewLayout>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex w-full items-center justify-center md:w-6/12">
          <CollateralPhotoGallery collateral={collateral} />
        </div>
        <aside className="flex w-full flex-col gap-6 md:w-6/12">
          <LayoutRow>
            <FormReadOnlyGroup
              label="Título"
              name="title"
              value={collateral.title}
            />
          </LayoutRow>
          <LayoutRow>
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
              value={buildLoanLabelById(collateral.loanId)}
            />
          </LayoutRow>
          <LayoutRow>
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
          </LayoutRow>
          <LayoutRow>
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
          </LayoutRow>
        </aside>
      </div>
      <ViewMore>
        <LayoutRow>
          <FormReadOnlyGroup
            name="status"
            label="Estado"
            value={getCollateralStatus(collateral)}
          />
          <FormReadOnlyGroup
            name="sellDate"
            label="Fecha de venta"
            value={
              collateral.sellDate ? toFormattedDate(collateral.sellDate) : '---'
            }
          />
        </LayoutRow>
        <LayoutRow>
          <FormReadOnlyGroup
            name="soldFor"
            label="Vendido por"
            value={collateral.soldFor ? toCurrency(collateral.soldFor) : null}
          />
          <FormReadOnlyGroup
            name="liquidationDate"
            label="Fecha de liquidación"
            optional
            value={
              collateral.liquidationDate
                ? toFormattedDate(collateral.liquidationDate)
                : '---'
            }
          />
        </LayoutRow>

        <LayoutRow>
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
        </LayoutRow>
      </ViewMore>
      <FormHtmlDisplayGroup
        name="description"
        label="Descripción"
        value={collateral.description}
        optional
      />
    </OverviewLayout>
  )
}

const CollateralPhotoGallery = ({ collateral }: CollateralOverviewProps) => {
  const images = collateral.files.filter((c) => c.isImage)

  return (
    <PhotoGallery
      className="max-h-[400px] w-full shadow-sm"
      itemBackground="black"
      itemHeight={350}
      photos={images.length > 0 ? images : [defaultCollateralPicFileModel]}
    />
  )
}

export default CollateralOverview
