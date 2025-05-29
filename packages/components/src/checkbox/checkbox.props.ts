import { buildFormAssociatedProps, buildProps, buildSelectionControlProps, omit } from "@lumino/kit";

export const buildCheckboxProps = buildProps({
    label: {
        type: String,
        required: true
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    indeterminate: {
        type: Boolean,
        default: false
    },
    ...buildFormAssociatedProps(),
    ...omit(buildSelectionControlProps({ multiple: false }), ["multiple"])
});
