import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../utils/api";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });
}
