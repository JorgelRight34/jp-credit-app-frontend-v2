import { Project } from "../models/project";
import { projectsQueryKey } from "../lib/constants";
import { projectsClient } from "../services/projectService";
import { useData } from "@/hooks/useData";

interface UseProjectProps {
  id?: string | number;
}

const useProject = ({ id }: UseProjectProps) => {
  const { data, isLoading, isError } = useData<Project>({
    key: [...projectsQueryKey, Number(id)],
    getData: () => projectsClient.getProject(id!),
    enabled: !!id,
  });

  return { project: data, isLoading, isError };
};

export default useProject;
