import { sharedRoutes } from "routes";
import path from "node:path";
import { Link, useLoaderData } from "@remix-run/react";

export function loader() {
  let __dirname = new URL(".", import.meta.url).pathname;
  let root = path.join(__dirname, "..");
  let routes = sharedRoutes(root);
  console.log(routes);

  return routes.map((r) => r.url);
}

export default function Index() {
  let routes = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix Turborepo Vercel example</h1>

      <h2>Routes From Package</h2>
      <ul>
        {routes.map((route) => (
          <li key={route}>
            <Link to={route}>{route}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
