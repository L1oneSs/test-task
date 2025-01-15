export interface IGitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export interface IGitHubResponse {
  total_count: number;
  incomplete_results: boolean;
  items: IGitHubRepo[];
}
