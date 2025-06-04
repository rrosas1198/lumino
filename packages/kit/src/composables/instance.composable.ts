import type { ComponentInternalInstance, ComponentPublicInstance } from "vue";
import { getCurrentInstance } from "vue";

export interface IComponentInternalInstance<T extends ComponentPublicInstance = ComponentPublicInstance> extends Omit<ComponentInternalInstance, "proxy"> {
    proxy: T | null;
}

export function useCurrentInstance<T extends ComponentPublicInstance>(name: string) {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error(`useCurrentInstance: ${name} is called outside of setup()`);
    }
    return instance as IComponentInternalInstance<T>;
}
