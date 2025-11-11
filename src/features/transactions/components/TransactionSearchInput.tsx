import { EntitySearchInputProps } from "@/models";
import { Transaction } from "../models/transaction";
import { TransactionsQuery } from "../models/transactionsQuery";
import { EntitySearchInput } from "@/components/EntityForm";
import { transactionsCacheKey } from "../lib/constants";
import { getTransaction } from "../services/transactionsClient";
import TransactionSection from "./TransactionSection";

type TransactionSearchInputProps = EntitySearchInputProps<
  Transaction,
  TransactionsQuery
>;

const TransactionSearchInput = ({
  onChange,
  id,
  ...props
}: TransactionSearchInputProps) => {
  return (
    <EntitySearchInput<Transaction, TransactionsQuery>
      cacheKey={transactionsCacheKey}
      modalProps={{
        title: "Buscar Transacción",
        height: "90dvh",
        width: "75dvw",
      }}
      accesorFn={(t) => t?.id}
      visibleValueFn={(t) => t?.id.toString()}
      onSearch={getTransaction}
      onChange={onChange}
      id={id}
      render={(setValue) => (
        <TransactionSection {...props} table={{ onRowClick: setValue }} />
      )}
      {...props}
    />
  );
};

export default TransactionSearchInput;
