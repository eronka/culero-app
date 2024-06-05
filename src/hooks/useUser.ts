import { QueryOptions, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getMe } from "../utils/api";

export function useUserQuery(disabled?: boolean) {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
    enabled: !disabled,
  });
}

export function useUser() {
  const { data, error } = useUserQuery();
  return data && !error ? data : null;
}
