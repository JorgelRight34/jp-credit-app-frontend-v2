import { buildLinkDataCell, DataTableConfig } from "@/components";
import { BackgroundService } from "../../models/backgroundService";
import { getBackgroundServices } from "../../services/backgroundServiceClient";

export const backgroundServicesDataTableConfig: DataTableConfig<BackgroundService> = {
    columns: [
        { header: "ID", accessorKey: "id", enableSorting: true, },
        { header: "NOMBRE", accessorKey: "name", enableSorting: true },
        {
            header: "Opciones", cell: ({ row }) => buildLinkDataCell("Editar", {
                to: "/system/workers/$id/edit",
                params: { id: row.original.id.toString() }
            })
        }
    ],
    allowExpand: true,
    onExpand: (r) => JSON.stringify(r.original.configurations, null, 2),
    loader: getBackgroundServices
}