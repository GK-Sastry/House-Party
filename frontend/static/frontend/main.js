/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ GradientBackground)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\n\n// Color table for gradient transitions\nconst colors = [[62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]];\nfunction GradientBackground() {\n  const [step, setStep] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0); // Current step in the transition\n  const [colorIndices, setColorIndices] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([0, 1, 2, 3]); // Indices of current and next color pairs\n\n  const gradientSpeed = 0.002; // Speed of gradient transition\n\n  // Function to update the gradient based on step and color indices\n  const updateGradient = () => {\n    const c0_0 = colors[colorIndices[0]];\n    const c0_1 = colors[colorIndices[1]];\n    const c1_0 = colors[colorIndices[2]];\n    const c1_1 = colors[colorIndices[3]];\n    const istep = 1 - step;\n\n    // Calculate the RGB values for the left and right gradient colors\n    const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);\n    const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);\n    const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);\n    const color1 = `rgb(${r1},${g1},${b1})`;\n    const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);\n    const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);\n    const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);\n    const color2 = `rgb(${r2},${g2},${b2})`;\n\n    // Set the background gradient style for the component\n    document.body.style.background = `-webkit-gradient(linear, left top, right top, from(${color1}), to(${color2}))`;\n    document.body.style.background = `-moz-linear-gradient(left, ${color1} 0%, ${color2} 100%)`;\n  };\n\n  // Update color indices and step when necessary\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const interval = setInterval(() => {\n      setStep(prevStep => {\n        const newStep = prevStep + gradientSpeed;\n        if (newStep >= 1) {\n          setStep(0); // Reset the step when it reaches 1\n          setColorIndices(prevIndices => {\n            // Pick two new target color indices (different from current ones)\n            const newColorIndices = [...prevIndices];\n            newColorIndices[0] = prevIndices[1];\n            newColorIndices[2] = prevIndices[3];\n            newColorIndices[1] = (prevIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;\n            newColorIndices[3] = (prevIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;\n            return newColorIndices;\n          });\n        }\n        return newStep;\n      });\n    }, 10); // Update every 10ms\n\n    // Cleanup the interval when component unmounts\n    return () => clearInterval(interval);\n  }, [step, colorIndices]);\n\n  // Render component\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    updateGradient(); // Update the gradient each time step or colorIndices change\n  }, [step, colorIndices]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "Gradient Background Transition"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Watch the background colors transition smoothly!"));\n}\n\n//# sourceURL=webpack://frontend/./src/index.js?')},"./node_modules/react/cjs/react.production.js":(__unused_webpack_module,exports)=>{eval('/**\n * @license React\n * react.production.js\n *\n * Copyright (c) Meta Platforms, Inc. and affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\nvar REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),\n  REACT_PORTAL_TYPE = Symbol.for("react.portal"),\n  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),\n  REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),\n  REACT_PROFILER_TYPE = Symbol.for("react.profiler"),\n  REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),\n  REACT_CONTEXT_TYPE = Symbol.for("react.context"),\n  REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),\n  REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),\n  REACT_MEMO_TYPE = Symbol.for("react.memo"),\n  REACT_LAZY_TYPE = Symbol.for("react.lazy"),\n  MAYBE_ITERATOR_SYMBOL = Symbol.iterator;\nfunction getIteratorFn(maybeIterable) {\n  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;\n  maybeIterable =\n    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||\n    maybeIterable["@@iterator"];\n  return "function" === typeof maybeIterable ? maybeIterable : null;\n}\nvar ReactNoopUpdateQueue = {\n    isMounted: function () {\n      return !1;\n    },\n    enqueueForceUpdate: function () {},\n    enqueueReplaceState: function () {},\n    enqueueSetState: function () {}\n  },\n  assign = Object.assign,\n  emptyObject = {};\nfunction Component(props, context, updater) {\n  this.props = props;\n  this.context = context;\n  this.refs = emptyObject;\n  this.updater = updater || ReactNoopUpdateQueue;\n}\nComponent.prototype.isReactComponent = {};\nComponent.prototype.setState = function (partialState, callback) {\n  if (\n    "object" !== typeof partialState &&\n    "function" !== typeof partialState &&\n    null != partialState\n  )\n    throw Error(\n      "takes an object of state variables to update or a function which returns an object of state variables."\n    );\n  this.updater.enqueueSetState(this, partialState, callback, "setState");\n};\nComponent.prototype.forceUpdate = function (callback) {\n  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");\n};\nfunction ComponentDummy() {}\nComponentDummy.prototype = Component.prototype;\nfunction PureComponent(props, context, updater) {\n  this.props = props;\n  this.context = context;\n  this.refs = emptyObject;\n  this.updater = updater || ReactNoopUpdateQueue;\n}\nvar pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());\npureComponentPrototype.constructor = PureComponent;\nassign(pureComponentPrototype, Component.prototype);\npureComponentPrototype.isPureReactComponent = !0;\nvar isArrayImpl = Array.isArray,\n  ReactSharedInternals = { H: null, A: null, T: null, S: null },\n  hasOwnProperty = Object.prototype.hasOwnProperty;\nfunction ReactElement(type, key, self, source, owner, props) {\n  self = props.ref;\n  return {\n    $$typeof: REACT_ELEMENT_TYPE,\n    type: type,\n    key: key,\n    ref: void 0 !== self ? self : null,\n    props: props\n  };\n}\nfunction cloneAndReplaceKey(oldElement, newKey) {\n  return ReactElement(\n    oldElement.type,\n    newKey,\n    void 0,\n    void 0,\n    void 0,\n    oldElement.props\n  );\n}\nfunction isValidElement(object) {\n  return (\n    "object" === typeof object &&\n    null !== object &&\n    object.$$typeof === REACT_ELEMENT_TYPE\n  );\n}\nfunction escape(key) {\n  var escaperLookup = { "=": "=0", ":": "=2" };\n  return (\n    "$" +\n    key.replace(/[=:]/g, function (match) {\n      return escaperLookup[match];\n    })\n  );\n}\nvar userProvidedKeyEscapeRegex = /\\/+/g;\nfunction getElementKey(element, index) {\n  return "object" === typeof element && null !== element && null != element.key\n    ? escape("" + element.key)\n    : index.toString(36);\n}\nfunction noop$1() {}\nfunction resolveThenable(thenable) {\n  switch (thenable.status) {\n    case "fulfilled":\n      return thenable.value;\n    case "rejected":\n      throw thenable.reason;\n    default:\n      switch (\n        ("string" === typeof thenable.status\n          ? thenable.then(noop$1, noop$1)\n          : ((thenable.status = "pending"),\n            thenable.then(\n              function (fulfilledValue) {\n                "pending" === thenable.status &&\n                  ((thenable.status = "fulfilled"),\n                  (thenable.value = fulfilledValue));\n              },\n              function (error) {\n                "pending" === thenable.status &&\n                  ((thenable.status = "rejected"), (thenable.reason = error));\n              }\n            )),\n        thenable.status)\n      ) {\n        case "fulfilled":\n          return thenable.value;\n        case "rejected":\n          throw thenable.reason;\n      }\n  }\n  throw thenable;\n}\nfunction mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {\n  var type = typeof children;\n  if ("undefined" === type || "boolean" === type) children = null;\n  var invokeCallback = !1;\n  if (null === children) invokeCallback = !0;\n  else\n    switch (type) {\n      case "bigint":\n      case "string":\n      case "number":\n        invokeCallback = !0;\n        break;\n      case "object":\n        switch (children.$$typeof) {\n          case REACT_ELEMENT_TYPE:\n          case REACT_PORTAL_TYPE:\n            invokeCallback = !0;\n            break;\n          case REACT_LAZY_TYPE:\n            return (\n              (invokeCallback = children._init),\n              mapIntoArray(\n                invokeCallback(children._payload),\n                array,\n                escapedPrefix,\n                nameSoFar,\n                callback\n              )\n            );\n        }\n    }\n  if (invokeCallback)\n    return (\n      (callback = callback(children)),\n      (invokeCallback =\n        "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar),\n      isArrayImpl(callback)\n        ? ((escapedPrefix = ""),\n          null != invokeCallback &&\n            (escapedPrefix =\n              invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"),\n          mapIntoArray(callback, array, escapedPrefix, "", function (c) {\n            return c;\n          }))\n        : null != callback &&\n          (isValidElement(callback) &&\n            (callback = cloneAndReplaceKey(\n              callback,\n              escapedPrefix +\n                (null == callback.key ||\n                (children && children.key === callback.key)\n                  ? ""\n                  : ("" + callback.key).replace(\n                      userProvidedKeyEscapeRegex,\n                      "$&/"\n                    ) + "/") +\n                invokeCallback\n            )),\n          array.push(callback)),\n      1\n    );\n  invokeCallback = 0;\n  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";\n  if (isArrayImpl(children))\n    for (var i = 0; i < children.length; i++)\n      (nameSoFar = children[i]),\n        (type = nextNamePrefix + getElementKey(nameSoFar, i)),\n        (invokeCallback += mapIntoArray(\n          nameSoFar,\n          array,\n          escapedPrefix,\n          type,\n          callback\n        ));\n  else if (((i = getIteratorFn(children)), "function" === typeof i))\n    for (\n      children = i.call(children), i = 0;\n      !(nameSoFar = children.next()).done;\n\n    )\n      (nameSoFar = nameSoFar.value),\n        (type = nextNamePrefix + getElementKey(nameSoFar, i++)),\n        (invokeCallback += mapIntoArray(\n          nameSoFar,\n          array,\n          escapedPrefix,\n          type,\n          callback\n        ));\n  else if ("object" === type) {\n    if ("function" === typeof children.then)\n      return mapIntoArray(\n        resolveThenable(children),\n        array,\n        escapedPrefix,\n        nameSoFar,\n        callback\n      );\n    array = String(children);\n    throw Error(\n      "Objects are not valid as a React child (found: " +\n        ("[object Object]" === array\n          ? "object with keys {" + Object.keys(children).join(", ") + "}"\n          : array) +\n        "). If you meant to render a collection of children, use an array instead."\n    );\n  }\n  return invokeCallback;\n}\nfunction mapChildren(children, func, context) {\n  if (null == children) return children;\n  var result = [],\n    count = 0;\n  mapIntoArray(children, result, "", "", function (child) {\n    return func.call(context, child, count++);\n  });\n  return result;\n}\nfunction lazyInitializer(payload) {\n  if (-1 === payload._status) {\n    var ctor = payload._result;\n    ctor = ctor();\n    ctor.then(\n      function (moduleObject) {\n        if (0 === payload._status || -1 === payload._status)\n          (payload._status = 1), (payload._result = moduleObject);\n      },\n      function (error) {\n        if (0 === payload._status || -1 === payload._status)\n          (payload._status = 2), (payload._result = error);\n      }\n    );\n    -1 === payload._status && ((payload._status = 0), (payload._result = ctor));\n  }\n  if (1 === payload._status) return payload._result.default;\n  throw payload._result;\n}\nvar reportGlobalError =\n  "function" === typeof reportError\n    ? reportError\n    : function (error) {\n        if (\n          "object" === typeof window &&\n          "function" === typeof window.ErrorEvent\n        ) {\n          var event = new window.ErrorEvent("error", {\n            bubbles: !0,\n            cancelable: !0,\n            message:\n              "object" === typeof error &&\n              null !== error &&\n              "string" === typeof error.message\n                ? String(error.message)\n                : String(error),\n            error: error\n          });\n          if (!window.dispatchEvent(event)) return;\n        } else if (\n          "object" === typeof process &&\n          "function" === typeof process.emit\n        ) {\n          process.emit("uncaughtException", error);\n          return;\n        }\n        console.error(error);\n      };\nfunction noop() {}\nexports.Children = {\n  map: mapChildren,\n  forEach: function (children, forEachFunc, forEachContext) {\n    mapChildren(\n      children,\n      function () {\n        forEachFunc.apply(this, arguments);\n      },\n      forEachContext\n    );\n  },\n  count: function (children) {\n    var n = 0;\n    mapChildren(children, function () {\n      n++;\n    });\n    return n;\n  },\n  toArray: function (children) {\n    return (\n      mapChildren(children, function (child) {\n        return child;\n      }) || []\n    );\n  },\n  only: function (children) {\n    if (!isValidElement(children))\n      throw Error(\n        "React.Children.only expected to receive a single React element child."\n      );\n    return children;\n  }\n};\nexports.Component = Component;\nexports.Fragment = REACT_FRAGMENT_TYPE;\nexports.Profiler = REACT_PROFILER_TYPE;\nexports.PureComponent = PureComponent;\nexports.StrictMode = REACT_STRICT_MODE_TYPE;\nexports.Suspense = REACT_SUSPENSE_TYPE;\nexports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =\n  ReactSharedInternals;\nexports.act = function () {\n  throw Error("act(...) is not supported in production builds of React.");\n};\nexports.cache = function (fn) {\n  return function () {\n    return fn.apply(null, arguments);\n  };\n};\nexports.cloneElement = function (element, config, children) {\n  if (null === element || void 0 === element)\n    throw Error(\n      "The argument must be a React element, but you passed " + element + "."\n    );\n  var props = assign({}, element.props),\n    key = element.key,\n    owner = void 0;\n  if (null != config)\n    for (propName in (void 0 !== config.ref && (owner = void 0),\n    void 0 !== config.key && (key = "" + config.key),\n    config))\n      !hasOwnProperty.call(config, propName) ||\n        "key" === propName ||\n        "__self" === propName ||\n        "__source" === propName ||\n        ("ref" === propName && void 0 === config.ref) ||\n        (props[propName] = config[propName]);\n  var propName = arguments.length - 2;\n  if (1 === propName) props.children = children;\n  else if (1 < propName) {\n    for (var childArray = Array(propName), i = 0; i < propName; i++)\n      childArray[i] = arguments[i + 2];\n    props.children = childArray;\n  }\n  return ReactElement(element.type, key, void 0, void 0, owner, props);\n};\nexports.createContext = function (defaultValue) {\n  defaultValue = {\n    $$typeof: REACT_CONTEXT_TYPE,\n    _currentValue: defaultValue,\n    _currentValue2: defaultValue,\n    _threadCount: 0,\n    Provider: null,\n    Consumer: null\n  };\n  defaultValue.Provider = defaultValue;\n  defaultValue.Consumer = {\n    $$typeof: REACT_CONSUMER_TYPE,\n    _context: defaultValue\n  };\n  return defaultValue;\n};\nexports.createElement = function (type, config, children) {\n  var propName,\n    props = {},\n    key = null;\n  if (null != config)\n    for (propName in (void 0 !== config.key && (key = "" + config.key), config))\n      hasOwnProperty.call(config, propName) &&\n        "key" !== propName &&\n        "__self" !== propName &&\n        "__source" !== propName &&\n        (props[propName] = config[propName]);\n  var childrenLength = arguments.length - 2;\n  if (1 === childrenLength) props.children = children;\n  else if (1 < childrenLength) {\n    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)\n      childArray[i] = arguments[i + 2];\n    props.children = childArray;\n  }\n  if (type && type.defaultProps)\n    for (propName in ((childrenLength = type.defaultProps), childrenLength))\n      void 0 === props[propName] &&\n        (props[propName] = childrenLength[propName]);\n  return ReactElement(type, key, void 0, void 0, null, props);\n};\nexports.createRef = function () {\n  return { current: null };\n};\nexports.forwardRef = function (render) {\n  return { $$typeof: REACT_FORWARD_REF_TYPE, render: render };\n};\nexports.isValidElement = isValidElement;\nexports.lazy = function (ctor) {\n  return {\n    $$typeof: REACT_LAZY_TYPE,\n    _payload: { _status: -1, _result: ctor },\n    _init: lazyInitializer\n  };\n};\nexports.memo = function (type, compare) {\n  return {\n    $$typeof: REACT_MEMO_TYPE,\n    type: type,\n    compare: void 0 === compare ? null : compare\n  };\n};\nexports.startTransition = function (scope) {\n  var prevTransition = ReactSharedInternals.T,\n    currentTransition = {};\n  ReactSharedInternals.T = currentTransition;\n  try {\n    var returnValue = scope(),\n      onStartTransitionFinish = ReactSharedInternals.S;\n    null !== onStartTransitionFinish &&\n      onStartTransitionFinish(currentTransition, returnValue);\n    "object" === typeof returnValue &&\n      null !== returnValue &&\n      "function" === typeof returnValue.then &&\n      returnValue.then(noop, reportGlobalError);\n  } catch (error) {\n    reportGlobalError(error);\n  } finally {\n    ReactSharedInternals.T = prevTransition;\n  }\n};\nexports.unstable_useCacheRefresh = function () {\n  return ReactSharedInternals.H.useCacheRefresh();\n};\nexports.use = function (usable) {\n  return ReactSharedInternals.H.use(usable);\n};\nexports.useActionState = function (action, initialState, permalink) {\n  return ReactSharedInternals.H.useActionState(action, initialState, permalink);\n};\nexports.useCallback = function (callback, deps) {\n  return ReactSharedInternals.H.useCallback(callback, deps);\n};\nexports.useContext = function (Context) {\n  return ReactSharedInternals.H.useContext(Context);\n};\nexports.useDebugValue = function () {};\nexports.useDeferredValue = function (value, initialValue) {\n  return ReactSharedInternals.H.useDeferredValue(value, initialValue);\n};\nexports.useEffect = function (create, deps) {\n  return ReactSharedInternals.H.useEffect(create, deps);\n};\nexports.useId = function () {\n  return ReactSharedInternals.H.useId();\n};\nexports.useImperativeHandle = function (ref, create, deps) {\n  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);\n};\nexports.useInsertionEffect = function (create, deps) {\n  return ReactSharedInternals.H.useInsertionEffect(create, deps);\n};\nexports.useLayoutEffect = function (create, deps) {\n  return ReactSharedInternals.H.useLayoutEffect(create, deps);\n};\nexports.useMemo = function (create, deps) {\n  return ReactSharedInternals.H.useMemo(create, deps);\n};\nexports.useOptimistic = function (passthrough, reducer) {\n  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);\n};\nexports.useReducer = function (reducer, initialArg, init) {\n  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);\n};\nexports.useRef = function (initialValue) {\n  return ReactSharedInternals.H.useRef(initialValue);\n};\nexports.useState = function (initialState) {\n  return ReactSharedInternals.H.useState(initialState);\n};\nexports.useSyncExternalStore = function (\n  subscribe,\n  getSnapshot,\n  getServerSnapshot\n) {\n  return ReactSharedInternals.H.useSyncExternalStore(\n    subscribe,\n    getSnapshot,\n    getServerSnapshot\n  );\n};\nexports.useTransition = function () {\n  return ReactSharedInternals.H.useTransition();\n};\nexports.version = "19.0.0";\n\n\n//# sourceURL=webpack://frontend/./node_modules/react/cjs/react.production.js?')},"./node_modules/react/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{eval('\n\nif (true) {\n  module.exports = __webpack_require__(/*! ./cjs/react.production.js */ "./node_modules/react/cjs/react.production.js");\n} else {}\n\n\n//# sourceURL=webpack://frontend/./node_modules/react/index.js?')}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}__webpack_require__.d=(e,n)=>{for(var r in n)__webpack_require__.o(n,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./src/index.js")})();