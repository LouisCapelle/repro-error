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
exports.description = 'Generates query hook';
exports.run = function (toolbox) { return __awaiter(void 0, void 0, void 0, function () {
    var parameters, strings, patching, print, queryName, gqlName, hookName, templates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parameters = toolbox.parameters, strings = toolbox.strings, patching = toolbox.patching, print = toolbox.print;
                return [4 /*yield*/, utils_1.promptBlankParam(toolbox, parameters.first, "What's the name of the query")];
            case 1:
                queryName = _a.sent();
                gqlName = strings.snakeCase(queryName).toUpperCase();
                hookName = 'use' + strings.pascalCase(queryName);
                templates = [
                    {
                        template: 'query/index.ts.ejs',
                        target: "app/api/hooks/" + hookName + "/index.ts",
                    },
                    {
                        template: 'query/query.gql.ts.ejs',
                        target: "app/api/hooks/" + hookName + "/" + hookName + ".gql.ts",
                    },
                    {
                        template: 'query/query.ts.ejs',
                        target: "app/api/hooks/" + hookName + "/" + hookName + ".ts",
                    },
                ];
                return [4 /*yield*/, utils_1.generateTemplates(toolbox, templates, { queryName: queryName, gqlName: gqlName, hookName: hookName })];
            case 2:
                _a.sent();
                return [4 /*yield*/, patching.append('app/api/hooks/index.ts', "export * from './" + hookName + "'")];
            case 3:
                _a.sent();
                return [4 /*yield*/, utils_1.runPrettier(toolbox, __spreadArrays(templates.map(function (template) { return template.target; }), [
                        'app/api/hooks/index.ts',
                    ]))];
            case 4:
                _a.sent();
                print.newline();
                print.warning("Don't forget to generate GraphQL types (yarn graphql:generate), after completing the gql file 🖖");
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZ2VuZXJhdGUvcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFDQUE4RTtBQUVqRSxRQUFBLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQTtBQUVwQyxRQUFBLEdBQUcsR0FBRyxVQUFPLE9BQXVCOzs7OztnQkFDdkMsVUFBVSxHQUErQixPQUFPLFdBQXRDLEVBQUUsT0FBTyxHQUFzQixPQUFPLFFBQTdCLEVBQUUsUUFBUSxHQUFZLE9BQU8sU0FBbkIsRUFBRSxLQUFLLEdBQUssT0FBTyxNQUFaLENBQVk7Z0JBRXRDLHFCQUFNLHdCQUFnQixDQUN0QyxPQUFPLEVBQ1AsVUFBVSxDQUFDLEtBQUssRUFDaEIsOEJBQThCLENBQy9CLEVBQUE7O2dCQUpLLFNBQVMsR0FBRyxTQUlqQjtnQkFFSyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtnQkFDcEQsUUFBUSxHQUFHLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUVoRCxTQUFTLEdBQUc7b0JBQ2hCO3dCQUNFLFFBQVEsRUFBRSxvQkFBb0I7d0JBQzlCLE1BQU0sRUFBRSxtQkFBaUIsUUFBUSxjQUFXO3FCQUM3QztvQkFDRDt3QkFDRSxRQUFRLEVBQUUsd0JBQXdCO3dCQUNsQyxNQUFNLEVBQUUsbUJBQWlCLFFBQVEsU0FBSSxRQUFRLFlBQVM7cUJBQ3ZEO29CQUNEO3dCQUNFLFFBQVEsRUFBRSxvQkFBb0I7d0JBQzlCLE1BQU0sRUFBRSxtQkFBaUIsUUFBUSxTQUFJLFFBQVEsUUFBSztxQkFDbkQ7aUJBQ0YsQ0FBQTtnQkFFRCxxQkFBTSx5QkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsU0FBUyxXQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsQ0FBQyxFQUFBOztnQkFBN0UsU0FBNkUsQ0FBQTtnQkFFN0UscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FDbkIsd0JBQXdCLEVBQ3hCLHNCQUFvQixRQUFRLE1BQUcsQ0FDaEMsRUFBQTs7Z0JBSEQsU0FHQyxDQUFBO2dCQUVELHFCQUFNLG1CQUFXLENBQUMsT0FBTyxpQkFDcEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxNQUFNLEVBQWYsQ0FBZSxDQUFDO3dCQUMvQyx3QkFBd0I7dUJBQ3hCLEVBQUE7O2dCQUhGLFNBR0UsQ0FBQTtnQkFFRixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2YsS0FBSyxDQUFDLE9BQU8sQ0FDWCxrR0FBa0csQ0FDbkcsQ0FBQTs7OztLQUNGLENBQUEifQ==