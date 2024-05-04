import useForecast from "@/hooks/use-forecast";
import {
    DropletsIcon,
    MapPinnedIcon,
    ScanFaceIcon,
    ThermometerIcon,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};

function SimpleMode({}: Props) {
    const { forecast } = useForecast();

    return (
        forecast && (
            <div className="flex flex-grow w-full h-[75vh] grid-cols-6 gap-5 items-center justify-center">
                <main className="flex items-center justify-center w-2/3 gap-24">
                    <div className="flex flex-col items-start justify-center w-full gap-2">
                        <ScanFaceIcon size={450} />
                        <h1 className="text-2xl">Hello there</h1>
                        <p className="text-2xl text-muted-foreground">
                            {new Date().toLocaleDateString("en-PL", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full gap-3">
                        <div className="flex flex-row items-center justify-center w-full">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle className="font-normal capitalize">
                                        {forecast?.weather[0].description}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center gap-4">
                                    <section className="flex flex-row items-center justify-center w-full gap-4">
                                        <div className="relative w-full h-12">
                                            <div
                                                className="absolute z-10 flex items-center justify-start h-12 rounded-full pl-7 bg-primary text-neutral-50"
                                                style={{
                                                    // animate the width of the humidity bar
                                                    transition:
                                                        "width 0.5s ease-in-out",
                                                    width: `${forecast?.main.humidity}%`,
                                                }}
                                            >
                                                <p className="text-lg">
                                                    Humidity{" "}
                                                    {forecast?.main.humidity}%
                                                </p>
                                            </div>
                                            <div className="absolute w-full h-4 rounded-full top-4 bg-muted"></div>
                                        </div>
                                        <div className="flex items-center justify-center h-12 p-2 rounded-full bg-primary text-neutral-50">
                                            <DropletsIcon size={32} />
                                        </div>
                                    </section>
                                    <section className="flex flex-row items-center justify-center w-full gap-4">
                                        <div className="flex items-center justify-start w-1/2 h-12 gap-3 px-6 text-center transition-all duration-300 rounded-3xl bg-foreground text-primary hover:rounded-2xl">
                                            <ThermometerIcon size={32} />
                                            <p className="text-lg">
                                                Feels{" "}
                                                {forecast?.main.feels_like}°C
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-start w-1/2 h-12 gap-3 px-6 text-center transition-all duration-300 rounded-3xl bg-primary hover:rounded-2xl">
                                            <MapPinnedIcon size={32} />
                                            <p className="text-lg">
                                                {forecast?.name}
                                            </p>
                                        </div>
                                    </section>
                                </CardContent>
                            </Card>
                            <div className="h-full">asd</div>
                        </div>
                        <div className="w-full"></div>
                    </div>
                </main>
            </div>
        )
    );
}

export default SimpleMode;
