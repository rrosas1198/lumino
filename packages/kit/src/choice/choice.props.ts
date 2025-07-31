import type { ExtractPropTypes, PropType } from "vue";
import { buildProps } from "../props";
import type { IChoiceValue } from "./choice.interface";

export type IChoiceProps = ExtractPropTypes<ReturnType<typeof buildChoiceProps>>;

export const buildChoiceProps = buildProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: undefined
    },
    multiple: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String, Number, Boolean, Array, Object] as PropType<IChoiceValue>,
        default: undefined
    },
    trueValue: {
        type: [String, Number, Boolean, Array, Object] as PropType<IChoiceValue>,
        default: undefined
    },
    falseValue: {
        type: [String, Number, Boolean, Array, Object] as PropType<IChoiceValue>,
        default: undefined
    },
    readonly: {
        type: Boolean,
        default: false
    },
    value: {
        type: [String, Number, Boolean, Array, Object] as PropType<IChoiceValue>,
        default: undefined
    }
});
