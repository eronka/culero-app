import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount } from "../utils/api";

export function useDeleteAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["user"],
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], (old: any) => null);
    },
  });
}
