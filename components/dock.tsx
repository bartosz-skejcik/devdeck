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

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

type Props = {};

function Dock({}: Props) {
    const shortcuts = useStore(useUserPreferences, (state) => state.shortcuts);
    const setNewShortcutModal = useAppStore(
        (state) => state.setNewShortcutModal
    );
    const { currentTab, setCurrentTab } = useAppStore((state) => state);

    const [shortcutsClone, setShortcutsClone] = useState(shortcuts);

    useEffect(() => {
        setShortcutsClone(shortcuts);
    }, [shortcuts]);

    useEffect(() => {
        if (shortcutsClone !== shortcuts) {
            useUserPreferences.setState({ shortcuts: shortcutsClone });
        }
    }, [shortcutsClone]);

    const connections = useStore(
        useUserPreferences,
        (state) => state.connections
    );

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
        if (!shortcutsClone) return;

        const items = Array.from(shortcutsClone);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setShortcutsClone(items);
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
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items" direction="horizontal">
                        {(provided) => (
                            <div
                                className="flex items-center justify-between mx-auto"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {shortcutsClone &&
                                    shortcutsClone.map((item, index) => (
                                        <Draggable
                                            disableInteractiveElementBlocking
                                            key={item.id}
                                            draggableId={
                                                item.url + item.id.toString()
                                            }
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {/* {item.name} */}
                                                    <Shortcut shortcut={item} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
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
