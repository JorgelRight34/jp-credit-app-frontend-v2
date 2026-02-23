import {
  createOptionDataCell,
  DataTableContainer,
  DataTableContainerOverrides,
} from '@/components'
import { Project } from '../models/project'
import { ProjectQuery } from '../models/projectQuery'
import { projectSearchConfig } from '../lib/config/project-search-config'
import { projectsDataTableConfigColumns } from '../lib/config/project-datatable-config'
import { projectsQueryKey } from '../lib/constants'
import { getProjects } from '../services/projectClient'
import { useProjectId } from '../providers/project-id-provider'

const ProjectDataTable = (
  props: DataTableContainerOverrides<Project, ProjectQuery>,
) => {
  const [projectId, setProjectId] = useProjectId()

  return (
    <DataTableContainer
      searchConfig={projectSearchConfig}
      cacheKey={[projectsQueryKey]}
      datatableConfig={{
        title: 'Proyectos',
        columns: projectsDataTableConfigColumns.concat({
          header: 'OPCIONES',
          cell: ({ row }) => {
            const isSelected = row.original.id === projectId

            return createOptionDataCell(
              isSelected ? 'Deseleccionar' : 'Seleccionar',
              () => {
                if (!isSelected) {
                  setProjectId(row.original.id)
                } else {
                  setProjectId(null)
                }
              },
              isSelected,
            )
          },
        }),
        loader: getProjects,
      }}
      {...props}
    />
  )
}

export default ProjectDataTable
