"use client";

import { Button } from "@/components/ui/button";
import { Home, Newspaper, Plus, Trello } from "lucide-react";
import { useUserPreferences } from "@/stores/user-preferences";
import { useAppStore } from "@/stores/app-store";
import useStore from "@/hooks/use-store";
import Shortcut from "@/components/shortcut";
import ShortcutSkeleton from "./shortcut/skeleton";
import { Tab } from "@/types.d";
import SettingsDropdown from "@/components/dock/dropdown/settings";
import AccountDropdown from "@/components/dock/dropdown/account";

import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props = {};

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

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (!over) return;
        if (!active) return;
        if (!shortcuts) return;

        if (active.id !== over.id) {
            const oldIndex = shortcuts.findIndex(
                (shortcut) => shortcut.id === active.id
            );
            const newIndex = shortcuts.findIndex(
                (shortcut) => shortcut.id === over.id
            );

            const newShortcuts = [...shortcuts];
            newShortcuts.splice(oldIndex, 1);
            newShortcuts.splice(newIndex, 0, shortcuts[oldIndex]);

            useUserPreferences.setState({ shortcuts: newShortcuts });
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                delay: 70,
                tolerance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 70,
                tolerance: 5,
            },
        })
    );

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
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    {shortcuts && (
                        <SortableContext
                            items={shortcuts}
                            strategy={horizontalListSortingStrategy}
                        >
                            {shortcuts ? (
                                shortcuts.map((shortcut, index) => (
                                    <Shortcut key={index} shortcut={shortcut} />
                                ))
                            ) : (
                                <ShortcutSkeleton />
                            )}
                        </SortableContext>
                    )}
                </DndContext>
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
