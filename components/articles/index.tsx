import { Article as IArticle } from "@/types/article";
import { useEffect, useState } from "react";
import Article, { ArticleSkeleton } from "@/components/articles/article";
import { useUserPreferences } from "@/stores/user-preferences";
import useArticles from "@/hooks/use-articles";

type Props = {};

function Articles({}: Props) {
    const { filterTags } = useUserPreferences();

    const { articles, loading } = useArticles(filterTags);

    return (
        <main className="flex flex-wrap justify-center w-full h-full gap-5 overflow-y-auto grow">
            {!loading
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
