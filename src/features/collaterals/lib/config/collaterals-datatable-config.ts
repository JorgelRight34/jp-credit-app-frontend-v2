import { collateralMainPicFallback, collateralTypeTranslations } from "../constants";
import { getCollaterals } from "../../services/collateralClient";
import type { DataTableConfig } from "@/components";
import type { Collateral } from "../../models/collateral";
import { createDateDataCell, createImageDataCell, createLinkDataCell } from "@/components";
import { toCurrency } from "@/lib/utils";
import { FileModelMetadata } from "@/models/fileModel";
import { getLoanLabel } from "@/features/loans";

export const collateralsDataTableColumns: DataTableConfig<Collateral>["columns"] = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    {
        accessorKey: "title", header: "TÍTULO", enableSorting: true, cell: ({ row }) => createLinkDataCell(
            row.original.title,
            { to: "/collaterals/$id", params: { id: row.original.id.toString() } }
        )
    },
    { id: "loanClientName", accessorKey: "loanClientName", header: "CLIENTE", enableSorting: true },
    {
        accessorKey: "createdAt",
        header: "FECHA",
        enableSorting: true,
        cell: ({ row }) => createDateDataCell(row.original.createdAt),
    },
    {
        accessorKey: "value",
        header: "VALOR",
        enableSorting: true,
        cell: ({ row }) => toCurrency(row.original.value),
    },
    {
        accessorKey: "type",
        header: "TIPO",
        enableSorting: true,
        cell: ({ row }) => collateralTypeTranslations[row.original.type]
    },
    {
        accessorKey: "loanId",
        header: "PRÉSTAMO",
        enableSorting: true,
        cell: ({ row }) => createLinkDataCell(getLoanLabel({ id: row.original.loanId }), {}),
    },
    {
        header: "FOTO",
        cell: ({ row }) => createImageDataCell({
            getImage: () => row.original.files.find(el => el.metadata === FileModelMetadata.mainpic),
            fallback: collateralMainPicFallback
        })
    },
]

export const collateralsDataTableConfig: DataTableConfig<Collateral> = {
    title: "Garantías",
    columns: collateralsDataTableColumns,
    loader: getCollaterals
}