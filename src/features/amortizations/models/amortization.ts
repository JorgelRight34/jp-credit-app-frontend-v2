import type { AmortizationPayment } from "./amortizationPayment";

export interface Amortization {
  paymentValue: number;
  totalInterest: number;
  amortizations: Array<AmortizationPayment>;
}
