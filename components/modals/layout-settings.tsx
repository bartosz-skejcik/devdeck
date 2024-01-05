import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppStore } from "@/stores/app-store";

type Props = {};

function DisplaySettingsModal({}: Props) {
    const { layoutSettingsModal, setLayoutSettingsModal } = useAppStore();
    return (
        <Dialog
            open={layoutSettingsModal}
            onOpenChange={() => setLayoutSettingsModal(false)}
        >
            <DialogContent>asd</DialogContent>
        </Dialog>
    );
}

export default DisplaySettingsModal;
