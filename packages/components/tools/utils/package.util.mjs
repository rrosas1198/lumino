import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

export function loadPackageJson(rootDir) {
    const raw = readFileSync(resolve(rootDir, "package.json"));
    return JSON.parse(raw.toString());
}

export function loadComponents(srcDir) {
    return readdirSync(srcDir, { withFileTypes: true })
        .filter((dir) => dir.isDirectory() && !dir.name.startsWith("."))
        .reduce((acc, dir) => {
            const entryPath = resolve(srcDir, dir.name, "index.ts");
            if (existsSync(entryPath)) {
                Object.assign(acc, { [dir.name]: entryPath });
            }
            return acc;
        }, {});
}
