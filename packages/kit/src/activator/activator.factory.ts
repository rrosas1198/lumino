import { onScopeDispose, ref, toValue, watch } from "vue";
import type { IActivatorOptions } from "./activator.interface";

export function useActivator(options: IActivatorOptions) {
    const trigger = ref<HTMLElement>();
    const disposables = new Set<() => void>();

    const _resolveElement = () => {
        const element = toValue(options.element);

        if (!element) {
            trigger.value = undefined;
        } else if (typeof element === "string") {
            trigger.value = document.querySelector<HTMLElement>(element) || undefined;
        } else {
            trigger.value = element;
        }
    };

    const _restartEvents = () => {
        unbindEvents();
        bindEvents();
    };

    const bindEvents = () => {
        if (!trigger.value || !options.events || toValue(options.disabled)) return;

        for (const name in options.events) {
            const handler = options.events[name]!;
            trigger.value.addEventListener(name, handler);
            disposables.add(() => trigger.value?.removeEventListener(name, handler));
        }
    };

    const unbindEvents = () => {
        disposables.forEach(dispose => dispose());
        disposables.clear();
    };

    watch(() => toValue(options.element), () => {
        if (import.meta.server) return;
        _resolveElement();
        _restartEvents();
    }, { immediate: true });

    watch(trigger, () => {
        _restartEvents();
    });

    watch(() => toValue(options.disabled), () => {
        _restartEvents();
    });

    onScopeDispose(() => {
        unbindEvents();
    });

    return { trigger, bindEvents, unbindEvents };
}
