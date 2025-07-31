import type { PropType } from "vue";
import { buildProps } from "../props";

export const buildActivatorProps = buildProps({
    activator: {
        type: [String, Object] as PropType<HTMLElement | string>,
        default: undefined
    }
});
