import { buildDateDataCell, buildExpandableDescriptionCell, buildLinkDataCell, DataTableConfig } from "@/components";
import { AdjustmentNote } from "../../models/adjustmentNote";
import { buildAdjustmentNoteLabel } from "../utils";
import { toCurrency } from "@/lib/utils";
import { buildLoanLabelById } from "@/features/loans";
import { getAdjustmentNotes } from "../../services/adjustmentNoteClient";
import { buildProfileFullName } from "@/features/profiles";

export const adjustmentNoteDatatableConfig: DataTableConfig<AdjustmentNote> = {
    title: "Notas de Ajuste",
    columns: [
        {
            id: "id",
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => buildLinkDataCell(buildAdjustmentNoteLabel(row.original), {
                to: "/adjustment-notes/$id",
                params: { id: row.original.id.toString() }
            }),
            enableSorting: true
        },
        {
            id: "client",
            accessorFn: row => row.client.firstName,
            header: "CLIENTE",
            cell: ({ row }) => buildLinkDataCell(buildProfileFullName(row.original.client), {
                to: "/profiles/$id",
                params: { id: row.original.client.profileId.toString() }
            })
        },
        {
            accessorKey: "amount",
            header: "MONTO",
            cell: ({ row }) => toCurrency(row.original.amount),
            enableSorting: true
        },
        {
            id: "loanId",
            accessorKey: "loanId",
            header: "PRESTAMO",
            cell: ({ row }) => buildLinkDataCell(buildLoanLabelById(row.original.loanId), {}),
            enableSorting: true
        },
        {
            accessorKey: "date",
            header: "FECHA",
            cell: ({ row }) => buildDateDataCell(row.original.date)
        }
    ],
    allowExpand: true,
    onExpand: (row) => buildExpandableDescriptionCell(row.original.description ?? "Sin descripción"),
    loader: getAdjustmentNotes
}