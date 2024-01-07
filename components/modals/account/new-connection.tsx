import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useUserPreferences } from "@/stores/user-preferences";
import Link from "next/link";
import { FormEvent } from "react";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    provider: "github" | "atlassian";
};

export function NewConnectionModal({ open, setOpen, provider }: Props) {
    const { toast } = useToast();

    const addConnection = useUserPreferences((state) => state.addConnection);

    function handleAddConnection(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // const email = formData.get("email") as string;
        // const apikey = formData.get("apikey") as string;
        // const organizationDomain = formData.get(
        //     "organization-domain"
        // ) as string;
        const email = e.currentTarget.email.value;
        const apikey = e.currentTarget.apikey.value;
        const organizationDomain = e.currentTarget["organization-domain"].value;

        try {
            if (email !== "" && apikey !== "") {
                if (provider === "github") {
                    addConnection({
                        email,
                        apiKey: apikey,
                        name:
                            provider.charAt(0).toUpperCase() +
                            provider.slice(1),
                    });
                } else if (provider === "atlassian" && organizationDomain) {
                    addConnection({
                        email,
                        apiKey: apikey,
                        name:
                            provider.charAt(0).toUpperCase() +
                            provider.slice(1),
                        organizationDomain,
                    });
                } else {
                    throw new Error("Invalid provider");
                }
                setOpen(false);
                toast({
                    title: "✅ Connection added",
                    description: "You have successfully added a connection.",
                });
            } else {
                toast({
                    title: "❌ Invalid data",
                    description: "Please fill all the required fields.",
                });
            }
        } catch (error: any) {
            toast({
                title: "❌ Something went wrong",
                description: error.message,
            });
        }
    }

    return (
        <Dialog onOpenChange={() => setOpen(false)} open={open}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>New connection</DialogTitle>
                    <DialogDescription>
                        Connect your account to {provider}. Input the required
                        data to connect your account.
                        {provider === "atlassian" && (
                            <>
                                <br />
                                Generate your API key{" "}
                                <Link
                                    target="_blank"
                                    href="https://id.atlassian.com/manage-profile/security/api-tokens"
                                    className="text-primary"
                                >
                                    here
                                </Link>
                            </>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleAddConnection}
                    className="grid gap-4 py-4"
                >
                    {provider === "atlassian" && (
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label
                                htmlFor="organization-domain"
                                className="text-right"
                            >
                                Organization domain
                            </Label>
                            <Input
                                id="organization-domain"
                                placeholder="example.atlassian.net"
                                className="col-span-3"
                            />
                        </div>
                    )}
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="john@doe.com"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="apikey" className="text-right">
                            apiKey
                        </Label>
                        <Input
                            id="apikey"
                            type="text"
                            placeholder="sdSDFgshdo2134oheqfSfsfauhio13"
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
