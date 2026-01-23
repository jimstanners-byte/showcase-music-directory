module.exports = [
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
];

//# sourceMappingURL=showcase-next_src_8f22fa1a._.js.map