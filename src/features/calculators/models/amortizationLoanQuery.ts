import { AmortizationCalculatorInput } from "./amortizationCalculatorInput";

export interface AmortizationLoanQuery extends AmortizationCalculatorInput {
  loanId?: number;
}
