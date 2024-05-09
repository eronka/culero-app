import { useMutation, useQuery } from "@tanstack/react-query";
import { RegenerateCodeInput, regenerateCode } from "../utils/api";

export function useRegenerateCode() {
  return useMutation({
    mutationFn: (data: RegenerateCodeInput) => regenerateCode(data),
  });
}
