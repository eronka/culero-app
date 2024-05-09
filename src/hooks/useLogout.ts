import { useQueryClient } from "@tanstack/react-query";
import storage from "../utils/storage";
import { useNavigation } from "@react-navigation/native";

export function useLogout() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return async () => {
    await storage.removeItem(storage.TOKEN_KEY);
    queryClient.removeQueries();
    queryClient.resetQueries();
    queryClient.invalidateQueries();
    queryClient.setQueryData(["user"], null);
    console.log("ok");
  };
}
