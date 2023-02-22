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
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.description = void 0;
var utils_1 = require("../../utils");
exports.description = 'Replace font icon with new one by fontello';
exports.run = function (toolbox) { return __awaiter(void 0, void 0, void 0, function () {
    var filesystem, parameters, print, patching, fontelloDir, spinner, configPath, fontPath, fontList, ttfName, ttfPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filesystem = toolbox.filesystem, parameters = toolbox.parameters, print = toolbox.print, patching = toolbox.patching;
                return [4 /*yield*/, utils_1.promptBlankParam(toolbox, parameters.first, 'Where is the fontello directory containing new icons')
                    // Validate Fontello project
                ];
            case 1:
                fontelloDir = _a.sent();
                spinner = print.spin('Checking fontello project... 🧑‍🍳');
                configPath = filesystem.resolve(fontelloDir, 'config.json');
                fontPath = filesystem.resolve(fontelloDir, 'font');
                return [4 /*yield*/, filesystem.listAsync(fontPath)];
            case 2:
                fontList = _a.sent();
                ttfName = fontList && fontList.find(function (file) { return file.endsWith('.ttf'); });
                ttfPath = ttfName && filesystem.resolve(fontPath, ttfName);
                if (!filesystem.exists(configPath) || !ttfPath) {
                    spinner.fail('Fontello project is not valid (config or font is missing)');
                    return [2 /*return*/];
                }
                spinner.succeed('Fontello project is valid 🧖‍♂️');
                spinner.start('Patching files...');
                return [4 /*yield*/, filesystem.copyAsync(fontPath, 'app/assets/fonts', {
                        overwrite: true,
                        matching: '*.ttf',
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, filesystem.copyAsync(configPath, 'app/components/Icon/Icon.config.json', { overwrite: true })];
            case 4:
                _a.sent();
                return [4 /*yield*/, filesystem.copyAsync(configPath, 'app/components/Icon/Icon.config.ts', {
                        overwrite: true,
                    })];
            case 5:
                _a.sent();
                return [4 /*yield*/, patching.prepend('app/components/Icon/Icon.config.ts', 'export default')];
            case 6:
                _a.sent();
                return [4 /*yield*/, patching.append('app/components/Icon/Icon.config.ts', 'as const')];
            case 7:
                _a.sent();
                spinner.succeed('Files patched, parfait 💥');
                return [4 /*yield*/, utils_1.runPrettier(toolbox, ['app/components/Icon/Icon.config.ts'])];
            case 8:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udGVsbG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvc2NyaXB0cy9mb250ZWxsby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxQ0FBMkQ7QUFFOUMsUUFBQSxXQUFXLEdBQUcsNENBQTRDLENBQUE7QUFFMUQsUUFBQSxHQUFHLEdBQUcsVUFBTyxPQUF1Qjs7Ozs7Z0JBQ3ZDLFVBQVUsR0FBa0MsT0FBTyxXQUF6QyxFQUFFLFVBQVUsR0FBc0IsT0FBTyxXQUE3QixFQUFFLEtBQUssR0FBZSxPQUFPLE1BQXRCLEVBQUUsUUFBUSxHQUFLLE9BQU8sU0FBWixDQUFZO2dCQUV2QyxxQkFBTSx3QkFBZ0IsQ0FDeEMsT0FBTyxFQUNQLFVBQVUsQ0FBQyxLQUFLLEVBQ2hCLHNEQUFzRCxDQUN2RDtvQkFFRCw0QkFBNEI7a0JBRjNCOztnQkFKSyxXQUFXLEdBQUcsU0FJbkI7Z0JBR0ssT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQTtnQkFDMUQsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFBO2dCQUMzRCxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUE7Z0JBQ3ZDLHFCQUFNLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUE7O2dCQUEvQyxRQUFRLEdBQUcsU0FBb0M7Z0JBQy9DLE9BQU8sR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQTtnQkFDcEUsT0FBTyxHQUFHLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQTtnQkFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkRBQTJELENBQUMsQ0FBQTtvQkFDekUsc0JBQU07aUJBQ1A7Z0JBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO2dCQUVsRCxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7Z0JBQ2xDLHFCQUFNLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFFO3dCQUN2RCxTQUFTLEVBQUUsSUFBSTt3QkFDZixRQUFRLEVBQUUsT0FBTztxQkFDbEIsQ0FBQyxFQUFBOztnQkFIRixTQUdFLENBQUE7Z0JBQ0YscUJBQU0sVUFBVSxDQUFDLFNBQVMsQ0FDeEIsVUFBVSxFQUNWLHNDQUFzQyxFQUN0QyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FDcEIsRUFBQTs7Z0JBSkQsU0FJQyxDQUFBO2dCQUVELHFCQUFNLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLG9DQUFvQyxFQUFFO3dCQUMzRSxTQUFTLEVBQUUsSUFBSTtxQkFDaEIsQ0FBQyxFQUFBOztnQkFGRixTQUVFLENBQUE7Z0JBQ0YscUJBQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFBOztnQkFBOUUsU0FBOEUsQ0FBQTtnQkFDOUUscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxvQ0FBb0MsRUFBRSxVQUFVLENBQUMsRUFBQTs7Z0JBQXZFLFNBQXVFLENBQUE7Z0JBQ3ZFLE9BQU8sQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtnQkFFNUMscUJBQU0sbUJBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLEVBQUE7O2dCQUFsRSxTQUFrRSxDQUFBOzs7O0tBQ25FLENBQUEifQ==