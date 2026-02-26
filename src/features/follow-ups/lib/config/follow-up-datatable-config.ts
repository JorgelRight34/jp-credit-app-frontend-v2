import { buildDateDataCell, buildExpandableDescriptionCell, buildLinkDataCell, DataTableConfig } from "@/components";
import { FollowUp } from "../../models/followUp";
import { getFollowUps } from "../../services/followUpClient";
import { buildProfileFullName } from "@/features/profiles";
import { buildLoanLabelById } from "@/features/loans";

export const followUpDataTableConfig: DataTableConfig<FollowUp> = {
    title: "Seguimientos",
    columns: [
        {
            id: "id",
            accessorKey: "id",
            header: "ID",
            enableSorting: true,
        },
        {
            id: "title",
            accessorKey: "title",
            header: "TITULO",
            cell: ({ row }) => buildLinkDataCell(row.original.title, {
                to: "/follow-ups/$id",
                params: { id: row.original.id.toString() }
            }),
            enableSorting: true
        },
        {
            id: "client",
            accessorFn: (row) => row.client.firstName,
            header: "CLIENTE",
            cell: ({ row }) => buildProfileFullName(row.original.client),
            enableSorting: true
        },
        {
            id: "loanId",
            accessorKey: "loanId",
            header: "PRESTAMO",
            cell: ({ row }) => buildLoanLabelById(row.original.id)
        },
        {
            id: "date",
            accessorKey: "date",
            header: "FECHA",
            cell: ({ row }) => buildDateDataCell(row.original.date)
        }
    ],
    allowExpand: true,
    onExpand: (row) => buildExpandableDescriptionCell(row.original.body),
    loader: getFollowUps
}