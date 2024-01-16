"use client";

import { Button } from "@/components/ui/button";
import { Divide, Home, Newspaper, Plus, Trello } from "lucide-react";
import { useUserPreferences } from "@/stores/user-preferences";
import { useAppStore } from "@/stores/app-store";
import useStore from "@/hooks/use-store";
import Shortcut from "@/components/shortcut";
import ShortcutSkeleton from "../shortcut/skeleton";
import { Tab } from "@/types.d";
import SettingsDropdown from "@/components/dock/dropdown/settings";
import AccountDropdown from "@/components/dock/dropdown/account";

import {
    SortableContainer,
    SortableElement,
    arrayMove,
} from "react-sortable-hoc";

type Props = {};

const SortableItem = SortableElement(({ value }: { value: any }) => (
    <Shortcut shortcut={value} />
));

const SortableList = SortableContainer(({ items }: { items: any }) => {
    return (
        <div className="flex items-center justify-between mx-auto">
            {items.map((value: any, index: number) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    // @ts-ignore
                    value={value}
                />
            ))}
        </div>
    );
});

function Dock({}: Props) {
    const shortcuts = useStore(useUserPreferences, (state) => state.shortcuts);
    const setNewShortcutModal = useAppStore(
        (state) => state.setNewShortcutModal
    );
    const { currentTab, setCurrentTab } = useAppStore((state) => state);

    const connections = useStore(
        useUserPreferences,
        (state) => state.connections
    );

    function handleOnSortEnd({
        oldIndex,
        newIndex,
    }: {
        oldIndex: number;
        newIndex: number;
    }) {
        if (!shortcuts) return;

        const shortcutsClone = [...shortcuts];
        const newShortcuts = arrayMove(shortcutsClone, oldIndex, newIndex);

        useUserPreferences.setState({ shortcuts: newShortcuts });
    }

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
                {connections &&
                    connections.map(
                        (con) =>
                            con.name == "Atlassian" && (
                                <Button
                                    key={con.apiKey}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <Trello
                                        onClick={() => {
                                            setCurrentTab &&
                                                setCurrentTab(Tab.atlassian);
                                        }}
                                        size={24}
                                        className={
                                            currentTab == "atlassian"
                                                ? "text-primary"
                                                : ""
                                        }
                                    />
                                </Button>
                            )
                    )}
            </div>
            <div className="flex items-center justify-between gap-6 mx-auto">
                {shortcuts ? (
                    <SortableList
                        axis="x"
                        // @ts-ignore
                        items={shortcuts}
                        onSortEnd={handleOnSortEnd}
                        pressDelay={100}
                    />
                ) : (
                    <div className="flex items-center justify-between mx-auto">
                        {Array.from(Array(5).keys()).map((i) => (
                            <ShortcutSkeleton key={i} />
                        ))}
                    </div>
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
            <div className="flex items-center justify-end w-1/5 gap-3">
                <SettingsDropdown />
                <AccountDropdown />
            </div>
        </div>
    );
}

export default Dock;
