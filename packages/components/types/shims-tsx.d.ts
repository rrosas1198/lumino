import type { NativeElements, ReservedProps, VNode } from "vue";

declare global {
    export namespace JSX {
        export interface Element extends VNode {}

        export interface ElementClass {
            // biome-ignore lint/complexity/noBannedTypes: Vue instance type
            $props: {};
        }

        export interface ElementAttributesProperty {
            // biome-ignore lint/complexity/noBannedTypes: Vue instance type
            $props: {};
        }

        export interface IntrinsicElements extends NativeElements {
            [name: string]: any;
        }

        export interface IntrinsicAttributes extends ReservedProps {}
    }
}
