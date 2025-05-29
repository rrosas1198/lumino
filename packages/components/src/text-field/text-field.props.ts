import { buildFormAssociatedWithValidationProps, buildInputProps, buildProps } from "@lumino/kit";
import type { ExtractPropTypes } from "vue";
import { buildFieldProps } from "src/field";

export type ITextFieldProps = ExtractPropTypes<ReturnType<typeof buildTextFieldProps>>;

export const buildTextFieldProps = buildProps({
    modelValue: {
        type: String,
        default: undefined
    },
    ...buildInputProps(),
    ...buildFieldProps(),
    ...buildFormAssociatedWithValidationProps()
});
