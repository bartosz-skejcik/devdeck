"use client";

import Articles from "@/components/articles";
import Atlassian from "@/components/atlassian";
import Dock from "@/components/dock";
import Home from "@/components/home";
import {
    AccountConnectionsModal,
    ArticleReadModal,
    DisplaySettingsModal,
    NewsSettingsModal,
    EditShortcutModal,
    ChangeWallpaperModal,
    NewShortcutModal,
} from "@/components/modals";
import Search from "@/components/search";
import useStore from "@/hooks/use-store";
import { useAppStore } from "@/stores/app-store";
import { useUserPreferences } from "@/stores/user-preferences";
import { BackgroundBlur } from "@/types.d";
import clsx from "clsx";

export default function Page() {
    const currentTab = useStore(useAppStore, (state) => state.currentTab);
    const wallpaper = useStore(useUserPreferences, (state) => state.wallpaper);
    const backgroundBlur = useStore(
        useUserPreferences,
        (state) => state.backgroundBlur
    );
    const searchEnabled = useStore(
        useUserPreferences,
        (state) => state.searchEnabled
    );

    return (
        <>
            <AccountConnectionsModal />
            <DisplaySettingsModal />
            <NewsSettingsModal />
            <ArticleReadModal />
            <EditShortcutModal />
            <ChangeWallpaperModal />
            <NewShortcutModal />
            <div
                className={clsx(
                    "absolute inset-0 z-0 w-full h-full opacity-25 dark:opacity-10 bg-center bg-no-repeat bg-cover",
                    backgroundBlur == BackgroundBlur.none
                        ? ""
                        : backgroundBlur == BackgroundBlur.low
                        ? "blur-[2px]"
                        : backgroundBlur == BackgroundBlur.medium
                        ? "blur-sm"
                        : backgroundBlur == BackgroundBlur.high
                        ? "blur-md"
                        : ""
                )}
                style={
                    wallpaper
                        ? {
                              backgroundImage: `url(${wallpaper})`,
                          }
                        : {}
                }
            />
            <section className="relative z-10 flex flex-col items-center justify-end w-screen h-screen gap-6 p-10 bg-center bg-cover">
                <Dock />
                {currentTab == "home" && <Home />}
                {currentTab == "atlassian" && <Atlassian />}
                {currentTab == "news" && <Articles />}
                {searchEnabled && <Search />}
            </section>
            {/* <Toaster /> */}
        </>
    );
}
