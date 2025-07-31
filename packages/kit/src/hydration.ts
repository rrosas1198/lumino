import { onMounted, shallowRef } from "vue";
import { isBrowser } from "./environment";

export function useHydration() {
    const isMounted = shallowRef(false);

    if (!isBrowser) {
        return { isMounted };
    }

    onMounted(() => {
        isMounted.value = true;
    });

    return { isMounted };
}
