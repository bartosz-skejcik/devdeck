import ArticlesWidget from "@/components/articles/widget";
import useArticles from "@/hooks/use-articles";
import SpotifyWidget from "@/components/spotify/widget";
import WeatherWidget from "@/components/weather/widget";
import CalendarWidget from "@/components/calendar/widget";
import ClockWidget from "@/components/clock/widget";
import useStore from "@/hooks/use-store";
import { useUserPreferences } from "@/stores/user-preferences";
import { driverObj } from "@/lib/driver";
import { driver } from "driver.js";
import { useEffect } from "react";

type Props = {};

function Home({}: Props) {
    const tags = useStore(useUserPreferences, (state) => state.filterTags);
    const { articles, loading } = useArticles(tags);
    const { setHasTakenTour, hasTakenTour } = useUserPreferences();

    useEffect(() => {
        if (!hasTakenTour) {
            const config = driverObj(setHasTakenTour);
            driver(config).drive();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasTakenTour]);

    return (
        <main className="grid w-full h-full grid-cols-8 grid-rows-6 gap-3 overflow-y-auto 2xl:gap-5 grow">
            <WeatherWidget />
            {!loading && <ArticlesWidget articles={articles} />}
            <CalendarWidget />
            <ClockWidget />
            <SpotifyWidget />
        </main>
    );
}

export default Home;
