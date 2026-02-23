import { createContext } from "react";
import type { Notice } from "../services/types/notices";

export interface FavoritesContextType {
  favorites: Notice[];
  addFavorite: (notice: Notice) => void;
  removeFavorite: (id: string) => void;
}

export const FavoritesContext =
  createContext<FavoritesContextType | null>(null);