import {
  userClient,
  UserForm,
  userModulePermissionsProvider,
} from "@/features/auth";
import { FormPageLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { getFullName } from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.edit,
};

const Page = async ({ params }: AppPageProps<{ id: number }>) => {
  const user = await userClient.getUser(params.id);

  return (
    <FormPageLayout
      title="Usuario"
      edit={!!user}
      permissionsProvider={userModulePermissionsProvider}
      onDelete={() => userClient.deleteUser(+params.id)}
      deleteConfirmationMessage={getFullName(user)}
    >
      <UserForm edit={user} />
    </FormPageLayout>
  );
};

export default Page;
