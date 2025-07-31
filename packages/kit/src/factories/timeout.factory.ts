import { onBeforeUnmount } from "vue";

export function useTimeout(duration: number, onFinish: () => void) {
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;

    const start = (newDuration?: number) => {
        stop();
        timeoutId = globalThis.setTimeout(onFinish, newDuration ?? duration);
    };

    const stop = () => {
        if (timeoutId) {
            globalThis.clearTimeout(timeoutId);
            timeoutId = undefined;
        }
    };

    onBeforeUnmount(() => {
        stop();
    });

    return { start, stop };
}
