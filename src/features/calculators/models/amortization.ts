import { AmortizationPayment } from "./amortizationPayment";

export interface Amortization {
  paymentValue: number;
  amortizations: AmortizationPayment[];
}
