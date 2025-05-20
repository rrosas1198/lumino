import { buildProps } from "src/build-props";
import type { IAriaLive } from "src/types";
import type { PropType } from "vue";

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
