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
exports.description = 'Update native files to match current env';
exports.run = function (toolbox) { return __awaiter(void 0, void 0, void 0, function () {
    var filesystem, parameters, print, patching, envName, buildNumber, envNameSpinner, version, env, splittedEnv, splittedEnv, expoSpinner, packageJson, _a, _b, sdkVersion, spinner, exploPlist, infoPlist, androidManifest, appBuildGradle, envSpinner, releaseChannel;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                filesystem = toolbox.filesystem, parameters = toolbox.parameters, print = toolbox.print, patching = toolbox.patching;
                return [4 /*yield*/, utils_1.promptBlankParam(toolbox, parameters.first, "What's the env (example-v1.0.0 or 1.0.0-example)")
                    // Get env informations (stage and version)
                ];
            case 1:
                envName = _c.sent();
                buildNumber = (parameters.second || 1).toString();
                envNameSpinner = print.spin('Getting env informations... 🧑‍🍳');
                if (envName.match(/^\d.\d.\d-\w+$/)) {
                    splittedEnv = envName.split('-');
                    version = splittedEnv[0];
                    env = splittedEnv[1];
                }
                else if (envName.match(/^\w+-v\d.\d.\d$/)) {
                    splittedEnv = envName.split('-v');
                    env = splittedEnv[0];
                    version = splittedEnv[1];
                }
                else {
                    envNameSpinner.fail('Env is not matching example-v1.0.0 or 1.0.0-example');
                    return [2 /*return*/];
                }
                envNameSpinner.succeed('Env: ' + env + ', Version: ' + version + ', Build number: ' + buildNumber);
                expoSpinner = print.spin('Getting Expo SDK version... 🧑‍🍳');
                _b = (_a = JSON).parse;
                return [4 /*yield*/, filesystem.readAsync('package.json')];
            case 2:
                packageJson = _b.apply(_a, [_c.sent()]);
                sdkVersion = packageJson.dependencies.expo;
                if (!sdkVersion) {
                    expoSpinner.fail("Can't get Expo SDK version from package.json");
                    return [2 /*return*/];
                }
                sdkVersion = sdkVersion.replace('^', '');
                expoSpinner.succeed('Expo SDK version is ' + sdkVersion);
                spinner = print.spin('Checking native projects... 🧑‍🍳');
                return [4 /*yield*/, filesystem.findAsync('ios', {
                        matching: '**/Supporting/Expo.plist',
                    })];
            case 3:
                exploPlist = (_c.sent())[0];
                return [4 /*yield*/, filesystem.findAsync('ios', {
                        matching: '**/Info.plist',
                    })];
            case 4:
                infoPlist = (_c.sent())[0];
                androidManifest = 'android/app/src/main/AndroidManifest.xml';
                appBuildGradle = 'android/app/build.gradle';
                if (!filesystem.exists(exploPlist) ||
                    !filesystem.exists(androidManifest) ||
                    !filesystem.exists(infoPlist) ||
                    !filesystem.exists(appBuildGradle)) {
                    spinner.fail('Native projects are not valids (Expo.plist, AndroidManifest.xml, Info.plist or app/build.gradle are missing)');
                    return [2 /*return*/];
                }
                spinner.succeed('Native projects are valids 🧖‍♂️');
                envSpinner = print.spin('Updating env... 🙈');
                return [4 /*yield*/, patching.patch('app/config/config.ts', {
                        insert: "const stage = '" + env + "'",
                        replace: /.*const stage.*/gm,
                    })];
            case 5:
                _c.sent();
                envSpinner.succeed('Env set to ' + env + ' 👍');
                // Patch native files
                spinner.start('Patching files...');
                releaseChannel = version + '-' + env;
                return [4 /*yield*/, patching.patch(exploPlist, {
                        insert: releaseChannel,
                        replace: 'release-channel-to-update',
                    })];
            case 6:
                _c.sent();
                return [4 /*yield*/, patching.patch(exploPlist, {
                        insert: sdkVersion,
                        replace: 'sdk-version-to-update',
                    })];
            case 7:
                _c.sent();
                return [4 /*yield*/, patching.patch(infoPlist, {
                        insert: version,
                        replace: '$(MARKETING_VERSION)',
                    })];
            case 8:
                _c.sent();
                return [4 /*yield*/, patching.patch(infoPlist, {
                        insert: buildNumber,
                        replace: '$(CURRENT_PROJECT_VERSION)',
                    })];
            case 9:
                _c.sent();
                return [4 /*yield*/, patching.patch(androidManifest, {
                        insert: releaseChannel,
                        replace: 'release-channel-to-update',
                    })];
            case 10:
                _c.sent();
                return [4 /*yield*/, patching.patch(androidManifest, {
                        insert: sdkVersion,
                        replace: 'sdk-version-to-update',
                    })];
            case 11:
                _c.sent();
                return [4 /*yield*/, patching.patch(appBuildGradle, {
                        insert: 'versionName "' + version + '"',
                        replace: 'versionName "1.0"',
                    })];
            case 12:
                _c.sent();
                return [4 /*yield*/, patching.patch(appBuildGradle, {
                        insert: 'versionCode ' + buildNumber,
                        replace: 'versionCode 1',
                    })
                    // Remove Flipper & enable Hermes
                ];
            case 13:
                _c.sent();
                // Remove Flipper & enable Hermes
                return [4 /*yield*/, patching.patch('ios/Podfile', {
                        delete: /.*(use_flipper|flipper_post_install).*/gm,
                    })];
            case 14:
                // Remove Flipper & enable Hermes
                _c.sent();
                return [4 /*yield*/, patching.patch(appBuildGradle, {
                        replace: 'enableHermes: false,',
                        insert: 'enableHermes: true,',
                    })];
            case 15:
                _c.sent();
                spinner.succeed('Native files patched, parfait 💥');
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLWVudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9zY3JpcHRzL2NvbmZpZ3VyZS1lbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQThDO0FBRWpDLFFBQUEsV0FBVyxHQUFHLDBDQUEwQyxDQUFBO0FBRXhELFFBQUEsR0FBRyxHQUFHLFVBQU8sT0FBdUI7Ozs7O2dCQUN2QyxVQUFVLEdBQWtDLE9BQU8sV0FBekMsRUFBRSxVQUFVLEdBQXNCLE9BQU8sV0FBN0IsRUFBRSxLQUFLLEdBQWUsT0FBTyxNQUF0QixFQUFFLFFBQVEsR0FBSyxPQUFPLFNBQVosQ0FBWTtnQkFJM0MscUJBQU0sd0JBQWdCLENBQ3BDLE9BQU8sRUFDUCxVQUFVLENBQUMsS0FBSyxFQUNoQixrREFBa0QsQ0FDbkQ7b0JBRUQsMkNBQTJDO2tCQUYxQzs7Z0JBSkssT0FBTyxHQUFHLFNBSWY7Z0JBR0ssV0FBVyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtnQkFDakQsY0FBYyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtnQkFHdEUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBRTdCLFdBQVcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUN0QyxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUN4QixHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNyQjtxQkFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRTtvQkFFckMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7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