import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useAppStore } from "@/stores/app-store";
import { Button } from "@/components/ui/button";
import { Hash, Loader2, Plus, X } from "lucide-react";
import useTags from "@/hooks/use-tags";
import clsx from "clsx";
import { useUserPreferences } from "@/stores/user-preferences";
import { IUserTag } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import ModalWithSideNav from "@/components/modals/with-side-nav";

type Props = {};

const sideNav = [
    {
        name: "Manage tags",
        icon: <Hash size={24} />,
    },
];

function NewsSettingsModal({}: Props) {
    const { tags, loading, fetchNextPage } = useTags();
    const { addTag, deleteTag, filterTags } = useUserPreferences();

    const { newsSettingsModal, setNewsSettingsModal } = useAppStore(
        (state) => state
    );

    function handleTagClick(newTag: IUserTag) {
        return () => {
            if (tags.find((tag) => tag.id === newTag.id)?.followed) {
                deleteTag(newTag);
            } else {
                addTag(newTag);
            }
        };
    }

    return (
        <ModalWithSideNav
            open={newsSettingsModal}
            onOpenChange={() => setNewsSettingsModal(false)}
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
            <ModalWithSideNav.Section title="Manage tags">
                <div className="flex flex-col items-start justify-start w-full gap-2 p-4">
                    <h5 className="text-lg font-medium">
                        Choose tags to follow
                    </h5>
                    <p className="text-muted-foreground">
                        Let’s super-charge your feed with relevant content!
                        Start by choosing tags you want to follow, and we will
                        curate your feed accordingly.
                    </p>
                </div>
                <div className="flex flex-col items-start justify-start w-full gap-2 p-4">
                    <div className="flex items-center px-2 space-x-2">
                        <Checkbox
                            id="follow-all"
                            checked={tags.every((tag) => tag.followed)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    tags.forEach((tag) => {
                                        if (
                                            !filterTags.find(
                                                (t) => t.id === tag.id
                                            )
                                        ) {
                                            addTag(tag);
                                        }
                                    });
                                } else if (!checked) {
                                    filterTags.forEach((tag) => {
                                        deleteTag(tag);
                                    });
                                }
                            }}
                        />
                        <label
                            htmlFor="follow-all"
                            className="font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Follow all tags
                        </label>
                    </div>
                </div>
                <div className="flex flex-wrap items-start justify-start w-full gap-3 p-4">
                    {tags.map((tag) => (
                        <button
                            key={tag.id}
                            onClick={handleTagClick(tag)}
                            className={clsx(
                                "px-3 py-1 text-sm font-medium rounded-md flex items-center justify-center gap-3",
                                tag.followed
                                    ? "bg-primary text-white"
                                    : "hover:bg-muted-foreground/15"
                            )}
                        >
                            <span>{tag.name}</span>
                            <Plus
                                size={16}
                                className={clsx(
                                    "transition-all duration-200 z-0",
                                    tag.followed
                                        ? "rotate-[135deg] text-background dark:text-foreground"
                                        : "rotate-0 text-foreground"
                                )}
                            />
                        </button>
                    ))}
                </div>
                {/* button to fetch more */}
                <div className="flex items-center justify-center w-full px-4 pb-2">
                    <Button
                        variant={loading ? "ghost" : "outline"}
                        onClick={() => fetchNextPage()}
                        className="flex items-center justify-center gap-2"
                    >
                        <span>Load more</span>
                        <Loader2
                            size={16}
                            className={clsx(loading && "animate-spin")}
                        />
                    </Button>
                </div>
            </ModalWithSideNav.Section>
        </ModalWithSideNav>
        // <Dialog
        //     open={newsSettingsModal}
        //     onOpenChange={() => setNewsSettingsModal(false)}
        // >
        //     <DialogContent className="max-w-4xl max-h-[75vh] grid grid-cols-7 gap-0 p-0 overflow-y-auto">
        //         <nav className="flex items-start justify-center h-full col-span-2 p-3 bg-foreground/5">
        //             {sideNav.map((item, index) => (
        //                 <Button
        //                     key={index}
        //                     variant="ghost"
        //                     className="flex items-center justify-start w-full"
        //                 >
        //                     {item.icon}
        //                     <span className="ml-2">{item.name}</span>
        //                 </Button>
        //             ))}
        //         </nav>
        //         <section className="flex flex-col items-center justify-start h-full col-span-5">
        //             <div className="sticky top-0 z-10 flex items-center justify-between w-full px-4 py-2 border-b border-border bg-background">
        //                 <h3 className="text-xl font-semibold">Manage tags</h3>
        //                 <DialogClose asChild>
        //                     <Button type="button" variant="ghost" size="icon">
        //                         <X size={24} />
        //                     </Button>
        //                 </DialogClose>
        //             </div>
        //             <div className="flex flex-col items-start justify-start w-full gap-2 p-4">
        //                 <h5 className="text-lg font-medium">
        //                     Choose tags to follow
        //                 </h5>
        //                 <p className="text-muted-foreground">
        //                     Let’s super-charge your feed with relevant content!
        //                     Start by choosing tags you want to follow, and we
        //                     will curate your feed accordingly.
        //                 </p>
        //             </div>
        //             <div className="flex flex-col items-start justify-start w-full gap-2 p-4">
        //                 <div className="flex items-center px-2 space-x-2">
        //                     <Checkbox
        //                         id="follow-all"
        //                         checked={tags.every((tag) => tag.followed)}
        //                         onCheckedChange={(checked) => {
        //                             if (checked) {
        //                                 tags.forEach((tag) => {
        //                                     if (
        //                                         !filterTags.find(
        //                                             (t) => t.id === tag.id
        //                                         )
        //                                     ) {
        //                                         addTag(tag);
        //                                     }
        //                                 });
        //                             } else if (!checked) {
        //                                 filterTags.forEach((tag) => {
        //                                     deleteTag(tag);
        //                                 });
        //                             }
        //                         }}
        //                     />
        //                     <label
        //                         htmlFor="follow-all"
        //                         className="font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        //                     >
        //                         Follow all tags
        //                     </label>
        //                 </div>
        //             </div>
        //             <div className="flex flex-wrap items-start justify-start w-full gap-3 p-4">
        //                 {tags.map((tag) => (
        //                     <button
        //                         key={tag.id}
        //                         onClick={handleTagClick(tag)}
        //                         className={clsx(
        //                             "px-3 py-1 text-sm font-medium rounded-md flex items-center justify-center gap-3",
        //                             tag.followed
        //                                 ? "bg-primary text-white"
        //                                 : "hover:bg-muted-foreground/15"
        //                         )}
        //                     >
        //                         <span>{tag.name}</span>
        //                         <Plus
        //                             size={16}
        //                             className={clsx(
        //                                 "transition-all duration-200 z-0",
        //                                 tag.followed
        //                                     ? "rotate-[135deg] text-background dark:text-foreground"
        //                                     : "rotate-0 text-foreground"
        //                             )}
        //                         />
        //                     </button>
        //                 ))}
        //             </div>
        //             {/* button to fetch more */}
        //             <div className="flex items-center justify-center w-full px-4 pb-2">
        //                 <Button
        //                     variant={loading ? "ghost" : "outline"}
        //                     onClick={() => fetchNextPage()}
        //                     className="flex items-center justify-center gap-2"
        //                 >
        //                     <span>Load more</span>
        //                     <Loader2
        //                         size={16}
        //                         className={clsx(loading && "animate-spin")}
        //                     />
        //                 </Button>
        //             </div>
        //         </section>
        //     </DialogContent>
        // </Dialog>
    );
}

export default NewsSettingsModal;
