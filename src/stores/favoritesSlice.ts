import { StateCreator } from "zustand";
import type { Recipe } from "../types";

export type FavoriteSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists:(id: Recipe['idDrink']) => boolean;
};

export const createFavoritesSlice: StateCreator<FavoriteSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
    } else {
      //II Forma
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      //I Forma
      // set({
      // favorites:[...get().favorites, recipe]
      // })
    }
  },
  favoriteExists:(id)=>{
    return get().favorites.some((favorite) => favorite.idDrink === id)
  }

});
