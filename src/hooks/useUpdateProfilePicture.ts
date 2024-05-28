import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types";
import { updateProfilePicture } from "../utils/api";

export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, string, unknown>({
    mutationFn: (data) => updateProfilePicture(data),
    mutationKey: ["user"],
    onSuccess: (result) => {
      queryClient.setQueryData(["user"], result);
    },
  });
}
