import { computed } from "vue";
import { isBrowser } from "./environment.js";

const CONTAINER_CLASSNAME = "iD36o1mQrIZfQH8";

export function useTeleport() {
    const target = computed(() => {
        if (!isBrowser) return undefined;

        if (document.body == null) {
            return undefined;
        }

        let container = document.body.querySelector(`.${CONTAINER_CLASSNAME}`) as HTMLElement;

        if (!container) {
            container = document.createElement("div");
            // container.style.setProperty("position", "absolute");
            // container.style.setProperty("inset", "0");
            // container.style.setProperty("contain", "layout");
            // container.style.setProperty("display", "contents");
            // container.style.setProperty("pointer-events", "none");
            container.classList.add(CONTAINER_CLASSNAME);
            document.body.appendChild(container);
        }

        return container;
    });

    return { target };
}
