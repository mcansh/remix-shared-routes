import path from "node:path";

import { sharedRoutes, getWatchPaths } from "routes";

let __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: "app",
  ignoredRouteFiles: [".*"],
  assetsBuildDirectory: "public/build",
  watchPaths: getWatchPaths(),
  routes: (defineRoutes) => {
    return defineRoutes((route) => {
      let routes = sharedRoutes(path.join(__dirname, "routes"));

      for (let sharedRoute of routes) {
        route(sharedRoute.url, sharedRoute.file);
      }
    });
  },
};
