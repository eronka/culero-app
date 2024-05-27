import { useQuery } from "@tanstack/react-query";
import { getMyReviewForUser } from "../utils/api";

export function useMyReviewForUser(userId: string) {
  console.log("get query for ", userId);
  return useQuery({
    retry: false,
    queryKey: ["my-review", userId],
    queryFn: () => getMyReviewForUser(userId),
  });
}
