import { EntityFormProps } from "@/components/EntityForm";
import { User } from "../models/user";
import { useChangePasswordForm } from "../hooks/useChangePassword";
import { ChangeUserPasswordValues } from "../lib/form";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";

export interface ChangePasswordFormProps
  extends EntityFormProps<ChangeUserPasswordValues> {
  user: User;
}

const ChangePasswordForm = ({ user, ...props }: ChangePasswordFormProps) => {
  const config = useChangePasswordForm({ user });

  return (
    <FormBuilder<User, ChangeUserPasswordValues>
      layout={[["password"], ["confirmation"]]}
      {...config}
      {...props}
    />
  );
};

export default ChangePasswordForm;
