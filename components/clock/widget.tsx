import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

type Props = {};

function ClockWidget({}: Props) {
    const [time, setTime] = useState({
        hours: new Date().getHours(),
        minutes: new Date().getMinutes().toString(),
    });
    const date = setInterval(() => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        setTime({
            hours,
            minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        });
    }, 1000);
    return (
        <Card
            id="clock-widget"
            className="flex items-center justify-center col-span-2 col-start-1 row-span-1 row-start-1 pt-[1.35rem] 2xl:row-start-1 bg-background"
        >
            <CardContent className="flex items-center justify-center w-full h-full grow">
                <div className="flex flex-col items-center justify-center h-full grow">
                    <div className="text-2xl font-semibold 2xl:-mb-0 2xl:text-5xl">
                        {time.hours}
                        <span className="animate-pulse">:</span>
                        {time.minutes}
                    </div>
                    <div className="font-medium 2xl:text-xl text-muted-foreground">
                        {new Date().toLocaleDateString("en-PL", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ClockWidget;
