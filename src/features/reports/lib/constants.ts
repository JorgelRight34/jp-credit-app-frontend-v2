import { Report } from "../models/report";


export const reportTemplateKeysLabels: Record<Report["key"], string> = {
    Loan: "Préstamo",
    Collateral: "Garantía",
    Transaction: "Transacción"
}
