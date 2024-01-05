import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/stores/app-store";
import { Workflow, User } from "lucide-react";

type Props = {};

function AccountDropdown({}: Props) {
    const setAccountConnectionsModal = useAppStore(
        (state) => state.setAccountConnectionsModal
    );
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <User size={24} />
                    <p>Bartek Paczesny</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <button
                        onClick={() => setAccountConnectionsModal(true)}
                        className="flex items-center w-full gap-2 cursor-pointer text-start"
                    >
                        <Workflow size={24} className="h-[1rem] w-[1rem]" />
                        <p>Connections</p>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AccountDropdown;
