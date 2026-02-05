import {
  accessControlBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import RoleDetails from '../components/role-details'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import type { Role } from '../models/role'
import type { IdentityPermissions } from '../models/identityPermissions'
import { BadgeIcon, PageLayout, PageLayoutBreadcrumb } from '@/components'

type RolePageProps = {
  role: Role
  rolePermissions: IdentityPermissions
}

const RolePage = ({ role, rolePermissions }: RolePageProps) => {
  return (
    <PageLayout
      title={`${role.id} - ${role.name}`}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[
            accessControlBreadcrumb,
            rolesModuleBreadcrumb,
            {
              title: role.name,
              icon: BadgeIcon,
              pathname: '.',
              disabled: true,
            },
          ]}
        />
      }
      permissionProvider={rolesPermissionProvider}
    >
      <RoleDetails role={role} rolePermissions={rolePermissions} />
    </PageLayout>
  )
}

export default RolePage
