export interface Project {
    self: string;
    id: string;
    key: string;
    name: string;
    avatarUrls: AvatarUrls;
    projectCategory: ProjectCategory;
    simplified: boolean;
    style: string;
    insight: Insight;
}

export interface AvatarUrls {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
}

export interface Insight {
    totalIssueCount: number;
    lastIssueUpdateTime: string;
}

export interface ProjectCategory {
    self: string;
    id: string;
    name: string;
    description: string;
}
