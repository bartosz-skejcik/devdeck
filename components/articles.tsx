import { Article as IArticle } from "@/types/article";
import { useEffect, useState } from "react";
import Article, { ArticleSkeleton } from "@/components/article";

type Props = {};

function Articles({}: Props) {
    const [articles, setArticles] = useState<IArticle[]>();

    useEffect(() => {
        async function getArticles() {
            const res = await fetch("https://dev.to/api/articles/latest?top=3");
            const articles = (await res.json()) as IArticle[];
            return articles;
        }

        getArticles().then((articles) =>
            setArticles(
                articles.filter(
                    (article) => article.user.name !== "dev.to staff"
                )
            )
        );
    }, []);

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
