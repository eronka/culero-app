import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectWithUser, likeReview, unconnectWithUser } from "../utils/api";
import { Review } from "../types/Review";
import { Connection } from "../types";

export function useUnconnectWithUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: Connection["id"]) => unconnectWithUser(userId),
    onMutate: async (userId) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["reviews"] });

      // Snapshot the previous value
      const previousConnections = queryClient.getQueriesData({
        queryKey: ["connections", userId],
      });

      // Optimistically update to the new value
      queryClient.setQueryData(["connections", userId], (old: Connection) => ({
        ...old,
        isConnection: false,
      }));

      return { previousConnections };
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["connections"],
      });
    },
  });
}
