import type { Ref } from "vue";

export type NestedId = string | number;

export interface INestedContext {
    selected: Ref<Set<NestedId>>;
    opened: Ref<Set<NestedId>>;
    multiple: Ref<boolean>;
    selectable: Ref<boolean>;
    register: (id: NestedId, element: HTMLElement) => void;
    unregister: (id: NestedId) => void;
    selectNested: (id: NestedId, selected: boolean) => void;
    openNested: (id: NestedId, opened: boolean) => void;
    isSelected: (id: NestedId) => boolean;
    isOpened: (id: NestedId) => boolean;
    getItems: () => HTMLElement[];
}
