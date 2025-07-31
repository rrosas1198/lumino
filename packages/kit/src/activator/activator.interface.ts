import type { MaybeRefOrGetter } from "vue";
import type { INullable } from "src/types";

export interface IActivatorOptions {
    element?: MaybeRefOrGetter<INullable<HTMLElement | string>>;
    events?: Record<string, EventListener>;
    disabled?: MaybeRefOrGetter<boolean>;
}
