import type { PropType } from "vue";
import { buildProps } from "./prop.factory";

export type IColorValue = "primary" | "secondary" | "success" | "surface" | "error";

export type IVariantValue = "standard" | "filled" | "outlined";

export const buildColorProps = buildProps({
    color: {
        type: String as PropType<IColorValue>,
        values: ["primary", "secondary", "success", "surface", "error"],
        default: "primary"
    },
    variant: {
        type: String as PropType<IVariantValue>,
        values: ["standard", "filled", "outlined"],
        default: "standard"
    }
});
