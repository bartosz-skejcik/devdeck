import { Article as IArticle } from "@/types/article";
import { useEffect, useState } from "react";
import Article, { ArticleSkeleton } from "@/components/article";
import { useUserPreferences } from "@/stores/user-preferences";

type Props = {};

function Articles({}: Props) {
    const [articles, setArticles] = useState<IArticle[]>();
    const { filterTags } = useUserPreferences();

    useEffect(() => {
        async function getArticles() {
            const tagsList = filterTags.map((tag) => tag.name).join(",");
            const queryString =
                filterTags.length > 0
                    ? `https://dev.to/api/articles?tags=${tagsList}`
                    : "https://dev.to/api/articles/latest?top=3";
            const res = await fetch(queryString);
            const articles = (await res.json()) as IArticle[];
            return articles;
        }

        getArticles().then((a) =>
            setArticles(
                a.filter((article) => article.user.name !== "dev.to staff")
            )
        );
    }, [filterTags]);

    return (
        <main className="flex flex-wrap justify-center w-full h-full gap-5 overflow-y-auto grow">
            {articles
                ? articles?.map((article) => (
                      <Article key={article.id} article={article} />
                  ))
                : Array.from({ length: 15 }).map((_, index) => (
                      <ArticleSkeleton key={index} />
                  ))}
        </main>
    );
}

export default Articles;
