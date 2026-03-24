import { CheckCircleIcon, GavelIcon, IconName, PauseCircleIcon, ScheduleIcon, SelectOptions } from "@/components";
import { LoanStatus, LoanStatusMap } from "../models/loanStatus";
import { LoanPaymentFrequency } from "../models/loan";

export const loanStatusSpanishTranslations: Record<LoanStatus, string> = {
    [LoanStatusMap.active]: "Activo",
    [LoanStatusMap.inactive]: "Inactivo",
    [LoanStatusMap.expired]: "Vencido",
    [LoanStatusMap.punished]: "Castigado",
};

export const loanPaymentFrequencySymbols: Record<number, string> = {
    12: "M",
    6: "S",
    1: "Y"
}


export const loanPaymentFrequencyStringMap: Record<LoanPaymentFrequency, string> = {
    12: "Mensual",
    1: "Anual",
    4: "Trimestral",
    2: "Semestral",
}

export const loanStatusSelectOptions: SelectOptions = Object.entries(loanStatusSpanishTranslations)
export const loanPaymentFrequencySelectOptions: SelectOptions = [
    [12, "Mensual"],
    [1, "Anual"],
    [4, "Trimestral"],
    [2, "Semestral"],
];

export const loansRootPath = "loans"

export const LOAN_STATUS_CARD_OPTIONS: Array<{
    status: LoanStatus
    title: string
    icon: IconName
    description: string
}> = [
        {
            status: LoanStatusMap.active,
            title: "Activo",
            icon: CheckCircleIcon,
            description:
                "El préstamo se encuentra vigente y en cumplimiento conforme al cronograma de pagos establecido.",
        },
        {
            status: LoanStatusMap.inactive,
            title: "Inactivo",
            icon: PauseCircleIcon,
            description:
                "El préstamo no se encuentra actualmente en ejecución. Puede estar suspendido, en espera o sin desembolso activo.",
        },
        {
            status: LoanStatusMap.punished,
            title: "Castigado",
            icon: GavelIcon,
            description:
                "El préstamo ha sido castigado contablemente por incobrabilidad estimada, aunque pueden mantenerse acciones de recuperación.",
        },
        {
            status: LoanStatusMap.expired,
            title: "Expirado",
            icon: ScheduleIcon,
            description:
                "El préstamo ha alcanzado su fecha límite sin haber sido completado o regularizado dentro del período establecido.",
        },
    ]
