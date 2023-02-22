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
exports.promptBlankParam = void 0;
exports.promptBlankParam = function (toolbox, param, message) {
    if (message === void 0) { message = "What's the name"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var strings, prompt, print, promptResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    strings = toolbox.strings, prompt = toolbox.prompt, print = toolbox.print;
                    if (!strings.isBlank(param)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prompt.ask({
                            type: 'input',
                            name: 'name',
                            message: message + ' 🧐',
                        })];
                case 1:
                    promptResult = _a.sent();
                    if (!strings.isBlank(promptResult.name)) return [3 /*break*/, 3];
                    print.error('You entered nothing 🙅‍♀️');
                    return [4 /*yield*/, exports.promptBlankParam(toolbox, param)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/, promptResult.name];
                case 4: return [2 /*return*/, param];
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0QmxhbmtQYXJhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9wcm9tcHRCbGFua1BhcmFtL3Byb21wdEJsYW5rUGFyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWEsUUFBQSxnQkFBZ0IsR0FBcUIsVUFDaEQsT0FBTyxFQUNQLEtBQUssRUFDTCxPQUEyQjtJQUEzQix3QkFBQSxFQUFBLDJCQUEyQjs7Ozs7O29CQUVuQixPQUFPLEdBQW9CLE9BQU8sUUFBM0IsRUFBRSxNQUFNLEdBQVksT0FBTyxPQUFuQixFQUFFLEtBQUssR0FBSyxPQUFPLE1BQVosQ0FBWTt5QkFFdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBdEIsd0JBQXNCO29CQUNILHFCQUFNLE1BQU0sQ0FBQyxHQUFHLENBQW1COzRCQUN0RCxJQUFJLEVBQUUsT0FBTzs0QkFDYixJQUFJLEVBQUUsTUFBTTs0QkFDWixPQUFPLEVBQUUsT0FBTyxHQUFHLEtBQUs7eUJBQ3pCLENBQUMsRUFBQTs7b0JBSkksWUFBWSxHQUFHLFNBSW5CO3lCQUVFLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFsQyx3QkFBa0M7b0JBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtvQkFDakMscUJBQU0sd0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFBO3dCQUE3QyxzQkFBTyxTQUFzQyxFQUFBO3dCQUcvQyxzQkFBTyxZQUFZLENBQUMsSUFBSSxFQUFBO3dCQUcxQixzQkFBTyxLQUFLLEVBQUE7Ozs7Q0FDYixDQUFBIn0=