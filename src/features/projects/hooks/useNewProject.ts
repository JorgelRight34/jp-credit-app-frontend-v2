import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/projectService";
import { projectsQueryKey } from "../lib/constants";

const useNewProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [projectsQueryKey] });
    },
  });

  return { createProject: mutateAsync, isPending };
};

export default useNewProject;
