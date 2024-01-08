import { Card, CardContent } from "@/components/ui/card";

type Props = {};

function ClockWidget({}: Props) {
    return (
        <Card className="col-span-2 col-start-1 row-span-1 row-start-1 pt-0.5 2xl:pt-3 2xl:row-start-1 bg-background">
            <CardContent>
                <div className="flex flex-col items-center justify-center h-full grow">
                    <div className="-mb-1 text-2xl font-semibold 2xl:-mb-0 2xl:text-5xl">
                        12<span className="animate-pulse">:</span>00
                    </div>
                    <div className="font-medium 2xl:text-xl text-muted-foreground">
                        Monday, 1st January
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ClockWidget;
