import { useMutation } from "@tanstack/react-query";
import { User } from "../types";
import { SigninInput, signIn } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

export function useLogin() {
  const navigation = useNavigation();

  return useMutation<User, Error, SigninInput, unknown>({
    mutationFn: ({ email }) => signIn(email),
    mutationKey: ["user"],
    onMutate: async ({ email }) => {
      navigation.navigate("AuthNav", {
        screen: "VerifyLogin",
        params: { email },
      });
    },
    onError: () => {
      navigation.navigate("AuthNav", {
        screen: "Login",
      });
    },
    onSuccess: async (result) => {
      if (!result.isEmailVerified) {
        navigation.navigate("AuthNav", {
          screen: "VerifyEmail",
          params: { email: result.email },
        });
      }
    },
  });
}
