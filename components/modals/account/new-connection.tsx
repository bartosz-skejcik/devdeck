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
    provider: "github" | "atlassian" | "spotify";
};

export function NewConnectionModal({ open, setOpen, provider }: Props) {
    const { toast } = useToast();

    const addConnection = useUserPreferences((state) => state.addConnection);
    const connections = useUserPreferences((state) => state.connections);

    const connection = connections.find(
        (c) => c.name.toLowerCase() === provider.toLocaleLowerCase()
    );

    const generateClientStateHash = useUserPreferences(
        (state) => state.generateClientStateHash
    );

    function handleAddConnection(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        // const email = formData.get("email") as string;
        // const apikey = formData.get("apikey") as string;
        // const organizationDomain = formData.get(
        //     "organization-domain"
        // ) as string;

        const email = e.currentTarget.email.value;

        try {
            if (email !== "") {
                if (provider.toLowerCase() === "github") {
                    const apikey = e.currentTarget.apikey.value;

                    if (apikey === "") {
                        throw new Error("Invalid data");
                    }

                    addConnection({
                        email,
                        apiKey: apikey,
                        name:
                            provider.charAt(0).toUpperCase() +
                            provider.slice(1),
                    });
                } else if (provider.toLowerCase() === "atlassian") {
                    const organizationDomain =
                        e.currentTarget["organization-domain"].value;
                    const apikey = e.currentTarget.apikey.value;

                    if (organizationDomain === "" || apikey === "") {
                        throw new Error("Invalid data");
                    }

                    addConnection({
                        email,
                        apiKey: apikey,
                        name:
                            provider.charAt(0).toUpperCase() +
                            provider.slice(1),
                        organizationDomain,
                    });
                } else if (provider.toLowerCase() === "spotify") {
                    const hash =
                        e.currentTarget.hash.value ?? generateClientStateHash();

                    addConnection({
                        email,
                        stateHash: hash,
                        name:
                            provider.charAt(0).toUpperCase() +
                            provider.slice(1),
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
                    {provider.toLocaleLowerCase() === "atlassian" && (
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
                                defaultValue={
                                    connection?.organizationDomain ?? ""
                                }
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
                            defaultValue={connection?.email ?? ""}
                        />
                    </div>
                    {provider.toLocaleLowerCase() !== "spotify" && (
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="apikey" className="text-right">
                                apiKey
                            </Label>
                            <Input
                                id="apikey"
                                type="text"
                                placeholder="sdSDFgshdo2134oheqfSfsfauhio13"
                                className="col-span-3"
                                defaultValue={connection?.apiKey ?? ""}
                            />
                        </div>
                    )}
                    {provider.toLocaleLowerCase() === "spotify" && (
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="hash" className="text-right">
                                hash
                            </Label>
                            <Input
                                id="hash"
                                type="text"
                                placeholder="sdSDFgshdo2134oheqfSfsfauhio13"
                                className="col-span-3"
                                defaultValue={connection?.stateHash ?? ""}
                            />
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit">
                            {connection ? "Update" : "Add"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
