import { CacheKey } from "@/models";
import { LoanStatus } from "../models/loanStatus";
import { PERMISSIONS_ENDPOINT_SUFFIX } from "@/utils/constants";

export const loansQueryKey: CacheKey = ["loans"];
export const loansTag = "loans"

export const loanStatusSpanishTranslations: Record<LoanStatus, string> = {
  [LoanStatus.Active]: "activo",
  [LoanStatus.Overdue]: "atrasado",
  [LoanStatus.Agreement]: "convenio",
  [LoanStatus.Judicial]: "judicial",
  [LoanStatus.Legal]: "legal",
  [LoanStatus.Punished]: "castigado",
  [LoanStatus.Settled]: "liquidado",
  [LoanStatus.PaidOff]: "pagado",
};

export const loanPaymentFrequencySymbols: Record<number, string> = {
  12: "M",
  6: "S",
  1: "Y"
}

export const loanStatusSelectOptions = Object.entries(loanStatusSpanishTranslations)


export const loanModulePermissionsEndpoint = "loans" + PERMISSIONS_ENDPOINT_SUFFIX

export const loansRootPath = "loans"