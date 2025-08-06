import type { IDictionary } from "src/types/global.type.js";

export function clone<T>(input: T, clones = new WeakMap()): T {
    if (input === null || typeof input !== "object") {
        return input;
    }

    if (clones.has(input)) {
        return clones.get(input);
    }

    let result: any;

    if (Array.isArray(input)) {
        result = _cloneArray(input, clones);
    } else if (input instanceof Set) {
        result = new Set(_cloneIterable(input, clones));
    } else if (input instanceof Map) {
        result = new Map(_cloneIterable(input, clones));
    } else if (input instanceof Date) {
        result = new Date(input.getTime());
    } else if (input instanceof RegExp) {
        result = new RegExp(input.source, input.flags);
    } else if (input instanceof DataView) {
        const bufferClone = clone(input.buffer, clones);
        result = new DataView(bufferClone, input.byteOffset, input.byteLength);
    } else if (input instanceof ArrayBuffer) {
        result = input.slice(0);
    } else if (typeof input === "object") {
        result = _cloneObject(input, clones);
    }

    return result as T;
}

function _cloneArray(arr: any[], clones: WeakMap<object, any>) {
    return arr.map((item) => clone(item, clones));
}

function _cloneIterable(iterable: Iterable<any>, clones: WeakMap<object, any>) {
    const items = [];
    for (const item of iterable) {
        items.push(clone(item, clones));
    }
    return items;
}

function _cloneObject(input: IDictionary, clones: WeakMap<object, any>) {
    const result = {};
    for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
            const value = Reflect.get(input, key);
            Reflect.set(result, key, clone(value, clones));
        }
    }
    return result;
}
