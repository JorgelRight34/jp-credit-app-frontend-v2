import { FormPageLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import {
  transactionClient,
  TransactionForm,
  transactionPermissionsProvider,
} from "@/features/transactions";
import { FORM_PAGE_TITLES } from "@/utils";

export async function generateMetadata({ params }: AppPageProps) {
  return {
    title: FORM_PAGE_TITLES.edit(`Transacción #${params.id}`),
  };
}

const Page = async ({ params }: AppPageProps) => {
  const transaction = await transactionClient.getTransaction(params.id);

  return (
    <FormPageLayout
      title="Transacción"
      edit={true}
      permissionsProvider={transactionPermissionsProvider}
      onDelete={() => transactionClient.deleteTransaction(params.id)}
      isDeleteDisabled={transaction.isClosed}
      deleteDisabledTooltip="No se puede eliminar esta transacción porque el proceso está cerrado"
    >
      <TransactionForm edit={transaction} />
    </FormPageLayout>
  );
};

export default Page;
