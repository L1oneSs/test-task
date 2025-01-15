import { useQuery } from "@tanstack/react-query";
import ListService from "@/services/listService";
import { IGitHubResponse } from "@/interfaces/IRepo";

interface UseListParams {
  query?: string;
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
}

export const useList = (params: UseListParams = {}) => {
  const { data, isLoading, error } = useQuery<IGitHubResponse>({
    queryKey: ["repositories", params.page],
    queryFn: async () => {
      const response = await ListService.getRepositories(params);
      return response.data;
    },
  });

  const hasMore = (data?.items.length ?? 0) > 0;

  return {
    repositories: data?.items || [],
    isLoading,
    error,
    hasMore,
  };
};
