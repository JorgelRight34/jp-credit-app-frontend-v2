import {
  loanClient,
  LoanForm,
  loanModulePermissionsProvider,
} from "@/features/loans";
import { FormPageLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { FORM_PAGE_TITLES } from "@/utils/constants";

export async function generateMetadata({ params }: AppPageProps) {
  return { title: FORM_PAGE_TITLES.edit(`Préstamo ${params.id}`) };
}

const Page = async ({ params }: AppPageProps) => {
  const loan = await loanClient.getLoan(params.id);

  return (
    <FormPageLayout
      title={loan ? `Préstamo #${loan.id}` : "Préstamo"}
      edit={!!loan}
      permissionsProvider={loanModulePermissionsProvider}
      validateProject={true}
      onDelete={() => loanClient.deleteLoan(params.id)}
    >
      <LoanForm edit={loan} />
    </FormPageLayout>
  );
};

export default Page;
