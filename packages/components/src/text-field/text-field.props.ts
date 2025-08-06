import type { IMaybePromise } from "@lumino/kit";
import { buildFormAssociatedWithValidationProps, buildInputProps, buildListenerProp, buildProps } from "@lumino/kit";
import type { ExtractPropTypes } from "vue";
import { buildFieldProps } from "../field/field.props.js";

export type ITextFieldProps = ExtractPropTypes<ReturnType<typeof buildTextFieldProps>>;

export const buildTextFieldProps = buildProps({
    modelValue: {
        type: String,
        default: ""
    },
    onInput: buildListenerProp<(value: string, event: Event) => IMaybePromise<void>>(),
    "onUpdate:modelValue": buildListenerProp<(value: string) => IMaybePromise<void>>(),
    ...buildInputProps(),
    ...buildFieldProps(),
    ...buildFormAssociatedWithValidationProps()
});
