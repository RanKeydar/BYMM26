import assert from "node:assert/strict";
import { chromium } from "file:///C:/Users/bentu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/index.mjs";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

async function canvasPixel(canvas, x, y) {
  return canvas.evaluate((element, point) => [
    ...element.getContext("2d").getImageData(point.x, point.y, 1, 1).data,
  ], { x, y });
}

async function clickCanvasPixel(canvas, x, y) {
  const box = await canvas.boundingBox();
  assert.ok(box, "canvas must have a bounding box");
  await canvas.click({
    position: {
      x: x / 720 * box.width,
      y: y / 960 * box.height,
    },
  });
}

async function tapCanvasPixel(page, canvas, x, y) {
  const box = await canvas.boundingBox();
  assert.ok(box, "canvas must have a bounding box");
  await page.touchscreen.tap(
    box.x + x / 720 * box.width,
    box.y + y / 960 * box.height,
  );
}

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

await page.goto("http://127.0.0.1:4173/coloring.html", { waitUntil: "networkidle" });
await page.locator("#loading-state").waitFor({ state: "hidden" });

const canvas = page.locator("#coloring-canvas");
const swatches = page.locator(".swatch");
const characterButtons = page.locator(".character-option");
const undoButton = page.locator("#undo-button");

assert.equal(await characterButtons.count(), 9);
assert.equal(await swatches.count(), 24);
assert.equal(await page.locator("#canvas-toolbar > #undo-button").count(), 1);
assert.equal(await page.locator("#hint-button").count(), 0);
assert.match(await page.locator("#page-title").innerText(), /טרללרו/);

await page.locator("#zoom-in-button").click();
assert.equal(await page.locator("#zoom-value").innerText(), "125%");
assert.equal(await page.locator("#canvas-surface").evaluate((element) => element.style.width), "125%");
await page.locator("#zoom-reset-button").click();
assert.equal(await page.locator("#zoom-value").innerText(), "100%");

const basePixel = await canvasPixel(canvas, 20, 20);
await swatches.nth(1).click();
assert.equal(await swatches.nth(1).getAttribute("aria-pressed"), "true");
assert.equal(
  await swatches.nth(1).evaluate((element) => getComputedStyle(element, "::after").opacity),
  "1",
);
await tapCanvasPixel(page, canvas, 20, 20);
const darkPixel = await canvasPixel(canvas, 20, 20);
assert.notDeepEqual(darkPixel, basePixel, "first fill should change the region");

await swatches.nth(0).click();
await clickCanvasPixel(canvas, 20, 20);
const repaintedPixel = await canvasPixel(canvas, 20, 20);
assert.notDeepEqual(repaintedPixel, darkPixel, "a dark region must be repaintable");

await page.keyboard.press("Control+z");
assert.deepEqual(await canvasPixel(canvas, 20, 20), darkPixel, "Ctrl+Z should restore the previous color");
await undoButton.click();
assert.deepEqual(await canvasPixel(canvas, 20, 20), basePixel, "the visible undo button should restore the base color");
assert.equal(await undoButton.isDisabled(), true);

const beachPoint = { x: 420, y: 760 };
const sharkPoint = { x: 325, y: 430 };
const beachPixel = await canvasPixel(canvas, beachPoint.x, beachPoint.y);
const sharkPixel = await canvasPixel(canvas, sharkPoint.x, sharkPoint.y);
await swatches.nth(1).click();
await clickCanvasPixel(canvas, 44, 540);
assert.deepEqual(
  await canvasPixel(canvas, beachPoint.x, beachPoint.y),
  beachPixel,
  "the Tralalero sea region should not leak into the beach area",
);
assert.deepEqual(
  await canvasPixel(canvas, sharkPoint.x, sharkPoint.y),
  sharkPixel,
  "the Tralalero sea region should not leak into the shark body",
);
await page.keyboard.press("Control+z");
await swatches.nth(3).click();
await clickCanvasPixel(canvas, beachPoint.x, beachPoint.y);
assert.notDeepEqual(
  await canvasPixel(canvas, beachPoint.x, beachPoint.y),
  beachPixel,
  "the Tralalero beach area should remain directly colorable",
);
await page.keyboard.press("Control+z");

const linePoint = await canvas.evaluate((element) => {
  const context = element.getContext("2d");
  const { data, width, height } = context.getImageData(0, 0, element.width, element.height);
  for (let y = 20; y < height - 20; y += 1) {
    for (let x = 20; x < width - 20; x += 1) {
      const offset = (y * width + x) * 4;
      if (data[offset] > 30) continue;
      const neighborOffset = (y * width + x + 3) * 4;
      if (data[neighborOffset] > 245) return { x, y };
    }
  }
  return null;
});
assert.ok(linePoint, "a line pixel near a fillable region should exist");
await swatches.nth(2).click();
await clickCanvasPixel(canvas, linePoint.x, linePoint.y);
assert.match(await page.locator("#status-message").innerText(), /הוצמד|נצבע/);

const loadedTitles = [];
for (let index = 0; index < await characterButtons.count(); index += 1) {
  await characterButtons.nth(index).click();
  await page.locator("#loading-state").waitFor({ state: "hidden" });
  loadedTitles.push(await page.locator("#page-title").innerText());
}
assert.equal(new Set(loadedTitles).size, 9);

await swatches.nth(0).click();
await clickCanvasPixel(canvas, 20, 20);
assert.equal(await undoButton.isEnabled(), true);

const mobileLayout = await page.evaluate(() => ({
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
}));
assert.ok(mobileLayout.scrollWidth <= mobileLayout.clientWidth + 1, "mobile page should not overflow horizontally");
await page.screenshot({ path: "tmp/coloring-mobile.png" });

const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await desktopPage.goto("http://127.0.0.1:4173/coloring.html", { waitUntil: "networkidle" });
await desktopPage.locator("#loading-state").waitFor({ state: "hidden" });
await desktopPage.screenshot({ path: "tmp/coloring-desktop.png" });

const result = {
  characterCount: await characterButtons.count(),
  paletteCount: await swatches.count(),
  loadedTitles,
  zoom: "75%-300%",
  darkRegionRepainted: true,
  multiStepUndo: true,
  lineTapResolved: true,
  mobileLayout,
  errors,
};
assert.deepEqual(errors, []);
console.log(JSON.stringify(result, null, 2));
await browser.close();
