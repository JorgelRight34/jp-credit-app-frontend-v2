import InfoTable from "../../../components/DataTable/components/InfoTable";
import { toFormattedDate, toTitleCase } from "../../../utils/utils";
import { Collateral } from "../models/collateral";
import LinkToProfile from "../../Profiles/components/LinkToProfile";
import LinkToLoan from "../../Loans/components/LinkToLoan";
import {
  collateralConditionSpanishTranslations,
  collateralStatusSpanishTranslations,
} from "../lib/constants";

interface CollateralInfoTableProps {
  collateral: Collateral;
}

const CollateralInfoTable = ({ collateral }: CollateralInfoTableProps) => {
  return (
    <>
      <InfoTable
        className="d-none d-md-block"
        data={[
          ["Id", collateral.id],
          ["Título", collateral.title],
          ["Cliente", <LinkToProfile profile={collateral.ownerName} />],
          ["Préstamo", <LinkToLoan id={collateral.loanId} />],
          [
            "Estado",
            toTitleCase(collateralStatusSpanishTranslations[collateral.status]),
          ],
          [
            "Condición",
            toTitleCase(
              collateralConditionSpanishTranslations[collateral.condition]
            ),
          ],
          ["Fecha", toFormattedDate(collateral.createdAt)],
        ]}
      />
    </>
  );
};

export default CollateralInfoTable;
