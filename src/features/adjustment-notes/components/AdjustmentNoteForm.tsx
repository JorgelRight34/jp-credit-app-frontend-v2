import {
  EntityFormProps,
  FormBuilder,
  FormLayout,
  FormSubscriptionWrapper,
  useEntityForm,
} from "@/components";
import { useAdjustmentNoteForm } from "../hooks/useAdjustmentNoteForm";
import { AdjustmentNoteFormValues } from "../lib/form";
import AdjustmentNoteFormDetails from "./AdjusmentNoteFormDetails";
import { AdjustmentNote } from "../models/adjusment-note";

type AdjustmentNoteFormProps = EntityFormProps<
  AdjustmentNoteFormValues,
  AdjustmentNote
>;

const AdjustmentNoteForm = ({
  onDirtyChange,
  ...props
}: AdjustmentNoteFormProps) => {
  const config = useAdjustmentNoteForm();
  const { form, ref, ...methods } = useEntityForm();

  return (
    <FormLayout {...methods}>
      <FormBuilder
        ref={ref}
        layout={[["type", "amount"], ["loanId"], ["description"]]}
        onDirtyChange={onDirtyChange}
        {...config}
        {...props}
      />
      <section className="mt-6">
        <FormSubscriptionWrapper<AdjustmentNoteFormValues>
          form={form}
          subscribedNames={["loanId"]}
          render={({ loanId }) => <AdjustmentNoteFormDetails loanId={loanId} />}
        />
      </section>
    </FormLayout>
  );
};

export default AdjustmentNoteForm;
