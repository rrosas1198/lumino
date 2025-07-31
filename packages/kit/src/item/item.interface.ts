import type { MaybeRef } from "vue";

export type IItemPropertyKey<T> = string | ((item: any, index: number) => T);

export interface IItemsOptions {
    items: MaybeRef<any[]>;
    itemTitle?: MaybeRef<IItemPropertyKey<string | number> | undefined>;
    itemSubtitle?: MaybeRef<IItemPropertyKey<string | number> | undefined>;
    itemHeading?: MaybeRef<IItemPropertyKey<string | number> | undefined>;
    itemDisabled?: MaybeRef<IItemPropertyKey<boolean> | undefined>;
    itemValue?: MaybeRef<IItemPropertyKey<any> | undefined>;
    returnObject?: MaybeRef<boolean>;
}

export interface IItemResolved {
    raw: any;
    title: string;
    value: any;
    subtitle?: string;
    heading?: string;
    disabled: boolean;
}
