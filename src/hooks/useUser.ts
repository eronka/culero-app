import { useQuery } from "@tanstack/react-query";
import { getMe } from "../utils/api";

export function useUser() {
  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
  });

  return data ? data : null;
}
