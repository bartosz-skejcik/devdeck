import Issues from "@/components/atlassian/issues";
import HallOfFame from "@/components/atlassian/hall-of-fame";

type Props = {};

function Atlassian({}: Props) {
    return (
        <div className="grid flex-grow w-full h-[75vh] grid-cols-6 grid-rows-4 gap-5">
            {/* //TODO Issues (filters[all/my]) */}
            {/* //TODO Open PRs */}
            <Issues />
            <HallOfFame />
        </div>
    );
}

export default Atlassian;
