import { Project } from "@/types/project";

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
    projects: Project[];
    setProject: (project: string) => void;
    projectsLoading: boolean;
};

function ProjectsFilter({ projects, setProject, projectsLoading }: Props) {
    return (
        <Select
            onValueChange={(value) => {
                setProject(value);
            }}
        >
            <SelectTrigger className="space-x-4 w-fit">
                <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    {projectsLoading ? (
                        <SelectItem disabled value="">
                            Loading...
                        </SelectItem>
                    ) : (
                        projects &&
                        projects.map((project) => (
                            <SelectItem value={project.id} key={project.id}>
                                <div className="flex items-center justify-start w-full gap-2">
                                    <Image
                                        src={project.avatarUrls["48x48"]}
                                        width={24}
                                        height={24}
                                        alt={project.name}
                                        className="rounded"
                                    />
                                    <span>{project.name}</span>
                                </div>
                            </SelectItem>
                        ))
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default ProjectsFilter;
