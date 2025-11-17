import {
  PermissionsForm,
  userClient,
  userModulePermissionsProvider,
} from "@/features/auth";
import { FormPageLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permisos",
};

const Page = async ({ params }: AppPageProps<{ id: number }>) => {
  const user = await userClient.getUser(params.id);

  return (
    <FormPageLayout
      title="Permisos"
      edit={!!user}
      permissionsProvider={userModulePermissionsProvider}
    >
      <PermissionsForm edit={user} />
    </FormPageLayout>
  );
};

export default Page;
