import { Loan } from "@/features/loans";
import { ReportTemplateDefinition } from "../models/reportTemplateDefinition";
import { Collateral } from "@/features/collaterals";
import { Report } from "../models/report";

export const loanTemplateDefinition: Record<keyof Loan, ReportTemplateDefinition> = {
    id: {
        description: "Identificador único del préstamo.",
        fieldType: ""
    },
    projectId: {
        description: "ID del proyecto al que pertenece el préstamo.",
        fieldType: ""
    },
    guarantorId: {
        description: "ID del garante (si existe).",
        fieldType: ""
    },
    loanOfficerId: {
        description: "ID del oficial de crédito asignado.",
        fieldType: ""
    },
    overduePaymentsNumber: {
        description: "Número de pagos vencidos.",
        fieldType: ""
    },
    interestBalance: {
        description: "Saldo de intereses acumulados pendientes.",
        fieldType: ""
    },
    lastTransactionDate: {
        description: "Fecha de la última transacción.",
        fieldType: ""
    },
    outstandingAmount: {
        description: "Monto total pendiente por pagar.",
        fieldType: ""
    },
    client: {
        description: "Objeto con la información completa del cliente.",
        fieldType: ""
    },
    clientProfileId: {
        description: "ID del perfil del cliente.",
        fieldType: ""
    },
    guarantorProfileId: {
        description: "ID del perfil del garante.",
        fieldType: ""
    },
    loanOfficerProfileId: {
        description: "ID del perfil del oficial de crédito.",
        fieldType: ""
    },
    penaltyRate: {
        description: "Tasa de penalización por mora.",
        fieldType: ""
    },
    approvedAmount: {
        description: "Monto aprobado del préstamo.",
        fieldType: ""
    },
    description: {
        description: "Descripción o propósito del préstamo.",
        fieldType: ""
    },
    disbursedAmount: {
        description: "Monto desembolsado al cliente.",
        fieldType: ""
    },
    principalBalance: {
        description: "Saldo de capital pendiente.",
        fieldType: ""
    },
    accruedInterest: {
        description: "Interés acumulado hasta la fecha.",
        fieldType: ""
    },
    annualInterestRate: {
        description: "Tasa de interés anual aplicada.",
        fieldType: ""
    },
    numberOfPayments: {
        description: "Número total de pagos del préstamo.",
        fieldType: ""
    },
    paymentFrequency: {
        description: "Frecuencia de pagos.",
        fieldType: ""
    },
    expirationDate: {
        description: "Fecha de vencimiento del préstamo.",
        fieldType: ""
    },
    latePaymentCredit: {
        description: "Monto abonado por mora.",
        fieldType: ""
    },
    isOverdue: {
        description: "Indica si el préstamo está en mora.",
        fieldType: ""
    },
    lastPaymentDate: {
        description: "Fecha del último pago realizado.",
        fieldType: ""
    },
    effectivePaymentDate: {
        description: "Fecha efectiva del próximo pago.",
        fieldType: ""
    },
    paymentValue: {
        description: "Valor de cada cuota.",
        fieldType: ""
    },
    startDate: {
        description: "Fecha de inicio del préstamo.",
        fieldType: ""
    },
    deliveryDate: {
        description: "Fecha de entrega del dinero.",
        fieldType: ""
    },
    status: {
        description: "Estado actual del préstamo.",
        fieldType: ""
    },
    clientId: {
        description: "ID del cliente asociado.",
        fieldType: ""
    },
    overduePayments: {
        description: "Cantidad de pagos atrasados.",
        fieldType: ""
    },
    delinquency: {
        description: "Porcentaje de morosidad.",
        fieldType: ""
    },
    hasPayments: {
        description: "Indica si el préstamo tiene pagos registrados.",
        fieldType: ""
    },
    createdAt: {
        description: "Fecha en que se creó el registro.",
        fieldType: ""
    },
    updatedAt: {
        description: "Fecha de la última actualización.",
        fieldType: ""
    },
    guarantor: {
        description: "Garante",
        fieldType: ""
    },
    loanOfficer: {
        description: "oficial",
        fieldType: ""
    },
    feePaid: {
        description: "",
        fieldType: ""
    },
    totalFees: {
        description: "",
        fieldType: ""
    },
    isActive: {
        description: "",
        fieldType: ""
    },
    daysOfGrace: {
        description: "",
        fieldType: ""
    }
};

export const collateralTemplateDefinition: Record<keyof Collateral, ReportTemplateDefinition> = {
    id: {
        description: "Identificador único del colateral.",
        fieldType: ""
    },
    title: {
        description: "Título o nombre del colateral.",
        fieldType: ""
    },
    description: {
        description: "Descripción detallada del colateral.",
        fieldType: ""
    },
    value: {
        description: "Valor monetario estimado del colateral.",
        fieldType: ""
    },
    condition: {
        description: "Condición física o legal.",
        fieldType: ""
    },
    createdAt: {
        description: "Fecha en la que se registró el colateral.",
        fieldType: ""
    },
    loanId: {
        description: "ID del préstamo asociado.",
        fieldType: ""
    },
    type: {
        description: "Tipo o clasificación del colateral.",
        fieldType: ""
    },
    location: {
        description: "Ubicación física.",
        fieldType: ""
    },
    expirationDate: {
        description: "Fecha de vencimiento.",
        fieldType: ""
    },
    liquidationDate: {
        description: "Fecha de liquidación o ejecución.",
        fieldType: ""
    },
    files: {
        description: "Archivos o documentos asociados.",
        fieldType: ""
    },
    loanClientName: {
        description: "Nombre del cliente vinculado al préstamo.",
        fieldType: ""
    },
    isActive: {
        description: "",
        fieldType: ""
    },
    updatedAt: {
        description: "",
        fieldType: ""
    },
    soldFor: {
        description: "",
        fieldType: ""
    },
    sellDate: {
        description: "",
        fieldType: ""
    }
};

export const reportTemplatesDefinition: Record<Report["key"], Record<string, ReportTemplateDefinition>> = {
    loan: loanTemplateDefinition,
    collateral: collateralTemplateDefinition
}