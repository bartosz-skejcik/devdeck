import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Button } from "../ui/button";
import Link from "next/link";
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
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Button asChild variant="outline" size="icon">
                    <Link
                        href={shortcut.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src={shortcut.icon}
                            width={256}
                            height={256}
                            alt={shortcut.url}
                            className="w-6 h-6"
                        />
                    </Link>
                </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem
                    className="flex items-center justify-start text-primary"
                    onClick={handleDelete}
                >
                    <Trash size={16} className="mr-2" />
                    <span>Usuń</span>
                </ContextMenuItem>
                <ContextMenuItem
                    className="flex items-center justify-start"
                    onClick={handleEdit}
                >
                    <Edit size={16} className="mr-2" />
                    <span>Edytuj</span>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default Shortcut;
