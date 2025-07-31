import type { INullable } from "src/types";
import type { ComponentPublicInstance, MaybeRefOrGetter } from "vue";

export interface IActivatorOptions {
    element?: MaybeRefOrGetter<INullable<ComponentPublicInstance | HTMLElement | string>>;
    events?: Record<string, EventListener>;
    disabled?: MaybeRefOrGetter<boolean>;
}
