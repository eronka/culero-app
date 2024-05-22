import { useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { getUserAvgRatings } from "../utils/api";

export function useUserRatings(userId: User["id"]) {
  return useQuery({
    queryKey: ["connection-avg", userId],
    queryFn: () => getUserAvgRatings(userId),
  });
}
