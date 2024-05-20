import { useQuery } from "@tanstack/react-query";
import { getSelfAvgRatings } from "../utils/api";

export function useSelfRatings() {
  return useQuery({
    queryKey: ["self-rating"],
    queryFn: () => getSelfAvgRatings(),
  });
}
