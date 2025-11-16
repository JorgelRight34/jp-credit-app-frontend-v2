import {
  adjustmenNotesPermissionsProvider,
  AdjustmentNoteForm,
} from "@/features/adjustment-notes";
import { FormPageLayout } from "@/layouts";

const Page = () => {
  return (
    <FormPageLayout
      title="Ajuste"
      edit={false} // Can't edit adjustment notes
      permissionsProvider={adjustmenNotesPermissionsProvider}
    >
      <AdjustmentNoteForm />
    </FormPageLayout>
  );
};

export default Page;
