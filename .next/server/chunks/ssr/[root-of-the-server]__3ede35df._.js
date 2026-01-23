module.exports = [
"[project]/showcase-next/src/lib/venueTypes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Venue type display names mapped to URL slugs (pluralised for SEO)
__turbopack_context__.s([
    "VENUE_TYPE_FROM_SLUG",
    ()=>VENUE_TYPE_FROM_SLUG,
    "VENUE_TYPE_SLUGS",
    ()=>VENUE_TYPE_SLUGS,
    "VENUE_TYPE_SLUG_LIST",
    ()=>VENUE_TYPE_SLUG_LIST,
    "getVenueTypeFromSlug",
    ()=>getVenueTypeFromSlug,
    "getVenueTypeSlug",
    ()=>getVenueTypeSlug,
    "isVenueTypeSlug",
    ()=>isVenueTypeSlug
]);
const VENUE_TYPE_SLUGS = {
    'Arena': 'arenas',
    'Amphitheatre': 'amphitheatres',
    'Bar': 'bars',
    'Club': 'clubs',
    'Concert Hall': 'concert-halls',
    'Convention Centre': 'convention-centres',
    'Cultural Centre': 'cultural-centres',
    'Opera House': 'opera-houses',
    'Outdoor Venue': 'outdoor-venues',
    'Performing Arts Centre': 'performing-arts-centres',
    'Stadium': 'stadiums',
    'Theatre': 'theatres'
};
const VENUE_TYPE_FROM_SLUG = Object.fromEntries(Object.entries(VENUE_TYPE_SLUGS).map(([name, slug])=>[
        slug,
        name
    ]));
const VENUE_TYPE_SLUG_LIST = Object.values(VENUE_TYPE_SLUGS);
function isVenueTypeSlug(slug) {
    return VENUE_TYPE_SLUG_LIST.includes(slug);
}
function getVenueTypeFromSlug(slug) {
    return VENUE_TYPE_FROM_SLUG[slug] || null;
}
function getVenueTypeSlug(typeName) {
    return VENUE_TYPE_SLUGS[typeName] || null;
}
}),
"[externals]/jsdom [external] (jsdom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jsdom", () => require("jsdom"));

module.exports = mod;
}),
"[project]/showcase-next/src/assets/showcase-logo.svg (static in ecmascript)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/showcase-logo.660bbada.svg");}),
"[project]/showcase-next/src/assets/showcase-logo.svg.mjs { IMAGE => \"[project]/showcase-next/src/assets/showcase-logo.svg (static in ecmascript)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$assets$2f$showcase$2d$logo$2e$svg__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/assets/showcase-logo.svg (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$assets$2f$showcase$2d$logo$2e$svg__$28$static__in__ecmascript$29$__["default"],
    width: 500,
    height: 105,
    blurWidth: 0,
    blurHeight: 0
};
}),
"[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/showcase-next/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "gradient-action text-primary-foreground hover:opacity-90 hover:shadow-glow-pink",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent/10 hover:text-primary",
            link: "text-primary underline-offset-4 hover:underline",
            gradient: "gradient-brand text-primary-foreground hover:opacity-90 hover:shadow-glow-pink",
            "gradient-outline": "border border-transparent bg-card text-foreground gradient-border hover:shadow-glow-pink"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/button.tsx",
        lineNumber: 44,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
;
}),
"[project]/showcase-next/src/components/ui/sheet.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sheet",
    ()=>Sheet,
    "SheetClose",
    ()=>SheetClose,
    "SheetContent",
    ()=>SheetContent,
    "SheetDescription",
    ()=>SheetDescription,
    "SheetFooter",
    ()=>SheetFooter,
    "SheetHeader",
    ()=>SheetHeader,
    "SheetOverlay",
    ()=>SheetOverlay,
    "SheetPortal",
    ()=>SheetPortal,
    "SheetTitle",
    ()=>SheetTitle,
    "SheetTrigger",
    ()=>SheetTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
const Sheet = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const SheetTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const SheetClose = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"];
const SheetPortal = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"];
const SheetOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props,
        ref: ref
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
        lineNumber: 20,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SheetOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const sheetVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
    variants: {
        side: {
            top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
        }
    },
    defaultVariants: {
        side: "right"
    }
});
const SheetContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ side = "right", className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetOverlay, {}, void 0, false, {
                fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sheetVariants({
                    side
                }), className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
SheetContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const SheetHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
        lineNumber: 76,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
SheetFooter.displayName = "SheetFooter";
const SheetTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold text-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
        lineNumber: 84,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SheetTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const SheetDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/sheet.tsx",
        lineNumber: 92,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SheetDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}),
"[project]/showcase-next/src/hooks/useFavourites.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFavourites",
    ()=>useFavourites,
    "useIsFavourite",
    ()=>useIsFavourite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const STORAGE_KEY = 'showcase-favourites';
const FAVOURITES_UPDATED_EVENT = 'favourites-updated';
// Helper to read current favourites from localStorage
const getFavouritesFromStorage = ()=>{
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch  {
        return [];
    }
};
// Helper to save favourites to localStorage and dispatch event
const saveFavouritesToStorage = (favourites)=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    window.dispatchEvent(new CustomEvent(FAVOURITES_UPDATED_EVENT));
};
function useIsFavourite(listingId) {
    const [isFav, setIsFav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>getFavouritesFromStorage().includes(listingId));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleUpdate = ()=>{
            setIsFav(getFavouritesFromStorage().includes(listingId));
        };
        window.addEventListener(FAVOURITES_UPDATED_EVENT, handleUpdate);
        window.addEventListener('storage', handleUpdate);
        return ()=>{
            window.removeEventListener(FAVOURITES_UPDATED_EVENT, handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, [
        listingId
    ]);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const currentFavourites = getFavouritesFromStorage();
        let newFavourites;
        if (currentFavourites.includes(listingId)) {
            newFavourites = currentFavourites.filter((id)=>id !== listingId);
        } else {
            newFavourites = [
                ...currentFavourites,
                listingId
            ];
        }
        saveFavouritesToStorage(newFavourites);
    }, [
        listingId
    ]);
    return {
        isFavourite: isFav,
        toggle
    };
}
function useFavourites() {
    const [favourites, setFavourites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(getFavouritesFromStorage);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleUpdate = ()=>{
            setFavourites(getFavouritesFromStorage());
        };
        window.addEventListener(FAVOURITES_UPDATED_EVENT, handleUpdate);
        window.addEventListener('storage', handleUpdate);
        return ()=>{
            window.removeEventListener(FAVOURITES_UPDATED_EVENT, handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);
    const toggleFavourite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((listingId)=>{
        const currentFavourites = getFavouritesFromStorage();
        let newFavourites;
        if (currentFavourites.includes(listingId)) {
            newFavourites = currentFavourites.filter((id)=>id !== listingId);
        } else {
            newFavourites = [
                ...currentFavourites,
                listingId
            ];
        }
        saveFavouritesToStorage(newFavourites);
    }, []);
    const removeFavourite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((listingId)=>{
        const currentFavourites = getFavouritesFromStorage();
        const newFavourites = currentFavourites.filter((id)=>id !== listingId);
        saveFavouritesToStorage(newFavourites);
    }, []);
    return {
        favourites,
        toggleFavourite,
        removeFavourite,
        count: favourites.length
    };
}
}),
"[project]/showcase-next/src/components/header/MobileMenuButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileMenuButton",
    ()=>MobileMenuButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/sheet.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useFavourites$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useFavourites.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const navItems = [
    {
        label: "HOME",
        to: "/"
    },
    {
        label: "CATEGORIES",
        to: "/categories"
    }
];
function MobileMenuButton() {
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { count: favouritesCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useFavourites$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFavourites"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sheet"], {
        open: mobileMenuOpen,
        onOpenChange: setMobileMenuOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetTrigger"], {
                asChild: true,
                className: "md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "icon",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                        className: "h-6 w-6"
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SheetContent"], {
                side: "right",
                className: "w-[280px] bg-card border-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex flex-col gap-4 mt-8",
                    children: [
                        navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.to,
                                className: "text-lg font-medium text-foreground hover:text-primary transition-colors py-2",
                                onClick: ()=>setMobileMenuOpen(false),
                                children: item.label
                            }, item.to, false, {
                                fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/favourites",
                            className: "text-lg font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2",
                            onClick: ()=>setMobileMenuOpen(false),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                "FAVOURITES",
                                favouritesCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full",
                                    children: favouritesCount
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/header/MobileMenuButton.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/components/header/TopBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TopBar",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$assets$2f$showcase$2d$logo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$showcase$2d$next$2f$src$2f$assets$2f$showcase$2d$logo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/showcase-next/src/assets/showcase-logo.svg.mjs { IMAGE => "[project]/showcase-next/src/assets/showcase-logo.svg (static in ecmascript)" } [app-ssr] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$header$2f$MobileMenuButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/header/MobileMenuButton.tsx [app-ssr] (ecmascript)");
;
;
;
;
function TopBar({ sponsorAd }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-card/50 border-b border-border",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container py-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$assets$2f$showcase$2d$logo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$showcase$2d$next$2f$src$2f$assets$2f$showcase$2d$logo$2e$svg__$28$static__in__ecmascript$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                            alt: "Showcase Music - The International Music Business Guide",
                            className: "h-14 w-auto"
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground uppercase tracking-wide",
                                children: "Sponsored By"
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this),
                            sponsorAd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: sponsorAd.link_url || "#",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "block hover:opacity-80 transition-opacity",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: sponsorAd.image_url,
                                    alt: sponsorAd.alt_text || sponsorAd.name,
                                    className: "h-14 w-auto max-w-48 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                                    lineNumber: 34,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                                lineNumber: 33,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-48 h-14 bg-secondary border border-dashed border-border rounded-lg flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Your Logo Here"
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                                    lineNumber: 38,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$header$2f$MobileMenuButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MobileMenuButton"], {}, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/header/TopBar.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/components/NavLink.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavLink",
    ()=>NavLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const NavLink = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, activeClassName, href, to, ...props }, ref)=>{
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const linkHref = href || to || '/'; // Use href or to, fallback to '/'
    const isActive = pathname === linkHref || pathname?.startsWith(linkHref + '/');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ref: ref,
        href: linkHref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(className, isActive && activeClassName),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/NavLink.tsx",
        lineNumber: 22,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
NavLink.displayName = "NavLink";
;
}),
"[project]/showcase-next/src/components/header/NavBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavBar",
    ()=>NavBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$NavLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/NavLink.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useFavourites$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useFavourites.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const navItems = [
    {
        label: "HOME",
        to: "/"
    },
    {
        label: "CATEGORIES",
        to: "/categories"
    }
];
function NavBar({ breadcrumbs, rightContent, customNavContent }) {
    const { count: favouritesCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useFavourites$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFavourites"])();
    const showBreadcrumbs = breadcrumbs && breadcrumbs.length > 0;
    const showCustomNav = !!customNavContent;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "hidden md:block bg-secondary/50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between w-full",
                    children: [
                        showCustomNav ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5 text-xs lg:text-sm min-w-0 overflow-hidden",
                            children: customNavContent
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                            lineNumber: 38,
                            columnNumber: 15
                        }, this) : showBreadcrumbs ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 lg:gap-1.5 text-xs lg:text-sm text-muted-foreground min-w-0 overflow-hidden",
                            children: breadcrumbs.map((crumb, index)=>{
                                const isFirst = index === 0;
                                const isLast = index === breadcrumbs.length - 1;
                                const isSecondLast = index === breadcrumbs.length - 2;
                                const totalItems = breadcrumbs.length;
                                const isMiddleItem = !isFirst && !isLast && !isSecondLast;
                                const shouldHideOnMobile = isMiddleItem && totalItems > 3;
                                const showEllipsis = isSecondLast && totalItems > 3;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex items-center gap-1 lg:gap-1.5 min-w-0 ${shouldHideOnMobile ? "hidden lg:flex" : ""}`,
                                    children: [
                                        index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: `h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0 ${shouldHideOnMobile ? "hidden lg:block" : ""}`
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                            lineNumber: 59,
                                            columnNumber: 25
                                        }, this),
                                        showEllipsis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "lg:hidden flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "..."
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                                    lineNumber: 65,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                    className: "h-3 w-3 flex-shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                            lineNumber: 64,
                                            columnNumber: 25
                                        }, this),
                                        crumb.to ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: crumb.to,
                                            className: "hover:text-primary transition-colors whitespace-nowrap max-w-[120px] lg:max-w-[200px] truncate",
                                            children: crumb.label
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                            lineNumber: 70,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground truncate max-w-[150px] lg:max-w-[250px]",
                                            children: crumb.label
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                            lineNumber: 77,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                    lineNumber: 54,
                                    columnNumber: 21
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                            lineNumber: 42,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: navItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$NavLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                                            to: item.to,
                                            className: "text-xs lg:text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 lg:px-3 py-1 whitespace-nowrap",
                                            activeClassName: "text-primary",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                            lineNumber: 87,
                                            columnNumber: 21
                                        }, this),
                                        index < navItems.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-border",
                                            children: "|"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                            lineNumber: 94,
                                            columnNumber: 53
                                        }, this)
                                    ]
                                }, item.to, true, {
                                    fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                    lineNumber: 86,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                            lineNumber: 84,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 lg:gap-3",
                            children: [
                                rightContent,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$NavLink$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavLink"], {
                                    to: "/favourites",
                                    className: "text-xs lg:text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 lg:px-3 py-1 flex items-center gap-1 lg:gap-1.5 whitespace-nowrap",
                                    activeClassName: "text-primary",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this),
                                        "FAVOURITES",
                                        favouritesCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full",
                                            children: favouritesCount
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                            lineNumber: 111,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/header/NavBar.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This file is automatically generated. Do not edit it directly.
__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@supabase/supabase-js/dist/esm/wrapper.mjs [app-ssr] (ecmascript)");
'use client';
;
const SUPABASE_URL = ("TURBOPACK compile-time value", "https://zpeafwkthnrjuosyaexm.supabase.co");
const SUPABASE_PUBLISHABLE_KEY = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwZWFmd2t0aG5yanVvc3lhZXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NDM0ODEsImV4cCI6MjA4NDQxOTQ4MX0.z_Q2mK5qX7yNy3QDayvlN8HDtx1uOT8twaGY4EJFNlY");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
        storage: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
    }
});
}),
"[project]/showcase-next/src/hooks/useAds.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveAdsByPosition",
    ()=>useActiveAdsByPosition,
    "useAds",
    ()=>useAds,
    "useCreateAd",
    ()=>useCreateAd,
    "useDeleteAd",
    ()=>useDeleteAd,
    "useFeaturedAds",
    ()=>useFeaturedAds,
    "useRotatingAds",
    ()=>useRotatingAds,
    "useUpdateAd",
    ()=>useUpdateAd
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
const useAds = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'ads'
        ],
        queryFn: async ()=>{
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ads').select('*').order('created_at', {
                ascending: false
            });
            if (error) throw error;
            return data;
        }
    });
};
const useActiveAdsByPosition = (position, categoryId, country)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'active-ads',
            position,
            categoryId,
            country
        ],
        queryFn: async ()=>{
            const now = new Date().toISOString();
            // Build query with targeting priority
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ads').select('*').eq('position', position).eq('is_active', true).or(`start_date.is.null,start_date.lte.${now}`).or(`end_date.is.null,end_date.gte.${now}`);
            const { data, error } = await query;
            if (error) throw error;
            const ads = data;
            // Helper functions
            const hasTargetCategories = (ad)=>ad.target_category_ids && ad.target_category_ids.length > 0;
            const hasTargetCountries = (ad)=>ad.target_countries && ad.target_countries.length > 0;
            const categoryMatches = (ad)=>categoryId && ad.target_category_ids?.includes(categoryId);
            const countryMatches = (ad)=>country && ad.target_countries?.includes(country);
            // Prioritize: exact match > category only > country only > site-wide
            const exactMatch = ads.find((ad)=>categoryMatches(ad) && countryMatches(ad));
            if (exactMatch) return exactMatch;
            const categoryMatch = ads.find((ad)=>categoryMatches(ad) && !hasTargetCountries(ad));
            if (categoryMatch) return categoryMatch;
            const countryMatch = ads.find((ad)=>!hasTargetCategories(ad) && countryMatches(ad));
            if (countryMatch) return countryMatch;
            // Fall back to site-wide ad
            return ads.find((ad)=>!hasTargetCategories(ad) && !hasTargetCountries(ad));
        }
    });
};
const useRotatingAds = (position, categoryId, country)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'rotating-ads',
            position,
            categoryId,
            country
        ],
        queryFn: async ()=>{
            const now = new Date().toISOString();
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ads').select('*').eq('position', position).eq('is_active', true).or(`start_date.is.null,start_date.lte.${now}`).or(`end_date.is.null,end_date.gte.${now}`).order('created_at', {
                ascending: false
            });
            if (error) throw error;
            const ads = data;
            // Filter ads by targeting with AND logic:
            // - If ad has both categories AND countries: at least one category must match AND country must match
            // - If ad has only categories: at least one category must match (any country)
            // - If ad has only countries: country must match (any category)
            // - If ad has neither: site-wide (always show)
            return ads.filter((ad)=>{
                const hasCategories = ad.target_category_ids && ad.target_category_ids.length > 0;
                const hasTargetCountries = ad.target_countries && ad.target_countries.length > 0;
                const categoryMatches = categoryId && ad.target_category_ids?.includes(categoryId);
                const countryMatches = country && ad.target_countries?.includes(country);
                // Site-wide ad (no targeting)
                if (!hasCategories && !hasTargetCountries) return true;
                // Both categories and country specified: both must match
                if (hasCategories && hasTargetCountries) {
                    return categoryMatches && countryMatches;
                }
                // Only categories specified
                if (hasCategories && !hasTargetCountries) {
                    return categoryMatches;
                }
                // Only countries specified
                if (!hasCategories && hasTargetCountries) {
                    return countryMatches;
                }
                return false;
            });
        }
    });
};
const useFeaturedAds = (categoryId, pageId, parentCategoryId, country)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'featured-ads',
            categoryId,
            pageId,
            parentCategoryId,
            country
        ],
        queryFn: async ()=>{
            const now = new Date().toISOString();
            // Fetch all featured ads
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ads').select('*').eq('position', 'featured').eq('is_active', true).or(`start_date.is.null,start_date.lte.${now}`).or(`end_date.is.null,end_date.gte.${now}`);
            if (error) throw error;
            const ads = data;
            // Filter by country if ad has country targeting
            const filterByCountry = (adsToFilter)=>{
                return adsToFilter.filter((ad)=>{
                    // If ad has no country targeting, it shows everywhere
                    if (!ad.target_countries || ad.target_countries.length === 0) return true;
                    // If ad has country targeting, only show if current country matches
                    return country && ad.target_countries.includes(country);
                });
            };
            // Site-wide ads (no category, no page targeting)
            const siteWideAds = ads.filter((ad)=>(!ad.target_category_ids || ad.target_category_ids.length === 0) && (!ad.target_pages || ad.target_pages.length === 0));
            // Page-specific ads
            const pageAds = pageId ? ads.filter((ad)=>ad.target_pages?.includes(pageId)) : [];
            // Exact match ads: category AND country both specified and matching
            const exactMatchAds = categoryId && country ? ads.filter((ad)=>ad.target_category_ids?.includes(categoryId) && ad.target_countries?.includes(country)) : [];
            // Category-only ads: category matches but NO country targeting
            const categoryOnlyAds = categoryId ? ads.filter((ad)=>ad.target_category_ids?.includes(categoryId) && (!ad.target_countries || ad.target_countries.length === 0)) : [];
            // Child category ads (for parent pages) - fetch child category IDs
            let childCategoryAds = [];
            if (parentCategoryId) {
                const { data: childCategories } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('categories').select('id').eq('parent_id', parentCategoryId);
                const childIds = childCategories?.map((c)=>c.id) || [];
                childCategoryAds = ads.filter((ad)=>ad.target_category_ids?.some((catId)=>childIds.includes(catId)));
            }
            // Apply country filter to page, child, and site-wide ads
            return {
                exactMatchAds,
                categoryOnlyAds,
                pageAds: filterByCountry(pageAds),
                childCategoryAds: filterByCountry(childCategoryAds),
                siteWideAds: filterByCountry(siteWideAds)
            };
        }
    });
};
const useCreateAd = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async (ad)=>{
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ads').insert(ad).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'ads'
                ]
            });
        }
    });
};
const useUpdateAd = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async ({ id, ...ad })=>{
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ads').update(ad).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'ads'
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    'active-ads'
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    'rotating-ads'
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    'featured-ads'
                ]
            });
        }
    });
};
const useDeleteAd = ()=>{
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async (id)=>{
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ads').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey: [
                    'ads'
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    'active-ads'
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    'rotating-ads'
                ]
            });
            queryClient.invalidateQueries({
                queryKey: [
                    'featured-ads'
                ]
            });
        }
    });
};
}),
"[project]/showcase-next/src/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$header$2f$TopBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/header/TopBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$header$2f$NavBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/header/NavBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useAds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useAds.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Header({ breadcrumbs, rightContent, customNavContent }) {
    const { data: sponsorAd } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useAds$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useActiveAdsByPosition"])("sponsor-logo");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$header$2f$TopBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TopBar"], {
                sponsorAd: sponsorAd || null
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/Header.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$header$2f$NavBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NavBar"], {
                breadcrumbs: breadcrumbs,
                rightContent: rightContent,
                customNavContent: customNavContent
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/Header.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/Header.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/components/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
;
;
const categories = [
    {
        name: "Live Event Services",
        slug: "/live-event-services"
    },
    {
        name: "The Business",
        slug: "/the-business"
    },
    {
        name: "Venues",
        slug: "/venues"
    },
    {
        name: "Equipment",
        slug: "/equipment"
    },
    {
        name: "Studios",
        slug: "/studios"
    },
    {
        name: "UK Recording Services",
        slug: "/uk-recording-services"
    }
];
const quickLinks = [
    {
        name: "Home",
        slug: "/"
    },
    {
        name: "Categories",
        slug: "/categories"
    },
    {
        name: "About Us",
        slug: "/about"
    },
    {
        name: "Promote",
        slug: "/promote"
    },
    {
        name: "Get Listed",
        slug: "/get-listed"
    },
    {
        name: "Contact",
        slug: "/contact"
    }
];
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-card mt-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-px gradient-brand"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container pt-8 pb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden xl:grid xl:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold mb-2 text-foreground text-sm",
                                        children: "Categories"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-1 text-xs text-muted-foreground",
                                        children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: category.slug,
                                                    className: "hover:text-primary transition-colors",
                                                    children: category.name
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                    lineNumber: 36,
                                                    columnNumber: 19
                                                }, this)
                                            }, category.slug, false, {
                                                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                lineNumber: 35,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold mb-2 text-foreground text-sm",
                                        children: "Quick Links"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-1 text-xs text-muted-foreground",
                                        children: quickLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: link.slug,
                                                    className: "hover:text-primary transition-colors",
                                                    children: link.name
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                    lineNumber: 50,
                                                    columnNumber: 19
                                                }, this)
                                            }, link.slug, false, {
                                                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                lineNumber: 49,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold mb-2 text-foreground text-sm",
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-1 text-xs text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "info@entourage-pro.com"
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                lineNumber: 62,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "United Kingdom"
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                lineNumber: 63,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "xl:hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold mb-1.5 text-foreground text-xs sm:text-sm",
                                            children: "Categories"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-1 text-xs text-muted-foreground",
                                            children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: category.slug,
                                                        className: "hover:text-primary transition-colors",
                                                        children: category.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this)
                                                }, category.slug, false, {
                                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold mb-1.5 text-foreground text-xs sm:text-sm",
                                            children: "Quick Links"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-1 text-xs text-muted-foreground",
                                            children: quickLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: link.slug,
                                                        className: "hover:text-primary transition-colors",
                                                        children: link.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                        lineNumber: 91,
                                                        columnNumber: 21
                                                    }, this)
                                                }, link.slug, false, {
                                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold mb-1.5 text-foreground text-xs sm:text-sm",
                                            children: "Contact"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-1 text-xs text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "info@entourage-pro.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: "United Kingdom"
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/Footer.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-border bg-background/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground mb-1",
                            children: "© 2025 Showcase Music. All rights reserved."
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] text-muted-foreground/50 max-w-5xl leading-relaxed",
                            children: "No part of this website may be reproduced in any material form, by any means, whether graphic, electronic, mechanical or other, including information storage and retrieval systems, without the written permission of the publisher and where necessary any relevant other copyright owner. This website in whole or in part may not be used to prepare or compile other directories or mailing lists without written permission from the publisher. Measures have been adopted during preparation of this publication which will assist the publisher to protect its copyright. Any unauthorised use of this data will result in immediate legal proceedings. The greatest care has been taken to ensure accuracy but the publisher can accept no responsibility for errors or omissions nor for any liability occasioned by relying on its content."
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/Footer.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/showcase-next/src/components/Footer.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/Footer.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/Footer.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/hooks/useAnalytics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trackAdClick",
    ()=>trackAdClick,
    "trackAdView",
    ()=>trackAdView,
    "trackCategoryPageView",
    ()=>trackCategoryPageView,
    "trackLinkClick",
    ()=>trackLinkClick,
    "trackListingView",
    ()=>trackListingView,
    "useAdAnalytics",
    ()=>useAdAnalytics,
    "useAdClicks",
    ()=>useAdClicks,
    "useAdViews",
    ()=>useAdViews,
    "useAnalyticsOverview",
    ()=>useAnalyticsOverview,
    "useAnalyticsSummary",
    ()=>useAnalyticsSummary,
    "useAnalyticsTimeSeries",
    ()=>useAnalyticsTimeSeries,
    "useCategoryViewTracking",
    ()=>useCategoryViewTracking,
    "useCategoryViews",
    ()=>useCategoryViews,
    "useCategoryViewsAnalytics",
    ()=>useCategoryViewsAnalytics,
    "useCompanyViewsAnalytics",
    ()=>useCompanyViewsAnalytics,
    "useLinkClicks",
    ()=>useLinkClicks,
    "useLinkClicksAnalytics",
    ()=>useLinkClicksAnalytics,
    "useListingViews",
    ()=>useListingViews,
    "usePageViewTracking",
    ()=>usePageViewTracking,
    "usePageViews",
    ()=>usePageViews,
    "useTopCategories",
    ()=>useTopCategories,
    "useTopListings",
    ()=>useTopListings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const SUPABASE_URL = ("TURBOPACK compile-time value", "https://zpeafwkthnrjuosyaexm.supabase.co");
// Helper to track events directly to database
async function trackEvent(eventType, data) {
    try {
        // Map event types to their respective tables
        const tableMap = {
            'page_view': 'page_views',
            'category_view': 'category_page_views',
            'ad_view': 'ad_views',
            'ad_click': 'ad_clicks',
            'listing_view': 'listing_views',
            'link_click': 'listing_link_clicks'
        };
        const tableName = tableMap[eventType];
        if (!tableName) {
            console.warn(`Unknown event type: ${eventType}`);
            return;
        }
        console.log('Attempting to insert:', {
            tableName,
            data
        });
        const { data: result, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from(tableName).insert(data);
        if (error) {
            console.error(`Failed to track ${eventType}:`, {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
                tableName: tableName,
                eventType: eventType
            });
        } else {
            console.log('Successfully tracked:', eventType);
        }
    } catch (error) {
        console.error(`Failed to track ${eventType}:`, {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            eventType: eventType
        });
    }
}
const usePageViewTracking = ()=>{
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const trackedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Don't track admin pages or dashboard-login
        if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard-login')) {
            return;
        }
        // Only track once per page
        if (trackedRef.current === pathname) {
            return;
        }
        trackedRef.current = pathname;
        trackEvent('page_view', {
            page_url: pathname,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent
        });
    }, [
        pathname
    ]);
};
const useCategoryViewTracking = (categoryId, categoryName)=>{
    const trackedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!categoryId || trackedRef.current === categoryId) {
            return;
        }
        trackedRef.current = categoryId;
        trackEvent('category_view', {
            category_id: categoryId,
            category_name: categoryName
        });
    }, [
        categoryId,
        categoryName
    ]);
};
const trackCategoryPageView = (categoryId, categoryName, country = null, city = null)=>{
    trackEvent('category_view', {
        category_id: categoryId,
        category_name: categoryName,
        country: country,
        city: city
    });
};
const trackAdView = (adId)=>{
    trackEvent('ad_view', {
        ad_id: adId
    });
};
const trackAdClick = (adId, targetUrl)=>{
    trackEvent('ad_click', {
        ad_id: adId,
        target_url: targetUrl
    });
};
const trackListingView = (listingId)=>{
    trackEvent('listing_view', {
        listing_id: listingId
    });
};
const trackLinkClick = (listingId, linkType, linkUrl)=>{
    trackEvent('link_click', {
        listing_id: listingId,
        link_type: linkType,
        link_url: linkUrl || null
    });
};
function usePageViews(startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics',
            'page-views',
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('page_views').select('*', {
                count: 'exact',
                head: false
            }).order('viewed_at', {
                ascending: false
            }).limit(1000);
            if (startDate) {
                query = query.gte('viewed_at', startDate);
            }
            if (endDate) {
                query = query.lte('viewed_at', endDate);
            }
            const { data, count, error } = await query;
            if (error) throw error;
            return {
                data: data || [],
                count: count || 0
            };
        }
    });
}
function useCategoryViews(startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics',
            'category-views',
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('category_page_views').select('*', {
                count: 'exact',
                head: false
            }).order('viewed_at', {
                ascending: false
            }).limit(1000);
            if (startDate) {
                query = query.gte('viewed_at', startDate);
            }
            if (endDate) {
                query = query.lte('viewed_at', endDate);
            }
            const { data, count, error } = await query;
            if (error) throw error;
            return {
                data: data || [],
                count: count || 0
            };
        }
    });
}
function useAdViews(startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics',
            'ad-views',
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ad_views').select('*', {
                count: 'exact',
                head: false
            }).order('viewed_at', {
                ascending: false
            }).limit(1000);
            if (startDate) {
                query = query.gte('viewed_at', startDate);
            }
            if (endDate) {
                query = query.lte('viewed_at', endDate);
            }
            const { data, count, error } = await query;
            if (error) throw error;
            return {
                data: data || [],
                count: count || 0
            };
        }
    });
}
function useAdClicks(startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics',
            'ad-clicks',
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ad_clicks').select('*', {
                count: 'exact',
                head: false
            }).order('clicked_at', {
                ascending: false
            }).limit(1000);
            if (startDate) {
                query = query.gte('clicked_at', startDate);
            }
            if (endDate) {
                query = query.lte('clicked_at', endDate);
            }
            const { data, count, error } = await query;
            if (error) throw error;
            return {
                data: data || [],
                count: count || 0
            };
        }
    });
}
function useListingViews(startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics',
            'listing-views',
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('listing_views').select('*', {
                count: 'exact',
                head: false
            }).order('viewed_at', {
                ascending: false
            }).limit(1000);
            if (startDate) {
                query = query.gte('viewed_at', startDate);
            }
            if (endDate) {
                query = query.lte('viewed_at', endDate);
            }
            const { data, count, error } = await query;
            if (error) throw error;
            return {
                data: data || [],
                count: count || 0
            };
        }
    });
}
function useLinkClicks(startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics',
            'link-clicks',
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('listing_link_clicks').select('*', {
                count: 'exact',
                head: false
            }).order('clicked_at', {
                ascending: false
            }).limit(1000);
            if (startDate) {
                query = query.gte('clicked_at', startDate);
            }
            if (endDate) {
                query = query.lte('clicked_at', endDate);
            }
            const { data, count, error } = await query;
            if (error) throw error;
            return {
                data: data || [],
                count: count || 0
            };
        }
    });
}
function useAnalyticsSummary(startDate, endDate) {
    const { data: pageViews } = usePageViews(startDate, endDate);
    const { data: categoryViews } = useCategoryViews(startDate, endDate);
    const { data: adViews } = useAdViews(startDate, endDate);
    const { data: adClicks } = useAdClicks(startDate, endDate);
    const { data: listingViews } = useListingViews(startDate, endDate);
    const { data: linkClicks } = useLinkClicks(startDate, endDate);
    return {
        pageViews: pageViews?.count || 0,
        categoryViews: categoryViews?.count || 0,
        adViews: adViews?.count || 0,
        adClicks: adClicks?.count || 0,
        listingViews: listingViews?.count || 0,
        linkClicks: linkClicks?.count || 0
    };
}
function useTopListings(limit = 10, startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics',
            'top-listings',
            limit,
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('listing_views').select('listing_id');
            if (startDate) {
                query = query.gte('viewed_at', startDate);
            }
            if (endDate) {
                query = query.lte('viewed_at', endDate);
            }
            const { data, error } = await query;
            if (error) throw error;
            // Count views per listing
            const viewCounts = data.reduce((acc, view)=>{
                acc[view.listing_id] = (acc[view.listing_id] || 0) + 1;
                return acc;
            }, {});
            // Sort and limit
            const sorted = Object.entries(viewCounts).sort(([, a], [, b])=>b - a).slice(0, limit).map(([listing_id, views])=>({
                    listing_id,
                    views
                }));
            return sorted;
        }
    });
}
function useTopCategories(limit = 10, startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics',
            'top-categories',
            limit,
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('category_page_views').select('category_id, category_name');
            if (startDate) {
                query = query.gte('viewed_at', startDate);
            }
            if (endDate) {
                query = query.lte('viewed_at', endDate);
            }
            const { data, error } = await query;
            if (error) throw error;
            // Count views per category
            const viewCounts = data.reduce((acc, view)=>{
                if (!acc[view.category_id]) {
                    acc[view.category_id] = {
                        name: view.category_name || 'Unknown',
                        views: 0
                    };
                }
                acc[view.category_id].views++;
                return acc;
            }, {});
            // Sort and limit
            const sorted = Object.entries(viewCounts).sort(([, a], [, b])=>b.views - a.views).slice(0, limit).map(([category_id, data])=>({
                    category_id,
                    ...data
                }));
            return sorted;
        }
    });
}
function useAnalyticsOverview(startDate, endDate) {
    const { data: pageViews, isLoading: pageViewsLoading } = usePageViews(startDate, endDate);
    const { data: categoryViews, isLoading: categoryViewsLoading } = useCategoryViews(startDate, endDate);
    const { data: adViews, isLoading: adViewsLoading } = useAdViews(startDate, endDate);
    const { data: adClicks, isLoading: adClicksLoading } = useAdClicks(startDate, endDate);
    const { data: listingViews, isLoading: listingViewsLoading } = useListingViews(startDate, endDate);
    const { data: linkClicks, isLoading: linkClicksLoading } = useLinkClicks(startDate, endDate);
    const isLoading = pageViewsLoading || categoryViewsLoading || adViewsLoading || adClicksLoading || listingViewsLoading || linkClicksLoading;
    const totalAdViews = adViews?.count || 0;
    const totalAdClicks = adClicks?.count || 0;
    const ctr = totalAdViews > 0 ? (totalAdClicks / totalAdViews * 100).toFixed(2) : '0.00';
    return {
        data: {
            pageViews: pageViews?.count || 0,
            categoryViews: categoryViews?.count || 0,
            adViews: totalAdViews,
            adClicks: totalAdClicks,
            ctr: ctr,
            listingViews: listingViews?.count || 0,
            linkClicks: linkClicks?.count || 0
        },
        isLoading,
        error: null
    };
}
function useAdAnalytics() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'ad-analytics'
        ],
        queryFn: async ()=>{
            // Get all ads
            const { data: ads, error: adsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ads').select('id, name, position').order('name');
            if (adsError) throw adsError;
            // Get views and clicks for each ad
            const results = await Promise.all(ads.map(async (ad)=>{
                const [viewsRes, clicksRes] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ad_views').select('id', {
                        count: 'exact',
                        head: true
                    }).eq('ad_id', ad.id),
                    __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ad_clicks').select('id', {
                        count: 'exact',
                        head: true
                    }).eq('ad_id', ad.id)
                ]);
                const views = viewsRes.count || 0;
                const clicks = clicksRes.count || 0;
                const ctr = views > 0 ? (clicks / views * 100).toFixed(2) : '0.00';
                return {
                    id: ad.id,
                    name: ad.name,
                    position: ad.position,
                    views,
                    clicks,
                    ctr
                };
            }));
            return results;
        }
    });
}
function useAnalyticsTimeSeries(startDate, endDate) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'analytics-timeseries',
            startDate,
            endDate
        ],
        queryFn: async ()=>{
            const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
            const end = endDate || new Date().toISOString();
            // Get page views
            const { data: pageViews } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('page_views').select('viewed_at').gte('viewed_at', start).lte('viewed_at', end);
            // Get ad views
            const { data: adViews } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ad_views').select('viewed_at').gte('viewed_at', start).lte('viewed_at', end);
            // Get ad clicks
            const { data: adClicks } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('ad_clicks').select('clicked_at').gte('clicked_at', start).lte('clicked_at', end);
            // Group by date
            const dateMap = {};
            pageViews?.forEach((view)=>{
                const date = view.viewed_at.split('T')[0];
                if (!dateMap[date]) dateMap[date] = {
                    pageViews: 0,
                    adViews: 0,
                    adClicks: 0
                };
                dateMap[date].pageViews++;
            });
            adViews?.forEach((view)=>{
                const date = view.viewed_at.split('T')[0];
                if (!dateMap[date]) dateMap[date] = {
                    pageViews: 0,
                    adViews: 0,
                    adClicks: 0
                };
                dateMap[date].adViews++;
            });
            adClicks?.forEach((click)=>{
                const date = click.clicked_at.split('T')[0];
                if (!dateMap[date]) dateMap[date] = {
                    pageViews: 0,
                    adViews: 0,
                    adClicks: 0
                };
                dateMap[date].adClicks++;
            });
            // Convert to array and sort
            return Object.entries(dateMap).map(([date, counts])=>({
                    date,
                    ...counts
                })).sort((a, b)=>a.date.localeCompare(b.date));
        }
    });
}
function useCategoryViewsAnalytics(search) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'category-views-analytics',
            search
        ],
        queryFn: async ()=>{
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('category_page_views').select('category_name, country, city');
            const { data, error } = await query;
            if (error) throw error;
            // Group by category + location
            const grouped = {};
            data?.forEach((view)=>{
                const key = `${view.category_name}-${view.country}-${view.city}`;
                if (!grouped[key]) {
                    grouped[key] = {
                        category: view.category_name,
                        country: view.country,
                        city: view.city,
                        views: 0
                    };
                }
                grouped[key].views++;
            });
            let results = Object.values(grouped);
            // Filter by search
            if (search) {
                const searchLower = search.toLowerCase();
                results = results.filter((item)=>item.category.toLowerCase().includes(searchLower) || item.country?.toLowerCase().includes(searchLower) || item.city?.toLowerCase().includes(searchLower));
            }
            // Sort by views descending
            return results.sort((a, b)=>b.views - a.views);
        }
    });
}
function useCompanyViewsAnalytics(search) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'company-views-analytics',
            search
        ],
        queryFn: async ()=>{
            const { data: views, error: viewsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('listing_views').select('listing_id');
            if (viewsError) throw viewsError;
            // Count views per listing
            const viewCounts = {};
            views?.forEach((view)=>{
                viewCounts[view.listing_id] = (viewCounts[view.listing_id] || 0) + 1;
            });
            // Get listing details
            const listingIds = Object.keys(viewCounts);
            if (listingIds.length === 0) return [];
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('listings').select('id, name, slug').in('id', listingIds);
            if (search) {
                query = query.ilike('name', `%${search}%`);
            }
            const { data: listings, error: listingsError } = await query;
            if (listingsError) throw listingsError;
            // Combine data
            const results = listings?.map((listing)=>({
                    id: listing.id,
                    name: listing.name,
                    slug: listing.slug,
                    views: viewCounts[listing.id] || 0
                })) || [];
            // Sort by views descending
            return results.sort((a, b)=>b.views - a.views);
        }
    });
}
function useLinkClicksAnalytics(search) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'link-clicks-analytics',
            search
        ],
        queryFn: async ()=>{
            const { data: clicks, error: clicksError } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('listing_link_clicks').select('listing_id, link_type');
            if (clicksError) throw clicksError;
            // Group by listing + link type
            const grouped = {};
            clicks?.forEach((click)=>{
                const key = `${click.listing_id}-${click.link_type}`;
                if (!grouped[key]) {
                    grouped[key] = {
                        listingId: click.listing_id,
                        linkType: click.link_type,
                        clicks: 0
                    };
                }
                grouped[key].clicks++;
            });
            // Get listing details
            const listingIds = [
                ...new Set(Object.values(grouped).map((g)=>g.listingId))
            ];
            if (listingIds.length === 0) return [];
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('listings').select('id, name, slug').in('id', listingIds);
            if (search) {
                query = query.ilike('name', `%${search}%`);
            }
            const { data: listings, error: listingsError } = await query;
            if (listingsError) throw listingsError;
            const listingMap = new Map(listings?.map((l)=>[
                    l.id,
                    l
                ]) || []);
            // Combine data
            const results = Object.values(grouped).map((item)=>{
                const listing = listingMap.get(item.listingId);
                return listing ? {
                    listingId: item.listingId,
                    companyName: listing.name,
                    slug: listing.slug,
                    linkType: item.linkType,
                    clicks: item.clicks
                } : null;
            }).filter(Boolean);
            // Sort by clicks descending
            return results.sort((a, b)=>b.clicks - a.clicks);
        }
    });
}
}),
"[project]/showcase-next/src/components/PageViewTracker.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageViewTracker",
    ()=>PageViewTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useAnalytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useAnalytics.ts [app-ssr] (ecmascript)");
'use client';
;
function PageViewTracker() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useAnalytics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePageViewTracking"])();
    return null;
}
}),
"[project]/showcase-next/src/components/Layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Layout",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/Footer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$PageViewTracker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/PageViewTracker.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
function Layout({ children, hideFooter, breadcrumbs, headerRightContent, customNavContent }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$PageViewTracker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageViewTracker"], {}, void 0, false, {
                fileName: "[project]/showcase-next/src/components/Layout.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col", hideFooter ? "h-screen overflow-hidden" : "min-h-screen"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Header"], {
                        breadcrumbs: breadcrumbs,
                        rightContent: headerRightContent,
                        customNavContent: customNavContent
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/Layout.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-1 flex flex-col", hideFooter && "overflow-hidden"),
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/Layout.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    !hideFooter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/Layout.tsx",
                        lineNumber: 32,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/Layout.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/showcase-next/src/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-border bg-secondary px-3 py-2 text-base text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-colors duration-200", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Input.displayName = "Input";
;
}),
"[project]/showcase-next/src/hooks/useVenueSearch.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVenueSearch",
    ()=>useVenueSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
function useVenueSearch(query) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-search",
            query
        ],
        queryFn: async ()=>{
            if (!query || query.length < 2) return [];
            const searchTerm = query.trim().toLowerCase();
            if (!searchTerm) return [];
            // Search venues directly - venue_type is only populated for venue listings
            // This avoids the massive .in() clause that was causing 400 errors
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listings_public").select("id, name, slug, venue_type, town_city, country").not("venue_type", "is", null).ilike("name", `%${searchTerm}%`).order("name").limit(10);
            if (error) throw error;
            return (data || []).filter((v)=>v.id !== null && v.name !== null && v.slug !== null);
        },
        enabled: query.length >= 2,
        staleTime: 1000 * 60
    });
}
}),
"[project]/showcase-next/src/hooks/useDebounce.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDebounce",
    ()=>useDebounce
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            setDebouncedValue(value);
        }, delay);
        return ()=>{
            clearTimeout(timer);
        };
    }, [
        value,
        delay
    ]);
    return debouncedValue;
}
}),
"[project]/showcase-next/src/components/ui/badge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Badge = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/badge.tsx",
        lineNumber: 27,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
Badge.displayName = "Badge";
;
}),
"[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VenueSearchAutocomplete",
    ()=>VenueSearchAutocomplete
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueSearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenueSearch.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useDebounce.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function VenueSearchAutocomplete({ placeholder = "Search venues..." }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(-1);
    const debouncedQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDebounce"])(query, 300);
    const { data: venues = [], isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueSearch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenueSearch"])(debouncedQuery);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close dropdown when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (e)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) && inputRef.current && !inputRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // Reset selection when results change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSelectedIndex(-1);
    }, [
        debouncedQuery
    ]);
    const handleKeyDown = (e)=>{
        if (!isOpen || venues.length === 0) {
            return;
        }
        switch(e.key){
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev)=>prev < venues.length - 1 ? prev + 1 : 0);
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev)=>prev > 0 ? prev - 1 : venues.length - 1);
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && venues[selectedIndex]) {
                    handleSelect(selectedIndex);
                }
                break;
            case "Escape":
                setIsOpen(false);
                break;
        }
    };
    const handleSelect = (index)=>{
        const venue = venues[index];
        if (venue) {
            router.push(`/listing/${venue.slug}?from=venues`);
            setIsOpen(false);
            setQuery("");
        }
    };
    const highlightMatch = (text)=>{
        if (!query) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, i)=>part.toLowerCase() === query.toLowerCase() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-primary font-semibold",
                children: part
            }, i, false, {
                fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this) : part);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                ref: inputRef,
                type: "search",
                placeholder: placeholder,
                className: "w-full pl-9 pr-9 bg-secondary/50 border-border focus-visible:border-primary focus-visible:ring-primary",
                value: query,
                onChange: (e)=>{
                    setQuery(e.target.value);
                    setIsOpen(true);
                },
                onFocus: ()=>setIsOpen(true),
                onKeyDown: handleKeyDown
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-primary"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                lineNumber: 113,
                columnNumber: 21
            }, this),
            isOpen && query.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dropdownRef,
                className: "absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto",
                onMouseLeave: ()=>setSelectedIndex(-1),
                children: [
                    venues.length === 0 && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 text-sm text-muted-foreground text-center",
                        children: [
                            'No venues found for "',
                            query,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                        lineNumber: 123,
                        columnNumber: 13
                    }, this),
                    venues.map((venue, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center gap-3 px-3 py-2 text-left text-foreground hover:bg-primary/10 hover:text-primary transition-colors", selectedIndex === index && "bg-primary/10 text-primary"),
                            onClick: ()=>handleSelect(index),
                            onMouseEnter: ()=>setSelectedIndex(index),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                    className: "h-4 w-4 text-muted-foreground shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "truncate",
                                            children: highlightMatch(venue.name)
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-xs text-muted-foreground",
                                            children: [
                                                venue.venue_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "secondary",
                                                    className: "text-xs px-1.5 py-0",
                                                    children: venue.venue_type
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 21
                                                }, this),
                                                venue.town_city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: [
                                                        venue.town_city,
                                                        venue.country && `, ${venue.country}`
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, venue.id, true, {
                            fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                            lineNumber: 129,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
                lineNumber: 117,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const Checkbox = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center text-current"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/ui/checkbox.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/ui/checkbox.tsx",
            lineNumber: 19,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/checkbox.tsx",
        lineNumber: 11,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Checkbox.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
;
}),
"[project]/showcase-next/src/lib/supabasePagination.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchAllRows",
    ()=>fetchAllRows
]);
const PAGE_SIZE = 1000;
async function fetchAllRows(baseQuery, pageSize = PAGE_SIZE) {
    let allData = [];
    let page = 0;
    let hasMore = true;
    while(hasMore){
        const start = page * pageSize;
        const end = start + pageSize - 1;
        // Create a fresh query for each page to avoid mutation issues
        const result = await baseQuery().range(start, end);
        if (result.error) throw result.error;
        const rows = result.data || [];
        allData = [
            ...allData,
            ...rows
        ];
        // If we got fewer rows than requested, we've reached the end
        hasMore = rows.length === pageSize;
        page++;
        // Safety limit to prevent infinite loops (max 50 pages = 50,000 rows)
        if (page >= 50) break;
    }
    return allData;
}
}),
"[project]/showcase-next/src/lib/geoUtils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Geographic utility functions for distance calculations and proximity filtering
 */ __turbopack_context__.s([
    "findCenterPoint",
    ()=>findCenterPoint,
    "haversineDistance",
    ()=>haversineDistance,
    "isWithinRadius",
    ()=>isWithinRadius
]);
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
/**
 * Convert degrees to radians
 */ function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
function isWithinRadius(centerLat, centerLon, pointLat, pointLon, radiusKm) {
    const distance = haversineDistance(centerLat, centerLon, pointLat, pointLon);
    return distance <= radiusKm;
}
function findCenterPoint(coordinates) {
    const validCoords = coordinates.filter((c)=>c.latitude !== null && c.longitude !== null);
    if (validCoords.length === 0) return null;
    const sumLat = validCoords.reduce((sum, c)=>sum + c.latitude, 0);
    const sumLon = validCoords.reduce((sum, c)=>sum + c.longitude, 0);
    return {
        latitude: sumLat / validCoords.length,
        longitude: sumLon / validCoords.length
    };
}
}),
"[project]/showcase-next/src/lib/cityRegions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * City-Regions: Regions that contain only one city with the same name.
 * These are treated as cities, not regions, to avoid redundant URLs like /london/london.
 *
 * For these regions:
 * - /uk/london is the city page (not region page)
 * - /uk/london/london redirects to /uk/london
 * - Breadcrumbs show: UK > London (not UK > London > London)
 *
 * Proximity Configuration:
 * - City-regions use larger proximity radius (metropolitan areas)
 * - Regular cities use smaller default radius
 * - Proximity shows venues within radius, not just exact city match
 */ // Default proximity radii (in kilometers)
__turbopack_context__.s([
    "DEFAULT_CITY_PROXIMITY_KM",
    ()=>DEFAULT_CITY_PROXIMITY_KM,
    "DEFAULT_CITY_REGION_PROXIMITY_KM",
    ()=>DEFAULT_CITY_REGION_PROXIMITY_KM,
    "getCityRegionConfig",
    ()=>getCityRegionConfig,
    "getCityRegionDisplayName",
    ()=>getCityRegionDisplayName,
    "getCityRegionProximityRadius",
    ()=>getCityRegionProximityRadius,
    "isCityRegion",
    ()=>isCityRegion
]);
const DEFAULT_CITY_PROXIMITY_KM = 25; // Regular cities (Manchester, Birmingham)
const DEFAULT_CITY_REGION_PROXIMITY_KM = 40; // City-regions (London, NYC)
const CITY_REGIONS = [
    {
        country: "United Kingdom",
        countryAliases: [
            "uk",
            "united kingdom"
        ],
        region: "London",
        regionSlug: "london"
    },
    {
        country: "United States",
        countryAliases: [
            "usa",
            "united states",
            "us"
        ],
        region: "New York",
        regionSlug: "new-york",
        proximityRadiusKm: 50
    }
];
function isCityRegion(country, region) {
    if (!country || !region) return false;
    const normalizedCountry = country.toLowerCase();
    const normalizedRegion = region.toLowerCase();
    return CITY_REGIONS.some((config)=>{
        const countryMatches = config.country.toLowerCase() === normalizedCountry || config.countryAliases.includes(normalizedCountry);
        const regionMatches = config.region.toLowerCase() === normalizedRegion || config.regionSlug === normalizedRegion;
        return countryMatches && regionMatches;
    });
}
function getCityRegionConfig(country, region) {
    if (!country || !region) return null;
    const normalizedCountry = country.toLowerCase();
    const normalizedRegion = region.toLowerCase();
    return CITY_REGIONS.find((config)=>{
        const countryMatches = config.country.toLowerCase() === normalizedCountry || config.countryAliases.includes(normalizedCountry);
        const regionMatches = config.region.toLowerCase() === normalizedRegion || config.regionSlug === normalizedRegion;
        return countryMatches && regionMatches;
    }) || null;
}
function getCityRegionDisplayName(country, region) {
    const config = getCityRegionConfig(country, region);
    return config?.region || null;
}
function getCityRegionProximityRadius(country, region) {
    const config = getCityRegionConfig(country, region);
    return config?.proximityRadiusKm || DEFAULT_CITY_REGION_PROXIMITY_KM;
}
}),
"[project]/showcase-next/src/hooks/useVenues.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VENUE_TYPES",
    ()=>VENUE_TYPES,
    "useVenueCitiesByCountry",
    ()=>useVenueCitiesByCountry,
    "useVenueCitiesByRegion",
    ()=>useVenueCitiesByRegion,
    "useVenueCountries",
    ()=>useVenueCountries,
    "useVenueRegionsByCountry",
    ()=>useVenueRegionsByCountry,
    "useVenues",
    ()=>useVenues
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$supabasePagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/supabasePagination.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$geoUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/geoUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/cityRegions.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// =============================================================================
// SECURITY NOTE: All queries use listings_public view (no contact data)
// Venues are identified by having a venue_type value (not null)
// =============================================================================
// Tier ordering: premier (0) > enhanced (1) > free (2)
const TIER_ORDER = {
    premier: 0,
    enhanced: 1,
    free: 2
};
const VENUE_TYPES = [
    "Arena",
    "Amphitheatre",
    "Bar",
    "Club",
    "Concert Hall",
    "Convention Centre",
    "Cultural Centre",
    "Opera House",
    "Outdoor Venue",
    "Performing Arts Centre",
    "Stadium",
    "Theatre"
];
function useVenues(options = {}) {
    const { venueTypes, capacityMin, capacityMax, country, regionId, city, continent } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venues",
            venueTypes,
            capacityMin,
            capacityMax,
            country,
            regionId,
            city,
            continent
        ],
        queryFn: async ()=>{
            // Determine if we need proximity filtering
            const needsCityProximityFilter = !!city && !!country;
            const needsRegionProximityFilter = !!regionId && !!country && !city;
            // Query venues directly - identified by having venue_type set
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$supabasePagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAllRows"])(()=>{
                let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listings_public").select(`
            id,
            name,
            slug,
            venue_type,
            venue_capacity,
            country,
            town_city,
            latitude,
            longitude,
            logo_url,
            tier,
            region_id,
            continent
          `).not("venue_type", "is", null);
                // Add continent filter
                if (continent) {
                    query = query.eq("continent", continent);
                }
                if (venueTypes && venueTypes.length > 0) {
                    query = query.in("venue_type", venueTypes);
                }
                if (capacityMin !== undefined && capacityMin > 0) {
                    query = query.gte("venue_capacity", capacityMin);
                }
                if (capacityMax !== undefined && capacityMax < 100000) {
                    query = query.lte("venue_capacity", capacityMax);
                }
                if (country) {
                    query = query.eq("country", country);
                }
                // For proximity filtering, we fetch broader dataset and filter client-side
                // For exact filtering, we filter at database level (more efficient)
                if (regionId && !needsRegionProximityFilter) {
                    query = query.eq("region_id", regionId);
                }
                if (city && !needsCityProximityFilter) {
                    query = query.eq("town_city", city);
                }
                return query;
            });
            // Apply proximity filtering if needed
            let filteredData = data;
            // CITY PROXIMITY FILTERING
            if (needsCityProximityFilter && city && country) {
                // Find center point of the city from venues in that city
                const cityVenues = data.filter((v)=>v.town_city === city && v.latitude && v.longitude);
                if (cityVenues.length > 0) {
                    const cityCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$geoUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findCenterPoint"])(cityVenues.map((v)=>({
                            latitude: v.latitude,
                            longitude: v.longitude
                        })));
                    if (cityCenter) {
                        const radiusKm = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_CITY_PROXIMITY_KM"];
                        filteredData = data.filter((venue)=>{
                            // Always include exact city matches
                            if (venue.town_city === city) return true;
                            // Filter others by proximity
                            if (!venue.latitude || !venue.longitude) return false;
                            const distance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$geoUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haversineDistance"])(cityCenter.latitude, cityCenter.longitude, venue.latitude, venue.longitude);
                            return distance <= radiusKm;
                        });
                    } else {
                        // Fallback to exact match if we can't determine city center
                        filteredData = data.filter((v)=>v.town_city === city);
                    }
                } else {
                    // No venues with coordinates in this city - use exact match
                    filteredData = data.filter((v)=>v.town_city === city);
                }
            }
            // REGION PROXIMITY FILTERING (for city-regions like London, NYC)
            if (needsRegionProximityFilter && regionId && country) {
                // Check if this region is a city-region that needs proximity
                const { data: regionData } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("regions").select("region_slug, latitude, longitude").eq("id", regionId).single();
                if (regionData && (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCityRegion"])(country, regionData.region_slug)) {
                    // This is a city-region - apply proximity
                    if (regionData.latitude && regionData.longitude) {
                        const radiusKm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCityRegionProximityRadius"])(country, regionData.region_slug);
                        filteredData = data.filter((venue)=>{
                            // Always include venues explicitly in this region
                            if (venue.region_id === regionId) return true;
                            // Filter others by proximity
                            if (!venue.latitude || !venue.longitude) return false;
                            const distance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$geoUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["haversineDistance"])(regionData.latitude, regionData.longitude, venue.latitude, venue.longitude);
                            return distance <= radiusKm;
                        });
                    } else {
                        // Region doesn't have coordinates - fallback to exact match
                        filteredData = data.filter((v)=>v.region_id === regionId);
                    }
                } else {
                    // Not a city-region - use exact region match
                    filteredData = data.filter((v)=>v.region_id === regionId);
                }
            }
            // Get region slugs for venues that have region_id
            const regionIds = [
                ...new Set(filteredData.filter((v)=>v.region_id).map((v)=>v.region_id))
            ];
            let regionMap = {};
            if (regionIds.length > 0) {
                const { data: regions } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("regions").select("id, region_slug").in("id", regionIds);
                if (regions) {
                    regionMap = Object.fromEntries(regions.map((r)=>[
                            r.id,
                            r.region_slug
                        ]));
                }
            }
            // Add region_slug and sort by tier (premier > enhanced > free), then name
            return filteredData.map((v)=>({
                    ...v,
                    region_slug: v.region_id ? regionMap[v.region_id] || null : null
                })).sort((a, b)=>{
                const tierA = TIER_ORDER[a.tier] ?? 2;
                const tierB = TIER_ORDER[b.tier] ?? 2;
                if (tierA !== tierB) return tierA - tierB;
                return (a.name || "").localeCompare(b.name || "");
            });
        },
        staleTime: 2 * 60 * 1000
    });
}
function useVenueCountries(continent) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-countries",
            continent
        ],
        queryFn: async ()=>{
            // Query venues directly - identified by having venue_type set
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$supabasePagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAllRows"])(()=>{
                let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listings_public").select("id, country, continent").not("venue_type", "is", null).not("country", "is", null);
                // Filter by continent at database level
                if (continent) {
                    query = query.eq("continent", continent);
                }
                return query;
            });
            const countMap = new Map();
            data.forEach((item)=>{
                if (item.country) {
                    countMap.set(item.country, (countMap.get(item.country) || 0) + 1);
                }
            });
            return Array.from(countMap.entries()).map(([country, count])=>({
                    country,
                    count
                })).sort((a, b)=>a.country.localeCompare(b.country));
        },
        staleTime: 5 * 60 * 1000
    });
}
function useVenueRegionsByCountry(country) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-regions-by-country",
            country
        ],
        queryFn: async ()=>{
            if (!country) return [];
            // Query venues directly - identified by having venue_type set
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$supabasePagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAllRows"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listings_public").select("id, region_id").not("venue_type", "is", null).eq("country", country).not("region_id", "is", null));
            // Get unique region IDs that have venues
            const regionIds = [
                ...new Set(data.map((v)=>v.region_id).filter(Boolean))
            ];
            if (regionIds.length === 0) return [];
            // Fetch region details
            const { data: regions } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("regions").select("id, region_name, region_slug").in("id", regionIds).order("region_name");
            return regions || [];
        },
        enabled: !!country,
        staleTime: 5 * 60 * 1000
    });
}
function useVenueCitiesByCountry(country) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-cities-by-country",
            country
        ],
        queryFn: async ()=>{
            if (!country) return [];
            // Query venues directly - identified by having venue_type set
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$supabasePagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAllRows"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listings_public").select("id, town_city").not("venue_type", "is", null).eq("country", country).not("town_city", "is", null));
            // Get unique cities
            const cities = [
                ...new Set(data.map((v)=>v.town_city).filter(Boolean))
            ];
            return cities.sort((a, b)=>a.localeCompare(b));
        },
        enabled: !!country,
        staleTime: 5 * 60 * 1000
    });
}
function useVenueCitiesByRegion(regionId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-cities-by-region",
            regionId
        ],
        queryFn: async ()=>{
            if (!regionId) return [];
            // Query venues directly - identified by having venue_type set
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$supabasePagination$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchAllRows"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listings_public").select("id, town_city").not("venue_type", "is", null).eq("region_id", regionId).not("town_city", "is", null));
            // Get unique cities
            const cities = [
                ...new Set(data.map((v)=>v.town_city).filter(Boolean))
            ];
            return cities.sort((a, b)=>a.localeCompare(b));
        },
        enabled: !!regionId,
        staleTime: 5 * 60 * 1000
    });
}
}),
"[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VenueTypeFilter",
    ()=>VenueTypeFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenues$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenues.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function VenueTypeFilter({ selectedTypes, onChange }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // Close on scroll outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        function handleScroll(event) {
            // Check if scroll happened inside the dropdown
            if (ref.current && ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        }
        document.addEventListener("scroll", handleScroll, true);
        return ()=>document.removeEventListener("scroll", handleScroll, true);
    }, [
        open
    ]);
    const handleToggle = (type)=>{
        if (selectedTypes.includes(type)) {
            onChange(selectedTypes.filter((t)=>t !== type));
        } else {
            onChange([
                ...selectedTypes,
                type
            ]);
        }
    };
    const triggerLabel = selectedTypes.length === 0 ? "Venue Type" : selectedTypes.length === 1 ? selectedTypes[0] : `Venue Type (${selectedTypes.length})`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                size: "sm",
                onClick: ()=>setOpen(!open),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-9 w-full gap-1.5 px-3 justify-between text-xs font-normal", selectedTypes.length > 0 ? "border-primary bg-primary/10 text-primary hover:bg-primary/20" : "border-input bg-background text-foreground hover:bg-muted hover:border-input"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: triggerLabel
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full right-0 md:left-0 md:right-auto mt-1 z-50 w-48 md:w-56 rounded-md border bg-popover p-1 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                            selectedTypes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onChange([]),
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-sm hover:bg-muted text-sm text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "md:hidden",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                        lineNumber: 87,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden md:inline",
                                        children: "Clear selection"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                        lineNumber: 88,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpen(false),
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-sm hover:bg-muted text-sm text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    "Close"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-64 overflow-y-auto overscroll-contain",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenues$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VENUE_TYPES"].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-muted cursor-pointer text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                        checked: selectedTypes.includes(type),
                                        onCheckedChange: ()=>handleToggle(type)
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: type
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                        lineNumber: 108,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, type, true, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/components/venues/CountryFilter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CountryFilter",
    ()=>CountryFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const CountryFilter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function CountryFilter({ countries, selectedCountries, onChange }) {
    const KEEP_OPEN_KEY = 'venue-country-filter-keep-open';
    // Check if we should restore open state on mount
    const shouldStartOpen = ()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
        const keepOpen = undefined;
    };
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(shouldStartOpen);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    // Close on scroll outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        function handleScroll(event) {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            }
            setOpen(false);
        }
        document.addEventListener("scroll", handleScroll, true);
        return ()=>document.removeEventListener("scroll", handleScroll, true);
    }, [
        open
    ]);
    const handleToggle = (country)=>{
        // Mark that we want to keep the dropdown open after navigation
        sessionStorage.setItem('venue-country-filter-keep-open', 'true');
        if (selectedCountries.includes(country)) {
            onChange(selectedCountries.filter((c)=>c !== country));
        } else {
            onChange([
                ...selectedCountries,
                country
            ]);
        }
    };
    const handleClearAll = ()=>{
        // Mark that we want to keep the dropdown open after clearing
        sessionStorage.setItem('venue-country-filter-keep-open', 'true');
        onChange([]);
    };
    const handleClose = ()=>{
        // User explicitly closed - clear the keep-open flag
        sessionStorage.removeItem('venue-country-filter-keep-open');
        setOpen(false);
    };
    const triggerLabel = selectedCountries.length === 0 ? "All Countries" : selectedCountries.length === 1 ? selectedCountries[0] : `${selectedCountries.length} Countries`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                size: "sm",
                onClick: ()=>setOpen(!open),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-9 w-full gap-1.5 px-3 justify-between text-xs font-normal", selectedCountries.length > 0 ? "border-primary bg-primary/10 text-primary hover:bg-primary/20" : "border-input bg-background text-foreground hover:bg-muted hover:border-input"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: triggerLabel
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 shrink-0 opacity-50 transition-transform", open && "rotate-180")
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 mt-1 z-50 w-64 rounded-md border bg-popover p-1 shadow-lg",
                onMouseDown: (e)=>e.stopPropagation(),
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-1",
                        children: [
                            selectedCountries.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleClearAll,
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-sm hover:bg-muted text-sm text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "md:hidden",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden md:inline",
                                        children: "Clear selection"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleClose,
                                className: "flex items-center gap-1 px-2 py-1.5 rounded-sm hover:bg-muted text-sm text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this),
                                    "Close"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-64 overflow-y-auto overscroll-contain",
                        children: countries.map(({ country, count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-muted cursor-pointer text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                        checked: selectedCountries.includes(country),
                                        onCheckedChange: ()=>handleToggle(country)
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                        lineNumber: 149,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1",
                                        children: country
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground text-xs",
                                        children: [
                                            "(",
                                            count,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, country, true, {
                                fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/venues/CountryFilter.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
});
}),
"[project]/showcase-next/src/components/ui/slider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slider",
    ()=>Slider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@radix-ui/react-slider/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const Slider = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>{
    // Check if it's a range slider (multiple values)
    const isRange = Array.isArray(props.value) || Array.isArray(props.defaultValue);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full touch-none select-none items-center", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Track"], {
                className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Range"], {
                    className: "absolute h-full bg-primary"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ui/slider.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/ui/slider.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isRange ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Thumb"], {
                        className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/ui/slider.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Thumb"], {
                        className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/ui/slider.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Thumb"], {
                className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/ui/slider.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/ui/slider.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Slider.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
;
}),
"[project]/showcase-next/src/components/venues/CapacitySlider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CapacitySlider",
    ()=>CapacitySlider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/slider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// Stepped scale for capacity (log-like distribution)
const CAPACITY_STEPS = [
    0,
    50,
    100,
    200,
    300,
    500,
    750,
    1000,
    1500,
    2000,
    3000,
    5000,
    7500,
    10000,
    15000,
    20000,
    30000,
    50000,
    75000,
    100000
];
function valueToStep(value) {
    for(let i = CAPACITY_STEPS.length - 1; i >= 0; i--){
        if (value >= CAPACITY_STEPS[i]) return i;
    }
    return 0;
}
function stepToValue(step) {
    return CAPACITY_STEPS[Math.min(step, CAPACITY_STEPS.length - 1)];
}
function formatCapacity(value) {
    if (value >= 1000) {
        return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
    }
    return value.toString();
}
function CapacitySlider({ min, max, onChange, variant = "stacked" }) {
    const [values, setValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        valueToStep(min),
        valueToStep(max)
    ]);
    // Update internal state when props change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setValues([
            valueToStep(min),
            valueToStep(max)
        ]);
    }, [
        min,
        max
    ]);
    const handleChange = (newValues)=>{
        const sorted = [
            Math.min(newValues[0], newValues[1]),
            Math.max(newValues[0], newValues[1])
        ];
        setValues(sorted);
    };
    const handleCommit = ()=>{
        onChange(stepToValue(values[0]), stepToValue(values[1]));
    };
    const minValue = stepToValue(values[0]);
    const maxValue = stepToValue(values[1]);
    const isDefault = minValue === 0 && maxValue === 100000;
    if (variant === "inline") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 lg:gap-2 h-9 px-2 lg:px-3 rounded-md border", isDefault ? "border-input bg-background" : "border-primary bg-primary/5"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm whitespace-nowrap hidden lg:inline", isDefault ? "text-muted-foreground" : "text-primary font-medium"),
                    children: "Capacity"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm whitespace-nowrap lg:hidden", isDefault ? "text-muted-foreground" : "text-primary font-medium"),
                    children: "Cap."
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slider"], {
                    min: 0,
                    max: CAPACITY_STEPS.length - 1,
                    step: 1,
                    value: values,
                    onValueChange: handleChange,
                    onValueCommit: handleCommit,
                    className: "w-16 lg:w-24"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm whitespace-nowrap", isDefault ? "text-muted-foreground" : "text-primary font-medium"),
                    children: [
                        formatCapacity(minValue),
                        "-",
                        formatCapacity(maxValue)
                    ]
                }, void 0, true, {
                    fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2 min-w-[180px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between text-xs text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Capacity"
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: isDefault ? "text-muted-foreground" : "text-foreground font-medium",
                        children: [
                            formatCapacity(minValue),
                            " - ",
                            formatCapacity(maxValue)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slider"], {
                min: 0,
                max: CAPACITY_STEPS.length - 1,
                step: 1,
                value: values,
                onValueChange: handleChange,
                onValueCommit: handleCommit,
                className: "w-full"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/venues/CapacitySlider.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/lib/continents.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Continent configuration and country mappings
__turbopack_context__.s([
    "CONTINENT_COLORS",
    ()=>CONTINENT_COLORS,
    "CONTINENT_COUNTRIES",
    ()=>CONTINENT_COUNTRIES,
    "CONTINENT_ORDER",
    ()=>CONTINENT_ORDER,
    "getContinent",
    ()=>getContinent,
    "getContinentCountries",
    ()=>getContinentCountries,
    "getContinentFromSlug",
    ()=>getContinentFromSlug,
    "getContinentSlug",
    ()=>getContinentSlug
]);
const CONTINENT_COUNTRIES = {
    Europe: [
        // Western Europe
        "United Kingdom",
        "Germany",
        "France",
        "Spain",
        "Italy",
        "The Netherlands",
        "Belgium",
        "Austria",
        "Switzerland",
        "Ireland",
        "Portugal",
        "Luxembourg",
        "Gibraltar",
        // Northern Europe
        "Sweden",
        "Norway",
        "Denmark",
        "Finland",
        "Iceland",
        // Eastern Europe
        "Poland",
        "Czech Republic",
        "Slovak Republic",
        "Slovakia",
        "Hungary",
        "Romania",
        "Bulgaria",
        "Russia",
        "Ukraine",
        "Belarus",
        "Moldova",
        // Southern Europe
        "Greece",
        "Croatia",
        "Slovenia",
        "Serbia",
        "Bosnia and Herzegovina",
        "Bosnia",
        "Albania",
        "North Macedonia",
        "Macedonia",
        "Montenegro",
        "Kosovo",
        // Baltic States
        "Estonia",
        "Latvia",
        "Lithuania",
        // Other
        "Malta",
        "Cyprus",
        "Georgia",
        "Armenia",
        "Azerbaijan",
        "Turkey",
        "Andorra",
        "Monaco",
        "San Marino",
        "Vatican City",
        "Liechtenstein"
    ],
    "North America": [
        "United States",
        "Canada",
        "Mexico",
        "USA",
        "US",
        "Bahamas",
        "Jamaica",
        "Trinidad and Tobago",
        "Barbados",
        "Dominican Republic",
        "Cuba",
        "Haiti",
        "Costa Rica",
        "Panama",
        "Guatemala",
        "Honduras",
        "El Salvador",
        "Nicaragua",
        "Belize",
        "Puerto Rico",
        "Cayman Islands",
        "Bermuda"
    ],
    Asia: [
        // East Asia
        "Japan",
        "South Korea",
        "China",
        "Taiwan",
        "Hong Kong",
        "Macau",
        "Mongolia",
        // Southeast Asia
        "Singapore",
        "Thailand",
        "Malaysia",
        "Indonesia",
        "Philippines",
        "Vietnam",
        "Cambodia",
        "Laos",
        "Myanmar",
        "Brunei",
        // South Asia
        "India",
        "Pakistan",
        "Bangladesh",
        "Sri Lanka",
        "Nepal",
        "Bhutan",
        "Maldives",
        // Central Asia
        "Kazakhstan",
        "Uzbekistan",
        "Turkmenistan",
        "Kyrgyzstan",
        "Tajikistan",
        // Middle East
        "United Arab Emirates",
        "UAE",
        "Israel",
        "Saudi Arabia",
        "Qatar",
        "Kuwait",
        "Bahrain",
        "Oman",
        "Jordan",
        "Lebanon",
        "Iraq",
        "Iran",
        "Yemen",
        "Syria"
    ],
    "South America": [
        "Brazil",
        "Argentina",
        "Chile",
        "Colombia",
        "Peru",
        "Venezuela",
        "Ecuador",
        "Uruguay",
        "Paraguay",
        "Bolivia",
        "Guyana",
        "Suriname",
        "French Guiana"
    ],
    Oceania: [
        "Australia",
        "New Zealand",
        "Fiji",
        "Papua New Guinea",
        "Solomon Islands",
        "Vanuatu",
        "Samoa",
        "Tonga",
        "Micronesia",
        "Palau",
        "Marshall Islands",
        "Kiribati",
        "Nauru",
        "Tuvalu"
    ],
    Africa: [
        // Northern Africa
        "Egypt",
        "Morocco",
        "Tunisia",
        "Algeria",
        "Libya",
        "Sudan",
        // Western Africa
        "Nigeria",
        "Ghana",
        "Senegal",
        "Ivory Coast",
        "Mali",
        "Burkina Faso",
        "Guinea",
        "Benin",
        "Togo",
        "Sierra Leone",
        "Liberia",
        "Mauritania",
        "Niger",
        "Gambia",
        "Guinea-Bissau",
        "Cape Verde",
        // Eastern Africa
        "Kenya",
        "Ethiopia",
        "Tanzania",
        "Uganda",
        "Rwanda",
        "Burundi",
        "Somalia",
        "Djibouti",
        "Eritrea",
        "South Sudan",
        "Seychelles",
        "Mauritius",
        // Southern Africa
        "South Africa",
        "Namibia",
        "Botswana",
        "Zimbabwe",
        "Zambia",
        "Mozambique",
        "Angola",
        "Malawi",
        "Lesotho",
        "Eswatini",
        "Madagascar",
        "Comoros",
        // Central Africa
        "Democratic Republic of the Congo",
        "Republic of the Congo",
        "Cameroon",
        "Central African Republic",
        "Chad",
        "Gabon",
        "Equatorial Guinea",
        "Sao Tome and Principe"
    ]
};
const CONTINENT_COLORS = {
    Europe: "#ef4444",
    "North America": "#f97316",
    "South America": "#eab308",
    Asia: "#22c55e",
    Africa: "#14b8a6",
    Oceania: "#0ea5e9"
};
const CONTINENT_ORDER = [
    "Europe",
    "North America",
    "Asia",
    "South America",
    "Oceania",
    "Africa"
];
function getContinent(country) {
    for (const [continent, countries] of Object.entries(CONTINENT_COUNTRIES)){
        if (countries.includes(country)) return continent;
    }
    return undefined;
}
function getContinentCountries(continent) {
    return CONTINENT_COUNTRIES[continent] || [];
}
function getContinentSlug(continent) {
    return continent.toLowerCase().replace(/\s+/g, "-");
}
function getContinentFromSlug(slug) {
    const normalized = slug.toLowerCase();
    return CONTINENT_ORDER.find((c)=>getContinentSlug(c) === normalized);
}
}),
"[project]/showcase-next/src/hooks/useVenueCounts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTotalVenueCount",
    ()=>useTotalVenueCount,
    "useVenueCountsByContinent",
    ()=>useVenueCountsByContinent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/continents.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function useVenueCountsByContinent() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-counts-by-continent"
        ],
        queryFn: async ()=>{
            // Get counts for each continent individually to avoid row limits
            const counts = {};
            for (const continent of __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTINENT_ORDER"]){
                const { count, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listings_public").select("*", {
                    count: "exact",
                    head: true
                }).not("venue_type", "is", null).eq("continent", continent);
                if (error) throw error;
                counts[continent] = count || 0;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTINENT_ORDER"].map((continent)=>({
                    continent,
                    count: counts[continent] || 0
                }));
        },
        staleTime: 5 * 60 * 1000
    });
}
function useTotalVenueCount() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "total-venue-count"
        ],
        queryFn: async ()=>{
            const { count, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("listings_public").select("*", {
                count: "exact",
                head: true
            }).not("venue_type", "is", null);
            if (error) throw error;
            return count || 0;
        },
        staleTime: 5 * 60 * 1000
    });
}
}),
"[project]/showcase-next/src/components/venues/WorldMap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorldMap",
    ()=>WorldMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$world$2d$map$2d$country$2d$shapes$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/world-map-country-shapes/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
// Continent to country code mapping (ISO 2-digit codes)
const CONTINENT_MAPPING = {
    'Europe': [
        'AD',
        'AL',
        'AT',
        'BA',
        'BE',
        'BG',
        'BY',
        'CH',
        'CY',
        'CZ',
        'DE',
        'DK',
        'EE',
        'ES',
        'FI',
        'FO',
        'FR',
        'GB',
        'GR',
        'HR',
        'HU',
        'IE',
        'IS',
        'IT',
        'LI',
        'LT',
        'LU',
        'LV',
        'MD',
        'ME',
        'MK',
        'MT',
        'NL',
        'NO',
        'PL',
        'PT',
        'RO',
        'RS',
        'SE',
        'SI',
        'SK',
        'UA',
        'IC'
    ],
    'North America': [
        'AG',
        'BB',
        'BS',
        'BZ',
        'CA',
        'CR',
        'CU',
        'DM',
        'DO',
        'GD',
        'GL',
        'GT',
        'HN',
        'HT',
        'JM',
        'KN',
        'KY',
        'LC',
        'MX',
        'NI',
        'PA',
        'PR',
        'SV',
        'TC',
        'TT',
        'US',
        'VC',
        'VG',
        'VI',
        'AW',
        'CW',
        'GP',
        'MQ',
        'GF',
        'AI',
        'BM',
        'MS',
        'SX'
    ],
    'South America': [
        'AR',
        'BO',
        'BR',
        'CL',
        'CO',
        'EC',
        'FK',
        'GY',
        'PE',
        'PY',
        'SR',
        'UY',
        'VE'
    ],
    'Asia': [
        'AE',
        'AF',
        'AM',
        'AZ',
        'BD',
        'BH',
        'BN',
        'BT',
        'CN',
        'GE',
        'HK',
        'ID',
        'IL',
        'IN',
        'IQ',
        'IR',
        'JO',
        'JP',
        'KG',
        'KH',
        'KP',
        'KR',
        'KW',
        'KZ',
        'LA',
        'LB',
        'LK',
        'MM',
        'MN',
        'MY',
        'NP',
        'OM',
        'PH',
        'PK',
        'PS',
        'QA',
        'RU',
        'SA',
        'SG',
        'SY',
        'TH',
        'TJ',
        'TL',
        'TM',
        'TR',
        'TW',
        'UZ',
        'VN',
        'YE',
        'MV'
    ],
    'Africa': [
        'AO',
        'BF',
        'BI',
        'BJ',
        'BW',
        'CD',
        'CF',
        'CG',
        'CI',
        'CM',
        'CV',
        'DJ',
        'DZ',
        'EG',
        'EH',
        'ER',
        'ET',
        'GA',
        'GH',
        'GM',
        'GN',
        'GQ',
        'GW',
        'KE',
        'KM',
        'LR',
        'LS',
        'LY',
        'MA',
        'MG',
        'ML',
        'MR',
        'MU',
        'MW',
        'MZ',
        'NA',
        'NE',
        'NG',
        'RE',
        'RW',
        'SC',
        'SD',
        'SL',
        'SN',
        'SO',
        'SS',
        'ST',
        'SZ',
        'TD',
        'TG',
        'TN',
        'TZ',
        'UG',
        'YT',
        'ZA',
        'ZM',
        'ZW'
    ],
    'Oceania': [
        'AU',
        'FJ',
        'NC',
        'NR',
        'NZ',
        'PF',
        'PG',
        'SB',
        'TO',
        'VU',
        'PN'
    ]
};
// Continent highlight colors
const CONTINENT_COLORS = {
    'Europe': '#ef4444',
    'North America': '#f97316',
    'South America': '#eab308',
    'Asia': '#22c55e',
    'Africa': '#14b8a6',
    'Oceania': '#0ea5e9'
};
const CONTINENT_ORDER = [
    'Europe',
    'North America',
    'South America',
    'Asia',
    'Africa',
    'Oceania'
];
// Build country ID to continent lookup
const countryToContinent = {};
Object.entries(CONTINENT_MAPPING).forEach(([continent, countries])=>{
    countries.forEach((code)=>{
        countryToContinent[code] = continent;
    });
});
// Group country shapes by continent
const getCountryPathsByContinent = ()=>{
    const result = {
        'Europe': [],
        'North America': [],
        'South America': [],
        'Asia': [],
        'Africa': [],
        'Oceania': []
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$world$2d$map$2d$country$2d$shapes$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].forEach((country)=>{
        const continent = countryToContinent[country.id];
        if (continent && result[continent]) {
            result[continent].push(country);
        }
    });
    return result;
};
const CONTINENT_PATHS = getCountryPathsByContinent();
// Get continent slug for URL
const getContinentSlug = (continent)=>{
    return continent.toLowerCase().replace(/\s+/g, '-');
};
function WorldMap({ venueCounts, onSelectContinent }) {
    const [hoveredContinent, setHoveredContinent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const getCount = (continent)=>{
        return venueCounts[continent] || 0;
    };
    const handleContinentClick = (continent)=>{
        onSelectContinent(continent);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative rounded-xl overflow-hidden border border-zinc-700",
                style: {
                    backgroundColor: '#18181b'
                },
                onMouseLeave: ()=>setHoveredContinent(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 2000 1001",
                        className: "w-full h-auto",
                        style: {
                            maxHeight: '360px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                x: "0",
                                y: "0",
                                width: "2000",
                                height: "1001",
                                fill: "#18181b"
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            Object.entries(CONTINENT_PATHS).map(([continent, countries])=>{
                                const isHovered = hoveredContinent === continent;
                                const color = CONTINENT_COLORS[continent] || '#3f3f46';
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    children: countries.map((country)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: country.shape,
                                            fill: isHovered ? color : '#3f3f46',
                                            stroke: isHovered ? color : '#52525b',
                                            strokeWidth: isHovered ? 1.5 : 0.5,
                                            className: "transition-all duration-200 cursor-pointer",
                                            onMouseEnter: ()=>setHoveredContinent(continent),
                                            onClick: ()=>handleContinentClick(continent)
                                        }, country.id, false, {
                                            fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                            lineNumber: 112,
                                            columnNumber: 19
                                        }, this))
                                }, continent, false, {
                                    fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute bottom-3 left-3 bg-zinc-800/95 backdrop-blur-sm border border-zinc-700 rounded-lg shadow-lg px-4 py-3 transition-all duration-300 ${hoveredContinent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`,
                        children: hoveredContinent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-3 h-3 rounded-full",
                                            style: {
                                                backgroundColor: CONTINENT_COLORS[hoveredContinent]
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-sm text-white",
                                            children: hoveredContinent
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-zinc-400 mt-1",
                                    children: [
                                        getCount(hoveredContinent).toLocaleString(),
                                        " venue",
                                        getCount(hoveredContinent) !== 1 ? 's' : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-zinc-500 mt-1.5 border-t border-zinc-700 pt-1.5",
                                    children: "Click to explore"
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 md:grid-cols-6 gap-2 mt-3",
                children: CONTINENT_ORDER.map((continent)=>{
                    const color = CONTINENT_COLORS[continent];
                    const isHovered = hoveredContinent === continent;
                    const count = getCount(continent);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "relative px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-200 text-center group",
                        style: {
                            borderColor: isHovered ? color : undefined,
                            backgroundColor: isHovered ? `${color}15` : undefined
                        },
                        onMouseEnter: ()=>setHoveredContinent(continent),
                        onMouseLeave: ()=>setHoveredContinent(null),
                        onClick: ()=>handleContinentClick(continent),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-medium text-zinc-300 group-hover:text-white transition-colors",
                                style: {
                                    color: isHovered ? color : undefined
                                },
                                children: continent === 'North America' ? 'N. America' : continent === 'South America' ? 'S. America' : continent
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                lineNumber: 177,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] text-zinc-500 mt-0.5",
                                children: count.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                                lineNumber: 184,
                                columnNumber: 15
                            }, this)
                        ]
                    }, continent, true, {
                        fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                        lineNumber: 166,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-sm text-zinc-500 mt-3",
                children: "Hover over a region and click to explore venues"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/venues/WorldMap.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all duration-200", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/card.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/card.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/card.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/card.tsx",
        lineNumber: 32,
        columnNumber: 37
    }, ("TURBOPACK compile-time value", void 0)));
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/card.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
CardFooter.displayName = "CardFooter";
;
}),
"[project]/showcase-next/src/components/venues/ContinentSelector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContinentSelector",
    ()=>ContinentSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/continents.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueCounts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenueCounts.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$WorldMap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/venues/WorldMap.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/card.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
function ContinentSelector({ onSelectContinent, onBrowseAll }) {
    const { data: continentCounts, isLoading: countsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueCounts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenueCountsByContinent"])();
    const { data: totalCount, isLoading: totalLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueCounts$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTotalVenueCount"])();
    // Abbreviated names for mobile display only
    const getDisplayName = (continent)=>{
        const abbreviations = {
            "North America": "N. America",
            "South America": "S. America"
        };
        return abbreviations[continent] || continent;
    };
    const getCount = (continent)=>{
        return continentCounts?.find((c)=>c.continent === continent)?.count || 0;
    };
    // Convert continent counts array to object for WorldMap
    const venueCountsMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!continentCounts) return {};
        return continentCounts.reduce((acc, { continent, count })=>{
            acc[continent] = count;
            return acc;
        }, {});
    }, [
        continentCounts
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$WorldMap$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WorldMap"], {
                    venueCounts: venueCountsMap,
                    onSelectContinent: onSelectContinent
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:hidden",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTINENT_ORDER"].map((continent)=>{
                    const count = getCount(continent);
                    const color = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTINENT_COLORS"][continent];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelectContinent(continent),
                        disabled: count === 0,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-full block text-left", count === 0 && "opacity-50 cursor-not-allowed"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("transition-all duration-200 hover:shadow-md hover:border-primary/50 group hover-glow h-full", count === 0 && "pointer-events-none"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-3 sm:p-6 h-full flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 group-hover:gradient-brand",
                                                style: {
                                                    backgroundColor: `${color}26`
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 20,
                                                        className: "group-hover:hidden",
                                                        style: {
                                                            color
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                                        lineNumber: 78,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        size: 20,
                                                        className: "hidden group-hover:block text-primary-foreground"
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                                lineNumber: 74,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-sm sm:text-base text-foreground transition-colors duration-200",
                                                style: {
                                                    "--hover-color": color
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "group-hover:hidden",
                                                        children: getDisplayName(continent)
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                                        lineNumber: 85,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "hidden group-hover:inline",
                                                        style: {
                                                            color
                                                        },
                                                        children: getDisplayName(continent)
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                                lineNumber: 81,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                        lineNumber: 73,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs sm:text-sm text-muted-foreground pl-9 mt-1",
                                        children: countsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block w-10 sm:w-12 h-3 bg-muted animate-pulse rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                            lineNumber: 93,
                                            columnNumber: 23
                                        }, this) : `${count.toLocaleString()} venue${count !== 1 ? "s" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                        lineNumber: 91,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                                lineNumber: 71,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                            lineNumber: 65,
                            columnNumber: 15
                        }, this)
                    }, continent, false, {
                        fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/venues/ContinentSelector.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/components/FavouriteButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FavouriteButton",
    ()=>FavouriteButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useFavourites$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useFavourites.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function FavouriteButtonComponent({ listingId, size = "md", variant = "ghost", className }) {
    const { isFavourite, toggle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useFavourites$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsFavourite"])(listingId);
    const sizeClasses = size === "sm" ? "h-8 w-8" : size === "default" ? "h-10 w-10" : "h-10 w-10";
    const iconSizeClasses = size === "sm" ? "h-4 w-4" : size === "default" ? "h-5 w-5" : "h-5 w-5";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        variant: variant,
        size: "icon",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(sizeClasses, isFavourite && "text-red-500 hover:text-red-600", className),
        onClick: (e)=>{
            e.preventDefault();
            e.stopPropagation();
            toggle();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(iconSizeClasses, isFavourite && "fill-current")
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/FavouriteButton.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/FavouriteButton.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
const FavouriteButton = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(FavouriteButtonComponent);
}),
"[project]/showcase-next/src/components/TierBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TierBadge",
    ()=>TierBadge,
    "TierStar",
    ()=>TierStar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const tierConfig = {
    premier: {
        label: "Premier",
        colorClass: "text-tier-premier",
        bgClass: "bg-tier-premier/20 border-tier-premier/40",
        glowClass: "shadow-glow-pink"
    },
    enhanced: {
        label: "Enhanced",
        colorClass: "text-tier-enhanced",
        bgClass: "bg-tier-enhanced/20 border-tier-enhanced/40",
        glowClass: "shadow-glow-cyan"
    },
    free: {
        label: "Free",
        colorClass: "text-tier-free",
        bgClass: "bg-tier-free/20 border-tier-free/40",
        glowClass: ""
    }
};
function TierBadge({ tier, showLabel = false, className }) {
    const config = tierConfig[tier];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border", config.bgClass, config.colorClass, tier !== 'free' && config.glowClass, className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                className: "h-3 w-3 fill-current"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/TierBadge.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            showLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: config.label
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/TierBadge.tsx",
                lineNumber: 46,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/TierBadge.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function TierStar({ tier, className }) {
    const config = tierConfig[tier];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 fill-current", config.colorClass, className)
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/TierBadge.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/lib/countryAliases.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Canonical slug → display name mapping
__turbopack_context__.s([
    "COUNTRY_ALIASES",
    ()=>COUNTRY_ALIASES,
    "COUNTRY_PREFERRED_SLUGS",
    ()=>COUNTRY_PREFERRED_SLUGS,
    "countryToSlug",
    ()=>countryToSlug,
    "slugToCountry",
    ()=>slugToCountry
]);
const COUNTRY_ALIASES = {
    'uk': 'United Kingdom',
    'usa': 'United States',
    'us': 'United States'
};
const COUNTRY_PREFERRED_SLUGS = {
    'United Kingdom': 'uk',
    'United States': 'usa',
    'USA': 'usa'
};
function countryToSlug(country) {
    if (COUNTRY_PREFERRED_SLUGS[country]) {
        return COUNTRY_PREFERRED_SLUGS[country];
    }
    return country.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function slugToCountry(slug, knownCountries) {
    // Check aliases first
    const normalizedSlug = slug.toLowerCase();
    if (COUNTRY_ALIASES[normalizedSlug]) {
        return COUNTRY_ALIASES[normalizedSlug];
    }
    // Fall back to matching against known countries
    return knownCountries.find((c)=>c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === normalizedSlug) || null;
}
}),
"[project]/showcase-next/src/lib/venueUrlUtils.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COUNTRIES_WITH_REGIONS",
    ()=>COUNTRIES_WITH_REGIONS,
    "buildVenueUrl",
    ()=>buildVenueUrl,
    "countryHasRegions",
    ()=>countryHasRegions,
    "fromCountrySlug",
    ()=>fromCountrySlug,
    "fromSlug",
    ()=>fromSlug,
    "getContinentForCountry",
    ()=>getContinentForCountry,
    "toSlug",
    ()=>toSlug
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/continents.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$countryAliases$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/countryAliases.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/cityRegions.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function toSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function fromSlug(slug, knownValues) {
    const normalized = slug.toLowerCase();
    return knownValues.find((v)=>toSlug(v) === normalized) || null;
}
function fromCountrySlug(slug, knownCountries) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$countryAliases$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["slugToCountry"])(slug, knownCountries);
}
function getContinentForCountry(country) {
    for (const [continent, countries] of Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTINENT_COUNTRIES"])){
        if (countries.includes(country)) {
            return continent;
        }
    }
    return null;
}
const COUNTRIES_WITH_REGIONS = [
    'UK',
    'United Kingdom',
    'USA',
    'United States'
];
function countryHasRegions(country) {
    return COUNTRIES_WITH_REGIONS.some((c)=>c.toLowerCase() === country.toLowerCase());
}
function buildVenueUrl(params) {
    const parts = [
        '/venues'
    ];
    if (params.continent) {
        parts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentSlug"])(params.continent));
        if (params.country) {
            parts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$countryAliases$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["countryToSlug"])(params.country));
            if (params.regionSlug) {
                parts.push(params.regionSlug);
                // For city-regions, skip the city segment (region IS the city)
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCityRegion"])(params.country, params.regionSlug) && params.city) {
                    parts.push(toSlug(params.city));
                }
            } else if (params.city) {
                parts.push(toSlug(params.city));
            }
        }
    }
    return parts.join('/');
}
;
;
}),
"[project]/showcase-next/src/lib/buildVenueUrl.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildVenueProfileUrl",
    ()=>buildVenueProfileUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$countryAliases$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/countryAliases.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/continents.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/venueUrlUtils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/cityRegions.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function buildVenueProfileUrl(venue) {
    const { slug, country, regionSlug, city } = venue;
    // Fallback to basic listing URL if we don't have location data
    if (!country) {
        return `/listing/${slug}`;
    }
    let continent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getContinentForCountry"])(country);
    // Fallback: If country not in mapping, try to infer continent from country name patterns
    if (!continent) {
        console.warn(`Country "${country}" not found in continent mapping, using fallback`);
        // Try to infer from common patterns or default to listing URL
        const countryLower = country.toLowerCase();
        if (countryLower.includes("island") || countryLower.includes("pacific")) {
            continent = "Oceania";
        } else if (countryLower.includes("africa") || [
            "nigeria",
            "ghana",
            "kenya",
            "egypt"
        ].some((c)=>countryLower.includes(c))) {
            continent = "Africa";
        } else if ([
            "arab",
            "dubai",
            "saudi",
            "qatar",
            "israel",
            "jordan",
            "lebanon"
        ].some((c)=>countryLower.includes(c))) {
            continent = "Asia";
        } else {
            // If we really can't determine, fall back to listing URL
            return `/listing/${slug}`;
        }
    }
    const parts = [
        "/venues",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentSlug"])(continent),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$countryAliases$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["countryToSlug"])(country)
    ];
    // Add region if present
    if (regionSlug) {
        parts.push(regionSlug);
        // For city-regions (London, New York), the region IS the city - don't add city segment
        // This prevents URLs like /uk/london/london/venue-name
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCityRegion"])(country, regionSlug)) {
            // Only add city if it's not a city-region
            if (city) {
                parts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toSlug"])(city));
            }
        }
    } else if (city) {
        // No region, just add city
        parts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toSlug"])(city));
    }
    // Add venue slug
    parts.push(slug);
    return parts.join("/");
}
}),
"[project]/showcase-next/src/hooks/useVenueUrl.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getVenueUrl",
    ()=>getVenueUrl,
    "useVenueUrl",
    ()=>useVenueUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$buildVenueUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/buildVenueUrl.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function useVenueUrl(venue) {
    // Fetch region slug if venue has region_id but no region_slug
    const { data: region } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'region',
            venue?.region_id
        ],
        queryFn: async ()=>{
            if (!venue?.region_id) return null;
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('regions').select('region_slug').eq('id', venue.region_id).single();
            return data;
        },
        enabled: !!venue?.region_id && !venue?.region_slug
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!venue) return null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$buildVenueUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildVenueProfileUrl"])({
            slug: venue.slug,
            country: venue.country,
            regionSlug: venue.region_slug || region?.region_slug || null,
            city: venue.town_city
        });
    }, [
        venue,
        region
    ]);
}
function getVenueUrl(venue) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$buildVenueUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildVenueProfileUrl"])({
        slug: venue.slug,
        country: venue.country,
        regionSlug: venue.region_slug || null,
        city: venue.town_city
    });
}
}),
"[project]/showcase-next/src/components/venues/VenueCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VenueCard",
    ()=>VenueCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$FavouriteButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/FavouriteButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$TierBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/TierBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenueUrl.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const VENUE_TYPE_COLORS = {
    "Arena": "bg-accent/20 text-accent border-accent/40",
    "Amphitheatre": "bg-accent-teal/20 text-accent-teal border-accent-teal/40",
    "Bar": "bg-tier-free/20 text-tier-free border-tier-free/40",
    "Club": "bg-accent-violet/20 text-accent-violet border-accent-violet/40",
    "Concert Hall": "bg-primary/20 text-primary border-primary/40",
    "Convention Centre": "bg-muted-foreground/20 text-muted-foreground border-muted-foreground/40",
    "Cultural Centre": "bg-accent-teal/20 text-accent-teal border-accent-teal/40",
    "Opera House": "bg-primary/20 text-primary border-primary/40",
    "Outdoor Venue": "bg-accent/20 text-accent border-accent/40",
    "Performing Arts Centre": "bg-accent-violet/20 text-accent-violet border-accent-violet/40",
    "Stadium": "bg-accent/20 text-accent border-accent/40",
    "Theatre": "bg-primary/20 text-primary border-primary/40"
};
function formatCapacity(capacity) {
    if (!capacity) return "";
    if (capacity >= 1000) {
        return `${(capacity / 1000).toFixed(capacity >= 10000 ? 0 : 1)}k cap`;
    }
    return `${capacity} cap`;
}
function VenueCard({ venue, isHighlighted, onHover, onHoverEnd }) {
    const typeColorClass = venue.venue_type ? VENUE_TYPE_COLORS[venue.venue_type] || "bg-muted text-muted-foreground" : "";
    const tier = venue.tier || 'free';
    const isPremier = tier === 'premier';
    const isEnhanced = tier === 'enhanced';
    // Build SEO-friendly venue URL
    const venueUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVenueUrl"])({
        slug: venue.slug,
        country: venue.country,
        region_slug: venue.region_slug || null,
        town_city: venue.town_city
    });
    const cardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-3 py-2 rounded-lg border transition-all duration-200 relative flex items-center gap-3", // Background tint based on tier
        isPremier && !isHighlighted && "bg-primary/[0.03]", isEnhanced && !isHighlighted && "bg-accent/[0.03]", // Highlighted state (from map)
        isHighlighted && "bg-primary/10 border-primary shadow-glow-pink", // Default border
        !isHighlighted && "border-border", // Hover states based on tier
        !isHighlighted && isPremier && "hover:bg-primary/[0.08] hover:border-primary/50 hover:shadow-[0_0_15px_hsl(330_80%_55%/0.15)]", !isHighlighted && isEnhanced && "hover:bg-accent/[0.08] hover:border-accent/50 hover:shadow-[0_0_15px_hsl(185_100%_50%/0.15)]", !isHighlighted && !isPremier && !isEnhanced && "hover:bg-muted/50 hover:border-muted-foreground/30"),
        onMouseEnter: onHover,
        onMouseLeave: onHoverEnd,
        "data-venue-id": venue.id,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$TierBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TierStar"], {
                tier: tier,
                className: "flex-shrink-0"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("font-medium text-sm transition-colors line-clamp-1", isPremier && "group-hover:text-primary", isEnhanced && "group-hover:text-accent", !isPremier && !isEnhanced && "group-hover:text-foreground"),
                        children: venue.name
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-1.5 mt-1",
                        children: [
                            venue.venue_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-[10px] px-1.5 py-0 h-4", typeColorClass),
                                children: venue.venue_type
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            venue.venue_capacity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "text-[10px] px-1.5 py-0 h-4 bg-muted/50 gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                        className: "h-2.5 w-2.5"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this),
                                    formatCapacity(venue.venue_capacity)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            (venue.town_city || venue.country) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-muted-foreground",
                                children: [
                                    venue.town_city,
                                    venue.country
                                ].filter(Boolean).join(", ")
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$FavouriteButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FavouriteButton"], {
                    listingId: venue.id,
                    size: "sm"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
    if (venueUrl) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: venueUrl,
            className: "group block cursor-pointer",
            children: cardContent
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/venues/VenueCard.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this);
    }
    return cardContent;
}
}),
"[project]/showcase-next/src/components/venues/VirtualVenueList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VirtualVenueList",
    ()=>VirtualVenueList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-virtual/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/venues/VenueCard.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// Memoized venue card to prevent unnecessary re-renders
const MemoizedVenueCard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(function MemoizedVenueCard({ venue, isHighlighted, onHover, onHoverEnd }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VenueCard"], {
        venue: venue,
        isHighlighted: isHighlighted,
        onHover: onHover,
        onHoverEnd: onHoverEnd
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/venues/VirtualVenueList.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
});
function VirtualVenueList({ venues, highlightedVenueId, onHoverVenue, className, footer, onScroll, initialScrollTop, onScrollPositionChange }) {
    const parentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasRestoredScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Virtual list - only renders visible items
    const virtualizer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$virtual$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useVirtualizer"])({
        count: venues.length,
        getScrollElement: ()=>parentRef.current,
        estimateSize: ()=>72,
        overscan: 5
    });
    const items = virtualizer.getVirtualItems();
    // Restore scroll position after initial render
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialScrollTop !== undefined && initialScrollTop > 0 && parentRef.current && !hasRestoredScroll.current && venues.length > 0) {
            // Small delay to ensure virtualizer has rendered
            requestAnimationFrame(()=>{
                if (parentRef.current) {
                    parentRef.current.scrollTop = initialScrollTop;
                    hasRestoredScroll.current = true;
                }
            });
        }
    }, [
        initialScrollTop,
        venues.length
    ]);
    // Debounced hover handlers
    const handleHover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((venueId)=>{
        onHoverVenue(venueId);
    }, [
        onHoverVenue
    ]);
    const handleHoverEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        onHoverVenue(null);
    }, [
        onHoverVenue
    ]);
    // Combined scroll handler
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        onScroll?.();
        if (parentRef.current && onScrollPositionChange) {
            onScrollPositionChange(parentRef.current.scrollTop);
        }
    }, [
        onScroll,
        onScrollPositionChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: parentRef,
        className: className,
        style: {
            overflow: "auto",
            contain: "strict"
        },
        onScroll: handleScroll,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: `${virtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative"
                },
                children: items.map((virtualItem)=>{
                    const venue = venues[virtualItem.index];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-venue-id": venue.id,
                        style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                            padding: "3px 0"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MemoizedVenueCard, {
                            venue: venue,
                            isHighlighted: highlightedVenueId === venue.id,
                            onHover: ()=>handleHover(venue.id),
                            onHoverEnd: handleHoverEnd
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/venues/VirtualVenueList.tsx",
                            lineNumber: 122,
                            columnNumber: 15
                        }, this)
                    }, venue.id, false, {
                        fileName: "[project]/showcase-next/src/components/venues/VirtualVenueList.tsx",
                        lineNumber: 109,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/VirtualVenueList.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: footer
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/venues/VirtualVenueList.tsx",
                lineNumber: 133,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/venues/VirtualVenueList.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/hooks/useVenueLocationSeo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAllVenueLocationSeo",
    ()=>useAllVenueLocationSeo,
    "useVenueLocationSeo",
    ()=>useVenueLocationSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
const useVenueLocationSeo = (continent, country, regionSlug, city)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-location-seo",
            continent,
            country,
            regionSlug,
            city
        ],
        queryFn: async ()=>{
            if (!continent) return null;
            // Try most specific match first, then cascade to less specific
            // 1. Try exact match: continent + country + region + city
            if (country && regionSlug && city) {
                const { data: exactMatch } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_location_seo").select("*").eq("continent", continent).eq("country", country).eq("region_slug", regionSlug).eq("city", city).limit(1).maybeSingle();
                if (exactMatch) return exactMatch;
            }
            // 2. Try city without region: continent + country + city (region_slug = null)
            if (country && city) {
                const { data: cityNoRegionMatch } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_location_seo").select("*").eq("continent", continent).eq("country", country).is("region_slug", null).eq("city", city).limit(1).maybeSingle();
                if (cityNoRegionMatch) return cityNoRegionMatch;
            }
            // 3. Try region level: continent + country + region (city = null)
            if (country && regionSlug) {
                const { data: regionMatch } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_location_seo").select("*").eq("continent", continent).eq("country", country).eq("region_slug", regionSlug).is("city", null).limit(1).maybeSingle();
                if (regionMatch) return regionMatch;
            }
            // 4. Try country level: continent + country (region = null, city = null)
            if (country) {
                const { data: countryMatch } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_location_seo").select("*").eq("continent", continent).eq("country", country).is("region_slug", null).is("city", null).limit(1).maybeSingle();
                if (countryMatch) return countryMatch;
            }
            // 5. Try continent level: continent only (country = null, region = null, city = null)
            const { data: continentMatch } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_location_seo").select("*").eq("continent", continent).is("country", null).is("region_slug", null).is("city", null).limit(1).maybeSingle();
            return continentMatch;
        },
        enabled: !!continent
    });
};
const useAllVenueLocationSeo = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-location-seo-all"
        ],
        queryFn: async ()=>{
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_location_seo").select("*").order("created_at", {
                ascending: false
            });
            if (error) throw error;
            return data;
        }
    });
};
}),
"[project]/showcase-next/src/hooks/useVenueTypeSeo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAllVenueTypeSeo",
    ()=>useAllVenueTypeSeo,
    "useVenueTypeSeo",
    ()=>useVenueTypeSeo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
const useVenueTypeSeo = (venueType, continent, country, regionSlug, city)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-type-seo",
            venueType,
            continent,
            country,
            regionSlug,
            city
        ],
        queryFn: async ()=>{
            if (!venueType) return null;
            // Try most specific match first (city level), then cascade up
            // Priority: city > region > country > continent > type-only
            // 1. Try exact match with city
            if (city) {
                let query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_type_seo").select("*").eq("venue_type", venueType).eq("continent", continent).eq("country", country).eq("city", city);
                // Handle null vs non-null region_slug
                if (regionSlug) {
                    query = query.eq("region_slug", regionSlug);
                } else {
                    query = query.is("region_slug", null);
                }
                const { data } = await query.maybeSingle();
                if (data) return data;
            }
            // 2. Try region level (city null)
            if (regionSlug) {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_type_seo").select("*").eq("venue_type", venueType).eq("continent", continent).eq("country", country).eq("region_slug", regionSlug).is("city", null).maybeSingle();
                if (data) return data;
            }
            // 3. Try country level (region and city null)
            if (country) {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_type_seo").select("*").eq("venue_type", venueType).eq("continent", continent).eq("country", country).is("region_slug", null).is("city", null).maybeSingle();
                if (data) return data;
            }
            // 4. Try continent level (country, region, city null)
            if (continent) {
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_type_seo").select("*").eq("venue_type", venueType).eq("continent", continent).is("country", null).is("region_slug", null).is("city", null).maybeSingle();
                if (data) return data;
            }
            // 5. Try type-only (all location fields null)
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_type_seo").select("*").eq("venue_type", venueType).is("continent", null).is("country", null).is("region_slug", null).is("city", null).maybeSingle();
            return data;
        },
        enabled: !!venueType
    });
};
const useAllVenueTypeSeo = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "venue-type-seo-all"
        ],
        queryFn: async ()=>{
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("venue_type_seo").select("*").order("venue_type", {
                ascending: true
            }).order("created_at", {
                ascending: false
            });
            if (error) throw error;
            return data;
        }
    });
};
}),
"[project]/showcase-next/src/hooks/useCategories.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCategories",
    ()=>useCategories,
    "useCategoryBySlug",
    ()=>useCategoryBySlug,
    "useSubcategories",
    ()=>useSubcategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/integrations/supabase/client.ts [app-ssr] (ecmascript)");
'use client';
;
;
function useCategories() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "categories"
        ],
        queryFn: async ()=>{
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("categories").select("*").order("name");
            if (error) throw error;
            return data;
        }
    });
}
function useCategoryBySlug(slug, initialData) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "category",
            slug
        ],
        queryFn: async ()=>{
            // First try to find by url_slug, then fallback to slug
            const { data: byUrlSlug, error: urlSlugError } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("categories").select("*").eq("url_slug", slug).maybeSingle();
            if (urlSlugError) throw urlSlugError;
            if (byUrlSlug) return byUrlSlug;
            // Fallback to regular slug
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("categories").select("*").eq("slug", slug).maybeSingle();
            if (error) throw error;
            return data;
        },
        enabled: !!slug,
        initialData
    });
}
function useSubcategories(parentId, initialData) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "subcategories",
            parentId
        ],
        queryFn: async ()=>{
            const query = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$integrations$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("categories").select("*").order("name");
            if (parentId) {
                query.eq("parent_id", parentId);
            } else {
                query.is("parent_id", null);
            }
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
        initialData
    });
}
}),
"[project]/showcase-next/src/lib/venueTypeContent.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Venue type descriptions for programmatic SEO content
__turbopack_context__.s([
    "VENUE_TYPE_DESCRIPTIONS",
    ()=>VENUE_TYPE_DESCRIPTIONS,
    "getVenueTypeAboutContent",
    ()=>getVenueTypeAboutContent,
    "getVenueTypePlural",
    ()=>getVenueTypePlural
]);
'use client';
const VENUE_TYPE_DESCRIPTIONS = {
    "Arena": "Arenas are large-scale indoor venues designed for major concerts, sporting events, and entertainment shows. With capacities typically ranging from 5,000 to 20,000+, arenas offer professional staging, advanced acoustics, and comprehensive facilities for artists and audiences alike.",
    "Amphitheatre": "Amphitheatres are outdoor or semi-outdoor venues that combine natural settings with professional concert facilities. Their tiered seating and open-air design create unique acoustic experiences, making them popular choices for summer concerts and festivals.",
    "Bar": "Bars and pub venues offer intimate settings for live music, typically hosting acoustic acts, solo performers, and small bands. These venues provide an up-close experience where audiences can connect directly with artists in a relaxed atmosphere.",
    "Club": "Clubs are nightlife venues that host DJs, electronic music acts, and live bands. Known for their sound systems, lighting rigs, and late-night programming, clubs are essential venues for dance music, indie acts, and emerging artists.",
    "Concert Hall": "Concert halls are purpose-built venues designed for optimal acoustics and audience experience. These prestigious spaces host classical performances, orchestras, and acoustic concerts, offering superior sound quality and elegant surroundings.",
    "Convention Centre": "Convention centres are versatile multi-purpose facilities that can be configured for concerts, exhibitions, and large-scale events. Their flexible spaces accommodate varying audience sizes and production requirements.",
    "Cultural Centre": "Cultural centres are community-focused venues that host diverse programming including concerts, theatre, and arts events. These spaces often showcase local talent alongside touring artists, serving as cultural hubs for their communities.",
    "Opera House": "Opera houses are historic and architecturally significant venues that host opera, ballet, classical concerts, and theatrical productions. Known for their ornate interiors and exceptional acoustics, they represent the pinnacle of performing arts venues.",
    "Outdoor Venue": "Outdoor venues encompass parks, fields, and open-air spaces used for concerts and festivals. These locations offer flexibility for large-scale events and create memorable experiences under open skies.",
    "Performing Arts Centre": "Performing arts centres are multi-venue complexes housing theatres, concert halls, and rehearsal spaces. They support diverse programming from concerts to dance, theatre, and educational events.",
    "Stadium": "Stadiums are the largest concert venues, hosting major tours and festival events for audiences of 20,000 to 100,000+. These iconic venues create unforgettable experiences for landmark concerts and tours.",
    "Theatre": "Theatres are versatile venues hosting concerts, musicals, comedy, and dramatic performances. With fixed seating and professional staging, they offer excellent sightlines and acoustics for mid-sized audiences."
};
function getVenueTypeAboutContent(venueType, location) {
    const description = VENUE_TYPE_DESCRIPTIONS[venueType];
    if (!description) {
        return `Browse our directory of ${venueType.toLowerCase()}s in ${location} to find the perfect venue for your next event.`;
    }
    return `${description} Browse our directory of ${venueType.toLowerCase()}s in ${location} to find the perfect venue for your next event.`;
}
function getVenueTypePlural(venueType) {
    return `${venueType}s`;
}
}),
"[project]/showcase-next/src/components/ui/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const Select = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const SelectGroup = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"];
const SelectValue = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Value"];
const SelectTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    className: "h-4 w-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                    lineNumber: 27,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                lineNumber: 26,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/ui/select.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const SelectScrollUpButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/ui/select.tsx",
            lineNumber: 42,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/select.tsx",
        lineNumber: 37,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectScrollUpButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"].displayName;
const SelectScrollDownButton = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/ui/select.tsx",
            lineNumber: 56,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/select.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectScrollDownButton.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"].displayName;
const SelectContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, position = "popper", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                    lineNumber: 77,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                    lineNumber: 78,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/showcase-next/src/components/ui/select.tsx",
            lineNumber: 66,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/select.tsx",
        lineNumber: 65,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const SelectLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/select.tsx",
        lineNumber: 97,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"].displayName;
const SelectItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                    lineNumber: 114,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                lineNumber: 113,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/ui/select.tsx",
                lineNumber: 119,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/ui/select.tsx",
        lineNumber: 105,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"].displayName;
const SelectSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("-mx-1 my-1 h-px bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/select.tsx",
        lineNumber: 128,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
SelectSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"].displayName;
;
}),
"[project]/showcase-next/src/components/ui/collapsible.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Collapsible",
    ()=>Collapsible,
    "CollapsibleContent",
    ()=>CollapsibleContent,
    "CollapsibleTrigger",
    ()=>CollapsibleTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@radix-ui/react-collapsible/dist/index.mjs [app-ssr] (ecmascript)");
;
const Collapsible = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const CollapsibleTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"];
const CollapsibleContent = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$collapsible$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"];
;
}),
"[project]/showcase-next/src/components/ui/popover.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popover",
    ()=>Popover,
    "PopoverContent",
    ()=>PopoverContent,
    "PopoverTrigger",
    ()=>PopoverTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/@radix-ui/react-popover/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const Popover = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const PopoverTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const PopoverContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, align = "center", sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            align: align,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/ui/popover.tsx",
            lineNumber: 15,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ui/popover.tsx",
        lineNumber: 14,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
PopoverContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
;
}),
"[project]/showcase-next/src/components/VenueFinder.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VenueFinder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$isomorphic$2d$dompurify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/isomorphic-dompurify/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$Layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/Layout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueSearchAutocomplete$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/venues/VenueSearchAutocomplete.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueTypeFilter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/venues/VenueTypeFilter.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$CountryFilter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/venues/CountryFilter.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$CapacitySlider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/venues/CapacitySlider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$ContinentSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/venues/ContinentSelector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VirtualVenueList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/venues/VirtualVenueList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenues$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenues.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueLocationSeo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenueLocationSeo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueTypeSeo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenueTypeSeo.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useCategories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useCategories.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/continents.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/venueUrlUtils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/cityRegions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenueUrl.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/venueTypes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypeContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/venueTypeContent.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/list.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/map.js [app-ssr] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-ssr] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/collapsible.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/popover.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Lazy load the map
const VenueMap = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/showcase-next/src/components/venues/VenueMap.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.VenueMap
        })));
const MapLoadingFallback = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-full bg-card border rounded-lg",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
            lineNumber: 45,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
        lineNumber: 44,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// Pure function to parse venue URL and get display location
// This has ZERO dependencies on React state - just the pathname string
function parseVenueUrlForDisplay(pathname) {
    const segments = pathname.split("/").filter(Boolean);
    // segments[0] = "venues"
    // segments[1] = continent
    // segments[2] = country OR venueType (if no country)
    // segments[3] = region/city/venueType
    // segments[4] = city/venueType
    // segments[5] = venueType
    const continentSlug = segments[1] || null;
    const rawCountrySlug = segments[2] || null;
    const thirdSlug = segments[3] || null;
    const fourthSlug = segments[4] || null;
    const fifthSlug = segments[5] || null;
    // Check if "country" position is actually a venue type (e.g., /venues/europe/arenas)
    const countryIsVenueType = rawCountrySlug && (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVenueTypeSlug"])(rawCountrySlug);
    const countrySlug = countryIsVenueType ? null : rawCountrySlug;
    // Helper to convert slug to display name
    const toDisplayName = (slug)=>slug.split("-").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    // Find venue type slug (check country position first, then from end of remaining segments)
    let venueTypeSlug = countryIsVenueType ? rawCountrySlug : null;
    let locationSegments = [
        thirdSlug,
        fourthSlug,
        fifthSlug
    ].filter(Boolean);
    // If venue type wasn't in country position, check remaining segments from end
    if (!venueTypeSlug) {
        for(let i = locationSegments.length - 1; i >= 0; i--){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVenueTypeSlug"])(locationSegments[i])) {
                venueTypeSlug = locationSegments[i];
                locationSegments = locationSegments.slice(0, i);
                break;
            }
        }
    }
    // Build display location from remaining segments
    const countryDisplay = countrySlug ? toDisplayName(countrySlug) : null;
    const continentDisplay = continentSlug ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentFromSlug"])(continentSlug) || toDisplayName(continentSlug) : null;
    let displayLocation;
    if (locationSegments.length >= 2 && countryDisplay) {
        // Have region AND city: "City, Country"
        const cityDisplay = toDisplayName(locationSegments[1]);
        displayLocation = `${cityDisplay}, ${countryDisplay}`;
    } else if (locationSegments.length === 1 && countryDisplay) {
        // Have region OR city: "RegionOrCity, Country"
        const thirdDisplay = toDisplayName(locationSegments[0]);
        displayLocation = `${thirdDisplay}, ${countryDisplay}`;
    } else if (countryDisplay) {
        // Just country
        displayLocation = countryDisplay;
    } else if (continentDisplay) {
        // Just continent
        displayLocation = continentDisplay;
    } else {
        displayLocation = "All Venues";
    }
    return {
        continentSlug,
        countrySlug,
        thirdSlug: locationSegments[0] || null,
        fourthSlug: locationSegments[1] || null,
        fifthSlug: locationSegments[2] || null,
        displayLocation,
        venueTypeSlug
    };
}
function VenueFinder({ preSelectedVenueType = null, venueTypeSlug = null } = {}) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])(); // ← ADD THIS LINE
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    // Parse URL ONCE at the top - this is the source of truth for display
    // This is completely synchronous and has no dependencies on async state
    const urlParsed = parseVenueUrlForDisplay(pathname);
    // This is THE display location for H1/H2/About headings - stable, no flicker
    const displayLocationTitle = urlParsed.displayLocation;
    // Detect venue type from URL path (final segment)
    const detectedVenueType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const pathSegments = pathname.split("/").filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment && (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVenueTypeSlug"])(lastSegment)) {
            return {
                type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVenueTypeFromSlug"])(lastSegment),
                slug: lastSegment
            };
        }
        return null;
    }, [
        pathname
    ]);
    // Use detected value, falling back to props
    const activeVenueType = detectedVenueType?.type || preSelectedVenueType || null;
    const activeVenueTypeSlug = detectedVenueType?.slug || venueTypeSlug || null;
    // Parse URL path params for location
    // Routes may use different param names depending on the route path
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    // Normalize param names (routes may use either naming convention)
    const continentParam = params.continent || params.continentSlug;
    const countryParam = params.country || params.countrySlug;
    // thirdSegment can be region or city depending on country type
    // BUT if it matches the venueTypeSlug, it's not a geographic segment
    const rawThirdSegment = params.regionOrCity || params.param3 || params.region;
    const thirdSegment = rawThirdSegment === activeVenueTypeSlug ? null : rawThirdSegment;
    // fourthSegment is city when third is region
    // BUT if it matches the venueTypeSlug, it's not a geographic segment
    const rawFourthSegment = params.param4 || params.city;
    const fourthSegment = rawFourthSegment === activeVenueTypeSlug ? null : rawFourthSegment;
    // Resolve continent from URL
    const selectedContinent = continentParam ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentFromSlug"])(continentParam) : null;
    // Determine if we should show the finder (any path param means we're in finder mode)
    const showFinder = !!continentParam;
    // Parse non-location filter state from query params
    const initialTypes = searchParams.get("type")?.split(",").filter(Boolean) || [];
    const initialCapacityMin = parseInt(searchParams.get("capacity_min") || "0");
    const initialCapacityMax = parseInt(searchParams.get("capacity_max") || "100000");
    // Filter state (non-location filters from query params)
    const [selectedTypes, setSelectedTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(activeVenueType ? [
        activeVenueType
    ] : initialTypes);
    const [capacityMin, setCapacityMin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCapacityMin);
    const [capacityMax, setCapacityMax] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialCapacityMax);
    // Sync selectedTypes when venue type is detected from URL (handles internal navigation)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (activeVenueType) {
            setSelectedTypes([
                activeVenueType
            ]);
        }
    }, [
        activeVenueType
    ]);
    // View state
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("list");
    const [highlightedVenueId, setHighlightedVenueId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedMapVenue, setSelectedMapVenue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [locationFilterOpen, setLocationFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [regionDropdownOpen, setRegionDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cityDropdownOpen, setCityDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filtersPopoverOpen, setFiltersPopoverOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [countryFilterOpen, setCountryFilterOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [initialScrollTop, setInitialScrollTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    // Map viewport bounds for filtering list
    const [mapBounds, setMapBounds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Track current scroll position for saving
    const scrollTopRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Stored map state to restore after navigation
    const [initialMapState, setInitialMapState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Restore map state from sessionStorage on mount - only if URL matches
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!showFinder) return;
        const saved = sessionStorage.getItem("venueFinderMapState");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Only restore if the saved URL matches current URL (same filters/location)
                if (parsed.url === pathname + searchParams.toString()) {
                    setInitialMapState({
                        bounds: parsed.bounds,
                        zoom: parsed.zoom
                    });
                    // Restore viewMode if it was saved (e.g., user was on map view)
                    if (parsed.viewMode) {
                        setViewMode(parsed.viewMode);
                    }
                    // Restore scroll position if it was saved
                    if (parsed.scrollTop !== undefined) {
                        setInitialScrollTop(parsed.scrollTop);
                    }
                }
                // Always clear after checking
                sessionStorage.removeItem("venueFinderMapState");
            } catch (e) {
                sessionStorage.removeItem("venueFinderMapState");
            }
        }
    }, [
        showFinder,
        pathname,
        searchParams.toString()
    ]);
    // Save map state with URL context before navigating away
    const saveMapState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((bounds, zoom)=>{
        sessionStorage.setItem("venueFinderMapState", JSON.stringify({
            bounds,
            zoom,
            viewMode,
            scrollTop: scrollTopRef.current,
            url: pathname + searchParams.toString()
        }));
    }, [
        pathname,
        searchParams.toString(),
        viewMode
    ]);
    // Get all venue countries (filtered by continent at database level)
    const { data: allCountries, isLoading: countriesLoading, error: countriesError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenues$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenueCountries"])(selectedContinent || undefined);
    // Resolve country from URL slug (with alias support)
    const countryFromUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!countryParam || !allCountries) return null;
        const countryNames = allCountries.map((c)=>c.country);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromCountrySlug"])(countryParam, countryNames);
    }, [
        countryParam,
        allCountries
    ]);
    // Support multiple country selection via state
    const [selectedCountries, setSelectedCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Track the URL we just navigated to (to skip URL sync for that specific URL)
    const lastNavigatedUrlRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Sync selected countries from URL on mount/URL change
    // But skip if we just navigated to this exact URL ourselves
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const currentUrl = pathname + searchParams.toString();
        if (lastNavigatedUrlRef.current === currentUrl) {
            // We navigated here ourselves, skip sync
            return;
        }
        // Clear the ref since this is a different URL (user navigated, back button, etc.)
        lastNavigatedUrlRef.current = null;
        if (countryFromUrl) {
            // Single country from URL path
            setSelectedCountries([
                countryFromUrl
            ]);
        } else {
            // Check for multi-country in query params
            const countriesParam = searchParams.get("countries");
            if (countriesParam) {
                const countryList = countriesParam.split(",").map((c)=>decodeURIComponent(c.trim()));
                setSelectedCountries(countryList);
            } else {
                setSelectedCountries([]);
            }
        }
    }, [
        countryFromUrl,
        searchParams,
        pathname,
        searchParams.toString()
    ]);
    // For backwards compatibility - single country for region/city logic
    const selectedCountry = selectedCountries.length === 1 ? selectedCountries[0] : null;
    // Countries are already filtered by continent at database level
    const countries = allCountries || [];
    // Get regions for selected country (only regions that have venues)
    const { data: regions } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenues$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenueRegionsByCountry"])(selectedCountry || undefined);
    // Resolve region from URL
    const { selectedRegionId, selectedRegionSlug } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!thirdSegment && !params.region) {
            return {
                selectedRegionId: null,
                selectedRegionSlug: null
            };
        }
        const regionSlugToCheck = params.region || thirdSegment;
        if (regionSlugToCheck && regions && selectedCountry && (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["countryHasRegions"])(selectedCountry)) {
            const region = regions.find((r)=>r.region_slug === regionSlugToCheck);
            if (region) {
                return {
                    selectedRegionId: region.id,
                    selectedRegionSlug: regionSlugToCheck
                };
            }
        }
        return {
            selectedRegionId: null,
            selectedRegionSlug: null
        };
    }, [
        thirdSegment,
        params.region,
        regions,
        selectedCountry
    ]);
    // Get cities based on region or country (only cities that have venues)
    const { data: citiesByRegion } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenues$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenueCitiesByRegion"])(selectedRegionId || undefined);
    const { data: citiesByCountry } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenues$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenueCitiesByCountry"])(selectedCountry || undefined);
    const cities = selectedRegionId ? citiesByRegion : citiesByCountry;
    // Resolve city from URL (async - requires cities to load)
    const selectedCity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // 4-segment URL: /venues/continent/country/region/city (fourthSegment has the city)
        if (fourthSegment && cities) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromSlug"])(fourthSegment, cities);
        }
        // 3-segment URL: /venues/continent/country/cityOrRegion
        // Only treat as city if no region was found (i.e., not a country with regions)
        if (thirdSegment && !selectedRegionId && cities) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["fromSlug"])(thirdSegment, cities);
        }
        return null;
    }, [
        fourthSegment,
        thirdSegment,
        selectedRegionId,
        cities
    ]);
    // Derive city directly from URL for non-regional countries (synchronous, no async dependency)
    // This is used for display/SEO purposes and doesn't require database validation
    const urlDerivedCity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // Only for countries without regions where thirdSegment is the city
        if (!selectedCountry || (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["countryHasRegions"])(selectedCountry)) return null;
        // thirdSegment should be the city slug for non-regional countries
        // BUT only if it's not the venue type slug
        const citySlug = thirdSegment;
        if (!citySlug || citySlug === activeVenueTypeSlug) return null;
        // Convert slug to display name: "new-york" → "New York", "munich" → "Munich"
        return citySlug.split("-").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }, [
        selectedCountry,
        thirdSegment,
        activeVenueTypeSlug
    ]);
    // For display/SEO: use URL-derived city immediately, or validated city once loaded
    // This prevents flash of incorrect content during async loading
    const displayCity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // For non-regional countries, prefer URL-derived value (instant, no loading state)
        if (urlDerivedCity) return urlDerivedCity;
        // For regional countries or when we have validated data, use selectedCity
        return selectedCity;
    }, [
        urlDerivedCity,
        selectedCity
    ]);
    // Fetch "Venues" category for default templates
    const { data: venuesCategory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useCategories$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCategoryBySlug"])("venues");
    // Helper to inject location into template strings (like CategoryPage)
    const injectLocation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text)=>{
        if (!text) return null;
        let result = text;
        let locationString = displayLocationTitle;
        if (locationString && locationString !== "All Venues") {
            result = result.replace(/\{in_location\}/gi, `in ${locationString}`);
            result = result.replace(/\{location\}/gi, locationString);
        } else {
            result = result.replace(/\{in_location\}/gi, "");
            result = result.replace(/\{location\}/gi, "");
        }
        return result.replace(/\s{2,}/g, " ").replace(/\s+\./g, ".").replace(/\s+,/g, ",").trim();
    }, [
        displayLocationTitle
    ]);
    // Display location for title - ALWAYS use URL-derived for consistency
    // Fetch location-specific SEO content (use displayCity for stable SEO)
    const { data: locationSeo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueLocationSeo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenueLocationSeo"])(selectedContinent, selectedCountry, selectedRegionSlug, displayCity);
    // Fetch venue type-specific SEO content (use displayCity for stable SEO)
    const { data: venueTypeSeo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueTypeSeo$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenueTypeSeo"])(activeVenueType, selectedContinent, selectedCountry, selectedRegionSlug, displayCity);
    // Fetch venues with filters - pass continent for server-side filtering when no country selected
    const { data: allVenues = [], isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenues$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVenues"])({
        venueTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
        capacityMin: capacityMin > 0 ? capacityMin : undefined,
        capacityMax: capacityMax < 100000 ? capacityMax : undefined,
        country: selectedCountry || undefined,
        regionId: selectedRegionId || undefined,
        city: selectedCity || undefined,
        continent: !selectedCountry ? selectedContinent || undefined : undefined
    });
    // Filter venues for multiple country selection (rare case)
    const venues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!showFinder) return [];
        // If multiple countries selected, filter client-side (rare use case)
        if (selectedCountries.length > 1) {
            return allVenues.filter((v)=>v.country && selectedCountries.includes(v.country));
        }
        // Otherwise, server already filtered by continent or country
        return allVenues;
    }, [
        allVenues,
        showFinder,
        selectedCountries
    ]);
    // Filter venues by map viewport bounds (for list display)
    const visibleVenues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!mapBounds) return venues;
        return venues.filter((v)=>{
            if (!v.latitude || !v.longitude) return false;
            return v.latitude >= mapBounds.south && v.latitude <= mapBounds.north && v.longitude >= mapBounds.west && v.longitude <= mapBounds.east;
        });
    }, [
        venues,
        mapBounds
    ]);
    // Handle map bounds change - track for list filtering
    const handleBoundsChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((bounds, zoom)=>{
        setMapBounds(bounds);
        // Save state for restoration after navigation
        if (zoom !== undefined) {
            saveMapState(bounds, zoom);
        }
    }, [
        saveMapState
    ]);
    // Save selected countries to sessionStorage when they change (for multi-select)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedCountries.length > 1) {
            sessionStorage.setItem("venueFinderSelectedCountries", JSON.stringify(selectedCountries));
        } else {
            sessionStorage.removeItem("venueFinderSelectedCountries");
        }
    }, [
        selectedCountries
    ]);
    // Save viewMode to sessionStorage whenever it changes (for restoration after navigation)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const saved = sessionStorage.getItem("venueFinderMapState");
            if (saved) {
                const parsed = JSON.parse(saved);
                parsed.viewMode = viewMode;
                sessionStorage.setItem("venueFinderMapState", JSON.stringify(parsed));
            } else if (mapBounds) {
                // If no saved state but we have bounds, create initial state
                sessionStorage.setItem("venueFinderMapState", JSON.stringify({
                    bounds: mapBounds,
                    zoom: 3,
                    viewMode,
                    url: pathname + searchParams.toString()
                }));
            }
        } catch  {}
    }, [
        viewMode,
        mapBounds,
        pathname,
        searchParams.toString()
    ]);
    // Handle scroll position changes - save to ref and sessionStorage
    const handleScrollPositionChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((scrollTop)=>{
        scrollTopRef.current = scrollTop;
        try {
            const saved = sessionStorage.getItem("venueFinderMapState");
            if (saved) {
                const parsed = JSON.parse(saved);
                parsed.scrollTop = scrollTop;
                sessionStorage.setItem("venueFinderMapState", JSON.stringify(parsed));
            } else {
                // Create state if it doesn't exist
                sessionStorage.setItem("venueFinderMapState", JSON.stringify({
                    bounds: mapBounds,
                    zoom: 3,
                    viewMode,
                    scrollTop,
                    url: pathname + searchParams.toString()
                }));
            }
        } catch  {}
    }, [
        mapBounds,
        viewMode,
        pathname,
        searchParams.toString()
    ]);
    // Ref to track initial mount for venue type URL handling
    const isInitialMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Helper to get filter query params (capacity + multi-country)
    const getFilterParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const params = new URLSearchParams();
        if (capacityMin > 0) {
            params.set("capacity_min", capacityMin.toString());
        }
        if (capacityMax < 100000) {
            params.set("capacity_max", capacityMax.toString());
        }
        // Preserve multi-country selection
        if (selectedCountries.length > 1) {
            params.set("countries", selectedCountries.join(","));
        }
        return params;
    }, [
        capacityMin,
        capacityMax,
        selectedCountries
    ]);
    // Handle URL updates when selectedTypes changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (!showFinder) return;
        // Don't update URL until geographic context is fully resolved
        // If we have a countryParam in the URL but selectedCountry isn't resolved yet, wait
        // BUT skip this check if countryParam is actually a venue type slug (e.g., /venues/europe/arenas)
        const countryParamIsVenueType = countryParam && (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVenueTypeSlug"])(countryParam);
        if (countryParam && !selectedCountry && !countryParamIsVenueType) {
            return;
        }
        // If we have a thirdSegment that isn't the venue type, it's a region or city
        // Wait for that to resolve before updating URL
        const thirdIsVenueType = rawThirdSegment === activeVenueTypeSlug;
        const fourthIsVenueType = rawFourthSegment === activeVenueTypeSlug;
        const fifthIsVenueType = activeVenueTypeSlug && !thirdIsVenueType && !fourthIsVenueType;
        // If third segment exists and isn't the venue type, it should resolve to region or city
        if (rawThirdSegment && !thirdIsVenueType) {
            // 4-segment URL with venue type in 4th position
            // For countries WITH regions (UK/USA): wait for region to resolve
            if (fourthIsVenueType && !selectedRegionSlug && selectedCountry && (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["countryHasRegions"])(selectedCountry)) {
                return;
            }
            // For countries WITHOUT regions (Germany, France, etc.): wait for city to resolve
            if (fourthIsVenueType && !selectedCity && selectedCountry && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["countryHasRegions"])(selectedCountry)) {
                return;
            }
            // 5-segment URL with venue type in 5th position (e.g., /uk/north-west/manchester/arenas)
            // Wait for both region AND city to resolve
            if (fifthIsVenueType && rawFourthSegment && (!selectedRegionSlug || !selectedCity)) {
                return;
            }
        }
        // Build base geographic URL
        const baseUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
            continent: selectedContinent,
            country: selectedCountry,
            regionSlug: selectedRegionSlug,
            city: selectedCity
        });
        // Determine current URL state
        const currentPath = pathname;
        const currentlyOnVenueTypePage = activeVenueTypeSlug !== null;
        // Get filter params to preserve (capacity + multi-country)
        const filterParams = getFilterParams();
        const filterQueryString = filterParams.toString();
        if (selectedTypes.length === 0) {
            if (currentlyOnVenueTypePage) {
                const targetUrl = filterQueryString ? `${baseUrl}?${filterQueryString}` : baseUrl;
                router.replace(targetUrl);
            } else {
                const params = new URLSearchParams(searchParams);
                params.delete("type");
                router.replace(`?${params.toString()}`);
            }
        } else if (selectedTypes.length === 1) {
            const typeSlug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVenueTypeSlug"])(selectedTypes[0]);
            const targetUrl = `${baseUrl}/${typeSlug}`;
            const fullUrl = filterQueryString ? `${targetUrl}?${filterQueryString}` : targetUrl;
            if (pathname + searchParams.toString() !== fullUrl) {
                router.replace(fullUrl);
            }
        } else {
            // Multiple types - use query param, preserve filters
            const params = getFilterParams();
            params.set("type", selectedTypes.join(","));
            if (currentlyOnVenueTypePage) {
                router.replace(`${baseUrl}?${params.toString()}`);
            } else {
                router.replace(`?${params.toString()}`);
            }
        }
    }, [
        selectedTypes,
        showFinder,
        selectedContinent,
        selectedCountry,
        selectedCountries,
        selectedRegionSlug,
        selectedCity,
        activeVenueTypeSlug,
        activeVenueType,
        pathname,
        searchParams.toString(),
        router,
        searchParams,
        countryParam,
        rawThirdSegment,
        rawFourthSegment,
        getFilterParams
    ]);
    // Update query params for capacity filters only (separate from venue type handling)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!showFinder) return;
        const params = new URLSearchParams(searchParams);
        // Only handle capacity params here - venue type is handled by the effect above
        if (capacityMin > 0) {
            params.set("capacity_min", capacityMin.toString());
        } else {
            params.delete("capacity_min");
        }
        if (capacityMax < 100000) {
            params.set("capacity_max", capacityMax.toString());
        } else {
            params.delete("capacity_max");
        }
        router.replace(`?${params.toString()}`);
    }, [
        showFinder,
        capacityMin,
        capacityMax,
        searchParams
    ]);
    // Handle continent selection
    const handleSelectContinent = (continent)=>{
        router.push(`/venues/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentSlug"])(continent)}`);
        window.scrollTo(0, 0);
    };
    // Handle browse all (navigate to a default continent or show all)
    const handleBrowseAll = ()=>{
        // Navigate to Europe as default "browse all" starting point
        router.push("/venues/europe");
        window.scrollTo(0, 0);
    };
    // Handle back to continent selection
    const handleBackToSelection = ()=>{
        router.push("/venues");
        clearNonLocationFilters();
        // Clear saved map state
        sessionStorage.removeItem("venueFinderMapState");
        sessionStorage.removeItem("venueFinderSelectedCountries");
        setInitialMapState(null);
    };
    // Clear non-location filters
    const clearNonLocationFilters = ()=>{
        setSelectedTypes([]);
        setCapacityMin(0);
        setCapacityMax(100000);
        setSelectedCountries([]);
    };
    // Clear all filters and go back to continent level
    const clearFilters = ()=>{
        setSelectedTypes([]);
        setCapacityMin(0);
        setCapacityMax(100000);
        setSelectedCountries([]);
        // Clear saved map state so it resets to default view
        sessionStorage.removeItem("venueFinderMapState");
        setInitialMapState(null);
        if (selectedContinent) {
            router.push(`/venues/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentSlug"])(selectedContinent)}`);
        }
    };
    // Reset everything and go back to continent view (when clicking continent badge)
    const resetToContinent = ()=>{
        setSelectedTypes([]);
        setCapacityMin(0);
        setCapacityMax(100000);
        setSelectedCountries([]);
        sessionStorage.removeItem("venueFinderMapState");
        sessionStorage.removeItem("venueFinderSelectedCountries");
        setInitialMapState(null);
        if (selectedContinent) {
            router.push(`/venues/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentSlug"])(selectedContinent)}`);
        }
    };
    // Helper to build URL with preserved non-location filter params
    const buildUrlWithFilters = (basePath, extraParams)=>{
        const params = new URLSearchParams();
        // Preserve capacity filters
        if (capacityMin > 0) {
            params.set("capacity_min", capacityMin.toString());
        }
        if (capacityMax < 100000) {
            params.set("capacity_max", capacityMax.toString());
        }
        // Preserve venue type if multiple selected (single type goes in URL path)
        if (selectedTypes.length > 1) {
            params.set("type", selectedTypes.join(","));
        }
        // Add any extra params
        if (extraParams) {
            Object.entries(extraParams).forEach(([key, value])=>{
                params.set(key, value);
            });
        }
        // For single venue type, append to path
        let finalPath = basePath;
        if (selectedTypes.length === 1) {
            finalPath = `${basePath}/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVenueTypeSlug"])(selectedTypes[0])}`;
        }
        const queryString = params.toString();
        return queryString ? `${finalPath}?${queryString}` : finalPath;
    };
    // Handle country change - update state and URL
    // Update state and navigate
    const handleCountryChange = (newCountries)=>{
        console.log('🟢 VenueFinder handleCountryChange called with:', newCountries);
        console.log('🟢 Current selectedContries state:', selectedCountries);
        console.log('🟢 selectedContinent:', selectedContinent);
        setSelectedCountries(newCountries);
        console.log('🟢 setSelectedCountries called');
        // Clear saved map state when changing geographic scope
        sessionStorage.removeItem("venueFinderMapState");
        setInitialMapState(null);
        let targetUrl;
        if (newCountries.length === 1) {
            // Single country - use SEO URL path, preserve filters
            const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                continent: selectedContinent,
                country: newCountries[0]
            });
            targetUrl = buildUrlWithFilters(basePath);
        } else if (newCountries.length === 0) {
            // Clear country - go back to continent level, preserve filters
            const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                continent: selectedContinent
            });
            targetUrl = buildUrlWithFilters(basePath);
        } else {
            // Multiple countries - use query param, preserve filters
            const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                continent: selectedContinent
            });
            targetUrl = buildUrlWithFilters(basePath, {
                countries: newCountries.join(",")
            });
        }
        console.log('🟢 About to navigate to:', targetUrl);
        // Store the URL we're navigating to so the sync effect skips it
        lastNavigatedUrlRef.current = targetUrl;
        router.push(targetUrl);
        console.log('🟢 router.push called');
    };
    // Handle region change - navigate to new URL
    const handleRegionChange = (value)=>{
        // Clear saved map state when changing geographic scope
        sessionStorage.removeItem("venueFinderMapState");
        setInitialMapState(null);
        if (value === "all") {
            const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                continent: selectedContinent,
                country: selectedCountry
            });
            router.push(buildUrlWithFilters(basePath));
        } else {
            const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                continent: selectedContinent,
                country: selectedCountry,
                regionSlug: value
            });
            router.push(buildUrlWithFilters(basePath));
        }
    };
    // Handle city change - navigate to new URL
    const handleCityChange = (value)=>{
        // Clear saved map state when changing geographic scope
        sessionStorage.removeItem("venueFinderMapState");
        setInitialMapState(null);
        if (value === "all") {
            const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                continent: selectedContinent,
                country: selectedCountry,
                regionSlug: selectedRegionSlug
            });
            router.push(buildUrlWithFilters(basePath));
        } else {
            const basePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                continent: selectedContinent,
                country: selectedCountry,
                regionSlug: selectedRegionSlug,
                city: value
            });
            router.push(buildUrlWithFilters(basePath));
        }
    };
    // Check if any filters are active
    const hasActiveFilters = selectedTypes.length > 0 || capacityMin > 0 || capacityMax < 100000 || selectedCountries.length > 0 || selectedCity;
    // Count active location filters (for badge on filter trigger)
    const activeLocationFilterCount = selectedCountries.length + (selectedRegionId ? 1 : 0) + (selectedCity ? 1 : 0);
    // Count active secondary filters (venue type + capacity) for collapsed Filters button
    const hasSecondaryFilters = selectedTypes.length > 0 || capacityMin > 0 || capacityMax < 100000;
    const secondaryFilterCount = (selectedTypes.length > 0 ? 1 : 0) + (capacityMin > 0 || capacityMax < 100000 ? 1 : 0);
    // Get selected region data
    const selectedRegionData = selectedRegionId ? regions?.find((r)=>r.id === selectedRegionId) : null;
    // Close filter panel and dropdowns on scroll
    const handleContentScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        setLocationFilterOpen(false);
        setRegionDropdownOpen(false);
        setCityDropdownOpen(false);
    }, []);
    // Close dropdowns on click outside, scroll, or wheel anywhere
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!regionDropdownOpen && !cityDropdownOpen) return;
        const handleClickOutside = (event)=>{
            const target = event.target;
            const isInsideDropdown = target.closest("[data-radix-popper-content-wrapper]") || target.closest('[role="listbox"]');
            if (isInsideDropdown) return;
            const filterContent = document.querySelector("[data-filter-content]");
            if (filterContent?.contains(target)) return;
            setRegionDropdownOpen(false);
            setCityDropdownOpen(false);
        };
        const handleScrollOrWheel = (event)=>{
            const target = event.target;
            if (!target.closest) return;
            const isInsideDropdown = target.closest("[data-radix-popper-content-wrapper]") || target.closest('[role="listbox"]') || target.closest("[data-radix-select-viewport]");
            if (isInsideDropdown) return;
            setRegionDropdownOpen(false);
            setCityDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleScrollOrWheel, true);
        document.addEventListener("wheel", handleScrollOrWheel, {
            passive: true,
            capture: true
        });
        window.addEventListener("scroll", handleScrollOrWheel, true);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleScrollOrWheel, true);
            document.removeEventListener("wheel", handleScrollOrWheel);
            window.removeEventListener("scroll", handleScrollOrWheel, true);
        };
    }, [
        regionDropdownOpen,
        cityDropdownOpen
    ]);
    // Scroll to venue card when map pin clicked
    const scrollToVenue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((venueId)=>{
        const element = document.querySelector(`[data-venue-id="${venueId}"]`);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            setHighlightedVenueId(venueId);
            setTimeout(()=>setHighlightedVenueId(null), 2000);
        }
    }, []);
    // Handle map venue selection
    const handleMapVenueSelect = (venue)=>{
        setSelectedMapVenue(venue);
        if (venue) {
            scrollToVenue(venue.id);
        }
    };
    // Debounced hover handler for better performance
    const handleHoverVenue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((venueId)=>{
        setHighlightedVenueId(venueId);
    }, []);
    // Helper to get location string for SEO content (uses displayCity for stability)
    const getLocationString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (displayCity) return displayCity;
        if (selectedRegionData) return selectedRegionData.region_name;
        if (selectedCountry) return selectedCountry;
        if (selectedContinent) return selectedContinent;
        return null;
    }, [
        displayCity,
        selectedRegionData,
        selectedCountry,
        selectedContinent
    ]);
    // SEO meta content
    // Venue type SEO takes priority over location SEO when on a venue type page
    const pageTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // Venue type SEO override takes priority when on venue type page
        if (activeVenueType && venueTypeSeo?.seo_title) return venueTypeSeo.seo_title;
        // Location SEO override (only when not on venue type page)
        if (!activeVenueType && locationSeo?.seo_title) return locationSeo.seo_title;
        // Use category template if available
        if (!activeVenueType && venuesCategory?.seo_title) {
            const injected = injectLocation(venuesCategory.seo_title);
            if (injected) return injected;
        }
        const location = getLocationString();
        // Venue type specific titles: "{VenueType}s in {Location} | Showcase Music"
        if (activeVenueType && location) {
            return `${activeVenueType}s in ${location} | Showcase Music`;
        }
        // Template fallbacks for non-venue-type pages
        if (displayCity) return `Venues in ${displayCity}, ${selectedCountry} | Showcase Music`;
        if (selectedRegionData) return `Venues in ${selectedRegionData.region_name}, ${selectedCountry} | Showcase Music`;
        if (selectedCountry) return `Venues in ${selectedCountry} | Showcase Music`;
        if (selectedContinent) return `Venues in ${selectedContinent} | Showcase Music`;
        return "Venue Finder | Showcase Music";
    }, [
        displayCity,
        selectedCountry,
        selectedRegionData,
        selectedContinent,
        locationSeo,
        activeVenueType,
        venueTypeSeo,
        getLocationString,
        venuesCategory,
        injectLocation
    ]);
    const pageDescription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // Venue type SEO override takes priority when on venue type page
        if (activeVenueType && venueTypeSeo?.meta_description) return venueTypeSeo.meta_description;
        // Location SEO override (only when not on venue type page)
        if (!activeVenueType && locationSeo?.meta_description) return locationSeo.meta_description;
        // Use category template if available
        if (!activeVenueType && venuesCategory?.seo_meta_description) {
            const injected = injectLocation(venuesCategory.seo_meta_description);
            if (injected) return injected;
        }
        const location = getLocationString();
        // Venue type specific descriptions with venue count
        if (activeVenueType && location) {
            const typeLower = activeVenueType.toLowerCase();
            return `Discover ${typeLower}s in ${location}. Browse ${venues.length} ${typeLower}${venues.length !== 1 ? "s" : ""} with capacity, contact details, and booking information for your next event.`;
        }
        // Existing geographic fallbacks
        if (displayCity) return `Find concert venues in ${displayCity}, ${selectedCountry}. Browse arenas, theatres, clubs and stadiums.`;
        if (selectedRegionData) return `Find concert venues in ${selectedRegionData.region_name}, ${selectedCountry}. Browse arenas, theatres, clubs and stadiums.`;
        if (selectedCountry) return `Find concert venues in ${selectedCountry}. Browse arenas, theatres, clubs and stadiums across all regions.`;
        if (selectedContinent) return `Find concert venues in ${selectedContinent}. Browse arenas, theatres, clubs and stadiums.`;
        return "Find concert venues worldwide. Browse arenas, theatres, clubs and stadiums across Europe, North America, Asia and more.";
    }, [
        displayCity,
        selectedCountry,
        selectedRegionData,
        selectedContinent,
        locationSeo,
        activeVenueType,
        venueTypeSeo,
        getLocationString,
        venues.length,
        venuesCategory,
        injectLocation
    ]);
    const pageKeywords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // Venue type SEO override takes priority when on venue type page
        if (activeVenueType && venueTypeSeo?.meta_keywords) return venueTypeSeo.meta_keywords;
        // Location SEO override
        if (locationSeo?.meta_keywords) return locationSeo.meta_keywords;
        const keywords = [
            "concert venues",
            "music venues",
            "live music"
        ];
        if (activeVenueType) {
            keywords.push(activeVenueType.toLowerCase(), `${activeVenueType.toLowerCase()}s`);
        }
        if (displayCity) {
            keywords.push(`venues in ${displayCity}`, `${displayCity} concert halls`, `${displayCity} live music`);
        }
        if (selectedRegionData) {
            keywords.push(`${selectedRegionData.region_name} venues`, `${selectedRegionData.region_name} concerts`);
        }
        if (selectedCountry) {
            keywords.push(`${selectedCountry} venues`, `${selectedCountry} arenas`, `${selectedCountry} theatres`);
        }
        if (selectedContinent) {
            keywords.push(`${selectedContinent} venues`);
        }
        keywords.push("arenas", "theatres", "clubs", "stadiums");
        return keywords.join(", ");
    }, [
        displayCity,
        selectedRegionData,
        selectedCountry,
        selectedContinent,
        locationSeo,
        activeVenueType,
        venueTypeSeo
    ]);
    const canonicalUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
            continent: selectedContinent,
            country: selectedCountry,
            regionSlug: selectedRegionSlug,
            city: selectedCity
        });
        // Add venue type slug for venue type pages (single type only)
        if (activeVenueTypeSlug && selectedTypes.length === 1) {
            path = `${path}/${activeVenueTypeSlug}`;
        }
        return `https://www.showcase-music.com${path}`;
    }, [
        selectedContinent,
        selectedCountry,
        selectedRegionSlug,
        selectedCity,
        activeVenueTypeSlug,
        selectedTypes
    ]);
    // Determine if page should be noindexed (has query filters)
    const shouldNoIndex = searchParams.toString().length > 0;
    // Check if current region is a city-region (London, New York)
    const isCurrentCityRegion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$cityRegions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCityRegion"])(selectedCountry, selectedRegionSlug);
    }, [
        selectedCountry,
        selectedRegionSlug
    ]);
    const breadcrumbSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const SITE_URL = "https://www.showcase-music.com";
        const items = [
            {
                name: "Home",
                item: SITE_URL
            },
            {
                name: "Venues",
                item: `${SITE_URL}/venues`
            }
        ];
        if (selectedContinent) {
            items.push({
                name: selectedContinent,
                item: `${SITE_URL}/venues/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentSlug"])(selectedContinent)}`
            });
        }
        if (selectedCountry && countryParam) {
            items.push({
                name: selectedCountry,
                item: `${SITE_URL}/venues/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentSlug"])(selectedContinent)}/${countryParam}`
            });
        }
        // For city-regions (London, New York), show region name as the final city-level crumb
        // Don't add a separate region + city crumb
        if (selectedRegionData && selectedRegionSlug) {
            if (isCurrentCityRegion) {
                // City-region: region IS the city, this is the final breadcrumb
                items.push({
                    name: selectedRegionData.region_name
                });
            } else {
                // Normal region: add region as a link
                items.push({
                    name: selectedRegionData.region_name,
                    item: `${SITE_URL}/venues/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContinentSlug"])(selectedContinent)}/${countryParam}/${selectedRegionSlug}`
                });
                // Add city if present (use displayCity for stable SEO)
                if (displayCity) {
                    items.push({
                        name: displayCity
                    });
                }
            }
        } else if (displayCity) {
            // No region, just city
            items.push({
                name: displayCity
            });
        }
        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((crumb, index)=>({
                    "@type": "ListItem",
                    position: index + 1,
                    name: crumb.name,
                    ...crumb.item && {
                        item: crumb.item
                    }
                }))
        };
    }, [
        selectedContinent,
        selectedCountry,
        countryParam,
        selectedRegionData,
        selectedRegionSlug,
        displayCity,
        isCurrentCityRegion
    ]);
    const itemListSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!showFinder || !venues || venues.length === 0) return null;
        const SITE_URL = "https://www.showcase-music.com";
        return {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: pageTitle,
            description: pageDescription,
            url: canonicalUrl,
            numberOfItems: venues.length,
            itemListElement: venues.slice(0, 10).map((venue, index)=>({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                        "@type": "EventVenue",
                        name: venue.name,
                        url: `${SITE_URL}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueUrl$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVenueUrl"])({
                            slug: venue.slug,
                            country: venue.country,
                            region_slug: venue.region_slug,
                            town_city: venue.town_city
                        })}`,
                        ...venue.venue_type && {
                            additionalType: venue.venue_type
                        },
                        ...venue.venue_capacity && {
                            maximumAttendeeCapacity: venue.venue_capacity
                        },
                        ...(venue.town_city || venue.country) && {
                            address: {
                                "@type": "PostalAddress",
                                ...venue.town_city && {
                                    addressLocality: venue.town_city
                                },
                                ...venue.country && {
                                    addressCountry: venue.country
                                }
                            }
                        }
                    }
                }))
        };
    }, [
        showFinder,
        venues,
        pageTitle,
        pageDescription,
        canonicalUrl,
        selectedContinent
    ]);
    // Compute the H1 title for the venue finder
    const venueH1Title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!showFinder) return "VENUE FINDER";
        // Use URL segments to check SEO match (not async state)
        const urlHasThirdSegment = !!urlParsed.thirdSlug;
        const urlHasFourthSegment = !!urlParsed.fourthSlug;
        const urlHasCountry = !!urlParsed.countrySlug;
        // Venue type page
        if (activeVenueType) {
            // Check if venueTypeSeo matches URL specificity exactly
            if (venueTypeSeo?.h1_override) {
                const seoHasCity = !!venueTypeSeo.city;
                const seoHasRegion = !!venueTypeSeo.region_slug;
                const seoHasCountry = !!venueTypeSeo.country;
                // URL has city (4th segment): SEO must have city
                if (urlHasFourthSegment && seoHasCity) return venueTypeSeo.h1_override;
                // URL has region/city (3rd only): SEO must match
                if (urlHasThirdSegment && !urlHasFourthSegment) {
                    if (seoHasCity && !seoHasRegion) return venueTypeSeo.h1_override; // city for non-regional
                    if (seoHasRegion && !seoHasCity) return venueTypeSeo.h1_override; // region only
                }
                // URL has country only: SEO must be country-level
                if (urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity) {
                    return venueTypeSeo.h1_override;
                }
                // URL is continent only: SEO must be continent-level
                if (!urlHasCountry && !seoHasCountry) return venueTypeSeo.h1_override;
            }
            return `${activeVenueType}s in ${displayLocationTitle}`;
        }
        // Location page (no venue type)
        if (locationSeo?.h1_override) {
            const seoHasCity = !!locationSeo.city;
            const seoHasRegion = !!locationSeo.region_slug;
            const seoHasCountry = !!locationSeo.country;
            // URL has city (4th segment): SEO must have city
            if (urlHasFourthSegment && seoHasCity) return locationSeo.h1_override;
            // URL has region/city (3rd only): SEO must match
            if (urlHasThirdSegment && !urlHasFourthSegment) {
                if (seoHasCity && !seoHasRegion) return locationSeo.h1_override; // city for non-regional
                if (seoHasRegion && !seoHasCity) return locationSeo.h1_override; // region only
            }
            // URL has country only: SEO must be country-level
            if (urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity) {
                return locationSeo.h1_override;
            }
            // URL is continent only: SEO must be continent-level
            if (!urlHasCountry && !seoHasCountry) return locationSeo.h1_override;
        }
        // Use category name as template (e.g., "Venues in {location}")
        const categoryName = venuesCategory?.name || "Venues";
        return `${categoryName} in ${displayLocationTitle}`;
    }, [
        showFinder,
        urlParsed,
        activeVenueType,
        venueTypeSeo,
        locationSeo,
        venuesCategory,
        displayLocationTitle
    ]);
    // Build the custom nav content for venue pages
    const venueNavContent = showFinder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "text-muted-foreground hover:text-primary transition-colors whitespace-nowrap font-medium",
                children: "Home"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                lineNumber: 1295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                className: "h-4 w-4 text-muted-foreground shrink-0"
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                lineNumber: 1298,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "!text-xs lg:!text-sm !font-medium !tracking-normal !normal-case text-muted-foreground whitespace-nowrap truncate",
                style: {
                    fontFamily: "inherit"
                },
                children: venueH1Title
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                lineNumber: 1299,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true) : null;
    // Breadcrumbs for continent selector page
    const venueBreadcrumbs = !showFinder ? [
        {
            label: "Home",
            to: "/"
        },
        {
            label: "Venues"
        }
    ] : undefined;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$Layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Layout"], {
        hideFooter: !!showFinder,
        breadcrumbs: venueBreadcrumbs,
        customNavContent: venueNavContent,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(breadcrumbSchema)
                }
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                lineNumber: 1314,
                columnNumber: 7
            }, this),
            itemListSchema && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(itemListSchema)
                }
            }, void 0, false, {
                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                lineNumber: 1319,
                columnNumber: 9
            }, this),
            !showFinder ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container py-3 sm:py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl sm:text-3xl font-bold",
                                        children: "VENUE FINDER"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 1331,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground text-sm mt-1",
                                        children: "Find the perfect venue for your tour"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 1332,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                lineNumber: 1330,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden sm:block w-64",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueSearchAutocomplete$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VenueSearchAutocomplete"], {}, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                    lineNumber: 1336,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                lineNumber: 1335,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                        lineNumber: 1329,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:hidden mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueSearchAutocomplete$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VenueSearchAutocomplete"], {}, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                            lineNumber: 1342,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                        lineNumber: 1341,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$ContinentSelector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ContinentSelector"], {
                        onSelectContinent: handleSelectContinent,
                        onBrowseAll: handleBrowseAll
                    }, void 0, false, {
                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                        lineNumber: 1345,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                lineNumber: 1327,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-h-0 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container flex-shrink-0 py-2 border-b border-border bg-background",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:hidden mb-2 [&_input]:h-9 [&_input]:text-sm [&_input]:py-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueSearchAutocomplete$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VenueSearchAutocomplete"], {
                                    placeholder: "Search venues..."
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                    lineNumber: 1354,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                lineNumber: 1353,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center gap-1.5 lg:gap-3 flex-nowrap",
                                children: [
                                    selectedContinent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleBackToSelection,
                                        className: "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors hover:opacity-80",
                                        style: {
                                            backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTINENT_COLORS"][selectedContinent]}20`,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTINENT_COLORS"][selectedContinent],
                                            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$continents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTINENT_COLORS"][selectedContinent]}40`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1370,
                                                columnNumber: 19
                                            }, this),
                                            selectedContinent,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1372,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 1361,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-4 w-px bg-border"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 1376,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$CountryFilter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CountryFilter"], {
                                        countries: countries || [],
                                        selectedCountries: selectedCountries,
                                        onChange: handleCountryChange
                                    }, "country-filter-stable", false, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 1379,
                                        columnNumber: 15
                                    }, this),
                                    selectedCountry && regions && regions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: selectedRegionId && selectedRegionData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 h-8 lg:h-9 text-xs lg:text-sm",
                                            children: [
                                                selectedRegionData.region_name,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleRegionChange("all"),
                                                    className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                    "aria-label": `Remove ${selectedRegionData.region_name} filter`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "h-3 w-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1400,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1395,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1390,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                            value: "all",
                                            onValueChange: handleRegionChange,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "w-[100px] lg:w-[150px] h-8 lg:h-9 text-xs lg:text-sm px-2 lg:px-3 hover:bg-muted",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Select Region"
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1406,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1405,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "all",
                                                            children: "Select Region"
                                                        }, void 0, false, {
                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                            lineNumber: 1409,
                                                            columnNumber: 25
                                                        }, this),
                                                        regions.map((region)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: region.region_slug,
                                                                children: region.region_name
                                                            }, region.id, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1411,
                                                                columnNumber: 27
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1408,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1404,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false),
                                    (()=>{
                                        // Don't show city dropdown for city-regions
                                        if (isCurrentCityRegion) return null;
                                        const selectedRegionName = selectedRegionId ? regions?.find((r)=>r.id === selectedRegionId)?.region_name : null;
                                        const shouldShowCityDropdown = selectedCountry && cities && cities.length > 0 && !(cities.length === 1 && selectedRegionName && cities[0] === selectedRegionName);
                                        if (!shouldShowCityDropdown) return null;
                                        return selectedCity ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 h-8 lg:h-9 text-xs lg:text-sm",
                                            children: [
                                                selectedCity,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleCityChange("all"),
                                                    className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                    "aria-label": `Remove ${selectedCity} filter`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "h-3 w-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1449,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1444,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1439,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                            value: "all",
                                            onValueChange: handleCityChange,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "w-[100px] lg:w-[150px] h-8 lg:h-9 text-xs lg:text-sm px-2 lg:px-3 hover:bg-muted",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Select City"
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1455,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1454,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: "all",
                                                            children: "Select City"
                                                        }, void 0, false, {
                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                            lineNumber: 1458,
                                                            columnNumber: 23
                                                        }, this),
                                                        cities.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: city,
                                                                children: city
                                                            }, city, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1460,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1457,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1453,
                                            columnNumber: 19
                                        }, this);
                                    })(),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden xl:contents",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueTypeFilter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VenueTypeFilter"], {
                                                selectedTypes: selectedTypes,
                                                onChange: setSelectedTypes
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1472,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$CapacitySlider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapacitySlider"], {
                                                min: capacityMin,
                                                max: capacityMax,
                                                onChange: (min, max)=>{
                                                    setCapacityMin(min);
                                                    setCapacityMax(max);
                                                },
                                                variant: "inline"
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1474,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 1471,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "xl:hidden flex-shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Popover"], {
                                            open: filtersPopoverOpen,
                                            onOpenChange: setFiltersPopoverOpen,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-8 gap-1.5 px-2.5 justify-between", hasSecondaryFilters ? "border-primary bg-primary/10 text-primary hover:bg-primary/20" : "border-input bg-background text-foreground hover:bg-muted"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                                className: "h-3.5 w-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1499,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs",
                                                                children: "Filters"
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1500,
                                                                columnNumber: 23
                                                            }, this),
                                                            secondaryFilterCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: "h-4 min-w-4 px-1 text-[10px] bg-primary text-primary-foreground",
                                                                children: secondaryFilterCount
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1502,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-3 w-3 transition-transform", filtersPopoverOpen && "rotate-180")
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1509,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1489,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1488,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                                    className: "w-72 p-3 bg-card border rounded-lg shadow-lg",
                                                    align: "start",
                                                    sideOffset: 4,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium text-muted-foreground mb-2 block",
                                                                        children: "Venue Type"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1515,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueTypeFilter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VenueTypeFilter"], {
                                                                        selectedTypes: selectedTypes,
                                                                        onChange: setSelectedTypes
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1516,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1514,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        className: "text-xs font-medium text-muted-foreground mb-2 block",
                                                                        children: "Capacity"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1519,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$CapacitySlider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapacitySlider"], {
                                                                        min: capacityMin,
                                                                        max: capacityMax,
                                                                        onChange: (min, max)=>{
                                                                            setCapacityMin(min);
                                                                            setCapacityMax(max);
                                                                        },
                                                                        variant: "stacked"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1520,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1518,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1513,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1512,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1487,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 1486,
                                        columnNumber: 15
                                    }, this),
                                    hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: clearFilters,
                                        className: "text-muted-foreground h-8 lg:h-9 px-1.5 lg:px-3 flex-shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-3.5 w-3.5 lg:h-4 lg:w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1542,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden lg:inline ml-1",
                                                children: "Clear"
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1543,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 1536,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                lineNumber: 1358,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Collapsible"], {
                                    open: locationFilterOpen,
                                    onOpenChange: setLocationFilterOpen,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                                    className: "flex-1 min-w-0",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-2.5 bg-card rounded-lg border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                        className: "h-4 w-4 text-muted-foreground"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1557,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium text-sm",
                                                                        children: "Filter Venues"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1558,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    selectedTypes.length + activeLocationFilterCount + (capacityMin > 0 || capacityMax < 100000 ? 1 : 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                        variant: "secondary",
                                                                        className: "ml-1 bg-primary text-primary-foreground text-xs",
                                                                        children: selectedTypes.length + activeLocationFilterCount + (capacityMin > 0 || capacityMax < 100000 ? 1 : 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1563,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1556,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 text-muted-foreground transition-transform", locationFilterOpen && "rotate-180")
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1570,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1555,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1554,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 shrink-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: viewMode === "list" ? "default" : "outline",
                                                            size: "sm",
                                                            className: "h-9 w-9 p-0",
                                                            onClick: ()=>setViewMode("list"),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1587,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                            lineNumber: 1581,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: viewMode === "map" ? "default" : "outline",
                                                            size: "sm",
                                                            className: "h-9 w-9 p-0",
                                                            onClick: ()=>setViewMode("map"),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1595,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                            lineNumber: 1589,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                    lineNumber: 1580,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1552,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$collapsible$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                            "data-filter-content": true,
                                            className: "mt-2 overscroll-contain",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 bg-card border border-border rounded-lg space-y-3",
                                                children: [
                                                    (selectedContinent || selectedTypes.length > 0 || selectedCountry || selectedRegionId || selectedCity || capacityMin > 0 || capacityMax < 100000) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap items-center gap-1.5",
                                                        children: [
                                                            selectedContinent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs",
                                                                children: [
                                                                    selectedContinent,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: handleBackToSelection,
                                                                        className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1623,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1619,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1614,
                                                                columnNumber: 27
                                                            }, this),
                                                            selectedCountries.length > 0 && !selectedRegionId && !selectedCity && selectedCountries.map((country)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs",
                                                                    children: [
                                                                        country,
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                const newCountries = selectedCountries.filter((c)=>c !== country);
                                                                                handleCountryChange(newCountries);
                                                                            },
                                                                            className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                                lineNumber: 1646,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1639,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, country, true, {
                                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                    lineNumber: 1633,
                                                                    columnNumber: 29
                                                                }, this)),
                                                            selectedCountry && (selectedRegionId || selectedCity) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs",
                                                                children: [
                                                                    selectedCountry,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            sessionStorage.removeItem("venueFinderMapState");
                                                                            sessionStorage.removeItem("venueFinderSelectedCountries");
                                                                            setInitialMapState(null);
                                                                            router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                                                                                continent: selectedContinent
                                                                            }));
                                                                        },
                                                                        className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1667,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1658,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1653,
                                                                columnNumber: 27
                                                            }, this),
                                                            selectedTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs",
                                                                    children: [
                                                                        type,
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>setSelectedTypes(selectedTypes.filter((t)=>t !== type)),
                                                                            className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                                className: "h-3 w-3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                                lineNumber: 1684,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1680,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, type, true, {
                                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                    lineNumber: 1674,
                                                                    columnNumber: 27
                                                                }, this)),
                                                            (capacityMin > 0 || capacityMax < 100000) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs",
                                                                children: [
                                                                    capacityMin > 0 && capacityMax < 100000 ? `${capacityMin.toLocaleString()}-${capacityMax.toLocaleString()}` : capacityMin > 0 ? `${capacityMin.toLocaleString()}+` : `Up to ${capacityMax.toLocaleString()}`,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            setCapacityMin(0);
                                                                            setCapacityMax(100000);
                                                                        },
                                                                        className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1707,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1700,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1691,
                                                                columnNumber: 27
                                                            }, this),
                                                            selectedCity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs",
                                                                children: [
                                                                    selectedCity,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                                                                                continent: selectedContinent,
                                                                                country: selectedCountry,
                                                                                regionSlug: selectedRegionSlug
                                                                            })),
                                                                        className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1731,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1719,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1714,
                                                                columnNumber: 27
                                                            }, this),
                                                            selectedRegionData && !selectedCity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-1 pr-1 text-xs",
                                                                children: [
                                                                    selectedRegionData.region_name,
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>router.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueUrlUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["buildVenueUrl"])({
                                                                                continent: selectedContinent,
                                                                                country: selectedCountry
                                                                            })),
                                                                        className: "ml-0.5 rounded-full hover:bg-primary-foreground/20 p-0.5",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1754,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1743,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1738,
                                                                columnNumber: 27
                                                            }, this),
                                                            (selectedCountries.length > 0 || selectedTypes.length > 0 || capacityMin > 0 || capacityMax < 100000) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: clearFilters,
                                                                className: "text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1",
                                                                children: "Clear"
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1764,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1611,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-2",
                                                        children: [
                                                            !selectedRegionId && !selectedCity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$CountryFilter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CountryFilter"], {
                                                                countries: countries || [],
                                                                selectedCountries: selectedCountries,
                                                                onChange: handleCountryChange
                                                            }, "mobile-country-filter-stable", false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1778,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VenueTypeFilter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VenueTypeFilter"], {
                                                                selectedTypes: selectedTypes,
                                                                onChange: setSelectedTypes
                                                            }, void 0, false, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1787,
                                                                columnNumber: 23
                                                            }, this),
                                                            selectedCountry && regions && regions.length > 0 && !selectedRegionId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                open: regionDropdownOpen,
                                                                onOpenChange: setRegionDropdownOpen,
                                                                onValueChange: (v)=>{
                                                                    handleRegionChange(v);
                                                                    setRegionDropdownOpen(false);
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "h-9 text-sm",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: "All Regions"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1801,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1800,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                        children: regions.map((region)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                value: region.region_slug,
                                                                                children: region.region_name
                                                                            }, region.id, false, {
                                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                                lineNumber: 1805,
                                                                                columnNumber: 31
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                        lineNumber: 1803,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, "region-select", true, {
                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                lineNumber: 1791,
                                                                columnNumber: 25
                                                            }, this),
                                                            selectedCountry && cities && cities.length > 0 && !selectedCity && !isCurrentCityRegion && (()=>{
                                                                const selectedRegionName = selectedRegionId ? regions?.find((r)=>r.id === selectedRegionId)?.region_name : null;
                                                                const shouldShowCityDropdown = !(cities.length === 1 && selectedRegionName && cities[0] === selectedRegionName);
                                                                if (!shouldShowCityDropdown) return null;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                    open: cityDropdownOpen,
                                                                    onOpenChange: setCityDropdownOpen,
                                                                    onValueChange: (v)=>{
                                                                        handleCityChange(v);
                                                                        setCityDropdownOpen(false);
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                            className: "h-9 text-sm",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                placeholder: "All Cities"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                                lineNumber: 1842,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1841,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                            children: cities.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: city,
                                                                                    children: city
                                                                                }, city, false, {
                                                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                                    lineNumber: 1846,
                                                                                    columnNumber: 35
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                            lineNumber: 1844,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, "city-select", true, {
                                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                    lineNumber: 1832,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })()
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1775,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$CapacitySlider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapacitySlider"], {
                                                        min: capacityMin,
                                                        max: capacityMax,
                                                        onChange: (min, max)=>{
                                                            setCapacityMin(min);
                                                            setCapacityMax(max);
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1857,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1602,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1601,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                    lineNumber: 1550,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                lineNumber: 1549,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                        lineNumber: 1351,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container flex-1 flex gap-4 min-h-0 max-h-[790px] overflow-hidden py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-1 flex flex-col min-h-0", viewMode === "map" && "hidden md:flex"),
                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5 overflow-hidden",
                                    children: [
                                        ...Array(8)
                                    ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-14 bg-card border rounded-lg animate-pulse"
                                        }, i, false, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1877,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                    lineNumber: 1875,
                                    columnNumber: 17
                                }, this) : venues.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center h-full text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            className: "h-12 w-12 text-muted-foreground mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1882,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg font-medium",
                                            children: "No venues found"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1883,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground mt-1",
                                            children: "Try adjusting your filters"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1884,
                                            columnNumber: 19
                                        }, this),
                                        hasActiveFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            onClick: clearFilters,
                                            className: "mt-4",
                                            children: "Clear Filters"
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1886,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                    lineNumber: 1881,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-3 py-2 bg-card border rounded-lg mb-3 flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-sm font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: visibleVenues.length === venues.length ? `${venues.length} venue${venues.length !== 1 ? "s" : ""}` : `${visibleVenues.length} of ${venues.length} venues in view`
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1896,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mx-1.5 text-muted-foreground",
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1901,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-foreground",
                                                        children: (()=>{
                                                            // Check URL specificity for SEO matching
                                                            const urlHasThirdSegment = !!urlParsed.thirdSlug;
                                                            const urlHasFourthSegment = !!urlParsed.fourthSlug;
                                                            const urlHasCountry = !!urlParsed.countrySlug;
                                                            // Venue type SEO
                                                            if (activeVenueType && venueTypeSeo?.h2_override) {
                                                                const seoHasCity = !!venueTypeSeo.city;
                                                                const seoHasRegion = !!venueTypeSeo.region_slug;
                                                                const seoHasCountry = !!venueTypeSeo.country;
                                                                if (urlHasFourthSegment && seoHasCity || urlHasThirdSegment && !urlHasFourthSegment && (seoHasCity && !seoHasRegion || seoHasRegion && !seoHasCity) || urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity || !urlHasCountry && !seoHasCountry) {
                                                                    return venueTypeSeo.h2_override;
                                                                }
                                                            }
                                                            if (activeVenueType) {
                                                                return `Browse ${activeVenueType}s in ${getLocationString() || "All Locations"}`;
                                                            }
                                                            // Location SEO - check specificity
                                                            if (locationSeo?.h2_override) {
                                                                const seoHasCity = !!locationSeo.city;
                                                                const seoHasRegion = !!locationSeo.region_slug;
                                                                const seoHasCountry = !!locationSeo.country;
                                                                if (urlHasFourthSegment && seoHasCity || urlHasThirdSegment && !urlHasFourthSegment && (seoHasCity && !seoHasRegion || seoHasRegion && !seoHasCity) || urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity || !urlHasCountry && !seoHasCountry) {
                                                                    return locationSeo.h2_override;
                                                                }
                                                            }
                                                            // Category template
                                                            if (venuesCategory?.seo_h2_override) {
                                                                return injectLocation(venuesCategory.seo_h2_override) || `Live Music Venues in ${displayLocationTitle}`;
                                                            }
                                                            return `Live Music Venues in ${displayLocationTitle}`;
                                                        })()
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1902,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1895,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1894,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$venues$2f$VirtualVenueList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VirtualVenueList"], {
                                            venues: visibleVenues,
                                            highlightedVenueId: highlightedVenueId,
                                            onHoverVenue: handleHoverVenue,
                                            className: "flex-1 min-h-0 pr-2",
                                            initialScrollTop: initialScrollTop,
                                            onScrollPositionChange: handleScrollPositionChange,
                                            onScroll: ()=>setLocationFilterOpen(false),
                                            footer: selectedCountry || selectedContinent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: "pt-4 border-t border-border",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-medium text-muted-foreground mb-2",
                                                        children: (()=>{
                                                            const urlHasThirdSegment = !!urlParsed.thirdSlug;
                                                            const urlHasFourthSegment = !!urlParsed.fourthSlug;
                                                            const urlHasCountry = !!urlParsed.countrySlug;
                                                            // Venue type SEO
                                                            if (activeVenueType && venueTypeSeo?.about_heading) {
                                                                const seoHasCity = !!venueTypeSeo.city;
                                                                const seoHasRegion = !!venueTypeSeo.region_slug;
                                                                const seoHasCountry = !!venueTypeSeo.country;
                                                                if (urlHasFourthSegment && seoHasCity || urlHasThirdSegment && !urlHasFourthSegment && (seoHasCity && !seoHasRegion || seoHasRegion && !seoHasCity) || urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity || !urlHasCountry && !seoHasCountry) {
                                                                    return venueTypeSeo.about_heading;
                                                                }
                                                            }
                                                            if (activeVenueType) {
                                                                return `About ${activeVenueType}s in ${getLocationString() || "All Locations"}`;
                                                            }
                                                            // Location SEO - check specificity
                                                            if (locationSeo?.about_heading) {
                                                                const seoHasCity = !!locationSeo.city;
                                                                const seoHasRegion = !!locationSeo.region_slug;
                                                                const seoHasCountry = !!locationSeo.country;
                                                                if (urlHasFourthSegment && seoHasCity || urlHasThirdSegment && !urlHasFourthSegment && (seoHasCity && !seoHasRegion || seoHasRegion && !seoHasCity) || urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity || !urlHasCountry && !seoHasCountry) {
                                                                    return locationSeo.about_heading;
                                                                }
                                                            }
                                                            // Category template
                                                            if (venuesCategory?.seo_about_heading) {
                                                                return injectLocation(venuesCategory.seo_about_heading) || `About Venues in ${displayLocationTitle}`;
                                                            }
                                                            return `About Venues in ${displayLocationTitle}`;
                                                        })()
                                                    }, void 0, false, {
                                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                        lineNumber: 1972,
                                                        columnNumber: 27
                                                    }, void 0),
                                                    (()=>{
                                                        const urlHasThirdSegment = !!urlParsed.thirdSlug;
                                                        const urlHasFourthSegment = !!urlParsed.fourthSlug;
                                                        const urlHasCountry = !!urlParsed.countrySlug;
                                                        // Venue type SEO content
                                                        if (activeVenueType && venueTypeSeo?.about_content) {
                                                            const seoHasCity = !!venueTypeSeo.city;
                                                            const seoHasRegion = !!venueTypeSeo.region_slug;
                                                            const seoHasCountry = !!venueTypeSeo.country;
                                                            if (urlHasFourthSegment && seoHasCity || urlHasThirdSegment && !urlHasFourthSegment && (seoHasCity && !seoHasRegion || seoHasRegion && !seoHasCity) || urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity || !urlHasCountry && !seoHasCountry) {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-muted-foreground/80 leading-relaxed prose prose-sm max-w-none",
                                                                    dangerouslySetInnerHTML: {
                                                                        __html: __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$isomorphic$2d$dompurify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].sanitize(venueTypeSeo.about_content)
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                    lineNumber: 2057,
                                                                    columnNumber: 35
                                                                }, void 0);
                                                            }
                                                        }
                                                        // Location SEO content - check specificity
                                                        if (!activeVenueType && locationSeo?.about_content) {
                                                            const seoHasCity = !!locationSeo.city;
                                                            const seoHasRegion = !!locationSeo.region_slug;
                                                            const seoHasCountry = !!locationSeo.country;
                                                            if (urlHasFourthSegment && seoHasCity || urlHasThirdSegment && !urlHasFourthSegment && (seoHasCity && !seoHasRegion || seoHasRegion && !seoHasCity) || urlHasCountry && !urlHasThirdSegment && seoHasCountry && !seoHasRegion && !seoHasCity || !urlHasCountry && !seoHasCountry) {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-muted-foreground/80 leading-relaxed prose prose-sm max-w-none",
                                                                    dangerouslySetInnerHTML: {
                                                                        __html: __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$isomorphic$2d$dompurify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].sanitize(locationSeo.about_content)
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                    lineNumber: 2083,
                                                                    columnNumber: 35
                                                                }, void 0);
                                                            }
                                                        }
                                                        // Category template content
                                                        if (!activeVenueType && venuesCategory?.seo_about_content) {
                                                            const injected = injectLocation(venuesCategory.seo_about_content);
                                                            if (injected) {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-muted-foreground/80 leading-relaxed prose prose-sm max-w-none",
                                                                    dangerouslySetInnerHTML: {
                                                                        __html: __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$isomorphic$2d$dompurify$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].sanitize(injected)
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                                    lineNumber: 2096,
                                                                    columnNumber: 35
                                                                }, void 0);
                                                            }
                                                        }
                                                        // Fallback content
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted-foreground/80 leading-relaxed",
                                                            children: activeVenueType ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypeContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVenueTypeAboutContent"])(activeVenueType, getLocationString() || "this region") : selectedCity ? `${selectedCity} offers a diverse range of concert venues, from intimate clubs to large arenas. Whether you're planning a small acoustic show or a major tour stop, you'll find suitable venues for any capacity and genre.` : selectedRegionData ? `${selectedRegionData.region_name} is home to numerous live music venues across its cities and towns. From historic theatres to modern arenas, the region offers diverse options for touring artists.` : selectedCountry ? `${selectedCountry} has a vibrant live music scene with venues ranging from intimate clubs to world-famous arenas. Browse our directory to find the perfect venue for your next show.` : `${selectedContinent} offers thousands of concert venues across its many countries. Use the filters above to narrow down by country, region, and city.`
                                                        }, void 0, false, {
                                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                            lineNumber: 2106,
                                                            columnNumber: 31
                                                        }, void 0);
                                                    })()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                                lineNumber: 1971,
                                                columnNumber: 25
                                            }, void 0) : undefined
                                        }, void 0, false, {
                                            fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                            lineNumber: 1961,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                lineNumber: 1873,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex-1 rounded-lg overflow-hidden min-h-0 h-full", viewMode === "list" && "hidden md:block"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                                    fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MapLoadingFallback, {}, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 2134,
                                        columnNumber: 35
                                    }, void 0),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VenueMap, {
                                        venues: venues,
                                        selectedVenue: selectedMapVenue,
                                        onSelectVenue: handleMapVenueSelect,
                                        highlightedVenueId: highlightedVenueId,
                                        onBoundsChange: handleBoundsChange,
                                        initialState: initialMapState
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                        lineNumber: 2135,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                    lineNumber: 2134,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                                lineNumber: 2128,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                        lineNumber: 1871,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
                lineNumber: 1349,
                columnNumber: 10
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/showcase-next/src/components/VenueFinder.tsx",
        lineNumber: 1312,
        columnNumber: 5
    }, this);
}
}),
"[project]/showcase-next/src/components/VenueFinderWrapper.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VenueFinderWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/venueTypes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$VenueFinder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/VenueFinder.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function VenueFinderWrapper() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    // Check if second segment is a venue type (e.g., /venues/europe/arenas)
    const secondSegmentIsVenueType = params.countrySlug && (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isVenueTypeSlug"])(params.countrySlug);
    if (secondSegmentIsVenueType) {
        const venueType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$venueTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getVenueTypeFromSlug"])(params.countrySlug);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$VenueFinder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            preSelectedVenueType: venueType,
            venueTypeSlug: params.countrySlug
        }, void 0, false, {
            fileName: "[project]/showcase-next/src/components/VenueFinderWrapper.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this);
    }
    // Normal case - just render VenueFinder
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$VenueFinder$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/showcase-next/src/components/VenueFinderWrapper.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3ede35df._.js.map