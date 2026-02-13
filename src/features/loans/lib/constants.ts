import { SelectOptions } from "@/components";
import { LoanStatus, LoanStatusMap } from "../models/loanStatus";
import { LoanPaymentFrequency } from "../models/loan";

export const loansQueryKey = "loans"

export const loanStatusSpanishTranslations: Record<LoanStatus, string> = {
    [LoanStatusMap.active]: "activo",
    [LoanStatusMap.overdue]: "atrasado",
    [LoanStatusMap.agreement]: "convenio",
    [LoanStatusMap.judicial]: "judicial",
    [LoanStatusMap.legal]: "legal",
    [LoanStatusMap.punished]: "castigado",
    [LoanStatusMap.settled]: "liquidado",
    [LoanStatusMap.paidOff]: "pagado",
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