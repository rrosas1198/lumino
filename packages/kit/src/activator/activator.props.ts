import type { ComponentPublicInstance, PropType } from "vue";
import { buildProps } from "../props";

export const buildActivatorProps = buildProps({
    activator: {
        type: [String, Object] as PropType<ComponentPublicInstance | HTMLElement | string>,
        default: undefined
    }
});
