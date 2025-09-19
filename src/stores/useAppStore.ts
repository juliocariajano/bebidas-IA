import {create} from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { createFavoritesSlice, type FavoriteSliceType } from './favoritesSlice'

export const useAppStore = create<RecipesSliceType & FavoriteSliceType>()(devtools ((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a)
})))