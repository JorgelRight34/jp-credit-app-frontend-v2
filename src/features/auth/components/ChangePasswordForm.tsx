"use client";

import { EntityFormProps, FormBuilder } from "@/components";
import { useChangePasswordForm } from "../hooks/useChangePassword";
import { ChangeUserPasswordValues } from "../lib/form";
import { User } from "../models/user";

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
