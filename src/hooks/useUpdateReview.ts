import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendReviewData, sendReview, updateReview } from "../utils/api";
import { useUser } from "./useUser";
import { Review, ReviewState } from "../types/Review";

export function useUpdateReview() {
  const queryClient = useQueryClient();
  const user = useUser()!;
  return useMutation({
    retry: false,
    mutationFn: ({
      ratedUserId,
      reviewId,
      data,
    }: {
      ratedUserId: string;
      reviewId: string;
      data: SendReviewData;
    }) => {
      console.log("IN MUTATION SEND", data);
      return updateReview(reviewId, {
        comment: data.comment,
        communication: data.communication,
        professionalism: data.professionalism,
        reliability: data.reliability,
        anonymous: data.anonymous,
      });
    },

    onMutate: async ({ ratedUserId, data, reviewId }) => {
      await queryClient.cancelQueries({ queryKey: ["my-review", ratedUserId] });

      // Snapshot the previous value
      const previousReview = queryClient.getQueriesData({
        queryKey: ["my-review", ratedUserId],
      });

      const review = {
        isAnonymous: data.anonymous,
        professionalism: data.professionalism,
        communication: data.communication,
        reliability: data.reliability,
        comment: data.comment,
        id: reviewId,
        createdAt: new Date().toDateString(),
        postedToId: ratedUserId,
        isOwnReview: true,
        isFavorite: true,
        state: ReviewState.APPROVED,
        postedBy: data.anonymous
          ? undefined
          : {
              name: user.name,
              profilePictureUrl: user.profilePictureUrl,
              isEmailVerified: user.isEmailVerified,
              id: user.id,
            },
      };

      queryClient.setQueryData(["my-review", ratedUserId], review);
      queryClient.setQueryData(
        ["reviews", { postedToId: ratedUserId }],
        (old: Review[]) =>
          old ? old.map((o) => (o.id === reviewId ? review : o)) : [review]
      );
      queryClient.setQueryData(["given-reviews"], (old: Review[]) =>
        old ? old.map((o) => (o.id === reviewId ? review : o)) : [review]
      );
      return { previousReview };
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-review", variables.ratedUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviews", { postedToId: variables.ratedUserId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["rating-avg", variables.ratedUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["given-reviews"],
      });
    },
  });
}
