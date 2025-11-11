import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import TransactionForm from "../components/TransactionForm";
import { useParams } from "@/hooks/useParams";
import { useTransaction } from "../hooks/useTransaction";
import {
  deleteTransaction,
  transactionPermissionsProvider,
} from "../services/transactionsClient";

const TransactionFormPage = () => {
  const { id } = useParams();
  const { transaction, isLoading } = useTransaction({ id });

  return (
    <FormLayoutPage
      title="Transacción"
      edit={!!transaction}
      permissionsProvider={transactionPermissionsProvider}
      onDelete={() => deleteTransaction(transaction!.id)}
      isLoading={isLoading}
    >
      <TransactionForm />
    </FormLayoutPage>
  );
};

export default TransactionFormPage;
