import ArticlesWidget from "@/components/articles/widget";
import useArticles from "@/hooks/use-articles";
import SpotifyWidget from "@/components/spotify/widget";
import WeatherWidget from "@/components/weather/widget";
import ClockWidget from "@/components/clock/widget";

type Props = {};

function Home({}: Props) {
    const { articles, loading } = useArticles();
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
