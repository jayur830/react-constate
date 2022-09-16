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
    var obj;
    var nameMap;
    var Provider = function (_a) {
        var children = _a.children, props = __rest(_a, ["children"]);
        obj = useValue(props);
        nameMap = Object.keys(obj).reduce(function (result, key) {
            var _a;
            return __assign(__assign({}, result), (_a = {}, _a[key] = __assign(__assign({}, (nameMap
                ? nameMap[key]
                : {
                    context: (0, react_1.createContext)(obj[key])
                })), { value: obj[key] }), _a));
        }, {});
        return Object.keys(nameMap).reduceRight(function (children, key) {
            var _a = nameMap[key], context = _a.context, value = _a.value;
            return (0, react_1.createElement)(context.Provider, { value: value }, children);
        }, children);
    };
    var useContext = function (selector) {
        var context = selector(nameMap).context;
        return (0, react_1.useContext)(context);
    };
    return { Provider: Provider, useContext: useContext };
}
exports.createProvider = createProvider;
