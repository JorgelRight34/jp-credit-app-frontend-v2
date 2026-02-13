import { useSuspenseData } from "@/hooks/useData";
import { useProjectId } from "../providers/project-id-provider"
import { projectsQueryKey } from "../lib/constants";
import { getProject } from "../services/projectClient";
import { Project } from "../models/project";

export const useSuspenseCurrentProject = () => {
    const [projectId] = useProjectId();

    const { data } = useSuspenseData<Project | undefined>({
        key: [projectsQueryKey, projectId],
        loader: () => getProject(projectId!),
        enabled: !!projectId
    })

    return data ?? null;
}