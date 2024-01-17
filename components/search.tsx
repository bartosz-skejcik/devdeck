"use client";

import useStore from "@/hooks/use-store";
import { useUserPreferences } from "@/stores/user-preferences";
import { Divide } from "lucide-react";
import Image from "next/image";
import { FormEvent } from "react";

type Props = {};

function Search({}: Props) {
    const searchEngine = useStore(
        useUserPreferences,
        (state) => state.searchEngine
    );

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get("search");

        // search for the phrase based on the selected user search engine
        if (searchValue !== "" && searchEngine) {
            window.location.href = `${searchEngine.baseUrl}${searchValue}`;
        }
    };
    return (
        <form
            id="search-widget"
            onSubmit={handleSearch}
            className="flex items-center justify-center w-full gap-3 px-4 py-2 transition-colors duration-200 border rounded-lg border-border bg-background dark:text-foreground hover:border-primary"
        >
            {searchEngine ? (
                <Image
                    src={searchEngine.icon}
                    width={32}
                    height={32}
                    priority
                    alt={searchEngine.name}
                    className="rounded-full w-7 h-7"
                />
            ) : (
                <div className="rounded-lg w-7 h-7 bg-foreground/15 animate-pulse" />
            )}
            <input
                name="search"
                autoComplete="off"
                className="w-full h-full p-1 text-xl bg-transparent outline-none text-neutral-700 dark:text-foreground"
                type="text"
            />
        </form>
    );
}

export default Search;
