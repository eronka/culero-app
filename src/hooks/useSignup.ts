import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserWithToken } from "../types";
import { SignupInput, signUp } from "../utils/api";
import storage from "../utils/storage";

export function useSignup() {
  const queryClient = useQueryClient();
  return useMutation<UserWithToken, Error, SignupInput, unknown>({
    mutationFn: ({ email, password }) => signUp(email, password),
    mutationKey: ["user"],
    onSuccess: async (result) => {
      queryClient.setQueryData(["user"], result);
      console.log("TOken ", result.token);
      await storage.setItem(storage.TOKEN_KEY, result.token);
    },
  });
}
