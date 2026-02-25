import { collateralMainPicFallback, collateralTypeTranslations } from "../constants";
import { getCollaterals } from "../../services/collateralClient";
import type { DataTableConfig } from "@/components";
import type { Collateral } from "../../models/collateral";
import { buildDateDataCell, buildExpandableDescriptionCell, buildImageDataCell, buildLinkDataCell } from "@/components";
import { toCurrency } from "@/lib/utils";
import { FileModelMetadata } from "@/models/fileModel";
import { buildLoanLabel } from "@/features/loans";

export const CollateralDataTableColumns: DataTableConfig<Collateral>["columns"] = [
    { accessorKey: "id", header: "ID", enableSorting: true },
    {
        accessorKey: "title", header: "TÍTULO", enableSorting: true, cell: ({ row }) => buildLinkDataCell(
            row.original.title,
            { to: "/collaterals/$id", params: { id: row.original.id.toString() } }
        )
    },
    { id: "loanClientName", accessorKey: "loanClientName", header: "CLIENTE", enableSorting: true },
    {
        accessorKey: "createdAt",
        header: "FECHA",
        enableSorting: true,
        cell: ({ row }) => buildDateDataCell(row.original.createdAt),
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
        cell: ({ row }) => buildLinkDataCell(
            buildLoanLabel({ id: row.original.loanId }),
            {
                to: "/loans/$id", params: { id: row.original.loanId.toString() }
            }),
    },
    {
        header: "FOTO",
        cell: ({ row }) => buildImageDataCell({
            getImage: () => row.original.files.find(el => el.metadata === FileModelMetadata.mainpic),
            fallback: collateralMainPicFallback
        })
    },
]

export const CollateralDataTableConfig: DataTableConfig<Collateral> = {
    title: "Garantías",
    columns: CollateralDataTableColumns,
    allowExpand: true,
    onExpand: (row) => buildExpandableDescriptionCell(row.original.description ?? "Sin descripción"),
    loader: getCollaterals
}