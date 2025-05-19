type IUnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void ? I : never;

export function merge<T extends object, S extends object[]>(target: T, ...sources: S): T & IUnionToIntersection<S[number]> {
    if (!sources.length) {
        return target as T & IUnionToIntersection<S[number]>;
    }

    const source = sources.shift()!;

    if (_isObject(target) && _isObject(source)) {
        return _mergeObject(target, source) as T & IUnionToIntersection<S[number]>;
    } else if (Array.isArray(target) && Array.isArray(source)) {
        return _mergeArray(target, source) as any;
    } else if (target instanceof Set && source instanceof Set) {
        return _mergeSet(target, source) as any;
    } else if (target instanceof Map && source instanceof Map) {
        return _mergeMap(target, source) as any;
    } else {
        return Object.assign(target as any, source);
    }
}

function _mergeObject<T extends object, U extends object>(target: T, source: U): T & U {
    const result: any = { ...target };

    for (const key in source) {
        if (_isObject(source[key]) && _isObject((target as any)[key])) {
            result[key] = merge((target as any)[key], (source as any)[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

function _mergeArray<T>(target: T[], source: T[]) {
    target.push(...source);
    return target;
}

function _mergeSet<T>(target: Set<T>, source: Set<T>) {
    source.forEach(value => target.add(value));
    return target;
}

function _mergeMap<K, V>(target: Map<K, V>, source: Map<K, V>) {
    source.forEach((value, key) => target.set(key, value));
    return target;
}

function _isObject(item: any): item is object {
    return (item && typeof item === "object" && !Array.isArray(item));
}
