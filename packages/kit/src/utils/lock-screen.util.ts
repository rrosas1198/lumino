export function lockScreen(shouldLock?: boolean) {
    const computedStyle = document.defaultView?.getComputedStyle(document.body, "");
    const isLocked = computedStyle?.overflow === "hidden";

    if (shouldLock && !isLocked) {
        document.body.style.setProperty("overflow", "hidden");
    } else if (!shouldLock && isLocked) {
        document.body.style.removeProperty("overflow");
    }
}
