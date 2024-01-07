export interface Issue {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: Fields;
}

export interface Fields {
    statuscategorychangedate: string;
    issuetype: Issuetype;
    timespent: null;
    customfield_10030: null;
    customfield_10031: null;
    project: Project;
    customfield_10032: any[];
    fixVersions: any[];
    customfield_10033: null;
    aggregatetimespent: null;
    customfield_10034: null;
    customfield_10035: null;
    resolution: null;
    customfield_10036: Customfield10036;
    customfield_10037: null;
    customfield_10027: null;
    customfield_10028: null;
    customfield_10029: null;
    resolutiondate: null;
    workratio: number;
    issuerestriction: Issuerestriction;
    watches: Watches;
    lastViewed: string;
    created: string;
    customfield_10020: null;
    customfield_10021: null;
    customfield_10022: null;
    customfield_10023: null;
    priority: Priority;
    customfield_10024: null;
    customfield_10025: null;
    customfield_10026: null;
    labels: string[];
    customfield_10016: null;
    customfield_10017: null;
    customfield_10018: Customfield10018;
    customfield_10019: string;
    aggregatetimeoriginalestimate: null;
    timeestimate: null;
    versions: any[];
    issuelinks: any[];
    assignee: Assignee;
    updated: string;
    status: Status;
    components: any[];
    timeoriginalestimate: null;
    description: Description;
    customfield_10010: null;
    customfield_10014: null;
    customfield_10015: null;
    timetracking: Timetracking;
    customfield_10005: null;
    customfield_10006: null;
    security: null;
    customfield_10007: null;
    customfield_10008: null;
    aggregatetimeestimate: null;
    attachment: any[];
    customfield_10009: null;
    summary: string;
    creator: Assignee;
    subtasks: any[];
    customfield_10040: Customfield1004;
    customfield_10041: Customfield1004;
    customfield_10042: any[];
    reporter: Assignee;
    aggregateprogress: Progress;
    customfield_10001: null;
    customfield_10002: any[];
    customfield_10003: null;
    customfield_10004: null;
    customfield_10038: null;
    environment: null;
    duedate: Date;
    progress: Progress;
    comment: Comment;
    votes: Votes;
    worklog: Worklog;
}

export interface Progress {
    progress: number;
    total: number;
}

export interface Assignee {
    self: string;
    accountId: string;
    emailAddress: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    active: boolean;
    timeZone: string;
    accountType: string;
}

export interface AvatarUrls {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
}

export interface Comment {
    comments: any[];
    self: string;
    maxResults: number;
    total: number;
    startAt: number;
}

export interface Customfield10018 {
    hasEpicLinkFieldDependency: boolean;
    showField: boolean;
    nonEditableReason: NonEditableReason;
}

export interface NonEditableReason {
    reason: string;
    message: string;
}

export interface Customfield10036 {
    languageCode: string;
    displayName: string;
}

export interface Customfield1004 {
    id: string;
    name: string;
    _links: Links;
    completedCycles: any[];
    ongoingCycle: OngoingCycle;
}

export interface Links {
    self: string;
}

export interface OngoingCycle {
    startTime: Time;
    breachTime: Time;
    breached: boolean;
    paused: boolean;
    withinCalendarHours: boolean;
    goalDuration: ElapsedTime;
    elapsedTime: ElapsedTime;
    remainingTime: ElapsedTime;
}

export interface Time {
    iso8601: string;
    jira: string;
    friendly: string;
    epochMillis: number;
}

export interface ElapsedTime {
    millis: number;
    friendly: string;
}

export interface Description {
    version: number;
    type: string;
    content: DescriptionContent[];
}

export interface DescriptionContent {
    type: string;
    content: ContentContent[];
}

export interface ContentContent {
    type: string;
    text: string;
}

export interface Issuerestriction {
    issuerestrictions: Timetracking;
    shouldDisplay: boolean;
}

export interface Timetracking {}

export interface Issuetype {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    subtask: boolean;
    avatarId: number;
    hierarchyLevel: number;
}

export interface Priority {
    self: string;
    iconUrl: string;
    name: string;
    id: string;
}

export interface Project {
    self: string;
    id: string;
    key: string;
    name: string;
    projectTypeKey: string;
    simplified: boolean;
    avatarUrls: AvatarUrls;
}

export interface Status {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: StatusCategory;
}

export interface StatusCategory {
    self: string;
    id: number;
    key: string;
    colorName: string;
    name: string;
}

export interface Votes {
    self: string;
    votes: number;
    hasVoted: boolean;
}

export interface Watches {
    self: string;
    watchCount: number;
    isWatching: boolean;
}

export interface Worklog {
    startAt: number;
    maxResults: number;
    total: number;
    worklogs: any[];
}
