import type { IMaybePromise } from "@lumino/kit";
import { buildChoiceProps, buildFormAssociatedProps, buildListenerProp, buildProps, omit } from "@lumino/kit";

export const buildSwitchProps = buildProps({
    label: {
        type: String,
        required: true
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    "onUpdate:modelValue": buildListenerProp<(value: string) => IMaybePromise<void>>(),
    ...buildFormAssociatedProps(),
    ...omit(buildChoiceProps({ multiple: false }), ["multiple"])
});
