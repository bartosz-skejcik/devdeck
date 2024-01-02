import { create } from "zustand";

import { persist } from "zustand/middleware";

import {
    BackgroundBlur,
    IUserPreferences,
    IUserTag,
    SearchEngine,
    Shortcut,
} from "@/types.d";

type Actions = {
    setSearchEngine: (searchEngine: SearchEngine) => void;
    removeShortcut: (shortcut: Shortcut) => void;
    addShortcut: (shortcut: Shortcut) => void;
    editShortcut: (
        shortcut: Shortcut,
        currentlyEditedShortcut: Shortcut
    ) => void;
    changeShortcutIndex: (from: number, to: number) => void;
    changeWallpaper: (wallpaper: string, blurLevel?: BackgroundBlur) => void;
    deleteWallpaper: () => void;
    deleteTag: (tag: IUserTag) => void;
    addTag: (tag: IUserTag) => void;
};

const INITIAL_STATE: IUserPreferences = {
    searchEngine: {
        name: "Google",
        baseUrl: "https://www.google.com/search?q=",
        icon: "https://www.google.com/favicon.ico",
    },
    shortcuts: [],
    wallpaper: "",
    backgroundBlur: BackgroundBlur.none,
    filterTags: [],
};

export const useUserPreferences = create<IUserPreferences & Actions>()(
    persist(
        (set, get) => ({
            ...INITIAL_STATE,
            setSearchEngine: (searchEngine: SearchEngine) => {
                set({ searchEngine });
            },
            addShortcut: (shortcut: Shortcut) => {
                const exists = get().shortcuts.some(
                    (s) => s.url === shortcut.url
                );

                if (exists) {
                    throw new Error("Shortcut already exists");
                } else {
                    set({ shortcuts: [...get().shortcuts, shortcut] });
                }
            },
            removeShortcut: (shortcut: Shortcut) => {
                // check if shortcut exists
                const exists = get().shortcuts.some(
                    (s) => s.url === shortcut.url
                );

                if (exists) {
                    set({
                        shortcuts: get().shortcuts.filter(
                            (s) => s.url !== shortcut.url
                        ),
                    });
                } else {
                    throw new Error("Shortcut does not exist");
                }
            },
            editShortcut: (
                newShortcut: Shortcut,
                currentlyEditedShortcut: Shortcut
            ) => {
                const exists = get().shortcuts.some(
                    (s) => s.url === currentlyEditedShortcut.url
                );

                if (exists) {
                    const newShortcutCollidesButNotWithItself =
                        get().shortcuts.some(
                            (s) =>
                                s.url === newShortcut.url &&
                                s.url !== currentlyEditedShortcut.url
                        );

                    if (newShortcutCollidesButNotWithItself) {
                        throw new Error("Shortcut already exists");
                    } else {
                        // we want to swap the shortcut's name and icon
                        // with the new shortcut's name and icon
                        const shortcuts = get().shortcuts.map((shortcut) => {
                            if (shortcut.url === currentlyEditedShortcut.url) {
                                return newShortcut;
                            } else {
                                return shortcut;
                            }
                        });

                        set({ shortcuts });
                    }
                } else {
                    throw new Error("Shortcut does not exist");
                }
            },
            changeShortcutIndex: (from: number, to: number) => {
                const shortcuts = get().shortcuts;
                const shortcut = shortcuts[from];

                shortcuts.splice(from, 1);
                shortcuts.splice(to, 0, shortcut);

                set({ shortcuts: [...shortcuts] });
            },
            changeWallpaper: (
                wallpaper: string,
                blurLevel?: BackgroundBlur
            ) => {
                if (blurLevel) {
                    set({ wallpaper, backgroundBlur: blurLevel });
                } else {
                    set({ wallpaper });
                }
            },
            deleteWallpaper: () => {
                set({ wallpaper: "" });
            },
            deleteTag: (tag: IUserTag) => {
                const exists = get().filterTags.some(
                    (t) => t.name === tag.name
                );

                if (exists) {
                    set({
                        filterTags: get().filterTags.filter(
                            (t) => t.name !== tag.name
                        ),
                    });
                } else {
                    throw new Error("Tag does not exist");
                }
            },
            addTag: (tag: IUserTag) => {
                const exists = get().filterTags.some(
                    (t) => t.name === tag.name
                );

                if (exists) {
                    throw new Error("Tag already exists");
                } else {
                    set({ filterTags: [...get().filterTags, tag] });
                }
            },
        }),
        {
            name: "user-preferences",
        }
    )
);
