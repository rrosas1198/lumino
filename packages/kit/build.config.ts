import { resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: ["src/index.ts"],
    declaration: true,
    alias: {
        src: resolve(__dirname, "src")
    },
    externals: ["vue", "vue-router"]
});
