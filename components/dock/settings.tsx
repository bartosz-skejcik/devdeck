"use client";

// UI
import { Button } from "@/components/ui/button";
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
import { useAppStore } from "@/stores/app-store";

// Icons
import {
    Filter,
    Image as ImageIcon,
    Moon,
    Settings2,
    Sun,
    User,
} from "lucide-react";
import { useTheme } from "next-themes";

type Props = {};

function Settings({}: Props) {
    const { setTheme } = useTheme();

    const { setWallpaperChangeModal, setNewsSettingsModal } = useAppStore();

    return (
        <div className="flex items-center justify-end w-1/5 gap-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Settings2 size={24} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                            <ImageIcon
                                size={24}
                                className="h-[1rem] w-[1rem]"
                            />
                            <p>Change background</p>
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
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="flex items-center gap-2">
                <User size={24} />
                <p>Bartek Paczesny</p>
            </Button>
        </div>
    );
}

export default Settings;
