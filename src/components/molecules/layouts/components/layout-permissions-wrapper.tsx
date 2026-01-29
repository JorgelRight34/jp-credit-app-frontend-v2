import type { PermissionsProviderWrapperProps } from '@/features/auth'
import { PermissionsProviderWrapper } from '@/features/auth'
import { useDataClient } from '@/hooks/useDataClient'

const LayoutPermissionsWrapper = ({
  provider,
  children,
  ...props
}: PermissionsProviderWrapperProps) => {
  const dataClient = useDataClient()

  return (
    <PermissionsProviderWrapper
      provider={provider}
      fetchedPermissions={
        provider ? dataClient.get(provider.cacheKey) : undefined
      }
      onSuccess={({ cacheKey }, permissions) =>
        dataClient.set(cacheKey, permissions)
      }
      {...props}
    >
      {children}
    </PermissionsProviderWrapper>
  )
}

export default LayoutPermissionsWrapper
