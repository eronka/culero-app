import { useMutation } from "@tanstack/react-query";
import { User } from "../types";
import { SigninInput, signIn } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

export function useLogin() {
  const navigation = useNavigation();

  return useMutation<User, Error, SigninInput, unknown>({
    mutationFn: ({ email }) => signIn(email),
    mutationKey: ["user"],
    onSuccess: async (result) => {
      console.log("result is", result);
      navigation.navigate("AuthNav", {
        screen: result.isEmailVerified ? "VerifyLogin" : "VerifyEmail",
        params: { email: result.email },
      });
    },
  });
}
