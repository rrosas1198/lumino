export function omit<T extends object, U extends Extract<keyof T, string>>(value: T, exclude: U[]): Omit<T, U> {
    const clone = { ...value };

    for (const prop of exclude) {
        delete clone[prop];
    }

    return clone;
}
