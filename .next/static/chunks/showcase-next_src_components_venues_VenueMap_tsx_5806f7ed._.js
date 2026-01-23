(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/showcase-next/src/components/venues/VenueMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VenueMap",
    ()=>VenueMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/exports-maplibre.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$supercluster$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/supercluster/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/hooks/useVenueUrl.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$FavouriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/components/FavouriteButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
// Free map style
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
function VenueMap(param) {
    let { venues, selectedVenue, onSelectVenue, highlightedVenueId, onBoundsChange, initialState } = param;
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [bounds, setBounds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Smart auto-pan: only pan if popup would be clipped, with smooth animation
    const ensurePopupVisible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VenueMap.useCallback[ensurePopupVisible]": (lng, lat)=>{
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
            const popupHeight = 180; // Slightly taller for venue popup with capacity
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
        }
    }["VenueMap.useCallback[ensurePopupVisible]"], []);
    // Filter venues with valid coordinates
    const mappableVenues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "VenueMap.useMemo[mappableVenues]": ()=>venues.filter({
                "VenueMap.useMemo[mappableVenues]": (v)=>v.latitude !== null && v.longitude !== null
            }["VenueMap.useMemo[mappableVenues]"])
    }["VenueMap.useMemo[mappableVenues]"], [
        venues
    ]);
    // Create supercluster instance - smaller radius for more granular clusters
    const supercluster = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "VenueMap.useMemo[supercluster]": ()=>{
            const cluster = new __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$supercluster$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
                radius: 15,
                maxZoom: 8,
                minZoom: 0
            });
            const points = mappableVenues.map({
                "VenueMap.useMemo[supercluster].points": (venue)=>({
                        type: "Feature",
                        properties: {
                            id: venue.id,
                            venue
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [
                                venue.longitude,
                                venue.latitude
                            ]
                        }
                    })
            }["VenueMap.useMemo[supercluster].points"]);
            cluster.load(points);
            return cluster;
        }
    }["VenueMap.useMemo[supercluster]"], [
        mappableVenues
    ]);
    // Get clusters for current viewport
    const clusters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "VenueMap.useMemo[clusters]": ()=>{
            if (!bounds) return [];
            return supercluster.getClusters(bounds, Math.floor(zoom));
        }
    }["VenueMap.useMemo[clusters]"], [
        supercluster,
        bounds,
        zoom
    ]);
    // Find which cluster contains the highlighted venue (if any)
    const highlightedClusterId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "VenueMap.useMemo[highlightedClusterId]": ()=>{
            if (!highlightedVenueId || !bounds) return null;
            // Check if the highlighted venue is visible as an individual marker
            const isIndividualMarker = clusters.some({
                "VenueMap.useMemo[highlightedClusterId].isIndividualMarker": (cluster)=>{
                    var _props_venue;
                    const props = cluster.properties;
                    return !props.cluster && ((_props_venue = props.venue) === null || _props_venue === void 0 ? void 0 : _props_venue.id) === highlightedVenueId;
                }
            }["VenueMap.useMemo[highlightedClusterId].isIndividualMarker"]);
            if (isIndividualMarker) return null; // No need to highlight cluster
            // Find which cluster contains this venue
            for (const cluster of clusters){
                const props = cluster.properties;
                if (props.cluster) {
                    const leaves = supercluster.getLeaves(props.cluster_id, Infinity);
                    const containsVenue = leaves.some({
                        "VenueMap.useMemo[highlightedClusterId].containsVenue": (leaf)=>leaf.properties.id === highlightedVenueId
                    }["VenueMap.useMemo[highlightedClusterId].containsVenue"]);
                    if (containsVenue) {
                        return props.cluster_id;
                    }
                }
            }
            return null;
        }
    }["VenueMap.useMemo[highlightedClusterId]"], [
        highlightedVenueId,
        clusters,
        supercluster,
        bounds
    ]);
    // Calculate initial bounds
    const initialBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "VenueMap.useMemo[initialBounds]": ()=>{
            if (mappableVenues.length === 0) return null;
            const lats = mappableVenues.map({
                "VenueMap.useMemo[initialBounds].lats": (v)=>v.latitude
            }["VenueMap.useMemo[initialBounds].lats"]);
            const lngs = mappableVenues.map({
                "VenueMap.useMemo[initialBounds].lngs": (v)=>v.longitude
            }["VenueMap.useMemo[initialBounds].lngs"]);
            return {
                minLat: Math.min(...lats),
                maxLat: Math.max(...lats),
                minLng: Math.min(...lngs),
                maxLng: Math.max(...lngs)
            };
        }
    }["VenueMap.useMemo[initialBounds]"], [
        mappableVenues
    ]);
    // Fit to bounds when venues change (but not on initial load if we have saved state)
    const hasRestoredState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VenueMap.useEffect": ()=>{
            if (!mapRef.current || !initialBounds) return;
            // Skip auto-fit if we're restoring saved state on first load
            if (initialState && !hasRestoredState.current) {
                hasRestoredState.current = true;
                return;
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
                duration: 0
            });
        }
    }["VenueMap.useEffect"], [
        initialBounds,
        initialState
    ]);
    // Handle map load
    const onMapLoad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VenueMap.useCallback[onMapLoad]": ()=>{
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
                // Otherwise fit to all venues
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
                onBoundsChange === null || onBoundsChange === void 0 ? void 0 : onBoundsChange({
                    west: newBounds[0],
                    south: newBounds[1],
                    east: newBounds[2],
                    north: newBounds[3]
                }, map.getZoom());
            }
        }
    }["VenueMap.useCallback[onMapLoad]"], [
        initialBounds,
        initialState,
        onBoundsChange
    ]);
    // Handle map move
    const onMoveEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VenueMap.useCallback[onMoveEnd]": ()=>{
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
                onBoundsChange === null || onBoundsChange === void 0 ? void 0 : onBoundsChange({
                    west: newBounds[0],
                    south: newBounds[1],
                    east: newBounds[2],
                    north: newBounds[3]
                }, newZoom);
            }
        }
    }["VenueMap.useCallback[onMoveEnd]"], [
        onBoundsChange
    ]);
    // Handle cluster click - smart zoom based on cluster size
    const handleClusterClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VenueMap.useCallback[handleClusterClick]": (clusterId, clusterLng, clusterLat)=>{
            if (!mapRef.current) return;
            const leaves = supercluster.getLeaves(clusterId, Infinity);
            if (leaves.length === 0) return;
            // For large clusters (100+), use expansion zoom (one level at a time)
            // This prevents zooming out when clicking a cluster that spans a huge area
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
            // For smaller clusters, fit bounds to show all venues
            const lngs = leaves.map({
                "VenueMap.useCallback[handleClusterClick].lngs": (l)=>l.geometry.coordinates[0]
            }["VenueMap.useCallback[handleClusterClick].lngs"]);
            const lats = leaves.map({
                "VenueMap.useCallback[handleClusterClick].lats": (l)=>l.geometry.coordinates[1]
            }["VenueMap.useCallback[handleClusterClick].lats"]);
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
        }
    }["VenueMap.useCallback[handleClusterClick]"], [
        supercluster
    ]);
    // Format count for display
    const formatCount = (count)=>{
        if (count >= 1000) return "".concat((count / 1000).toFixed(1), "k");
        return count.toString();
    };
    // Empty state
    if (mappableVenues.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full bg-card border rounded-lg p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                    className: "h-12 w-12 text-muted-foreground mb-4"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                    lineNumber: 333,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-lg font-medium text-foreground",
                    children: "No venues with locations"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                    lineNumber: 334,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-muted-foreground mt-1",
                    children: "Venues will appear once geocoded"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                    lineNumber: 335,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
            lineNumber: 332,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full rounded-lg overflow-hidden border bg-card",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
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
            onClick: ()=>onSelectVenue(null),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NavigationControl"], {
                    position: "top-right"
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                    lineNumber: 355,
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
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Marker"], {
                            longitude: longitude,
                            latitude: latitude,
                            anchor: "center",
                            onClick: (e)=>{
                                e.originalEvent.stopPropagation();
                                handleClusterClick(properties.cluster_id, longitude, latitude);
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center rounded-full cursor-pointer transition-all duration-150", isHighlighted ? "scale-110 ring-4 ring-accent/50" : "hover:scale-110"),
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
                                fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                lineNumber: 380,
                                columnNumber: 17
                            }, this)
                        }, "cluster-".concat(properties.cluster_id), false, {
                            fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                            lineNumber: 370,
                            columnNumber: 15
                        }, this);
                    }
                    // It's an individual venue
                    const venue = properties.venue;
                    const isHighlighted = highlightedVenueId === venue.id;
                    // Handler for both mouse and touch interactions
                    const handleMarkerInteraction = (e)=>{
                        e.stopPropagation();
                        onSelectVenue(venue);
                        // Smart pan to ensure popup is visible
                        if (venue.longitude && venue.latitude) {
                            setTimeout(()=>ensurePopupVisible(venue.longitude, venue.latitude), 50);
                        }
                    };
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Marker"], {
                        longitude: longitude,
                        latitude: latitude,
                        anchor: "bottom",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cursor-pointer transition-transform duration-150 ".concat(isHighlighted ? "scale-150 z-10" : "hover:scale-125"),
                            onMouseEnter: handleMarkerInteraction,
                            onClick: handleMarkerInteraction,
                            onTouchStart: handleMarkerInteraction,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-7 w-7 drop-shadow-lg",
                                style: {
                                    fill: isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary))",
                                    stroke: "white",
                                    strokeWidth: 1.5
                                }
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                lineNumber: 426,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                            lineNumber: 418,
                            columnNumber: 15
                        }, this)
                    }, venue.id, false, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                        lineNumber: 417,
                        columnNumber: 13
                    }, this);
                }),
                selectedVenue && selectedVenue.latitude && selectedVenue.longitude && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$exports$2d$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Popup"], {
                    longitude: selectedVenue.longitude,
                    latitude: selectedVenue.latitude,
                    anchor: "bottom",
                    onClose: ()=>onSelectVenue(null),
                    closeOnClick: false,
                    offset: 25,
                    maxWidth: "200px",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2.5 min-w-[160px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-1 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold leading-tight line-clamp-2",
                                        children: selectedVenue.name
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                        lineNumber: 452,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$FavouriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FavouriteButton"], {
                                        listingId: selectedVenue.id,
                                        size: "sm",
                                        className: "h-5 w-5 p-0 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                        lineNumber: 453,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                lineNumber: 451,
                                columnNumber: 15
                            }, this),
                            selectedVenue.venue_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "secondary",
                                className: "text-[10px] px-1.5 py-0 mb-1.5",
                                children: selectedVenue.venue_type
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                lineNumber: 457,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-muted-foreground mb-2",
                                children: [
                                    selectedVenue.town_city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            selectedVenue.town_city,
                                            ", ",
                                            selectedVenue.country
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                        lineNumber: 464,
                                        columnNumber: 19
                                    }, this),
                                    selectedVenue.venue_capacity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                className: "h-2.5 w-2.5"
                                            }, void 0, false, {
                                                fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                                lineNumber: 470,
                                                columnNumber: 21
                                            }, this),
                                            selectedVenue.venue_capacity.toLocaleString(),
                                            " capacity"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                        lineNumber: 469,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                lineNumber: 462,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                asChild: true,
                                size: "sm",
                                className: "w-full h-7 text-xs",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$src$2f$hooks$2f$useVenueUrl$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVenueUrl"])({
                                        slug: selectedVenue.slug,
                                        country: selectedVenue.country,
                                        region_slug: selectedVenue.region_slug,
                                        town_city: selectedVenue.town_city
                                    }),
                                    children: "View Details"
                                }, void 0, false, {
                                    fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                    lineNumber: 477,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                                lineNumber: 476,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                        lineNumber: 450,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
                    lineNumber: 441,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
            lineNumber: 342,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/showcase-next/src/components/venues/VenueMap.tsx",
        lineNumber: 341,
        columnNumber: 5
    }, this);
}
_s(VenueMap, "yYsH034VP7tTx3R2N8JpD846QAQ=");
_c = VenueMap;
var _c;
__turbopack_context__.k.register(_c, "VenueMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=showcase-next_src_components_venues_VenueMap_tsx_5806f7ed._.js.map