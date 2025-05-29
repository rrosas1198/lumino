import { buildProps } from "@lumino/kit";
import type { ExtractPropTypes } from "vue";

export type IRippleProps = ExtractPropTypes<ReturnType<typeof buildRippleProps>>;

export const buildRippleProps = buildProps({
    disabled: {
        type: Boolean,
        default: false
    },
    unbounded: {
        type: Boolean,
        default: false
    }
});
