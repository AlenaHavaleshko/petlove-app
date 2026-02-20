import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Notice } from "../services/types/notices";
import { fetchFavorites } from "../services/api/notices";
import { FavoritesContext } from "./FavoritesContextObject";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Notice[]>([]);

  useEffect(() => {
    // TODO: fetch favorites from backend on mount
    fetchFavorites()
      .then(setFavorites)
      .catch(() => {});
  }, []);

  const addFavorite = (notice: Notice) => {
    setFavorites((prev) => [...prev, notice]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, setFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Вынести useFavorites в отдельный файл FavoritesHooks.tsx
