import { ReactNode, useEffect } from "react";
import "./EntityLayout.css";
import usePermissions from "../../features/Auth/hooks/usePermissions";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Unauthorized from "../../pages/Unathorized";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import type { BreadcrumbSpec } from "@/models";
import { PermissionsProvider } from "@/models/permissionsProvider";
import { SMALL_SCREEN_BREAKPOINT } from "@/utils/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import EntityLayoutHeader, {
  EntityLayoutHeaderProps,
} from "./EntityLayoutHeader";
import { useCurrentProject } from "@/contexts/ProjectContext";

export interface EntityLayoutProps extends EntityLayoutHeaderProps {
  children: ReactNode;
  title: string;
  height?: string;
  permissionsProvider?: PermissionsProvider;
  showTopOptions?: boolean;
  breadcrumbs?: BreadcrumbSpec[];
  validateProject?: boolean;
}

/**
 * A layout component that wraps its children with a title and action buttons.
 * It is used to provide a consistent layout structure for different entities.
 */
const EntityLayout = ({
  children,
  title,
  height = "97dvh",
  permissionsProvider,
  create = false,
  edit = false,
  breadcrumbs = [],
  validateProject,
  onCreate,
  onEdit,
  onDelete,
  ...props
}: EntityLayoutProps) => {
  const isSmallScreen = useMediaQuery(SMALL_SCREEN_BREAKPOINT);
  const { project } = useCurrentProject();
  const { permissions, isLoading, isError } = usePermissions({
    ...permissionsProvider,
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div
      className="entity-layout rounded-3 flex !h-full w-full flex-col overflow-y-auto border bg-white px-3 pb-3 shadow-sm"
      style={{ height }}
      {...props}
    >
      <div className="border-bottom mb-3 w-full bg-white p-2">
        <Breadcrumb
          maxItems={isSmallScreen ? 3 : 4}
          breadcrumbs={breadcrumbs}
        />
      </div>
      <EntityLayoutHeader
        title={title}
        create={create}
        edit={edit}
        onCreate={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
        className="flex-shrink-0"
      />

      {/* Body */}
      <div className="px-lg-3 flex flex-1 flex-col p-0">
        {(() => {
          if (validateProject && !project) {
            return null;
          }

          // If no permissions endpoint, render children directly
          if (!permissionsProvider) {
            return children;
          }

          // Handle loading state
          if (isLoading) {
            return <LoadingSpinner />;
          }

          // Handle error state
          if (isError) {
            return <h1>Ha ocurrido un error</h1>;
          }

          // Handle permissions check
          if (permissions?.canView) {
            return children;
          }

          // User doesn't have permission
          return <Unauthorized />;
        })()}
      </div>
    </div>
  );
};

export default EntityLayout;
