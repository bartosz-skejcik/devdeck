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
import { useUserPreferences } from "@/stores/user-preferences";
import clsx from "clsx";

// Icons
import {
    Filter,
    Image as ImageIcon,
    Moon,
    Search,
    Settings2,
    Sun,
    User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

type Props = {};

const availableSearchEngines = [
    {
        name: "Google",
        baseUrl: "https://google.com/search?q=",
        icon: "https://www.google.com/favicon.ico",
    },
    // duckduckgo
    {
        name: "DuckDuckGo",
        baseUrl: "https://duckduckgo.com/?q=",
        icon: "https://duckduckgo.com/favicon.ico",
    },
    // Brave
    {
        name: "Brave",
        baseUrl: "https://search.brave.com/search?source=web&q=",
        icon: "https://brave.com/static-assets/images/brave-logo-sans-text.svg",
    },
    // bing
    {
        name: "Bing",
        baseUrl: "https://www.bing.com/search?q=",
        icon: "https://www.bing.com/favicon.ico",
    },
    // yahoo
    {
        name: "Yahoo",
        baseUrl: "https://search.yahoo.com/search?p=",
        icon: "https://search.yahoo.com/favicon.ico",
    },
    // yandex
    {
        name: "Yandex",
        baseUrl: "https://yandex.com/search/?text=",
        icon: "https://yandex.com/favicon.ico",
    },
    // baidu
    {
        name: "Baidu",
        baseUrl: "https://www.baidu.com/s?wd=",
        icon: "https://www.baidu.com/favicon.ico",
    },
    // ask
    {
        name: "Ask",
        baseUrl: "https://www.ask.com/web?q=",
        icon: "https://www.ask.com/favicon.ico",
    },
];

function Settings({}: Props) {
    const { setTheme } = useTheme();

    const setSearchEngine = useUserPreferences(
        (state) => state.setSearchEngine
    );
    const searchEngine = useUserPreferences((state) => state.searchEngine);
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
                                            onClick={() =>
                                                setSearchEngine(engine)
                                            }
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
            <Button variant="outline" className="flex items-center gap-2">
                <User size={24} />
                <p>Bartek Paczesny</p>
            </Button>
        </div>
    );
}

export default Settings;
