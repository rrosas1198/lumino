import type { IMaybePromise } from "@lumino/kit";
import { buildListenerProp, buildProps } from "@lumino/kit";
import type { ExtractPropTypes, PropType } from "vue";

export type IListGroupProps = ExtractPropTypes<ReturnType<typeof buildListGroupProps>>;

export const buildListGroupProps = buildProps({
    value: {
        type: [String, Number] as PropType<string | number>,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    onToggle: buildListenerProp<(expanded: boolean) => IMaybePromise<void>>()
});
