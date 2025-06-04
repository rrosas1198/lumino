import { buildProps } from "src/build-props";
import type { PropType } from "vue";

export type IColorValue = "primary" | "secondary";

export type IVariantValue = "standard" | "filled" | "outlined";

export const buildColorProps = buildProps({
    color: {
        type: String as PropType<IColorValue>,
        values: ["primary", "secondary"],
        default: "primary"
    },
    variant: {
        type: String as PropType<IVariantValue>,
        values: ["standard", "filled", "outlined"],
        default: "standard"
    }
});
