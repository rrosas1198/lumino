import { buildProps } from "./prop.factory.js";

export const buildFormAssociatedProps = buildProps({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: undefined
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

export const buildFormAssociatedWithValidationProps = buildProps({
    invalid: {
        type: Boolean,
        default: false
    },
    hideMessage: {
        type: Boolean,
        default: false
    },
    errorMessage: {
        type: String,
        default: undefined
    },
    ...buildFormAssociatedProps()
});
