import { isBrowser } from "src/environment.js";
import { debounce } from "src/utils/debounce.util.js";
import { nextTick, onScopeDispose, ref, toValue, watch } from "vue";
import type { IActivatorOptions } from "./activator.interface.js";

const UPDATE_FRAME_DURATION = 16;

export function useActivator(options: IActivatorOptions) {
    const trigger = ref<HTMLElement>();
    const disposables = new Set<() => void>();

    const bindEvents = () => {
        if (!trigger.value || !options.events || toValue(options.disabled)) return;
        if (!_isConnected(trigger.value)) return;

        for (const name in options.events) {
            const element = trigger.value;
            const handler = options.events[name]!;

            element.addEventListener(name, handler);

            disposables.add(() => {
                if (!_isConnected(element)) return;
                element.removeEventListener(name, handler);
            });
        }
    };

    const unbindEvents = () => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        disposables.forEach((dispose) => dispose());
        disposables.clear();
    };

    const _restartEvents = async () => {
        unbindEvents();
        await nextTick();
        _resolveElement();
        bindEvents();
    };

    const _resolveElement = () => {
        const element = toValue(options.element);

        if (!element) {
            trigger.value = undefined;
        } else if (typeof element === "string") {
            trigger.value = document.querySelector<HTMLElement>(element) || undefined;
        } else if ("$el" in element) {
            trigger.value = element.$el;
        } else {
            trigger.value = element;
        }
    };

    const _isConnected = (element: HTMLElement | undefined): boolean => {
        return !!(element?.isConnected && document.contains(element));
    };

    const _changeTriggerHandler = debounce(() => {
        if (!isBrowser) return;
        _restartEvents();
    }, UPDATE_FRAME_DURATION);

    const _changeElementHandler = debounce(() => {
        if (!isBrowser) return;
        _resolveElement();
        _restartEvents();
    }, UPDATE_FRAME_DURATION);

    watch(() => toValue(options.element), _changeElementHandler, {
        flush: "post",
        immediate: true
    });

    watch(trigger, _changeTriggerHandler, {
        flush: "post"
    });

    watch(
        () => toValue(options.disabled),
        (value) => {
            if (value) {
                unbindEvents();
            } else {
                _restartEvents();
            }
        }
    );

    onScopeDispose(() => {
        unbindEvents();
        _changeElementHandler.clear();
        _changeTriggerHandler.clear();
    });

    return { trigger, bindEvents, unbindEvents };
}
