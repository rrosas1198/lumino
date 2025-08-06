import type { IMaybePromise } from "@lumino/kit";
import { buildFormAssociatedWithValidationProps, buildInputProps, buildItemsProps, buildListenerProp, buildProps, omit } from "@lumino/kit";
import type { ExtractPropTypes, PropType } from "vue";
import { buildFieldProps } from "../field/field.props.js";

export type ISelectProps = ExtractPropTypes<ReturnType<typeof buildSelectProps>>;

export const buildSelectProps = buildProps({
    opened: {
        type: Boolean,
        default: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    mandatory: {
        type: Boolean,
        default: false
    },
    clearable: {
        type: Boolean,
        default: false
    },
    searchable: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String, Number, Array, Object] as PropType<any>,
        default: undefined
    },
    "onUpdate:modelValue": buildListenerProp<(value: any) => IMaybePromise<void>>(),
    ...omit(buildInputProps(), ["inputMode", "type"]),
    ...buildFieldProps(),
    ...buildFormAssociatedWithValidationProps(),
    ...buildItemsProps()
});
