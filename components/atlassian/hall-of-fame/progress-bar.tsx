import clsx from "clsx";

type Props = {
    progress: number;
    name: string;
    color: string;
};

function ProgressBar({ progress, name, color }: Props) {
    return (
        <div className="flex flex-col items-start justify-start w-full gap-2">
            <p className="font-medium text-md">{name}</p>
            <div className="flex items-center w-full gap-2">
                <div className="w-full h-2 rounded-full bg-muted">
                    <div
                        className={clsx(
                            "h-2 rounded-full",
                            `bg-gradient-to-r from-${
                                color.split("-")[0]
                            }-600 to-${color.split("-")[0]}-500`
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
