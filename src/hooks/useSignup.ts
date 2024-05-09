import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User, UserWithToken } from "../types";
import { SignupInput, signUp } from "../utils/api";
import storage from "../utils/storage";
import { useNavigation } from "@react-navigation/native";

export function useSignup() {
  const navigation = useNavigation();
  // const queryClient = useQueryClient();
  return useMutation<User, Error, SignupInput, unknown>({
    mutationFn: ({ email }) => signUp(email),
    mutationKey: ["user"],
    onSuccess: async (result) => {
      navigation.navigate("AuthNav", {
        screen: "VerifyEmail",
        params: { email: result.email },
      });
    },
  });
}
