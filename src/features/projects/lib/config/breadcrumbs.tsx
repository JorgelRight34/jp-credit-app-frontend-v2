import { BreadcrumbSpec, FolderOpenIcon } from '@/components'

export const projectsBreadcrumb: BreadcrumbSpec = {
  title: 'Proyectos',
  icon: () => <FolderOpenIcon />,
  pathname: '/projects',
}
