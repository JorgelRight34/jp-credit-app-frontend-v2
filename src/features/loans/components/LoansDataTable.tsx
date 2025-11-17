"use client";

import {
  Column,
  DateLabel,
  EntityDataTable,
  EntityDataTableProps,
} from "@/components";
import { Loan } from "../models/loan";
import { LoanQuery } from "../models/loanQuery";
import { LoanStatus } from "../models/loanStatus";
import { LinkToProfile } from "@/features/profiles";
import { sortDateRows, toCurrency } from "@/utils/utils";
import { useRouter } from "next/router";
import { loansQueryKey } from "../lib/constants";
import { loanClient } from "../services/loanClient";

type LoansDataTableProps = EntityDataTableProps<Loan, LoanQuery> & {
  status?: LoanStatus;
};

const columns: Column<Loan>[] = [
  { accessorKey: "id", header: "Id" },
  {
    header: "Cliente",
    accessorFn: (row) => row.clientName,
    enableSorting: true,
    cell: ({ row }) => <LinkToProfile profile={row.original.clientName} />,
  },

  {
    accessorKey: "disbursedAmount",
    header: "Desembolsado",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.disbursedAmount),
  },
  {
    accessorKey: "paymentValue",
    header: "Cuota",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.paymentValue),
  },
  {
    accessorKey: "principalBalance",
    header: "B. Capital",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.principalBalance),
  },
  {
    accessorKey: "accruedInterest",
    header: "Intereses",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.accruedInterest),
  },
  /*
  {
    accessorKey: "overduePaymentsNumber",
    header: "Cuotas Atrasadas",
    cell: ({ row }) => row.original.overduePaymentsNumber?.toFixed(2),
  },
  */
  {
    accessorKey: "overdue",
    header: "Mora",
    cell: ({ row }) => toCurrency(row.original.overdue),
  },

  {
    accessorKey: "lastPaymentDate",
    header: "Últ. Pago",
    enableSorting: true,
    sortingFn: sortDateRows,
    cell: ({ row }) => <DateLabel date={row.original.lastPaymentDate} />,
  },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    enableSorting: true,
    cell: ({ row }) => <DateLabel date={row.original.startDate} />,
  },
];

const LoansDataTable = ({ query, ...props }: LoansDataTableProps) => {
  const router = useRouter();

  return (
    <EntityDataTable
      title="Préstamo"
      cacheKey={loansQueryKey}
      columns={columns}
      query={query}
      loader={loanClient.getLoans}
      validateProject={true}
      onRowClick={(l) => router.push(`/loans/${l.id}`)}
      onExpand={(row) => <>{row.original.overduePaymentsNumber}</>}
      {...props}
    />
  );
};

export default LoansDataTable;
