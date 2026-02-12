import type { AmortizationPayment } from "./amortizationPayment";

export interface Amortization {
  paymentValue: number;
  totalInterest: 0;
  amortizations: Array<AmortizationPayment>;
}
