import { create } from "zustand";
import { IGitHubRepo } from "@/interfaces/IRepo";

interface RepositoryStore {
  repositories: IGitHubRepo[];
  setRepositories: (repos: IGitHubRepo[]) => void;
  deleteRepository: (id: number) => void;
  updateRepository: (id: number, data: Partial<IGitHubRepo>) => void;
}

export const useRepositoryStore = create<RepositoryStore>((set) => ({
  repositories: [],
  setRepositories: (repos) => set({ repositories: repos }),
  deleteRepository: (id) =>
    set((state) => ({
      repositories: state.repositories.filter((repo) => repo.id !== id),
    })),
  updateRepository: (id, data) =>
    set((state) => ({
      repositories: state.repositories.map((repo) =>
        repo.id === id ? { ...repo, ...data } : repo
      ),
    })),
}));
