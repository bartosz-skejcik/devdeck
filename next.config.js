/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    output: "export",
    publicRuntimeConfig: {
        // Will be available on both server and client
        OpenWeatherApiKey: process.env.OPENWEATHER_APIKEY,
    },
};

module.exports = nextConfig;
