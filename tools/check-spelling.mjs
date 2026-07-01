import assert from "node:assert/strict";
import { chromium } from "./playwright-runtime.mjs";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  isMobile: true,
  hasTouch: true,
});

const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));

await page.goto("http://127.0.0.1:4173/spelling.html", { waitUntil: "networkidle" });

assert.equal(await page.locator(".spelling-character").count(), 8);
assert.equal(await page.locator(".spelling-character strong").count(), 0);
assert.equal(await page.locator(".spelling-character small").count(), 0);
assert.equal(await page.locator(".letter-button").count(), 27);
assert.equal(await page.locator(".character-panel .eyebrow").innerText(), "בחר דמות");
assert.equal(await page.locator("#next-button").innerText(), "למילה הבאה");
assert.equal(await page.locator("#retry-button").innerText(), "ניסיון נוסף");
assert.equal(await page.locator("#instructions-panel").isVisible(), false);
await page.locator("#instructions-toggle").click();
assert.equal(await page.locator("#instructions-panel").isVisible(), true);
await page.locator("#instructions-toggle").click();
assert.equal(await page.locator("#instructions-panel").isVisible(), false);
assert.match(await page.locator("#hebrew-name").innerText(), /טרללרו/);
assert.equal(await page.locator("#target-word").innerText(), "כריש");
assert.equal(await page.locator("#game-status").isVisible(), false);
assert.equal(await page.locator(".score-row").isVisible(), false);

async function guessWord(word) {
  for (const letter of [...new Set([...word].filter((character) => /[א-ת]/.test(character)))]) {
    await page.getByRole("button", { name: `אות ${letter}` }).click();
  }
}

await guessWord("כריש");
assert.ok(await page.locator(".word-cell.revealed", { hasText: "כ" }).count() >= 1);
assert.equal(await page.locator(".component-chip.done", { hasText: "כריש" }).count(), 1);
assert.equal(await page.locator(".component-effect").count(), 1);
assert.equal(await page.locator(".component-effect.fresh").count(), 1);

await page.locator("#next-button").click();
assert.equal(await page.locator("#target-word").innerText(), "נעל");
await page.getByRole("button", { name: "אות א" }).click();
assert.equal(await page.locator(".mistake-piece.used").count(), 1);

await page.locator("#mode-visual").click();
assert.equal(await page.locator("#mode-visual").getAttribute("aria-pressed"), "true");
assert.equal(await page.locator("#target-word").isVisible(), false);
assert.equal(await page.locator("#target-visual").isVisible(), true);
assert.equal(await page.locator("#target-visual .visual-icon").count(), 1);
await page.locator("#mode-copy").click();
assert.equal(await page.locator("#target-word").isVisible(), true);

await page.locator(".spelling-character").nth(1).click();
assert.match(await page.locator("#hebrew-name").innerText(), /בומברדירו/);
assert.equal(await page.locator("#target-word").innerText(), "תנין");

for (const word of ["תנין", "מטוס", "טיל", "פצצה", "כנף", "מנוע"]) {
  await guessWord(word);
  if (word !== "מנוע") await page.locator("#next-button").click();
}
assert.equal(await page.locator("#reward-stage.final-reward").count(), 1);
assert.equal(await page.locator("#final-ceremony").isVisible(), true);
await page.waitForSelector("#final-screen:not([hidden])");
assert.equal(await page.locator("#final-screen").isVisible(), true);
assert.match(await page.locator("#final-title").innerText(), /השלים את כל הרכיבים/);
assert.equal(await page.locator("#final-action-label").innerText(), "הטלת פצצות");
await page.waitForFunction(() => document.querySelectorAll("#final-confetti i").length > 20);
assert.ok(await page.locator("#final-confetti i").count() > 20);
await page.waitForFunction(() => document.querySelectorAll("#final-screen-confetti i").length > 100);
assert.ok(await page.locator("#final-screen-confetti i").count() > 100);
assert.equal(await page.locator("#final-ceremony.action-bombardiro").count(), 1);
assert.equal(await page.locator("#final-screen.action-bombardiro").count(), 1);
assert.equal(
  await page.locator("#final-screen.action-bombardiro .final-bombs").evaluate((node) => getComputedStyle(node).display),
  "block",
);
assert.equal(await page.locator(".component-chip.done").count(), 6);
assert.equal(await page.locator(".component-effect").count(), 6);

await page.locator("#final-screen-close").click();
assert.equal(await page.locator("#final-screen").isVisible(), false);

await page.locator("#next-button").click();
assert.equal(await page.locator("#target-word").innerText(), "מנוע");
assert.equal(await page.locator(".component-chip.done").count(), 6);
assert.equal(await page.locator("#final-ceremony").isVisible(), true);
await page.locator("#final-screen-close").click();
assert.equal(await page.locator("#final-screen").isVisible(), false);

await page.locator("#retry-button").click();
assert.equal(await page.locator("#target-word").innerText(), "תנין");
assert.equal(await page.locator(".component-chip.done").count(), 0);
assert.equal(await page.locator(".component-effect").count(), 0);

const mobileLayout = await page.evaluate(() => ({
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
}));
assert.ok(mobileLayout.scrollWidth <= mobileLayout.clientWidth + 1, "mobile page should not overflow horizontally");

await page.screenshot({ path: "tmp/spelling-mobile.png" });

const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await desktopPage.goto("http://127.0.0.1:4173/spelling.html", { waitUntil: "networkidle" });
await desktopPage.screenshot({ path: "tmp/spelling-desktop.png" });

const result = {
  characterCount: await page.locator(".spelling-character").count(),
  letterCount: await page.locator(".letter-button").count(),
  mobileLayout,
  errors,
};

assert.deepEqual(errors, []);
console.log(JSON.stringify(result, null, 2));
await browser.close();
