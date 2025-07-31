import { type Ref, onUnmounted, watch } from "vue";
import { isBrowser } from "./environment";

let lastScrollY = 0;
let scrollBarWidth = 0;

export function useScrollLock(isActive: Ref<boolean>, isModal: boolean) {
    if (!isBrowser || !isModal) return;

    const scrollbarWidth = _getScrollbarWidth();
    const hasScrollBar = window.document.documentElement.clientHeight < window.document.documentElement.scrollHeight;

    const _lockScroll = () => {
        lastScrollY = window.scrollY;
        window.document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
        window.document.body.classList.add("scroll-locked");

        if (hasScrollBar) {
            window.document.body.classList.add("has-scrollbar");
        }
    };

    const _unlockScroll = () => {
        window.document.body.classList.remove("scroll-locked", "has-scrollbar");
        window.scrollTo(0, lastScrollY);
    };

    watch(isActive, (open) => {
        if (open) {
            _lockScroll();
        } else {
            _unlockScroll();
        }
    });

    onUnmounted(() => _unlockScroll());
}

function _getScrollbarWidth() {
    if (!isBrowser) return 0;

    const dummy = document.createElement("div");
    dummy.style.visibility = "hidden";
    dummy.style.overflow = "scroll";
    document.body.appendChild(dummy);
    scrollBarWidth = dummy.offsetHeight - dummy.clientWidth;
    document.body.removeChild(dummy);
    return scrollBarWidth;
}
