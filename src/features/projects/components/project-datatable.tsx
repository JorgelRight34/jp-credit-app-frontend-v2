import {
  buildOptionDataCell,
  DataTableContainer,
  DataTableContainerOverrides,
} from '@/components'
import { Project } from '../models/project'
import { ProjectQuery } from '../models/projectQuery'
import { projectSearchConfig } from '../lib/config/project-search-config'
import { projectsQueryKey } from '../lib/constants'
import { projectsDataTableConfigColumns } from '../lib/config/project-datatable-config'
import { getProjects } from '../services/projectClient'
import { useRouter } from '@/hooks/useRouter'
import { setProjectId } from '../lib/utils'

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
  const router = useRouter()

  return (
    <DataTableContainer
      searchConfig={projectSearchConfig}
      cacheKey={[projectsQueryKey]}
      datatableConfig={{
        columns: projectsDataTableConfigColumns.concat({
          header: 'Opciones',
          cell: ({ row }) => {
            const isSelected = row.original.id === currentProjectId
            const value = isSelected ? null : row.original.id

            return buildOptionDataCell(
              isSelected ? 'Deseleccionar' : 'Seleccionar',
              () => {
                setProjectId(value)
                router.options.context.projectId = value
                router.invalidate()
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
