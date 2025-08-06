import { useAnchor, useRender } from "@lumino/kit";
import { defineComponent, resolveComponent } from "vue";
import { buildLinkProps } from "./link.props.js";

export const VLink = defineComponent({
    name: "VLink",
    props: buildLinkProps(),
    setup(props, { slots }) {
        const anchor = useAnchor(props as any);

        const onClick = (event: Event) => {
            if (props.disabled) return;
            props.onClick?.(event);
        };

        useRender(() => {
            const Element = anchor.isNuxtLink.value ? resolveComponent("NuxtLink") : "a" as any;

            const _renderPrepend = () => {
                return <span class="link__prepend">{slots.prepend?.({})}</span>;
            };

            const _renderAppend = () => {
                return <span class="link__append">{slots.append?.({})}</span>;
            };

            return (
                <Element
                    id={props.id}
                    to={anchor.isNuxtLink.value ? anchor.toHref.value : undefined}
                    href={!anchor.isNuxtLink.value ? anchor.toHref.value : undefined}
                    class="link"
                    title={props.title}
                    target={props.target}
                    disabled={props.disabled}
                    download={props.download}
                    onClick={onClick}
                >
                    {_renderPrepend()}
                    {slots.default?.({})}
                    {_renderAppend()}
                </Element>
            );
        });

        return {};
    }
});

export type VLink = InstanceType<typeof VLink>;
