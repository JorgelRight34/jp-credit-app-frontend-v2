import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profilesQueryKey } from "../lib/constants";
import { addToProfileRole } from "../services/profilesClient";
import { ProfileRole } from "../models/profileRole";

interface UseAddToRoleProps {
  role?: ProfileRole;
}

export const useAddToProfileRole = ({ role = "client" }: UseAddToRoleProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ role, id }: { role: ProfileRole, id: number; }) =>
      addToProfileRole(role, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [profilesQueryKey, role] });
    },
  });

  return { addToRole: mutateAsync, isPending };
};
