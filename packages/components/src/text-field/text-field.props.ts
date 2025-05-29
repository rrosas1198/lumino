import { buildFormAssociatedWithValidationProps, buildInputProps, buildProps } from "@lumino/kit";
import { buildFieldProps } from "src/field";

export const buildTextFieldProps = buildProps({
    modelValue: {
        type: String,
        default: undefined
    },
    ...buildInputProps(),
    ...buildFieldProps(),
    ...buildFormAssociatedWithValidationProps()
});
