import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolveCtx = (...segments: string[]) => resolve(__dirname, "../", ...segments);

export default defineConfig({
    resolve: {
        alias: [
            {
                find: "@lumino/theme",
                replacement: resolveCtx("../../theme")
            },
            {
                find: "src",
                replacement: resolveCtx("src")
            }
        ]
    },
    plugins: [
        vue({}),
        vueJsx({
            transformOn: true,
            mergeProps: true
        })
    ]
});
