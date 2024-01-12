import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FC } from "react";

type SideNavProps = {
    children: React.ReactNode;
};

const SideNav: React.FC<SideNavProps> = ({ children }) => (
    <nav className="flex items-start justify-center h-full col-span-2 p-3 bg-foreground/5">
        {children}
    </nav>
);

type ModalSectionProps = {
    title: string;
    children: React.ReactNode;
};

const Section: React.FC<ModalSectionProps> = ({ title, children }) => (
    <section className="flex flex-col items-center justify-start h-full col-span-5">
        <div className="sticky top-0 z-10 flex items-center justify-between w-full px-4 py-2 border-b border-border bg-background">
            <h3 className="text-xl font-semibold">{title}</h3>
            <DialogClose asChild>
                <Button type="button" variant="ghost" size="icon">
                    <X size={24} />
                </Button>
            </DialogClose>
        </div>
        {children}
    </section>
);

interface ModalWithSideNavProps {
    open: boolean;
    onOpenChange: () => void;
    children: React.ReactNode;
}

type ModalProps = {
    (props: ModalWithSideNavProps): JSX.Element;
    SideNav: FC<SideNavProps>;
    Section: FC<ModalSectionProps>;
};

const ModalWithSideNav: ModalProps = ({ open, onOpenChange, children }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[75vh] grid grid-cols-7 gap-0 p-0 overflow-y-auto">
                {children}
            </DialogContent>
        </Dialog>
    );
};

ModalWithSideNav.SideNav = SideNav;
ModalWithSideNav.Section = Section;

export default ModalWithSideNav;
