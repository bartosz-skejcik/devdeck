import { Table, TableBody } from "@/components/ui/table";
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
import Issue from "./issue";

type Props = {};

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
        if (project || priority) {
            let filteredIssues = issues;

            if (project && project !== "all") {
                filteredIssues = filteredIssues.filter(
                    (issue) => issue.fields.project.id === project
                );
            }

            if (priority && priority !== "all") {
                filteredIssues = filteredIssues.filter(
                    (issue) => issue.fields.priority.id === priority
                );
            }

            setFilteredIssues(filteredIssues);
        }
    }, [project, priority, issues]);

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
                    {filteredIssues && filteredIssues.length > 0 && (
                        <SortBy
                            issues={filteredIssues}
                            setIssues={setFilteredIssues}
                        />
                    )}
                    <PriorityFilter setPriority={setPriority} />
                    {projects.length > 0 && (
                        <ProjectsFilter
                            projects={projects}
                            setProject={setProject}
                            projectsLoading={projectsLoading}
                        />
                    )}
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
                                <Issue
                                    key={issue.id}
                                    issue={issue}
                                    connection={connection!}
                                />
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Issues;
