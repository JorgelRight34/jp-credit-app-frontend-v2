import { Query } from "@/components";
import { Compound } from "../../../models/compound";

export interface AmortizationCalculatorInput extends Query {
  principalBalance?: number;
  annualInterestRate?: number;
  paymentFrequency?: number;
  numberOfPayments?: number;
  compound?: Compound;
}
