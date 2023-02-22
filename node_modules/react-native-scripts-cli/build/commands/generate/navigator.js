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
exports.description = 'Generates a React Navigation navigator.';
exports.run = function (toolbox) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters, strings, patching, _a, ask, confirm, list, navigatorTypes, name, navigatorName, NAVIGATION_FOLDER, navigatorType, askForNavigatorType, navigatorTypeResult, isNested, nestedNavigator, nestedType, askIfNested, _b, isTab, allNavigators, askForNavigators, navigatorResult, props, templates, before, insert;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    parameters = toolbox.parameters, strings = toolbox.strings, patching = toolbox.patching, _a = toolbox.prompt, ask = _a.ask, confirm = _a.confirm, list = toolbox.filesystem.list;
                    navigatorTypes = {
                        Stack: 'createStackNavigator',
                        Tab: 'createBottomTabNavigator',
                    };
                    return [4 /*yield*/, utils_1.promptBlankParam(toolbox, parameters.first, "What's the name of the navigator")];
                case 1:
                    name = _c.sent();
                    name = strings.pascalCase(name);
                    navigatorName = strings.pascalCase(name.toLocaleLowerCase().endsWith('navigator') ? name : name + "Navigator");
                    NAVIGATION_FOLDER = "app/navigation";
                    navigatorType = parameters.options.type;
                    if (!!navigatorType) return [3 /*break*/, 3];
                    askForNavigatorType = {
                        type: 'select',
                        name: 'navigatorType',
                        message: 'What type of navigator do you want to create ?',
                        initial: 'Stack',
                        choices: Object.keys(navigatorTypes),
                    };
                    return [4 /*yield*/, ask(askForNavigatorType)];
                case 2:
                    navigatorTypeResult = _c.sent();
                    navigatorType = navigatorTypeResult.navigatorType;
                    _c.label = 3;
                case 3:
                    isNested = parameters.options.nested !== undefined;
                    nestedNavigator = parameters.options.nestedNavigator;
                    nestedType = null;
                    askIfNested = parameters.options.nested === undefined && navigatorType === 'Stack';
                    if (!askIfNested) return [3 /*break*/, 5];
                    return [4 /*yield*/, confirm('Is your new navigator nested inside another one ?')];
                case 4:
                    _b = _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _b = parameters.options.nested === true;
                    _c.label = 6;
                case 6:
                    isNested = _b;
                    isTab = true;
                    if (!isNested) return [3 /*break*/, 9];
                    allNavigators = list(NAVIGATION_FOLDER).filter(function (name) { return name !== 'index.ts' && name !== 'RootNavigator'; });
                    askForNavigators = {
                        type: 'select',
                        name: 'nestedNavigator',
                        message: 'Which navigator is your new navigator nested in ?',
                        choices: allNavigators,
                    };
                    return [4 /*yield*/, ask(askForNavigators)];
                case 7:
                    navigatorResult = _c.sent();
                    nestedNavigator = navigatorResult.nestedNavigator;
                    return [4 /*yield*/, patching.exists(NAVIGATION_FOLDER + "/" + nestedNavigator + "/" + nestedNavigator + ".tsx", navigatorTypes.Tab)];
                case 8:
                    // check if nested navigator is tab
                    isTab = _c.sent();
                    nestedType = isTab ? 'Tab' : 'Stack';
                    _c.label = 9;
                case 9:
                    props = {
                        name: navigatorName,
                        navigatorType: navigatorType,
                        isNested: isNested,
                        nestedType: nestedType,
                        nestedNavigator: nestedNavigator,
                    };
                    templates = [
                        {
                            template: "navigator/navigator." + navigatorType.toLowerCase() + ".tsx.ejs",
                            target: "app/navigation/" + navigatorName + "/" + navigatorName + ".tsx",
                        },
                        {
                            template: 'navigator/navigator.types.ts.ejs',
                            target: "app/navigation/" + navigatorName + "/" + navigatorName + ".types.ts",
                        },
                        {
                            template: 'navigator/index.ts.ejs',
                            target: "app/navigation/" + navigatorName + "/index.ts",
                        },
                    ];
                    return [4 /*yield*/, utils_1.generateTemplates(toolbox, templates, props)];
                case 10:
                    _c.sent();
                    if (!isNested) return [3 /*break*/, 14];
                    before = "</" + nestedType + ".Navigator>\n";
                    insert = "      <" + nestedType + ".Screen\n" +
                        ("        name=\"" + navigatorName + "\"\n") +
                        ("        component={" + navigatorName + "}\n");
                    if (isTab) {
                        insert =
                            insert +
                                '        options={{ tabBarIcon: (): any => <Icon name="home" /> }}\n';
                    }
                    insert = insert + '      />\n';
                    return [4 /*yield*/, patching.patch(NAVIGATION_FOLDER + "/" + nestedNavigator + "/" + nestedNavigator + ".tsx", {
                            before: before,
                            insert: insert,
                        })];
                case 11:
                    _c.sent();
                    return [4 /*yield*/, patching.patch(NAVIGATION_FOLDER + "/" + nestedNavigator + "/" + nestedNavigator + ".types.ts", {
                            after: "export type " + nestedNavigator + "ParamList = {\n",
                            insert: "  " + navigatorName + ": undefined\n",
                        })];
                case 12:
                    _c.sent();
                    return [4 /*yield*/, patching.patch(NAVIGATION_FOLDER + "/" + nestedNavigator + "/" + nestedNavigator + ".tsx", {
                            after: "import { " + nestedNavigator + "ParamList } from './" + nestedNavigator + ".types'\n",
                            insert: "import { " + navigatorName + " } from '../" + navigatorName + "'\n",
                        })];
                case 13:
                    _c.sent();
                    _c.label = 14;
                case 14: return [4 /*yield*/, patching.append(NAVIGATION_FOLDER + "/index.ts", "export * from './" + navigatorName + "'")];
                case 15:
                    _c.sent();
                    return [4 /*yield*/, utils_1.runPrettier(toolbox, __spreadArrays(templates.map(function (template) { return template.target; }), [
                            NAVIGATION_FOLDER + "/index.ts",
                            isNested &&
                                NAVIGATION_FOLDER + "/" + nestedNavigator + "/" + nestedNavigator + ".tsx",
                            isNested &&
                                NAVIGATION_FOLDER + "/" + nestedNavigator + "/" + nestedNavigator + ".types.ts",
                        ]))];
                case 16:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2dlbmVyYXRlL25hdmlnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQThFO0FBRWpFLFFBQUEsV0FBVyxHQUFHLHlDQUF5QyxDQUFBO0FBQ3ZELFFBQUEsR0FBRyxHQUFHLFVBQWdCLE9BQXVCOzs7Ozs7b0JBR3RELFVBQVUsR0FLUixPQUFPLFdBTEMsRUFDVixPQUFPLEdBSUwsT0FBTyxRQUpGLEVBQ1AsUUFBUSxHQUdOLE9BQU8sU0FIRCxFQUNSLEtBRUUsT0FBTyxPQUZlLEVBQWQsR0FBRyxTQUFBLEVBQUUsT0FBTyxhQUFBLEVBQ1IsSUFBSSxHQUNoQixPQUFPLGdCQURTLENBQ1Q7b0JBRUwsY0FBYyxHQUFHO3dCQUNyQixLQUFLLEVBQUUsc0JBQXNCO3dCQUM3QixHQUFHLEVBQUUsMEJBQTBCO3FCQUVoQyxDQUFBO29CQUdVLHFCQUFNLHdCQUFnQixDQUMvQixPQUFPLEVBQ1AsVUFBVSxDQUFDLEtBQUssRUFDaEIsa0NBQWtDLENBQ25DLEVBQUE7O29CQUpHLElBQUksR0FBRyxTQUlWO29CQUNELElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUV6QixhQUFhLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FDdEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFJLElBQUksY0FBVyxDQUMzRSxDQUFBO29CQUVLLGlCQUFpQixHQUFHLGdCQUFnQixDQUFBO29CQUd0QyxhQUFhLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7eUJBQ3ZDLENBQUMsYUFBYSxFQUFkLHdCQUFjO29CQUNWLG1CQUFt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