import { useQuery } from "@tanstack/react-query";
import { getMe } from "../utils/api";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
  });
}
