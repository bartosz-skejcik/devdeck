import { useEffect, useState } from "react";
import { Issue, IssueElement } from "@/types/issue";
import { IConnection } from "@/types";

const useIssues = (connection: IConnection) => {
    const [issues, setIssues] = useState<IssueElement[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (connection: IConnection) => {
            setLoading(true);
            try {
                const pickerResponse = await fetch(
                    `http://192.168.149.229:3001/proxy`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            url: "search",
                            email: connection.email,
                            apiKey: connection.apiKey,
                            domain: connection.organizationDomain,
                        }),
                        cache: "force-cache",
                        next: {
                            revalidate: 3600,
                        },
                    }
                );
                const data = (await pickerResponse.json()) as Issue;

                setIssues(data.issues);
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
