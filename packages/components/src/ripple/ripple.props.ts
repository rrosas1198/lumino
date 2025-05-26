import { buildProps } from "@lumino/kit";

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
