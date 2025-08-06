import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { mkdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import process from "node:process";
import { rollup } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import sass from "rollup-plugin-sass";
import * as sass_ from "sass";
import { loadComponents, loadPackageJson } from "./utils/package.util.mjs";
import { remove } from "./utils/remove.util.mjs";
import { resolveCtx } from "./utils/resolve.util.mjs";
import { loadTsConfig } from "./utils/typescript.util.mjs";

const isDevelopment = process.env.NODE_ENV === "development";

const ctxDirectory = resolveCtx();
const srcDirectory = resolveCtx("src");
const distDirectory = resolveCtx("dist");
const themeDirectory = resolveCtx("../../packages/theme");

const packageJson = loadPackageJson(ctxDirectory);
const tsConfig = loadTsConfig(ctxDirectory, "tsconfig.json");
const entries = loadComponents(srcDirectory);

const banner = `/*! ${packageJson.name} v${packageJson.version} */\n`;

/** @type import("rollup").RollupOptions */
const buildConfig = {
    input: entries,
    external: [...Object.keys(packageJson.dependencies || []), ...Object.keys(packageJson.peerDependencies || [])],
    plugins: [
        alias({
            entries: {
                "@lumino/theme": resolveCtx("../../theme"),
                src: resolveCtx("src")
            }
        }),
        nodeResolve({
            mainFields: ["module", "jsnext", "main"],
            browser: false,
            extensions: [".ts", ".tsx", ".mjs", ".cjs", ".js", ".jsx"],
            exportConditions: ["node"],
            preferBuiltins: true
        }),
        json({
            preferConst: true
        }),
        vue({
            isProduction: !isDevelopment
        }),
        vueJsx({
            optimize: !isDevelopment,
            transformOn: true,
            mergeProps: true
        }),
        esbuild({
            include: /\.[jt]sx?$/,
            exclude: /node_modules/,
            sourceMap: isDevelopment,
            target: tsConfig.compilerOptions.target,
            treeShaking: true,
            legalComments: "eof",
            jsx: tsConfig.compilerOptions.jsx,
            jsxFactory: tsConfig.compilerOptions.jsxFactory,
            jsxFragment: tsConfig.compilerOptions.jsxFragmentFactory,
            loaders: { ".vue": "ts" }
        }),
        sass({
            api: "modern",
            output: (_styles, nodes) => {
                for (const node of nodes) {
                    const filename = basename(node.id);
                    const filepath = relative(srcDirectory, node.id);
                    const outputPath = resolve(distDirectory, filepath.replace(filename, "").concat("main.css"));
                    mkdirSync(dirname(outputPath), { recursive: true });
                    writeFileSync(outputPath, `${banner}\n${node.content || ""}`, { flag: "w" });
                }
            },
            options: {
                importers: [
                    new sass_.NodePackageImporter(),
                    {
                        findFileUrl(url) {
                            if (!url.startsWith("@lumino/theme")) return null;
                            const relative = url.replace("@lumino/theme", "");
                            const fullPath = join(themeDirectory, relative);
                            return new URL(`file://${fullPath}`);
                        }
                    }
                ]
            }
        })
    ]
};

/** @type import("rollup").OutputOptions[] */
const baseOutputs = [
    {
        dir: distDirectory,
        banner,
        format: "cjs",
        exports: "auto",
        freeze: false,
        sourcemap: isDevelopment,
        entryFileNames: "[name]/index.cjs",
        chunkFileNames: "_chunks/[hash].cjs",
        externalLiveBindings: false,
        inlineDynamicImports: false,
        generatedCode: {
            constBindings: true
        }
    },
    {
        dir: distDirectory,
        banner,
        format: "esm",
        exports: "auto",
        freeze: false,
        sourcemap: isDevelopment,
        entryFileNames: "[name]/index.mjs",
        chunkFileNames: "_chunks/[hash].mjs",
        externalLiveBindings: false,
        inlineDynamicImports: false,
        generatedCode: {
            constBindings: true
        }
    }
];

/** @type import("rollup").OutputOptions[] */
const typesOutputs = [
    {
        dir: distDirectory,
        format: "esm",
        entryFileNames: "[name]/index.d.ts"
    }
];

async function main() {
    await remove(distDirectory);

    const processes = [];

    // #region BaseOutputs
    const baseBuilder = await rollup(buildConfig);

    for (const output of baseOutputs) {
        processes.push(baseBuilder.write(output));
    }
    // #region

    // #region TypesOutputs
    buildConfig.plugins.push(dts({}));
    const typesBuilder = await rollup(buildConfig);

    for (const output of typesOutputs) {
        processes.push(typesBuilder.write(output));
    }
    // #region

    await Promise.all(processes);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
