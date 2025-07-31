import { autoUpdate, computePosition, flip, offset } from "@floating-ui/dom";
import { onScopeDispose, reactive, watch } from "vue";
import type { IFloatingOptions } from "./floating.interface";
import type { IDictionary } from "src/types";

export function useFloating({ reference, floating, enabled, strategy, placement }: IFloatingOptions) {
    let cleanup: (() => void) | undefined;

    const styles = reactive<IDictionary<string>>({
        position: strategy,
        top: "0px",
        left: "0px"
    });

    const relocate = async () => {
        if (!reference.value || !floating.value) return;

        const result = await computePosition(reference.value, floating.value, {
            placement: placement as any,
            middleware: [offset(8), flip()],
            strategy
        });

        Object.assign(styles, {
            position: strategy,
            top: `${result.y}px`,
            left: `${result.x}px`
        });
    };

    const _setupAutoUpdate = () => {
        cleanup?.();

        if (!!reference.value && !!floating.value) {
            cleanup = autoUpdate(reference.value, floating.value, relocate);
        }
    };

    watch([reference, floating, enabled], _setupAutoUpdate, { immediate: true });

    onScopeDispose(() => cleanup?.());

    return { styles, relocate };
}
