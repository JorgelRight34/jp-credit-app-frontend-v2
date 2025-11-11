import { QuerySearchInput } from "../../../components/EntityQuerySearch/models/querySearchInput";
import { QuerySearchProps } from "../../../components/EntityQuerySearch/models/querySearchProps";
import { LoanQuery } from "../models/loanQuery";
import { ProfileRole } from "@/features/Profiles/models/profileRole";
import { loanStatusSelectOptions } from "../lib/constants";
import EntityQuerySearch from "@/components/EntityQuerySearch/components/EntityQuerySearch";
import { getLoansReportBlob } from "../services/loanClient";
import { dateRangeFormInterceptor } from "@/components/EntityForm/utils/interceptors";

interface LoanQuerySearchProps extends QuerySearchProps<LoanQuery> {
  roles?: ProfileRole[];
  profileAs?: ProfileRole;
}

const fields: QuerySearchInput<LoanQuery>[] = [
  {
    name: "id",
    id: "id",
    label: "Id",
    type: "number",
  },
  {
    name: "profileId",
    id: "profileId",
    label: "Pérfil",
    type: "profile",
    searchOnChange: true,
    col: 4,
  },
  {
    id: "status",
    name: "status",
    label: "Estado",
    type: "select",
    options: loanStatusSelectOptions,
  },
];

const moreFields: QuerySearchInput<LoanQuery>[] = [
  {
    id: "minPaymentValue",
    name: "minPaymentValue",
    label: "Cuota Mínima",
    type: "currency",
  },
  {
    id: "maxPaymentValue",
    name: "maxPaymentValue",
    label: "Cuota Máxima",
    type: "currency",
  },
  {
    id: "date",
    name: "date",
    type: "date-range",
    label: "Rango de Fecha",
  },
  {
    name: "guarantorId",
    id: "guarantorId",
    label: "Garante",
    type: "guarantor",
  },
  {
    id: "loanOfficerId",
    name: "loanOfficerId",
    label: "Agente",
    type: "loanOfficer",
  },
  {
    name: "clientId",
    id: "clientId",
    label: "Cliente",
    type: "client",
  },
];

const LoanQuerySearch = ({ ...props }: LoanQuerySearchProps) => {
  return (
    <EntityQuerySearch<LoanQuery>
      fields={fields}
      onDownload={getLoansReportBlob}
      moreFields={moreFields}
      interceptors={[dateRangeFormInterceptor()]}
      {...props}
    />
  );
};

export default LoanQuerySearch;
