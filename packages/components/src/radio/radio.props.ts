import { buildChoiceProps, buildFormAssociatedProps, buildProps, omit } from "@lumino/kit";

export const buildRadioProps = buildProps({
    label: {
        type: String,
        required: false
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    indeterminate: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    ...omit(buildFormAssociatedProps(), ["name"]),
    ...omit(buildChoiceProps({ multiple: false }), ["multiple", "name"])
});
