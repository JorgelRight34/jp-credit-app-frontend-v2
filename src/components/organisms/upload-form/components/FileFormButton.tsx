import React, { useState } from "react";
import FileForm, { FileFormProps } from "./FileForm";
import { FileFormFieldValues } from "../lib/form";
import { ModalProps } from "../../modal/models/modalProps";
import Modal from "../../modal/components/Modal";

type FileFormButtonProps = React.PropsWithChildren &
  FileFormProps & {
    modalProps?: Partial<ModalProps>;
  };

const FileFormButton = ({
  modalProps,
  children,
  onSubmit,
  ...props
}: FileFormButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOnSubmit = async (data: FileFormFieldValues) => {
    const response = await onSubmit(data);
    setShowModal(false);

    return response;
  };

  return (
    <>
      <span onClick={() => setShowModal(true)}>{children}</span>
      <Modal
        title="Crear archivo"
        width="50dvw"
        icon="add"
        {...modalProps}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <FileForm {...props} onSubmit={handleOnSubmit} />
      </Modal>
    </>
  );
};

export default FileFormButton;
