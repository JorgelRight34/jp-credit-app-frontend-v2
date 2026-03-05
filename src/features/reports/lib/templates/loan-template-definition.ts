import { Loan } from "@/features/loans";
import { ReportTemplateDefinition } from "../../models/reportTemplateDefinition";
import { formatNumberWithCommas, toPercentage } from "@/lib/utils";

export const loanTemplateDefinition:
    ReportTemplateDefinition<Loan>
    = [
        {
            name: "id",
            description: "Identificador único del préstamo.",
            fieldType: "number",
            mapper: (l) => l.id,
        },
        {
            name: "projectId",
            description: "ID del proyecto al que pertenece el préstamo.",
            fieldType: "number",
            mapper: (l) => l.projectId,
        },
        {
            name: "guarantorId",
            description: "ID del garante (si existe).",
            fieldType: "number",
            mapper: (l) => l.guarantorId,
        },
        {
            name: "loanOfficerId",
            description: "ID del oficial de crédito asignado.",
            fieldType: "number",
            mapper: (l) => l.loanOfficerId,
        },
        {
            name: "overduePaymentsNumber",
            description: "Número de pagos vencidos.",
            fieldType: "number",
            mapper: (l) => l.overduePaymentsNumber,
        },
        {
            name: "interestBalance",
            description: "Saldo de intereses acumulados pendientes.",
            fieldType: "currency",
            mapper: (l) => formatNumberWithCommas(l.interestBalance),
        },
        {
            name: "lastTransactionDate",
            description: "Fecha de la última transacción.",
            fieldType: "date",
            mapper: (l) => l.lastTransactionDate,
        },
        {
            name: "outstandingAmount",
            description: "Monto total pendiente por pagar.",
            fieldType: "currency",
            mapper: (l) => formatNumberWithCommas(l.outstandingAmount),
        },
        {
            name: "clientFirstName",
            description: "Objeto con la información completa del cliente.",
            fieldType: "text",
            mapper: (l) => l.client.firstName,
        },
        {
            name: "clientLastName",
            description: "Apellidos del cliente",
            fieldType: "text",
            mapper: (l) => l.client.lastName,
        },
        {
            name: "clientProfileId",
            description: "ID del perfil del cliente.",
            fieldType: "number",
            mapper: (l) => l.client.profileId,
        },
        {
            name: "guarantorFirstName",
            description: "Nombre del garante",
            fieldType: "text",
            mapper: (l) => l.guarantor?.firstName,
        },
        {
            name: "guarantorLastName",
            description: "Apellidos del garante",
            fieldType: "text",
            mapper: (l) => l.client.lastName,
        },
        {
            name: "guarantorProfileId",
            description: "ID del perfil del garante.",
            fieldType: "number",
            mapper: (l) => l.guarantor?.profileId,
        },
        {
            name: "loanOfficerFirstName",
            description: "Nombres del oficial.",
            fieldType: "text",
            mapper: (l) => l.loanOfficer?.firstName,
        },
        {
            name: "loanOfficeLastName",
            description: "Apellidos del oficial.",
            fieldType: "text",
            mapper: (l) => l.loanOfficer?.lastName,
        },
        {
            name: "loanOfficerProfileId",
            description: "ID del perfil del oficial de crédito.",
            fieldType: "number",
            mapper: (l) => l.loanOfficer?.profileId,
        },
        {
            name: "penaltyRatePercentage",
            description: "Tasa de penalización por mora.",
            fieldType: "number",
            mapper: (l) => toPercentage(l.penaltyRate),
        },
        {
            name: "approvedAmount",
            description: "Monto aprobado del préstamo.",
            fieldType: "number",
            mapper: (l) => formatNumberWithCommas(l.approvedAmount),
        },
        {
            name: "disbursedAmount",
            description: "Monto desembolsado al cliente.",
            fieldType: "number",
            mapper: (l) => formatNumberWithCommas(l.approvedAmount),
        },
        {
            name: "principalBalance",
            description: "Saldo de capital pendiente.",
            fieldType: "number",
            mapper: (l) => formatNumberWithCommas(l.principalBalance),
        },
        {
            name: "accruedInterest",
            description: "Interés acumulado hasta la fecha.",
            fieldType: "number",
            mapper: (l) => formatNumberWithCommas(l.accruedInterest),
        },
        {
            name: "annualInterestRate",
            description: "Tasa de interés anual aplicada.",
            fieldType: "number",
            mapper: (l) => l.annualInterestRate,
        },
        {
            name: "numberOfPayments",
            description: "Número total de pagos del préstamo.",
            fieldType: "number",
            mapper: (l) => l.numberOfPayments,
        },
    ];