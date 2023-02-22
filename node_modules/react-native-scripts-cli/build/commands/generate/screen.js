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
exports.description = 'Generates a React Native screen.';
exports.run = function (toolbox) {
    return __awaiter(this, void 0, void 0, function () {
        var parameters, strings, filesystem, patching, _a, ask, confirm, name, screenName, NAVIGATION_FOLDER, isInNavigation, navigator, isNested, navigationProp, navigationPropImport, isTab, allNavigators, askForNavigators, navigatorResult, props, templates, navigatorFunction, navigationType, insert;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    parameters = toolbox.parameters, strings = toolbox.strings, filesystem = toolbox.filesystem, patching = toolbox.patching, _a = toolbox.prompt, ask = _a.ask, confirm = _a.confirm;
                    return [4 /*yield*/, utils_1.promptBlankParam(toolbox, parameters.first, "What's the name of the screen")];
                case 1:
                    name = _b.sent();
                    screenName = strings.pascalCase(name);
                    NAVIGATION_FOLDER = 'app/navigation';
                    return [4 /*yield*/, confirm('Is your new screen nested inside a navigator ?')];
                case 2:
                    isInNavigation = _b.sent();
                    navigator = null;
                    isNested = false;
                    navigationProp = null;
                    navigationPropImport = null;
                    isTab = false;
                    if (!isInNavigation) return [3 /*break*/, 6];
                    allNavigators = filesystem
                        .list(NAVIGATION_FOLDER)
                        .filter(function (name) { return name !== 'index.ts' && name !== 'RootNavigator'; });
                    askForNavigators = {
                        type: 'select',
                        name: 'navigator',
                        message: 'Which navigator is your new screen in ?',
                        choices: allNavigators,
                    };
                    return [4 /*yield*/, ask(askForNavigators)];
                case 3:
                    navigatorResult = _b.sent();
                    navigator = navigatorResult.navigator;
                    return [4 /*yield*/, patching.exists(NAVIGATION_FOLDER + "/" + navigator + "/" + navigator + ".tsx", 'createBottomTabNavigator')];
                case 4:
                    isTab = _b.sent();
                    navigationProp = isTab ? 'BottomTabNavigationProp' : 'StackNavigationProp';
                    navigationPropImport = isTab
                        ? '@react-navigation/bottom-tabs'
                        : '@react-navigation/stack';
                    return [4 /*yield*/, patching.exists(NAVIGATION_FOLDER + "/" + navigator + "/" + navigator + ".types.ts", navigator + "Prop")];
                case 5:
                    isNested = _b.sent();
                    _b.label = 6;
                case 6:
                    props = {
                        name: screenName,
                        isInNavigation: isInNavigation,
                        navigator: navigator,
                        isNested: isNested,
                        navigationProp: navigationProp,
                        navigationPropImport: navigationPropImport,
                    };
                    templates = [
                        {
                            template: 'screen/screen.tsx.ejs',
                            target: "app/screens/" + screenName + "/" + screenName + ".tsx",
                        },
                        {
                            template: 'screen/index.ts.ejs',
                            target: "app/screens/" + screenName + "/index.ts",
                        },
                        {
                            template: 'screen/screen.props.ts.ejs',
                            target: "app/screens/" + screenName + "/" + screenName + ".props.ts",
                        },
                        {
                            template: 'screen/screen.styles.ts.ejs',
                            target: "app/screens/" + screenName + "/" + screenName + ".styles.ts",
                        },
                    ];
                    return [4 /*yield*/, utils_1.generateTemplates(toolbox, templates, props)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, patching.append('app/screens/index.ts', "export * from './" + screenName + "'")];
                case 8:
                    _b.sent();
                    if (!isInNavigation) return [3 /*break*/, 12];
                    return [4 /*yield*/, patching.patch(NAVIGATION_FOLDER + "/" + navigator + "/" + navigator + ".types.ts", {
                            after: "export type " + navigator + "ParamList = {\n",
                            insert: screenName + ": undefined\n",
                        })];
                case 9:
                    _b.sent();
                    navigatorFunction = isTab
                        ? 'createBottomTabNavigator'
                        : 'createStackNavigator';
                    return [4 /*yield*/, patching.patch(NAVIGATION_FOLDER + "/" + navigator + "/" + navigator + ".tsx", {
                            after: "import { " + navigatorFunction + " } from '" + navigationPropImport + "'\n",
                            insert: "import { " + screenName + " } from '@screens/" + screenName + "'\n",
                        })];
                case 10:
                    _b.sent();
                    navigationType = isTab ? 'Tab' : 'Stack';
                    insert = "<" + navigationType + ".Screen\n" +
                        ("        name=\"" + screenName + "\"\n") +
                        ("        component={" + screenName + "}\n");
                    if (isTab) {
                        insert =
                            insert +
                                '        options={{ tabBarIcon: (): any => <Icon name="home" /> }}\n';
                    }
                    insert = insert + '      />\n';
                    return [4 /*yield*/, patching.patch(NAVIGATION_FOLDER + "/" + navigator + "/" + navigator + ".tsx", {
                            before: "</" + navigationType + ".Navigator>\n",
                            insert: insert,
                        })];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12: return [4 /*yield*/, utils_1.runPrettier(toolbox, __spreadArrays(templates.map(function (template) { return template.target; }), [
                        'app/screens/index.ts',
                        isInNavigation && NAVIGATION_FOLDER + "/" + navigator + "/" + navigator + ".types.ts",
                        isInNavigation && NAVIGATION_FOLDER + "/" + navigator + "/" + navigator + ".tsx",
                    ]))];
                case 13:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2dlbmVyYXRlL3NjcmVlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQThFO0FBRWpFLFFBQUEsV0FBVyxHQUFHLGtDQUFrQyxDQUFBO0FBRWhELFFBQUEsR0FBRyxHQUFHLFVBQWdCLE9BQXVCOzs7Ozs7b0JBR3RELFVBQVUsR0FLUixPQUFPLFdBTEMsRUFDVixPQUFPLEdBSUwsT0FBTyxRQUpGLEVBQ1AsVUFBVSxHQUdSLE9BQU8sV0FIQyxFQUNWLFFBQVEsR0FFTixPQUFPLFNBRkQsRUFDUixLQUNFLE9BQU8sT0FEZSxFQUFkLEdBQUcsU0FBQSxFQUFFLE9BQU8sYUFBQSxDQUNiO29CQUdFLHFCQUFNLHdCQUFnQixDQUNqQyxPQUFPLEVBQ1AsVUFBVSxDQUFDLEtBQUssRUFDaEIsK0JBQStCLENBQ2hDLEVBQUE7O29CQUpLLElBQUksR0FBRyxTQUlaO29CQUNLLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUVyQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQTtvQkFDbkIscUJBQU0sT0FBTyxDQUNsQyxnREFBZ0QsQ0FDakQsRUFBQTs7b0JBRkssY0FBYyxHQUFHLFNBRXRCO29CQUNHLFNBQVMsR0FBRyxJQUFJLENBQUE7b0JBQ2hCLFFBQVEsR0FBRyxLQUFLLENBQUE7b0JBQ2hCLGNBQWMsR0FBRyxJQUFJLENBQUE7b0JBQ3JCLG9CQUFvQixHQUFHLElBQUksQ0FBQTtvQkFDM0IsS0FBSyxHQUFHLEtBQUssQ0FBQTt5QkFFYixjQUFjLEVBQWQsd0JBQWM7b0JBQ1YsYUFBYSxHQUFHLFVBQVU7eUJBQzdCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDdkIsTUFBTSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxLQUFLLFVBQVUsSUFBSSxJQUFJLEtBQUssZUFBZSxFQUEvQyxDQUErQyxDQUFDLENBQUE7b0JBQzlELGdCQUFnQixHQUFHO3dCQUN2QixJQUFJLEVBQUUsUUFBUTt3QkFDZCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLHlDQUF5Qzt3QkFDbEQsT0FBTyxFQUFFLGFBQWE7cUJBQ3ZCLENBQUE7b0JBQ3VCLHFCQUFNLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFBOztvQkFBN0MsZUFBZSxHQUFHLFNBQTJCO29CQUNuRCxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQTtvQkFFN0IscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FDeEIsaUJBQWlCLFNBQUksU0FBUyxTQUFJLFNBQVMsU0FBTSxFQUNwRCwwQkFBMEIsQ0FDM0IsRUFBQTs7b0JBSEQsS0FBSyxHQUFHLFNBR1AsQ0FBQTtvQkFDRCxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUE7b0JBQzFFLG9CQUFvQixHQUFHLEtBQUs7d0JBQzFCLENBQUMsQ0FBQywrQkFBK0I7d0JBQ2pDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQTtvQkFFbEIscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FDM0IsaUJBQWlCLFNBQUksU0FBUyxTQUFJLFNBQVMsY0FBVyxFQUN0RCxTQUFTLFNBQU0sQ0FDbkIsRUFBQTs7b0JBSEQsUUFBUSxHQUFHLFNBR1YsQ0FBQTs7O29CQUdHLEtBQUssR0FBRzt3QkFDWixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsY0FBYyxnQkFBQTt3QkFDZCxTQUFTLFdBQUE7d0JBQ1QsUUFBUSxVQUFBO3dCQUNSLGNBQWMsZ0JBQUE7d0JBQ2Qsb0JBQW9CLHNCQUFBO3FCQUNyQixDQUFBO29CQUdLLFNBQVMsR0FBRzt3QkFDaEI7NEJBQ0UsUUFBUSxFQUFFLHVCQUF1Qjs0QkFDakMsTUFBTSxFQUFFLGlCQUFlLFVBQVUsU0FBSSxVQUFVLFNBQU07eUJBQ3REO3dCQUNEOzRCQUNFLFFBQVEsRUFBRSxxQkFBcUI7NEJBQy9CLE1BQU0sRUFBRSxpQkFBZSxVQUFVLGNBQVc7eUJBQzdDO3dCQUNEOzRCQUNFLFFBQVEsRUFBRSw0QkFBNEI7NEJBQ3RDLE1BQU0sRUFBRSxpQkFBZSxVQUFVLFNBQUksVUFBVSxjQUFXO3lCQUMzRDt3QkFDRDs0QkFDRSxRQUFRLEVBQUUsNkJBQTZCOzRCQUN2QyxNQUFNLEVBQUUsaUJBQWUsVUFBVSxTQUFJLFVBQVUsZUFBWTt5QkFDNUQ7cUJBQ0YsQ0FBQTtvQkFDRCxxQkFBTSx5QkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFBOztvQkFBbEQsU0FBa0QsQ0FBQTtvQkFFbEQscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FDbkIsc0JBQXNCLEVBQ3RCLHNCQUFvQixVQUFVLE1BQUcsQ0FDbEMsRUFBQTs7b0JBSEQsU0FHQyxDQUFBO3lCQUVHLGNBQWMsRUFBZCx5QkFBYztvQkFDaEIscUJBQU0sUUFBUSxDQUFDLEtBQUssQ0FDZixpQkFBaUIsU0FBSSxTQUFTLFNBQUksU0FBUyxjQUFXLEVBQ3pEOzRCQUNFLEtBQUssRUFBRSxpQkFBZSxTQUFTLG9CQUFpQjs0QkFDaEQsTUFBTSxFQUFLLFVBQVUsa0JBQWU7eUJBQ3JDLENBQ0YsRUFBQTs7b0JBTkQsU0FNQyxDQUFBO29CQUNLLGlCQUFpQixHQUFHLEtBQUs7d0JBQzdCLENBQUMsQ0FBQywwQkFBMEI7d0JBQzVCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQTtvQkFDMUIscUJBQU0sUUFBUSxDQUFDLEtBQUssQ0FBSSxpQkFBaUIsU0FBSSxTQUFTLFNBQUksU0FBUyxTQUFNLEVBQUU7NEJBQ3pFLEtBQUssRUFBRSxjQUFZLGlCQUFpQixpQkFBWSxvQkFBb0IsUUFBSzs0QkFDekUsTUFBTSxFQUFFLGNBQVksVUFBVSwwQkFBcUIsVUFBVSxRQUFLO3lCQUNuRSxDQUFDLEVBQUE7O29CQUhGLFNBR0UsQ0FBQTtvQkFDSSxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtvQkFDMUMsTUFBTSxHQUNSLE1BQUksY0FBYyxjQUFXO3lCQUM3QixvQkFBaUIsVUFBVSxTQUFLLENBQUE7eUJBQ2hDLHdCQUFzQixVQUFVLFFBQUssQ0FBQSxDQUFBO29CQUN2QyxJQUFJLEtBQUssRUFBRTt3QkFDVCxNQUFNOzRCQUNKLE1BQU07Z0NBQ04scUVBQXFFLENBQUE7cUJBQ3hFO29CQUNELE1BQU0sR0FBRyxNQUFNLEdBQUcsWUFBWSxDQUFBO29CQUM5QixxQkFBTSxRQUFRLENBQUMsS0FBSyxDQUFJLGlCQUFpQixTQUFJLFNBQVMsU0FBSSxTQUFTLFNBQU0sRUFBRTs0QkFDekUsTUFBTSxFQUFFLE9BQUssY0FBYyxrQkFBZTs0QkFDMUMsTUFBTSxRQUFBO3lCQUNQLENBQUMsRUFBQTs7b0JBSEYsU0FHRSxDQUFBOzt5QkFHSixxQkFBTSxtQkFBVyxDQUFDLE9BQU8saUJBQ3BCLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsTUFBTSxFQUFmLENBQWUsQ0FBQzt3QkFDL0Msc0JBQXNCO3dCQUN0QixjQUFjLElBQU8saUJBQWlCLFNBQUksU0FBUyxTQUFJLFNBQVMsY0FBVzt3QkFDM0UsY0FBYyxJQUFPLGlCQUFpQixTQUFJLFNBQVMsU0FBSSxTQUFTLFNBQU07dUJBQ3RFLEVBQUE7O29CQUxGLFNBS0UsQ0FBQTs7Ozs7Q0FDSCxDQUFBIn0=