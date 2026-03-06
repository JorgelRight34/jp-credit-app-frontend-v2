import { PropsWithChildren } from 'react'
import { useProjectId } from '../providers/project-id-provider'
import {
  AccentBtn,
  AddIcon,
  FolderOpenIcon,
  Icon,
  Link,
  SearchIcon,
  Subtitle,
} from '@/components'

const ProjectSelectionGuard = ({ children }: PropsWithChildren) => {
  const [projectId] = useProjectId()

  if (projectId) return children

  return (
    <div>
      <div className="flex justify-center">
        <Icon icon={FolderOpenIcon} className="mx-auto mb-5 text-secondary" />
      </div>
      <header className="mb-5">
        <h1 className="mb-3 text-center text-2xl font-semibold text-gray-800">
          Selecciona un Proyecto
        </h1>
        <Subtitle className="leading-relaxed">
          Para ver préstamos, garantías y transacciones, necesitas seleccionar
          un proyecto primero. Los proyectos te ayudan a organizar tu portafolio
          crediticio por categorías como préstamos de vehículos, préstamos
          personales o préstamos comerciales.
        </Subtitle>
      </header>
      <div className="space-y-3">
        <Link to="/projects">
          <AccentBtn icon={SearchIcon}>Seleccionar proyecto</AccentBtn>
        </Link>
        <Link to="/projects/create">
          <AccentBtn icon={AddIcon}>Crear Proyecto</AccentBtn>
        </Link>
      </div>
    </div>
  )
}

export default ProjectSelectionGuard
