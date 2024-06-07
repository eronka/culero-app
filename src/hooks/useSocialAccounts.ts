import { useQuery } from "@tanstack/react-query";
import { authorizedFetch, baseUrl } from "../utils/api";
import { SocialAccount } from "../types/SocialAccount";

const getSocialAccounts = (): Promise<SocialAccount[]> => {
  return authorizedFetch(`${baseUrl}/auth/social-accounts`, { method: "GET" });
};

export function useSocialAccounts() {
  return useQuery({
    queryKey: ["social-accounts"],
    queryFn: () => getSocialAccounts(),
  });
}
