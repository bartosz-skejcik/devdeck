import {
    Heart,
    Pause,
    Play,
    Repeat,
    Shuffle,
    SkipBack,
    SkipForward,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import useSpotfiy from "@/hooks/use-spotify";
import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {};

const timestampToMinutes = (timestamp: number) => {
    const minutes = Math.floor(timestamp / 1000 / 60);
    const seconds = Math.floor(timestamp / 1000) - minutes * 60;

    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const calculateProgress = (progress: number, duration: number) => {
    return (progress / duration) * 100;
};

function SpotifyWidget({}: Props) {
    const {
        currentlyPlayingTrack,
        loading,
        error,
        fetchCurrentlyPlayingTrack,
        isPlaying,
        togglePlaying,
        nextTrack,
        previousTrack,
    } = useSpotfiy();

    // add a function that will add one second to the progress every second
    // and then fetch the currently playing track again if the progress is equal to the duration
    // this will make it so that the progress bar is always accurate
    // and the track will change when it's finished

    const [progress, setProgress] = useState(
        currentlyPlayingTrack?.progress_ms!
    );

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            if (progress < currentlyPlayingTrack?.item.duration_ms!) {
                setProgress(progress + 1000);
            } else {
                fetchCurrentlyPlayingTrack();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [progress, currentlyPlayingTrack?.item?.duration_ms, isPlaying]);

    return (
        !loading && (
            <Card className="grid grid-cols-1 col-span-2 col-start-1 grid-rows-1 row-span-3 row-start-2 pt-4 2xl:pt-5 2xl:row-span-2 rounded-xl">
                <CardContent className="w-full h-full col-span-1 row-span-1">
                    <div className="flex items-start w-full space-x-4">
                        <div className="flex-shrink-0">
                            <Image
                                alt="Album cover"
                                className="object-cover rounded-lg aspect-square"
                                height={80}
                                width={80}
                                src={
                                    currentlyPlayingTrack?.item.album.images[1]
                                        .url ??
                                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWAgICQdD0xAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
                                }
                            />
                        </div>
                        <div className="flex items-start justify-between w-full h-full">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold text-foreground">
                                    <Link
                                        className="transition duration-200 hover:underline"
                                        href={
                                            currentlyPlayingTrack?.item
                                                .external_urls.spotify! ?? "#"
                                        }
                                    >
                                        {currentlyPlayingTrack?.item.name ??
                                            "N/A"}
                                    </Link>
                                </p>
                                <p className="text-sm text-muted-foreground flex items-start gap-0.5">
                                    {currentlyPlayingTrack?.item.artists &&
                                    currentlyPlayingTrack?.item.artists.length >
                                        0 ? (
                                        currentlyPlayingTrack?.item.artists.map(
                                            (artist) => (
                                                <span key={artist.id}>
                                                    {artist.name}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <span>N/A</span>
                                    )}
                                </p>
                            </div>
                            <Heart className="text-foreground" />
                        </div>
                    </div>
                    <div className="px-4 py-3 2xl:py-5 mt-3 2xl:mt-4 space-y-3.5 rounded-lg bg-muted dark:bg-muted/70 w-full">
                        <div className="w-full bg-muted-foreground/30 rounded-full h-1.5">
                            <div
                                className="h-1.5 bg-foreground rounded-full transition duration-200"
                                style={{
                                    width: `${
                                        currentlyPlayingTrack
                                            ? calculateProgress(
                                                  currentlyPlayingTrack.progress_ms,
                                                  currentlyPlayingTrack.item
                                                      .duration_ms
                                              )
                                            : 0
                                    }%`,
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-1 2xl:mt-3">
                            <span className="w-1/12 text-xs text-muted-foreground">
                                {currentlyPlayingTrack ? (
                                    timestampToMinutes(
                                        currentlyPlayingTrack.progress_ms
                                    )
                                ) : (
                                    <>{"0:00"}</>
                                )}
                            </span>
                            <div className="flex items-center gap-2">
                                <Shuffle className="text-muted-foreground" />
                                <button
                                    className="transition duration-200 text-foreground hover:text-muted-foreground"
                                    onClick={async () => {
                                        await previousTrack();
                                    }}
                                >
                                    <SkipBack />
                                </button>
                                <button
                                    className="transition duration-200 text-foreground hover:text-muted-foreground"
                                    onClick={async () => {
                                        // break off the progress bar
                                        await togglePlaying();
                                        isPlaying &&
                                            currentlyPlayingTrack &&
                                            setProgress(
                                                currentlyPlayingTrack.progress_ms
                                            );
                                    }}
                                >
                                    {isPlaying ? <Pause /> : <Play />}
                                </button>
                                <button
                                    className="transition duration-200 text-foreground hover:text-muted-foreground"
                                    onClick={async () => {
                                        await nextTrack();
                                    }}
                                >
                                    <SkipForward />
                                </button>
                                <Repeat className="text-muted-foreground" />
                            </div>
                            <span className="w-1/12 text-xs text-muted-foreground">
                                {currentlyPlayingTrack ? (
                                    timestampToMinutes(
                                        currentlyPlayingTrack.item.duration_ms
                                    )
                                ) : (
                                    <>{"0:00"}</>
                                )}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    );
}

export default SpotifyWidget;
