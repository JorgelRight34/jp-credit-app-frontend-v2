import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import PermissionsForm from "../components/PermissionsForm";
import { useParams } from "react-router";
import { useUser } from "../hooks/useUser";
import { userModulePermissionsProvider } from "../lib/constants";

const PermissionsFormPage = () => {
  const { id } = useParams();
  const { user: edit, isLoading } = useUser({ id });

  return (
    <FormLayoutPage
      title="Permisos"
      edit={!!id}
      isLoading={isLoading}
      permissionsProvider={userModulePermissionsProvider}
    >
      <PermissionsForm edit={edit} />
    </FormLayoutPage>
  );
};

export default PermissionsFormPage;
