import { useLinearFocus, useNested, useRender } from "@lumino/kit";
import { defineComponent, toRef, useModel } from "vue";
import { buildListProps } from "./list.props.js";

export const VList = defineComponent({
    name: "VList",
    props: buildListProps(),
    setup(props, { slots }) {
        const selected = useModel(props, "modelValue");
        const opened = useModel(props, "opened");

        const items = useNested({
            selected,
            opened,
            multiple: toRef(props, "multiple"),
            selectable: toRef(props, "selectable"),
        });

        const focus = useLinearFocus(toRef(() => items.getItems()), {
            wrap: true,
            orientation: "vertical"
        });

        useRender(() => (
            <div
                class="list"
                role="list"
                aria-multiselectable={props.selectable && props.multiple}
            >
                {slots.default?.()}
            </div>
        ));

        return {
            focusFirst: focus.focusFirst,
            focusLast: focus.focusLast
        };
    }
});

export type VList = InstanceType<typeof VList>;
