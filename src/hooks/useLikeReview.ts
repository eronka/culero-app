import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeReview } from "../utils/api";
import { Review } from "../types/Review";

export function useLikeReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      postedToId,
    }: {
      reviewId: string;
      postedToId: string;
    }) => likeReview(reviewId),
    onMutate: async ({ reviewId, postedToId }) => {
      console.log("in mutate", reviewId, postedToId);

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["reviews"] });
      await queryClient.cancelQueries({ queryKey: ["latest-reviews"] });
      console.log(queryClient.getQueryData(["latest-reviews"]));

      // Snapshot the previous value
      const previousReviews = queryClient.getQueriesData({
        queryKey: ["reviews", { postedToId }],
      });

      // Optimistically update to the new value
      queryClient.setQueryData(["reviews", { postedToId }], (old: Review[]) =>
        old.map((review) => {
          console.log("old review", review);
          return review.id === reviewId
            ? { ...review, isFavorite: true }
            : review;
        })
      );
      console.log("here");

      queryClient.setQueryData(["latest-reviews"], (old: Review[]) =>
        old.map((review) => {
          console.log("old review", review);
          return review.id === reviewId
            ? { ...review, isFavorite: true }
            : review;
        })
      );

      // Return a context with the previous and new values
      return { previousReviews };
    },

    onSettled: (review) => {
      if (review) {
        queryClient.invalidateQueries({
          queryKey: ["reviews", { postedToId: review.postedToId }],
        });
        queryClient.invalidateQueries({
          queryKey: ["latest-reviews"],
        });
      }
    },
  });
}
