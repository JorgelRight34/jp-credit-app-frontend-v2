import { FileForm } from "@/components/FileUpload";
import { Collateral } from "../models/collateral";
import { useCollateralFilesForm } from "../hooks/useCollateralFilesForm";
import { AccentBtn } from "@/components/ui";

interface CollateralFilesExplorer {
  collateral: Collateral;
}

const CollateralFilesExplorer = ({ collateral }: CollateralFilesExplorer) => {
  const { handleSubmit, ...fileFormConfig } = useCollateralFilesForm({
    collateral,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 w-full pb-3">
        <FileForm {...fileFormConfig} />
      </div>
      <div className="flex-shrink-0">
        <AccentBtn
          className="w-full"
          icon="save_as"
          onClick={() => handleSubmit(collateral)}
        >
          Guardar
        </AccentBtn>
      </div>
    </div>
  );
};

export default CollateralFilesExplorer;
