import { useState } from "react";
import ChangePasswordFormModal from "./ChangeUserPasswordFormModal";
import { User } from "../models/user";
import { Icon, SecondaryBtn } from "@/components/ui";

interface ChangePasswordBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  user: User;
  label?: string;
}

const ChangePasswordBtn = ({
  user,
  label = "Modificar Contraseña",
  ...props
}: ChangePasswordBtnProps) => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  return (
    <>
      <SecondaryBtn
        onClick={() => {
          setShowChangePasswordModal(true);
        }}
        {...props}
      >
        <Icon icon="lock" label={label} />
      </SecondaryBtn>
      <ChangePasswordFormModal
        user={user}
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
      />
    </>
  );
};

export default ChangePasswordBtn;
