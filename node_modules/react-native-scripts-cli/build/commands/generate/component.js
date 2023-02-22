"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.description = void 0;
var utils_1 = require("../../utils");
exports.description = 'Generates a component, supporting files, and a storybook test.';
exports.run = function (toolbox) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters, strings, patching, name, templates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters = toolbox.parameters, strings = toolbox.strings, patching = toolbox.patching;
                    return [4 /*yield*/, utils_1.promptBlankParam(toolbox, parameters.first, "What's the name of the component")];
                case 1:
                    name = _a.sent();
                    name = strings.pascalCase(name);
                    templates = [
                        {
                            template: 'component/component.story.tsx.ejs',
                            target: "app/components/" + name + "/" + name + ".story.tsx",
                        },
                        {
                            template: 'component/index.ts.ejs',
                            target: "app/components/" + name + "/index.ts",
                        },
                        {
                            template: 'component/component.props.ts.ejs',
                            target: "app/components/" + name + "/" + name + ".props.ts",
                        },
                        {
                            template: 'component/component.styles.ts.ejs',
                            target: "app/components/" + name + "/" + name + ".styles.ts",
                        },
                        {
                            template: 'component/component.tsx.ejs',
                            target: "app/components/" + name + "/" + name + ".tsx",
                        },
                    ];
                    return [4 /*yield*/, utils_1.generateTemplates(toolbox, templates, { name: name })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, patching.append('app/components/index.ts', "export * from './" + name + "'")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, patching.append('storybook/storybook-registry.ts', "require('../app/components/" + name + "/" + name + ".story')")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, utils_1.runPrettier(toolbox, __spreadArrays(templates.map(function (template) { return template.target; }), [
                            'app/components/index.ts',
                            'storybook/storybook-registry.ts',
                        ]))];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2dlbmVyYXRlL2NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQThFO0FBRWpFLFFBQUEsV0FBVyxHQUN0QixnRUFBZ0UsQ0FBQTtBQUVyRCxRQUFBLEdBQUcsR0FBRyxVQUFnQixPQUF1Qjs7Ozs7O29CQUVoRCxVQUFVLEdBQXdCLE9BQU8sV0FBL0IsRUFBRSxPQUFPLEdBQWUsT0FBTyxRQUF0QixFQUFFLFFBQVEsR0FBSyxPQUFPLFNBQVosQ0FBWTtvQkFHdEMscUJBQU0sd0JBQWdCLENBQy9CLE9BQU8sRUFDUCxVQUFVLENBQUMsS0FBSyxFQUNoQixrQ0FBa0MsQ0FDbkMsRUFBQTs7b0JBSkcsSUFBSSxHQUFHLFNBSVY7b0JBQ0QsSUFBSSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBRXpCLFNBQVMsR0FBRzt3QkFDaEI7NEJBQ0UsUUFBUSxFQUFFLG1DQUFtQzs0QkFDN0MsTUFBTSxFQUFFLG9CQUFrQixJQUFJLFNBQUksSUFBSSxlQUFZO3lCQUNuRDt3QkFDRDs0QkFDRSxRQUFRLEVBQUUsd0JBQXdCOzRCQUNsQyxNQUFNLEVBQUUsb0JBQWtCLElBQUksY0FBVzt5QkFDMUM7d0JBQ0Q7NEJBQ0UsUUFBUSxFQUFFLGtDQUFrQzs0QkFDNUMsTUFBTSxFQUFFLG9CQUFrQixJQUFJLFNBQUksSUFBSSxjQUFXO3lCQUNsRDt3QkFDRDs0QkFDRSxRQUFRLEVBQUUsbUNBQW1DOzRCQUM3QyxNQUFNLEVBQUUsb0JBQWtCLElBQUksU0FBSSxJQUFJLGVBQVk7eUJBQ25EO3dCQUNEOzRCQUNFLFFBQVEsRUFBRSw2QkFBNkI7NEJBQ3ZDLE1BQU0sRUFBRSxvQkFBa0IsSUFBSSxTQUFJLElBQUksU0FBTTt5QkFDN0M7cUJBQ0YsQ0FBQTtvQkFFRCxxQkFBTSx5QkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxFQUFBOztvQkFBckQsU0FBcUQsQ0FBQTtvQkFFckQscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxzQkFBb0IsSUFBSSxNQUFHLENBQUMsRUFBQTs7b0JBQTdFLFNBQTZFLENBQUE7b0JBRTdFLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQ25CLGlDQUFpQyxFQUNqQyxnQ0FBOEIsSUFBSSxTQUFJLElBQUksYUFBVSxDQUNyRCxFQUFBOztvQkFIRCxTQUdDLENBQUE7b0JBQ0QscUJBQU0sbUJBQVcsQ0FBQyxPQUFPLGlCQUNwQixTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxJQUFLLE9BQUEsUUFBUSxDQUFDLE1BQU0sRUFBZixDQUFlLENBQUM7NEJBQy9DLHlCQUF5Qjs0QkFDekIsaUNBQWlDOzJCQUNqQyxFQUFBOztvQkFKRixTQUlFLENBQUE7Ozs7O0NBQ0gsQ0FBQSJ9