import {
  ProfileForm,
  profileModulePermissionsProvider,
  profileRolesSpanishTranslations,
  profilesClient,
} from "@/features/profiles";
import { FormPageLayout } from "@/layouts";
import { AppPageProps } from "@/models/appPageProps";
import { FORM_PAGE_TITLES } from "@/utils/constants";
import { getFirstAndLastName, getFullName } from "@/utils/utils";

export async function generateMetadata({ params }: AppPageProps) {
  const profile = await profilesClient.getProfile(params.id);

  return { title: FORM_PAGE_TITLES.edit(getFirstAndLastName(profile)) };
}

const Page = async ({ params }: AppPageProps) => {
  const profile = await profilesClient.getProfile(params.id);

  return (
    <FormPageLayout
      title={profileRolesSpanishTranslations["profile"]}
      permissionsProvider={profileModulePermissionsProvider}
      onDelete={() => profilesClient.deleteProfile(params.id)}
      deleteConfirmationMessage={`Deseo borrar el pérfil de ${getFullName(
        profile,
      )}`}
      edit={true}
    >
      <ProfileForm edit={profile} />
    </FormPageLayout>
  );
};

export default Page;
