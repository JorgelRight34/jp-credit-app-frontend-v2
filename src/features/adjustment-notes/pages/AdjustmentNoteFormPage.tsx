import FormLayoutPage from "@/layouts/FormPageLayout/FormPageLayout";
import { adjustmenNotesPermissionsProvider } from "../services/adjustmentNoteClient";
import AdjustmentNoteForm from "../components/AdjustmentNoteForm";

const AdjusmentNoteFormPage = () => {
  return (
    <FormLayoutPage
      title={"Ajuste"}
      edit={false} // Can't edit adjustment notes
      permissionsProvider={adjustmenNotesPermissionsProvider}
    >
      <AdjustmentNoteForm />
    </FormLayoutPage>
  );
};

export default AdjusmentNoteFormPage;
