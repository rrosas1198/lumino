import type { MaybeRef } from "vue";

export interface IStackOptions {
    enabled: MaybeRef<boolean>;
    namespace: string;
    initialValue: number;
}
