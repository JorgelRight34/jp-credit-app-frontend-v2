import { getLoans } from "../../services/loanClient";
import { loansQueryKey } from "../constants";
import type { Loan } from "../../models/loan";
import type { DataTableConfig } from "@/components";

export const loanDataTableConfig: DataTableConfig<Loan> = {
    title: "Préstamos",
    columns: [
        { id: "id", header: "ID", enableSorting: true },
    ],
    cacheKey: [loansQueryKey],
    loader: getLoans
}