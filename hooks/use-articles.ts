import { Article } from "@/types/article";
import { useEffect, useState } from "react";

const useArticles = (filterTags?: any[]) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getArticles() {
            setLoading(true);
            const tagsList =
                filterTags && filterTags.map((tag) => tag.name).join(",");
            const queryString =
                filterTags && filterTags.length > 0
                    ? `https://dev.to/api/articles/latest?tags=${tagsList}`
                    : "https://dev.to/api/articles/latest?top=3";

            const res = await fetch(queryString, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "force-cache",
                next: {
                    revalidate: 3600 * 5,
                },
            });
            const articles = (await res.json()) as Article[];

            setLoading(false);

            return articles;
        }

        getArticles().then((a) =>
            setArticles(
                a.filter((article) => article.user.name !== "dev.to staff")
            )
        );
    }, [filterTags]);

    return { articles, loading };
};

export default useArticles;
