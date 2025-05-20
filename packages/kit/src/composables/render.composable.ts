import { VNode } from "vue";
import { useCurrentInstance } from "./instance.composable";

export function useRender(render: () => VNode): void {
    const instance = useCurrentInstance("useRender") as any;
    instance.render = render;
}
