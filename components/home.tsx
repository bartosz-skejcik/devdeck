import ArticlesWidget from "@/components/articles/widget";
import useArticles from "@/hooks/use-articles";
import SpotifyWidget from "./spotify/widget";

type Props = {};

function Home({}: Props) {
    const { articles, loading } = useArticles();
    return (
        <main className="grid w-full h-full grid-cols-8 grid-rows-6 gap-5 overflow-y-auto grow">
            <SpotifyWidget />
            {!loading && <ArticlesWidget articles={articles} />}
        </main>
    );
}

export default Home;
