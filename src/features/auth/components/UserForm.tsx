import { UseUserFormProps, useUserForm } from "../hooks/useUserForm";
import { UserFormValues } from "../lib/form";
import PermissionsForm from "./PermissionsForm";
import ChangePasswordForm from "./ChangePasswordForm";
import {
  EntityFormProps,
  FormBuilder,
  FormLayout,
  Tab,
  Tabs,
  useMultipleForm,
} from "@/components";
import { User } from "../models/user";

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
        <Tab eventKey="data" title="Datos">
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
        <Tab eventKey="permissions" title="Permisos">
          <PermissionsForm
            ref={setFormRef("permission")}
            edit={edit}
            renderLayout={false}
            onDirtyChange={onDirtyChange}
          />
        </Tab>
        {edit && (
          <Tab eventKey="credentials" title="Credenciales">
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
