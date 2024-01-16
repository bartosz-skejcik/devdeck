import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GaugeCircle, Thermometer, Wind } from "lucide-react";

type Props = {};

function WeatherSkeleton({}: Props) {
    return (
        <Card className="grid grid-cols-1 col-span-2 grid-rows-1 row-span-4 pt-2.5 2xl:pt-5 2xl:row-span-3 place-items-center rounded-xl">
            <CardContent className="w-full h-full col-span-1 row-span-1">
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="w-1/3 h-6 text-xl font-semibold rounded bg-neutral-300 dark:bg-neutral-900 2xl:text-2xl animate-pulse">
                        {/* Skeleton for forecast.name */}
                    </h2>
                    <p className="w-1/2 h-4 mt-2 text-xs rounded bg-neutral-300 dark:bg-neutral-900 2xl:text-sm text-muted-foreground animate-pulse">
                        {/* Skeleton for date */}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-full mt-2 2xl:mt-6">
                    <h1 className="w-1/3 h-24 text-6xl rounded bg-neutral-300 dark:bg-neutral-900 2xl:text-8xl text-foreground/90 animate-pulse">
                        {/* Skeleton for forecast.main.temp */}
                    </h1>
                    <h3 className="w-1/2 h-6 mt-2 text-lg rounded bg-neutral-300 dark:bg-neutral-900 2xl:text-xl animate-pulse">
                        {/* Skeleton for forecast.weather[0].description */}
                    </h3>
                </div>
                <div className="flex flex-col items-center justify-center w-full mt-3">
                    <div className="flex items-center justify-center w-5/6 px-1 py-2 overflow-hidden divide-x rounded-lg bg-muted dark:bg-muted/70 divide-muted-foreground">
                        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
                            <div className="flex flex-col items-center">
                                <Wind className="w-6 h-6 text-foreground" />
                                <p className="w-10 h-4 mt-1 mb-1 text-sm rounded bg-neutral-400 dark:bg-neutral-800 animate-pulse">
                                    {/* Skeleton for forecast.wind.speed */}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Wind
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
                            <div className="flex flex-col items-center">
                                <Thermometer className="w-6 h-6 text-foreground" />
                                <p className="w-10 h-4 mt-1 mb-1 text-sm rounded bg-neutral-400 dark:bg-neutral-800 animate-pulse">
                                    {/* Skeleton for forecast.main.humidity */}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Humidity
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
                            <div className="flex flex-col items-center">
                                <GaugeCircle className="w-6 h-6 text-foreground" />
                                <p className="w-10 h-4 mt-1 mb-1 text-sm rounded bg-neutral-400 dark:bg-neutral-800 animate-pulse">
                                    {/* Skeleton for some other data */}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Pressure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default WeatherSkeleton;
