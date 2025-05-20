import type { ExtractPropTypes, PropType } from "vue";
import { useLogger } from "./logger";
import type { IDictionary, INullable } from "./types";
import { unique } from "./utils";

export type IPropFactory<T> = (props: IDictionary) => INullable<T>;
export type IPropValidator = (value: unknown, props: IDictionary) => boolean;

export interface IPropOptions<T = any, D = T> {
    type?: PropType<T> | true | null;
    values?: T[];
    required?: boolean;
    default?: D | IPropFactory<D> | object;
    validator?: IPropValidator;
}

export type IObjectPropsOptions<T = IDictionary> = {
    [K in keyof T]: IPropOptions<T[K]>;
};

const logger = useLogger();

export function buildProps<T extends IObjectPropsOptions>(props: T) {
    const props_ = Object.entries(props).map(([key, prop]) => [key, {
        ...prop,
        validator: _validatorFactory(key, prop)
    }] as [string, IPropOptions]);

    return (defaults?: ExtractPropTypes<T>) => {
        const withDefaults = _applyDefaults(props_, defaults || {} as any);
        return withDefaults.reduce((acc, [key, prop]) => Object.assign(acc, { [key]: prop }), {} as { [K in keyof T]: T[K] });
    };
}

function _applyDefaults<T extends IObjectPropsOptions, V extends ExtractPropTypes<T>>(props: Array<[keyof V, IPropOptions]>, defaults: V) {
    return props.map(([key, option]) => {
        const option_ = key in defaults ? Object.assign(option, { default: defaults[key] }) : option;
        return [key, option_] as [string, IPropOptions];
    });
}

function _validatorFactory<T extends IPropOptions>(key: string, prop: T): IPropValidator {
    return (value: unknown, props: IDictionary) => {
        const allowed = unique(prop.values || []);
        const isValid = allowed.includes(value) && (prop.validator?.(value, props) ?? true);

        if (!isValid) {
            const display = allowed.map(val => JSON.stringify(val)).join(", ");
            logger.warn(`Invalid prop: validation failed for prop ${key}.\n  Expected one of [${display}], got value ${JSON.stringify(value)}`);
        }

        return true;
    }
}
