import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Shortcut } from "@/types.d";
import { Edit, Trash } from "lucide-react";
import { useUserPreferences } from "@/stores/user-preferences";
import { useToast } from "@/components/ui/use-toast";
import { useAppStore } from "@/stores/app-store";

type Props = {
    shortcut: Shortcut;
};

function Shortcut({ shortcut }: Props) {
    const { toast } = useToast();

    const setEditShortcutModal = useAppStore(
        (state) => state.setEditShortcutModal
    );

    const deleteShortcut = useUserPreferences((state) => state.removeShortcut);

    function handleDelete() {
        try {
            deleteShortcut(shortcut);
        } catch (error: any) {
            toast({
                title: "🚨 Error",
                description: error.message,
            });
        }
    }

    function handleEdit() {
        setEditShortcutModal(true, shortcut);
    }

    return (
        <TooltipProvider delayDuration={125}>
            <ContextMenu>
                <Tooltip>
                    <TooltipTrigger>
                        <ContextMenuTrigger className="group" asChild>
                            <Button
                                id={shortcut.id == 1 ? "shortcut-initial" : ""}
                                variant="outline"
                                size="icon"
                                className="mx-3"
                                onClick={() => {
                                    // we use button instead of a link couse of the drag and drop feature
                                    window.location.href = shortcut.url;
                                }}
                            >
                                <Image
                                    src={shortcut.icon}
                                    width={256}
                                    height={256}
                                    alt={shortcut.url}
                                    className="w-6 h-6"
                                />
                            </Button>
                        </ContextMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="px-3 py-1">
                        <span className="text-xs">{shortcut.name}</span>
                    </TooltipContent>
                </Tooltip>
                <ContextMenuContent>
                    <ContextMenuItem
                        className="flex items-center justify-start text-primary"
                        onClick={handleDelete}
                    >
                        <Trash size={14} className="mr-2" />
                        <span className="text-xs">Delete</span>
                    </ContextMenuItem>
                    <ContextMenuItem
                        className="flex items-center justify-start"
                        onClick={handleEdit}
                    >
                        <Edit size={14} className="mr-2" />
                        <span className="text-xs">Edit</span>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </TooltipProvider>
    );
}

export default Shortcut;
