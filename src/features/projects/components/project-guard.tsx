import { FolderOpenIcon, GuardPanel, SearchIcon } from '@/components'
import { PropsWithProjectId } from '../models/project'

const ProjectGuard = ({ projectId, children }: PropsWithProjectId) => {
  if (projectId) return children

  return (
    <GuardPanel
      icon={FolderOpenIcon}
      title="Selecciona un Proyecto"
      subtitle="Para ver préstamos, garantías y transacciones, necesitas seleccionar un proyecto primero. 
      Los proyectos te ayudan a organizar tu portafolio crediticio por categorías como préstamos de vehículos, 
      préstamos personales o préstamos comerciales."
      secondaryLink="/projects"
      secondaryLabel="Seleccionar proyecto"
      secondaryIcon={SearchIcon}
      createLink="/projects/create"
      createLabel="Crear proyecto"
    />
  )
}

export default ProjectGuard
