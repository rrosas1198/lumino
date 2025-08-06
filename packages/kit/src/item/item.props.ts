import { buildProps } from "src/props/prop.factory.js";
import type { ExtractPropTypes, PropType } from "vue";
import type { IItemPropertyKey } from "./item.interface.js";

export type IItemsProps = ExtractPropTypes<ReturnType<typeof buildItemsProps>>;

export const buildItemsProps = buildProps({
    items: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    itemTitle: {
        type: [String, Function] as PropType<IItemPropertyKey<string | number>>,
        default: "name"
    },
    itemHeading: {
        type: [String, Function] as PropType<IItemPropertyKey<string | number>>,
        default: undefined
    },
    itemSubtitle: {
        type: [String, Function] as PropType<IItemPropertyKey<string | number>>,
        default: undefined
    },
    itemDisabled: {
        type: [String, Function] as PropType<IItemPropertyKey<boolean>>,
        default: undefined
    },
    itemValue: {
        type: [String, Function] as PropType<IItemPropertyKey<any>>,
        default: "id"
    },
    returnObject: {
        type: Boolean,
        default: false
    }
});
