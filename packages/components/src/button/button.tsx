import { useRender } from "@lumino/kit";
import { useAnchor } from "src/anchor";
import { defineComponent, resolveComponent } from "vue";
import { buildButtonProps } from "./button.props";

export const VButton = defineComponent({
    name: "VButton",
    props: buildButtonProps(),
    setup(props, { slots }) {
        const anchor = useAnchor(props);

        const onClick = (event: Event) => {
            if (props.disabled) return;
            props.onClick?.(event);
        };

        const onTouchstart = (event: Event) => {
            if (props.disabled) return;
            props.onTouchstart?.(event);
        };

        useRender(() => {
            const Element = (anchor.isLink.value ? (anchor.isNuxtLink.value ? resolveComponent("NuxtLink") : "a") : props.tag || "button") as any;

            const isLoading = props.loading && !props.disabled;
            const hasPrepend = isLoading || !!slots.prepend;
            const ariaLabel = props.icon ? props.title : isLoading ? "Loading..." : undefined;

            const _renderPrepend = () => {
                const content = isLoading ? _renderSpinner() : slots.prepend?.({});
                return <span class="button__prepend">{content}</span>;
            };

            const _renderAppend = () => {
                return <span class="button__append">{slots.append?.({})}</span>;
            };

            const _renderSpinner = () => {
                return <span class="spinner" aria-hidden="true" />;
            };

            return (
                <Element
                    id={props.id}
                    name={props.name || props.id}
                    disabled={props.disabled}
                    type={props.link ? undefined : props.type}
                    to={anchor.isNuxtLink.value ? anchor.toHref.value : undefined}
                    href={!anchor.isNuxtLink.value ? anchor.toHref.value : undefined}
                    title={props.title}
                    download={props.link && props.download}
                    aria-live={props.ariaLive}
                    aria-busy={isLoading}
                    aria-label={ariaLabel}
                    aria-disabled={props.loading || props.disabled}
                    class={{
                        "button": true,
                        "button--loading": isLoading,
                        "button--disabled": props.disabled,
                        "button--primary": props.color === "primary",
                        "button--secondary": props.color === "secondary",
                        "button--standard": props.variant === "standard",
                        "button--filled": props.variant === "filled",
                        "button--outlined": props.variant === "outlined",
                        "button--icon": props.icon,
                        "button--square": props.square
                    }}
                    onClick={onClick}
                    onTouchstart={onTouchstart}
                >
                    {hasPrepend && _renderPrepend()}
                    <span class="button__label label">{slots.default?.({})}</span>
                    {!!slots.append && _renderAppend()}
                </Element>
            );
        });

        return {};
    }
});

export type VButton = InstanceType<typeof VButton>;
