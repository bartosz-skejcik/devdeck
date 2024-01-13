import ArticlesWidget from "@/components/articles/widget";
import useArticles from "@/hooks/use-articles";
import SpotifyWidget from "@/components/spotify/widget";
import WeatherWidget from "@/components/weather/widget";
import ClockWidget from "@/components/clock/widget";
import useStore from "@/hooks/use-store";
import { useUserPreferences } from "@/stores/user-preferences";

type Props = {};

function Home({}: Props) {
    const tags = useStore(useUserPreferences, (state) => state.filterTags);
    const { articles, loading } = useArticles(tags);
    return (
        <main className="grid w-full h-full grid-cols-8 grid-rows-6 gap-3 overflow-y-auto 2xl:gap-5 grow">
            <WeatherWidget />
            {!loading && <ArticlesWidget articles={articles} />}
            <ClockWidget />
            <SpotifyWidget />
        </main>
    );
}

export default Home;
