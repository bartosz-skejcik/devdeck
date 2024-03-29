import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { driverObj } from "@/lib/driver";
import { useAppStore } from "@/stores/app-store";
import { useUserPreferences } from "@/stores/user-preferences";
import { driver } from "driver.js";
import { Workflow, User, LifeBuoyIcon } from "lucide-react";

type Props = {};

function AccountDropdown({}: Props) {
    const setAccountConnectionsModal = useAppStore(
        (state) => state.setAccountConnectionsModal
    );

    const setHasTakenTour = useUserPreferences(
        (state) => state.setHasTakenTour
    );

    const takeATour = () => {
        const config = driverObj(setHasTakenTour);
        driver(config).drive();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    id="dock-account"
                    variant="outline"
                    className="flex items-center gap-2"
                >
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
                <DropdownMenuItem asChild>
                    <button
                        className="flex items-center w-full gap-2 cursor-pointer text-start"
                        onClick={() => takeATour()}
                    >
                        <LifeBuoyIcon size={24} className="h-[1rem] w-[1rem]" />
                        <p>Take a Tour</p>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AccountDropdown;
