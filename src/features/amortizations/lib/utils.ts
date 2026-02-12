/*
import { Amortization } from "../models/amortization";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";

export const calculateAmortization = ({
    principalBalance,
    annualInterestRate,
    paymentFrequency,
    numberOfPayments,
}: AmortizationCalculatorInput): Amortization => {

}
*/

import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";

export const validateAmortizationInput = ({
    principalBalance,
    annualInterestRate,
    paymentFrequency,
    numberOfPayments,
}: AmortizationCalculatorInput) => {
    return (
        paymentFrequency !== undefined && paymentFrequency > 0 &&
        numberOfPayments !== undefined && numberOfPayments > 0 &&
        annualInterestRate !== undefined && annualInterestRate > 0 &&
        principalBalance !== undefined && principalBalance > 0
    )
}