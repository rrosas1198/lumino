import type { IMaybePromise } from "@lumino/kit";
import { buildAnchorProps, buildListenerProp, buildProps, buildTagProps, omit } from "@lumino/kit";
import type { ExtractPropTypes, PropType } from "vue";
import { buildRippleProps } from "../ripple";

export type IListItemProps = ExtractPropTypes<ReturnType<typeof buildListItemProps>>;

export const buildListItemProps = buildProps({
    title: {
        type: String,
        default: undefined
    },
    heading: {
        type: String,
        default: undefined
    },
    subtitle: {
        type: String,
        default: undefined
    },
    selected: {
        type: Boolean,
        default: undefined
    },
    value: {
        type: [String, Number] as PropType<string | number>,
        default: undefined
    },
    onClick: buildListenerProp<(event: Event) => IMaybePromise<void>>(),
    ...buildTagProps({ tag: "div" }),
    ...omit(buildAnchorProps(), ["id"]),
    ...buildRippleProps()
});
