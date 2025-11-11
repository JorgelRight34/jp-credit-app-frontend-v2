import { EntityFormProps } from "@/components/EntityForm";
import usePermissionsForm from "../hooks/usePermissionsForm";
import { User } from "../models/user";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";

interface PermissionsFormProps extends EntityFormProps<object> {
  edit?: User;
}

const PermissionsForm = ({
  edit,
  onDirtyChange,
  ...props
}: PermissionsFormProps) => {
  const config = usePermissionsForm({
    profile: edit,
  });

  return (
    <FormBuilder<Permissions, object>
      onDirtyChange={onDirtyChange}
      {...config}
      {...props}
    />
  );
};

export default PermissionsForm;
