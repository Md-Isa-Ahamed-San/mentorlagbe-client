module.exports = [
"[project]/mentorlagbe/client/src/actions/tuition.actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4049383209ca3a766fb87b2924e31c3b41d1c7cbc6":"deleteTuitionAction","40dba9915656e74c1fe8ad9dc5442bac8414689702":"toggleTuitionStatusAction","40edf2b52368edc199cfc3928e5d29e472794ef105":"createTuitionAction","60969b5f142f7a11226019788ac51eac576387631f":"updateTuitionAction","60cf7933bb1d23aa4393a52a69b7ec85b5a0f2b44b":"addTuitionReviewAction"},"",""] */ __turbopack_context__.s([
    "addTuitionReviewAction",
    ()=>addTuitionReviewAction,
    "createTuitionAction",
    ()=>createTuitionAction,
    "deleteTuitionAction",
    ()=>deleteTuitionAction,
    "toggleTuitionStatusAction",
    ()=>toggleTuitionStatusAction,
    "updateTuitionAction",
    ()=>updateTuitionAction
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
async function createTuitionAction(data) {
    try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/tuitions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store',
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to create tuition');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/tuitions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/tutor/my-tuitions');
        return {
            success: true,
            data: result.tuition || result,
            message: 'Tuition created successfully!'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to create tuition'
        };
    }
}
async function updateTuitionAction(id, data) {
    try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/tuitions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store',
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to update tuition');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/tuitions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/tuitions/${id}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/tutor/my-tuitions');
        return {
            success: true,
            data: result.tuition || result,
            message: 'Tuition updated successfully!'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to update tuition'
        };
    }
}
async function deleteTuitionAction(id) {
    try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/tuitions/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to delete tuition');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/tuitions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/tutor/my-tuitions');
        return {
            success: true,
            message: 'Tuition deleted successfully!'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to delete tuition'
        };
    }
}
async function toggleTuitionStatusAction(id) {
    try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/tuitions/${id}/status`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to toggle status');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/tuitions');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/dashboard/tutor/my-tuitions');
        return {
            success: true,
            data: result,
            message: 'Tuition status updated!'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to toggle status'
        };
    }
}
async function addTuitionReviewAction(tuitionId, review) {
    try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/tuitions/${tuitionId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store',
            body: JSON.stringify(review)
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to add review');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/tuitions/${tuitionId}`);
        return {
            success: true,
            data: result,
            message: 'Review added successfully!'
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Failed to add review'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createTuitionAction,
    updateTuitionAction,
    deleteTuitionAction,
    toggleTuitionStatusAction,
    addTuitionReviewAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTuitionAction, "40edf2b52368edc199cfc3928e5d29e472794ef105", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTuitionAction, "60969b5f142f7a11226019788ac51eac576387631f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTuitionAction, "4049383209ca3a766fb87b2924e31c3b41d1c7cbc6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTuitionStatusAction, "40dba9915656e74c1fe8ad9dc5442bac8414689702", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addTuitionReviewAction, "60cf7933bb1d23aa4393a52a69b7ec85b5a0f2b44b", null);
}),
"[project]/mentorlagbe/client/.next-internal/server/app/dashboard/tutor/my-tuitions/page/actions.js { ACTIONS_MODULE0 => \"[project]/mentorlagbe/client/src/actions/tuition.actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$tuition$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/src/actions/tuition.actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/mentorlagbe/client/.next-internal/server/app/dashboard/tutor/my-tuitions/page/actions.js { ACTIONS_MODULE0 => \"[project]/mentorlagbe/client/src/actions/tuition.actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4049383209ca3a766fb87b2924e31c3b41d1c7cbc6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$tuition$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteTuitionAction"],
    "40dba9915656e74c1fe8ad9dc5442bac8414689702",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$tuition$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleTuitionStatusAction"],
    "40edf2b52368edc199cfc3928e5d29e472794ef105",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$tuition$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTuitionAction"],
    "60969b5f142f7a11226019788ac51eac576387631f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$tuition$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTuitionAction"],
    "60cf7933bb1d23aa4393a52a69b7ec85b5a0f2b44b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$tuition$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addTuitionReviewAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$tutor$2f$my$2d$tuitions$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$tuition$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/mentorlagbe/client/.next-internal/server/app/dashboard/tutor/my-tuitions/page/actions.js { ACTIONS_MODULE0 => "[project]/mentorlagbe/client/src/actions/tuition.actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$actions$2f$tuition$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/src/actions/tuition.actions.ts [app-rsc] (ecmascript)");
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
"[project]/mentorlagbe/client/src/app/dashboard/tutor/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/tutor/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx <module evaluation>", "default");
}),
"[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx", "default");
}),
"[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$app$2f$dashboard$2f$tutor$2f$my$2d$tuitions$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$app$2f$dashboard$2f$tutor$2f$my$2d$tuitions$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$mentorlagbe$2f$client$2f$src$2f$app$2f$dashboard$2f$tutor$2f$my$2d$tuitions$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/mentorlagbe/client/src/app/dashboard/tutor/my-tuitions/page.tsx [app-rsc] (ecmascript)"));
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

//# sourceMappingURL=%5Broot-of-the-server%5D__09a37613._.js.map