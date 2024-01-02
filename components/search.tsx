"use client";

import { useUserPreferences } from "@/stores/user-preferences";
import Image from "next/image";

type Props = {};

function Search({}: Props) {
    const searchEngine = useUserPreferences((state) => state.searchEngine);

    const handleSearch = (e: FormData) => {
        const searchValue = e.get("search");

        // search for the phrase based on the selected user search engine
        if (searchValue !== "") {
            window.location.href = `${searchEngine.baseUrl}${searchValue}`;
        }
    };
    return (
        <form
            action={handleSearch}
            className="flex items-center justify-center w-full gap-3 px-4 py-2 transition-colors duration-200 border rounded-lg border-border bg-background dark:text-foreground hover:border-primary"
        >
            <Image
                src={searchEngine.icon}
                width={32}
                height={32}
                priority
                alt={searchEngine.name}
                className="rounded-full w-7 h-7"
            />
            <input
                name="search"
                className="w-full h-full p-1 text-xl bg-transparent outline-none text-neutral-700 dark:text-foreground"
                type="text"
            />
        </form>
    );
}

export default Search;
