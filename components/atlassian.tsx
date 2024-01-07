import Issues from "@/components/atlassian/issues";

type Props = {};

function Atlassian({}: Props) {
    return (
        <div className="flex flex-wrap justify-center w-full h-full gap-5 overflow-y-auto grow">
            {/* //TODO Issues (filters[all/my]) */}
            {/* //TODO Open PRs */}
            <Issues />
        </div>
    );
}

export default Atlassian;
