import type { IMaybePromise, IPlacement } from "@lumino/kit";
import { buildActivatorProps, buildColorProps, buildListenerProp, buildProps } from "@lumino/kit";
import type { ExtractPropTypes, PropType } from "vue";

export type ISnackbarProps = ExtractPropTypes<ReturnType<typeof buildSnackbarProps>>;

export const buildSnackbarProps = buildProps({
    title: {
        type: String,
        default: undefined
    },
    closable: {
        type: Boolean,
        default: false
    },
    content: {
        type: String,
        default: undefined
    },
    placement: {
        type: String as PropType<IPlacement>,
        default: "bottom-start"
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    persistent: {
        type: Boolean,
        default: false
    },
    timeout: {
        type: Number,
        default: 4000
    },
    onClose: buildListenerProp<() => IMaybePromise<void>>(),
    "onUpdate:modelValue": buildListenerProp<(value: boolean) => IMaybePromise<void>>(),
    ...buildActivatorProps(),
    ...buildColorProps({ color: "success" })
});
