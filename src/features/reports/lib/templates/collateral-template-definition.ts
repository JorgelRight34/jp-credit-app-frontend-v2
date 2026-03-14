import { ReportTemplateDefinition } from "../../models/reportTemplateDefinition";
import { formatNumberWithCommas } from "@/lib/utils";
import { collateralTypeMap } from "@/features/collaterals/models/collateralType";
import { CollateralReportModel } from "../../models/collateralReportModel";

export const collateralTemplateDefinition: ReportTemplateDefinition<CollateralReportModel> = [
    {
        name: "id",
        description: "Identificador único del colateral.",
        fieldType: "number",
        mapper: (c) => c.id,
    },
    {
        name: "title",
        description: "Título o nombre del colateral.",
        fieldType: "text",
        mapper: (c) => c.title,
    },
    {
        name: "description",
        description: "Descripción detallada del colateral.",
        fieldType: "text",
        mapper: (c) => c.description,
    },
    {
        name: "value",
        description: "Valor monetario estimado del colateral.",
        fieldType: "number",
        mapper: (c) => formatNumberWithCommas(c.value),
    },
    {
        name: "loanId",
        description: "ID del préstamo asociado.",
        fieldType: "number",
        mapper: (c) => c.loanId,
    },
    {
        name: "type",
        description: "Tipo o clasificación del colateral.",
        fieldType: "text",
        mapper: (c) => collateralTypeMap[c.type],
    },
    {
        name: "location",
        description: "Ubicación física.",
        fieldType: "text",
        mapper: (c) => c.location,
    },
    {
        name: "expirationDate",
        description: "Fecha de vencimiento.",
        fieldType: "date",
        mapper: (c) => c.expirationDate,
    },
];