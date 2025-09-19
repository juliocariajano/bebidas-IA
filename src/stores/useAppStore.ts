import {create} from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipesSliceType, createRecipesSlice } from './recipeSlice'
import { createFavoritesSlice, type FavoriteSliceType } from './favoritesSlice'
import { createNotificationsSlice, type NotificationsSliceType } from './notificationsSlice'

// Tipo unificado del store
export type AppStore = RecipesSliceType & FavoriteSliceType & NotificationsSliceType;

export const useAppStore = create<AppStore>()(
  devtools((...args) => ({
    // Defensivo: primero notificaciones (por si otro slice usa showNotification en runtime)
    ...createNotificationsSlice(...args),
    ...createRecipesSlice(...args),
    ...createFavoritesSlice(...args),
  }), { name: "app-store" })
);