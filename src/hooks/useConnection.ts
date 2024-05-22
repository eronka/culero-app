import { useQuery } from "@tanstack/react-query";
import { Connection, User } from "../types";
import { getConnection } from "../utils/api";

export function useConnection(userId: User["id"]) {
  return useQuery({
    queryKey: ["connections", userId],
    queryFn: () => getConnection(userId),
  });
}
