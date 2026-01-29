

// ────────────────────────────────
// Entity-specific context metadata

import { FormField } from "@/components";
import { Collateral, collateralClient } from "@/features/collaterals";
import { Loan, loanClient } from "@/features/loans";
import { ReportKey } from "../models/reportKey";
import { profilesClient } from "@/features/profiles";
import { transactionClient } from "@/features/transactions";
import { adjustmentNoteClient } from "@/features/adjustment-notes";

// ────────────────────────────────
const loanContextDetails: Record<keyof Loan, { description: string }> = {
    id: { description: "Identificador único del préstamo." },
    projectId: { description: "ID del proyecto al que pertenece el préstamo." },
    guarantorId: { description: "ID del garante (si existe)." },
    loanOfficerId: { description: "ID del oficial de crédito asignado." },
    overduePaymentsNumber: { description: "Número de pagos vencidos." },
    clientName: { description: "Nombre del cliente." },
    loanOfficerName: { description: "Nombre del oficial de crédito." },
    guarantorName: { description: "Nombre del garante." },
    interestBalance: { description: "Saldo de intereses acumulados pendientes." },
    lastTransactionDate: { description: "Fecha de la última transacción." },
    totalFeePaid: { description: "Total de comisiones o cargos pagados." },
    outstandingAmount: { description: "Monto total pendiente por pagar." },
    client: { description: "Objeto con la información completa del cliente." },
    clientProfileId: { description: "ID del perfil del cliente." },
    guarantorProfileId: { description: "ID del perfil del garante." },
    loanOfficerProfileId: { description: "ID del perfil del oficial de crédito." },
    penaltyRate: { description: "Tasa de penalización por mora." },
    approvedAmount: { description: "Monto aprobado del préstamo." },
    description: { description: "Descripción o propósito del préstamo." },
    disbursedAmount: { description: "Monto desembolsado al cliente." },
    principalBalance: { description: "Saldo de capital pendiente." },
    accruedInterest: { description: "Interés acumulado hasta la fecha." },
    annualInterestRate: { description: "Tasa de interés anual aplicada." },
    numberOfPayments: { description: "Número total de pagos del préstamo." },
    paymentFrequency: { description: "Frecuencia de pagos." },
    overdue: { description: "Monto total vencido." },
    expirationDate: { description: "Fecha de vencimiento del préstamo." },
    latePaymentCredit: { description: "Monto abonado por mora." },
    accruedCapital: { description: "Capital acumulado." },
    isOverdue: { description: "Indica si el préstamo está en mora." },
    lastPaymentDate: { description: "Fecha del último pago realizado." },
    effectivePaymentDate: { description: "Fecha efectiva del próximo pago." },
    paymentValue: { description: "Valor de cada cuota." },
    startDate: { description: "Fecha de inicio del préstamo." },
    deliveryDate: { description: "Fecha de entrega del dinero." },
    status: { description: "Estado actual del préstamo." },
    clientId: { description: "ID del cliente asociado." },
    transactions: { description: "Transacciones relacionadas." },
    overduePayments: { description: "Cantidad de pagos atrasados." },
    delinquency: { description: "Porcentaje de morosidad." },
    hasPayments: { description: "Indica si el préstamo tiene pagos registrados." },
    createdAt: { description: "Fecha en que se creó el registro." },
    updatedAt: { description: "Fecha de la última actualización." },
    guarantor: { description: "Garante" },
    loanOfficer: { description: "oficial" }
};

const collateralContextDetails: Record<keyof Collateral, { description: string }> = {
    id: { description: "Identificador único del colateral." },
    title: { description: "Título o nombre del colateral." },
    description: { description: "Descripción detallada del colateral." },
    value: { description: "Valor monetario estimado del colateral." },
    documentUrl: { description: "URL del documento asociado." },
    ownerId: { description: "ID del propietario del colateral." },
    condition: { description: "Condición física o legal." },
    createdAt: { description: "Fecha en la que se registró el colateral." },
    status: { description: "Estado actual del colateral." },
    ownerName: { description: "Nombre del propietario del colateral." },
    loanId: { description: "ID del préstamo asociado." },
    photos: { description: "Lista de fotografías." },
    type: { description: "Tipo o clasificación del colateral." },
    location: { description: "Ubicación física." },
    expirationDate: { description: "Fecha de vencimiento." },
    liquidationDate: { description: "Fecha de liquidación o ejecución." },
    files: { description: "Archivos o documentos asociados." },
    loanClientName: { description: "Nombre del cliente vinculado al préstamo." },
    loan: { description: "Prestamo" },
    owner: { description: "Dueno" }
};


export interface ReportContextDefinition {
    label: FormField<object>["type"];
    inputType: FormField<Report>["type"];
    fetcher: (id: number) => Promise<object>;
    fields?: Record<string, { description: string }>;
}

export const reportContextRegistry: Record<ReportKey, ReportContextDefinition> = {
    loan: {
        label: "Préstamo",
        inputType: "loan",
        fetcher: async (id: number) => {
            const loan = await loanClient.getLoan(id);
            const [client, guarantor, loanOfficer] = await Promise.all([
                profilesClient.getProfile(loan.clientProfileId),
                loan.guarantorProfileId ? profilesClient.getProfile(loan.guarantorProfileId) : undefined,
                loan.loanOfficerProfileId ? profilesClient.getProfile(loan.loanOfficerProfileId) : undefined
            ])

            loan.client = { profile: client, profileId: loan.clientProfileId, id: loan.clientId };

            if (guarantor) {
                loan.guarantor = { profile: guarantor, profileId: loan.guarantorProfileId!, id: loan.guarantorId! }
            }

            if (loanOfficer) {
                loan.loanOfficer = { profile: loanOfficer, profileId: loan.loanOfficerId!, id: loan.loanOfficerId! }
            }


            return loan;
        },
        fields: loanContextDetails,
    },
    profile: {
        label: "Perfil",
        inputType: "profile",
        fetcher: profilesClient.getProfile,
    },
    transaction: {
        label: "Transacción",
        inputType: "transaction",
        fetcher: transactionClient.getTransaction,
    },
    collateral: {
        label: "Garantía",
        inputType: "collateral",
        fetcher: collateralClient.getCollateral,
        fields: collateralContextDetails,
    },
    note: {
        label: "Nota de ajuste",
        inputType: "note",
        fetcher: adjustmentNoteClient.getNote,
    },
};

// ────────────────────────────────
// Derived helpers (optional)
// ────────────────────────────────
export const getReportFetcher = (key: ReportKey) =>
    reportContextRegistry[key].fetcher;

export const getReportInputType = (key: ReportKey) =>
    reportContextRegistry[key].inputType;

export const getReportLabel = (key: ReportKey) => reportContextRegistry[key].label

export const getReportContextDetails = (key: ReportKey) =>
    reportContextRegistry[key].fields;
