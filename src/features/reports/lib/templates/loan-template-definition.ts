import { ReportTemplateDefinition } from "../../models/reportTemplateDefinition";
import { LoanReportModel } from "../../models/loanReportModel";

export const loanTemplateDefinition:
    ReportTemplateDefinition<LoanReportModel>
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
            mapper: (l) => l.interestBalance,
        },
        {
            name: "lastTransactionDate",
            description: "Fecha de la última transacción.",
            fieldType: "date",
            mapper: (l) => l.lastTransactionDate,
        },
        {
            name: "arrearBalance",
            description: "Monto total pendiente por pagar.",
            fieldType: "currency",
            mapper: (l) => l.arrearBalance,
        },
        {
            name: "clientFirstName",
            description: "Objeto con la información completa del cliente.",
            fieldType: "text",
            mapper: (l) => l.clientProfile.firstName,
        },
        {
            name: "clientLastName",
            description: "Apellidos del cliente",
            fieldType: "text",
            mapper: (l) => l.clientProfile.lastName,
        },
        {
            name: "clientAddress",
            description: "Dirección del cliente",
            fieldType: "text",
            mapper: (l) => l.clientProfile.address,
        },
        {
            name: "clientDni",
            description: "Cédula del cliente",
            fieldType: "text",
            mapper: (l) => l.clientProfile.dni,
        },
        {
            name: "clientProfileId",
            description: "ID del perfil del cliente.",
            fieldType: "number",
            mapper: (l) => l.clientProfile.profileId,
        },
        {
            name: "guarantorFirstName",
            description: "Nombre del garante",
            fieldType: "text",
            mapper: (l) => l.guarantorProfile?.firstName,
        },
        {
            name: "guarantorLastName",
            description: "Apellidos del garante",
            fieldType: "text",
            mapper: (l) => l.guarantorProfile?.lastName,
        },
        {
            name: "guarantorDni",
            description: "Cédula del garante",
            fieldType: "text",
            mapper: (l) => l.guarantorProfile.dni,
        },
        {
            name: "guarantorAddress",
            description: "Dirección del garante",
            fieldType: "text",
            mapper: (l) => l.guarantorProfile?.address,
        },
        {
            name: "guarantorProfileId",
            description: "ID del perfil del garante.",
            fieldType: "number",
            mapper: (l) => l.guarantorProfile?.profileId,
        },
        {
            name: "loanOfficerFirstName",
            description: "Nombres del oficial.",
            fieldType: "text",
            mapper: (l) => l.loanOfficerProfile?.firstName,
        },
        {
            name: "loanOfficeLastName",
            description: "Apellidos del oficial.",
            fieldType: "text",
            mapper: (l) => l.loanOfficerProfile?.lastName,
        },
        {
            name: "loanOfficerAddress",
            description: "Dirección del garante",
            fieldType: "text",
            mapper: (l) => l.loanOfficerProfile?.address,
        },
        {
            name: "loanOfficerDni",
            description: "Cédula del oficial",
            fieldType: "text",
            mapper: (l) => l.guarantorProfile.dni,
        },
        {
            name: "loanOfficerProfileId",
            description: "ID del perfil del oficial de crédito.",
            fieldType: "number",
            mapper: (l) => l.loanOfficerProfile?.profileId,
        },
        {
            name: "penaltyRate",
            description: "Tasa de penalización por mora.",
            fieldType: "number",
            mapper: (l) => l.penaltyRate,
        },
        {
            name: "approvedAmount",
            description: "Monto aprobado del préstamo.",
            fieldType: "number",
            mapper: (l) => l.approvedAmount,
        },
        {
            name: "disbursedAmount",
            description: "Monto desembolsado al cliente.",
            fieldType: "number",
            mapper: (l) => l.approvedAmount,
        },
        {
            name: "principalBalance",
            description: "Saldo de capital pendiente.",
            fieldType: "number",
            mapper: (l) => l.principalBalance,
        },
        {
            name: "accruedInterest",
            description: "Interés acumulado hasta la fecha.",
            fieldType: "number",
            mapper: (l) => l.accruedInterest,
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
        {
            name: "startDate",
            description: "Fecha de inicio",
            fieldType: "date",
            mapper: l => l.startDate
        },
        {
            name: "paymentValue",
            description: "Cuota",
            fieldType: "number",
            mapper: l => l.paymentValue
        },
        {
            name: "paymentFrequency",
            description: "Frecuencia de pago",
            fieldType: "text",
            mapper: l => {
                switch (l.paymentFrequency) {
                    case 12:
                        return "mes"
                    case 1:
                        return "año"
                }
            }
        }
    ];
