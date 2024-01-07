import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useIssues from "@/hooks/use-issues";
import { useUserPreferences } from "@/stores/user-preferences";
import { IConnection } from "@/types";
import Image from "next/image";
import Link from "next/link";
import useProjects from "@/hooks/use-projects";
import { useEffect, useState } from "react";
import ProjectsFilter from "@/components/atlassian/issues/filter-projects";
import PriorityFilter from "@/components/atlassian/issues/filter-priority";
import SortBy from "@/components/atlassian/issues/sort-by";

type Props = {};

const dueDate = (date: Date | null) => {
    if (date == null) return "No due date";

    const today = new Date();
    const due = new Date(date);

    const diffTime = Math.abs(due.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return (
            <>
                <span>Due </span>
                <span className="text-muted-foreground">today</span>
            </>
        );
    } else if (diffDays === 1) {
        return (
            <>
                <span>Due </span>
                <span className="text-muted-foreground">tomorrow</span>
            </>
        );
    } else if (diffDays < 0) {
        return <span className="text-red-400">Overdue</span>;
    } else {
        return (
            <>
                <span>Due in </span>
                <span className="text-muted-foreground">{diffDays} days</span>
            </>
        );
    }
};

function Issues({}: Props) {
    const connections = useUserPreferences((state) => state.connections);

    const connection = connections.find((c) => c.name === "Atlassian");

    const { issues, loading } = useIssues(connection as IConnection);

    const { projects, loading: projectsLoading } = useProjects(
        connection as IConnection
    );

    const [project, setProject] = useState("");
    const [priority, setPriority] = useState("");

    const [filteredIssues, setFilteredIssues] = useState(issues);

    useEffect(() => {
        setFilteredIssues(issues);
    }, [issues]);

    useEffect(() => {
        if (project) {
            if (project === "all") {
                setFilteredIssues(issues);
            } else {
                setFilteredIssues(
                    issues.filter(
                        (issue) => issue.fields.project.id === project
                    )
                );
            }
        }
    }, [project]);

    useEffect(() => {
        if (priority) {
            if (priority === "all") {
                if (project === "all" || !project) {
                    setFilteredIssues(issues);
                } else {
                    setFilteredIssues(
                        issues.filter(
                            (issue) => issue.fields.project.id === project
                        )
                    );
                }
            } else {
                setFilteredIssues(
                    filteredIssues.filter(
                        (issue) => issue.fields.priority.id === priority
                    )
                );
            }
        }
    }, [priority]);

    if (loading) {
        return (
            <div className="col-span-4 row-span-2 rounded-lg bg-background text-foreground animate-pulse"></div>
        );
    }

    return (
        <div className="col-span-4 row-span-2 py-4 rounded-lg px-7 bg-background text-foreground grow">
            <div className="flex items-center justify-between w-full pb-3">
                <h2 className="text-xl font-semibold">Your issues</h2>
                <div className="flex items-center gap-2">
                    <SortBy
                        issues={filteredIssues}
                        setIssues={setFilteredIssues}
                    />
                    <PriorityFilter setPriority={setPriority} />
                    <ProjectsFilter
                        projects={projects}
                        setProject={setProject}
                        projectsLoading={projectsLoading}
                    />
                </div>
            </div>
            <div className="w-full overflow-y-auto h-[85%] grow">
                <Table>
                    <TableBody>
                        {filteredIssues
                            .filter(
                                (issue) =>
                                    issue.fields.assignee?.emailAddress ==
                                    connection?.email
                            )
                            .map((issue) => (
                                <TableRow key={issue.id}>
                                    <TableCell className="py-3 pt-2">
                                        <Image
                                            src={issue.fields.issuetype.iconUrl}
                                            width={24}
                                            height={24}
                                            alt={issue.fields.issuetype.name}
                                            className="w-[1vw] 3xl:w-[2vw] aspect-square"
                                        />
                                    </TableCell>
                                    <TableCell className="px-3 text-lg font-medium">
                                        <Link
                                            href={issue.self}
                                            className="whitespace-nowrap"
                                        >
                                            {issue.key}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="px-3 text-md whitespace-nowrap">
                                        {issue.fields.status.name}
                                    </TableCell>
                                    <TableCell className="px-3 text-md whitespace-nowrap">
                                        {dueDate(issue.fields.duedate)}
                                    </TableCell>
                                    <TableCell className="px-3 text-md whitespace-nowrap">
                                        <Image
                                            src={
                                                issue.fields.priority.iconUrl ??
                                                ""
                                            }
                                            width={24}
                                            height={24}
                                            alt={issue.fields.priority.name}
                                            className="w-[1vw] 3xl:w-[2vw] aspect-square"
                                        />
                                    </TableCell>
                                    <TableCell className="px-3 text-md">
                                        {issue.fields.summary}
                                    </TableCell>
                                    <TableCell className="px-3 text-md text-muted-foreground">
                                        {issue.fields.description &&
                                            issue.fields.description.content
                                                .length > 0 &&
                                            issue.fields.description.content[0]
                                                .content[0] &&
                                            issue.fields.description.content[0]
                                                .content[0].text &&
                                            issue.fields.description.content[0].content[0].text.slice(
                                                0,
                                                50
                                            ) + "..."}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Issues;
