export function equal<T, V>(valueOne: T, valueTwo: V): boolean {
    // @ts-expect-error
    if (valueOne === valueTwo) {
        return true;
    }

    if (typeof valueOne !== "object" || typeof valueTwo !== "object" || valueOne === null || valueTwo === null) {
        return false;
    }

    if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
        return _areEqualArrays(valueOne, valueTwo);
    }

    if (valueOne instanceof Date && valueTwo instanceof Date) {
        return valueOne.getTime() === valueTwo.getTime();
    }

    if (valueOne instanceof RegExp && valueTwo instanceof RegExp) {
        return valueOne.toString() === valueTwo.toString();
    }

    if (valueOne instanceof Set && valueTwo instanceof Set) {
        return _areEqualSets(valueOne, valueTwo);
    }

    if (valueOne instanceof Map && valueTwo instanceof Map) {
        return _areEqualMaps(valueOne, valueTwo);
    }

    // if (valueOne instanceof ArrayBuffer && valueTwo instanceof ArrayBuffer) {
    //     return _areEqualArrayBuffers(valueOne, valueTwo);
    // }

    // if (ArrayBuffer.isView(valueOne) && ArrayBuffer.isView(valueTwo) && valueOne.constructor === valueTwo.constructor) {
    //     return _areEqualArrayBufferViews(valueOne, valueTwo);
    // }

    return _areEqualObjects(valueOne, valueTwo);
}

function _areEqualArrays(arrayOne: unknown[], arrayTwo: unknown[]) {
    if (arrayOne.length !== arrayTwo.length) return false;
    return arrayOne.every((value, index) => equal(value, arrayTwo[index]));
}

function _areEqualSets(setOne: Set<unknown>, setTwo: Set<unknown>) {
    if (setOne.size !== setTwo.size) return false;
    for (const value of setOne) {
        if (!setTwo.has(value)) return false;
    }
    return true;
}

function _areEqualMaps(mapOne: Map<unknown, unknown>, mapTwo: Map<unknown, unknown>) {
    if (mapOne.size !== mapTwo.size) return false;
    for (const [key, value] of mapOne) {
        if (!mapTwo.has(key) || !equal(value, mapTwo.get(key))) return false;
    }
    return true;
}

// function _areEqualArrayBuffers(bufferOne: ArrayBuffer, bufferTwo: ArrayBuffer) {
//     const viewOne = new Uint8Array(bufferOne);
//     const viewTwo = new Uint8Array(bufferTwo);

//     if (viewOne.length !== viewTwo.length) return false;
//     return viewOne.every((value, index) => value === viewTwo[index]);
// }

// function _areEqualArrayBufferViews(viewOne: ArrayBufferView, viewTwo: ArrayBufferView) {
//     if (viewOne.byteLength !== viewTwo.byteLength) return false;
//     const arrayOne = new Uint8Array(viewOne.buffer, viewOne.byteOffset, viewOne.byteLength);
//     const arrayTwo = new Uint8Array(viewTwo.buffer, viewTwo.byteOffset, viewTwo.byteLength);
//     return arrayOne.every((value, index) => value === arrayTwo[index]);
// }

function _areEqualObjects(valueOne: object, valueTwo: object) {
    const keysOne = Reflect.ownKeys(valueOne);
    const keysTwo = Reflect.ownKeys(valueTwo);

    if (keysOne.length !== keysTwo.length) return false;

    return keysOne.every((key) => {
        const valueOne_ = Reflect.get(valueOne, key);
        const valueTwo_ = Reflect.get(valueTwo, key);
        return equal(valueOne_, valueTwo_);
    });
}
