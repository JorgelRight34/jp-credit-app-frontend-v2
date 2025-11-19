import { ClosedPeriodForm } from "@/features/transactions";
import { FormPageLayout } from "@/layouts";
import { FORM_PAGE_TITLES } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.create("Cierre"),
};

const Page = () => {
  return (
    <FormPageLayout title="Cierre">
      <ClosedPeriodForm />
    </FormPageLayout>
  );
};

export default Page;
