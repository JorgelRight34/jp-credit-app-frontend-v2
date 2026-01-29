import { Query } from "../../../models/query";
import { Compound } from "./compound";

export interface AmortizationCalculatorInput extends Query {
  principalBalance?: number;
  annualInterestRate?: number;
  paymentFrequency?: number;
  numberOfPayments?: number;
  compound?: Compound;
}
