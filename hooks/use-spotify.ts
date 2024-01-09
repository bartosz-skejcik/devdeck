import { useUserPreferences } from "@/stores/user-preferences";
import { Track } from "@/types/spotify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useSpotfiy = () => {
    // flow
    // 1. fetch the currently playing track
    //   - if auth error
    //     - authenticate using the backend proxy url: http://localhost:3001/spotify/auth
    //       query params: client_email, state
    //   - if auth successful
    //     - fetch the currently playing track: http://localhost:3001/spotify/proxy with url in the body and client_email and state in query params
    //       - if successful
    //         - return the track
    //       - if error
    //         - return null

    const [currentlyPlayingTrack, setCurrentlyPlayingTrack] =
        useState<Track | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const router = useRouter();

    const conenctions = useUserPreferences((state) => state.connections);

    const spotifyConnection = conenctions.find(
        (connection) => connection.name === "Spotify"
    );

    const authenticate = async () => {
        if (!spotifyConnection) {
            setError(new Error("Spotify connection not found"));
            setLoading(false);
            return;
        }

        const response = await fetch(
            `http://localhost:3001/spotify/auth?client_email=${spotifyConnection.email}&state=${spotifyConnection.stateHash}`
        );

        const data = await response.json();

        console.log(data);

        // window.location.href = data.redirect;
        router.push(data.redirect);
    };

    const fetchCurrentlyPlayingTrack = async () => {
        if (!spotifyConnection) {
            setError(new Error("Spotify connection not found"));
            authenticate();
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3001/spotify/proxy?client_email=${spotifyConnection.email}&state=${spotifyConnection.stateHash}&url=https://api.spotify.com/v1/me/player/currently-playing`
            );

            const data = await response.json();

            setIsPlaying(data.is_playing);

            if (data.error) {
                setError(new Error(data.error));
                authenticate();
                return;
            } else {
                setCurrentlyPlayingTrack(data);
                return;
            }
        } catch (error: any) {
            setError(error.message);
            return;
        }
    };

    const nextTrack = async () => {
        if (!spotifyConnection) {
            setError(new Error("Spotify connection not found"));
            authenticate();
            setLoading(false);
            return;
        }

        const reqUrl = `https://api.spotify.com/v1/me/player/next`;

        const response = await fetch(
            `http://localhost:3001/spotify/proxy?client_email=${spotifyConnection.email}&state=${spotifyConnection.stateHash}&url=${reqUrl}&method=POST`
        );

        if (response.status !== 200) {
            setError(new Error("Error skipping track"));
            return;
        }

        await fetchCurrentlyPlayingTrack();
    };

    const previousTrack = async () => {
        if (!spotifyConnection) {
            setError(new Error("Spotify connection not found"));
            authenticate();
            setLoading(false);
            return;
        }

        const reqUrl = `https://api.spotify.com/v1/me/player/previous`;

        const response = await fetch(
            `http://localhost:3001/spotify/proxy?client_email=${spotifyConnection.email}&state=${spotifyConnection.stateHash}&url=${reqUrl}&method=POST`
        );

        if (response.status !== 200) {
            setError(new Error("Error skipping track"));
            return;
        }

        await fetchCurrentlyPlayingTrack();
    };

    const togglePlaying = async () => {
        if (!spotifyConnection) {
            setError(new Error("Spotify connection not found"));
            authenticate();
            setLoading(false);
            return;
        }

        const reqUrl = `https://api.spotify.com/v1/me/player/${
            isPlaying ? "pause" : "play"
        }`;

        const response = await fetch(
            `http://localhost:3001/spotify/proxy?client_email=${spotifyConnection.email}&state=${spotifyConnection.stateHash}&url=${reqUrl}&method=PUT`
        );

        if (response.status !== 200) {
            setError(new Error("Error toggling playing"));
            return;
        }

        setIsPlaying((prev) => !prev);
    };

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);

            await fetchCurrentlyPlayingTrack();

            setLoading(false);
        };

        fetch();
    }, []);

    return {
        currentlyPlayingTrack,
        loading,
        error,
        fetchCurrentlyPlayingTrack,
        togglePlaying,
        isPlaying,
        nextTrack,
        previousTrack,
    };
};

export default useSpotfiy;
