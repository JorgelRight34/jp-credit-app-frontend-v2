import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProject } from "../services/projectService";
import { ProjectFormValues } from "../lib/projectForm";
import { projectsQueryKey } from "../lib/constants";
import { ProjectSettingsFormValues } from "../lib/projectSettingsForm";

const useEditProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: ProjectFormValues | ProjectSettingsFormValues;
      id: number;
    }) => editProject(data, id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [projectsQueryKey] }),
  });

  return { editProject: mutateAsync, isPending };
};

export default useEditProject;
