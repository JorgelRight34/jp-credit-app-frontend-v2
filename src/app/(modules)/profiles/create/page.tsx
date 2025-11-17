import {
  ProfileForm,
  profileModulePermissionsProvider,
  profileRolesSpanishTranslations,
} from "@/features/profiles";
import { FormPageLayout } from "@/layouts";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: FORM_PAGE_TITLES.create(profileRolesSpanishTranslations["profile"]),
};

const Page = () => {
  return (
    <FormPageLayout
      title={profileRolesSpanishTranslations["profile"]}
      permissionsProvider={profileModulePermissionsProvider}
    >
      <ProfileForm />
    </FormPageLayout>
  );
};

export default Page;
