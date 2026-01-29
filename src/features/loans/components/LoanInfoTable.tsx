import { DateLabel, InfoTable } from '@/components'
import { Loan } from '../models/loan'
import {
  getTimeUnitFromTimesInAYear,
  toCurrency,
  toTitleCase,
} from '@/lib/utils/utils'
import { loanStatusSpanishTranslations } from '../lib/constants'
import { LinkToProfile } from '@/features/profiles'

interface LoanInfoTableProps {
  loan: Loan
}

const LoanInfoTable = ({ loan }: LoanInfoTableProps) => {
  return (
    <InfoTable
      data={[
        // === BASIC LOAN IDENTIFICATION ===
        [
          'Id',
          loan.id?.toString(),
          'Estado',
          toTitleCase(loanStatusSpanishTranslations[loan.status]),
        ],
        [
          'Cliente',
          <LinkToProfile
            key={loan.clientId}
            profile={loan.clientName}
            id={loan.clientProfileId}
          />,
          'Agente',
          loan.loanOfficerName ? (
            <LinkToProfile
              profile={loan.loanOfficerName}
              id={loan.loanOfficerId}
            />
          ) : (
            '---'
          ),
        ],
        // === LOAN TERMS & STRUCTURE ===
        [
          'Monto Aprobado',
          toCurrency(loan.approvedAmount),
          'Desembolsado',
          toCurrency(loan.disbursedAmount),
        ],
        [
          'Tasa de Interés',
          (loan.annualInterestRate * 100).toFixed(2) + '%',
          'N. Pagos',
          loan.numberOfPayments?.toString(),
        ],
        [
          'Frecuencia de Pago',
          getTimeUnitFromTimesInAYear(loan.paymentFrequency),
          'Cuota',
          toCurrency(loan.paymentValue),
        ],

        // === CURRENT FINANCIAL STATUS ===
        [
          'Balance',
          toCurrency(loan.principalBalance),
          'Intereses',
          toCurrency(loan.accruedInterest),
        ],
        [
          'Balance Mora',
          toCurrency(loan.delinquency),
          'Atraso',
          toCurrency(loan.overdue),
        ],

        // === IMPORTANT DATES ===
        [
          'Fecha de Inicio',
          <DateLabel key="startDate" date={loan.startDate?.toString()} />,
          'Entrega',
          <DateLabel key="endDate" date={loan.deliveryDate?.toString()} />,
        ],
        [
          'Último Pago',
          <DateLabel key="lastPaymentDate" date={loan.lastPaymentDate} />,
          'Siguiente Pago',
          <DateLabel
            key="effectivePaymentDate"
            date={loan.effectivePaymentDate}
          />,
        ],
        [
          'Cuotas Atrasadas',
          loan.overduePaymentsNumber,
          'Penalidad',
          loan.penaltyRate,
        ],

        // === GUARANTOR (if exists) ===
        ...(loan.guarantorName
          ? [
              [
                'Garante',
                <LinkToProfile
                  key="guarantor"
                  profile={loan.guarantorName}
                  id={loan.guarantorProfileId}
                />,
              ],
            ]
          : []),
      ]}
    />
  )
}

export default LoanInfoTable
