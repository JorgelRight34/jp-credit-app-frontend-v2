import { EntitySearchInput, EntitySearchInputProps } from "@/components";
import { Collateral } from "../models/collateral";
import { CollateralQuery } from "../models/collateralQuery";
import CollateralsSection from "./CollateralsSection";
import { collateralsQueryKey } from "../lib/constants";
import { collateralClient } from "../services/collateralsClient";

type CollateralSearchInputProps = EntitySearchInputProps<
  Collateral,
  CollateralQuery
>;

const CollateralSearchInput = ({
  id,
  onChange,
  ...props
}: CollateralSearchInputProps) => (
  <EntitySearchInput<Collateral, CollateralQuery>
    cacheKey={collateralsQueryKey}
    modalProps={{
      title: "Buscar Garantía",
      height: "90dvh",
      width: "75dvw",
    }}
    accesorFn={(c) => c?.id}
    visibleValueFn={(c) => c?.title}
    onSearch={collateralClient.getCollateral}
    onChange={onChange}
    id={id}
    render={(setValue) => (
      <CollateralsSection {...props} table={{ onRowClick: setValue }} />
    )}
  />
);

export default CollateralSearchInput;
