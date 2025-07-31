import type { IMaybePromise } from "@lumino/kit";
import { buildAnchorProps, buildListenerProp, buildProps, omit } from "@lumino/kit";
import type { ExtractPropTypes, PropType } from "vue";

export type ILinkProps = ExtractPropTypes<ReturnType<typeof buildLinkProps>>;

export type ILinkTarget = "_blank" | "_self";

export const buildLinkProps = buildProps({
    title: {
        type: String,
        default: undefined
    },
    target: {
        type: String as PropType<ILinkTarget>,
        default: "_blank"
    },
    disabled: {
        type: Boolean,
        default: false
    },
    onClick: buildListenerProp<(event: Event) => IMaybePromise<void>>(),
    ...omit(buildAnchorProps(), ["link"])
});
