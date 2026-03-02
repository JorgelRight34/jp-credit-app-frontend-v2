import { CurrencyInput, NumericInput, PaymentFrequencySelect, PercentageInput, SearchFormConfig } from "@/components";
import { AmortizationCalculatorInput } from "../../models/amortizationCalculatorInput";

export const amortizationSearchConfig: SearchFormConfig<AmortizationCalculatorInput> = {
    options: [
        {
            name: "principalBalance",
            label: "Balance capital",
            width: 3,
            type: p => CurrencyInput(p)
        },
        {
            name: "annualInterestRate",
            label: "Tasa de interés anual",
            width: 3,
            type: p => PercentageInput(p)
        },
        {
            name: "paymentFrequency",
            label: "Frecuencia de pago",
            width: 3,
            type: p => PaymentFrequencySelect(p)
        },
        {
            name: "numberOfPayments",
            label: "N. Pagos",
            width: 3,
            type: p => NumericInput(p)
        },
    ],
    advanced: [
        {
            name: "compound",
            label: "Capitalización",
            width: 12,
            type: p => NumericInput(p)
        }
    ],
}