import useIssues from "@/hooks/use-issues";
import { useUserPreferences } from "@/stores/user-preferences";
import { IConnection } from "@/types";
import ProgressBar from "./progress-bar";

type Props = {};

function HallOfFame({}: Props) {
    const connections = useUserPreferences((state) => state.connections);
    const connection = connections.find((c) => c.name === "Atlassian");

    const { issues, loading } = useIssues(connection as IConnection);

    function groupIssuesByStatusCategoryName() {
        const grouped = issues.reduce((acc, cur) => {
            const key = cur.fields.status.statusCategory.name;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(cur);

            return acc;
        }, {} as { [key: string]: any[] });

        return grouped;
    }

    const grouped = groupIssuesByStatusCategoryName();

    if (loading) {
        return (
            <div className="col-span-2 row-span-2 py-4 rounded-lg px-7 bg-background text-foreground grow animate-pulse" />
        );
    }

    return (
        <div className="col-span-2 row-span-2 py-4 rounded-lg px-7 bg-background text-foreground grow">
            <div className="flex items-center justify-between w-full pb-3">
                <h2 className="text-xl font-semibold">Hall of Fame</h2>
            </div>
            <div className="flex flex-col items-start justify-center w-full gap-4 grow">
                {Object.keys(grouped).map((key) => {
                    const categoryIssues = grouped[key];

                    const progress =
                        categoryIssues.length > 0
                            ? (categoryIssues.length / issues.length) * 100
                            : 0;

                    return (
                        <ProgressBar
                            key={key}
                            name={key}
                            color={
                                categoryIssues[0].fields.status.statusCategory
                                    .colorName
                            }
                            progress={progress}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default HallOfFame;
