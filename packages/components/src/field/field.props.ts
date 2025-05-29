import { buildProps } from "@lumino/kit";
import type { ExtractPropTypes } from "vue";

export type IFieldProps = ExtractPropTypes<ReturnType<typeof buildFieldProps>>;

export const buildFieldProps = buildProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: undefined
    },
    label: {
        type: String,
        required: true
    },
    focused: {
        type: Boolean,
        default: false
    },
    invalid: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
});
