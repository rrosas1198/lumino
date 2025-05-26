import type { ExtractPropTypes, PropType } from "vue";
import { useLogger } from "./logger";
import type { IDictionary, INullable } from "./types";
import { merge, unique } from "./utils";

export type IProp<T = unknown, D = T> = IPropOptions<T, D> | PropType<T>;
export type IPropFactory<T> = (props: IDictionary) => INullable<T>;
export type IPropValidator = (value: unknown, props: IDictionary) => boolean;

export interface IPropOptions<T = unknown, D = T> {
    type?: PropType<T> | true | null;
    values?: T[];
    required?: boolean;
    default?: D | IPropFactory<D> | object;
    validator?: IPropValidator;
}

const logger = useLogger();

/**
 * Builds a set of reactive props from a given object of prop definitions.
 *
 * @param {T} props - An object where the keys are prop names and the values are prop definitions.
 * @returns A function that takes an optional object of default prop values and returns an object with reactive props.
 */
export function buildProps<T extends IDictionary<IProp>>(props: T) {
    const normalized = _normalizeProps(props);

    return (defaults: Partial<ExtractPropTypes<T>> = {}) => {
        return _applyDefaults(normalized, defaults) as { [K in keyof T]: T[K] };
    };
}

function _normalizeProps<T extends IDictionary<IProp>>(props: T) {
    return Object.entries(props)
        .map(([key, option]) => [key, _normalizeProp(key, option)] as [string, IPropOptions])
        .reduce((acc, [key, prop]) => Object.assign(acc, { [key]: prop }), {} as T);
}

function _normalizeProp<T>(key: string, prop: IProp<T>): IPropOptions<T> {
    const isFunction = _isConstructor(prop);

    return {
        type: isFunction ? prop : prop.type,
        default: isFunction ? undefined : prop.default,
        required: isFunction ? undefined : prop.required,
        validator: isFunction ? undefined : _validatorFactory(key, prop)
    };
}

function _applyDefaults<T extends IDictionary<IProp>>(props: T, defaults: Partial<ExtractPropTypes<T>>) {
    return Object.entries(props)
        .map(([key, option]) => {
            const option_ = key in defaults ? merge({ default: (defaults as any)[key] }, option) : option;
            return [key, option_] as [string, IPropOptions];
        })
        .reduce((acc, [key, prop]) => Object.assign(acc, { [key]: prop }), {} as T);
}

function _validatorFactory<T extends IPropOptions>(key: string, prop: T): IPropValidator {
    return (value: unknown, props: IDictionary) => {
        const allowed = unique(prop.values || []);
        const isValid = allowed.includes(value) && (prop.validator?.(value, props) ?? true);

        if (!isValid) {
            const display = allowed.map((val) => JSON.stringify(val)).join(", ");
            logger.warn(`Invalid prop: validation failed for prop ${key}.\n  Expected one of [${display}], got value ${JSON.stringify(value)}`);
        }

        return true;
    };
}

function _isConstructor<T>(prop: IProp<T>): prop is PropType<T> {
    return typeof prop === "function";
}
