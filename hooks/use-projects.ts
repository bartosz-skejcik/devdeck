import { useEffect, useState } from "react";
import { IConnection } from "@/types";
import { Project } from "@/types/project";

const useProjects = (connection: IConnection) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (connection: IConnection) => {
            setLoading(true);
            try {
                const pickerResponse = await fetch(
                    `http://localhost:3001/proxy`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            url: "project",
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
                const data = await pickerResponse.json();

                setProjects(data);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
            setLoading(false);
        };

        fetchData(connection);
    }, [connection]);

    return { projects, loading };
};

export default useProjects;
