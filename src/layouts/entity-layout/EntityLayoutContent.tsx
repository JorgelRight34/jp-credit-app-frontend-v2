import { ModulePermissions, PermissionsProviderWrapper } from "@/features/auth";
import { PermissionsProvider } from "@/models/permissionsProvider";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import LayoutPermissionsWrapper from "../layout-permissions-permissions-wrapper/LayoutPermissionsWrapper";
import { ChooseProjectPrompt } from "@/features/projects";

interface EntityLayoutContentProps {
  permissionsProvider?: PermissionsProvider;
  children: ReactNode;
  validateProject?: boolean;
}

const EntityLayoutContent = async ({
  permissionsProvider,
  validateProject,
  children,
}: EntityLayoutContentProps) => {
  const cookieStore = await cookies();
  const projectId = cookieStore.get("projectId")?.value;

  return (
    <div className="px-lg-3 flex flex-1 flex-col p-0">
      <LayoutPermissionsWrapper
        provider={permissionsProvider}
        isAuthorizedFn={(p) => p.canView}
      >
        {validateProject && !projectId ? <ChooseProjectPrompt /> : children}
      </LayoutPermissionsWrapper>
    </div>
  );
};

export default EntityLayoutContent;
