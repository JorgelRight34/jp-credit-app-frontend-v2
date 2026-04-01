import { Project } from '../models/project'
import { useData } from '@/hooks/useData'
import { Icon, ModalTrigger, ProjectIcon } from '@/components'
import ProjectDataTable from './project-datatable'
import { getCurrentProject } from '../services/projectClient'
import { projectSelectorQueryKey } from '../lib/constants'

interface ProjectSelectorProps {
  initialData: Partial<Project>
}

const ProjectSelector = ({ initialData }: ProjectSelectorProps) => {
  const { data } = useData({
    key: projectSelectorQueryKey,
    loader: getCurrentProject,
    initialData,
  })

  return (
    <ModalTrigger
      trigger={<span>{data?.name}</span>}
      width="50dvw"
      height="90dvh"
      title={<Icon icon={ProjectIcon}>Proyectos</Icon>}
    >
      <ProjectDataTable currentProjectId={data?.id} />
    </ModalTrigger>
  )
}

export default ProjectSelector
