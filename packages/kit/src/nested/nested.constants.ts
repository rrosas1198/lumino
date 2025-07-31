import type { InjectionKey } from "vue";
import type { INestedContext } from "./nested.interface";

export const NestedToken: InjectionKey<INestedContext> = Symbol("NestedToken");
