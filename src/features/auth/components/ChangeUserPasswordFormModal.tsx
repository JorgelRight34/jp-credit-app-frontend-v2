import { ModalProps } from "@/models";
import { useRef, useState } from "react";
import { Modal } from "@/components/Modal";
import ChangePasswordForm, {
  ChangePasswordFormProps,
} from "./ChangePasswordForm";
import { EntityFormLayout } from "@/components/EntityForm";
import { FormBuilderRef } from "@/components/EntityForm/components/FormBuilder";

type ChangeUserPasswordFormModalProps = ModalProps & ChangePasswordFormProps;

const ChangeUserPasswordFormModal = ({
  user,
  show,
  onHide,
  title = "Cambiar Contraseña",
  ...props
}: ChangeUserPasswordFormModalProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const form = useRef<FormBuilderRef>(null);

  return (
    <Modal
      width="33dvw"
      title={title}
      show={show}
      onHide={onHide}
      isDirty={form.current?.isDirty}
      {...props}
    >
      <EntityFormLayout
        reset={form.current?.reset}
        isDirty={isDirty}
        onSubmit={form.current?.submit}
      >
        <ChangePasswordForm ref={form} onDirtyChange={setIsDirty} user={user} />
      </EntityFormLayout>
    </Modal>
  );
};

export default ChangeUserPasswordFormModal;
