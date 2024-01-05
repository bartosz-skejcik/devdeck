"use client";

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

import { useAppStore } from "@/stores/app-store";
import ConnectionsTable from "@/components/modals/account/table";
import { NewConnectionModal } from "./account/new-connection";
import { useState } from "react";
import useStore from "@/hooks/use-store";
import { useUserPreferences } from "@/stores/user-preferences";

type Props = {};

function AccountConnectionsModal({}: Props) {
    const [open, setOpen] = useState(false);
    const [provider, setProvider] = useState<"github" | "atlassian">("github");

    const setNewConnectionModalOpen = (prov: "github" | "atlassian") => {
        setProvider(prov);
        setOpen(true);
    };

    const connections = useUserPreferences((state) => state.connections);

    const { accountConnectionsModal, setAccountConnectionsModal } = useAppStore(
        (state) => ({
            accountConnectionsModal: state.accountConnectionsModal,
            setAccountConnectionsModal: state.setAccountConnectionsModal,
        })
    );
    return (
        <>
            <NewConnectionModal
                open={open}
                setOpen={setOpen}
                provider={provider}
            />
            <Dialog
                open={accountConnectionsModal}
                onOpenChange={() =>
                    setAccountConnectionsModal &&
                    setAccountConnectionsModal(false)
                }
            >
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>My connections</DialogTitle>
                        <DialogDescription>
                            Manage your connections to other services in order
                            to use personalized features.
                        </DialogDescription>
                    </DialogHeader>
                    <ConnectionsTable
                        table={connections}
                        setNewConnectionModalOpen={setNewConnectionModalOpen}
                    />
                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button type="submit">Save changes</Button>
                        </DialogTrigger>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AccountConnectionsModal;
