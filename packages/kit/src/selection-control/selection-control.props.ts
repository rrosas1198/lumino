import type { ExtractPropTypes, PropType } from "vue";
import { buildProps } from "src/build-props";
import type { ISelectionControlValue } from "./selection-control.interface";

export type ISelectionControlProps = ExtractPropTypes<ReturnType<typeof buildSelectionControlProps>>;

export const buildSelectionControlProps = buildProps({
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
        type: [String, Number, Boolean, Array, Object] as PropType<ISelectionControlValue>,
        default: undefined
    },
    trueValue: {
        type: [String, Number, Boolean, Array, Object] as PropType<ISelectionControlValue>,
        default: undefined
    },
    falseValue: {
        type: [String, Number, Boolean, Array, Object] as PropType<ISelectionControlValue>,
        default: undefined
    },
    readonly: {
        type: Boolean,
        default: false
    },
    value: {
        type: [String, Number, Boolean, Array, Object] as PropType<ISelectionControlValue>,
        default: undefined
    }
});
