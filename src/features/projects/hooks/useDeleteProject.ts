import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../services/projectService";
import { projectsQueryKey } from "../lib/constants";

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteProject(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [projectsQueryKey],
      }),
  });

  return { deleteProject: mutateAsync, isPending, isError };
};

export default useDeleteProject;
