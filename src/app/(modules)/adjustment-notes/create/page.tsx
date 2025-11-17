import {
  adjustmenNotesPermissionsProvider,
  AdjustmentNoteForm,
} from "@/features/adjustment-notes";
import { FormPageLayout } from "@/layouts";

const Page = () => {
  return (
    <FormPageLayout
      title="Ajuste"
      edit={false}
      isLoading={false}
      permissionsProvider={adjustmenNotesPermissionsProvider}
    >
      <AdjustmentNoteForm />
    </FormPageLayout>
  );
};

export default Page;
