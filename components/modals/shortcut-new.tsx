import { Button } from "@/components/ui/button";
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
import { FormEvent } from "react";

export default function NewShortcutModal() {
    const { toast } = useToast();

    const { newShortcutModal: shortcutModalOpen, setNewShortcutModal } =
        useAppStore();
    const { addShortcut } = useUserPreferences();

    const handleShortcutAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const url = formData.get("url") as string;
        const icon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=64`;

        if (name && name !== "" && url && url !== "") {
            try {
                addShortcut({ name, url, icon });
                setNewShortcutModal(false);
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
            open={shortcutModalOpen}
            onOpenChange={() => {
                setNewShortcutModal(false);
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleShortcutAdd}>
                    <DialogHeader>
                        <DialogTitle>Add new shortcut</DialogTitle>
                        <DialogDescription>
                            Add a new shortcut to your dock for quick access to
                            your favorite websites.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                name="name"
                                id="name"
                                className="col-span-3"
                                placeholder="Twitter"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="username" className="text-right">
                                Url
                            </Label>
                            <Input
                                name="url"
                                id="url"
                                className="col-span-3"
                                placeholder="https://twitter.com"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
