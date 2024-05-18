import { useQuery } from "@tanstack/react-query";
import { Connection, User } from "../types";
import { getUser } from "../utils/api";

export function useGetUser(userId: User["id"]) {
  return useQuery({
    queryKey: ["connection", userId],
    queryFn: () => getUser(userId),
  });
}
