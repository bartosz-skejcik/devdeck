export interface Issue {
    expand: string;
    startAt: number;
    maxResults: number;
    total: number;
    issues: IssueElement[];
}

export interface IssueElement {
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
    project: Project;
    customfield_10031: null;
    customfield_10032: any[];
    fixVersions: any[];
    customfield_10033: Customfield10033 | null;
    customfield_10034: null | string;
    aggregatetimespent: null;
    resolution: Priority | null;
    customfield_10035: Customfield10035[] | null;
    customfield_10036: Customfield10036;
    customfield_10037: null;
    customfield_10027: null;
    customfield_10028: null;
    customfield_10029: null;
    resolutiondate: null | string;
    workratio: number;
    watches: Watches;
    lastViewed: null | string;
    created: string;
    customfield_10020: null;
    customfield_10021: null;
    customfield_10022: null;
    priority: Priority;
    customfield_10023: null;
    customfield_10024: null | string;
    customfield_10025: null | string;
    customfield_10026: null;
    labels: string[];
    customfield_10016: null;
    customfield_10017: null;
    customfield_10018: Customfield10018;
    customfield_10019: string;
    timeestimate: null;
    aggregatetimeoriginalestimate: null;
    versions: any[];
    issuelinks: any[];
    assignee: Creator | null;
    updated: string;
    status: Status;
    components: any[];
    timeoriginalestimate: null;
    description: Description;
    customfield_10010: Customfield10010 | null;
    customfield_10014: null;
    customfield_10015: null;
    customfield_10005: null;
    customfield_10006: null;
    security: null;
    customfield_10007: null;
    customfield_10008: null;
    aggregatetimeestimate: null;
    customfield_10009: null;
    summary: string;
    creator: Creator;
    subtasks: any[];
    customfield_10040: Customfield1004;
    customfield_10041: Customfield1004;
    customfield_10042: any[];
    reporter: Creator;
    aggregateprogress: Progress;
    customfield_10001: null;
    customfield_10002: any[];
    customfield_10003: null;
    customfield_10004: null;
    customfield_10038: null;
    environment: null;
    duedate: Date | null;
    progress: Progress;
    votes: Votes;
}

export interface Progress {
    progress: number;
    total: number;
}

export interface Creator {
    self: string;
    accountId: string;
    emailAddress: EmailAddress;
    avatarUrls: Urls;
    displayName: CreatorDisplayName;
    active: boolean;
    timeZone: TimeZone;
    accountType: AccountType;
}

export type AccountType = "atlassian" | "customer";

export interface Urls {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
}

export type CreatorDisplayName = "Bartek Paczesny" | "Example Customer";

export type EmailAddress =
    | "bartek@paczesny.pl"
    | "example@atlassian-demo.invalid";

export type TimeZone = "Europe/Warsaw";

export interface Customfield10010 {
    _links: Customfield10010__Links;
    requestType: RequestType;
    currentStatus: CurrentStatus;
}

export interface Customfield10010__Links {
    jiraRest: string;
    web: string;
    self: string;
    agent: string;
}

export interface CurrentStatus {
    status: string;
    statusCategory: string;
    statusDate: BreachTime;
}

export interface BreachTime {
    iso8601: string;
    jira: string;
    friendly: string;
    epochMillis: number;
}

export interface RequestType {
    _expands: string[];
    id: string;
    _links: RequestTypeLinks;
    name: string;
    description: string;
    helpText: string;
    issueTypeId: string;
    serviceDeskId: string;
    portalId: string;
    groupIds: string[];
    icon: Icon;
}

export interface RequestTypeLinks {
    self: string;
}

export interface Icon {
    id: string;
    _links: IconLinks;
}

export interface IconLinks {
    iconUrls: Urls;
}

export interface Customfield10018 {
    hasEpicLinkFieldDependency: boolean;
    showField: boolean;
    nonEditableReason: NonEditableReason;
}

export interface NonEditableReason {
    reason: Reason;
    message: Message;
}

export type Message =
    "The Parent Link is only available to Jira Premium users.";

export type Reason = "PLUGIN_LICENSE_ERROR";

export interface Customfield10033 {
    rating: number;
}

export interface Customfield10035 {
    id: string;
    name: string;
    finalDecision: string;
    canAnswerApproval: boolean;
    approvers: any[];
    createdDate: BreachTime;
    _links: RequestTypeLinks;
}

export interface Customfield10036 {
    languageCode: LanguageCode;
    displayName: Customfield10036_DisplayName;
}

export type Customfield10036_DisplayName = "English";

export type LanguageCode = "en";

export interface Customfield1004 {
    id: string;
    name: Customfield10040_Name;
    _links: RequestTypeLinks;
    completedCycles: Cycle[];
    ongoingCycle?: Cycle;
}

export interface Cycle {
    startTime: BreachTime;
    stopTime?: BreachTime;
    breachTime: BreachTime;
    breached: boolean;
    goalDuration: ElapsedTime;
    elapsedTime: ElapsedTime;
    remainingTime: ElapsedTime;
    paused?: boolean;
    withinCalendarHours?: boolean;
}

export interface ElapsedTime {
    millis: number;
    friendly: string;
}

export type Customfield10040_Name =
    | "Time to resolution"
    | "Time to first response";

export interface Description {
    version: number;
    type: DescriptionType;
    content: DescriptionContent[];
}

export interface DescriptionContent {
    type: FluffyType;
    content: ContentContent[];
    attrs?: ContentAttrs;
}

export interface ContentAttrs {
    level: number;
}

export interface ContentContent {
    type: PurpleType;
    text: string;
    marks?: Mark[];
}

export interface Mark {
    type: MarkType;
    attrs?: MarkAttrs;
}

export interface MarkAttrs {
    href: string;
}

export type MarkType = "strong" | "link";

export type PurpleType = "text";

export type FluffyType = "paragraph" | "heading";

export type DescriptionType = "doc";

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
    iconUrl?: string;
    name: string;
    id: string;
    description?: string;
}

export interface Project {
    self: string;
    id: string;
    key: string;
    name: ProjectName;
    projectTypeKey: ProjectTypeKey;
    simplified: boolean;
    avatarUrls: Urls;
}

export type ProjectName = "Test Team" | "Demo service project";

export type ProjectTypeKey = "service_desk";

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
    key: StatusCategoryKey;
    colorName: ColorName;
    name: StatusCategoryName;
}

export type ColorName = "blue-gray" | "yellow" | "green";

export type StatusCategoryKey = "new" | "indeterminate" | "done";

export type StatusCategoryName = "To Do" | "In Progress" | "Done";

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
