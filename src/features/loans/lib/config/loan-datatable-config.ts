import { getLoans } from "../../services/loanClient";
import { loansQueryKey } from "../constants";
import type { Loan } from "../../models/loan";
import type { DataTableConfig } from "@/components";
import { createSingleSelectCell } from "@/components";

export const loanDataTableConfig: DataTableConfig<Loan> = {
    title: "Préstamos",
    columns: [
        { id: "id", header: "ID", enableSorting: true },
    ],
    cacheKey: [loansQueryKey],
    loader: getLoans
}

export const createLoanSearchInputDataTableConfig = (onRowClick: (loan: Loan) => void): DataTableConfig<Loan> => {
    console.log("recreating")
    return ({
        title: "Préstamos",
        columns: [
            { id: "id", header: "ID", enableSorting: true },
            { id: "select", cell: ({ row }) => createSingleSelectCell(() => onRowClick(row.original)) }
        ],
        cacheKey: [loansQueryKey],
        loader: getLoans
    })
}