module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/mentorlagbe/client/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/7c23b_5f2c7400._.js",
  "build/chunks/[root-of-the-server]__b4bb20c6._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/mentorlagbe/client/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];