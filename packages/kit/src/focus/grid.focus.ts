import { type Ref, onMounted, onUnmounted, readonly, ref } from "vue";

export interface IGridFocusOptions {
    /**
     * The number of columns in the grid.
     * This is used to determine the layout and navigation of the grid.
     * It should be a positive integer.
     */
    columns: number;

    /**
     * Whether to allow focus to flow in a specific direction.
     * If true, focus will wrap around when reaching the end of the grid.
     * If false, focus will stop at the last item.
     * This can be useful for creating a more intuitive navigation experience.
     * @default false
     */
    flow?: boolean;
}

/**
 * Provides a roving focus management system for a grid of items.
 * It allows users to navigate through the items using keyboard arrows and wraps around if specified.
 */
export function useGridFocus(items: Ref<HTMLElement[]>, options: IGridFocusOptions) {
    const { columns, flow = false } = options;

    const current = ref(0);

    const onKeydown = (event: KeyboardEvent) => {
        const element = event.target as HTMLElement;
        const index = items.value.indexOf(element);
        const total = items.value.length;

        const [row, col] = [Math.floor(index / columns), index % columns];

        let newIdx = -1;

        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                if (row > 0) {
                    newIdx = index - columns;
                }
                break;

            case "ArrowDown":
                event.preventDefault();
                newIdx = index + columns;
                if (newIdx >= total) {
                    newIdx = -1;
                }
                break;

            case "ArrowLeft":
                event.preventDefault();
                if (col > 0) {
                    newIdx = index - 1;
                } else if (flow && row > 0) {
                    newIdx = index - 1;
                }
                break;

            case "ArrowRight":
                event.preventDefault();
                if (col < columns - 1 && index + 1 < total) {
                    newIdx = index + 1;
                } else if (flow && index + 1 < total) {
                    newIdx = index + 1;
                }
                break;

            case "Home":
                event.preventDefault();
                focusItem(0);
                return;

            case "End":
                event.preventDefault();
                focusItem(total - 1);
                return;
        }

        if (newIdx >= 0) {
            focusItem(newIdx);
        }

        event.stopPropagation();
    };

    const focusItem = (index: number) => {
        if (items.value.length === 0 || index < 0 || index >= items.value.length) {
            return;
        }

        current.value = index;
        items.value[index]?.focus();

        items.value.forEach((element, idx) => {
            element.setAttribute("tabindex", index === idx ? "0" : "-1");
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
