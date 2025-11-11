import { useMemo } from "react";
import { getLocaleMonth, toCurrency, toTitleCase } from "@/utils/utils";
import { EntityDataTableProps } from "@/models";
import { Column } from "@/components/DataTable/models/column";
import { DataTable } from "@/components/DataTable";
import { addDays } from "date-fns";
import { AmortizationPayment } from "../models/amortizationPayment";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";
import useGenerateAmortization from "../hooks/useGenerateArmotization";

type AmortizationDataTableProps = EntityDataTableProps<
  AmortizationPayment,
  AmortizationCalculatorInput
> & {
  paymentFrequencyPerYear?: number;
  startDate?: Date;
  loanId?: number;
};

/**
 * amortizationDataTable component displays a table of amortization payments.
 * It uses the DataTable component to render the data in a tabular format.
 */
const AmortizationDataTable = ({
  query = {},
  startDate,
  paymentFrequencyPerYear,
  ...props
}: AmortizationDataTableProps) => {
  const columns = useMemo<Column<AmortizationPayment>[]>(
    () => [
      {
        accessorKey: "number",
        header: "No.",
        cell: ({ row }) => {
          if (!startDate || !paymentFrequencyPerYear)
            return row.original.number;
          return toTitleCase(
            getLocaleMonth(
              addDays(
                startDate,
                (365 / paymentFrequencyPerYear) * row.original.number,
              ),
            ),
          );
        },
      },
      {
        header: "Cuota",
        cell: ({ row }) => toCurrency(row.original.total),
      },
      {
        header: "Intereses",
        cell: ({ row }) => toCurrency(row.original.interestValue),
      },
      {
        header: "Capital",
        cell: ({ row }) => toCurrency(row.original.capitalValue),
      },
      {
        header: "Balance",
        cell: ({ row }) => toCurrency(row.original.principalBalance),
      },
    ],
    [paymentFrequencyPerYear, startDate],
  );

  const { amortization } = useGenerateAmortization({
    ...query,
    enabled: Object.keys(query).length > 0,
  });

  return (
    <DataTable columns={columns} data={amortization.amortizations} {...props} />
  );
};

export default AmortizationDataTable;
