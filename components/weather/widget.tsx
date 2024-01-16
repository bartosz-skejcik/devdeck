import { Card, CardContent } from "@/components/ui/card";
import useForecast from "@/hooks/use-forecast";
import { GaugeCircle, Thermometer, Wind } from "lucide-react";
import WeatherSkeleton from "./skeleton";

type Props = {};

function WeatherWidget({}: Props) {
    const { forecast, loading } = useForecast();

    // Icon url
    // https://openweathermap.org/img/wn/10d@2x.png

    return forecast ? (
        <Card className="grid grid-cols-1 col-span-2 grid-rows-1 row-span-4 pt-2.5 2xl:pt-5 2xl:row-span-3 place-items-center rounded-xl">
            <CardContent className="w-full h-full col-span-1 row-span-1">
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-xl font-semibold 2xl:text-2xl">
                        {forecast.name}
                    </h2>
                    <p className="text-xs 2xl:text-sm text-muted-foreground">
                        {new Date().toLocaleDateString("en-PL", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-full mt-2 2xl:mt-5">
                    <h1 className="text-6xl 2xl:text-8xl text-foreground/90">
                        {Math.round(forecast.main.temp)}°
                    </h1>
                    <h3 className="text-lg 2xl:text-xl">
                        {forecast.weather &&
                            forecast.weather.length > 0 &&
                            forecast.weather[0].description[0].toUpperCase() +
                                forecast.weather[0].description.slice(1)}
                    </h3>
                </div>
                <div className="flex flex-col items-center justify-center w-full mt-4">
                    <div className="flex items-center justify-center w-5/6 px-1 py-2 overflow-hidden divide-x rounded-lg bg-muted dark:bg-muted/70 divide-muted-foreground">
                        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
                            <div className="flex flex-col items-center">
                                <Wind className="w-6 h-6 text-foreground" />
                                <p className="mt-1 text-sm">
                                    {forecast.wind.speed} m/s
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Wind
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
                            <div className="flex flex-col items-center">
                                <Thermometer className="w-6 h-6 text-foreground" />
                                <p className="mt-1 text-sm">
                                    {forecast.main.humidity}%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Humidity
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
                            <div className="flex flex-col items-center">
                                <GaugeCircle className="w-6 h-6 text-foreground" />
                                <p className="mt-1 text-sm">
                                    {forecast.main.pressure}hPa
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
    ) : (
        <WeatherSkeleton />
    );
}

export default WeatherWidget;
