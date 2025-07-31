import { useActivator, useHydration, useLazy, useRender, useStack, useTeleport, useTimeout } from "@lumino/kit";
import { Teleport, Transition, createTextVNode, defineComponent, toRef, useModel, watch } from "vue";
import { buildSnackbarProps } from "./snackbar.props";

export const VSnackbar = defineComponent({
    name: "VSnackbar",
    props: buildSnackbarProps(),
    setup(props, { slots }) {
        const model = useModel(props, "modelValue");
        const lazy = useLazy(model);
        const teleport = useTeleport();
        const hydration = useHydration();

        const activator = useActivator({
            element: toRef(props, "activator"),
            events: {
                click: () => open()
            }
        });

        const stack = useStack({
            namespace: "__snackbar__",
            enabled: model,
            initialValue: 2000
        });

        const countdown = useTimeout(props.timeout, () => {
            close();
        });

        const open = (duration?: number) => {
            if (model.value) return;
            model.value = true;

            if (!props.persistent && (duration ?? props.timeout) > 0) {
                countdown.start(duration);
            }
        };

        const close = () => {
            if (!model.value || props.persistent) return;
            countdown.stop();
            model.value = false;
            props.onClose?.();
        };

        watch(model, (value) => {
            if (value && !props.persistent && props.timeout > 0) {
                countdown.start();
            } else if (!value) {
                countdown.stop();
            }
        }, { immediate: true });

        useRender(() => {
            const hasAppend = !!slots.append || !!props.closable;
            const hasPrepend = !!slots.prepend;
            const hasTitle = !!slots.title || !!props.title;
            const hasParagraph = !!slots.default || !!props.content;

            const _renderPrepend = () => {
                return <span class="snackbar__prepend">{slots.prepend?.()}</span>;
            };

            const _renderAppend = () => {
                return <span class="snackbar__append">{props.closable ? _renderClose() : slots.append?.({})}</span>;
            };

            const _renderClose = () => (
                <button
                    type="button"
                    title="Cerrar"
                    class="snackbar__close button button--icon"
                    onClick={close}
                >
                    <span class="button__label">{slots.closeIcon?.() || "✕"}</span>
                </button>
            );

            const _renderTitle = () => (
                <p class="snackbar__title">{slots.title?.() || props.title}</p>
            );

            const _renderParagraph = () => (
                <p class="snackbar__paragraph">{slots.default?.() || props.content}</p>
            );

            const _renderContent = () => (
                <div class="snackbar__content">
                    {_renderTitle()}
                    {hasParagraph && _renderParagraph()}
                </div>
            );

            if (!hydration.isMounted.value || !lazy.hasContent.value) {
                return createTextVNode();
            }

            return (
                <Teleport to={teleport.target.value} disabled={!teleport.target.value}>
                    <Transition appear name="snackbar-e202678e">
                        {model.value && <div
                            class={{
                                "snackbar": true,
                                "snackbar--opened": model.value,
                                [`snackbar--${props.color}`]: props.color,
                                [`snackbar--${props.placement}`]: true
                            }}
                            style={{ zIndex: stack.zIndex.value }}
                            role="status"
                            aria-live={props.persistent ? "polite" : "assertive"}
                            aria-atomic="true"
                        >
                            {hasPrepend && _renderPrepend()}
                            {hasTitle ? _renderContent() : _renderParagraph()}
                            {hasAppend && _renderAppend()}
                        </div>}
                    </Transition>
                </Teleport>
            );
        });

        return { open, close };
    }
});

export type VSnackbar = InstanceType<typeof VSnackbar>;
