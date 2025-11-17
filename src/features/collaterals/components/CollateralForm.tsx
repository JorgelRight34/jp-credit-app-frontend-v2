import { Collateral } from "../models/collateral";
import { CollateralFormValues } from "../lib/form";
import useCollateralForm from "../hooks/useCollateralForm";
import { useCollateralFilesForm } from "../hooks/useCollateralFilesForm";
import { useRef } from "react";
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
        <Tab eventKey="data" title="Datos">
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
            onSuccess={() => fileFormRef?.current?.submit()}
            {...config}
            {...props}
          />
        </Tab>
        <Tab eventKey="files" title="Archivos">
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
