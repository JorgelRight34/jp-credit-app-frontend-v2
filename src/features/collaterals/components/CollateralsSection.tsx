import CollateralsDataTable from "./CollateralsDataTable";
import { CollateralQuery } from "../models/collateralQuery";
import CollateralSearchQueryInput from "./CollateralSearchQueryInput";
import { Collateral } from "../models/collateral";
import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";
import EntitySection from "@/components/EntitySection/components/EntitySection";

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
