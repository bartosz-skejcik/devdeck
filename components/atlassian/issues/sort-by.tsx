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
        const sortFunctionMap = {
            low2high: (a: IssueElement, b: IssueElement) =>
                Number(b.fields.priority.id) - Number(a.fields.priority.id),
            high2low: (a: IssueElement, b: IssueElement) =>
                Number(a.fields.priority.id) - Number(b.fields.priority.id),
            nearest: (a: IssueElement, b: IssueElement) => {
                if (!a.fields.duedate && !b.fields.duedate) return 0;
                if (!a.fields.duedate) return 1;
                if (!b.fields.duedate) return -1;

                const dateA = new Date(a.fields.duedate);
                const dateB = new Date(b.fields.duedate);

                return dateA.getTime() - dateB.getTime();
            },
            furthest: (a: IssueElement, b: IssueElement) =>
                new Date(b.fields.duedate!).getTime() -
                new Date(a.fields.duedate!).getTime(),
        } as any;

        const sortedIssues = [...issues].sort(
            sortFunctionMap[sortBy] || (() => 0)
        );
        setIssues(sortedIssues);
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
