import { computed } from "vue";
import type { Ref } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useCurrentInstance } from "./instance.composable";

export function useRoute(): Ref<RouteLocationNormalizedLoaded | undefined> {
    const instance = useCurrentInstance("useRoute");
    return computed(() => instance?.proxy?.$route);
}
