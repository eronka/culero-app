import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../utils/api";
import { Review } from "../types/Review";

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      ratedUserId,
      reviewId,
    }: {
      ratedUserId: string;
      reviewId: string;
    }) => deleteReview(reviewId),

    onMutate: async ({ ratedUserId, reviewId }) => {
      await queryClient.cancelQueries({ queryKey: ["my-review", ratedUserId] });

      // Snapshot the previous value
      const previousReview = queryClient.getQueriesData({
        queryKey: ["my-review", ratedUserId],
      });

      queryClient.setQueryData(["my-review", ratedUserId], null);
      queryClient.setQueryData(
        ["reviews", { postedToId: ratedUserId }],
        (old: Review[]) => old.filter((old) => old.id !== reviewId)
      );
      queryClient.setQueryData(["given-reviews"], (old: Review[]) =>
        old ? old.filter((old) => old.id !== reviewId) : []
      );

      return { previousReview };
    },
    onSettled: async (data, error, variables) => {
      return await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["my-review", variables.ratedUserId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["reviews", { postedToId: variables.ratedUserId }],
        }),
        queryClient.invalidateQueries({
          queryKey: ["rating-avg", variables.ratedUserId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["given-reviews"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["reviews-posted"],
        }),
      ]);
    },
  });
}
