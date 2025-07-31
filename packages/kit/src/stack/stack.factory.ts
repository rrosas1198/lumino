import { isBrowser } from "src/environment";
import type { InjectionKey } from "vue";
import { inject, nextTick, provide, readonly, ref, watch } from "vue";
import type { IStackOptions } from "./stack.interface";

const stacks = new Map<string, number>();
const StackToken: InjectionKey<() => number> = Symbol.for("StackToken");

export function useStack(options: IStackOptions) {
    const zIndex = ref(options.initialValue);

    const _parentIncrement = inject(StackToken, undefined);

    const _assignIndex = () => {
        if (typeof _parentIncrement === "function") {
            zIndex.value = _parentIncrement();
        } else {
            _setRootIndex();
        }
    };

    const _setRootIndex = () => {
        if (!stacks.has(options.namespace)) {
            stacks.set(options.namespace, options.initialValue);
        }
        const current = stacks.get(options.namespace)! + 10;
        stacks.set(options.namespace, current);
        zIndex.value = current;
    };

    provide(StackToken, () => {
        const newZIndex = zIndex.value + 10;
        return newZIndex;
    });

    watch(
        () => options.enabled,
        (enabled) =>
            nextTick(() => {
                if (!isBrowser) return;
                if (!enabled) return;
                _assignIndex();
            }),
        { immediate: true }
    );

    return {
        zIndex: readonly(zIndex)
    };
}
