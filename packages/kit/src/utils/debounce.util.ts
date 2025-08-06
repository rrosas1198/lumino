import type { IMaybePromise } from "src/types/global.type.js";

type IDebounceFn = (...params: any[]) => IMaybePromise<unknown>;

export function debounce<T extends IDebounceFn>(fn: T, delay = 500) {
    let timeoutId = Number.NaN;

    const _clear = () => {
        clearTimeout(timeoutId);
        timeoutId = Number.NaN;
    };

    const debounced = (...params: Parameters<T>) => {
        return new Promise<ReturnType<T>>((resolve, reject) => {
            _clear();

            timeoutId = setTimeout(async () => {
                try {
                    resolve((await fn(...params)) as any);
                } catch (error) {
                    reject(error);
                } finally {
                    _clear();
                }
            }, delay) as any;
        });
    };

    debounced.clear = _clear;

    return debounced as T & { clear: () => void };
}
