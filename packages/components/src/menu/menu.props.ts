import type { IMaybePromise } from "@lumino/kit";
import { buildActivatorProps, buildListenerProp, buildProps } from "@lumino/kit";
import type { ExtractPropTypes } from "vue";

export type IMenuProps = ExtractPropTypes<ReturnType<typeof buildMenuProps>>;

export const buildMenuProps = buildProps({
    id: {
        type: String,
        default: undefined
    },
    matchWidth: {
        type: Boolean,
        default: true
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    "onUpdate:modelValue": buildListenerProp<(value: boolean) => IMaybePromise<void>>(),
    ...buildActivatorProps()
});
