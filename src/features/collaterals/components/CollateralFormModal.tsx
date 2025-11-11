import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { Collateral } from "../models/collateral";
import CollateralForm from "./CollateralForm";
import { collateralsBasePath } from "../lib/constants";
import { CREATE_URL_SUFFIX } from "../../../utils/constants";

interface CollateralFormModalProps {
  show: boolean;
  onHide: () => void;
  edit?: Collateral;
}

const CollateralFormModal = ({
  show,
  edit,
  onHide,
}: CollateralFormModalProps) => {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <Modal
      isDirty={isDirty}
      title={edit ? "Editar Garantía" : "Añadir Garantía"}
      show={show}
      openIfPathEndsWith={CREATE_URL_SUFFIX}
      closeRedirectUrl={collateralsBasePath}
      onHide={onHide}
    >
      <CollateralForm onDirtyChange={setIsDirty} edit={edit} />
    </Modal>
  );
};

export default CollateralFormModal;
