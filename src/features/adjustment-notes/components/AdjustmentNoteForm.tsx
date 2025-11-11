import { EntityFormProps, useEntityForm } from "@/components/EntityForm";
import { useAdjustmentNoteForm } from "../hooks/useAdjustmentNoteForm";
import FormLayout from "@/components/EntityForm/layouts/FormLayout";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";
import { AdjustmentNoteFormValues } from "../lib/form";
import FormSubscriptionWrapper from "@/components/EntityForm/components/FormSubscriptionWrapper";
import AdjustmentNoteFormDetails from "./AdjusmentNoteFormDetails";

type AdjustmentNoteFormProps = EntityFormProps<AdjustmentNoteFormValues>;

const AdjustmentNoteForm = ({
  onDirtyChange,
  ...props
}: AdjustmentNoteFormProps) => {
  const config = useAdjustmentNoteForm();
  const { form, ref, ...methods } = useEntityForm({ onDirtyChange });

  return (
    <FormLayout {...methods}>
      <FormBuilder
        ref={ref}
        layout={[["type", "amount"], ["loanId"], ["description"]]}
        onDirtyChange={onDirtyChange}
        {...config}
        {...props}
      />
      <div className="mt-6">
        <FormSubscriptionWrapper<AdjustmentNoteFormValues>
          form={form}
          subscribedNames={["loanId"]}
          render={({ loanId }) => <AdjustmentNoteFormDetails loanId={loanId} />}
        />
      </div>
    </FormLayout>
  );
};

export default AdjustmentNoteForm;
