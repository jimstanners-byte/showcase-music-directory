(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-map.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapProvider",
    ()=>MapProvider,
    "MountedMapsContext",
    ()=>MountedMapsContext,
    "useMap",
    ()=>useMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/map.js [app-client] (ecmascript)");
;
;
;
const MountedMapsContext = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
const MapProvider = (props)=>{
    const [maps, setMaps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const onMapMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapProvider.useCallback[onMapMount]": function(map) {
            let id = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'default';
            setMaps({
                "MapProvider.useCallback[onMapMount]": (currMaps)=>{
                    if (id === 'current') {
                        throw new Error("'current' cannot be used as map id");
                    }
                    if (currMaps[id]) {
                        throw new Error("Multiple maps with the same id: ".concat(id));
                    }
                    return {
                        ...currMaps,
                        [id]: map
                    };
                }
            }["MapProvider.useCallback[onMapMount]"]);
        }
    }["MapProvider.useCallback[onMapMount]"], []);
    const onMapUnmount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapProvider.useCallback[onMapUnmount]": function() {
            let id = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 'default';
            setMaps({
                "MapProvider.useCallback[onMapUnmount]": (currMaps)=>{
                    if (currMaps[id]) {
                        const nextMaps = {
                            ...currMaps
                        };
                        delete nextMaps[id];
                        return nextMaps;
                    }
                    return currMaps;
                }
            }["MapProvider.useCallback[onMapUnmount]"]);
        }
    }["MapProvider.useCallback[onMapUnmount]"], []);
    return __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](MountedMapsContext.Provider, {
        value: {
            maps,
            onMapMount,
            onMapUnmount
        }
    }, props.children);
};
function useMap() {
    var _a;
    const maps = (_a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(MountedMapsContext)) === null || _a === void 0 ? void 0 : _a.maps;
    const currentMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]);
    const mapsWithCurrent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useMap.useMemo[mapsWithCurrent]": ()=>{
            return {
                ...maps,
                current: currentMap === null || currentMap === void 0 ? void 0 : currentMap.map
            };
        }
    }["useMap.useMemo[mapsWithCurrent]"], [
        maps,
        currentMap
    ]);
    return mapsWithCurrent;
} //# sourceMappingURL=use-map.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/deep-equal.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Compare two points
 * @param a
 * @param b
 * @returns true if the points are equal
 */ __turbopack_context__.s([
    "arePointsEqual",
    ()=>arePointsEqual,
    "deepEqual",
    ()=>deepEqual
]);
function arePointsEqual(a, b) {
    const ax = Array.isArray(a) ? a[0] : a ? a.x : 0;
    const ay = Array.isArray(a) ? a[1] : a ? a.y : 0;
    const bx = Array.isArray(b) ? b[0] : b ? b.x : 0;
    const by = Array.isArray(b) ? b[1] : b ? b.y : 0;
    return ax === bx && ay === by;
}
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        for(let i = 0; i < a.length; i++){
            if (!deepEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (Array.isArray(b)) {
        return false;
    }
    if (typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        for (const key of aKeys){
            if (!b.hasOwnProperty(key)) {
                return false;
            }
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
} //# sourceMappingURL=deep-equal.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/transform.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyViewStateToTransform",
    ()=>applyViewStateToTransform,
    "cloneTransform",
    ()=>cloneTransform,
    "syncProjection",
    ()=>syncProjection,
    "transformToViewState",
    ()=>transformToViewState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/deep-equal.js [app-client] (ecmascript)");
;
function cloneTransform(tr) {
    const newTransform = tr.clone();
    // Work around mapbox bug - this value is not assigned in clone(), only in resize()
    newTransform.pixelsToGLUnits = tr.pixelsToGLUnits;
    return newTransform;
}
function syncProjection(src, dest) {
    if (!src.getProjection) {
        return;
    }
    const srcProjection = src.getProjection();
    const destProjection = dest.getProjection();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(srcProjection, destProjection)) {
        dest.setProjection(srcProjection);
    }
}
function transformToViewState(tr) {
    return {
        longitude: tr.center.lng,
        latitude: tr.center.lat,
        zoom: tr.zoom,
        pitch: tr.pitch,
        bearing: tr.bearing,
        padding: tr.padding
    };
}
function applyViewStateToTransform(tr, props) {
    const v = props.viewState || props;
    let changed = false;
    if ('longitude' in v && 'latitude' in v) {
        const center = tr.center;
        // @ts-ignore
        tr.center = new center.constructor(v.longitude, v.latitude);
        changed = changed || center !== tr.center;
    }
    if ('zoom' in v) {
        const zoom = tr.zoom;
        tr.zoom = v.zoom;
        changed = changed || zoom !== tr.zoom;
    }
    if ('bearing' in v) {
        const bearing = tr.bearing;
        tr.bearing = v.bearing;
        changed = changed || bearing !== tr.bearing;
    }
    if ('pitch' in v) {
        const pitch = tr.pitch;
        tr.pitch = v.pitch;
        changed = changed || pitch !== tr.pitch;
    }
    if (v.padding && !tr.isPaddingEqual(v.padding)) {
        changed = true;
        tr.padding = v.padding;
    }
    return changed;
} //# sourceMappingURL=transform.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/style-utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeStyle",
    ()=>normalizeStyle
]);
const refProps = [
    'type',
    'source',
    'source-layer',
    'minzoom',
    'maxzoom',
    'filter',
    'layout'
];
function normalizeStyle(style) {
    if (!style) {
        return null;
    }
    if (typeof style === 'string') {
        return style;
    }
    if ('toJS' in style) {
        style = style.toJS();
    }
    if (!style.layers) {
        return style;
    }
    const layerIndex = {};
    for (const layer of style.layers){
        layerIndex[layer.id] = layer;
    }
    const layers = style.layers.map((layer)=>{
        let normalizedLayer = null;
        if ('interactive' in layer) {
            normalizedLayer = Object.assign({}, layer);
            // Breaks style diffing :(
            // @ts-ignore legacy field not typed
            delete normalizedLayer.interactive;
        }
        // Style diffing doesn't work with refs so expand them out manually before diffing.
        // @ts-ignore legacy field not typed
        const layerRef = layerIndex[layer.ref];
        if (layerRef) {
            normalizedLayer = normalizedLayer || Object.assign({}, layer);
            // @ts-ignore
            delete normalizedLayer.ref;
            // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/deref.js
            for (const propName of refProps){
                if (propName in layerRef) {
                    normalizedLayer[propName] = layerRef[propName];
                }
            }
        }
        return normalizedLayer || layer;
    });
    // Do not mutate the style object provided by the user
    return {
        ...style,
        layers
    };
} //# sourceMappingURL=style-utils.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/mapbox/mapbox.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Mapbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/transform.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$style$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/style-utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/deep-equal.js [app-client] (ecmascript)");
;
;
;
const DEFAULT_STYLE = {
    version: 8,
    sources: {},
    layers: []
};
const pointerEvents = {
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    mouseover: 'onMouseOver',
    mousemove: 'onMouseMove',
    click: 'onClick',
    dblclick: 'onDblClick',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    mouseout: 'onMouseOut',
    contextmenu: 'onContextMenu',
    touchstart: 'onTouchStart',
    touchend: 'onTouchEnd',
    touchmove: 'onTouchMove',
    touchcancel: 'onTouchCancel'
};
const cameraEvents = {
    movestart: 'onMoveStart',
    move: 'onMove',
    moveend: 'onMoveEnd',
    dragstart: 'onDragStart',
    drag: 'onDrag',
    dragend: 'onDragEnd',
    zoomstart: 'onZoomStart',
    zoom: 'onZoom',
    zoomend: 'onZoomEnd',
    rotatestart: 'onRotateStart',
    rotate: 'onRotate',
    rotateend: 'onRotateEnd',
    pitchstart: 'onPitchStart',
    pitch: 'onPitch',
    pitchend: 'onPitchEnd'
};
const otherEvents = {
    wheel: 'onWheel',
    boxzoomstart: 'onBoxZoomStart',
    boxzoomend: 'onBoxZoomEnd',
    boxzoomcancel: 'onBoxZoomCancel',
    resize: 'onResize',
    load: 'onLoad',
    render: 'onRender',
    idle: 'onIdle',
    remove: 'onRemove',
    data: 'onData',
    styledata: 'onStyleData',
    sourcedata: 'onSourceData',
    error: 'onError'
};
const settingNames = [
    'minZoom',
    'maxZoom',
    'minPitch',
    'maxPitch',
    'maxBounds',
    'projection',
    'renderWorldCopies'
];
const handlerNames = [
    'scrollZoom',
    'boxZoom',
    'dragRotate',
    'dragPan',
    'keyboard',
    'doubleClickZoom',
    'touchZoomRotate',
    'touchPitch'
];
class Mapbox {
    get map() {
        return this._map;
    }
    get transform() {
        return this._renderTransform;
    }
    setProps(props) {
        const oldProps = this.props;
        this.props = props;
        const settingsChanged = this._updateSettings(props, oldProps);
        if (settingsChanged) {
            this._createShadowTransform(this._map);
        }
        const sizeChanged = this._updateSize(props);
        const viewStateChanged = this._updateViewState(props, true);
        this._updateStyle(props, oldProps);
        this._updateStyleComponents(props, oldProps);
        this._updateHandlers(props, oldProps);
        // If 1) view state has changed to match props and
        //    2) the props change is not triggered by map events,
        // it's driven by an external state change. Redraw immediately
        if (settingsChanged || sizeChanged || viewStateChanged && !this._map.isMoving()) {
            this.redraw();
        }
    }
    static reuse(props, container) {
        const that = Mapbox.savedMaps.pop();
        if (!that) {
            return null;
        }
        const map = that.map;
        // When reusing the saved map, we need to reparent the map(canvas) and other child nodes
        // intoto the new container from the props.
        // Step 1: reparenting child nodes from old container to new container
        const oldContainer = map.getContainer();
        container.className = oldContainer.className;
        while(oldContainer.childNodes.length > 0){
            container.appendChild(oldContainer.childNodes[0]);
        }
        // Step 2: replace the internal container with new container from the react component
        // @ts-ignore
        map._container = container;
        // With maplibre-gl as mapLib, map uses ResizeObserver to observe when its container resizes.
        // When reusing the saved map, we need to disconnect the observer and observe the new container.
        // Step 3: telling the ResizeObserver to disconnect and observe the new container
        // @ts-ignore
        const resizeObserver = map._resizeObserver;
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver.observe(container);
        }
        // Step 4: apply new props
        that.setProps({
            ...props,
            styleDiffing: false
        });
        map.resize();
        const { initialViewState } = props;
        if (initialViewState) {
            if (initialViewState.bounds) {
                map.fitBounds(initialViewState.bounds, {
                    ...initialViewState.fitBoundsOptions,
                    duration: 0
                });
            } else {
                that._updateViewState(initialViewState, false);
            }
        }
        // Simulate load event
        if (map.isStyleLoaded()) {
            map.fire('load');
        } else {
            map.once('styledata', ()=>map.fire('load'));
        }
        // Force reload
        // @ts-ignore
        map._update();
        return that;
    }
    /* eslint-disable complexity,max-statements */ _initialize(container) {
        const { props } = this;
        const { mapStyle = DEFAULT_STYLE } = props;
        const mapOptions = {
            ...props,
            ...props.initialViewState,
            accessToken: props.mapboxAccessToken || getAccessTokenFromEnv() || null,
            container,
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$style$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeStyle"])(mapStyle)
        };
        const viewState = mapOptions.initialViewState || mapOptions.viewState || mapOptions;
        Object.assign(mapOptions, {
            center: [
                viewState.longitude || 0,
                viewState.latitude || 0
            ],
            zoom: viewState.zoom || 0,
            pitch: viewState.pitch || 0,
            bearing: viewState.bearing || 0
        });
        if (props.gl) {
            // eslint-disable-next-line
            const getContext = HTMLCanvasElement.prototype.getContext;
            // Hijack canvas.getContext to return our own WebGLContext
            // This will be called inside the mapboxgl.Map constructor
            // @ts-expect-error
            HTMLCanvasElement.prototype.getContext = ()=>{
                // Unhijack immediately
                HTMLCanvasElement.prototype.getContext = getContext;
                return props.gl;
            };
        }
        const map = new this._MapClass(mapOptions);
        // Props that are not part of constructor options
        if (viewState.padding) {
            map.setPadding(viewState.padding);
        }
        if (props.cursor) {
            map.getCanvas().style.cursor = props.cursor;
        }
        this._createShadowTransform(map);
        // Hack
        // Insert code into map's render cycle
        const renderMap = map._render;
        map._render = (arg)=>{
            this._inRender = true;
            renderMap.call(map, arg);
            this._inRender = false;
        };
        const runRenderTaskQueue = map._renderTaskQueue.run;
        map._renderTaskQueue.run = (arg)=>{
            runRenderTaskQueue.call(map._renderTaskQueue, arg);
            this._onBeforeRepaint();
        };
        map.on('render', ()=>this._onAfterRepaint());
        // Insert code into map's event pipeline
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const fireEvent = map.fire;
        map.fire = this._fireEvent.bind(this, fireEvent);
        // add listeners
        map.on('resize', ()=>{
            this._renderTransform.resize(map.transform.width, map.transform.height);
        });
        map.on('styledata', ()=>{
            this._updateStyleComponents(this.props, {});
            // Projection can be set in stylesheet
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncProjection"])(map.transform, this._renderTransform);
        });
        map.on('sourcedata', ()=>this._updateStyleComponents(this.props, {}));
        for(const eventName in pointerEvents){
            map.on(eventName, this._onPointerEvent);
        }
        for(const eventName in cameraEvents){
            map.on(eventName, this._onCameraEvent);
        }
        for(const eventName in otherEvents){
            map.on(eventName, this._onEvent);
        }
        this._map = map;
    }
    /* eslint-enable complexity,max-statements */ recycle() {
        // Clean up unnecessary elements before storing for reuse.
        const container = this.map.getContainer();
        const children = container.querySelector('[mapboxgl-children]');
        children === null || children === void 0 ? void 0 : children.remove();
        Mapbox.savedMaps.push(this);
    }
    destroy() {
        this._map.remove();
    }
    // Force redraw the map now. Typically resize() and jumpTo() is reflected in the next
    // render cycle, which is managed by Mapbox's animation loop.
    // This removes the synchronization issue caused by requestAnimationFrame.
    redraw() {
        const map = this._map;
        // map._render will throw error if style does not exist
        // https://github.com/mapbox/mapbox-gl-js/blob/fb9fc316da14e99ff4368f3e4faa3888fb43c513
        //   /src/ui/map.js#L1834
        if (!this._inRender && map.style) {
            // cancel the scheduled update
            if (map._frame) {
                map._frame.cancel();
                map._frame = null;
            }
            // the order is important - render() may schedule another update
            map._render();
        }
    }
    _createShadowTransform(map) {
        const renderTransform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneTransform"])(map.transform);
        map.painter.transform = renderTransform;
        this._renderTransform = renderTransform;
    }
    /* Trigger map resize if size is controlled
       @param {object} nextProps
       @returns {bool} true if size has changed
     */ _updateSize(nextProps) {
        // Check if size is controlled
        const { viewState } = nextProps;
        if (viewState) {
            const map = this._map;
            if (viewState.width !== map.transform.width || viewState.height !== map.transform.height) {
                map.resize();
                return true;
            }
        }
        return false;
    }
    // Adapted from map.jumpTo
    /* Update camera to match props
       @param {object} nextProps
       @param {bool} triggerEvents - should fire camera events
       @returns {bool} true if anything is changed
     */ _updateViewState(nextProps, triggerEvents) {
        if (this._internalUpdate) {
            return false;
        }
        const map = this._map;
        const tr = this._renderTransform;
        // Take a snapshot of the transform before mutation
        const { zoom, pitch, bearing } = tr;
        const isMoving = map.isMoving();
        if (isMoving) {
            // All movement of the camera is done relative to the sea level
            tr.cameraElevationReference = 'sea';
        }
        const changed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyViewStateToTransform"])(tr, {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformToViewState"])(map.transform),
            ...nextProps
        });
        if (isMoving) {
            // Reset camera reference
            tr.cameraElevationReference = 'ground';
        }
        if (changed && triggerEvents) {
            const deferredEvents = this._deferredEvents;
            // Delay DOM control updates to the next render cycle
            deferredEvents.move = true;
            deferredEvents.zoom || (deferredEvents.zoom = zoom !== tr.zoom);
            deferredEvents.rotate || (deferredEvents.rotate = bearing !== tr.bearing);
            deferredEvents.pitch || (deferredEvents.pitch = pitch !== tr.pitch);
        }
        // Avoid manipulating the real transform when interaction/animation is ongoing
        // as it would interfere with Mapbox's handlers
        if (!isMoving) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyViewStateToTransform"])(map.transform, nextProps);
        }
        return changed;
    }
    /* Update camera constraints and projection settings to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */ _updateSettings(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        for (const propName of settingNames){
            if (propName in nextProps && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(nextProps[propName], currProps[propName])) {
                changed = true;
                const setter = map["set".concat(propName[0].toUpperCase()).concat(propName.slice(1))];
                setter === null || setter === void 0 ? void 0 : setter.call(map, nextProps[propName]);
            }
        }
        return changed;
    }
    /* Update map style to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if style is changed
     */ _updateStyle(nextProps, currProps) {
        if (nextProps.cursor !== currProps.cursor) {
            this._map.getCanvas().style.cursor = nextProps.cursor || '';
        }
        if (nextProps.mapStyle !== currProps.mapStyle) {
            const { mapStyle = DEFAULT_STYLE, styleDiffing = true } = nextProps;
            const options = {
                diff: styleDiffing
            };
            if ('localIdeographFontFamily' in nextProps) {
                // @ts-ignore Mapbox specific prop
                options.localIdeographFontFamily = nextProps.localIdeographFontFamily;
            }
            this._map.setStyle((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$style$2d$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeStyle"])(mapStyle), options);
            return true;
        }
        return false;
    }
    /* Update fog, light and terrain to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */ _updateStyleComponents(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        if (map.isStyleLoaded()) {
            if ('light' in nextProps && map.setLight && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(nextProps.light, currProps.light)) {
                changed = true;
                map.setLight(nextProps.light);
            }
            if ('fog' in nextProps && map.setFog && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(nextProps.fog, currProps.fog)) {
                changed = true;
                map.setFog(nextProps.fog);
            }
            if ('terrain' in nextProps && map.setTerrain && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(nextProps.terrain, currProps.terrain)) {
                if (!nextProps.terrain || map.getSource(nextProps.terrain.source)) {
                    changed = true;
                    map.setTerrain(nextProps.terrain);
                }
            }
        }
        return changed;
    }
    /* Update interaction handlers to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */ _updateHandlers(nextProps, currProps) {
        var _a, _b;
        const map = this._map;
        let changed = false;
        for (const propName of handlerNames){
            const newValue = (_a = nextProps[propName]) !== null && _a !== void 0 ? _a : true;
            const oldValue = (_b = currProps[propName]) !== null && _b !== void 0 ? _b : true;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(newValue, oldValue)) {
                changed = true;
                if (newValue) {
                    map[propName].enable(newValue);
                } else {
                    map[propName].disable();
                }
            }
        }
        return changed;
    }
    _queryRenderedFeatures(point) {
        const map = this._map;
        const tr = map.transform;
        const { interactiveLayerIds = [] } = this.props;
        try {
            map.transform = this._renderTransform;
            return map.queryRenderedFeatures(point, {
                layers: interactiveLayerIds.filter(map.getLayer.bind(map))
            });
        } catch (_a) {
            // May fail if style is not loaded
            return [];
        } finally{
            map.transform = tr;
        }
    }
    _updateHover(e) {
        var _a;
        const { props } = this;
        const shouldTrackHoveredFeatures = props.interactiveLayerIds && (props.onMouseMove || props.onMouseEnter || props.onMouseLeave);
        if (shouldTrackHoveredFeatures) {
            const eventType = e.type;
            const wasHovering = ((_a = this._hoveredFeatures) === null || _a === void 0 ? void 0 : _a.length) > 0;
            const features = this._queryRenderedFeatures(e.point);
            const isHovering = features.length > 0;
            if (!isHovering && wasHovering) {
                e.type = 'mouseleave';
                this._onPointerEvent(e);
            }
            this._hoveredFeatures = features;
            if (isHovering && !wasHovering) {
                e.type = 'mouseenter';
                this._onPointerEvent(e);
            }
            e.type = eventType;
        } else {
            this._hoveredFeatures = null;
        }
    }
    _fireEvent(baseFire, event, properties) {
        const map = this._map;
        const tr = map.transform;
        const eventType = typeof event === 'string' ? event : event.type;
        if (eventType === 'move') {
            this._updateViewState(this.props, false);
        }
        if (eventType in cameraEvents) {
            if (typeof event === 'object') {
                event.viewState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformToViewState"])(tr);
            }
            if (this._map.isMoving()) {
                // Replace map.transform with ours during the callbacks
                map.transform = this._renderTransform;
                baseFire.call(map, event, properties);
                map.transform = tr;
                return map;
            }
        }
        baseFire.call(map, event, properties);
        return map;
    }
    // All camera manipulations are complete, ready to repaint
    _onBeforeRepaint() {
        const map = this._map;
        // If there are camera changes driven by props, invoke camera events so that DOM controls are synced
        this._internalUpdate = true;
        for(const eventType in this._deferredEvents){
            if (this._deferredEvents[eventType]) {
                map.fire(eventType);
            }
        }
        this._internalUpdate = false;
        const tr = this._map.transform;
        // Make sure camera matches the current props
        map.transform = this._renderTransform;
        this._onAfterRepaint = ()=>{
            // Mapbox transitions between non-mercator projection and mercator during render time
            // Copy it back to the other
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$transform$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncProjection"])(this._renderTransform, tr);
            // Restores camera state before render/load events are fired
            map.transform = tr;
        };
    }
    constructor(MapClass, props, container){
        // mapboxgl.Map instance
        this._map = null;
        // Internal states
        this._internalUpdate = false;
        this._inRender = false;
        this._hoveredFeatures = null;
        this._deferredEvents = {
            move: false,
            zoom: false,
            pitch: false,
            rotate: false
        };
        this._onEvent = (e)=>{
            // @ts-ignore
            const cb = this.props[otherEvents[e.type]];
            if (cb) {
                cb(e);
            } else if (e.type === 'error') {
                console.error(e.error); // eslint-disable-line
            }
        };
        this._onPointerEvent = (e)=>{
            if (e.type === 'mousemove' || e.type === 'mouseout') {
                this._updateHover(e);
            }
            // @ts-ignore
            const cb = this.props[pointerEvents[e.type]];
            if (cb) {
                if (this.props.interactiveLayerIds && e.type !== 'mouseover' && e.type !== 'mouseout') {
                    e.features = this._hoveredFeatures || this._queryRenderedFeatures(e.point);
                }
                cb(e);
                delete e.features;
            }
        };
        this._onCameraEvent = (e)=>{
            if (!this._internalUpdate) {
                // @ts-ignore
                const cb = this.props[cameraEvents[e.type]];
                if (cb) {
                    cb(e);
                }
            }
            if (e.type in this._deferredEvents) {
                this._deferredEvents[e.type] = false;
            }
        };
        this._MapClass = MapClass;
        this.props = props;
        this._initialize(container);
    }
}
;
Mapbox.savedMaps = [];
/**
 * Access token can be provided via one of:
 *   mapboxAccessToken prop
 *   access_token query parameter
 *   MapboxAccessToken environment variable
 *   REACT_APP_MAPBOX_ACCESS_TOKEN environment variable
 * @returns access token
 */ function getAccessTokenFromEnv() {
    let accessToken = null;
    /* global location, process */ if (typeof location !== 'undefined') {
        const match = /access_token=([^&\/]*)/.exec(location.search);
        accessToken = match && match[1];
    }
    // Note: This depends on bundler plugins (e.g. webpack) importing environment correctly
    try {
        accessToken = accessToken || __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.MapboxAccessToken;
    } catch (_a) {
    // ignore
    }
    try {
        accessToken = accessToken || __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    } catch (_b) {
    // ignore
    }
    return accessToken;
} //# sourceMappingURL=mapbox.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/mapbox/create-ref.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** These methods may break the react binding if called directly */ __turbopack_context__.s([
    "default",
    ()=>createRef
]);
const skipMethods = [
    'setMaxBounds',
    'setMinZoom',
    'setMaxZoom',
    'setMinPitch',
    'setMaxPitch',
    'setRenderWorldCopies',
    'setProjection',
    'setStyle',
    'addSource',
    'removeSource',
    'addLayer',
    'removeLayer',
    'setLayerZoomRange',
    'setFilter',
    'setPaintProperty',
    'setLayoutProperty',
    'setLight',
    'setTerrain',
    'setFog',
    'remove'
];
function createRef(mapInstance) {
    if (!mapInstance) {
        return null;
    }
    const map = mapInstance.map;
    const result = {
        getMap: ()=>map,
        // Overwrite getters to use our shadow transform
        getCenter: ()=>mapInstance.transform.center,
        getZoom: ()=>mapInstance.transform.zoom,
        getBearing: ()=>mapInstance.transform.bearing,
        getPitch: ()=>mapInstance.transform.pitch,
        getPadding: ()=>mapInstance.transform.padding,
        getBounds: ()=>mapInstance.transform.getBounds(),
        project: (lnglat)=>{
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.project(lnglat);
            map.transform = tr;
            return result;
        },
        unproject: (point)=>{
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.unproject(point);
            map.transform = tr;
            return result;
        },
        // options diverge between mapbox and maplibre
        queryTerrainElevation: (lnglat, options)=>{
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.queryTerrainElevation(lnglat, options);
            map.transform = tr;
            return result;
        },
        queryRenderedFeatures: (geometry, options)=>{
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.queryRenderedFeatures(geometry, options);
            map.transform = tr;
            return result;
        }
    };
    for (const key of getMethodNames(map)){
        // @ts-expect-error
        if (!(key in result) && !skipMethods.includes(key)) {
            result[key] = map[key].bind(map);
        }
    }
    return result;
}
function getMethodNames(obj) {
    const result = new Set();
    let proto = obj;
    while(proto){
        for (const key of Object.getOwnPropertyNames(proto)){
            if (key[0] !== '_' && typeof obj[key] === 'function' && key !== 'fire' && key !== 'setEventedParent') {
                result.add(key);
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return Array.from(result);
} //# sourceMappingURL=create-ref.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/use-isomorphic-layout-effect.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// From https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
// useLayoutEffect but does not trigger warning in server-side rendering
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
const __TURBOPACK__default__export__ = useIsomorphicLayoutEffect;
 //# sourceMappingURL=use-isomorphic-layout-effect.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/set-globals.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>setGlobals
]);
const globalSettings = [
    'baseApiUrl',
    'maxParallelImageRequests',
    'workerClass',
    'workerCount',
    'workerUrl'
];
function setGlobals(mapLib, props) {
    for (const key of globalSettings){
        if (key in props) {
            mapLib[key] = props[key];
        }
    }
    const { RTLTextPlugin = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js' } = props;
    if (RTLTextPlugin && mapLib.getRTLTextPluginStatus && mapLib.getRTLTextPluginStatus() === 'unavailable') {
        mapLib.setRTLTextPlugin(RTLTextPlugin, (error)=>{
            if (error) {
                // eslint-disable-next-line
                console.error(error);
            }
        }, true);
    }
} //# sourceMappingURL=set-globals.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/map.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapContext",
    ()=>MapContext,
    "default",
    ()=>Map
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$mapbox$2f$mapbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/mapbox/mapbox.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$mapbox$2f$create$2d$ref$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/mapbox/create-ref.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$use$2d$isomorphic$2d$layout$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/use-isomorphic-layout-effect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$set$2d$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/set-globals.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const MapContext = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](null);
function Map(props, ref, defaultLib) {
    const mountedMapsContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MountedMapsContext"]);
    const [mapInstance, setMapInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    const { current: contextValue } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        mapLib: null,
        map: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            const mapLib = props.mapLib;
            let isMounted = true;
            let mapbox;
            Promise.resolve(mapLib || defaultLib).then({
                "Map.useEffect": (module)=>{
                    if (!isMounted) {
                        return;
                    }
                    if (!module) {
                        throw new Error('Invalid mapLib');
                    }
                    const mapboxgl = 'Map' in module ? module : module.default;
                    if (!mapboxgl.Map) {
                        throw new Error('Invalid mapLib');
                    }
                    // workerUrl & workerClass may change the result of supported()
                    // https://github.com/visgl/react-map-gl/discussions/2027
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$set$2d$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(mapboxgl, props);
                    if (!mapboxgl.supported || mapboxgl.supported(props)) {
                        if (props.reuseMaps) {
                            mapbox = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$mapbox$2f$mapbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].reuse(props, containerRef.current);
                        }
                        if (!mapbox) {
                            mapbox = new __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$mapbox$2f$mapbox$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](mapboxgl.Map, props, containerRef.current);
                        }
                        contextValue.map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$mapbox$2f$create$2d$ref$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(mapbox);
                        contextValue.mapLib = mapboxgl;
                        setMapInstance(mapbox);
                        mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapMount(contextValue.map, props.id);
                    } else {
                        throw new Error('Map is not supported by this browser');
                    }
                }
            }["Map.useEffect"]).catch({
                "Map.useEffect": (error)=>{
                    const { onError } = props;
                    if (onError) {
                        onError({
                            type: 'error',
                            target: null,
                            originalEvent: null,
                            error
                        });
                    } else {
                        console.error(error); // eslint-disable-line
                    }
                }
            }["Map.useEffect"]);
            return ({
                "Map.useEffect": ()=>{
                    isMounted = false;
                    if (mapbox) {
                        mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapUnmount(props.id);
                        if (props.reuseMaps) {
                            mapbox.recycle();
                        } else {
                            mapbox.destroy();
                        }
                    }
                }
            })["Map.useEffect"];
        }
    }["Map.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$use$2d$isomorphic$2d$layout$2d$effect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "Map.useIsomorphicLayoutEffect": ()=>{
            if (mapInstance) {
                mapInstance.setProps(props);
            }
        }
    }["Map.useIsomorphicLayoutEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "Map.useImperativeHandle": ()=>contextValue.map
    }["Map.useImperativeHandle"], [
        mapInstance
    ]);
    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Map.useMemo[style]": ()=>({
                position: 'relative',
                width: '100%',
                height: '100%',
                ...props.style
            })
    }["Map.useMemo[style]"], [
        props.style
    ]);
    const CHILD_CONTAINER_STYLE = {
        height: '100%'
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", {
        id: props.id,
        ref: containerRef,
        style: style
    }, mapInstance && __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](MapContext.Provider, {
        value: contextValue
    }, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", {
        "mapboxgl-children": "",
        style: CHILD_CONTAINER_STYLE
    }, props.children)));
} //# sourceMappingURL=map.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// This is a simplified version of
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSPropertyOperations.js#L62
__turbopack_context__.s([
    "applyReactStyle",
    ()=>applyReactStyle
]);
const unitlessNumber = /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;
function applyReactStyle(element, styles) {
    if (!element || !styles) {
        return;
    }
    const style = element.style;
    for(const key in styles){
        const value = styles[key];
        if (Number.isFinite(value) && !unitlessNumber.test(key)) {
            style[key] = "".concat(value, "px");
        } else {
            style[key] = value;
        }
    }
} //# sourceMappingURL=apply-react-style.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/marker.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* global document */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/deep-equal.js [app-client] (ecmascript)");
;
;
;
;
;
;
/* eslint-disable complexity,max-statements */ function Marker(props, ref) {
    const { map, mapLib } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]);
    const thisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        props
    });
    thisRef.current.props = props;
    const marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Marker.useMemo[marker]": ()=>{
            let hasChildren = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].forEach(props.children, {
                "Marker.useMemo[marker]": (el)=>{
                    if (el) {
                        hasChildren = true;
                    }
                }
            }["Marker.useMemo[marker]"]);
            const options = {
                ...props,
                element: hasChildren ? document.createElement('div') : null
            };
            const mk = new mapLib.Marker(options);
            mk.setLngLat([
                props.longitude,
                props.latitude
            ]);
            mk.getElement().addEventListener('click', {
                "Marker.useMemo[marker]": (e)=>{
                    var _a, _b;
                    (_b = (_a = thisRef.current.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, {
                        type: 'click',
                        target: mk,
                        originalEvent: e
                    });
                }
            }["Marker.useMemo[marker]"]);
            mk.on('dragstart', {
                "Marker.useMemo[marker]": (e)=>{
                    var _a, _b;
                    const evt = e;
                    evt.lngLat = marker.getLngLat();
                    (_b = (_a = thisRef.current.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
                }
            }["Marker.useMemo[marker]"]);
            mk.on('drag', {
                "Marker.useMemo[marker]": (e)=>{
                    var _a, _b;
                    const evt = e;
                    evt.lngLat = marker.getLngLat();
                    (_b = (_a = thisRef.current.props).onDrag) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
                }
            }["Marker.useMemo[marker]"]);
            mk.on('dragend', {
                "Marker.useMemo[marker]": (e)=>{
                    var _a, _b;
                    const evt = e;
                    evt.lngLat = marker.getLngLat();
                    (_b = (_a = thisRef.current.props).onDragEnd) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
                }
            }["Marker.useMemo[marker]"]);
            return mk;
        }
    }["Marker.useMemo[marker]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Marker.useEffect": ()=>{
            marker.addTo(map.getMap());
            return ({
                "Marker.useEffect": ()=>{
                    marker.remove();
                }
            })["Marker.useEffect"];
        }
    }["Marker.useEffect"], []);
    const { longitude, latitude, offset, style, draggable = false, popup = null, rotation = 0, rotationAlignment = 'auto', pitchAlignment = 'auto' } = props;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Marker.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(marker.getElement(), style);
        }
    }["Marker.useEffect"], [
        style
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "Marker.useImperativeHandle": ()=>marker
    }["Marker.useImperativeHandle"], []);
    if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
        marker.setLngLat([
            longitude,
            latitude
        ]);
    }
    if (offset && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arePointsEqual"])(marker.getOffset(), offset)) {
        marker.setOffset(offset);
    }
    if (marker.isDraggable() !== draggable) {
        marker.setDraggable(draggable);
    }
    if (marker.getRotation() !== rotation) {
        marker.setRotation(rotation);
    }
    if (marker.getRotationAlignment() !== rotationAlignment) {
        marker.setRotationAlignment(rotationAlignment);
    }
    if (marker.getPitchAlignment() !== pitchAlignment) {
        marker.setPitchAlignment(pitchAlignment);
    }
    if (marker.getPopup() !== popup) {
        marker.setPopup(popup);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(props.children, marker.getElement());
}
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(Marker));
 //# sourceMappingURL=marker.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/popup.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/deep-equal.js [app-client] (ecmascript)");
;
;
;
;
;
// Adapted from https://github.com/mapbox/mapbox-gl-js/blob/v1.13.0/src/ui/popup.js
function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
}
/* eslint-disable complexity,max-statements */ function Popup(props, ref) {
    const { map, mapLib } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]);
    const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Popup.useMemo[container]": ()=>{
            return document.createElement('div');
        }
    }["Popup.useMemo[container]"], []);
    const thisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        props
    });
    thisRef.current.props = props;
    const popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Popup.useMemo[popup]": ()=>{
            const options = {
                ...props
            };
            const pp = new mapLib.Popup(options);
            pp.setLngLat([
                props.longitude,
                props.latitude
            ]);
            pp.once('open', {
                "Popup.useMemo[popup]": (e)=>{
                    var _a, _b;
                    (_b = (_a = thisRef.current.props).onOpen) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                }
            }["Popup.useMemo[popup]"]);
            return pp;
        }
    }["Popup.useMemo[popup]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Popup.useEffect": ()=>{
            const onClose = {
                "Popup.useEffect.onClose": (e)=>{
                    var _a, _b;
                    (_b = (_a = thisRef.current.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                }
            }["Popup.useEffect.onClose"];
            popup.on('close', onClose);
            popup.setDOMContent(container).addTo(map.getMap());
            return ({
                "Popup.useEffect": ()=>{
                    // https://github.com/visgl/react-map-gl/issues/1825
                    // onClose should not be fired if the popup is removed by unmounting
                    // When using React strict mode, the component is mounted twice.
                    // Firing the onClose callback here would be a false signal to remove the component.
                    popup.off('close', onClose);
                    if (popup.isOpen()) {
                        popup.remove();
                    }
                }
            })["Popup.useEffect"];
        }
    }["Popup.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Popup.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(popup.getElement(), props.style);
        }
    }["Popup.useEffect"], [
        props.style
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "Popup.useImperativeHandle": ()=>popup
    }["Popup.useImperativeHandle"], []);
    if (popup.isOpen()) {
        if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
            popup.setLngLat([
                props.longitude,
                props.latitude
            ]);
        }
        if (props.offset && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(popup.options.offset, props.offset)) {
            popup.setOffset(props.offset);
        }
        if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
            popup.options.anchor = props.anchor;
            popup.setMaxWidth(props.maxWidth);
        }
        if (popup.options.className !== props.className) {
            const prevClassList = getClassList(popup.options.className);
            const nextClassList = getClassList(props.className);
            for (const c of prevClassList){
                if (!nextClassList.has(c)) {
                    popup.removeClassName(c);
                }
            }
            for (const c of nextClassList){
                if (!prevClassList.has(c)) {
                    popup.addClassName(c);
                }
            }
            popup.options.className = props.className;
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(props.children, container);
}
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(Popup));
 //# sourceMappingURL=popup.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/map.js [app-client] (ecmascript)");
;
;
function useControl(onCreate, arg1, arg2, arg3) {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]);
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useControl.useMemo[ctrl]": ()=>onCreate(context)
    }["useControl.useMemo[ctrl]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useControl.useEffect": ()=>{
            const opts = arg3 || arg2 || arg1;
            const onAdd = typeof arg1 === 'function' && typeof arg2 === 'function' ? arg1 : null;
            const onRemove = typeof arg2 === 'function' ? arg2 : typeof arg1 === 'function' ? arg1 : null;
            const { map } = context;
            if (!map.hasControl(ctrl)) {
                map.addControl(ctrl, opts === null || opts === void 0 ? void 0 : opts.position);
                if (onAdd) {
                    onAdd(context);
                }
            }
            return ({
                "useControl.useEffect": ()=>{
                    if (onRemove) {
                        onRemove(context);
                    }
                    // Map might have been removed (parent effects are destroyed before child ones)
                    if (map.hasControl(ctrl)) {
                        map.removeControl(ctrl);
                    }
                }
            })["useControl.useEffect"];
        }
    }["useControl.useEffect"], []);
    return ctrl;
}
const __TURBOPACK__default__export__ = useControl;
 //# sourceMappingURL=use-control.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/attribution-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-control.js [app-client] (ecmascript)");
;
;
;
function AttributionControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "AttributionControl.useControl[ctrl]": (param)=>{
            let { mapLib } = param;
            return new mapLib.AttributionControl(props);
        }
    }["AttributionControl.useControl[ctrl]"], {
        position: props.position
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AttributionControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, props.style);
        }
    }["AttributionControl.useEffect"], [
        props.style
    ]);
    return null;
}
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(AttributionControl);
 //# sourceMappingURL=attribution-control.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/fullscreen-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-control.js [app-client] (ecmascript)");
;
;
;
function FullscreenControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "FullscreenControl.useControl[ctrl]": (param)=>{
            let { mapLib } = param;
            return new mapLib.FullscreenControl({
                container: props.containerId && document.getElementById(props.containerId)
            });
        }
    }["FullscreenControl.useControl[ctrl]"], {
        position: props.position
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FullscreenControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._controlContainer, props.style);
        }
    }["FullscreenControl.useEffect"], [
        props.style
    ]);
    return null;
}
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(FullscreenControl);
 //# sourceMappingURL=fullscreen-control.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/geolocate-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-control.js [app-client] (ecmascript)");
;
;
;
function GeolocateControl(props, ref) {
    const thisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        props
    });
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "GeolocateControl.useControl[ctrl]": (param)=>{
            let { mapLib } = param;
            const gc = new mapLib.GeolocateControl(props);
            // Hack: fix GeolocateControl reuse
            // When using React strict mode, the component is mounted twice.
            // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
            // @ts-expect-error private method
            const setupUI = gc._setupUI;
            // @ts-expect-error private method
            gc._setupUI = ({
                "GeolocateControl.useControl[ctrl]": (args)=>{
                    if (!gc._container.hasChildNodes()) {
                        setupUI(args);
                    }
                }
            })["GeolocateControl.useControl[ctrl]"];
            gc.on('geolocate', {
                "GeolocateControl.useControl[ctrl]": (e)=>{
                    var _a, _b;
                    (_b = (_a = thisRef.current.props).onGeolocate) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                }
            }["GeolocateControl.useControl[ctrl]"]);
            gc.on('error', {
                "GeolocateControl.useControl[ctrl]": (e)=>{
                    var _a, _b;
                    (_b = (_a = thisRef.current.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                }
            }["GeolocateControl.useControl[ctrl]"]);
            gc.on('outofmaxbounds', {
                "GeolocateControl.useControl[ctrl]": (e)=>{
                    var _a, _b;
                    (_b = (_a = thisRef.current.props).onOutOfMaxBounds) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                }
            }["GeolocateControl.useControl[ctrl]"]);
            gc.on('trackuserlocationstart', {
                "GeolocateControl.useControl[ctrl]": (e)=>{
                    var _a, _b;
                    (_b = (_a = thisRef.current.props).onTrackUserLocationStart) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                }
            }["GeolocateControl.useControl[ctrl]"]);
            gc.on('trackuserlocationend', {
                "GeolocateControl.useControl[ctrl]": (e)=>{
                    var _a, _b;
                    (_b = (_a = thisRef.current.props).onTrackUserLocationEnd) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                }
            }["GeolocateControl.useControl[ctrl]"]);
            return gc;
        }
    }["GeolocateControl.useControl[ctrl]"], {
        position: props.position
    });
    thisRef.current.props = props;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "GeolocateControl.useImperativeHandle": ()=>ctrl
    }["GeolocateControl.useImperativeHandle"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GeolocateControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, props.style);
        }
    }["GeolocateControl.useEffect"], [
        props.style
    ]);
    return null;
}
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(GeolocateControl));
 //# sourceMappingURL=geolocate-control.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/navigation-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-control.js [app-client] (ecmascript)");
;
;
;
function NavigationControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "NavigationControl.useControl[ctrl]": (param)=>{
            let { mapLib } = param;
            return new mapLib.NavigationControl(props);
        }
    }["NavigationControl.useControl[ctrl]"], {
        position: props.position
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavigationControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, props.style);
        }
    }["NavigationControl.useEffect"], [
        props.style
    ]);
    return null;
}
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(NavigationControl);
 //# sourceMappingURL=navigation-control.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/scale-control.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/apply-react-style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-control.js [app-client] (ecmascript)");
;
;
;
function ScaleControl(props) {
    const ctrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        "ScaleControl.useControl[ctrl]": (param)=>{
            let { mapLib } = param;
            return new mapLib.ScaleControl(props);
        }
    }["ScaleControl.useControl[ctrl]"], {
        position: props.position
    });
    const propsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(props);
    const prevProps = propsRef.current;
    propsRef.current = props;
    const { style } = props;
    if (props.maxWidth !== undefined && props.maxWidth !== prevProps.maxWidth) {
        ctrl.options.maxWidth = props.maxWidth;
    }
    if (props.unit !== undefined && props.unit !== prevProps.unit) {
        ctrl.setUnit(props.unit);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScaleControl.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$apply$2d$react$2d$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyReactStyle"])(ctrl._container, style);
        }
    }["ScaleControl.useEffect"], [
        style
    ]);
    return null;
}
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(ScaleControl);
 //# sourceMappingURL=scale-control.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/assert.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>assert
]);
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
} //# sourceMappingURL=assert.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/layer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/deep-equal.js [app-client] (ecmascript)");
;
;
;
;
/* eslint-disable complexity, max-statements */ function updateLayer(map, id, props, prevProps) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props.id === prevProps.id, 'layer id changed');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props.type === prevProps.type, 'layer type changed');
    if (props.type === 'custom' || prevProps.type === 'custom') {
        return;
    }
    const { layout = {}, paint = {}, filter, minzoom, maxzoom, beforeId } = props;
    if (beforeId !== prevProps.beforeId) {
        map.moveLayer(id, beforeId);
    }
    if (layout !== prevProps.layout) {
        const prevLayout = prevProps.layout || {};
        for(const key in layout){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(layout[key], prevLayout[key])) {
                map.setLayoutProperty(id, key, layout[key]);
            }
        }
        for(const key in prevLayout){
            if (!layout.hasOwnProperty(key)) {
                map.setLayoutProperty(id, key, undefined);
            }
        }
    }
    if (paint !== prevProps.paint) {
        const prevPaint = prevProps.paint || {};
        for(const key in paint){
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(paint[key], prevPaint[key])) {
                map.setPaintProperty(id, key, paint[key]);
            }
        }
        for(const key in prevPaint){
            if (!paint.hasOwnProperty(key)) {
                map.setPaintProperty(id, key, undefined);
            }
        }
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(filter, prevProps.filter)) {
        map.setFilter(id, filter);
    }
    if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
        map.setLayerZoomRange(id, minzoom, maxzoom);
    }
}
function createLayer(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded && (!('source' in props) || map.getSource(props.source))) {
        const options = {
            ...props,
            id
        };
        delete options.beforeId;
        // @ts-ignore
        map.addLayer(options, props.beforeId);
    }
}
/* eslint-enable complexity, max-statements */ let layerCounter = 0;
function Layer(props) {
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]).map.getMap();
    const propsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(props);
    const [, setStyleLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Layer.useMemo[id]": ()=>props.id || "jsx-layer-".concat(layerCounter++)
    }["Layer.useMemo[id]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Layer.useEffect": ()=>{
            if (map) {
                const forceUpdate = {
                    "Layer.useEffect.forceUpdate": ()=>setStyleLoaded({
                            "Layer.useEffect.forceUpdate": (version)=>version + 1
                        }["Layer.useEffect.forceUpdate"])
                }["Layer.useEffect.forceUpdate"];
                map.on('styledata', forceUpdate);
                forceUpdate();
                return ({
                    "Layer.useEffect": ()=>{
                        map.off('styledata', forceUpdate);
                        // @ts-ignore
                        if (map.style && map.style._loaded && map.getLayer(id)) {
                            map.removeLayer(id);
                        }
                    }
                })["Layer.useEffect"];
            }
            return undefined;
        }
    }["Layer.useEffect"], [
        map
    ]);
    // @ts-ignore
    const layer = map && map.style && map.getLayer(id);
    if (layer) {
        try {
            updateLayer(map, id, props, propsRef.current);
        } catch (error) {
            console.warn(error); // eslint-disable-line
        }
    } else {
        createLayer(map, id, props);
    }
    // Store last rendered props
    propsRef.current = props;
    return null;
}
const __TURBOPACK__default__export__ = Layer;
 //# sourceMappingURL=layer.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/source.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/utils/deep-equal.js [app-client] (ecmascript)");
;
;
;
;
;
;
let sourceCounter = 0;
function createSource(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded) {
        const options = {
            ...props
        };
        delete options.id;
        delete options.children;
        // @ts-ignore
        map.addSource(id, options);
        return map.getSource(id);
    }
    return null;
}
/* eslint-disable complexity */ function updateSource(source, props, prevProps) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props.id === prevProps.id, 'source id changed');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props.type === prevProps.type, 'source type changed');
    let changedKey = '';
    let changedKeyCount = 0;
    for(const key in props){
        if (key !== 'children' && key !== 'id' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$utils$2f$deep$2d$equal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deepEqual"])(prevProps[key], props[key])) {
            changedKey = key;
            changedKeyCount++;
        }
    }
    if (!changedKeyCount) {
        return;
    }
    const type = props.type;
    if (type === 'geojson') {
        source.setData(props.data);
    } else if (type === 'image') {
        source.updateImage({
            url: props.url,
            coordinates: props.coordinates
        });
    } else if ('setCoordinates' in source && changedKeyCount === 1 && changedKey === 'coordinates') {
        source.setCoordinates(props.coordinates);
    } else if ('setUrl' in source) {
        // Added in 1.12.0:
        // vectorTileSource.setTiles
        // vectorTileSource.setUrl
        switch(changedKey){
            case 'url':
                source.setUrl(props.url);
                break;
            case 'tiles':
                source.setTiles(props.tiles);
                break;
            default:
        }
    } else {
        // eslint-disable-next-line
        console.warn("Unable to update <Source> prop: ".concat(changedKey));
    }
}
/* eslint-enable complexity */ function Source(props) {
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContext"]).map.getMap();
    const propsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(props);
    const [, setStyleLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Source.useMemo[id]": ()=>props.id || "jsx-source-".concat(sourceCounter++)
    }["Source.useMemo[id]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Source.useEffect": ()=>{
            if (map) {
                /* global setTimeout */ const forceUpdate = {
                    "Source.useEffect.forceUpdate": ()=>setTimeout({
                            "Source.useEffect.forceUpdate": ()=>setStyleLoaded({
                                    "Source.useEffect.forceUpdate": (version)=>version + 1
                                }["Source.useEffect.forceUpdate"])
                        }["Source.useEffect.forceUpdate"], 0)
                }["Source.useEffect.forceUpdate"];
                map.on('styledata', forceUpdate);
                forceUpdate();
                return ({
                    "Source.useEffect": ()=>{
                        var _a;
                        map.off('styledata', forceUpdate);
                        // @ts-ignore
                        if (map.style && map.style._loaded && map.getSource(id)) {
                            // Parent effects are destroyed before child ones, see
                            // https://github.com/facebook/react/issues/16728
                            // Source can only be removed after all child layers are removed
                            const allLayers = (_a = map.getStyle()) === null || _a === void 0 ? void 0 : _a.layers;
                            if (allLayers) {
                                for (const layer of allLayers){
                                    // @ts-ignore (2339) source does not exist on all layer types
                                    if (layer.source === id) {
                                        map.removeLayer(layer.id);
                                    }
                                }
                            }
                            map.removeSource(id);
                        }
                    }
                })["Source.useEffect"];
            }
            return undefined;
        }
    }["Source.useEffect"], [
        map
    ]);
    // @ts-ignore
    let source = map && map.style && map.getSource(id);
    if (source) {
        updateSource(source, props, propsRef.current);
    } else {
        source = createSource(map, id, props);
    }
    propsRef.current = props;
    return source && __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].map(props.children, (child)=>child && (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"])(child, {
            source: id
        })) || null;
}
const __TURBOPACK__default__export__ = Source;
 //# sourceMappingURL=source.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/types/public.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=public.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/types/style-spec-maplibre.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=style-spec-maplibre.js.map
}),
"[project]/showcase-next/node_modules/react-map-gl/dist/esm/exports-maplibre.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AttributionControl",
    ()=>AttributionControl,
    "FullscreenControl",
    ()=>FullscreenControl,
    "GeolocateControl",
    ()=>GeolocateControl,
    "Layer",
    ()=>Layer,
    "Map",
    ()=>Map,
    "Marker",
    ()=>Marker,
    "NavigationControl",
    ()=>NavigationControl,
    "Popup",
    ()=>Popup,
    "ScaleControl",
    ()=>ScaleControl,
    "Source",
    ()=>Source,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useMap",
    ()=>useMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$attribution$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/attribution-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$fullscreen$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/fullscreen-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$geolocate$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/geolocate-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$navigation$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/navigation-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$scale$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/scale-control.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$layer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/layer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/source.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/components/use-control.js [app-client] (ecmascript)");
// Types
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$types$2f$public$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/types/public.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$types$2f$style$2d$spec$2d$maplibre$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/react-map-gl/dist/esm/types/style-spec-maplibre.js [app-client] (ecmascript)"); //# sourceMappingURL=exports-maplibre.js.map
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
function useMap() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$use$2d$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
}
const mapLib = __turbopack_context__.A("[project]/showcase-next/node_modules/maplibre-gl/dist/maplibre-gl.js [app-client] (ecmascript, async loader)");
const Map = (()=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](function Map(props, ref) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(props, ref, mapLib);
    });
})();
const Marker = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const Popup = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const AttributionControl = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$attribution$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const FullscreenControl = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$fullscreen$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const NavigationControl = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$navigation$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const GeolocateControl = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$geolocate$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const ScaleControl = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$scale$2d$control$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const Layer = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$layer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
const Source = __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$react$2d$map$2d$gl$2f$dist$2f$esm$2f$components$2f$source$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
;
;
const __TURBOPACK__default__export__ = Map;
;
;
}),
"[project]/showcase-next/node_modules/kdbush/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>KDBush
]);
const ARRAY_TYPES = [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
];
/** @typedef {Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor} TypedArrayConstructor */ const VERSION = 1; // serialized format version
const HEADER_SIZE = 8;
class KDBush {
    /**
     * Creates an index from raw `ArrayBuffer` data.
     * @param {ArrayBuffer} data
     */ static from(data) {
        if (!(data instanceof ArrayBuffer)) {
            throw new Error('Data must be an instance of ArrayBuffer.');
        }
        const [magic, versionAndType] = new Uint8Array(data, 0, 2);
        if (magic !== 0xdb) {
            throw new Error('Data does not appear to be in a KDBush format.');
        }
        const version = versionAndType >> 4;
        if (version !== VERSION) {
            throw new Error("Got v".concat(version, " data when expected v").concat(VERSION, "."));
        }
        const ArrayType = ARRAY_TYPES[versionAndType & 0x0f];
        if (!ArrayType) {
            throw new Error('Unrecognized array type.');
        }
        const [nodeSize] = new Uint16Array(data, 2, 1);
        const [numItems] = new Uint32Array(data, 4, 1);
        return new KDBush(numItems, nodeSize, ArrayType, data);
    }
    /**
     * Add a point to the index.
     * @param {number} x
     * @param {number} y
     * @returns {number} An incremental index associated with the added item (starting from `0`).
     */ add(x, y) {
        const index = this._pos >> 1;
        this.ids[index] = index;
        this.coords[this._pos++] = x;
        this.coords[this._pos++] = y;
        return index;
    }
    /**
     * Perform indexing of the added points.
     */ finish() {
        const numAdded = this._pos >> 1;
        if (numAdded !== this.numItems) {
            throw new Error("Added ".concat(numAdded, " items when expected ").concat(this.numItems, "."));
        }
        // kd-sort both arrays for efficient search
        sort(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0);
        this._finished = true;
        return this;
    }
    /**
     * Search the index for items within a given bounding box.
     * @param {number} minX
     * @param {number} minY
     * @param {number} maxX
     * @param {number} maxY
     * @returns {number[]} An array of indices correponding to the found items.
     */ range(minX, minY, maxX, maxY) {
        if (!this._finished) throw new Error('Data not yet indexed - call index.finish().');
        const { ids, coords, nodeSize } = this;
        const stack = [
            0,
            ids.length - 1,
            0
        ];
        const result = [];
        // recursively search for items in range in the kd-sorted arrays
        while(stack.length){
            const axis = stack.pop() || 0;
            const right = stack.pop() || 0;
            const left = stack.pop() || 0;
            // if we reached "tree node", search linearly
            if (right - left <= nodeSize) {
                for(let i = left; i <= right; i++){
                    const x = coords[2 * i];
                    const y = coords[2 * i + 1];
                    if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
                }
                continue;
            }
            // otherwise find the middle index
            const m = left + right >> 1;
            // include the middle item if it's in range
            const x = coords[2 * m];
            const y = coords[2 * m + 1];
            if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
            // queue search in halves that intersect the query
            if (axis === 0 ? minX <= x : minY <= y) {
                stack.push(left);
                stack.push(m - 1);
                stack.push(1 - axis);
            }
            if (axis === 0 ? maxX >= x : maxY >= y) {
                stack.push(m + 1);
                stack.push(right);
                stack.push(1 - axis);
            }
        }
        return result;
    }
    /**
     * Search the index for items within a given radius.
     * @param {number} qx
     * @param {number} qy
     * @param {number} r Query radius.
     * @returns {number[]} An array of indices correponding to the found items.
     */ within(qx, qy, r) {
        if (!this._finished) throw new Error('Data not yet indexed - call index.finish().');
        const { ids, coords, nodeSize } = this;
        const stack = [
            0,
            ids.length - 1,
            0
        ];
        const result = [];
        const r2 = r * r;
        // recursively search for items within radius in the kd-sorted arrays
        while(stack.length){
            const axis = stack.pop() || 0;
            const right = stack.pop() || 0;
            const left = stack.pop() || 0;
            // if we reached "tree node", search linearly
            if (right - left <= nodeSize) {
                for(let i = left; i <= right; i++){
                    if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
                }
                continue;
            }
            // otherwise find the middle index
            const m = left + right >> 1;
            // include the middle item if it's in range
            const x = coords[2 * m];
            const y = coords[2 * m + 1];
            if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
            // queue search in halves that intersect the query
            if (axis === 0 ? qx - r <= x : qy - r <= y) {
                stack.push(left);
                stack.push(m - 1);
                stack.push(1 - axis);
            }
            if (axis === 0 ? qx + r >= x : qy + r >= y) {
                stack.push(m + 1);
                stack.push(right);
                stack.push(1 - axis);
            }
        }
        return result;
    }
    /**
     * Creates an index that will hold a given number of items.
     * @param {number} numItems
     * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
     * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
     * @param {ArrayBuffer} [data] (For internal use only)
     */ constructor(numItems, nodeSize = 64, ArrayType = Float64Array, data){
        if (isNaN(numItems) || numItems < 0) throw new Error("Unpexpected numItems value: ".concat(numItems, "."));
        this.numItems = +numItems;
        this.nodeSize = Math.min(Math.max(+nodeSize, 2), 65535);
        this.ArrayType = ArrayType;
        this.IndexArrayType = numItems < 65536 ? Uint16Array : Uint32Array;
        const arrayTypeIndex = ARRAY_TYPES.indexOf(this.ArrayType);
        const coordsByteSize = numItems * 2 * this.ArrayType.BYTES_PER_ELEMENT;
        const idsByteSize = numItems * this.IndexArrayType.BYTES_PER_ELEMENT;
        const padCoords = (8 - idsByteSize % 8) % 8;
        if (arrayTypeIndex < 0) {
            throw new Error("Unexpected typed array class: ".concat(ArrayType, "."));
        }
        if (data && data instanceof ArrayBuffer) {
            this.data = data;
            this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
            this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
            this._pos = numItems * 2;
            this._finished = true;
        } else {
            this.data = new ArrayBuffer(HEADER_SIZE + coordsByteSize + idsByteSize + padCoords);
            this.ids = new this.IndexArrayType(this.data, HEADER_SIZE, numItems);
            this.coords = new this.ArrayType(this.data, HEADER_SIZE + idsByteSize + padCoords, numItems * 2);
            this._pos = 0;
            this._finished = false;
            // set header
            new Uint8Array(this.data, 0, 2).set([
                0xdb,
                (VERSION << 4) + arrayTypeIndex
            ]);
            new Uint16Array(this.data, 2, 1)[0] = nodeSize;
            new Uint32Array(this.data, 4, 1)[0] = numItems;
        }
    }
}
;
/**
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} nodeSize
 * @param {number} left
 * @param {number} right
 * @param {number} axis
 */ function sort(ids, coords, nodeSize, left, right, axis) {
    if (right - left <= nodeSize) return;
    const m = left + right >> 1; // middle index
    // sort ids and coords around the middle index so that the halves lie
    // either left/right or top/bottom correspondingly (taking turns)
    select(ids, coords, m, left, right, axis);
    // recursively kd-sort first half and second half on the opposite axis
    sort(ids, coords, nodeSize, left, m - 1, 1 - axis);
    sort(ids, coords, nodeSize, m + 1, right, 1 - axis);
}
/**
 * Custom Floyd-Rivest selection algorithm: sort ids and coords so that
 * [left..k-1] items are smaller than k-th item (on either x or y axis)
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} k
 * @param {number} left
 * @param {number} right
 * @param {number} axis
 */ function select(ids, coords, k, left, right, axis) {
    while(right > left){
        if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, axis);
        }
        const t = coords[2 * k + axis];
        let i = left;
        let j = right;
        swapItem(ids, coords, left, k);
        if (coords[2 * right + axis] > t) swapItem(ids, coords, left, right);
        while(i < j){
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while(coords[2 * i + axis] < t)i++;
            while(coords[2 * j + axis] > t)j--;
        }
        if (coords[2 * left + axis] === t) swapItem(ids, coords, left, j);
        else {
            j++;
            swapItem(ids, coords, j, right);
        }
        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}
/**
 * @param {Uint16Array | Uint32Array} ids
 * @param {InstanceType<TypedArrayConstructor>} coords
 * @param {number} i
 * @param {number} j
 */ function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}
/**
 * @param {InstanceType<TypedArrayConstructor>} arr
 * @param {number} i
 * @param {number} j
 */ function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
/**
 * @param {number} ax
 * @param {number} ay
 * @param {number} bx
 * @param {number} by
 */ function sqDist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}
}),
"[project]/showcase-next/node_modules/supercluster/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Supercluster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$kdbush$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/showcase-next/node_modules/kdbush/index.js [app-client] (ecmascript)");
;
const defaultOptions = {
    minZoom: 0,
    maxZoom: 16,
    minPoints: 2,
    radius: 40,
    extent: 512,
    nodeSize: 64,
    log: false,
    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,
    // a reduce function for calculating custom cluster properties
    reduce: null,
    // properties to use for individual points when running the reducer
    map: (props)=>props // props => ({sum: props.my_value})
};
const fround = Math.fround || ((tmp)=>(x)=>{
        tmp[0] = +x;
        return tmp[0];
    })(new Float32Array(1));
const OFFSET_ZOOM = 2;
const OFFSET_ID = 3;
const OFFSET_PARENT = 4;
const OFFSET_NUM = 5;
const OFFSET_PROP = 6;
class Supercluster {
    load(points) {
        const { log, minZoom, maxZoom } = this.options;
        if (log) console.time('total time');
        const timerId = "prepare ".concat(points.length, " points");
        if (log) console.time(timerId);
        this.points = points;
        // generate a cluster object for each point and index input points into a KD-tree
        const data = [];
        for(let i = 0; i < points.length; i++){
            const p = points[i];
            if (!p.geometry) continue;
            const [lng, lat] = p.geometry.coordinates;
            const x = fround(lngX(lng));
            const y = fround(latY(lat));
            // store internal point/cluster data in flat numeric arrays for performance
            data.push(x, y, Infinity, i, -1, 1 // number of points in a cluster
            );
            if (this.options.reduce) data.push(0); // noop
        }
        let tree = this.trees[maxZoom + 1] = this._createTree(data);
        if (log) console.timeEnd(timerId);
        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for(let z = maxZoom; z >= minZoom; z--){
            const now = +Date.now();
            // create a new set of clusters for the zoom and index them with a KD-tree
            tree = this.trees[z] = this._createTree(this._cluster(tree, z));
            if (log) console.log('z%d: %d clusters in %dms', z, tree.numItems, +Date.now() - now);
        }
        if (log) console.timeEnd('total time');
        return this;
    }
    getClusters(bbox, zoom) {
        let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
        const minLat = Math.max(-90, Math.min(90, bbox[1]));
        let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
        const maxLat = Math.max(-90, Math.min(90, bbox[3]));
        if (bbox[2] - bbox[0] >= 360) {
            minLng = -180;
            maxLng = 180;
        } else if (minLng > maxLng) {
            const easternHem = this.getClusters([
                minLng,
                minLat,
                180,
                maxLat
            ], zoom);
            const westernHem = this.getClusters([
                -180,
                minLat,
                maxLng,
                maxLat
            ], zoom);
            return easternHem.concat(westernHem);
        }
        const tree = this.trees[this._limitZoom(zoom)];
        const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
        const data = tree.data;
        const clusters = [];
        for (const id of ids){
            const k = this.stride * id;
            clusters.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
        }
        return clusters;
    }
    getChildren(clusterId) {
        const originId = this._getOriginId(clusterId);
        const originZoom = this._getOriginZoom(clusterId);
        const errorMsg = 'No cluster with the specified id.';
        const tree = this.trees[originZoom];
        if (!tree) throw new Error(errorMsg);
        const data = tree.data;
        if (originId * this.stride >= data.length) throw new Error(errorMsg);
        const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
        const x = data[originId * this.stride];
        const y = data[originId * this.stride + 1];
        const ids = tree.within(x, y, r);
        const children = [];
        for (const id of ids){
            const k = id * this.stride;
            if (data[k + OFFSET_PARENT] === clusterId) {
                children.push(data[k + OFFSET_NUM] > 1 ? getClusterJSON(data, k, this.clusterProps) : this.points[data[k + OFFSET_ID]]);
            }
        }
        if (children.length === 0) throw new Error(errorMsg);
        return children;
    }
    getLeaves(clusterId, limit, offset) {
        limit = limit || 10;
        offset = offset || 0;
        const leaves = [];
        this._appendLeaves(leaves, clusterId, limit, offset, 0);
        return leaves;
    }
    getTile(z, x, y) {
        const tree = this.trees[this._limitZoom(z)];
        const z2 = Math.pow(2, z);
        const { extent, radius } = this.options;
        const p = radius / extent;
        const top = (y - p) / z2;
        const bottom = (y + 1 + p) / z2;
        const tile = {
            features: []
        };
        this._addTileFeatures(tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom), tree.data, x, y, z2, tile);
        if (x === 0) {
            this._addTileFeatures(tree.range(1 - p / z2, top, 1, bottom), tree.data, z2, y, z2, tile);
        }
        if (x === z2 - 1) {
            this._addTileFeatures(tree.range(0, top, p / z2, bottom), tree.data, -1, y, z2, tile);
        }
        return tile.features.length ? tile : null;
    }
    getClusterExpansionZoom(clusterId) {
        let expansionZoom = this._getOriginZoom(clusterId) - 1;
        while(expansionZoom <= this.options.maxZoom){
            const children = this.getChildren(clusterId);
            expansionZoom++;
            if (children.length !== 1) break;
            clusterId = children[0].properties.cluster_id;
        }
        return expansionZoom;
    }
    _appendLeaves(result, clusterId, limit, offset, skipped) {
        const children = this.getChildren(clusterId);
        for (const child of children){
            const props = child.properties;
            if (props && props.cluster) {
                if (skipped + props.point_count <= offset) {
                    // skip the whole cluster
                    skipped += props.point_count;
                } else {
                    // enter the cluster
                    skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                // exit the cluster
                }
            } else if (skipped < offset) {
                // skip a single point
                skipped++;
            } else {
                // add a single point
                result.push(child);
            }
            if (result.length === limit) break;
        }
        return skipped;
    }
    _createTree(data) {
        const tree = new __TURBOPACK__imported__module__$5b$project$5d2f$showcase$2d$next$2f$node_modules$2f$kdbush$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](data.length / this.stride | 0, this.options.nodeSize, Float32Array);
        for(let i = 0; i < data.length; i += this.stride)tree.add(data[i], data[i + 1]);
        tree.finish();
        tree.data = data;
        return tree;
    }
    _addTileFeatures(ids, data, x, y, z2, tile) {
        for (const i of ids){
            const k = i * this.stride;
            const isCluster = data[k + OFFSET_NUM] > 1;
            let tags, px, py;
            if (isCluster) {
                tags = getClusterProperties(data, k, this.clusterProps);
                px = data[k];
                py = data[k + 1];
            } else {
                const p = this.points[data[k + OFFSET_ID]];
                tags = p.properties;
                const [lng, lat] = p.geometry.coordinates;
                px = lngX(lng);
                py = latY(lat);
            }
            const f = {
                type: 1,
                geometry: [
                    [
                        Math.round(this.options.extent * (px * z2 - x)),
                        Math.round(this.options.extent * (py * z2 - y))
                    ]
                ],
                tags
            };
            // assign id
            let id;
            if (isCluster || this.options.generateId) {
                // optionally generate id for points
                id = data[k + OFFSET_ID];
            } else {
                // keep id if already assigned
                id = this.points[data[k + OFFSET_ID]].id;
            }
            if (id !== undefined) f.id = id;
            tile.features.push(f);
        }
    }
    _limitZoom(z) {
        return Math.max(this.options.minZoom, Math.min(Math.floor(+z), this.options.maxZoom + 1));
    }
    _cluster(tree, zoom) {
        const { radius, extent, reduce, minPoints } = this.options;
        const r = radius / (extent * Math.pow(2, zoom));
        const data = tree.data;
        const nextData = [];
        const stride = this.stride;
        // loop through each point
        for(let i = 0; i < data.length; i += stride){
            // if we've already visited the point at this zoom level, skip it
            if (data[i + OFFSET_ZOOM] <= zoom) continue;
            data[i + OFFSET_ZOOM] = zoom;
            // find all nearby points
            const x = data[i];
            const y = data[i + 1];
            const neighborIds = tree.within(data[i], data[i + 1], r);
            const numPointsOrigin = data[i + OFFSET_NUM];
            let numPoints = numPointsOrigin;
            // count the number of points in a potential cluster
            for (const neighborId of neighborIds){
                const k = neighborId * stride;
                // filter out neighbors that are already processed
                if (data[k + OFFSET_ZOOM] > zoom) numPoints += data[k + OFFSET_NUM];
            }
            // if there were neighbors to merge, and there are enough points to form a cluster
            if (numPoints > numPointsOrigin && numPoints >= minPoints) {
                let wx = x * numPointsOrigin;
                let wy = y * numPointsOrigin;
                let clusterProperties;
                let clusterPropIndex = -1;
                // encode both zoom and point index on which the cluster originated -- offset by total length of features
                const id = ((i / stride | 0) << 5) + (zoom + 1) + this.points.length;
                for (const neighborId of neighborIds){
                    const k = neighborId * stride;
                    if (data[k + OFFSET_ZOOM] <= zoom) continue;
                    data[k + OFFSET_ZOOM] = zoom; // save the zoom (so it doesn't get processed twice)
                    const numPoints2 = data[k + OFFSET_NUM];
                    wx += data[k] * numPoints2; // accumulate coordinates for calculating weighted center
                    wy += data[k + 1] * numPoints2;
                    data[k + OFFSET_PARENT] = id;
                    if (reduce) {
                        if (!clusterProperties) {
                            clusterProperties = this._map(data, i, true);
                            clusterPropIndex = this.clusterProps.length;
                            this.clusterProps.push(clusterProperties);
                        }
                        reduce(clusterProperties, this._map(data, k));
                    }
                }
                data[i + OFFSET_PARENT] = id;
                nextData.push(wx / numPoints, wy / numPoints, Infinity, id, -1, numPoints);
                if (reduce) nextData.push(clusterPropIndex);
            } else {
                for(let j = 0; j < stride; j++)nextData.push(data[i + j]);
                if (numPoints > 1) {
                    for (const neighborId of neighborIds){
                        const k = neighborId * stride;
                        if (data[k + OFFSET_ZOOM] <= zoom) continue;
                        data[k + OFFSET_ZOOM] = zoom;
                        for(let j = 0; j < stride; j++)nextData.push(data[k + j]);
                    }
                }
            }
        }
        return nextData;
    }
    // get index of the point from which the cluster originated
    _getOriginId(clusterId) {
        return clusterId - this.points.length >> 5;
    }
    // get zoom of the point from which the cluster originated
    _getOriginZoom(clusterId) {
        return (clusterId - this.points.length) % 32;
    }
    _map(data, i, clone) {
        if (data[i + OFFSET_NUM] > 1) {
            const props = this.clusterProps[data[i + OFFSET_PROP]];
            return clone ? Object.assign({}, props) : props;
        }
        const original = this.points[data[i + OFFSET_ID]].properties;
        const result = this.options.map(original);
        return clone && result === original ? Object.assign({}, result) : result;
    }
    constructor(options){
        this.options = Object.assign(Object.create(defaultOptions), options);
        this.trees = new Array(this.options.maxZoom + 1);
        this.stride = this.options.reduce ? 7 : 6;
        this.clusterProps = [];
    }
}
;
function getClusterJSON(data, i, clusterProps) {
    return {
        type: 'Feature',
        id: data[i + OFFSET_ID],
        properties: getClusterProperties(data, i, clusterProps),
        geometry: {
            type: 'Point',
            coordinates: [
                xLng(data[i]),
                yLat(data[i + 1])
            ]
        }
    };
}
function getClusterProperties(data, i, clusterProps) {
    const count = data[i + OFFSET_NUM];
    const abbrev = count >= 10000 ? "".concat(Math.round(count / 1000), "k") : count >= 1000 ? "".concat(Math.round(count / 100) / 10, "k") : count;
    const propIndex = data[i + OFFSET_PROP];
    const properties = propIndex === -1 ? {} : Object.assign({}, clusterProps[propIndex]);
    return Object.assign(properties, {
        cluster: true,
        cluster_id: data[i + OFFSET_ID],
        point_count: count,
        point_count_abbreviated: abbrev
    });
}
// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    const sin = Math.sin(lat * Math.PI / 180);
    const y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
    return y < 0 ? 0 : y > 1 ? 1 : y;
}
// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    const y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}
}),
]);

//# sourceMappingURL=3c68e_bf0ef093._.js.map