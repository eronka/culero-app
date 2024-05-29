import { useQuery } from "@tanstack/react-query";
import { getUserSettings } from "../utils/api";

export function useUserSettings() {
  return useQuery({
    queryFn: () => getUserSettings(),
    queryKey: ["user-settings"],
  });
}
