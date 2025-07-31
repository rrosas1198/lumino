import type { Placement, Strategy } from "@floating-ui/dom";
import type { Ref } from "vue";

export type IPlacement = Placement | "center";
export type IStrategy = Strategy;

export interface IFloatingOptions {
    reference: Ref<HTMLElement | undefined>;
    floating: Ref<HTMLElement | undefined>;
    enabled: Ref<boolean>;
    strategy: IStrategy;
    placement: IPlacement;
    matchWidth?: boolean;
}
