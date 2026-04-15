import { buildLinkDataCell, DataTableConfig } from "@/components";
import { BackgroundService } from "../../models/backgroundService";
import { getBackgroundServices } from "../../services/backgroundServiceClient";
import BackgroundServiceConfigurationsTable from "../../components/background-service-configurations-table";

export const backgroundServicesDataTableConfig: DataTableConfig<BackgroundService> = {
    columns: [
        { header: "ID", accessorKey: "id" },
        { header: "NOMBRE", accessorKey: "name" },
        { header: "DESCRIPCIÓN", accessorKey: "shortDescription" },
        {
            header: "OPCIONES", cell: ({ row }) => buildLinkDataCell("Editar", {
                to: "/system/workers/$id/edit",
                params: { id: row.original.id.toString() }
            })
        }
    ],
    allowExpand: true,
    onExpand: (r) => BackgroundServiceConfigurationsTable({ worker: r.original }),
    loader: getBackgroundServices
}