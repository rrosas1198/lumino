import type { IMaybePromise } from "@lumino/kit";
import { buildFormAssociatedWithValidationProps, buildInputProps, buildListenerProp, buildProps, omit } from "@lumino/kit";
import { buildFieldProps } from "src/field";
import type { ExtractPropTypes } from "vue";

export type ITextareaProps = ExtractPropTypes<ReturnType<typeof buildTextareaProps>>;

export const buildTextareaProps = buildProps({
    modelValue: {
        type: String,
        default: undefined
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
