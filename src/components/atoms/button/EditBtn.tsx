import React from "react";
import SecondaryBtn from "./SecondaryBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

type EditBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.PropsWithChildren;

const EditBtn = ({ children, ...props }: EditBtnProps) => {
  return (
    <SecondaryBtn {...props}>
      <FontAwesomeIcon icon={faEdit} className="me-2" />
      <span>{children || "Editar"}</span>
    </SecondaryBtn>
  );
};

export default EditBtn;
