import { useMemo } from "react";
import { Rating } from "../types/Rating";

export function useAvgRating(rating: Rating) {
  return useMemo(() => {
    return (
      (rating.communication + rating.professionalism + rating.reliability) / 3
    );
  }, [rating.communication, rating.professionalism, rating.reliability]);
}
