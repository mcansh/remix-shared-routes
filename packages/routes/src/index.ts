import * as path from "node:path";
import { DefineRoutesFunction } from "@remix-run/dev/dist/config/routes";

import { globSync } from "glob";

let __dirname = path.dirname(new URL(import.meta.url).pathname);
let rootDir = path.resolve(__dirname, "..");

let absoluteRoutesDir = path.resolve(rootDir, "src", "routes");

export function getWatchPaths() {
  return [rootDir];
}

export function sharedRoutes(appRootDirectory: string) {
  let sharedRoutes = globSync("./**/*.{ts,tsx,js,jsx,md,mdx}", {
    cwd: absoluteRoutesDir,
    nodir: true,
    absolute: true,
  });

  let urlForRoutes = sharedRoutes.map((route) => {
    let ext = path.extname(route);
    let file = path.relative(appRootDirectory, route);

    let url = route.slice(absoluteRoutesDir.length, -ext.length);
    if (url.endsWith("/index") || url.endsWith("/route")) {
      url = url.slice(0, -"/index".length);
    }

    return { url, file };
  });

  return urlForRoutes;
}

export function sharedRoutesFunction(
  defineRoutes: DefineRoutesFunction,
  appRootDirectory: string
) {
  let routes = sharedRoutes(appRootDirectory);

  return defineRoutes((route) => {
    for (let sharedRoute of routes) {
      route(sharedRoute.url, sharedRoute.file);
    }
  });
}
