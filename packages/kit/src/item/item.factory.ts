import { type MaybeRef, computed, unref } from "vue";
import type { IItemPropertyKey, IItemResolved, IItemsOptions } from "./item.interface.js";

export function useItems(options: IItemsOptions) {
    const items = computed(() => unref(options.items));

    const resolved = computed<IItemResolved[]>(() => {
        const resolveTitle_ = _resolveProperty(options.itemTitle);
        const resolveValue_ = _resolveProperty(options.itemValue);
        const resolveSubtitle_ = _resolveProperty(options.itemSubtitle);
        const resolveHeading_ = _resolveProperty(options.itemHeading);
        const resolveDisabled_ = _resolveProperty(options.itemDisabled);

        return items.value.map((item, index) => {
            const title = resolveTitle_(item, index);
            const value = options.returnObject ? item : resolveValue_(item, index);
            const subtitle = resolveSubtitle_(item, index);
            const heading = resolveHeading_(item, index);
            const disabled = resolveDisabled_(item, index, false);

            return {
                raw: item,
                title: String(title ?? ""),
                value,
                subtitle: subtitle != null ? String(subtitle) : undefined,
                heading: heading != null ? String(heading) : undefined,
                disabled: Boolean(disabled)
            };
        });
    });

    return { items: resolved };
}

function _resolveProperty<T>(property: MaybeRef<IItemPropertyKey<T> | undefined>) {
    const property_ = unref(property);

    return (item: any, index: number, fallback: any = item) => {
        if (!property_) {
            return null;
        }
        if (typeof property_ === "function") {
            return property_(item, index);
        }
        if (typeof property_ === "string") {
            return property_.split(".").reduce((obj, key) => obj?.[key], item) ?? fallback;
        }
        return fallback;
    };
}
