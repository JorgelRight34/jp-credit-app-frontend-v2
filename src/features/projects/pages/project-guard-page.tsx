import { FolderOpenIcon, SearchIcon } from '@/components'
import GuardPage from '@/components/molecules/guard/guard-panel'

const ProjectGuardPage = () => {
  return (
    <GuardPage
      icon={FolderOpenIcon}
      title="Selecciona un Proyecto"
      subtitle="Para ver préstamos, garantías y transacciones, necesitas seleccionar un proyecto primero. 
      Los proyectos te ayudan a organizar tu portafolio crediticio por categorías como préstamos de vehículos, 
      préstamos personales o préstamos comerciales."
      secondaryLink="/projects"
      secondaryLabel="Seleccionar proyecto"
      secondaryIcon={SearchIcon}
      createLink="/projects/create"
      createLabel="Crear Proyecto"
    />
  )
}

export default ProjectGuardPage
