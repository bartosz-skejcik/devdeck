import { useUserPreferences } from "@/stores/user-preferences";
import { ITag, IUserTag } from "@/types.d";
import { useEffect, useState } from "react";

const useTags = () => {
    const [tags, setTags] = useState<IUserTag[]>([]);
    const { filterTags } = useUserPreferences();
    const [itemCount, setItemCount] = useState(20);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://dev.to/api/tags?per_page=${itemCount}}`
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
        setLoading(false);
    }, [filterTags, itemCount]);

    const fetchNextPage = async () => {
        setItemCount((prev) => prev + 20);
    };

    return { tags, loading, fetchNextPage };
};

export default useTags;
