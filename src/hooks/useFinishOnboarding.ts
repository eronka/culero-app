import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizedFetch, baseUrl } from "../utils/api";
import { User } from "../types";

const finishOnboarding = (): Promise<User> => {
  return authorizedFetch(`${baseUrl}/user/onboard`, { method: "PATCH" });
};

export function useFinishOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: () => finishOnboarding(),
    onSuccess: (result) => {
      queryClient.setQueryData(["user"], result);
    },
  });
}
