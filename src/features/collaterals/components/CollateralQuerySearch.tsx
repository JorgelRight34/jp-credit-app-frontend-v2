import {
  dateRangeFormInterceptor,
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { collateralStatusOptions } from "../lib/form";
import { CollateralQuery } from "../models/collateralQuery";
import { getCollateralsReportBlob } from "../services/collateralsClient";

type CollateralQuerySearchProps = QuerySearchProps<CollateralQuery>;

const fields: QuerySearchInput<CollateralQuery>[] = [
  {
    name: "id",
    label: "Id",
    col: 1,
  },
  {
    name: "title",
    label: "Título",
  },
  {
    name: "date-range",
    label: "Fecha",
    type: "date-range",
    col: 3,
  },
  {
    name: "status",
    label: "Estado",
    type: "select",
    options: collateralStatusOptions,
    searchOnChange: true,
  },
];

const moreFields: QuerySearchInput<CollateralQuery>[] = [
  {
    id: "title",
    name: "title",
    label: "Título",
  },
  {
    id: "status",
    name: "status",
    label: "Estado",
    type: "select",
    options: [
      ["active", "Activo"],
      ["inactive", "Inactivo"],
    ],
  },
  {
    name: "loanId",
    label: "Préstamo",
    searchOnChange: true,
    type: "loan",
  },
];

const CollateralQuerySearch = ({ ...props }: CollateralQuerySearchProps) => {
  return (
    <EntityQuerySearch
      fields={fields}
      onDownload={getCollateralsReportBlob}
      moreFields={moreFields}
      interceptors={[dateRangeFormInterceptor()]}
      {...props}
    />
  );
};

export default CollateralQuerySearch;
