import { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { createNotificationsSlice, type NotificationsSliceType } from "./notificationsSlice";
import type { RecipesSliceType } from "./recipeSlice";

export type FavoriteSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists:(id: Recipe['idDrink']) => boolean;
  loadFromStorage:()=>void;
};

export type FavoriteSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe['idDrink']) => boolean;
  loadFromStorage: () => void;
};

// Carga segura desde localStorage (evita SSR errors)
const loadFavorites = (): Recipe[] => {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem("favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const createFavoritesSlice:
StateCreator<FavoriteSliceType & RecipesSliceType & NotificationsSliceType, [], [], FavoriteSliceType>
= (set, get) => ({
  favorites: loadFavorites(),

  handleClickFavorite: (recipe) => {
    const exists = get().favoriteExists(recipe.idDrink);

    set((state) => {
      const updated = exists
        ? state.favorites.filter((f) => f.idDrink !== recipe.idDrink)
        : [...state.favorites, recipe];

      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("favorites", JSON.stringify(updated));
        }
      } catch {}

      return { favorites: updated };
    });

    // 👉 usa el método ya presente en el store
    const showNotification = get().showNotification;
    if (showNotification) {
      showNotification({
        text: exists ? "Se eliminó de Favoritos" : "Se agregó a Favoritos",
        error: false,
      });
    }
  },

  favoriteExists: (id) => get().favorites.some((f) => f.idDrink === id),

  loadFromStorage: () => {
    const stored = loadFavorites();
    set({ favorites: stored });
  },
});

