import { PauseCircleIcon } from "@heroicons/react/24/outline";
import { StateCreator } from "zustand";
import type { FavoriteSliceType } from "./favoritesSlice";
import type { RecipesSliceType } from "./recipeSlice";

type Notification ={
    text:string
    error:boolean
    show: boolean
}

export type NotificationsSliceType = {
    notification: Notification
    showNotification:(payload: Pick<Notification, 'text' | 'error'>)=> void
    hideNotification: () => void;
};


export const createNotificationsSlice:
StateCreator<NotificationsSliceType, [], [], NotificationsSliceType>
= (set) => ({
  notification: { text: "", error: false, show: false },

  showNotification: (payload) =>
    set({
      notification: { text: payload.text, error: payload.error, show: true },
    }),

  hideNotification: () =>
    set({
      notification: { text: "", error: false, show: false },
    }),
});
