import clsx from "clsx";

type Props = {
    title: string; // title
    description: string; // description
    children?: React.ReactNode;
    textSize: "sm" | "default" | "lg" | "xl";
};

function BlockWall({
    title,
    description,
    children,
    textSize = "default",
}: Props) {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-4 backdrop-blur backdrop-filter bg-foreground/5">
            <div className="flex flex-col items-center justify-center space-y-2">
                <h1
                    className={clsx(
                        "font-semibold text-center text-foreground",
                        // based on the textSize prop, we can change the font size
                        textSize == "default" ? "text-md" : `text-${textSize}`
                    )}
                >
                    {title}
                </h1>
                <p className="text-center text-foreground text-md">
                    {description}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 space-y-2">
                {children}
            </div>
        </div>
    );
}

export default BlockWall;
