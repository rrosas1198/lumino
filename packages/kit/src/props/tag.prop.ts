import { buildProps } from "./prop.factory";

export const buildTagProps = buildProps({
    tag: {
        type: String,
        default: "div"
    }
});
