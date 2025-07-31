import {
    useActivator,
    useClickOutside,
    useFloating,
    useFocusTrap,
    useRender,
    useStack
} from "@lumino/kit";
import { computed, defineComponent, ref, Teleport, toRef, Transition, useModel } from "vue";
import { buildMenuProps } from "./menu.props";

export const VMenu = defineComponent({
    name: "VMenu",
    props: buildMenuProps(),
    setup(props, { slots }) {
        const menuRef = ref<HTMLElement>();

        const model = useModel(props, "modelValue");

        const activator = useActivator({
            element: toRef(props, "activator"),
            events: {
                click: () => toggle()
            }
        });

        const stack = useStack({
            namespace: "__menu__",
            enabled: model,
            initialValue: 2000
        });

        const floating = useFloating({
            reference: activator.trigger,
            floating: menuRef,
            enabled: model,
            strategy: "fixed",
            placement: "bottom-start"
        });

        const focusTrap = useFocusTrap(menuRef, model, {
            autoFocus: true,
            restoreFocus: true,
            autoFocusDelay: 100
        });

        useClickOutside({
            elements: computed(() => [menuRef.value, activator.trigger.value].filter(value => !!value)),
            enabled: model,
            handler: () => close()
        });

        const open = () => {
            model.value = true;
        };

        const close = () => {
            model.value = false;
        };

        const toggle = () => {
            if (model.value) {
                close();
            } else {
                open();
            }
        };

        const onKeydown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                close();
            } else {
                focusTrap.trapFocus(event);
            }
        };

        useRender(() => {
            return (
                <Teleport to="body">
                    <Transition appear name="menu-e202678e">
                        {model.value && <div
                            ref={menuRef}
                            role="menu"
                            aria-orientation="vertical"
                            class={{ "menu": true, "menu--opened": model.value }}
                            style={{ ...floating.styles, zIndex: stack.zIndex.value }}
                            onKeydown={onKeydown}
                        >
                            <div class="menu__content">{slots.default?.()}</div>
                        </div>}
                    </Transition>
                </Teleport>
            );
        });

        return { open, close, toggle };
    }
});

export type VMenu = InstanceType<typeof VMenu>;
