module.exports = [
"[project]/showcase-next/src/components/ListingsMap.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListingsMap",
    ()=>ListingsMap,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/exports-maplibre.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$supercluster$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/supercluster/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$FavouriteButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/FavouriteButton.tsx [app-ssr] (ecmascript)");
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
;
// Free map style - using Carto's positron style for cleaner look
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
function ListingsMap({ listings, selectedListing, onSelectListing, highlightedListingId, onBoundsChange, initialState, resetTrigger }) {
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(3);
    const [bounds, setBounds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [internalSelectedListing, setInternalSelectedListing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Use internal state if no external control
    const actualSelectedListing = selectedListing !== undefined ? selectedListing : internalSelectedListing;
    const handleSelectListing = onSelectListing || setInternalSelectedListing;
    // Smart auto-pan: only pan if popup would be clipped, with smooth animation
    const ensurePopupVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((lng, lat)=>{
        if (!mapRef.current) return;
        const map = mapRef.current;
        const point = map.project([
            lng,
            lat
        ]);
        const container = map.getContainer();
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        // Popup dimensions (approximate) + padding
        const popupHeight = 160; // Approximate popup height including offset
        const popupWidth = 100; // Half of popup width (centered on point)
        const padding = 20; // Edge padding
        let panX = 0;
        let panY = 0;
        // Check if popup would be clipped at top
        if (point.y - popupHeight - padding < 0) {
            panY = point.y - popupHeight - padding;
        }
        // Check if popup would be clipped at bottom (unlikely with bottom anchor, but check anyway)
        if (point.y + padding > height) {
            panY = point.y + padding - height;
        }
        // Check left edge
        if (point.x - popupWidth - padding < 0) {
            panX = point.x - popupWidth - padding;
        }
        // Check right edge
        if (point.x + popupWidth + padding > width) {
            panX = point.x + popupWidth + padding - width;
        }
        // Only pan if needed
        if (panX !== 0 || panY !== 0) {
            map.panBy([
                panX,
                panY
            ], {
                duration: 300
            });
        }
    }, []);
    // Filter listings with valid coordinates
    const mappableListings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>listings.filter((l)=>l.latitude !== null && l.longitude !== null), [
        listings
    ]);
    // Create supercluster instance - smaller radius for more granular clusters
    const supercluster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const cluster = new __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$supercluster$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
            radius: 40,
            maxZoom: 16,
            minZoom: 0
        });
        const points = mappableListings.map((listing)=>({
                type: "Feature",
                properties: {
                    id: listing.id,
                    listing
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        listing.longitude,
                        listing.latitude
                    ]
                }
            }));
        cluster.load(points);
        return cluster;
    }, [
        mappableListings
    ]);
    // Get clusters for current viewport
    const clusters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!bounds) return [];
        return supercluster.getClusters(bounds, Math.floor(zoom));
    }, [
        supercluster,
        bounds,
        zoom
    ]);
    // Find which cluster contains the highlighted listing (if any)
    const highlightedClusterId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!highlightedListingId || !bounds) return null;
        // Check if the highlighted listing is visible as an individual marker
        const isIndividualMarker = clusters.some((cluster)=>{
            const props = cluster.properties;
            return !props.cluster && props.listing?.id === highlightedListingId;
        });
        if (isIndividualMarker) return null; // No need to highlight cluster
        // Find which cluster contains this listing
        for (const cluster of clusters){
            const props = cluster.properties;
            if (props.cluster) {
                const leaves = supercluster.getLeaves(props.cluster_id, Infinity);
                const containsListing = leaves.some((leaf)=>leaf.properties.id === highlightedListingId);
                if (containsListing) {
                    return props.cluster_id;
                }
            }
        }
        return null;
    }, [
        highlightedListingId,
        clusters,
        supercluster,
        bounds
    ]);
    // Calculate initial bounds
    const initialBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (mappableListings.length === 0) return null;
        const lats = mappableListings.map((l)=>l.latitude);
        const lngs = mappableListings.map((l)=>l.longitude);
        return {
            minLat: Math.min(...lats),
            maxLat: Math.max(...lats),
            minLng: Math.min(...lngs),
            maxLng: Math.max(...lngs)
        };
    }, [
        mappableListings
    ]);
    // Fit to bounds when listings change (but not if we have saved state to restore)
    const hasRestoredState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const prevBoundsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const prevResetTrigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapRef.current || !initialBounds) return;
        // Check if this is a forced reset (resetTrigger changed)
        const isForceReset = resetTrigger !== undefined && resetTrigger !== prevResetTrigger.current;
        prevResetTrigger.current = resetTrigger;
        // If force reset, clear the restored state and fit to bounds
        if (isForceReset) {
            hasRestoredState.current = false;
            prevBoundsRef.current = initialBounds;
            const map = mapRef.current;
            map.fitBounds([
                [
                    initialBounds.minLng,
                    initialBounds.minLat
                ],
                [
                    initialBounds.maxLng,
                    initialBounds.maxLat
                ]
            ], {
                padding: 50,
                maxZoom: 12,
                duration: 500
            });
            return;
        }
        // If we have saved state to restore, mark as restored and skip (onMapLoad handles it)
        if (initialState) {
            hasRestoredState.current = true;
            prevBoundsRef.current = initialBounds;
            return;
        }
        // Check if bounds actually changed (different listings)
        const boundsChanged = !prevBoundsRef.current || prevBoundsRef.current.minLat !== initialBounds.minLat || prevBoundsRef.current.maxLat !== initialBounds.maxLat || prevBoundsRef.current.minLng !== initialBounds.minLng || prevBoundsRef.current.maxLng !== initialBounds.maxLng;
        prevBoundsRef.current = initialBounds;
        // If bounds changed (filter change), fit to new bounds
        // If bounds same and we restored, skip (user is browsing same data)
        if (!boundsChanged && hasRestoredState.current) {
            return;
        }
        // Reset restored flag when bounds change
        if (boundsChanged) {
            hasRestoredState.current = false;
        }
        const map = mapRef.current;
        map.fitBounds([
            [
                initialBounds.minLng,
                initialBounds.minLat
            ],
            [
                initialBounds.maxLng,
                initialBounds.maxLat
            ]
        ], {
            padding: 50,
            maxZoom: 12,
            duration: 500
        });
    }, [
        initialBounds,
        initialState,
        resetTrigger
    ]);
    // Handle map load
    const onMapLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!mapRef.current) return;
        const map = mapRef.current;
        // If we have saved state to restore, use it
        if (initialState) {
            map.fitBounds([
                [
                    initialState.bounds.west,
                    initialState.bounds.south
                ],
                [
                    initialState.bounds.east,
                    initialState.bounds.north
                ]
            ], {
                padding: 0,
                duration: 0
            });
        } else if (initialBounds) {
            // Otherwise fit to all listings
            map.fitBounds([
                [
                    initialBounds.minLng,
                    initialBounds.minLat
                ],
                [
                    initialBounds.maxLng,
                    initialBounds.maxLat
                ]
            ], {
                padding: 50,
                maxZoom: 12,
                duration: 0
            });
        }
        // Set initial bounds state
        const mapBounds = map.getBounds();
        if (mapBounds) {
            const newBounds = [
                mapBounds.getWest(),
                mapBounds.getSouth(),
                mapBounds.getEast(),
                mapBounds.getNorth()
            ];
            setBounds(newBounds);
            setZoom(map.getZoom());
            // Notify parent
            onBoundsChange?.({
                west: newBounds[0],
                south: newBounds[1],
                east: newBounds[2],
                north: newBounds[3]
            }, map.getZoom());
        }
    }, [
        initialBounds,
        initialState,
        onBoundsChange
    ]);
    // Handle map move
    const onMoveEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!mapRef.current) return;
        const map = mapRef.current;
        const mapBounds = map.getBounds();
        const newZoom = map.getZoom();
        if (mapBounds) {
            const newBounds = [
                mapBounds.getWest(),
                mapBounds.getSouth(),
                mapBounds.getEast(),
                mapBounds.getNorth()
            ];
            setBounds(newBounds);
            setZoom(newZoom);
            // Notify parent of bounds change for list filtering and state persistence
            onBoundsChange?.({
                west: newBounds[0],
                south: newBounds[1],
                east: newBounds[2],
                north: newBounds[3]
            }, newZoom);
        }
    }, [
        onBoundsChange
    ]);
    // Handle cluster click - smart zoom based on cluster size
    const handleClusterClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((clusterId, clusterLng, clusterLat)=>{
        if (!mapRef.current) return;
        const leaves = supercluster.getLeaves(clusterId, Infinity);
        if (leaves.length === 0) return;
        // For large clusters (100+), use expansion zoom (one level at a time)
        if (leaves.length > 100) {
            const expansionZoom = supercluster.getClusterExpansionZoom(clusterId);
            mapRef.current.flyTo({
                center: [
                    clusterLng,
                    clusterLat
                ],
                zoom: Math.min(expansionZoom + 1, 14),
                duration: 500
            });
            return;
        }
        // For smaller clusters, fit bounds to show all listings
        const lngs = leaves.map((l)=>l.geometry.coordinates[0]);
        const lats = leaves.map((l)=>l.geometry.coordinates[1]);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const lngPad = Math.max((maxLng - minLng) * 0.15, 0.01);
        const latPad = Math.max((maxLat - minLat) * 0.15, 0.01);
        mapRef.current.fitBounds([
            [
                minLng - lngPad,
                minLat - latPad
            ],
            [
                maxLng + lngPad,
                maxLat + latPad
            ]
        ], {
            padding: 50,
            maxZoom: 16,
            duration: 500
        });
    }, [
        supercluster
    ]);
    // Format count for display
    const formatCount = (count)=>{
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
        return count.toString();
    };
    // Empty state
    if (mappableListings.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full bg-card border rounded-lg p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                    className: "h-12 w-12 text-muted-foreground mb-4"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                    lineNumber: 383,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-medium text-foreground",
                    children: "No locations to display"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                    lineNumber: 384,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-muted-foreground mt-1",
                    children: "Locations will appear once geocoded"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                    lineNumber: 385,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
            lineNumber: 382,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full rounded-lg overflow-hidden border bg-card",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
            ref: mapRef,
            initialViewState: {
                latitude: initialBounds ? (initialBounds.minLat + initialBounds.maxLat) / 2 : 50,
                longitude: initialBounds ? (initialBounds.minLng + initialBounds.maxLng) / 2 : 0,
                zoom: 3
            },
            mapStyle: MAP_STYLE,
            style: {
                width: "100%",
                height: "100%"
            },
            onLoad: onMapLoad,
            onMoveEnd: onMoveEnd,
            onClick: ()=>handleSelectListing(null),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NavigationControl"], {
                    position: "top-right"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                    lineNumber: 405,
                    columnNumber: 9
                }, this),
                clusters.map((cluster)=>{
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const properties = cluster.properties;
                    // It's a cluster
                    if (properties.cluster) {
                        const count = properties.point_count;
                        const isHighlighted = properties.cluster_id === highlightedClusterId;
                        const baseSize = Math.min(28 + Math.sqrt(count) * 2, 50);
                        const size = isHighlighted ? baseSize * 1.3 : baseSize;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Marker"], {
                            longitude: longitude,
                            latitude: latitude,
                            anchor: "center",
                            onClick: (e)=>{
                                e.originalEvent.stopPropagation();
                                handleClusterClick(properties.cluster_id, longitude, latitude);
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center rounded-full cursor-pointer transition-all duration-150", isHighlighted ? "scale-110 ring-4 ring-accent/50" : "hover:scale-110"),
                                style: {
                                    width: size,
                                    height: size,
                                    backgroundColor: isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary))",
                                    color: "hsl(var(--primary-foreground))",
                                    fontSize: Math.max(11, baseSize * 0.32),
                                    fontWeight: 600,
                                    boxShadow: isHighlighted ? "0 4px 12px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.3)",
                                    border: isHighlighted ? "3px solid white" : "2px solid white"
                                },
                                children: formatCount(count)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                                lineNumber: 430,
                                columnNumber: 17
                            }, this)
                        }, `cluster-${properties.cluster_id}`, false, {
                            fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                            lineNumber: 420,
                            columnNumber: 15
                        }, this);
                    }
                    // It's an individual listing
                    const listing = properties.listing;
                    const isHighlighted = highlightedListingId === listing.id;
                    // Handler for both mouse and touch interactions
                    const handleMarkerInteraction = (e)=>{
                        e.stopPropagation();
                        handleSelectListing(listing);
                        // Smart pan to ensure popup is visible
                        if (listing.longitude && listing.latitude) {
                            setTimeout(()=>ensurePopupVisible(listing.longitude, listing.latitude), 50);
                        }
                    };
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Marker"], {
                        longitude: longitude,
                        latitude: latitude,
                        anchor: "bottom",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `cursor-pointer transition-transform duration-150 ${isHighlighted ? "scale-150 z-10" : "hover:scale-125"}`,
                            onMouseEnter: handleMarkerInteraction,
                            onClick: handleMarkerInteraction,
                            onTouchStart: handleMarkerInteraction,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-7 w-7 drop-shadow-lg",
                                style: {
                                    fill: isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary))",
                                    stroke: "white",
                                    strokeWidth: 1.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                                lineNumber: 476,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                            lineNumber: 468,
                            columnNumber: 15
                        }, this)
                    }, listing.id, false, {
                        fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                        lineNumber: 467,
                        columnNumber: 13
                    }, this);
                }),
                actualSelectedListing && actualSelectedListing.latitude && actualSelectedListing.longitude && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Popup"], {
                    longitude: actualSelectedListing.longitude,
                    latitude: actualSelectedListing.latitude,
                    anchor: "bottom",
                    onClose: ()=>handleSelectListing(null),
                    closeOnClick: false,
                    offset: 25,
                    maxWidth: "200px",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2.5 min-w-[160px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-1 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold leading-tight line-clamp-2",
                                        children: actualSelectedListing.name
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                                        lineNumber: 502,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$FavouriteButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FavouriteButton"], {
                                        listingId: actualSelectedListing.id,
                                        size: "sm",
                                        className: "h-5 w-5 p-0 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                                        lineNumber: 503,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                                lineNumber: 501,
                                columnNumber: 15
                            }, this),
                            actualSelectedListing.town_city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground mb-2",
                                children: [
                                    actualSelectedListing.town_city,
                                    ", ",
                                    actualSelectedListing.country
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                                lineNumber: 507,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                asChild: true,
                                size: "sm",
                                className: "w-full h-7 text-xs",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/listing/${actualSelectedListing.slug}`,
                                    children: "View Details"
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                                    lineNumber: 513,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                                lineNumber: 512,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                        lineNumber: 500,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
                    lineNumber: 491,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
            lineNumber: 392,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/ListingsMap.tsx",
        lineNumber: 391,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = ListingsMap;
}),
];

//# sourceMappingURL=showcase-next_src_components_ListingsMap_tsx_fee7382a._.js.map