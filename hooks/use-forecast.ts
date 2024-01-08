import { Forecast } from "@/types/forecast";
import { useEffect, useState } from "react";
import getConfig from "next/config";

const { OpenWeatherApiKey } = getConfig().publicRuntimeConfig;

const useForecast = () => {
    const [forecast, setForecast] = useState<Forecast>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getForecast = async () => {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(async (position) => {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&&appid=${OpenWeatherApiKey}`
                );
                const data = (await res.json()) as Forecast;
                setForecast(data);
                setLoading(false);
            });
        };
        getForecast();
    }, []);

    return { forecast, loading };
};

export default useForecast;
