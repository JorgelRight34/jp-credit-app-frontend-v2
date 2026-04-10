import { buildLinkDataCell, BuildSearchInputDataTableConfigHandler, buildSingleSelectCell, DataTableConfig } from "@/components";
import { LoanPurpose } from "../../models/loanPurpose";
import { getLoanPurposes } from "../../services/loanClient";

export const loanPurposeDataTableConfig: DataTableConfig<LoanPurpose> = {
    columns: [
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "name", header: "DESTINO", enableSorting: true },
        {
            header: "OPCIONES", cell: ({ row }) => buildLinkDataCell("Editar", {
                to: "/loans/purposes/$id/edit",
                params: { id: row.original.id.toString() }
            })
        }
    ],
    loader: getLoanPurposes
}

export const buildLoanPurposeSearchInputDataTableConfig: BuildSearchInputDataTableConfigHandler<LoanPurpose> = (setValue) => ({
    columns: [
        { accessorKey: "id", header: "ID", enableSorting: true },
        { accessorKey: "name", header: "DESTINO", enableSorting: true },
        { id: "select", header: "OPCIONES", cell: ({ row }) => buildSingleSelectCell(() => setValue(row.original)) }
    ],
    loader: getLoanPurposes
})