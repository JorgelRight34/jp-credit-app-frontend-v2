import LayoutPermissionsWrapper from './layout-permissions-wrapper'
import type { ReactNode } from 'react'
import type { PermissionsProvider } from '@/models/permissionsProvider'
import { ChooseProjectPrompt } from '@/features/projects'
import { getProjectId } from '@/lib/utils'

interface EntityLayoutContentProps {
  permissionsProvider?: PermissionsProvider
  children: ReactNode
  validateProject?: boolean
}

const EntityLayoutContent = ({
  permissionsProvider,
  validateProject,
  children,
}: EntityLayoutContentProps) => {
  const projectId = getProjectId()

  return (
    <div className="px-lg-3 flex flex-1 flex-col p-0">
      <LayoutPermissionsWrapper
        provider={permissionsProvider}
        isAuthorizedFn={(p) => p.canView}
      >
        {validateProject && !projectId ? <ChooseProjectPrompt /> : children}
      </LayoutPermissionsWrapper>
    </div>
  )
}

export default EntityLayoutContent
