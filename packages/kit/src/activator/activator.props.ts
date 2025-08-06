import { buildProps } from "src/props/prop.factory.js";
import type { ComponentPublicInstance, PropType } from "vue";

export const buildActivatorProps = buildProps({
    activator: {
        type: [String, Object] as PropType<ComponentPublicInstance | HTMLElement | string>,
        default: undefined
    }
});
