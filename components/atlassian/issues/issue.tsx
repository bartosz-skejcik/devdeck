import { Issue } from "@/types/issue";
import React from "react";

type Props = {
    issue: Issue;
};

function Issue({ issue }: Props) {
    return <div className="w-full">Issue</div>;
}

export default Issue;
