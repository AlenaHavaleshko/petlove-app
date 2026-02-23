import { useEffect, useState } from "react";
import type { Notice } from "../services/types/notices";
import { fetchFavorites } from "../services/api/notices";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Notice[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("petlove_token");
    if (!token) return;

    fetchFavorites()
      .then((data) => {
        setFavorites(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  }, []);

  const addFavorite = (notice: Notice) => {
    setFavorites((prev) => {
      if (prev.some((f) => f._id === notice._id)) return prev;
      return [...prev, notice];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
