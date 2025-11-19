import {
  TransactionForm,
  transactionPermissionsProvider,
} from "@/features/transactions";
import { FormPageLayout } from "@/layouts";
import { FORM_PAGE_TITLES } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.create("Transacción"),
};

const Page = () => {
  return (
    <FormPageLayout
      title="Transacción"
      permissionsProvider={transactionPermissionsProvider}
    >
      <TransactionForm />
    </FormPageLayout>
  );
};

export default Page;
