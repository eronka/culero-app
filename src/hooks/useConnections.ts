import { useQuery } from "@tanstack/react-query";
import { getConnections } from "../utils/api";

export function useConnections() {
  return useQuery({
    queryKey: ["connections"],
    queryFn: () => getConnections(),
  });
}
