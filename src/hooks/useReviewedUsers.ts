import { useQuery } from "@tanstack/react-query";
import { getReviewdUsers } from "../utils/api";

export function useReviewedUsers() {
  return useQuery({
    queryKey: ["reviews-posted"],
    queryFn: () => getReviewdUsers(),
  });
}
