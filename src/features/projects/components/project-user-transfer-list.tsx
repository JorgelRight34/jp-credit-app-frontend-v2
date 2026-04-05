import { projectsQueryKey } from '../lib/constants'
import { getProjects } from '../services/projectClient'
import { PaginatedTransferList, type InputProps } from '@/components'

const ProjectUserTransferList = (props: InputProps) => (
  <PaginatedTransferList
    queryKey={[projectsQueryKey]}
    loader={(page) => getProjects({ page, limit: 25, orderBy: 'name' })}
    mapItem={({ id, name }) => ({ id, label: name })}
    rightSubtitle='Elija los proyectos seleccionándolos y luego seleccione el botón de flecha "Elegir".'
    leftSubtitle='Elimine los proyectos seleccionándolos y luego seleccione el botón de flecha "Eliminar".'
    {...props}
  />
)

export default ProjectUserTransferList
