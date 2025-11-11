import { useParams } from "@/hooks/useParams";
import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import useFollowUp from "../hooks/useFollowUp";
import {
  deleteFollowUp,
  followUpPermissionsProvider,
} from "../services/followUpClient";
import FollowUpForm from "../components/FollowUpForm";

const FollowUpFormPage = () => {
  const { id } = useParams();
  const { followUp, isLoading } = useFollowUp({ id });

  return (
    <FormLayoutPage
      title="Seguimiento"
      edit={!!followUp}
      permissionsProvider={followUpPermissionsProvider}
      onDelete={() => deleteFollowUp(followUp.id)}
      isLoading={isLoading}
    >
      <FollowUpForm edit={followUp} />
    </FormLayoutPage>
  );
};

export default FollowUpFormPage;
