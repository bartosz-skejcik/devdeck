"use client";

import Articles from "@/components/articles";
import Dock from "@/components/dock";
import Home from "@/components/home";
import ArticleReadModal from "@/components/modals/article-read";
import NewsSettingsModal from "@/components/modals/news-settings";
import EditShortcutModal from "@/components/modals/shortcut-edit";
import { NewShortcutModal } from "@/components/modals/shortcut-new";
import ChangeWallpaperModal from "@/components/modals/wallpaper-change";
import Search from "@/components/search";
import { Toaster } from "@/components/ui/toaster";
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

    return (
        <>
            <NewsSettingsModal />
            <ArticleReadModal />
            <EditShortcutModal />
            <ChangeWallpaperModal />
            <NewShortcutModal />
            <div
                className={clsx(
                    "absolute inset-0 z-0 w-full h-full opacity-25 dark:opacity-10",
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
                {currentTab == "home" && <Home />}
                {currentTab == "news" && <Articles />}
                <Search />
                <Dock />
            </section>
            {/* <Toaster /> */}
        </>
    );
}
