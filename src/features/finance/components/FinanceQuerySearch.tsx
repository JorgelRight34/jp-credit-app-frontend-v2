import { EntityQuerySearch } from "@/components/EntityQuerySearch";
import { QuerySearchInput, QuerySearchProps, TimeUnit } from "@/models";
import { FinanceQuery } from "../models/financeQuery";
import { exportProjections } from "../services/financeClient";
import { createDateRangeFormInterceptor } from "@/components/EntityForm/utils/interceptors";

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
      onDownload={exportProjections}
      reportTitle={"Proyección Pago de Mensualidades"}
      interceptors={[createDateRangeFormInterceptor(["start", "end"])]}
      {...props}
    />
  );
};

export default FinanceQuerySearch;
