import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserSettingsData, updateUserSettings } from "../utils/api";

export function useUpdateUserSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserSettingsData) => updateUserSettings(data),
    mutationKey: ["user-settings"],
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["user-settings"] });

      const prevData = queryClient.getQueriesData({
        queryKey: ["user-settings"],
      });

      console.log("MUTATE WITH ", data);
      queryClient.setQueryData(["user-settings"], (old: any) => ({
        ...old,
        ...data,
      }));
      return { prevData };
    },
  });
}
