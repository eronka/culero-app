import { useMutation } from "@tanstack/react-query";
import { User } from "../types";
import { AuthInput, authenticate } from "../utils/api";
import storage from "../utils/storage";
import { useNavigation } from "@react-navigation/native";

export function useSignup() {
  const navigation = useNavigation();
  // const queryClient = useQueryClient();
  return useMutation<User, Error, AuthInput, unknown>({
    mutationFn: ({ email }) => authenticate(email),
    mutationKey: ["user"],
    onMutate: async ({ email }) => {
      navigation.navigate("AuthNav", {
        screen: "VerifyEmail",
        params: { email: email },
      });
    },

    onError: () => {
      navigation.navigate("AuthNav", { screen: "Auth" });
    },
  });
}
