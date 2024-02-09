import { useEffect, useState } from "react";

/**
 * @desc Small hack around the persisted store causing hydration issues
 * @see https://github.com/pmndrs/zustand/issues/324
 * @see https://github.com/pmndrs/zustand/issues/938
 */
export function useHasHydrated() {
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    return hasHydrated;
}
