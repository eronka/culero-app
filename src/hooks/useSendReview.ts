import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendReviewData, sendReview } from "../utils/api";
import { useUser } from "./useUser";
import { Review, ReviewState } from "../types/Review";

export function useSendReview() {
  const queryClient = useQueryClient();
  const user = useUser()!;
  return useMutation({
    mutationFn: ({
      ratedUserId,
      data,
    }: {
      ratedUserId: string;
      data: SendReviewData;
    }) => sendReview(ratedUserId, data),

    onMutate: async ({ ratedUserId, data }) => {
      await queryClient.cancelQueries({ queryKey: ["review", ratedUserId] });

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
        (old: Review[]) => (old ? [review, ...old] : [])
      );
      queryClient.setQueryData(["given-reviews"], (old: Review[]) =>
        old ? [review, ...old] : [review]
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
      queryClient.invalidateQueries({
        queryKey: ["reviews-posted"],
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
}
