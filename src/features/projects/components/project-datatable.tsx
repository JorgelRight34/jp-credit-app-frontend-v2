import {
  buildOptionDataCell,
  DataTableContainer,
  DataTableContainerOverrides,
} from '@/components'
import { Project } from '../models/project'
import { ProjectQuery } from '../models/projectQuery'
import { projectSearchConfig } from '../lib/config/project-search-config'
import { projectSelectorQueryKey, projectsQueryKey } from '../lib/constants'
import { projectsDataTableConfigColumns } from '../lib/config/project-datatable-config'
import { getProjects } from '../services/projectClient'
import { setProjectId } from '../lib/utils'
import { useDataClient } from '@/hooks/useDataClient'
import { currentProjectIdQueryKey } from '../lib/query-keys'

interface ProjectDataTableProps extends DataTableContainerOverrides<
  Project,
  ProjectQuery
> {
  currentProjectId?: Project['id'] | null
}

const ProjectDataTable = ({
  currentProjectId,
  ...props
}: ProjectDataTableProps) => {
  const dataClient = useDataClient()

  return (
    <DataTableContainer
      searchConfig={projectSearchConfig}
      cacheKey={[projectsQueryKey]}
      datatableConfig={{
        columns: projectsDataTableConfigColumns.concat({
          header: 'OPCIONES',
          cell: ({ row }) => {
            const isSelected = row.original.id === currentProjectId
            const value = isSelected ? null : row.original.id

            return buildOptionDataCell(
              isSelected ? 'Deseleccionar' : 'Seleccionar',
              () => {
                setProjectId(value)
                dataClient.invalidate({ key: currentProjectIdQueryKey })
                dataClient.set(projectSelectorQueryKey, row.original)
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
