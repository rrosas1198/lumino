import type { IDictionary, INullable } from "src/types/global.type.js";
import { clone } from "src/utils/clone.util.js";
import type { ExtractPropTypes, PropType } from "vue";

type IPropFactory<T> = (props: IDictionary) => INullable<T>;

export interface IPropOptions<T = any, D = T> {
    type: PropType<T>;
    default?: D | IPropFactory<D> | null | undefined | object;
    required?: boolean;
    validator?(value: unknown, props: IDictionary): boolean;
}

export function buildProps<T extends IDictionary<IPropOptions>>(props: T) {
    return (defaults: Partial<ExtractPropTypes<T>> = {}) => {
        const cloned = clone(props);
        for (const key in defaults) {
            Object.assign(cloned[key]!, { default: (defaults as any)[key] });
        }
        return cloned as { [K in keyof T]: T[K] };
    };
}

export function buildListenerProp<T>(defaultValue?: T): IPropOptions<T> {
    return {
        type: Function as PropType<T>,
        default: defaultValue
    };
}
