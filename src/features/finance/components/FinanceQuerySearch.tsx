import {
  createDateRangeFormInterceptor,
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { FinanceQuery } from "../models/financeQuery";
import { TimeUnit } from "@/models";
import { financeClient } from "../services/financeClient";

type FinanceQuerySearchProps = QuerySearchProps<FinanceQuery>;

const fields: QuerySearchInput<FinanceQuery>[] = [
  {
    type: "date",
    name: "start",
    label: "Inicio",
    hideWhenDefault: false,
    col: 4,
  },
  {
    type: "date",
    name: "end",
    label: "Fin",
    hideWhenDefault: false,
    col: 4,
  },
  {
    name: "timeUnit",
    id: "timeUnit",
    label: "Intervalo",
    type: "select",
    options: [
      [365, "Anual"],
      [30, "Mensual"],
      [7, "Semanal"],
    ] as [TimeUnit, string][],
    searchOnChange: true,
    hideWhenDefault: false,
  },
];

const moreFields: QuerySearchInput<FinanceQuery>[] = [
  {
    label: "Escala",
    name: "scale",
    type: "select",
    options: [
      ["band", "Banda"],
      ["time", "Tiempo"],
    ],
  },
];

const FinanceQuerySearch = ({ ...props }: FinanceQuerySearchProps) => {
  return (
    <EntityQuerySearch<FinanceQuery, object>
      fields={fields}
      moreFields={moreFields}
      onDownload={financeClient.exportProjections}
      reportTitle={"Proyección Pago de Mensualidades"}
      interceptors={[createDateRangeFormInterceptor(["start", "end"])]}
      {...props}
    />
  );
};

export default FinanceQuerySearch;
