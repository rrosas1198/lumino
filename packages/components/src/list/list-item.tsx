import { useAnchor, useNestedItem, useRender } from "@lumino/kit";
import { computed, defineComponent, resolveComponent } from "vue";
import { buildListItemProps } from "./list-item.props.js";

export const VListItem = defineComponent({
    name: "VListItem",
    props: buildListItemProps(),
    setup(props, { slots }) {
        const anchor = useAnchor(props as any);
        const item = props.value ? useNestedItem(props.value, props.disabled) : null;

        const isInteractive = computed(() => item?.context?.selectable.value || anchor.isLink.value || props.tag === "button");
        const isSelected = computed(() => {
            if (props.selected !== undefined) return props.selected;
            return item?.selected.value ?? false;
        });

        const onClick = (event: MouseEvent) => {
            if (props.disabled) return;
            if (props.link && props.href) return;
            event.preventDefault();
            item?.select();
            props.onClick?.(event);
        };

        const onKeydown = (event: KeyboardEvent) => {
            if (props.disabled) return;
            if (props.link && props.href) return;
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                item?.select();
            }
        };

        useRender(() => {
            const Element = (anchor.isLink.value ? anchor.isNuxtLink.value ? resolveComponent("NuxtLink") : "a" : props.tag || "button") as any;

            const hasTitle = !!(slots.title || props.title);
            const hasHeading = !!(slots.heading || props.heading);
            const hasSubtitle = !!(slots.subtitle || props.subtitle);
            const hasPrepend = !!slots.prepend;
            const hasAppend = !!slots.append;

            const _renderPrepend = () => (
                <div class="list-item__prepend">
                    {slots.prepend?.({ selected: isSelected.value })}
                </div>
            );

            const _renderAppend = () => (
                <div class="list-item__append">
                    {slots.append?.({ selected: isSelected.value })}
                </div>
            );

            const _renderContent = () => (
                <div class="list-item__content">
                    {hasHeading && _renderHeading()}
                    {hasTitle && _renderTitle()}
                    {hasSubtitle && _renderSubtitle()}
                    {slots.default?.({ selected: isSelected.value })}
                </div>
            );

            const _renderHeading = () => (
                <span class="list-item__heading">
                    {slots.heading?.({ selected: isSelected.value }) || props.heading}
                </span>
            );

            const _renderTitle = () => (
                <span class="list-item__title">
                    {slots.title?.({ selected: isSelected.value }) || props.title}
                </span>
            );

            const _renderSubtitle = () => (
                <span class="list-item__subtitle">
                    {slots.subtitle?.({ selected: isSelected.value }) || props.subtitle}
                </span>
            );

            return (
                <Element
                    ref={item?.itemRef}
                    disabled={isInteractive.value ? props.disabled : undefined}
                    to={anchor.isNuxtLink.value ? anchor.toHref.value : undefined}
                    href={!anchor.isNuxtLink.value ? anchor.toHref.value : undefined}
                    role="listitem"
                    download={props.link ? props.link && props.download : undefined}
                    tabindex={isInteractive.value ? props.disabled ? -1 : 0 : undefined}
                    aria-disabled={isInteractive.value ? props.disabled : undefined}
                    aria-selected={isInteractive.value ? isSelected.value : undefined}
                    class={{
                        "list-item": true,
                        "list-item--selected": isSelected.value,
                        "list-item--disabled": props.disabled,
                        "list-item--interactive": isInteractive.value
                    }}
                    onClick={onClick}
                    onKeydown={onKeydown}
                >
                    {hasPrepend && _renderPrepend()}
                    {_renderContent()}
                    {hasAppend && _renderAppend()}
                </Element>
            );
        });

        return {};
    }
});
