import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IssueElement } from "@/types/issue";

type Props = {
    issues: IssueElement[];
    setIssues: (issues: IssueElement[]) => void;
};

const sortOptions = {
    priority: [
        {
            value: "low2high",
            label: "Low to High",
        },
        {
            value: "high2low",
            label: "High to Low",
        },
    ],
    duedate: [
        {
            value: "nearest",
            label: "Nearest",
        },
        {
            value: "furthest",
            label: "Furthest",
        },
    ],
};

function SortBy({ issues, setIssues }: Props) {
    function sortIssues(sortBy: string) {
        const sortedIssues = issues.sort((a, b) => {
            if (sortBy === "low2high") {
                return (
                    Number(a.fields.priority.id) - Number(b.fields.priority.id)
                );
            } else if (sortBy === "high2low") {
                return (
                    Number(b.fields.priority.id) - Number(a.fields.priority.id)
                );
            } else if (sortBy === "nearest") {
                return (
                    new Date(a.fields.duedate!).getDate() -
                    new Date(b.fields.duedate!).getDate()
                );
            } else if (sortBy === "furthest") {
                return (
                    new Date(b.fields.duedate!).getDate() -
                    new Date(a.fields.duedate!).getDate()
                );
            } else {
                return 0;
            }
        });
        setIssues(sortedIssues);
        console.log(sortedIssues);
    }

    return (
        <Select
            onValueChange={(value) => {
                sortIssues(value);
            }}
        >
            <SelectTrigger className="space-x-4 w-fit">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="cancel">Delete sort</SelectItem>
                    <SelectLabel>Priority</SelectLabel>
                    {sortOptions.priority.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                    <SelectLabel>Due Date</SelectLabel>
                    {sortOptions.duedate.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SortBy;
