import type { Ref } from "vue";
import { shallowRef, toRef, watch } from "vue";

export function useLazy(enabled: Ref<boolean>) {
    const isBooted = shallowRef(false);
    const hasContent = toRef(() => isBooted.value || enabled.value);

    watch(enabled, () => {
        isBooted.value = true;
    });

    return { isBooted, hasContent };
}
