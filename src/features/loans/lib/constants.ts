import { SelectOptions } from "@/components";
import { LoanStatus, LoanStatusMap } from "../models/loanStatus";

export const loansQueryKey = "loans"

export const loanStatusSpanishTranslations: Record<LoanStatus, string> = {
    [LoanStatusMap.Active]: "activo",
    [LoanStatusMap.Overdue]: "atrasado",
    [LoanStatusMap.Agreement]: "convenio",
    [LoanStatusMap.Judicial]: "judicial",
    [LoanStatusMap.Legal]: "legal",
    [LoanStatusMap.Punished]: "castigado",
    [LoanStatusMap.Settled]: "liquidado",
    [LoanStatusMap.PaidOff]: "pagado",
};

export const loanPaymentFrequencySymbols: Record<number, string> = {
    12: "M",
    6: "S",
    1: "Y"
}


export const loanStatusSelectOptions: SelectOptions = Object.entries(loanStatusSpanishTranslations)
export const loanPaymentFrequencySelectOptions: SelectOptions = [
    [12, "Mensual"],
    [1, "Anual"],
    [4, "Trimestral"],
    [2, "Semestral"],
];

export const loansRootPath = "loans"