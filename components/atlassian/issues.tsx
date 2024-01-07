import useIssues from "@/hooks/use-issues";
import { useUserPreferences } from "@/stores/user-preferences";
import { IConnection } from "@/types";
import clsx from "clsx";
import Link from "next/link";

type Props = {};

function Issues({}: Props) {
    const connections = useUserPreferences((state) => state.connections);

    const connection = connections.find((c) => c.name === "Atlassian");

    const { issues, loading } = useIssues(connection as IConnection);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-5">
            {issues.map((issue) => (
                <div
                    key={issue.id}
                    className="flex flex-row items-center justify-start w-full gap-5 p-2 rounded-md text-foreground bg-background"
                >
                    <Link href={issue.self}>
                        <h4 className="w-32 whitespace-nowrap">{issue.key}</h4>
                    </Link>
                    <p className="whitespace-nowrap">
                        {new Date(issue.fields.duedate).toLocaleDateString(
                            "en-PL",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </p>
                    <p
                        style={{
                            textAlign: "left",
                            color: issue.fields.status.statusCategory.colorName,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {issue.fields.status.name}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Issues;
