import { IConnection } from "@/types";
import { IssueElement } from "@/types/issue";

import { TableCell, TableRow } from "@/components/ui/table";

import Image from "next/image";
import Link from "next/link";

type Props = {
    issue: IssueElement;
    connection: IConnection;
};

const dueDate = (date: Date | null) => {
    if (date == null) return "No due date";

    const today = new Date();
    const due = new Date(date);

    const diffTime = due.getTime() - today.getTime();
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

function Issue({ issue, connection }: Props) {
    return (
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
                    href={`https://${connection?.organizationDomain}/browse/${issue.key}`}
                    className="whitespace-nowrap"
                >
                    {issue.key}
                </Link>
            </TableCell>
            <TableCell className="px-3 text-md whitespace-nowrap">
                {issue.fields.status.statusCategory.name}
            </TableCell>
            <TableCell className="px-3 text-md whitespace-nowrap">
                {dueDate(issue.fields.duedate)}
            </TableCell>
            <TableCell className="px-3 text-md whitespace-nowrap">
                <Image
                    src={issue.fields.priority.iconUrl ?? ""}
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
                    issue.fields.description.content.length > 0 &&
                    issue.fields.description.content[0].content[0] &&
                    issue.fields.description.content[0].content[0].text &&
                    issue.fields.description.content[0].content[0].text.slice(
                        0,
                        50
                    ) + "..."}
            </TableCell>
        </TableRow>
    );
}

export default Issue;
