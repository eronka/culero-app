import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlikeReview } from "../utils/api";
import { Review } from "../types/Review";

export function useUnlikeReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      postedToId,
    }: {
      reviewId: string;
      postedToId: string;
    }) => unlikeReview(reviewId),
    onMutate: async ({ reviewId, postedToId }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["reviews"] });

      // Snapshot the previous value
      const previousReviews = queryClient.getQueriesData({
        queryKey: ["reviews", { postedToId }],
      });

      // Optimistically update to the new value
      queryClient.setQueryData(["reviews", { postedToId }], (old: Review[]) =>
        old.map((review) =>
          review.id === reviewId ? { ...review, isFavorite: false } : review
        )
      );

      // Return a context with the previous and new values
      return { previousReviews };
    },

    onSettled: (review) => {
      if (review) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", { postedToId: review.postedToId }],
        });
      }
    },
  });
}
