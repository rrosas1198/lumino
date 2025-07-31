import type { IMaybePromise } from "@lumino/kit";
import { buildFormAssociatedWithValidationProps, buildInputProps, buildListenerProp, buildProps, omit } from "@lumino/kit";
import type { ExtractPropTypes } from "vue";
import { buildFieldProps } from "../field";

export type ITextareaProps = ExtractPropTypes<ReturnType<typeof buildTextareaProps>>;

export const buildTextareaProps = buildProps({
    modelValue: {
        type: String,
        default: ""
    },
    rows: {
        type: [Number, String],
        default: 4
    },
    onInput: buildListenerProp<(value: string, event: Event) => IMaybePromise<void>>(),
    "onUpdate:modelValue": buildListenerProp<(value: string) => IMaybePromise<void>>(),
    ...omit(buildInputProps(), ["type"]),
    ...buildFieldProps(),
    ...buildFormAssociatedWithValidationProps()
});
