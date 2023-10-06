import { sharedRoutes, getWatchPaths } from "routes";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: "app",
  ignoredRouteFiles: [".*"],
  assetsBuildDirectory: "public/build",
  watchPaths: getWatchPaths(),
  routes: (defineRoutes) => sharedRoutes(defineRoutes, "app"),
};
