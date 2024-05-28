import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SendReviewData, sendReview } from "../utils/api";
import { useUser } from "./useUser";
import { ReviewState } from "../types/Review";

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

      queryClient.setQueryData(["review", ratedUserId], {
        isAnonymous: data.anonymous,
        professionalism: data.professionalism,
        communication: data.communication,
        reliability: data.reliability,
        comment: data.comment,

        createdAt: new Date().toDateString(),
        postedToId: ratedUserId,
        isOwnReview: true,
        isFavorite: true,
        state: ReviewState.PENDING,
        postedBy: data.anonymous
          ? undefined
          : {
              name: user.name,
              profilePictureUrl: user.profilePictureUrl,
              isEmailVerified: user.isEmailVerified,
              id: user.id,
            },
      });

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
  });
}
