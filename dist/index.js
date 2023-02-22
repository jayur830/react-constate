"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.createProvider = void 0;
var react_1 = require("react");
function createProvider(useValue) {
    var nameMap;
    var Provider = function (_a) {
        var children = _a.children, props = __rest(_a, ["children"]);
        var obj = useValue(props);
        nameMap = Object.entries(obj).reduce(function (result, _a) {
            var _b, _c;
            var key = _a[0], value = _a[1];
            if (!nameMap) {
                return __assign(__assign({}, result), (_b = {}, _b[key] = {
                    context: (0, react_1.createContext)(value),
                    value: value
                }, _b));
            }
            return __assign(__assign({}, result), (_c = {}, _c[key] = __assign(__assign({}, nameMap[key]), { value: value }), _c));
        }, {});
        return Object.entries(nameMap).reduceRight(function (nameMapChildren, _a) {
            var nameMapObj = _a[1];
            var _b = nameMapObj, context = _b.context, value = _b.value;
            return (0, react_1.createElement)(context.Provider, { value: value }, nameMapChildren);
        }, children);
    };
    function useContext(selector) {
        if (!nameMap) {
            throw Error("The context consumer must be wrapped with its corresponding Provider");
        }
        if (selector) {
            if (typeof selector === "function") {
                var context_1 = selector(nameMap).context;
                // eslint-disable-next-line react-hooks/rules-of-hooks
                return (0, react_1.useContext)(context_1);
            }
            var context = nameMap[selector].context;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return (0, react_1.useContext)(context);
        }
        return Object.entries(nameMap).reduce(function (result, _a) {
            var _b;
            var key = _a[0], obj = _a[1];
            return __assign(__assign({}, result), (_b = {}, _b[key] = (0, react_1.useContext)(obj.context), _b));
        }, {});
    }
    return { Provider: Provider, useContext: useContext };
}
exports.createProvider = createProvider;
