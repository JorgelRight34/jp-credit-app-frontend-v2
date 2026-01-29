import { EntitySearchInput, EntitySearchInputProps } from "@/components";
import { Transaction } from "../models/transaction";
import { TransactionsQuery } from "../models/transactionsQuery";
import TransactionSection from "./TransactionSection";
import { transactionsCacheKey } from "../lib/constants";
import { transactionClient } from "../services/transactionsClient";

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
      onSearch={transactionClient.getTransaction}
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
