import { Suspense } from 'react'
import Unauthorized from '../../pages/unathorized'
import type { ReactNode } from 'react'
import type {
  IsAuthorizedFn,
  PermissionsProvider,
} from '@/components/organisms'
import { getProjectId } from '@/lib/utils'
import { ProtectedComponent } from '@/components/organisms'

interface EntityLayoutContentProps {
  permissionProvider: PermissionsProvider
  children: ReactNode
  isAuthorizedFn?: IsAuthorizedFn
  validateProject?: boolean
}

const EntityLayoutContent = ({
  permissionProvider,
  validateProject,
  children,
  isAuthorizedFn = (p) => p.canView,
}: EntityLayoutContentProps) => {
  return (
    <div className="px-lg-3 flex flex-1 flex-col p-0">
      <Suspense fallback={'loading...'}>
        <ProtectedComponent
          provider={permissionProvider}
          isAuthorizedFn={isAuthorizedFn}
          fallback={<Unauthorized />}
        >
          {validateProject && !getProjectId()
            ? '<ChooseProjectPrompt />'
            : children}
        </ProtectedComponent>
      </Suspense>
    </div>
  )
}

export default EntityLayoutContent
