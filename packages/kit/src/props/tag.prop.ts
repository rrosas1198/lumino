import { buildProps } from "src/build-props";

export const buildTagProps = buildProps({
    tag: {
        type: String,
        default: "div"
    }
});
