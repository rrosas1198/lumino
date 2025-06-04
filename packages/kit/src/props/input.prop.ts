import { buildProps } from "src/build-props";
import type { PropType } from "vue";

export type IInputMode = "email" | "search" | "tel" | "text" | "url" | "none" | "numeric" | "decimal";

export type IInputType = "email" | "number" | "password" | "search" | "tel" | "text" | "url";

export const buildInputProps = buildProps({
    autocomplete: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    inputMode: {
        type: String as PropType<IInputMode>,
        values: ["email", "search", "tel", "text", "url", "none", "numeric", "decimal"],
        default: undefined
    },
    placeholder: {
        type: String,
        default: undefined
    },
    readonly: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    type: {
        type: String as PropType<IInputType>,
        values: ["email", "number", "password", "search", "tel", "text", "url"],
        default: "text"
    }
});
