import type { EffectScope, WatchSource } from "vue";
import { effectScope, onScopeDispose, watch } from "vue";

// See https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/composables/toggleScope.ts#L7
export function useToggleScope (source: WatchSource<boolean>, fn: (reset: () => void) => void) {
    let scope: EffectScope | undefined;

    function start () {
        scope = effectScope();
        scope.run(() => fn.length
            ? fn(() => { scope?.stop(); start() })
            : (fn as any)()
        );
    }

    watch(source, active => {
        if (active && !scope) {
            start();
        } else if (!active) {
            scope?.stop();
            scope = undefined;
        }
    }, { immediate: true })

    onScopeDispose(() => {
        scope?.stop();
    });
}
