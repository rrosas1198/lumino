import { type Ref, onMounted, onUnmounted, readonly, ref } from "vue";

export interface ILinearFocusOptions {
    /**
     * Whether to wrap focus around when reaching the end of the list.
     * If false, focus will stop at the last item.
     * @default true
     */
    wrap?: boolean;

    /**
     * Orientation of the focus navigation.
     * Can be "horizontal" or "vertical".
     * @default "vertical"
     */
    orientation?: "horizontal" | "vertical";
}

/**
 * Provides a roving focus management system for a list of items.
 * It allows users to navigate through the items using keyboard arrows and wraps around if specified.
 */
export function useLinearFocus(items: Ref<HTMLElement[]>, options: ILinearFocusOptions = {}) {
    const { wrap = true, orientation = "vertical" } = options;

    const current = ref(0);

    const onKeydown = (event: KeyboardEvent) => {
        const element = event.target as HTMLElement;
        const index = items.value.indexOf(element);

        switch (event.key) {
            case "ArrowDown":
                if (orientation === "vertical") {
                    event.preventDefault();
                    focusItem(index + 1);
                }
                break;

            case "ArrowUp":
                if (orientation === "vertical") {
                    event.preventDefault();
                    focusItem(index - 1);
                }
                break;

            case "ArrowRight":
                if (orientation === "horizontal") {
                    event.preventDefault();
                    focusItem(index + 1);
                }
                break;

            case "ArrowLeft":
                if (orientation === "horizontal") {
                    event.preventDefault();
                    focusItem(index - 1);
                }
                break;

            case "Home":
                event.preventDefault();
                focusItem(0);
                break;

            case "End":
                event.preventDefault();
                focusItem(items.value.length - 1);
                break;
        }

        event.stopPropagation();
    };

    const focusItem = (index: number) => {
        const elements = items.value;
        if (elements.length === 0) return;

        let targetIndex = index;
        if (wrap) {
            targetIndex = ((index % elements.length) + elements.length) % elements.length;
        } else {
            targetIndex = Math.max(0, Math.min(index, elements.length - 1));
        }

        current.value = targetIndex;
        elements[targetIndex]?.focus();

        elements.forEach((element, idx) => {
            element.setAttribute("tabindex", idx === targetIndex ? "0" : "-1");
        });
    };

    onMounted(() => {
        items.value.forEach((element, index) => {
            element.addEventListener("keydown", onKeydown);
            element.setAttribute("tabindex", index === current.value ? "0" : "-1");
        });
    });

    onUnmounted(() => {
        for (const element of items.value) {
            element.removeEventListener("keydown", onKeydown);
        }
    });

    return {
        current: readonly(current),
        focusItem,
        focusFirst: () => focusItem(0),
        focusLast: () => focusItem(items.value.length - 1),
        focusNext: () => focusItem(current.value + 1),
        focusPrev: () => focusItem(current.value - 1)
    };
}
