// User Preferences

import { Article } from "./types/article";

export interface IUserTag extends ITag {
    followed: boolean;
}

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

export interface IConnection {
    apiKey?: string;
    stateHash?: string;
    name: string;
    email: string;
    organizationDomain?: string;
}
export interface IUserPreferences {
    searchEngine: SearchEngine;
    shortcuts: Shortcut[];
    wallpaper?: string;
    backgroundBlur: BackgroundBlur;
    filterTags: IUserTag[];
    searchEnabled: boolean;
    connections: IConnection[];
}

// App

export interface IApp {
    currentlyReadArticle: Article | null;
    currentTab: Tab;
    editedShortcut: Shortcut | null;
    newShortcutModal: boolean;
    editShortcutModal: boolean;
    wallpaperChangeModal: boolean;
    newsSettingsModal: boolean;
    layoutSettingsModal: boolean;
    accountConnectionsModal: boolean;
}

export enum Tab {
    home = "home",
    news = "news",
    atlassian = "atlassian",
}

// API
export interface ITag {
    id: number;
    name: string;
    bg_color_hex: string;
    text_color_hex: string;
}
