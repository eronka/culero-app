import { useQuery } from "@tanstack/react-query";
import { getSelfReviews } from "../utils/api";

export function useSelfReviews() {
  return useQuery({
    queryFn: () => getSelfReviews(),
    queryKey: ["self-reviews"],
  });
}
