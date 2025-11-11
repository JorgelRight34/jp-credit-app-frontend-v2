import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profilesQueryKey } from "../lib/constants";
import { ProfileRole } from "../models/profileRole";
import { removeProfileFromRole } from "../services/profilesClient";

interface UseRemoveFromRoleProps {
  role?: ProfileRole;
}

const useRemoveFromRole = ({ role = "client" }: UseRemoveFromRoleProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, role }: { id: number; role: ProfileRole }) =>
      removeProfileFromRole(role, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [profilesQueryKey, role] });
    },
  });

  return { removeFromRole: mutateAsync, isPending };
};

export default useRemoveFromRole;
