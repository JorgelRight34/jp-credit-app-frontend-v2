import InfoTable from "../../../components/DataTable/components/InfoTable";
import { Collateral } from "../models/collateral";
import { toCurrency, toFormattedDate, toTitleCase } from "../../../utils/utils";
import { collateralAgreementTypeSpanishTranslations } from "../lib/constants";

interface CollateralCriticalInfoProps {
  collateral: Collateral;
}

const CollateralCriticalInfo = ({
  collateral,
}: CollateralCriticalInfoProps) => {
  return (
    <>
      <InfoTable
        className="d-none d-md-block"
        data={[
          [
            "Tipo de Garantía",
            toTitleCase(
              collateralAgreementTypeSpanishTranslations[collateral.type]
            ),
            "Fecha de Expiración",
            collateral.expirationDate
              ? toFormattedDate(new Date(collateral.expirationDate))
              : "---",
          ],
          ["Valor Estimado", toCurrency(collateral.value), "", ""],
          [
            "Ubicación",
            collateral.location
              ? toTitleCase(collateral.location)
              : "No aplica.",
            "",
            "",
          ],
        ]}
      />
      <InfoTable
        className="d-block d-md-none"
        data={[
          [
            "Tipo de Garantía",
            toTitleCase(
              collateralAgreementTypeSpanishTranslations[collateral.type]
            ),
          ],
          [
            "Expiración",
            collateral.expirationDate
              ? toFormattedDate(new Date(collateral.expirationDate))
              : "---",
          ],
          ["Valor Estimado", toCurrency(collateral.value), "", ""],
          [
            "Ubicación",
            collateral.location
              ? toTitleCase(collateral.location)
              : "No aplica.",
          ],
        ]}
      />
    </>
  );
};

export default CollateralCriticalInfo;
