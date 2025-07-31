import { type Ref, nextTick, onBeforeUnmount, watch } from "vue";

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
].join(", ");

const stack: HTMLElement[] = [];

export interface IFocusTrapOptions {
    autoFocus?: boolean;
    restoreFocus?: boolean;
    autoFocusDelay?: number;
}

export function useFocusTrap(container: Ref<HTMLElement | undefined>, isActive: Ref<boolean>, options: IFocusTrapOptions = {}) {
    const { autoFocus = true, restoreFocus = true, autoFocusDelay = 0 } = options;

    let previousActiveElement: HTMLElement | null = null;
    let focusableElements: HTMLElement[] = [];

    const getTopElement = () => stack.at(-1);

    const getFocusableElements = (): HTMLElement[] => {
        if (!container.value) return [];
        return Array.from(container.value.querySelectorAll(FOCUSABLE_SELECTOR));
    };

    const focusFirstElement = () => {
        if (!autoFocus) return;

        const elements = getFocusableElements();
        const firstElement = elements[0];

        if (!firstElement) return;

        if (autoFocusDelay > 0) {
            window.setTimeout(() => firstElement.focus(), autoFocusDelay);
        } else {
            firstElement.focus();
        }
    };

    const trapFocus = (event: KeyboardEvent) => {
        if (event.key !== "Tab" || getTopElement() !== container.value) {
            return;
        }

        const elements = getFocusableElements();
        if (elements.length === 0) return;

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];
        const activeElement = window.document.activeElement as HTMLElement;

        if (!container.value?.contains(activeElement)) {
            event.preventDefault();
            firstElement?.focus();
            return;
        }

        if (!event.shiftKey && activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
        } else if (event.shiftKey && activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
        }
    };

    const activate = async () => {
        if (!container.value) return;

        if (restoreFocus) {
            previousActiveElement = window.document.activeElement as HTMLElement;
        }

        const index = stack.indexOf(container.value);
        if (index !== -1) {
            stack.splice(index, 1);
        }
        stack.push(container.value);

        await nextTick();
        focusableElements = getFocusableElements();

        focusFirstElement();
    };

    const deactivate = () => {
        if (!container.value) return;

        const index = stack.indexOf(container.value);
        if (index !== -1) {
            stack.splice(index, 1);
        }

        if (restoreFocus && previousActiveElement) {
            previousActiveElement.focus();
            previousActiveElement = null;
        }
    };

    watch(
        isActive,
        (value) => {
            if (value) {
                activate();
            } else {
                deactivate();
            }
        },
        { immediate: true }
    );

    onBeforeUnmount(() => {
        if (container.value) {
            deactivate();
        }
    });

    return {
        trapFocus,
        focusFirstElement,
        getFocusableElements,
        getTopElement
    };
}
