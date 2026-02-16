import { useSuspenseData } from "@/hooks/useData";
import { useProjectId } from "../providers/project-id-provider"
import { getProject } from "../services/projectClient";
import { Project } from "../models/project";
import { createProjectQueryKey } from "../lib/query-keys";

export const useSuspenseCurrentProject = () => {
    const [projectId] = useProjectId();

    const { data } = useSuspenseData<Project | undefined>({
        key: createProjectQueryKey(projectId!),
        loader: () => getProject(projectId!),
        enabled: !!projectId
    })

    return data ?? null;
}