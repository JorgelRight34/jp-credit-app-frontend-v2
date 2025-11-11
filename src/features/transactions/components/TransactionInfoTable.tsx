import InfoTable from "../../../components/DataTable/components/InfoTable";
import { Transaction } from "../models/transaction";
import { toCurrency, toFormattedDate } from "../../../utils/utils";
import LinkToProfile from "../../Profiles/components/LinkToProfile";
import LinkToLoan from "../../Loans/components/LinkToLoan";
import { transactionTypesFullNames } from "../lib/constants";
import { nullFieldLabel } from "../../../utils/constants";

interface TransactionInfoTable {
  transaction: Transaction;
}

const TransactionInfoTable = ({ transaction }: TransactionInfoTable) => {
  return (
    <InfoTable
      data={[
        ["Id", transaction.id],
        ["Préstamo", <LinkToLoan id={transaction.loanId} />],
        [
          "Cliente",
          transaction.payerId ? (
            <LinkToProfile id={transaction.payerId} fullName={true} />
          ) : (
            nullFieldLabel
          ),
        ],
        [
          "Total",
          toCurrency(transaction.capitalValue + transaction.interestValue),
        ],
        ["Capital", toCurrency(transaction.capitalValue)],
        ["Intereses", toCurrency(transaction.interestValue)],
        ["Tipo", transactionTypesFullNames[transaction.type]],
        ["Mora", toCurrency(transaction.penaltyFee)],
        ["Fecha", toFormattedDate(transaction.date)],
        ["Cerrado", transaction.isClosed ? "Sí" : "No"],
      ]}
    />
  );
};

export default TransactionInfoTable;
