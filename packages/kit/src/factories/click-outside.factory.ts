import type { IArrayable } from "src/types/global.type.js";
import { type Ref, onBeforeUnmount, onMounted, toValue, watch } from "vue";

export interface IClickOutsideOptions {
    elements: Ref<IArrayable<HTMLElement | undefined>>;
    enabled: Ref<boolean>;
    handler: (event: MouseEvent) => void;
    capture?: boolean;
}

export function useClickOutside(options: IClickOutsideOptions) {
    const { elements, enabled, handler, capture = true } = options;

    const onClickOutside = (event: MouseEvent) => {
        if (!toValue(enabled)) return;

        const target = event.target as Element;
        const unwrapped = _unwrapElements(elements);
        const isClickInside = unwrapped.some((element) => element?.contains(target));

        if (!isClickInside) {
            handler(event);
        }
    };

    const _unwrapElements = (elements: Ref<IArrayable<HTMLElement | undefined>>) => {
        if (!Array.isArray(elements.value)) return [toValue(elements.value)];
        return elements.value.map((element) => toValue(element));
    };

    onMounted(() => {
        document.addEventListener("click", onClickOutside, capture);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("click", onClickOutside, capture);
    });

    watch(enabled, (value) => {
        if (value) {
            document.addEventListener("click", onClickOutside, capture);
        } else {
            document.removeEventListener("click", onClickOutside, capture);
        }
    });

    return { onClickOutside };
}
