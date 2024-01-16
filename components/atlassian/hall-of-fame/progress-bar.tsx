import clsx from "clsx";

type Props = {
    progress: number;
    name: string;
    color: string;
};

const colors = [
    {
        name: "yellow",
        hex: "#ca8a04",
        value: 600,
    },
    {
        name: "yellow",
        hex: "#eab308",
        value: 500,
    },
    {
        name: "green",
        hex: "#65a30d",
        value: 600,
    },
    {
        name: "green",
        hex: "#84cc16",
        value: 500,
    },
    {
        name: "blue",
        hex: "#0284c7",
        value: 600,
    },
    {
        name: "blue",
        hex: "#0ea5e9",
        value: 500,
    },
];

const calculatedColorGradientClassName = (color: string) => {
    switch (color) {
        case "yellow":
            return "bg-gradient-to-r from-yellow-500 to-yellow-400";
        case "green":
            return "bg-gradient-to-r from-green-500 to-green-400";
        case "blue":
            return "bg-gradient-to-r from-sky-500 to-sky-400";
        default:
            return "";
    }
};

function ProgressBar({ progress, name, color }: Props) {
    return (
        <div className="flex flex-col items-start justify-start w-full gap-2">
            <p className="text-base font-medium">{name}</p>
            <div className="flex items-center w-full gap-2">
                <div className="w-full h-2 rounded-full bg-muted">
                    <div
                        className={clsx(
                            "h-2 rounded-full",
                            calculatedColorGradientClassName(
                                color.split("-")[0]
                            )
                        )}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <span className="text-muted-foreground">
                    {Math.round(progress) <= 9 ? (
                        <p className="invisible">
                            0
                            <span className="visible">
                                {Math.round(progress)}%
                            </span>
                        </p>
                    ) : (
                        <p>{Math.round(progress)}%</p>
                    )}
                </span>
            </div>
        </div>
    );
}

export default ProgressBar;
