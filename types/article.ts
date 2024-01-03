export interface Article {
    type_of: TypeOf;
    id: number;
    title: string;
    description: string;
    readable_publish_date: string;
    slug: string;
    path: string;
    url: string;
    comments_count: number;
    public_reactions_count: number;
    collection_id: number | null;
    published_timestamp: Date;
    positive_reactions_count: number;
    cover_image: null | string;
    social_image: string;
    canonical_url: string;
    created_at: Date;
    edited_at: Date | null;
    crossposted_at: Date | null;
    published_at: Date;
    last_comment_at: Date;
    reading_time_minutes: number;
    tag_list: string;
    tags: string[];
    body_html?: string;
    body_markdown: string;
    user: User;
    organization?: Organization;
    flare_tag?: FlareTag;
    reactions?: Reaction;
}

export type ArticleReactionCounts = {
    category: string;
    count: number;
};

export interface Reaction {
    current_user: {
        id: number;
    };
    reactions: any[];
    article_reaction_counts: ArticleReactionCounts[];
}

export interface FlareTag {
    name: string;
    bg_color_hex: string;
    text_color_hex: string;
}

export interface Organization {
    name: Name;
    username: Slug;
    slug: Slug;
    profile_image: string;
    profile_image_90: string;
}

export type Name = "The DEV Team" | "CodeNewbie";

export type Slug = "devteam" | "codenewbieteam";

export type TypeOf = "article";

export interface User {
    name: string;
    username: string;
    twitter_username: null | string;
    github_username: null | string;
    user_id: number;
    website_url: null | string;
    profile_image: string;
    profile_image_90: string;
}
