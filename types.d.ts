// User Preferences

import { Article } from "./types/article";

export type Shortcut = {
    name: string;
    url: string;
    icon: string;
};

export enum BackgroundBlur {
    none = 1,
    low = 5,
    medium = 10,
    high = 15,
}

export type SearchEngine = {
    name: string;
    baseUrl: string;
    icon: string;
};

export interface IUserPreferences {
    searchEngine: SearchEngine;
    shortcuts: Shortcut[];
    wallpaper?: string;
    backgroundBlur: BackgroundBlur;
}

// App

export interface IApp {
    currentlyReadArticle: Article | null;
    currentTab: Tab;
    editedShortcut: Shortcut | null;
    newShortcutModal: boolean;
    editShortcutModal: boolean;
    wallpaperChangeModal: boolean;
}

export enum Tab {
    home = "home",
    news = "news",
}
