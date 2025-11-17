import { ReactNode } from "react";
import type { BreadcrumbSpec } from "@/models";
import { PermissionsProvider } from "@/models/permissionsProvider";
import { SMALL_SCREEN_BREAKPOINT } from "@/utils/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import EntityLayoutHeader, {
  EntityLayoutHeaderProps,
} from "./EntityLayoutHeader";
import { Breadcrumb } from "@/components";
import EntityLayoutContent from "./EntityLayoutContent";
import "./EntityLayout.css";

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
  create = false,
  edit = false,
  breadcrumbs = [],
  permissionsProvider,
  onCreate,
  onEdit,
  onDelete,
  ...props
}: EntityLayoutProps) => {
  const isSmallScreen = useMediaQuery(SMALL_SCREEN_BREAKPOINT);

  return (
    <div
      className="entity-layout flex !h-full w-full flex-col overflow-y-auto border bg-white px-3 pb-3 shadow-sm"
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
        <EntityLayoutContent
          {...props}
          permissionsProvider={permissionsProvider}
        >
          {children}
        </EntityLayoutContent>
      </div>
    </div>
  );
};

export default EntityLayout;
