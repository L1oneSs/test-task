import axios from "axios";
import { IGitHubResponse } from "@/interfaces/IRepo";
class ListService {
  private baseURL = "https://api.github.com/search/repositories";

  async getRepositories(params: {
    query?: string;
    sort?: string;
    order?: "asc" | "desc";
    page?: number;
  }) {
    const {
      query = "javascript",
      sort = "stars",
      order = "asc",
      page = 1,
    } = params;

    const url = `${this.baseURL}?q=${query}&sort=${sort}&order=${order}&page=${page}`;
    return axios.get<IGitHubResponse>(url);
  }
}

export default new ListService();
