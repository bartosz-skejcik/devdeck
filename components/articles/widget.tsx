import { Card, CardContent } from "@/components/ui/card";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Article } from "@/types/article";
import { useAppStore } from "@/stores/app-store";

type Props = {
    articles: Article[];
};

function ArticlesWidget({ articles }: Props) {
    const [mostRecentArticles, setMostRecentArticles] = useState<Article[]>([]);

    useEffect(() => {
        setMostRecentArticles(articles.slice(0, 4));
    }, [articles]);

    return (
        <Card className="flex items-start justify-center col-span-3 row-span-5 py-2 2xl:row-span-3 2xl:col-span-2">
            <CardContent className="w-full space-y-2">
                <h3 className="text-lg font-semibold">Most Recent Articles</h3>
                {mostRecentArticles.map((article) => (
                    <Article key={article.id} article={article} />
                ))}
            </CardContent>
        </Card>
    );
}

const Article = ({ article }: { article: Article }) => {
    const { setCurrentReadArticle } = useAppStore();

    async function handleOpenArticleModal() {
        const res = await fetch(`https://dev.to/api/articles/${article.id}`);
        const data = (await res.json()) as Article;

        const resWithReactions = await fetch(
            `https://dev.to/reactions?article_id=${article.id}`
        );
        const dataWithReactions = await resWithReactions.json();
        data.reactions = dataWithReactions;

        setCurrentReadArticle(data);
    }

    return (
        <button
            onClick={handleOpenArticleModal}
            className="block w-full p-2 transition duration-200 rounded-md hover:bg-muted"
        >
            <div className="flex items-start space-x-3">
                <Image
                    alt={article.title}
                    className="object-cover w-12 h-12 rounded-md"
                    height={50}
                    width={50}
                    src={
                        article.cover_image
                            ? article.cover_image
                            : article.social_image
                    }
                    style={{
                        aspectRatio: "50/50",
                        objectFit: "cover",
                    }}
                />
                <div className="space-y-1">
                    <h4 className="text-base font-semibold">
                        {article.title.slice(0, 35) + "..."}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {article.description.slice(0, 50)}
                    </p>
                </div>
            </div>
        </button>
    );
};

export default ArticlesWidget;
