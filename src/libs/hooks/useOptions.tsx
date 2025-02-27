import { TSelectOption } from "@/types/form";
import { useCallback, useEffect, useState } from "react";

export const useOptions = (
  fetcher: () => Promise<IServerActionResponse<string | TSelectOption[]>>,
) => {
  const [options, setOptions] = useState<TSelectOption[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOptions = useCallback(async () => {
    try {
      setLoading(true);

      const { success, data } = await fetcher();

      if (success && Array.isArray(data)) {
        setOptions(data);
      }
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return { options, loading };
};
