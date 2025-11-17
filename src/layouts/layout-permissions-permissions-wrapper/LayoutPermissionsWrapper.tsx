import {
  PermissionsProviderWrapper,
  PermissionsProviderWrapperProps,
} from "@/features/auth";
import { useDataClient } from "@/hooks/useDataClient";

const LayoutPermissionsWrapper = ({
  provider,
  children,
  ...props
}: PermissionsProviderWrapperProps) => {
  const dataClient = useDataClient();

  return (
    <PermissionsProviderWrapper
      provider={provider}
      fetchedPermissions={
        provider ? dataClient.get(provider.cacheKey) : undefined
      }
      onSuccess={
        (provider, permissions) =>
          dataClient.set(provider.cacheKey, permissions) // Cache by window
      }
      {...props}
    >
      {children}
    </PermissionsProviderWrapper>
  );
};

export default LayoutPermissionsWrapper;
