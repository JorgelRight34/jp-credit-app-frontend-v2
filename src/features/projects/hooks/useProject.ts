import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "../services/projectService";
import { Project } from "../models/project";
import { projectsQueryKey } from "../lib/constants";

interface UseProjectProps {
  id?: string | number;
}

const useProject = ({ id }: UseProjectProps) => {
  const { data, isLoading, isError } = useQuery<Project>({
    queryKey: [projectsQueryKey, Number(id)],
    queryFn: () => fetchProject(id!),
    enabled: !!id,
  });

  return { project: data, isLoading, isError };
};

export default useProject;
