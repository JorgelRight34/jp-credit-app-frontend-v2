import InfoTable from "../../../components/DataTable/components/InfoTable";
import LinkToProfile from "../../Profiles/components/LinkToProfile";
import { Loan } from "../models/loan";
import {
  toCurrency,
  toTitleCase,
  getTimeUnitFromTimesInAYear,
} from "../../../utils/utils";
import DateLabel from "../../../components/ui/DateLabel";
import { loanStatusSpanishTranslations } from "../lib/constants";

interface LoanInfoTableProps {
  loan: Loan;
}

const LoanInfoTable = ({ loan }: LoanInfoTableProps) => {
  return (
    <InfoTable
      data={[
        // === BASIC LOAN IDENTIFICATION ===
        [
          "Id",
          loan.id?.toString(),
          "Estado",
          toTitleCase(loanStatusSpanishTranslations[loan.status]),
        ],
        [
          "Cliente",
          <LinkToProfile profile={loan.clientName} id={loan.clientProfileId} />,
          "Agente",
          loan.loanOfficerName ? (
            <LinkToProfile
              profile={loan.loanOfficerName}
              id={loan.loanOfficerId}
            />
          ) : (
            "---"
          ),
        ],

        // === LOAN TERMS & STRUCTURE ===
        [
          "Monto Aprobado",
          toCurrency(loan.approvedAmount),
          "Desembolsado",
          toCurrency(loan.disbursedAmount),
        ],
        [
          "Tasa de Interés",
          (loan.annualInterestRate * 100).toFixed(2) + "%",
          "N. Pagos",
          loan.numberOfPayments?.toString(),
        ],
        [
          "Frecuencia de Pago",
          getTimeUnitFromTimesInAYear(loan.paymentFrequency),
          "Cuota",
          toCurrency(loan.paymentValue),
        ],

        // === CURRENT FINANCIAL STATUS ===
        [
          "Balance",
          toCurrency(loan.principalBalance),
          "Intereses",
          toCurrency(loan.accruedInterest),
        ],
        [
          "Balance Mora",
          toCurrency(loan.delinquency),
          "Atraso",
          toCurrency(loan.overdue),
        ],

        // === IMPORTANT DATES ===
        [
          "Fecha de Inicio",
          <DateLabel date={loan.startDate?.toString()} />,
          "Entrega",
          <DateLabel date={loan.deliveryDate?.toString()} />,
        ],
        [
          "Último Pago",
          <DateLabel date={loan.lastPaymentDate} />,
          "Siguiente Pago",
          <DateLabel date={loan.effectivePaymentDate} />,
        ],
        [
          "Cuotas Atrasadas",
          loan.overduePaymentsNumber,
          "Penalidad",
          loan.penaltyRate,
        ],

        // === GUARANTOR (if exists) ===
        ...(loan.guarantorName
          ? [
              [
                "Garante",
                <LinkToProfile
                  profile={loan.guarantorName}
                  id={loan.guarantorProfileId}
                />,
              ],
            ]
          : []),
      ]}
    />
  );
};

export default LoanInfoTable;
