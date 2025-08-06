import { buildProps } from "./prop.factory.js";

export const buildTagProps = buildProps({
    tag: {
        type: String,
        default: "div"
    }
});
