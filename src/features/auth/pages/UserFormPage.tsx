import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import { useUser } from "../hooks/useUser";
import UserForm from "../components/UserForm";
import { useParams } from "@/hooks/useParams";
import { userModulePermissionsProvider } from "../lib/constants";
import { deleteUser } from "../services/userService";
import { getFullName } from "@/utils/utils";

const UserFormPage = () => {
  const { id } = useParams();
  const { user, isLoading } = useUser({ id });

  return (
    <FormLayoutPage
      title="Usuario"
      edit={!!user}
      permissionsProvider={userModulePermissionsProvider}
      onDelete={() => deleteUser(Number(id))}
      deleteConfirmationMessage={getFullName(user)}
      isLoading={isLoading}
    >
      <UserForm edit={user} />
    </FormLayoutPage>
  );
};

export default UserFormPage;
