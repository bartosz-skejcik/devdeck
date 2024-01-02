import { useAppStore } from "@/stores/app-store";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";

type Props = {};

function formatedDate(date: Date | string) {
    // if the date is today, return "Today"
    // if the date is yesterday, return "Yesterday"

    const dateObj = new Date(date);
    const today = new Date();

    switch (dateObj.getDate()) {
        case today.getDate():
            return "Today";
        case today.getDate() - 1:
            return "Yesterday";
        default:
            return dateObj.toLocaleDateString();
    }
}

function ArticleReadModal({}: Props) {
    const currentlyReadArticle = useAppStore(
        (state) => state.currentlyReadArticle
    );
    const setCurrentReadArticle = useAppStore(
        (state) => state.setCurrentReadArticle
    );

    const publishedAt = currentlyReadArticle?.published_at || ("" as string);

    const [moreArticles, setMoreArticles] = useState<Article[]>();

    useEffect(() => {
        async function getArticles() {
            const res = await fetch(
                `https://dev.to/api/articles?username=${currentlyReadArticle?.user.username}&per_page=4`
            );
            const data = await res.json();

            // get the full article data by id, for each article
            const articles = (await Promise.all(
                data.map(async (article: Article) => {
                    const res = await fetch(
                        `https://dev.to/api/articles/${article.id}`
                    );
                    const data = (await res.json()) as Article;
                    return data;
                })
            )) as Article[];

            return articles;
        }

        getArticles().then((articles) =>
            setMoreArticles(
                articles.filter((a) => a.id !== currentlyReadArticle?.id)
            )
        );
    }, [currentlyReadArticle]);

    return (
        <Dialog
            open={!!currentlyReadArticle}
            onOpenChange={() => {
                setCurrentReadArticle && setCurrentReadArticle(null);
            }}
        >
            <DialogContent className="grid max-w-6xl max-h-[90vh] grid-cols-7 gap-0 p-0 overflow-y-auto divide-x divide-muted-foreground/50">
                <div className="flex flex-col items-start justify-start col-span-5 py-8 pl-8 pr-2 gap-y-3">
                    <h1 className="text-3xl font-semibold">
                        {currentlyReadArticle?.title}
                    </h1>
                    <h5 className="text-md text-muted-foreground">
                        {currentlyReadArticle?.description}
                    </h5>
                    <div className="flex items-start w-full gap-1 py-2">
                        {currentlyReadArticle?.tags &&
                            currentlyReadArticle?.tags.length > 0 &&
                            currentlyReadArticle?.tags.map(
                                (tag: string, index: number) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        border="sm"
                                    >
                                        #{tag}
                                    </Badge>
                                )
                            )}
                    </div>
                    <div className="flex items-start w-full gap-1 py-1 text-sm text-muted-foreground">
                        {formatedDate(publishedAt)}
                        <span>{"•"}</span>
                        {currentlyReadArticle?.reading_time_minutes} min read
                        time
                    </div>
                    {currentlyReadArticle?.cover_image && (
                        <Image
                            src={currentlyReadArticle?.cover_image}
                            alt={currentlyReadArticle?.title}
                            width={800}
                            height={400}
                            className="w-11/12 my-4 rounded-lg"
                        />
                    )}
                    <article
                        className="prose dark:prose-invert prose-img:rounded-sm prose-img:w-3/4 text-muted-foreground"
                        dangerouslySetInnerHTML={{
                            __html: currentlyReadArticle?.body_html!,
                        }}
                    ></article>
                </div>
                <div className="flex flex-col items-start justify-start col-span-2 pt-8 pl-4 pr-8 gap-y-5">
                    <Link
                        href={`https://dev.to/${currentlyReadArticle?.user.username}`}
                        className="flex items-center justify-center w-full gap-3 p-2 border rounded-sm border-border"
                    >
                        <Image
                            src={currentlyReadArticle?.user.profile_image!}
                            alt={currentlyReadArticle?.user.name!}
                            width={45}
                            height={45}
                            className="rounded-full"
                        />
                        <div className="flex flex-col items-start h-full justify-stretch grow">
                            <h3 className="text-lg font-semibold text-start">
                                {currentlyReadArticle?.user.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                @{currentlyReadArticle?.user.username}
                            </p>
                        </div>
                    </Link>
                    {moreArticles && moreArticles?.length > 0 && (
                        <div className="flex flex-col items-start justify-center w-full gap-2 p-2 border divide-y rounded-sm divide-muted-foreground dark:divide-neutral-800 border-border">
                            <h3 className="font-semibold text-left">
                                More from{" "}
                                <span className="text-primary">
                                    {currentlyReadArticle?.user.name}
                                </span>
                            </h3>
                            {moreArticles?.map((article) => (
                                <button
                                    key={article.id}
                                    onClick={() => {
                                        setCurrentReadArticle &&
                                            setCurrentReadArticle(article);
                                    }}
                                    className="flex flex-col items-start justify-center w-full pt-2 pl-1"
                                >
                                    <h3 className="text-start">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center justify-start w-full gap-2">
                                        {typeof article.tag_list === "string"
                                            ? article.tags
                                                  .slice(0, 3)
                                                  .map(
                                                      (
                                                          tag: string,
                                                          index: number
                                                      ) => (
                                                          <p
                                                              key={index}
                                                              className="text-xs text-muted-foreground"
                                                          >
                                                              #{tag}
                                                          </p>
                                                      )
                                                  )
                                            : article.tag_list
                                                  // @ts-ignore
                                                  .slice(0, 3)
                                                  .map(
                                                      (
                                                          tag: string,
                                                          index: number
                                                      ) => (
                                                          <p
                                                              key={index}
                                                              className="text-xs text-muted-foreground"
                                                          >
                                                              #{tag}
                                                          </p>
                                                      )
                                                  )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ArticleReadModal;
