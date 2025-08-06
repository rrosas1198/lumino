import type { INullable } from "src/types/global.type.js";
import type { ComponentPublicInstance, MaybeRefOrGetter } from "vue";

export interface IActivatorOptions {
    element?: MaybeRefOrGetter<INullable<ComponentPublicInstance | HTMLElement | string>>;
    events?: Record<string, EventListener>;
    disabled?: MaybeRefOrGetter<boolean>;
}
