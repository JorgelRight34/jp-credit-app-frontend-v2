import { EntitySection, EntitySectionProps } from "@/components";
import { Collateral } from "../models/collateral";
import { CollateralQuery } from "../models/collateralQuery";
import CollateralSearchQueryInput from "./CollateralQuerySearch";
import CollateralsDataTable from "./CollateralsDataTable";

type CollateralsSectionProps = EntitySectionProps<Collateral, CollateralQuery>;

const CollateralsSection = ({ ...props }: CollateralsSectionProps) => {
  return (
    <EntitySection
      Search={CollateralSearchQueryInput}
      DataTable={CollateralsDataTable}
      {...props}
    />
  );
};

export default CollateralsSection;
