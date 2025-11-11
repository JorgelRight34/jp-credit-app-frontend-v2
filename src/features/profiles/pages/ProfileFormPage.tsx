import ProfileForm from "../components/ProfileForm";
import {
  profileModulePermissionsProvider,
  profileRolesSpanishTranslations,
} from "../lib/constants";
import useProfile from "../hooks/useProfile";
import { useParams } from "@/hooks/useParams";
import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import { deleteProfile } from "../services/profilesClient";
import { getFullName } from "@/utils/utils";
import DeleteWarningMessageLayout from "@/layouts/FormPageLayout/DeleteWarningMessageLayout";

const ProfileFormPage = () => {
  const { id } = useParams();
  const { profile, isLoading } = useProfile({ id });

  return (
    <FormLayoutPage
      title={profileRolesSpanishTranslations["profile"]}
      permissionsProvider={profileModulePermissionsProvider}
      onDelete={() => deleteProfile(profile!.id)}
      description={<DeleteWarningMessageLayout />}
      deleteConfirmationMessage={`Deseo borrar el pérfil de ${getFullName(
        profile,
      )}`}
      edit={!!id}
      isLoading={isLoading}
    >
      <ProfileForm edit={profile} />
    </FormLayoutPage>
  );
};

export default ProfileFormPage;
