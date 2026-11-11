module.exports = [
"[project]/mentorlagbe/client/src/actions/profile.actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40e86f96155b9a3907ce2ca8e0f34daf6fc68bd5a7":"updateProfileAction"},"",""] */ __turbopack_context__.s([
    "updateProfileAction",
    ()=>updateProfileAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || 'http://localhost:5000/api';
async function getToken() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get('mentorlagbe-token')?.value;
}
async function updateProfileAction(data) {
    try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/users/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store',
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to update profile');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/profile');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/student');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/tutor');
        return {
            success: true,
            data: result.user || result,
            message: 'Profile updated successfully!'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to update profile'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updateProfileAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProfileAction, "40e86f96155b9a3907ce2ca8e0f34daf6fc68bd5a7", null);
}),
"[project]/mentorlagbe/client/.next-internal/server/app/dashboard/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/mentorlagbe/client/src/actions/profile.actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$profile$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/src/actions/profile.actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/mentorlagbe/client/.next-internal/server/app/dashboard/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/mentorlagbe/client/src/actions/profile.actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40e86f96155b9a3907ce2ca8e0f34daf6fc68bd5a7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$profile$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProfileAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$profile$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$profile$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/mentorlagbe/client/.next-internal/server/app/dashboard/profile/page/actions.js { ACTIONS_MODULE0 => "[project]/mentorlagbe/client/src/actions/profile.actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$profile$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/src/actions/profile.actions.ts [app-rsc] (ecmascript)");
}),
"[project]/mentorlagbe/client/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/mentorlagbe/client/src/app/error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/error.tsx [app-rsc] (ecmascript)"));
}),
"[project]/mentorlagbe/client/src/app/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/mentorlagbe/client/src/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/mentorlagbe/client/src/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/mentorlagbe/client/src/app/dashboard/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx <module evaluation>", "default");
}),
"[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx", "default");
}),
"[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$app$2f$dashboard$2f$profile$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$app$2f$dashboard$2f$profile$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$app$2f$dashboard$2f$profile$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/profile/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a325dd73._.js.map