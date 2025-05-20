export function isBrowser() {
    return typeof globalThis.window !== "undefined" && typeof globalThis.document !== "undefined";
}
