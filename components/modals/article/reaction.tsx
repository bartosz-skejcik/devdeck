import { ArticleReactionCounts } from "@/types/article";
import React from "react";

type Props = {
    reaction: ArticleReactionCounts;
};

function reactionEmoji(reaction: string) {
    switch (reaction) {
        case "like":
            return "❤️";
        case "unicorn":
            return "🦄";
        case "exploding_head":
            return "🤯";
        case "raised_hands":
            return "🙌";
        case "fire":
            return "🔥";
        case "readinglist":
            return "📚";
    }
}

function Reaction({ reaction }: Props) {
    return (
        <div className="flex items-center justify-center gap-1 px-2 py-1 text-center border-2 rounded-md border-border">
            <span className="text-center">
                {reactionEmoji(reaction.category)}
            </span>
            <p className="text-center text-md">{reaction.count}</p>
        </div>
    );
}

export default Reaction;
