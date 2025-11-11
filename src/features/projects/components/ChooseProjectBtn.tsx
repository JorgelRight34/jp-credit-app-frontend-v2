import SecondaryBtn from "../../../components/ui/SecondaryBtn";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import ProjectSection from "./ProjectSection";
import { useCurrentProject } from "../../../contexts/ProjectContext";
import { Project } from "../models/project";

interface ChooseProjectBtnProps extends React.PropsWithChildren {
  className?: string;
  alert?: boolean;
  text?: string;
  textClassName?: string;
}

const ChooseProjectBtn = ({
  alert = false,
  text = "Proyecto",
  textClassName,
  children,
  className,
}: ChooseProjectBtnProps) => {
  const [showModal, setShowModal] = useState(false);
  const { projectId, chooseProject } = useCurrentProject();

  const handleChooseProject = (project: Project) => {
    chooseProject(project);
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    if (!projectId && alert) setShowModal(true);
  }, [projectId, alert]);

  return (
    <>
      {children ? (
        <span onClick={handleShowModal}>{children}</span>
      ) : (
        <SecondaryBtn
          className={className}
          onClick={handleShowModal}
          icon="folder_open"
        >
          <span className={textClassName}>{text}</span>
        </SecondaryBtn>
      )}
      <Modal
        title="Seleccionar Proyecto"
        width="50dvw"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <ProjectSection onRowClick={handleChooseProject} />
      </Modal>
    </>
  );
};

export default ChooseProjectBtn;
