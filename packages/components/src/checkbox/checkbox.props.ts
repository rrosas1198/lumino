import type { IMaybePromise } from "@lumino/kit";
import { buildChoiceProps, buildFormAssociatedProps, buildListenerProp, buildProps, omit } from "@lumino/kit";

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
    onClick: buildListenerProp<() => IMaybePromise<void>>(),
    onChange: buildListenerProp<(value: boolean) => IMaybePromise<void>>(),
    "onUpdate:modelValue": buildListenerProp<(value: boolean) => IMaybePromise<void>>(),
    ...buildFormAssociatedProps(),
    ...omit(buildChoiceProps({ multiple: false }), ["multiple"])
});
