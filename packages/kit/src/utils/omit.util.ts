export function omit<T extends object, U extends Extract<keyof T, string>>(value: T, exclude: U[]): Omit<T, U> {
    const clone = { ...value };
    exclude.forEach(prop => delete clone[prop]);
    return clone;
}
