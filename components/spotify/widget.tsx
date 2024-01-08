import {
    Heart,
    PlayCircle,
    Repeat,
    Shuffle,
    SkipBack,
    SkipForward,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type Props = {};

function SpotifyWidget({}: Props) {
    return (
        <Card className="grid grid-cols-1 col-span-2 grid-rows-1 row-span-2 pt-5 rounded-xl">
            <CardContent className="w-full h-full col-span-1 row-span-1">
                <div className="flex items-start w-full space-x-4">
                    <div className="flex-shrink-0">
                        <Image
                            alt="Album cover"
                            className="rounded-lg"
                            height={80}
                            width={80}
                            src="https://nextui.org/_next/image?url=%2Fimages%2Falbum-cover.png&w=256&q=75"
                            style={{
                                aspectRatio: "80/80",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                    <div className="flex items-start justify-between w-full h-full">
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-foreground">
                                Daily Mix
                            </span>
                            <span className="text-sm text-gray-300">
                                12 Tracks
                            </span>
                        </div>
                        <Heart className="text-foreground" />
                    </div>
                </div>
                <div className="px-4 py-5 mt-4 space-y-3.5 rounded-lg bg-muted w-full">
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                            className="bg-foreground h-1.5 rounded-full"
                            style={{
                                width: "30%",
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                            1:23
                        </span>
                        <div className="flex items-center gap-2">
                            <Shuffle className="text-muted-foreground" />
                            <SkipBack className="text-foreground" />
                            <PlayCircle className="text-foreground" />
                            <SkipForward className="text-foreground" />
                            <Repeat className="text-muted-foreground" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                            4:32
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default SpotifyWidget;
