import { useNestedItem, useRender } from "@lumino/kit";
import { defineComponent } from "vue";
import { buildListGroupProps } from "./list-group.props.js";

export const VListGroup = defineComponent({
    name: "VListGroup",
    props: buildListGroupProps(),
    setup(props, { slots }) {
        const group = useNestedItem(props.value, props.disabled);

        const onToggle = () => {
            if (props.disabled) return;
            group.open();
            props.onToggle?.(group.opened.value);
        };

        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                onToggle();
            } else if (event.key === "ArrowRight" && !group.opened.value) {
                event.preventDefault();
                onToggle();
            } else if (event.key === "ArrowLeft" && group.opened.value) {
                event.preventDefault();
                onToggle();
            }
        };

        useRender(() => {
            return (
                <div
                    class={{
                        "list-group": true,
                        "list-group--expanded": group.opened.value,
                        "list-group--disabled": props.disabled
                    }}
                >
                    {slots.activator?.({
                        toggle: onToggle,
                        expanded: group.opened.value,
                        props: {
                            class: "list-item--interactive list-group__activator",
                            tabindex: props.disabled ? -1 : 0,
                            "aria-expanded": group.opened.value,
                            onClick: onToggle,
                            onKeydown
                        }
                    })}

                    <div 
                        class="list-group__items" 
                        role="group"
                        style={{ display: group.opened.value ? "block" : "none" }}
                    >
                        {slots.default?.()}
                    </div>
                </div>
            );
        });

        return {};
    }
});
