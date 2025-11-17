import { UserForm, userModulePermissionsProvider } from "@/features/auth";
import { FormPageLayout } from "@/layouts";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.create("Usuario"),
};

const Page = () => {
  return (
    <FormPageLayout
      title="Usuario"
      permissionsProvider={userModulePermissionsProvider}
      edit={false}
    >
      <UserForm />
    </FormPageLayout>
  );
};

export default Page;
