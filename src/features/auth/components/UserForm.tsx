import useUserForm, { UseUserFormProps } from "../hooks/useUserForm";
import { User } from "../models/user";
import { EntityFormProps } from "../../../components/EntityForm/models/entityFormProps";
import { UserFormValues } from "../lib/form";
import { Tab, Tabs } from "@/components/Tabs";
import PermissionsForm from "./PermissionsForm";
import FormLayout from "@/components/EntityForm/layouts/FormLayout";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";
import ChangePasswordForm from "./ChangePasswordForm";
import { useMultipleForm } from "@/components/EntityForm/hooks/useMultipleForm";

type UserFormProps = UseUserFormProps & EntityFormProps<UserFormValues>;

const UserForm = ({ edit, ...props }: UserFormProps) => {
  const config = useUserForm({ edit });

  const { forms, setFormRef, submitAllForms, onDirtyChange, ...methods } =
    useMultipleForm(["user", "permission", "password"]);

  return (
    <FormLayout
      onSubmit={edit ? forms.user?.submit : submitAllForms}
      {...methods}
    >
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab path="data" title="Datos">
          <FormBuilder<User, UserFormValues>
            ref={setFormRef("user")}
            layout={[
              ["firstName", "lastName"],
              ["username", "email"],
              ["password", "confirmation"],
            ]}
            edit={edit}
            onSuccess={edit ? () => forms.permission?.submit() : undefined}
            onDirtyChange={onDirtyChange}
            {...config}
            {...props}
          />
        </Tab>
        <Tab path="permissions" title="Permisos">
          <PermissionsForm
            ref={setFormRef("permission")}
            edit={edit}
            renderLayout={false}
            onDirtyChange={onDirtyChange}
          />
        </Tab>
        {edit && (
          <Tab path="credentials" title="Credenciales">
            <ChangePasswordForm
              ref={setFormRef("password")}
              user={edit}
              renderLayout={false}
              onDirtyChange={onDirtyChange}
            />
          </Tab>
        )}
      </Tabs>
    </FormLayout>
  );
};

export default UserForm;
