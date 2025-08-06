import type { PropType } from "vue";
import type { IAriaLive } from "../types/aria.type.js";
import { buildProps } from "./prop.factory.js";

export const buildLoadableProps = buildProps({
    loading: {
        type: Boolean,
        default: undefined
    },
    ariaLive: {
        type: String as PropType<IAriaLive>,
        values: ["off", "assertive", "polite"],
        default: undefined
    }
});
