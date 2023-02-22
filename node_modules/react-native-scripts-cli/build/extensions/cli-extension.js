"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = function (toolbox) {
    toolbox.foo = function () {
        toolbox.print.info('called foo extension');
    };
    // enable this if you want to read configuration in from
    // the current folder's package.json (in a "react-native-scripts-cli" property),
    // react-native-scripts-cli.config.json, etc.
    // toolbox.config = {
    //   ...toolbox.config,
    //   ...toolbox.config.loadConfig(process.cwd(), "react-native-scripts-cli")
    // }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLWV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leHRlbnNpb25zL2NsaS1leHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwwRUFBMEU7QUFDMUUsbUJBQW1CO0FBQ25CLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBQyxPQUF1QjtJQUN2QyxPQUFPLENBQUMsR0FBRyxHQUFHO1FBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUM1QyxDQUFDLENBQUE7SUFFRCx3REFBd0Q7SUFDeEQsZ0ZBQWdGO0lBQ2hGLDZDQUE2QztJQUM3QyxxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLDRFQUE0RTtJQUM1RSxJQUFJO0FBQ04sQ0FBQyxDQUFBIn0=