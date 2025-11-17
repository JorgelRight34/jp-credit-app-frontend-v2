import {
  dateRangeFormInterceptor,
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from "@/components";
import { LoanQuery } from "../models/loanQuery";
import { ProfileRole } from "@/features/profiles";
import { loanStatusSelectOptions } from "../lib/constants";
import { loanClient } from "../services/loanClient";

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
    <EntityQuerySearch
      fields={fields}
      onDownload={loanClient.getLoansReportBlob}
      moreFields={moreFields}
      interceptors={[dateRangeFormInterceptor()]}
      {...props}
    />
  );
};

export default LoanQuerySearch;
