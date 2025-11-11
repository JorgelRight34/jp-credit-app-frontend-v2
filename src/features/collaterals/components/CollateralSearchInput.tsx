import { EntitySearchInputProps } from "@/models";
import { Collateral } from "../models/collateral";
import { CollateralQuery } from "../models/collateralQuery";
import { EntitySearchInput } from "@/components/EntityForm";
import { collateralsQueryKey } from "../lib/constants";
import { getCollateral } from "../services/collateralsClient";
import CollateralsSection from "./CollateralsSection";

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
    onSearch={getCollateral}
    onChange={onChange}
    id={id}
    render={(setValue) => (
      <CollateralsSection {...props} table={{ onRowClick: setValue }} />
    )}
  />
);

export default CollateralSearchInput;
