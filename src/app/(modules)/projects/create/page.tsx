import { ProjectForm } from "@/features/projects";
import { FormPageLayout } from "@/layouts";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.create("Proyecto"),
};

const Page = () => {
  return (
    <FormPageLayout title="Proyecto">
      <ProjectForm />
    </FormPageLayout>
  );
};

export default Page;
