import { useQuery } from "@tanstack/react-query";
import { getSuggestedForReviewConnections } from "../utils/api";

export function useSuggestedForReviewConnections() {
  return useQuery({
    queryKey: ["suggested-connections"],
    queryFn: () => getSuggestedForReviewConnections(),
  });
}
