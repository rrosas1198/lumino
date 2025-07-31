import type { IMaybePromise } from "@lumino/kit";
import { buildListenerProp, buildProps } from "@lumino/kit";
import type { ExtractPropTypes, PropType } from "vue";

export type IListProps = ExtractPropTypes<ReturnType<typeof buildListProps>>;

export const buildListProps = buildProps({
    modelValue: {
        type: Array as PropType<(string | number)[]>,
        default: () => []
    },
    opened: {
        type: Array as PropType<(string | number)[]>,
        default: () => []
    },
    multiple: {
        type: Boolean,
        default: false
    },
    selectable: {
        type: Boolean,
        default: true
    },
    "onUpdate:modelValue": buildListenerProp<(value: (string | number)[]) => IMaybePromise<void>>(),
    "onUpdate:opened": buildListenerProp<(value: (string | number)[]) => IMaybePromise<void>>()
});
