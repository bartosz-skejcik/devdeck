type Props = {};

function ShortcutSkeleton({}: Props) {
    return (
        <div className="flex items-center justify-between gap-6 mx-auto">
            <div className="p-1.5 rounded-md bg-neutral-900 animate-pulse">
                <div className="rounded-lg w-7 h-7 bg-neutral-800"></div>
            </div>
            <div className="p-1.5 rounded-md bg-neutral-900 animate-pulse">
                <div className="rounded-lg w-7 h-7 bg-neutral-800"></div>
            </div>
            <div className="p-1.5 rounded-md bg-neutral-900 animate-pulse">
                <div className="rounded-lg w-7 h-7 bg-neutral-800"></div>
            </div>
            <div className="p-1.5 rounded-md bg-neutral-900 animate-pulse">
                <div className="rounded-lg w-7 h-7 bg-neutral-800"></div>
            </div>
            <div className="p-1.5 rounded-md bg-neutral-900 animate-pulse">
                <div className="rounded-lg w-7 h-7 bg-neutral-800"></div>
            </div>
        </div>
    );
}

export default ShortcutSkeleton;
