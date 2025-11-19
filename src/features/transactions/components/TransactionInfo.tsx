import { Transaction } from "../models/transaction";
import TransactionInfoTable from "./TransactionInfoTable";
import TransactionPreviewCard from "./TransactionPreviewCard";
import { Icon } from "@/components";
import { loanClient, LoanPreviewCard } from "@/features/loans";
import { transactionClient } from "../services/transactionsClient";

interface TransactionInfoProps {
  transaction: Transaction;
}

const TransactionInfo = async ({ transaction }: TransactionInfoProps) => {
  const loan = await loanClient.getLoan(transaction.loanId);
  const loanTransactionStats = await transactionClient.getTransactionTimeline(
    transaction.id,
  );

  return (
    <>
      <div className="flex">
        <div className="align-center flex w-6/12 flex-col px-3">
          <div>
            <Icon icon="history" label="Historial" className="mb-3 text-2xl" />
            {loan && <LoanPreviewCard className="mb-3" loan={loan} />}
            <TransactionPreviewCard
              title="Ultima Transacción"
              className="mb-3"
              transaction={loanTransactionStats.lastTransaction}
            />
            <TransactionPreviewCard
              title="Próxima Transacción"
              transaction={loanTransactionStats.nextTransaction}
            />
          </div>
        </div>
        <div className="w-6/12 px-3">
          <Icon icon="info" label="Detalles" className="mb-3 text-2xl" />
          <TransactionInfoTable transaction={transaction} />
        </div>
      </div>
      <div className="mt-5">
        <Icon icon="info" label="Descripción" className="mb-3 text-2xl" />
        <p>{transaction.description ?? "Sin descripción"}</p>
      </div>
    </>
  );
};

export default TransactionInfo;
