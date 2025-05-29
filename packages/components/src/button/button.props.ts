import type { IMaybePromise } from "@lumino/kit";
import { buildProps, buildFormAssociatedProps, buildLoadableProps, buildTagProps, buildColorProps, buildListenerProp } from "@lumino/kit";
import type { ExtractPropTypes, PropType } from "vue";
import { buildAnchorProps } from "src/anchor";
import { buildRippleProps } from "src/ripple";

export type IButtonType = "button" | "reset" | "submit";

export type IButtonProps = ExtractPropTypes<ReturnType<typeof buildButtonProps>>;

export const buildButtonProps = buildProps({
    icon: {
        type: Boolean,
        default: false
    },
    square: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: undefined
    },
    type: {
        type: String as PropType<IButtonType>,
        values: ["button", "reset", "submit"],
        default: "button"
    },
    onClick: buildListenerProp<(event: Event) => IMaybePromise<void>>(),
    onTouchstart: buildListenerProp<(event: Event) => IMaybePromise<void>>(),
    ...buildTagProps({ tag: "button" }),
    ...buildAnchorProps(),
    ...buildFormAssociatedProps(),
    ...buildLoadableProps(),
    ...buildColorProps(),
    ...buildRippleProps()
});
