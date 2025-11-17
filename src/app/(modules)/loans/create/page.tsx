import { LoanForm, loanModulePermissionsProvider } from "@/features/loans";
import { FormPageLayout } from "@/layouts";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.create("Préstamo"),
};

const Page = () => {
  return (
    <FormPageLayout
      title="Préstamo"
      permissionsProvider={loanModulePermissionsProvider}
      validateProject={true}
    >
      <LoanForm />
    </FormPageLayout>
  );
};

export default Page;
