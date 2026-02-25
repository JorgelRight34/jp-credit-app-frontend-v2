import { toDate } from "@/lib/utils"
import { Loan, LoanPaymentFrequency } from "../models/loan"
import { SelectOptions } from "@/components"
import { getLoanActors } from "../services/loanClient"

export const buildLoanLabel = (loan: { id: number }) => `Préstamo No. ${loan.id}`
export const buildLoanLabelById = (id: number) => `Préstamo No. ${id}`

const MS_PER_DAY = 24 * 60 * 60 * 1000

export const getDaysBetweenPayments = (paymentFrequency: LoanPaymentFrequency): number => {
    switch (paymentFrequency) {
        case 12: // monthly
            return 30
        case 4: // quarterly
            return 90
        case 2: // semiannual
            return 180
        case 1: // annual
            return 365
    }
}

export const calculateNextPaymentDate = (args: {
    principalBalance: number
    startDate: Date | string
    paymentFrequency: LoanPaymentFrequency
    referenceDate?: Date | string
}): Date => {
    const {
        principalBalance,
        startDate,
        paymentFrequency,
        referenceDate = new Date(),
    } = args

    if (principalBalance <= 0) {
        return new Date(8640000000000000)
    }

    const start = toDate(startDate)
    const reference = toDate(referenceDate)

    const daysBetweenPayments = getDaysBetweenPayments(paymentFrequency)

    if (start.getTime() > reference.getTime()) {
        return start
    }

    const elapsedDays = (reference.getTime() - start.getTime()) / MS_PER_DAY
    const periodsPassed = Math.floor(elapsedDays / daysBetweenPayments) + 1

    return new Date(start.getTime() + periodsPassed * daysBetweenPayments * MS_PER_DAY)
}


export const calculateLoanNextPaymentDate = (loan: Loan, referenceDate?: Date | string) => calculateNextPaymentDate({
    principalBalance: loan.principalBalance,
    startDate: loan.startDate,
    paymentFrequency: loan.paymentFrequency,
    referenceDate
})

export const getLoanActorsSelectOptions = async (loanId: Loan["id"]): Promise<SelectOptions> => {
    const { client, guarantor, loanOfficer } = await getLoanActors(loanId);
    const options: SelectOptions = [[client.profileId, `${client.lastName}, ${client.firstName} | Cliente`]];

    if (guarantor) {
        options.push([guarantor.profileId, `${guarantor.lastName}, ${guarantor.firstName} | Garante`])
    }

    if (loanOfficer) {
        options.push([loanOfficer.profileId, `${loanOfficer.firstName} ${loanOfficer.lastName} | Oficial`])
    }

    return options;
}