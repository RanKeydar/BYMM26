import { chromium } from "file:///C:/Users/bentu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.61.0/node_modules/playwright/index.mjs";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 980 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
const characterCount = await page.locator(".character-chip").count();
const characterNames = await page.locator(".character-chip").allTextContents();
await page.locator(".character-chip", { hasText: "Trenostruzzo Turbo 3000" }).click();
await page.locator('[data-mode="cliff"]').click();
await page.locator("#primary-action").click();
await page.waitForTimeout(700);
const scoreBeforeStart = await page.locator("#hud-score").innerText();
await page.keyboard.press("Space");
await page.waitForTimeout(1200);

const result = {
  characterCount,
  hasLirili: characterNames.some((name) => name.includes("Lirili Larila")),
  hasCocofanto: characterNames.some((name) => name.includes("Cocofanto Elefanto")),
  hasTrenostruzzo: characterNames.some((name) => name.includes("Trenostruzzo Turbo 3000")),
  scoreBeforeStart,
  mode: await page.locator("#hud-mode").innerText(),
  score: await page.locator("#hud-score").innerText(),
  lives: await page.locator("#hud-lives").innerText(),
  status: await page.locator("#hud-status").innerText(),
  canvasCount: await page.locator("canvas").count(),
  errors,
};

await page.screenshot({ path: "tmp/cliff-test.png", fullPage: true });
await page.waitForTimeout(5500);
result.livesAfterRunning = await page.locator("#hud-lives").innerText();
result.statusAfterRunning = await page.locator("#hud-status").innerText();
await page.locator('[data-mode="runner"]').click();
await page.waitForTimeout(700);
result.runnerMode = await page.locator("#hud-mode").innerText();
await page.locator('[data-mode="battle"]').click();
await page.waitForTimeout(700);
result.battleMode = await page.locator("#hud-mode").innerText();
console.log(JSON.stringify(result, null, 2));
await browser.close();
