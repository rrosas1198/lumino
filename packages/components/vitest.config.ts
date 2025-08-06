/// <reference types="vitest" />
import { resolve } from "node:path";
import type { UserConfig } from "vitest/node";

export default (<UserConfig>{
    esbuild: {
        jsxFragment: "Fragment",
        jsxFactory: "h"
    },
    test: {
        include: ["src/**/__test__/**/*.spec.ts", "src/**/__test__/**/*.spec.tsx"],
        globals: true,
        environment: "happy-dom",
        transformMode: {
            web: [/.[tj]sx$/]
        }
    },
    resolve: {
        alias: {
            src: resolve(__dirname, "src")
        }
    }
});
