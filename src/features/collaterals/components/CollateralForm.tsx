import { Collateral } from "../models/collateral";
import { CollateralFormValues } from "../lib/form";
import useCollateralForm from "../hooks/useCollateralForm";
import { EntityFormProps, useEntityForm } from "@/components/EntityForm";
import FormLayout from "@/components/EntityForm/layouts/FormLayout";
import { Tab, Tabs } from "@/components/Tabs";
import FormBuilder from "@/components/EntityForm/components/FormBuilder";
import { UploadFileForm } from "@/components/FileUpload";
import { useCollateralFilesForm } from "../hooks/useCollateralFilesForm";
import FileFormExplorer from "@/components/FileUpload/components/FileFormExplorer";
import { useRef } from "react";
import { UploadFileFormRef } from "@/components/FileUpload/components/UploadFileForm";

type CollateralFormProps = EntityFormProps<CollateralFormValues, Collateral>;

const CollateralForm = ({ edit, ...props }: CollateralFormProps) => {
  const config = useCollateralForm({ edit });
  const fileFormConfig = useCollateralFilesForm({ collateral: edit });
  const fileFormRef = useRef<UploadFileFormRef>(null);
  const { ref, onDirtyChange, ...methods } =
    useEntityForm<CollateralFormValues>();

  return (
    <FormLayout {...methods}>
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab path="data" title="Datos">
          <FormBuilder<Collateral, CollateralFormValues>
            ref={ref}
            layout={[
              ["title", "description"],
              ["value", "status"],
              ["type", "condition"],
              ["location", "expirationDate"],
              ["loanId", "ownerId"],
            ]}
            edit={edit}
            onDirtyChange={onDirtyChange}
            onSuccess={fileFormRef?.current?.submit}
            {...config}
            {...props}
          />
        </Tab>
        <Tab path="files" title="Archivos">
          <UploadFileForm
            ref={fileFormRef}
            {...fileFormConfig}
            onDirtyChange={onDirtyChange}
            render={FileFormExplorer}
          />
        </Tab>
      </Tabs>
    </FormLayout>
  );
};

export default CollateralForm;
