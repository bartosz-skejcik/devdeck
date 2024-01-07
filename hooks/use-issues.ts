import { useEffect, useState } from "react";
import { Issue } from "@/types/issue";
import { IConnection } from "@/types";

const useIssues = (connection: IConnection) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (connection: IConnection) => {
            setLoading(true);
            try {
                const authorizationHeader = Buffer.from(
                    `${connection.email}:${connection.apiKey}`
                ).toString("base64");

                const pickerResponse = await fetch(
                    `http://192.168.149.229:3001/proxy`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            url: "issue/picker",
                            email: connection.email,
                            apiKey: connection.apiKey,
                            domain: connection.organizationDomain,
                        }),
                    }
                );
                const pickerData = await pickerResponse.json();

                const issueIds = pickerData.sections[0].issues.map(
                    (issue: any) => issue.id
                );

                const issuePromises = await issueIds.map(
                    async (issueId: string) =>
                        await fetch("http://192.168.149.229:3001/proxy", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                url: `issue/${issueId}`,
                                email: connection.email,
                                apiKey: connection.apiKey,
                                domain: connection.organizationDomain,
                            }),
                        }).then((response) => response.json())
                );

                const issueData = await Promise.all(issuePromises);

                setIssues(issueData);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
            setLoading(false);
        };

        fetchData(connection);
    }, [connection]);

    return { issues, loading };
};

export default useIssues;
