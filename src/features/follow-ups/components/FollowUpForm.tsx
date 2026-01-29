import { EntityForm, EntityFormProps } from "@/components";
import useFollowUpForm from "../hooks/useFollowUpForm";
import { FollowUpFormValues } from "../lib/form";
import { FollowUp } from "../models/followUp";

interface FollowUpFormProps extends EntityFormProps<FollowUpFormValues> {
  edit?: FollowUp;
}

const FollowUpForm = ({ edit, ...props }: FollowUpFormProps) => {
  const config = useFollowUpForm({ edit });

  return (
    <EntityForm
      layout={[["title", "loanId"], ["body"]]}
      edit={edit}
      {...config}
      {...props}
    />
  );
};

export default FollowUpForm;
