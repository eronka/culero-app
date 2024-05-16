import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types";
import {
  UpdateProfileData,
  updateProfileData,
  updateProfilePicture,
} from "../utils/api";

export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, string, unknown>({
    mutationFn: (data) => updateProfilePicture(data),
    mutationKey: ["user-data"],
    onSuccess: (result) => {
      queryClient.setQueryData(["user"], result);
    },
  });
}
