import { Suspense } from 'react'
import type { ReactNode } from 'react'
import type { PermissionsProvider } from '@/models/permissionsProvider'
import { getProjectId } from '@/lib/utils'
import { PermissionsProviderWrapper } from '@/features/auth'

interface EntityLayoutContentProps {
  permissionProvider: PermissionsProvider
  children: ReactNode
  validateProject?: boolean
}

const EntityLayoutContent = ({
  permissionProvider,
  validateProject,
  children,
}: EntityLayoutContentProps) => {
  return (
    <div className="px-lg-3 flex flex-1 flex-col p-0">
      <Suspense fallback={'loading...'}>
        <PermissionsProviderWrapper
          provider={permissionProvider}
          isAuthorizedFn={(p) => p.canView}
        >
          {validateProject && !getProjectId()
            ? '<ChooseProjectPrompt />'
            : children}
        </PermissionsProviderWrapper>
      </Suspense>
    </div>
  )
}

export default EntityLayoutContent
