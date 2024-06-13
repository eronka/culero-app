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
    onMutate: async ({ email }) => {
      navigation.navigate("AuthNav", {
        screen: "VerifyEmail",
        params: { email: email },
      });
    },

    onError: () => {
      navigation.navigate("AuthNav", { screen: "Signup" });
    },
  });
}
