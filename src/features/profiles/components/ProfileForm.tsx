import { ProfileFormValues } from "../lib/profileForm";
import { Profile } from "../models/profile";
import { ProfileRole } from "@/features/Profiles/models/profileRole";
import useProfileForm from "../hooks/useProfileForm";
import { Tab, Tabs } from "@/components/Tabs";
import { UploadFileForm } from "@/components/FileUpload";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";
import FormLayout from "@/components/EntityForm/layouts/FormLayout";
import { EntityFormProps, useEntityForm } from "@/components/EntityForm";
import { useProfileFilesForm } from "../hooks/useProfileFilesForm";
import FileFormExplorer from "@/components/FileUpload/components/FileFormExplorer";
import { UploadFileFormRef } from "@/components/FileUpload/components/UploadFileForm";
import { useRef } from "react";

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
        <Tab title="Datos" path="data">
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
            onSuccess={fileFormRef.current?.submit}
            {...config}
            {...props}
          />
        </Tab>
        <Tab title="Foto" path="photo">
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
