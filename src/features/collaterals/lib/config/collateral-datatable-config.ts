import { collateralMainPicFallback, collateralTypeTranslations } from "../constants";
import { getCollaterals } from "../../services/collateralClient";
import type { BuildSearchInputDataTableConfigHandler, DataTableConfig } from "@/components";
import type { Collateral } from "../../models/collateral";
import { buildDateDataCell, buildExpandableDescriptionCell, buildImageDataCell, buildLinkDataCell, buildSingleSelectCell } from "@/components";
import { toCurrency } from "@/lib/utils";
import { FileModelMetadata } from "@/models/fileModel";
import { buildLoanLabelById } from "@/features/loans";

export const collateralDataTableConfig: DataTableConfig<Collateral> = {
    columns: [
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
            cell: ({ row }) => buildLinkDataCell(buildLoanLabelById(row.original.loanId), {
                to: "/loans/$id",
                params: { id: row.original.loanId.toString() }
            }),
        },
        {
            header: "FOTO",
            cell: ({ row }) => buildImageDataCell({
                getImage: () => row.original.files.find(el => el.metadata === FileModelMetadata.mainpic),
                fallback: collateralMainPicFallback
            })
        },
    ],
    allowExpand: true,
    onExpand: (row) => buildExpandableDescriptionCell(row.original.description ?? "Sin descripción"),
    loader: getCollaterals
}

export const buildCollateralSearchInputDataTableConfig: BuildSearchInputDataTableConfigHandler<Collateral> = (setValue) => ({
    columns: [{ accessorKey: "id", header: "ID", enableSorting: true },
    {
        accessorKey: "title", header: "TÍTULO", enableSorting: true
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
        cell: ({ row }) => buildLoanLabelById(row.original.loanId)
    },
    { id: "select", header: "OPCIONES", cell: ({ row }) => buildSingleSelectCell(() => setValue(row.original)) }],
    loader: getCollaterals
})