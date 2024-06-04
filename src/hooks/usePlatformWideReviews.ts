import { useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { getPlatformWideReviews } from "../utils/api";

export function usePlatformWideReviews() {
  return useQuery({
    queryKey: ["latest-reviews"],
    queryFn: () => getPlatformWideReviews(),
    enabled: false,
  });
}
