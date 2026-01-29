import {
  EntityFormProps,
  FileFormExplorer,
  FormBuilder,
  FormLayout,
  Tab,
  Tabs,
  UploadFileForm,
  UploadFileFormRef,
  useEntityForm,
} from "@/components";
import { ProfileFormValues } from "../lib/profileForm";
import { useRef } from "react";
import { ProfileRole } from "../models/profileRole";
import { Profile } from "../models/profile";
import useProfileForm from "../hooks/useProfileForm";
import { useProfileFilesForm } from "../hooks/useProfileFilesForm";

interface ProfileFormProps extends EntityFormProps<ProfileFormValues> {
  role?: ProfileRole;
  edit?: Profile;
}

const ProfileForm = ({ role, edit, ...props }: ProfileFormProps) => {
  const config = useProfileForm({ edit, role });
  const fileFormConfig = useProfileFilesForm({
    profile: edit,
  });
  const { ref, onDirtyChange, ...methods } = useEntityForm<ProfileFormValues>();
  const fileFormRef = useRef<UploadFileFormRef>(null);

  return (
    <FormLayout {...methods}>
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab title="Datos" eventKey="data">
          <FormBuilder<Profile, ProfileFormValues>
            ref={ref}
            edit={edit}
            layout={[
              ["firstName", "lastName", "dni"],
              ["dateOfBirth", "gender", "maritalStatus"],
              ["email", "phoneNumber", "landline"],
              ["address", "city", "nationality"],
              ["officePhone", "profession", null],
            ]}
            onDirtyChange={onDirtyChange}
            onSuccess={() => fileFormRef.current?.submit()}
            {...config}
            {...props}
          />
        </Tab>
        <Tab title="Foto" eventKey="photo">
          <UploadFileForm
            {...fileFormConfig}
            {...props}
            ref={fileFormRef}
            render={FileFormExplorer}
          />
        </Tab>
      </Tabs>
    </FormLayout>
  );
};

export default ProfileForm;
