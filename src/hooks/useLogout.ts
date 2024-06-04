import { useQueryClient } from "@tanstack/react-query";
import storage from "../utils/storage";

export function useLogout() {
  const queryClient = useQueryClient();
  return async () => {
    await storage.removeItem(storage.TOKEN_KEY);
    await queryClient.resetQueries();
    await queryClient.invalidateQueries();
  };
}
