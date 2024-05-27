import { useQuery } from "@tanstack/react-query";
import { getReviewsPostedByMe } from "../utils/api";

export function useGivenReviews() {
  return useQuery({
    queryKey: ["given-reviews"],
    queryFn: () => getReviewsPostedByMe(),
  });
}
