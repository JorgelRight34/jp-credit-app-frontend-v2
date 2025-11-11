import { Transaction } from "../models/transaction";
import LoanPreviewCard from "../../Loans/components/LoanPreviewCard";
import useTransactionStats from "../hooks/useTransactionStats";
import TransactionInfoTable from "./TransactionInfoTable";
import TransactionPreviewCard from "./TransactionPreviewCard";
import useLoan from "@/features/Loans/hooks/useLoan";
import { Icon } from "@/components/ui";

interface TransactionInfoProps {
  transaction: Transaction;
}

const TransactionInfo = ({ transaction }: TransactionInfoProps) => {
  const { stats } = useTransactionStats(transaction.id);
  const { loan } = useLoan({ id: transaction?.loanId });

  return (
    <>
      <div className="flex">
        <div className="w-6/12 flex flex-col align-center px-3">
          <div>
            <Icon icon="history" label="Historial" className="text-2xl mb-3" />
            {loan && <LoanPreviewCard className="mb-3" loan={loan} />}
            <TransactionPreviewCard
              title="Ultima Transacción"
              className="mb-3"
              transaction={stats?.lastTransaction}
            />
            <TransactionPreviewCard
              title="Próxima Transacción"
              transaction={stats?.nextTransaction}
            />
          </div>
        </div>
        <div className="w-6/12 px-3">
          <Icon icon="info" label="Detalles" className="text-2xl mb-3" />
          <TransactionInfoTable transaction={transaction} />
        </div>
      </div>
      <div className="mt-5">
        <Icon icon="info" label="Descripción" className="text-2xl mb-3" />
        <p>{transaction.description ?? "Sin descripción"}</p>
      </div>
    </>
  );
};

export default TransactionInfo;
