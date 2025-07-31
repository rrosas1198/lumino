import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue";
import { NestedToken } from "./nested.constants";
import type { NestedId } from "./nested.interface";

export function useNestedItem(id: NestedId, disabled?: boolean) {
    const itemRef = ref<HTMLElement>();
    const context = inject(NestedToken);

    const selected = computed(() => context?.isSelected(id) ?? false);
    const opened = computed(() => context?.isOpened(id) ?? false);

    const select = (value?: boolean) => {
        if (disabled || !context) return;
        const newValue = value ?? !selected.value;
        context.selectNested(id, newValue);
    };

    const open = (value?: boolean) => {
        if (disabled || !context) return;
        const newValue = value ?? !opened.value;
        context.openNested(id, newValue);
    };

    onMounted(() => {
        if (itemRef.value && context) {
            context.register(id, itemRef.value);
        }
    });

    onBeforeUnmount(() => {
        if (!context) return;
        context.unregister(id);
    });

    return {
        context,
        itemRef,
        selected,
        opened,
        select,
        open
    };
}
