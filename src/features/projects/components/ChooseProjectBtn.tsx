'use client'

import { useCurrentProject } from '@/contexts/project-context'
import { useState } from 'react'
import { Project } from '../models/project'
import { Modal, SecondaryBtn } from '@/components'
import ProjectSection from './ProjectSection'

interface ChooseProjectBtnProps extends React.PropsWithChildren {
  className?: string
  alert?: boolean
  text?: string
}

const ChooseProjectBtn = ({
  alert = false,
  text = 'Proyecto',
  children,
  className,
}: ChooseProjectBtnProps) => {
  const [showModal, setShowModal] = useState(() => !projectId && alert)
  const { projectId, chooseProject } = useCurrentProject()

  const handleChooseProject = (project: Project) => {
    chooseProject(project)
    setShowModal(false)
  }

  const handleShowModal = () => setShowModal(true)

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
          {text}
        </SecondaryBtn>
      )}
      <Modal
        title="Seleccionar Proyecto"
        width="50dvw"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <ProjectSection table={{ onRowClick: handleChooseProject }} />
      </Modal>
    </>
  )
}

export default ChooseProjectBtn
