import * as React from "react";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return { message: "hey from the routes package" };
}

export default function UhhhPage() {
  let { message } = useLoaderData();
  return <div>{message}</div>;
}
