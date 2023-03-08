const path = require("node:path");

const glob = require("glob");

let rootDir = path.join(__dirname, "..", "..");

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "vercel",
  appDirectory: "app",
  ignoredRouteFiles: [".*"],
  assetsBuildDirectory: "public/build",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  serverDependenciesToBundle: [/.*/],
  watchPaths: glob
    .sync("packages/**/package.json", {
      cwd: rootDir,
      ignore: ["**/node_modules/**"],
      absolute: true,
      nodir: true,
    })
    .map((pkg) => path.dirname(pkg)),
  routes: function routes(defineRoutes) {
    return defineRoutes((route) => {
      let routesDir = "packages/routes/src/routes";
      let absoluteRoutesDir = path.join(rootDir, routesDir);
      let sharedRoutes = glob.sync(path.join(routesDir, "**/*.tsx"), {
        cwd: rootDir,
        nodir: true,
        absolute: true,
      });

      for (let routeFilePath of sharedRoutes) {
        let ext = path.extname(routeFilePath);
        let file = path.relative(
          path.join(__dirname, this.appDirectory),
          routeFilePath
        );

        let url = routeFilePath.slice(absoluteRoutesDir.length, -ext.length);

        if (url.endsWith("/index") || url.endsWith("/route")) {
          url = url.slice(0, -"/index".length);
        }

        route(url, file);
      }
    });
  },
};
