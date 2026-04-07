import { ReportTemplateDefinition } from "../../models/reportTemplateDefinition";
import { TransactionReportModel } from "../../models/transactionReportModel";

export const transactionTemplateDefinition: ReportTemplateDefinition<TransactionReportModel> = {
    title: "TRANSACCIONES",
    definitions: [
        {
            name: "id",
            description: "Identificador único de la transacción.",
            fieldType: "number",
            mapper: (t) => t.id,
        },
        {
            name: "loanId",
            description: "ID del préstamo asociado a la transacción.",
            fieldType: "number",
            mapper: (t) => t.loanId,
        },
        {
            name: "clientId",
            description: "ID del cliente asociado a la transacción.",
            fieldType: "number",
            mapper: (t) => t.clientId,
        },
        {
            name: "date",
            description: "Fecha en que se realizó la transacción.",
            fieldType: "date",
            mapper: (t) => t.date,
        },
        {
            name: "value",
            description: "Valor total de la transacción.",
            fieldType: "currency",
            mapper: (t) => t.value,
        },
        {
            name: "capitalValue",
            description: "Porción del pago aplicada al capital.",
            fieldType: "currency",
            mapper: (t) => t.capitalValue,
        },
        {
            name: "interestValue",
            description: "Porción del pago aplicada a intereses.",
            fieldType: "currency",
            mapper: (t) => t.interestValue,
        },
        {
            name: "penaltyFee",
            description: "Cargo por mora aplicado en la transacción.",
            fieldType: "currency",
            mapper: (t) => t.penaltyFee,
        },
        {
            name: "feePaid",
            description: "Cuota pagada en la transacción.",
            fieldType: "currency",
            mapper: (t) => t.feePaid,
        },
        {
            name: "arrearBalance",
            description: "Saldo pendiente tras la transacción.",
            fieldType: "currency",
            mapper: (t) => t.arrearBalance,
        },
        {
            name: "lateDays",
            description: "Número de días de atraso al momento de la transacción.",
            fieldType: "number",
            mapper: (t) => t.lateDays,
        },
        {
            name: "description",
            description: "Descripción o nota de la transacción.",
            fieldType: "text",
            mapper: (t) => t.description,
        },
        {
            name: "type",
            description: "Tipo de transacción.",
            fieldType: "text",
            mapper: (t) => t.type,
        },
        {
            name: "isClosed",
            description: "Indica si la transacción cerró el préstamo.",
            fieldType: "text",
            mapper: (t) => t.isClosed ? "Sí" : "No",
        },
        {
            name: "createdByUsername",
            description: "Usuario que registró la transacción.",
            fieldType: "text",
            mapper: (t) => t.createdByUsername,
        },
        {
            name: "clientFirstName",
            description: "Nombres del cliente.",
            fieldType: "text",
            mapper: (t) => t.client.firstName,
        },
        {
            name: "clientLastName",
            description: "Apellidos del cliente.",
            fieldType: "text",
            mapper: (t) => t.client.lastName,
        },
        {
            name: "clientProfileId",
            description: "ID del perfil del cliente.",
            fieldType: "number",
            mapper: (t) => t.client.profileId,
        },
    ]
};