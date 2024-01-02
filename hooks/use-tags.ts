import { useUserPreferences } from "@/stores/user-preferences";
import { ITag, IUserTag } from "@/types.d";
import { useEffect, useState } from "react";

const useTags = () => {
    const [tags, setTags] = useState<IUserTag[]>([]);
    const { filterTags } = useUserPreferences();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(
                    "https://dev.to/api/tags?per_page=40"
                );
                const data = await response.json();
                const tagsWithFollowedProperty = data.map((tag: ITag) => ({
                    ...tag,
                    followed: false,
                }));
                // set followed to true if tag is in filterTags
                const tagsWithFollowedPropertyAndFilterTags =
                    tagsWithFollowedProperty.map((tag: ITag) => {
                        const exists = filterTags.some(
                            (t: IUserTag) => t.name === tag.name
                        );

                        if (exists) {
                            return { ...tag, followed: true };
                        } else {
                            return tag;
                        }
                    });
                setTags(tagsWithFollowedPropertyAndFilterTags);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, [filterTags]);

    return { tags };
};

export default useTags;
