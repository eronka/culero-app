import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserWithToken } from "../types";
import { VerifyEmailInput, verifyEmail } from "../utils/api";
import storage from "../utils/storage";
import { useNavigation } from "@react-navigation/native";

export function useVerifyEmail() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation<UserWithToken, Error, VerifyEmailInput, unknown>({
    mutationFn: ({ email, code }) => verifyEmail(email, code),
    mutationKey: ["user"],
    onSuccess: async (result) => {
      await navigation.navigate("EmailVerificationSuccess");

      queryClient.setQueryData(["user"], result);

      await storage.setItem(storage.TOKEN_KEY, result.token);
    },
  });
}
