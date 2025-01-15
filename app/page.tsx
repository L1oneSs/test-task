"use client";

import { useState, useRef, useEffect } from "react";
import { useList } from "@/hooks/use-list";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import styles from "./main.module.scss";
import { useRepositoryStore } from "@/store/use-repository-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";
import { StarIcon, CodeIcon, LinkIcon } from "lucide-react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRepo, setEditingRepo] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [newName, setNewName] = useState("");
  const observerTarget = useRef(null);

  const {
    repositories: fetchedRepos,
    isLoading,
    error,
    hasMore,
  } = useList({ page });
  const { repositories, setRepositories, deleteRepository, updateRepository } =
    useRepositoryStore();

  useEffect(() => {
    if (fetchedRepos.length) {
      setRepositories([...repositories, ...fetchedRepos]);
    }
  }, [fetchedRepos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const handleEdit = (repo: { id: number; name: string }) => {
    setEditingRepo(repo);
    setNewName(repo.name);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingRepo && newName.trim()) {
      updateRepository(editingRepo.id, { name: newName.trim() });
      setIsEditing(false);
      setEditingRepo(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {repositories.map((repo) => (
          <Card key={repo.id} className={styles.card}>
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
              <CardDescription>{repo.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.repoInfo}>
                <div className={styles.repoInfo__item}>
                  <StarIcon className={styles.icon} />
                  <span>{repo.stargazers_count}</span>
                </div>
                {repo.language && (
                  <div className={styles.repoInfo__item}>
                    <CodeIcon className={styles.icon} />
                    <span>{repo.language}</span>
                  </div>
                )}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.repoInfo__link}
                >
                  <LinkIcon className={styles.icon} />
                  <span>View on GitHub</span>
                </a>
              </div>
            </CardContent>
            <CardFooter className={styles.actions}>
              <button onClick={() => deleteRepository(repo.id)}>Delete</button>
              <button onClick={() => handleEdit(repo)}>Rename Repo</button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {isLoading && (
        <div className={styles.loader}>
          <BeatLoader color="#36d7b7" />
        </div>
      )}

      <div ref={observerTarget} />

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Repository Name</DialogTitle>
          </DialogHeader>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
          />
          <div className={styles.dialogActions}>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
