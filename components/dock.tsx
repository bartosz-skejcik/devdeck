"use client";

import { Button } from "@/components/ui/button";
import { Home, Newspaper, Plus } from "lucide-react";
import Settings from "@/components/dock/settings";
import { useUserPreferences } from "@/stores/user-preferences";
import { useAppStore } from "@/stores/app-store";
import useStore from "@/hooks/use-store";
import Shortcut from "@/components/shortcut";
import ShortcutSkeleton from "./shortcut/skeleton";
import { Tab } from "@/types.d";

type Props = {};

function Dock({}: Props) {
    const shortcuts = useStore(useUserPreferences, (state) => state.shortcuts);
    const setNewShortcutModal = useAppStore(
        (state) => state.setNewShortcutModal
    );
    const { currentTab, setCurrentTab } = useAppStore((state) => state);
    return (
        <div className="flex items-center w-full p-2 border rounded-lg border-border justify-evenly bg-background text-foreground">
            <div className="flex items-center justify-start w-1/5 gap-3">
                <Button variant="ghost" size="icon">
                    <Home
                        onClick={() => {
                            setCurrentTab && setCurrentTab(Tab.home);
                        }}
                        size={24}
                        className={currentTab == "home" ? "text-primary" : ""}
                    />
                </Button>
                <Button variant="ghost" size="icon">
                    <Newspaper
                        onClick={() => {
                            setCurrentTab && setCurrentTab(Tab.news);
                        }}
                        size={24}
                        className={currentTab == "news" ? "text-primary" : ""}
                    />
                </Button>
            </div>
            <div className="flex items-center justify-between gap-6 mx-auto">
                {shortcuts ? (
                    shortcuts.map((shortcut, index) => (
                        <Shortcut key={index} shortcut={shortcut} />
                    ))
                ) : (
                    <ShortcutSkeleton />
                )}
                <Button
                    onClick={() => {
                        setNewShortcutModal(true);
                    }}
                    variant="secondary"
                    size="icon"
                >
                    <Plus size={24} />
                </Button>
            </div>
            <Settings />
        </div>
    );
}

export default Dock;
