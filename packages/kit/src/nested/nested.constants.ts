import type { InjectionKey } from "vue";
import type { INestedContext } from "./nested.interface.js";

export const NestedToken: InjectionKey<INestedContext> = Symbol("NestedToken");
