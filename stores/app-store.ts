import { create } from "zustand";

import { IApp, Shortcut, Tab } from "@/types.d";

type Actions = {
    setNewShortcutModal: (newShortcutModal: boolean) => void;
    setEditShortcutModal: (
        editShortcutModal: boolean,
        editedShortcut: Shortcut | null
    ) => void;
    setWallpaperChangeModal: (wallpaperChangeModal: boolean) => void;
    setCurrentTab: (currentTab: Tab) => void;
    setCurrentReadArticle: (
        currentlyReadArticle: IApp["currentlyReadArticle"]
    ) => void;
};

const INITIAL_STATE: IApp = {
    currentlyReadArticle: null,
    currentTab: Tab.home,
    editedShortcut: null,
    newShortcutModal: false,
    editShortcutModal: false,
    wallpaperChangeModal: false,
};

export const useAppStore = create<IApp & Actions>((set) => ({
    ...INITIAL_STATE,
    setNewShortcutModal: (newShortcutModal) => set({ newShortcutModal }),
    setEditShortcutModal: (editShortcutModal, editedShortcut) => {
        set({ editShortcutModal, editedShortcut });
    },
    setWallpaperChangeModal: (wallpaperChangeModal) =>
        set({ wallpaperChangeModal }),
    setCurrentTab: (currentTab) => set({ currentTab }),
    setCurrentReadArticle: (currentlyReadArticle) =>
        set({ currentlyReadArticle }),
}));
