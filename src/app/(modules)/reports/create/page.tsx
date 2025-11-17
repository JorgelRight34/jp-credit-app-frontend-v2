import {
  ReportsForm,
  reportsModulePermissionsProvider,
} from "@/features/reports";
import { FormPageLayout } from "@/layouts";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.create("Reporte"),
};

const Page = () => {
  return (
    <FormPageLayout
      permissionsProvider={reportsModulePermissionsProvider}
      title="Reporte"
    >
      <ReportsForm />
    </FormPageLayout>
  );
};

export default Page;
