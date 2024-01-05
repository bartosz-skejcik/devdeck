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
    setNewsSettingsModal: (newsSettingsModal: boolean) => void;
    setLayoutSettingsModal: (layoutSettingsModal: boolean) => void;
    setAccountConnectionsModal: (accountConnectionsModal: boolean) => void;
};

const INITIAL_STATE: IApp = {
    currentlyReadArticle: null,
    currentTab: Tab.home,
    editedShortcut: null,
    newShortcutModal: false,
    editShortcutModal: false,
    wallpaperChangeModal: false,
    newsSettingsModal: false,
    layoutSettingsModal: false,
    accountConnectionsModal: false,
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
    setNewsSettingsModal: (newsSettingsModal) => set({ newsSettingsModal }),
    setLayoutSettingsModal: (layoutSettingsModal) =>
        set({ layoutSettingsModal }),
    setAccountConnectionsModal: (accountConnectionsModal) =>
        set({ accountConnectionsModal }),
}));
