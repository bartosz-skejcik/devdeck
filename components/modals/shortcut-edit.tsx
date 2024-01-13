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
import useStore from "@/hooks/use-store";

import { useAppStore } from "@/stores/app-store";
import { useUserPreferences } from "@/stores/user-preferences";
import { useToast } from "@/components/ui/use-toast";
import { FormEvent } from "react";

type Props = {};

function EditShortcutModal({}: Props) {
    const { toast } = useToast();

    const { editShortcutModal, setEditShortcutModal, editedShortcut } =
        useAppStore((state) => state);

    const userPreferences = useStore(useUserPreferences, (state) => state);

    function handleShortcutEdit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;
        const url = formData.get("url") as string;
        const icon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=64`;

        if (
            name &&
            name !== "" &&
            url &&
            url !== "" &&
            userPreferences &&
            editedShortcut
        ) {
            try {
                userPreferences.editShortcut(
                    { id: editedShortcut.id, name, url, icon },
                    editedShortcut
                );
                setEditShortcutModal(false, null);
            } catch (error: any) {
                toast({
                    title: "🚨 Error",
                    description: error.message,
                });
            }
        }
    }

    return (
        <Dialog
            open={editShortcutModal}
            onOpenChange={() => {
                setEditShortcutModal(false, null);
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleShortcutEdit}>
                    <DialogHeader>
                        <DialogTitle>
                            Edit <span>{editedShortcut?.name}</span>
                        </DialogTitle>
                        <DialogDescription>
                            Edit the name and url of your shortcut.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                defaultValue={editedShortcut?.name}
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
                                defaultValue={editedShortcut?.url}
                                name="url"
                                id="url"
                                className="col-span-3"
                                placeholder="https://twitter.com"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default EditShortcutModal;
