import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { ModalProps } from "../../../models/modalProps";
import { User } from "../models/user";
import PermissionsForm from "./PermissionsForm";

interface PermissionsFormModalProps extends ModalProps {
  profile: User;
}

const PermissionsFormModal = ({
  show,
  onHide,
  profile,
}: PermissionsFormModalProps) => {
  const [isDirty, setIsDirty] = useState(false);

  return (
    <Modal
      title="Permisos"
      show={show}
      onHide={onHide}
      isDirty={isDirty}
      width="33dvw"
    >
      <PermissionsForm onDirtyChange={setIsDirty} profile={profile} />
    </Modal>
  );
};

export default PermissionsFormModal;
