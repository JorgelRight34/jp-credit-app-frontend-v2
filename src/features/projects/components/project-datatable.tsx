import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { Project } from '../models/project'
import { ProjectQuery } from '../models/projectQuery'
import { projectSearchConfig } from '../lib/config/project-search-config'
import { projectDataTableConfig } from '../lib/config/project-datatable-config'

const ProjectDataTable = (
  props: DataTableContainerOverrides<Project, ProjectQuery>,
) => (
  <DataTableContainer
    searchConfig={projectSearchConfig}
    datatableConfig={projectDataTableConfig}
    {...props}
  />
)

export default ProjectDataTable
