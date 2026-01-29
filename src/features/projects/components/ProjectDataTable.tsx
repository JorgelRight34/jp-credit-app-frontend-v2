import {
  Column,
  DataTableOption,
  EntityDataTable,
  EntityDataTableProps,
} from '@/components'
import { projectsQueryKey } from '../lib/constants'
import { Project } from '../models/project'
import { ProjectsQuery } from '../models/projectsQuery'
import { getProjects } from '../services/projectService'
import { showColumnsIfAssertion } from '@/lib/utils/utils'
import { useCurrentProject } from '@/contexts/project-context'
import { toastService } from '@/lib/services'

interface ProjectDataTableProps extends EntityDataTableProps<
  Project,
  ProjectsQuery
> {
  allowSelect?: boolean
  toast?: boolean
}

const columns: Column<Project>[] = [
  { accessorKey: 'id', header: 'Id', enableSorting: true },
  { accessorKey: 'name', header: 'Nombre', enableSorting: true },
  { accessorKey: 'loanCount', header: 'Préstamos', enableSorting: true },
  {
    accessorKey: 'collateralCount',
    header: 'Garantias',
    enableSorting: true,
  },
]

const ProjectDataTable = ({
  allowSelect = true,
  toast,
  ...props
}: ProjectDataTableProps) => {
  const { projectId, chooseProject, deselectProject } = useCurrentProject()

  const handleOnSelect = (project: Project) => {
    const isSelected = project.id === projectId
    if (isSelected) {
      chooseProject(project)
      if (toast) toastService.success(`${project.name} ha sido seleccionado!`)
    } else {
      deselectProject(project)
      if (toast) toastService.info(`${project.name} ha sido deseleccionado!`)
    }
  }

  return (
    <EntityDataTable
      title="proyecto"
      columns={[
        ...columns,
        ...showColumnsIfAssertion<Project>(allowSelect, [
          {
            id: 'select',
            header: 'Opciones',
            cell: ({ row }) => (
              <DataTableOption onClick={() => handleOnSelect(row.original)}>
                {row.original.id === projectId
                  ? 'Deseleccionar'
                  : 'Seleccionar'}
              </DataTableOption>
            ),
          },
        ]),
      ]}
      loader={getProjects}
      cacheKey={projectsQueryKey}
      validateProject={false}
      {...props}
    />
  )
}

export default ProjectDataTable
