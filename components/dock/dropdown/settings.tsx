// UI
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Icons
import {
    Filter,
    Image as ImageIcon,
    LayoutPanelTop,
    Moon,
    Search,
    Settings2,
    Sun,
    User,
} from "lucide-react";

// Stores
import { useAppStore } from "@/stores/app-store";
import { useUserPreferences } from "@/stores/user-preferences";

// Utils
import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import { availableSearchEngines } from "@/db";

type Props = {};

function SettingsDropdown({}: Props) {
    const { setTheme } = useTheme();

    const setSearchEngine = useUserPreferences(
        (state) => state.setSearchEngine
    );
    const searchEngine = useUserPreferences((state) => state.searchEngine);
    const {
        setWallpaperChangeModal,
        setNewsSettingsModal,
        setLayoutSettingsModal,
    } = useAppStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button id="dock-settings" variant="ghost" size="icon">
                    <Settings2 size={24} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="ml-2">Change theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>
                                <button
                                    onClick={() => setTheme("light")}
                                    className="w-full text-start"
                                >
                                    Light
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button
                                    onClick={() => setTheme("dark")}
                                    className="w-full text-start"
                                >
                                    Dark
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button
                                    onClick={() => setTheme("system")}
                                    className="w-full text-start"
                                >
                                    System
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem asChild>
                    <button
                        className="flex items-center w-full gap-2 cursor-pointer text-start"
                        onClick={() => setWallpaperChangeModal(true)}
                    >
                        <ImageIcon size={24} className="h-[1rem] w-[1rem]" />
                        <p>Change background</p>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <button
                        className="flex items-center w-full gap-2 cursor-pointer text-start"
                        onClick={() => setLayoutSettingsModal(true)}
                    >
                        <LayoutPanelTop
                            size={24}
                            className="h-[1rem] w-[1rem]"
                        />
                        <p>Display preferences</p>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <button
                        className="flex items-center w-full gap-2 cursor-pointer text-start"
                        onClick={() => setNewsSettingsModal(true)}
                    >
                        <Filter size={24} className="h-[1rem] w-[1rem]" />
                        <p>News settings</p>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Search size={16} />
                        <span className="ml-2">Search engine</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            {availableSearchEngines.map((engine) => (
                                <DropdownMenuItem
                                    key={engine.name}
                                    className={clsx(
                                        searchEngine.name === engine.name
                                            ? "bg-foreground/5 font-semibold"
                                            : ""
                                    )}
                                >
                                    <button
                                        onClick={() => setSearchEngine(engine)}
                                        className="flex items-center justify-start w-full gap-2 text-start"
                                    >
                                        <Image
                                            alt={engine.name}
                                            width={32}
                                            height={32}
                                            src={engine.icon}
                                            className="h-[1rem] w-[1rem] rounded-full"
                                        />
                                        <p>{engine.name}</p>
                                    </button>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SettingsDropdown;
