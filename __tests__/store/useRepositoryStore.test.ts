import { renderHook, act } from "@testing-library/react";
import { useRepositoryStore } from "@/store/use-repository-store";

describe("Repository Store", () => {
  beforeEach(() => {
    useRepositoryStore.getState().setRepositories([]);
  });

  test("should add repositories", () => {
    const { result } = renderHook(() => useRepositoryStore());

    act(() => {
      result.current.setRepositories([{ id: 1, name: "test-repo" } as any]);
    });

    expect(result.current.repositories).toHaveLength(1);
  });
});
