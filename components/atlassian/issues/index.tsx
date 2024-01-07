import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useIssues from "@/hooks/use-issues";
import { useUserPreferences } from "@/stores/user-preferences";
import { IConnection } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {};

function Issues({}: Props) {
    const connections = useUserPreferences((state) => state.connections);

    const connection = connections.find((c) => c.name === "Atlassian");

    const { issues, loading } = useIssues(connection as IConnection);

    if (loading) {
        return (
            <div className="col-span-3 row-span-2 rounded-lg bg-background text-foreground animate-pulse"></div>
        );
    }

    return (
        <div className="col-span-3 row-span-2 py-4 rounded-lg px-7 bg-background text-foreground grow">
            <h2 className="mb-3 text-xl font-semibold">Your issues</h2>
            <div className="w-full overflow-y-auto h-[90%] grow">
                <Table>
                    <TableBody>
                        {issues.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell className="py-3 pt-2">
                                    <Image
                                        src={issue.fields.issuetype.iconUrl}
                                        width={24}
                                        height={24}
                                        alt={issue.fields.issuetype.name}
                                    />
                                </TableCell>
                                <TableCell className="px-3 text-lg">
                                    <Link href={issue.self}>{issue.key}</Link>
                                </TableCell>
                                <TableCell className="px-3 text-md">
                                    {issue.fields.status.name}
                                </TableCell>
                                <TableCell className="px-3 text-md">
                                    {issue.fields.summary}
                                </TableCell>
                                <TableCell className="px-3 text-md">
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
