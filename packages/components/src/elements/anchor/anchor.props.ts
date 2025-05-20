import { buildProps } from "@lumino/kit";
import { ExtractPropTypes } from "vue";

export type IAnchorProps = ExtractPropTypes<ReturnType<typeof buildAnchorProps>>;

export const buildAnchorProps = buildProps({
    id: {
        type: String,
        required: true
    },
    link: {
        type: Boolean,
        default: false
    },
    nuxt: {
        type: Boolean,
        default: false
    },
    download: {
        type: Boolean,
        default: undefined
    },
    href: {
        type: String,
        default: undefined
    },
    origin: {
        type: String,
        default: undefined
    },
    preserveQuery: {
        type: Boolean,
        default: false
    },
    includeOrigin: {
        type: Boolean,
        default: false
    }
});
