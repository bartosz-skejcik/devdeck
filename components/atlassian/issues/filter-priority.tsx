import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type Props = {
    setPriority: (priority: string) => void;
};

const priorities = [
    {
        id: "1",
        iconUrl:
            "https://github.com/cglynne/jira_priority_icons/raw/master/jira_priority/highest.png",
        name: "Highest",
    },
    {
        id: "2",
        iconUrl:
            "https://github.com/cglynne/jira_priority_icons/raw/master/jira_priority/high.png",
        name: "High",
    },
    {
        id: "3",
        iconUrl:
            "https://github.com/cglynne/jira_priority_icons/raw/master/jira_priority/medium.png",
        name: "Medium",
    },
    {
        id: "4",
        iconUrl:
            "https://github.com/cglynne/jira_priority_icons/raw/master/jira_priority/low.png",
        name: "Low",
    },
    {
        id: "5",
        iconUrl:
            "https://github.com/cglynne/jira_priority_icons/raw/master/jira_priority/lowest.png",
        name: "Lowest",
    },
];

function PriorityFilter({ setPriority }: Props) {
    return (
        <Select
            onValueChange={(value) => {
                setPriority(value);
            }}
        >
            <SelectTrigger className="space-x-4 w-fit">
                <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    {priorities.map((priority) => (
                        <SelectItem
                            value={priority.id}
                            key={priority.id}
                            className="flex items-center gap-2"
                        >
                            <div className="flex items-center justify-start w-full gap-2">
                                <Image
                                    src={priority.iconUrl}
                                    width={24}
                                    height={24}
                                    alt={priority.name}
                                    className="w-[1vw] 3xl:w-[2vw] aspect-square"
                                />
                                {priority.name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default PriorityFilter;
