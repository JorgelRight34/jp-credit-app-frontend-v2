import { useMemo } from "react";
import { QuerySearchInput } from "../../../components/EntityQuerySearch/models/querySearchInput";
import { QuerySearchProps } from "../../../components/EntityQuerySearch/models/querySearchProps";
import { TransactionsQuery } from "../models/transactionsQuery";
import { TransactionType } from "../models/transactionType";
import { profileRolesSpanishTranslations } from "@/features/Profiles/lib/constants";
import { toTitleCase } from "@/utils/utils";
import EntityQuerySearch from "@/components/EntityQuerySearch/components/EntityQuerySearch";
import { getTransactionsReportBlob } from "../services/transactionsClient";
import { dateRangeFormInterceptor } from "@/components/EntityForm/utils/interceptors";

type TransactionQuerySearchProps = QuerySearchProps<TransactionsQuery> & {
  type?: TransactionType;
};

const TransactionQuerySearch = ({
  defaultValues,
  ...props
}: TransactionQuerySearchProps) => {
  const fields = useMemo<QuerySearchInput<TransactionsQuery>[]>(
    () => [
      {
        name: "id",
        id: "id",
        label: "Id Transacción",
      },
      {
        id: "loanId",
        name: "loanId",
        profileId: defaultValues?.profileId,
        label: "Préstamo",
        type: "loan",
      },
      {
        id: "date-range",
        name: "date",
        label: "Fecha",
        type: "date-range",
      },
      {
        id: "profileId",
        name: "profileId",
        label: toTitleCase(
          profileRolesSpanishTranslations[
            defaultValues?.profileAs ?? "profile"
          ],
        )!,
        type: "profile",
        loanId: defaultValues?.loanId,
      },
    ],
    [defaultValues],
  );

  const moreFields = useMemo<QuerySearchInput<TransactionsQuery>[]>(
    () => [
      {
        id: "minValue",
        name: "minValue",
        label: "Valor Mínimo",
        type: "currency",
      },
      {
        id: "maxValue",
        name: "maxValue",
        label: "Valor Máximo",
        type: "currency",
      },
      {
        id: "profileId",
        name: "profileId",
        metadata: { loanId: defaultValues?.loanId },
        mmg: "klk",
        label: toTitleCase(
          profileRolesSpanishTranslations[
            defaultValues?.profileAs ?? "profile"
          ],
        )!,
        type: "loan",
      },
      {
        id: "isLate",
        name: "isLate",
        label: "Pago Atrasado",
        type: "switch",
      },
    ],
    [defaultValues],
  );

  return (
    <EntityQuerySearch
      defaultValues={{
        ...defaultValues,
        date: [defaultValues?.startDate, defaultValues?.endDate],
      }}
      fields={fields}
      moreFields={moreFields}
      interceptors={[dateRangeFormInterceptor()]}
      onDownload={getTransactionsReportBlob}
      {...props}
    />
  );
};

export default TransactionQuerySearch;
