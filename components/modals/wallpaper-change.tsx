import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAppStore } from "@/stores/app-store";
import { useUserPreferences } from "@/stores/user-preferences";
import { useToast } from "@/components/ui/use-toast";
import { BackgroundBlur } from "@/types.d";

type Props = {};

function ChangeWallpaperModal({}: Props) {
    const { toast } = useToast();

    const { setWallpaperChangeModal, wallpaperChangeModal } = useAppStore(
        (state) => state
    );
    const { wallpaper, backgroundBlur, deleteWallpaper, changeWallpaper } =
        useUserPreferences((state) => state);

    function convertLevelToEnum(value: string) {
        switch (value) {
            case "0":
                return BackgroundBlur.none;
            case "5":
                return BackgroundBlur.low;
            case "10":
                return BackgroundBlur.medium;
            case "15":
                return BackgroundBlur.high;
            default:
                return BackgroundBlur.none;
        }
    }

    const handleWallpaperChange = (e: FormData) => {
        const url = e.get("url") as string;
        const blur = e.get("blur") as string;

        if (url && url !== "") {
            try {
                if (convertLevelToEnum(blur) !== backgroundBlur) {
                    changeWallpaper(url, convertLevelToEnum(blur));
                } else {
                    changeWallpaper(url);
                }
                setWallpaperChangeModal(false);
            } catch (error: any) {
                toast({
                    title: "🚨 Error",
                    description: error.message,
                });
            }
        }
    };

    return (
        <Dialog
            open={wallpaperChangeModal}
            onOpenChange={() => {
                setWallpaperChangeModal(false);
            }}
        >
            <DialogContent className="sm:max-w-[515px]">
                <form action={handleWallpaperChange}>
                    <DialogHeader>
                        <DialogTitle>Change the background</DialogTitle>
                        <DialogDescription>
                            Change the background of your home screen. You can
                            use any image url. eg: .gif, .png, .jpg
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-5">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="username" className="text-right">
                                Url
                            </Label>
                            <Input
                                defaultValue={wallpaper}
                                name="url"
                                id="url"
                                className="col-span-3"
                                placeholder="https://example.com/wallpaper.png"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label
                                htmlFor="username"
                                className="w-full col-span-1 text-right"
                            >
                                Background blur
                            </Label>
                            <Select
                                defaultValue={backgroundBlur.toString()}
                                name="blur"
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select the level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">None</SelectItem>
                                    <SelectItem value="5">Low</SelectItem>
                                    <SelectItem value="10">Medium</SelectItem>
                                    <SelectItem value="15">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        {wallpaper !== "" && (
                            <Button
                                onClick={() => {
                                    try {
                                        deleteWallpaper();
                                        setWallpaperChangeModal(false);
                                    } catch (error: any) {
                                        toast({
                                            title: "🚨 Error",
                                            description: error.message,
                                        });
                                    }
                                }}
                                variant="secondary"
                            >
                                Delete
                            </Button>
                        )}
                        <Button type="submit">
                            {wallpaper !== "" ? "Save changes" : "Confirm"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ChangeWallpaperModal;
