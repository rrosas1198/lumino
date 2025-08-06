import { type Ref, provide, ref } from "vue";
import { NestedToken } from "./nested.constants.js";
import type { INestedContext, NestedId } from "./nested.interface.js";

export interface INestedOptions {
    selected?: Ref<NestedId[]>;
    opened?: Ref<NestedId[]>;
    multiple?: Ref<boolean>;
    selectable?: Ref<boolean>;
    onSelect?: (selected: NestedId[]) => void;
    onOpen?: (opened: NestedId[]) => void;
}

export function useNested(options: INestedOptions = {}) {
    const elements = ref(new Map<NestedId, HTMLElement>());
    const selectedSet = ref(new Set<NestedId>());
    const openedSet = ref(new Set<NestedId>());

    const selected = options.selected || ref([]);
    const opened = options.opened || ref([]);
    const multiple = options.multiple || ref(false);
    const selectable = options.selectable || ref(false);

    const syncSelected = () => {
        selectedSet.value = new Set(selected.value);
    };

    const syncOpened = () => {
        openedSet.value = new Set(opened.value);
    };

    syncSelected();
    syncOpened();

    const context: INestedContext = {
        selected: selectedSet,
        opened: openedSet,
        multiple,
        selectable,

        register: (id: NestedId, element: HTMLElement) => {
            elements.value.set(id, element);
        },

        unregister: (id: NestedId) => {
            elements.value.delete(id);
        },

        selectNested: (id: NestedId, isSelected: boolean) => {
            if (!selectable.value) return;

            if (multiple.value) {
                if (isSelected) {
                    selectedSet.value.add(id);
                } else {
                    selectedSet.value.delete(id);
                }
            } else {
                selectedSet.value.clear();
                if (isSelected) {
                    selectedSet.value.add(id);
                }
            }

            selected.value = Array.from(selectedSet.value);
            options.onSelect?.(selected.value);
        },

        openNested: (id: NestedId, isOpened: boolean) => {
            if (isOpened) {
                openedSet.value.add(id);
            } else {
                openedSet.value.delete(id);
            }

            opened.value = Array.from(openedSet.value);
            options.onOpen?.(opened.value);
        },

        isSelected: (id: NestedId) => selectedSet.value.has(id),
        isOpened: (id: NestedId) => openedSet.value.has(id),

        getItems: () => Array.from(elements.value.values())
    };

    provide(NestedToken, context);

    return context;
}
