export type INullable<T> = T | null | undefined;
export type IDictionary<T = any> = Record<string, T>;
export type IDeepPartial<T> = { [K in keyof T]?: IDeepPartial<T[K]>; };
export type IDeepReadonly<T> = { readonly [K in keyof T]: IDeepReadonly<T[K]>; };
