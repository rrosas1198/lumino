import { type VNode, getCurrentInstance } from "vue";

export function useRender(render: () => VNode): void {
    const instance = getCurrentInstance() as any;
    if (!instance) {
        throw new Error("useRender: This function must be called within a component's setup function.");
    }
    instance.render = render;
}
