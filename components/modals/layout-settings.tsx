import { useAppStore } from "@/stores/app-store";
import { Settings2 } from "lucide-react";
import ModalWithSideNav from "@/components/modals/with-side-nav";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/stores/user-preferences";
import { Switch } from "../ui/switch";

type Props = {};

const sideNav = [
    {
        name: "General",
        icon: <Settings2 size={24} />,
    },
];

function DisplaySettingsModal({}: Props) {
    const { layoutSettingsModal, setLayoutSettingsModal } = useAppStore();
    const { simpleMode, setSimpleMode } = useUserPreferences();

    return (
        <ModalWithSideNav
            open={layoutSettingsModal}
            onOpenChange={() => setLayoutSettingsModal(false)}
        >
            <ModalWithSideNav.SideNav>
                {sideNav.map((item, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="flex items-center justify-start w-full"
                    >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                    </Button>
                ))}
            </ModalWithSideNav.SideNav>
            <ModalWithSideNav.Section title="General">
                <div className="flex flex-col items-start justify-start w-full gap-2 p-4">
                    <h5 className="text-lg font-medium">Display Settings</h5>
                    <p className="text-muted-foreground">
                        Personalize your display settings to your liking. You
                        can change the theme, font size, and more.
                    </p>
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-2 p-4">
                    <div className="flex items-center justify-between w-full py-3 pr-3">
                        <div className="flex flex-col items-start justify-center">
                            <h6 className="text-base font-medium">
                                Simple mode
                            </h6>
                            <p className="text-sm text-muted-foreground">
                                Enable simple mode to hide advanced settings and
                                simplify the interface.
                            </p>
                        </div>
                        <Switch
                            checked={simpleMode}
                            onCheckedChange={(checked) => {
                                setSimpleMode(checked);
                            }}
                        />
                    </div>
                </div>
            </ModalWithSideNav.Section>
        </ModalWithSideNav>
    );
}

export default DisplaySettingsModal;
