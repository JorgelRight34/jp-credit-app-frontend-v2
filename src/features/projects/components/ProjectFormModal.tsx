import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { ModalProps } from "../../../models/modalProps";
import { CREATE_URL_SUFFIX } from "../../../utils/constants";
import { Project } from "../models/project";
import ProjectForm from "./ProjectForm";

type ProjectFormModalProps = ModalProps & {
  edit?: Project;
};

const ProjectFormModal = ({ show, onHide, edit }: ProjectFormModalProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const pathPreffix = edit ? "/project/" : "/projects/";

  return (
    <Modal
      title="Nuevo Proyecto"
      show={show}
      onHide={onHide}
      path={pathPreffix + CREATE_URL_SUFFIX}
      closeRedirectUrl={pathPreffix}
      isDirty={isDirty}
      width="50dvw"
    >
      <ProjectForm onDirtyChange={setIsDirty} edit={edit} />
    </Modal>
  );
};

export default ProjectFormModal;
