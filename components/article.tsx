import { useAppStore } from "@/stores/app-store";
import { Article as IArticle } from "@/types/article";
import {
    ArrowBigUpDash,
    Bookmark,
    Link2,
    MessageCircle,
    Share2,
    Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
    article: IArticle;
};

export default function Article({ article }: Props) {
    const setCurrentReadArticle = useAppStore(
        (state) => state.setCurrentReadArticle
    );

    async function handleOpenArticleModal() {
        const res = await fetch(`https://dev.to/api/articles/${article.id}`);
        const data = (await res.json()) as IArticle;
        setCurrentReadArticle(data);
    }

    return (
        <button onClick={handleOpenArticleModal}>
            <article className="flex flex-col items-center justify-start aspect-[2/2.5] hover:border-primary transition duration-150 group h-fit w-80 bg-background text-foreground p-2.5 border border-border rounded-lg">
                <div className="flex items-center justify-between w-full px-3 py-1">
                    <div className="flex items-center gap-2">
                        <Image
                            src={article.user.profile_image}
                            alt={article.user.name}
                            width={34}
                            height={34}
                            className="rounded-full"
                        />
                        <div className="hidden text-sm text-start whitespace-nowrap group-hover:block">
                            {article.user.name.length > 16
                                ? article.user.name.substring(0, 13) + "..."
                                : article.user.name}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 transition duration-150 opacity-0 group-hover:opacity-100">
                        <Link
                            href={article.url}
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold rounded-md text-background dark:text-foreground bg-primary"
                        >
                            <span>Link</span>
                            <Link2 size={16} />
                        </Link>
                        {/* add a bookmark button */}
                        <button className="p-2 transition-all duration-200 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10">
                            <Bookmark size={18} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between px-3 py-2 grow">
                    <h3 className="w-full text-xl font-semibold leading-tight text-start">
                        {article.title}
                    </h3>
                    <p className="pt-2 text-xs transition-all duration-150 opacity-0 group-hover:grow text-start group-hover:opacity-100">
                        {article.description.length > 140
                            ? article.description.substring(0, 137) + "..."
                            : article.description}
                    </p>
                    <div className="flex items-center justify-between w-full text-muted-foreground">
                        <p className="text-sm">
                            {new Date(article.created_at).toLocaleDateString(
                                "en-PL",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                        <p className="flex items-center gap-1 text-sm">
                            <Timer size={14} /> {article.reading_time_minutes}{" "}
                            min read
                        </p>
                    </div>
                </div>
                {article.cover_image && (
                    <Image
                        src={article.cover_image}
                        alt={article.title}
                        width={320}
                        height={360}
                        className="w-full rounded-lg"
                    />
                )}
                {!article.cover_image && article.social_image && (
                    <Image
                        src={article.social_image}
                        alt={article.title}
                        width={320}
                        height={360}
                        className="w-full rounded-lg"
                    />
                )}
                <div className="flex items-center w-full mt-2 justify-evenly">
                    {/* info about positive_reactions_count, comments and reading time */}
                    <InfoButton
                        icon={<ArrowBigUpDash size={18} />}
                        text={article.positive_reactions_count.toString()}
                    />
                    <InfoButton
                        icon={<MessageCircle size={18} />}
                        text={article.comments_count.toString()}
                    />
                    <InfoButton
                        icon={<Share2 size={18} />}
                        text=""
                        onClick={() => {
                            navigator.clipboard.writeText(article.url);
                        }}
                    />
                </div>
            </article>
        </button>
    );
}

export const ArticleSkeleton: FC = () => {
    return (
        <article className="flex flex-col items-center justify-start aspect-[2/2.25] hover:border-primary transition duration-150 group h-fit w-80 bg-background text-foreground p-2.5 border border-border rounded-lg">
            <div className="flex items-center justify-between w-full px-3 py-1">
                <div className="flex items-center gap-2">
                    <div
                        className="rounded-full bg-muted-foreground animate-pulse"
                        style={{ width: 34, height: 34 }}
                    />
                    <div className="hidden w-24 h-4 text-sm rounded bg-muted-foreground animate-pulse group-hover:block"></div>
                </div>
                <div className="flex items-center gap-2 transition duration-150 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold rounded-md text-foreground bg-primary">
                        <span className="w-16 h-4 rounded bg-muted-foreground animate-pulse"></span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full px-3 py-2 grow">
                <div className="flex flex-col items-start justify-start w-full gap-2 grow">
                    <div className="w-full h-6 rounded-md bg-muted-foreground animate-pulse"></div>
                    <div className="w-1/3 h-6 rounded-md bg-muted-foreground animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between w-full text-muted-foreground">
                    <div className="w-1/3 h-4 rounded-md bg-muted-foreground animate-pulse"></div>
                    <div className="w-1/4 h-4 rounded-md bg-muted-foreground animate-pulse"></div>
                </div>
            </div>
            <div className="w-full h-32 rounded-lg bg-muted-foreground animate-pulse"></div>
            <div className="flex items-center w-full mt-2 justify-evenly">
                {/* info about positive_reactions_count, comments and reading time */}
                <InfoButton icon={<ArrowBigUpDash size={18} />} text={"0"} />
                <InfoButton icon={<MessageCircle size={18} />} text={"0"} />
                <InfoButton icon={<Share2 size={18} />} text="" />
            </div>
        </article>
    );
};

function InfoButton({
    icon,
    text,
    onClick,
}: {
    icon: any;
    text: string;
    onClick?: any;
}) {
    return onClick ? (
        <button
            onClick={onClick}
            className="flex items-center justify-center gap-2 px-2 py-1 font-semibold transition duration-150 rounded-md text-muted-foreground hover:text-primary"
        >
            {icon}
            <span>{text}</span>
        </button>
    ) : (
        <div className="flex items-center justify-center gap-2 px-2 py-1 font-semibold rounded-md text-muted-foreground">
            {icon}
            <span>{text}</span>
        </div>
    );
}
