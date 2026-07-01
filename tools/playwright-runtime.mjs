import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const pnpmRoot = "C:/Users/bentu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm";
const packages = readdirSync(pnpmRoot)
  .filter((name) => /^playwright@\d/.test(name))
  .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

const packageName = packages.at(-1);
if (!packageName) {
  throw new Error(`Playwright package not found under ${pnpmRoot}`);
}

const modulePath = join(pnpmRoot, packageName, "node_modules", "playwright", "index.mjs");
if (!existsSync(modulePath)) {
  throw new Error(`Playwright entrypoint not found at ${modulePath}`);
}

const playwright = await import(pathToFileURL(modulePath).href);

export const { chromium } = playwright;
