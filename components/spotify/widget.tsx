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
        <Card className="grid grid-cols-1 col-span-2 col-start-1 grid-rows-1 row-span-3 row-start-2 pt-4 2xl:pt-5 2xl:row-span-2 rounded-xl">
            <CardContent className="w-full h-full col-span-1 row-span-1">
                <div className="flex items-start w-full space-x-4">
                    <div className="flex-shrink-0">
                        <Image
                            alt="Album cover"
                            className="object-cover rounded-lg aspect-square"
                            height={80}
                            width={80}
                            src="https://nextui.org/_next/image?url=%2Fimages%2Falbum-cover.png&w=256&q=75"
                        />
                    </div>
                    <div className="flex items-start justify-between w-full h-full">
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-foreground">
                                Daily Mix
                            </span>
                            <span className="text-sm text-muted-foreground">
                                12 Tracks
                            </span>
                        </div>
                        <Heart className="text-foreground" />
                    </div>
                </div>
                <div className="px-4 py-3 2xl:py-5 mt-3 2xl:mt-4 space-y-3.5 rounded-lg bg-muted dark:bg-muted/70 w-full">
                    <div className="w-full bg-muted-foreground/30 rounded-full h-1.5">
                        <div
                            className="h-1.5 bg-foreground rounded-full"
                            style={{
                                width: "30%",
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-1 2xl:mt-3">
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
