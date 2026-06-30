const PAGES = [
  {
    id: "tralalero",
    name: "Tralalero Tralala",
    hebrewName: "טרללרו טרללה",
    lineArt: "assets/coloring/tralalero.png",
    avatar: "assets/characters/tralalero.png",
    palette: ["#9bdcf7", "#4b83d6", "#89949c", "#f0c989", "#f7f4ea", "#e36b55"],
  },
  {
    id: "bombardiro",
    name: "Bombardiro Crocodilo",
    hebrewName: "בומברדירו קרוקודילו",
    lineArt: "assets/coloring/bombardiro.png",
    avatar: "assets/characters/bombardiro.png",
    palette: ["#b9e5ff", "#75a85a", "#4d6068", "#91ba6c", "#d9bd86", "#d85843"],
  },
  {
    id: "ballerina",
    name: "Ballerina Cappuccina",
    hebrewName: "בלרינה קפוצ'ינה",
    lineArt: "assets/coloring/ballerina.png",
    avatar: "assets/characters/ballerina.png",
    palette: ["#f4d9ed", "#a985bd", "#d8aa82", "#f09fbd", "#76b36b", "#ffd447"],
  },
  {
    id: "tung",
    name: "Tung Tung Tung Sahur",
    hebrewName: "טונג טונג טונג סהור",
    lineArt: "assets/coloring/tung.png",
    avatar: "assets/characters/tung.png",
    palette: ["#bed7f2", "#69a86a", "#c98e58", "#8a5935", "#e4b36d", "#cf6657"],
  },
  {
    id: "chimpanzini",
    name: "Chimpanzini Bananini",
    hebrewName: "שימפנזיני בנניני",
    lineArt: "assets/coloring/chimpanzini.png",
    avatar: "assets/characters/chimpanzini.png",
    palette: ["#68a75a", "#b9dc75", "#d28b5f", "#79533d", "#608f55", "#ffd447"],
  },
  {
    id: "lirili",
    name: "Lirili Larila",
    hebrewName: "לירילי לרילה",
    lineArt: "assets/coloring/lirili.png",
    avatar: "assets/characters/lirili.png",
    palette: ["#a9dcf5", "#d6b27d", "#ffd45e", "#a99682", "#68a84e", "#ef8d76"],
  },
  {
    id: "cocofanto",
    name: "Cocofanto Elefanto",
    hebrewName: "קוקופנטו אלפנטו",
    lineArt: "assets/coloring/cocofanto.png",
    avatar: "assets/characters/cocofanto.png",
    palette: ["#9edcf6", "#5fa75d", "#d7a75e", "#a89a8d", "#8b572f", "#f2d7a0"],
  },
  {
    id: "trenostruzzo",
    name: "Trenostruzzo Turbo 3000",
    hebrewName: "טרנוסטרוצו טורבו 3000",
    lineArt: "assets/coloring/trenostruzzo.png",
    avatar: "assets/characters/trenostruzzo.png",
    palette: ["#e25548", "#b9ddf3", "#a8b0b6", "#75a75e", "#454b52", "#f0c96e"],
  },
  {
    id: "trenostruzzo-original",
    name: "Trenostruzzo Originale",
    hebrewName: "טרנוסטרוצו מקורית",
    lineArt: "assets/coloring/trenostruzzo-original.png",
    avatar: "assets/characters/trenostruzzo-original.png",
    palette: ["#9bdcf7", "#1f3f32", "#d7d7d7", "#f1d0a4", "#1f1f1f", "#75a75e"],
  },
];

const EXTRA_COLORS = [
  "#ff8a34",
  "#8e61c7",
  "#f08ab8",
  "#31bfa3",
  "#375a9e",
  "#7a4b32",
  "#ffed4a",
  "#9bd24b",
  "#168d62",
  "#45c9e8",
  "#2f6fe4",
  "#4b3f8f",
  "#6c3a8d",
  "#e94f9d",
  "#d9364f",
  "#ffb28b",
  "#f3e4c5",
  "#5b5d63",
];

const canvas = document.querySelector("#coloring-canvas");
const context = canvas.getContext("2d", { willReadFrequently: true });
const canvasFrame = document.querySelector(".canvas-frame");
const canvasSurface = document.querySelector("#canvas-surface");
const canvasToolbar = document.querySelector("#canvas-toolbar");
const characterStrip = document.querySelector("#character-strip");
const paletteElement = document.querySelector("#palette");
const pageTitle = document.querySelector("#page-title");
const loadingState = document.querySelector("#loading-state");
const statusMessage = document.querySelector("#status-message");
const undoButton = document.querySelector("#undo-button");
const resetButton = document.querySelector("#reset-button");
const saveButton = document.querySelector("#save-button");
const toast = document.querySelector("#toast");
const zoomOutButton = document.querySelector("#zoom-out-button");
const zoomInButton = document.querySelector("#zoom-in-button");
const zoomResetButton = document.querySelector("#zoom-reset-button");
const zoomValue = document.querySelector("#zoom-value");

canvasToolbar.prepend(undoButton);

let currentPageIndex = 0;
let selectedColorIndex = 0;
let baseImage = null;
let baseImageData = null;
let workingImageData = null;
let lineMask = null;
let virtualBarrierMask = null;
let regionMap = null;
let regionSizes = [];
let regionColors = new Map();
let undoStack = [];
let zoomLevel = 1;
let toastTimer = null;
let loadRequestId = 0;

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;
const MAX_UNDO_STEPS = 30;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 1700);
}

function renderCharacters() {
  characterStrip.innerHTML = "";
  PAGES.forEach((page, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "character-option";
    button.setAttribute("aria-pressed", String(index === currentPageIndex));
    button.setAttribute("aria-label", `דף צביעה של ${page.hebrewName}, ${page.name}`);
    button.innerHTML = `<img src="${page.avatar}" alt="" /><span>${page.hebrewName}</span><small>${page.name}</small>`;
    button.addEventListener("click", () => selectPage(index));
    characterStrip.appendChild(button);
  });
}

function renderPalette() {
  const page = PAGES[currentPageIndex];
  const colors = [...page.palette, ...EXTRA_COLORS];
  paletteElement.innerHTML = "";
  colors.forEach((color, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "swatch";
    button.style.background = color;
    button.setAttribute("aria-label", `צבע מספר ${index + 1}`);
    button.setAttribute("aria-pressed", String(index === selectedColorIndex));
    button.addEventListener("click", () => {
      selectedColorIndex = index;
      renderPalette();
      statusMessage.textContent = "נבחר צבע";
    });
    paletteElement.appendChild(button);
  });
}

function cloneImageData(imageData) {
  const clone = context.createImageData(imageData.width, imageData.height);
  clone.data.set(imageData.data);
  return clone;
}

function createLineMask(imageData) {
  const mask = new Uint8Array(canvas.width * canvas.height);
  for (let index = 0; index < mask.length; index += 1) {
    const offset = index * 4;
    const luminance = imageData.data[offset] * 0.299
      + imageData.data[offset + 1] * 0.587
      + imageData.data[offset + 2] * 0.114;
    if (luminance < 205) mask[index] = 1;
  }
  return mask;
}

function removeNumberLabels(imageData) {
  const width = imageData.width;
  const height = imageData.height;
  const total = width * height;
  const black = new Uint8Array(total);
  const visited = new Uint8Array(total);
  const componentMask = new Uint8Array(total);
  const queue = new Int32Array(total);
  const candidates = [];

  for (let index = 0; index < total; index += 1) {
    const offset = index * 4;
    const luminance = imageData.data[offset] * 0.299
      + imageData.data[offset + 1] * 0.587
      + imageData.data[offset + 2] * 0.114;
    if (luminance < 95) black[index] = 1;
  }

  for (let start = 0; start < total; start += 1) {
    if (!black[start] || visited[start]) continue;
    let head = 0;
    let tail = 0;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    const component = [];
    visited[start] = 1;
    queue[tail++] = start;

    while (head < tail) {
      const index = queue[head++];
      component.push(index);
      componentMask[index] = 1;
      const x = index % width;
      const y = Math.floor(index / width);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          if (!offsetX && !offsetY) continue;
          const nextX = x + offsetX;
          const nextY = y + offsetY;
          if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue;
          const next = nextY * width + nextX;
          if (!black[next] || visited[next]) continue;
          visited[next] = 1;
          queue[tail++] = next;
        }
      }
    }

    const boxWidth = maxX - minX + 1;
    const boxHeight = maxY - minY + 1;
    const area = component.length;
    const looksLikeDigit =
      boxWidth >= 4 && boxWidth <= 19
      && boxHeight >= 8 && boxHeight <= 26
      && area >= 10 && area <= 180
      && boxHeight >= boxWidth * 0.75
      && boxWidth <= boxHeight * 1.45;

    if (looksLikeDigit) {
      let nearbyInk = 0;
      const margin = 7;
      for (let y = Math.max(0, minY - margin); y <= Math.min(height - 1, maxY + margin); y += 1) {
        for (let x = Math.max(0, minX - margin); x <= Math.min(width - 1, maxX + margin); x += 1) {
          const index = y * width + x;
          if (black[index] && !componentMask[index]) nearbyInk += 1;
        }
      }
      if (nearbyInk <= Math.max(12, area * 0.55)) candidates.push(component);
    }

    component.forEach((index) => {
      componentMask[index] = 0;
    });
  }

  candidates.flat().forEach((index) => {
    const x = index % width;
    const y = Math.floor(index / width);
    for (let offsetY = -2; offsetY <= 2; offsetY += 1) {
      for (let offsetX = -2; offsetX <= 2; offsetX += 1) {
        const nextX = x + offsetX;
        const nextY = y + offsetY;
        if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue;
        const offset = (nextY * width + nextX) * 4;
        imageData.data[offset] = 255;
        imageData.data[offset + 1] = 255;
        imageData.data[offset + 2] = 255;
        imageData.data[offset + 3] = 255;
      }
    }
  });
}

function strengthenLineMask(source) {
  const width = canvas.width;
  const height = canvas.height;
  const strengthened = source.slice();
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      if (!source[index]) continue;
      for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          strengthened[index + offsetY * width + offsetX] = 1;
        }
      }
    }
  }
  return strengthened;
}

function normalizeLineArt(imageData, mask) {
  for (let index = 0; index < mask.length; index += 1) {
    const offset = index * 4;
    const value = mask[index] ? 18 : 255;
    imageData.data[offset] = value;
    imageData.data[offset + 1] = value;
    imageData.data[offset + 2] = value;
    imageData.data[offset + 3] = 255;
  }
}

function drawMaskLine(mask, x1, y1, x2, y2, thickness = 3) {
  const width = canvas.width;
  const height = canvas.height;
  const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  const radius = Math.max(1, Math.floor(thickness / 2));
  for (let step = 0; step <= steps; step += 1) {
    const progress = steps ? step / steps : 0;
    const x = Math.round(x1 + (x2 - x1) * progress);
    const y = Math.round(y1 + (y2 - y1) * progress);
    for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
      for (let offsetX = -radius; offsetX <= radius; offsetX += 1) {
        const nextX = x + offsetX;
        const nextY = y + offsetY;
        if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue;
        mask[nextY * width + nextX] = 1;
      }
    }
  }
}

function drawMaskPath(mask, points, thickness = 3) {
  for (let index = 1; index < points.length; index += 1) {
    const [x1, y1] = points[index - 1];
    const [x2, y2] = points[index];
    drawMaskLine(mask, x1, y1, x2, y2, thickness);
  }
}

function drawInkLine(imageData, x1, y1, x2, y2, thickness = 3) {
  const { width, height, data } = imageData;
  const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  const radius = Math.max(1, Math.floor(thickness / 2));
  for (let step = 0; step <= steps; step += 1) {
    const progress = steps ? step / steps : 0;
    const x = Math.round(x1 + (x2 - x1) * progress);
    const y = Math.round(y1 + (y2 - y1) * progress);
    for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
      for (let offsetX = -radius; offsetX <= radius; offsetX += 1) {
        const nextX = x + offsetX;
        const nextY = y + offsetY;
        if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue;
        const offset = (nextY * width + nextX) * 4;
        data[offset] = 18;
        data[offset + 1] = 18;
        data[offset + 2] = 18;
        data[offset + 3] = 255;
      }
    }
  }
}

function drawInkPath(imageData, points, thickness = 3) {
  for (let index = 1; index < points.length; index += 1) {
    const [x1, y1] = points[index - 1];
    const [x2, y2] = points[index];
    drawInkLine(imageData, x1, y1, x2, y2, thickness);
  }
}

function drawPageBoundaryGuides(imageData, pageId) {
  if (pageId === "tralalero") {
    drawInkPath(imageData, [[0, 584], [78, 585], [132, 583]], 3);
    drawInkPath(imageData, [[575, 588], [638, 584], [720, 585]], 3);
  }
}

function createVirtualBarriers(pageId) {
  const mask = new Uint8Array(canvas.width * canvas.height);
  if (pageId === "tralalero") {
    drawMaskPath(mask, [[0, 514], [150, 512]], 4);
    drawMaskPath(mask, [[610, 514], [720, 511]], 4);
    drawMaskPath(mask, [[0, 584], [132, 583]], 4);
    drawMaskPath(mask, [[575, 588], [720, 585]], 4);
  } else if (pageId === "trenostruzzo-original") {
    drawMaskPath(mask, [
      [45, 38],
      [62, 25],
      [95, 19],
      [126, 28],
      [156, 21],
      [190, 23],
      [225, 18],
      [260, 23],
      [296, 22],
      [332, 28],
      [366, 29],
      [402, 36],
      [432, 39],
      [466, 52],
      [494, 69],
      [518, 88],
      [535, 112],
      [520, 118],
      [478, 104],
      [430, 94],
      [376, 94],
      [324, 88],
      [278, 82],
      [232, 88],
      [188, 84],
      [142, 92],
      [98, 88],
      [55, 96],
      [45, 38],
    ], 3);
  }
  return mask;
}

function mergeMasks(first, second) {
  const merged = first.slice();
  for (let index = 0; index < second.length; index += 1) {
    if (second[index]) merged[index] = 1;
  }
  return merged;
}

function attachVirtualBarriersToRegions(labels, barrierMask) {
  const width = canvas.width;
  const height = canvas.height;
  for (let index = 0; index < barrierMask.length; index += 1) {
    if (!barrierMask[index]) continue;
    const x = index % width;
    const y = Math.floor(index / width);
    let label = 0;
    for (let distance = 1; distance <= 14 && !label; distance += 1) {
      const below = y + distance;
      if (below < height) label = labels[below * width + x];
    }
    for (let distance = 1; distance <= 14 && !label; distance += 1) {
      const above = y - distance;
      if (above >= 0) label = labels[above * width + x];
    }
    if (label) labels[index] = label;
  }
}

function buildRegions(mask) {
  const width = canvas.width;
  const height = canvas.height;
  const total = width * height;
  const labels = new Int32Array(total);
  const sizes = [0];
  const queue = new Int32Array(total);
  let regionId = 0;

  for (let start = 0; start < total; start += 1) {
    if (mask[start] || labels[start]) continue;
    regionId += 1;
    let head = 0;
    let tail = 0;
    let size = 0;
    labels[start] = regionId;
    queue[tail++] = start;

    while (head < tail) {
      const index = queue[head++];
      const x = index % width;
      size += 1;

      const above = index - width;
      const below = index + width;
      if (above >= 0 && !mask[above] && !labels[above]) {
        labels[above] = regionId;
        queue[tail++] = above;
      }
      if (below < total && !mask[below] && !labels[below]) {
        labels[below] = regionId;
        queue[tail++] = below;
      }
      if (x > 0 && !mask[index - 1] && !labels[index - 1]) {
        labels[index - 1] = regionId;
        queue[tail++] = index - 1;
      }
      if (x < width - 1 && !mask[index + 1] && !labels[index + 1]) {
        labels[index + 1] = regionId;
        queue[tail++] = index + 1;
      }
    }
    sizes[regionId] = size;
  }

  return { labels, sizes };
}

function regionAt(labels, x, y) {
  const safeX = Math.max(0, Math.min(canvas.width - 1, Math.round(x)));
  const safeY = Math.max(0, Math.min(canvas.height - 1, Math.round(y)));
  return labels[safeY * canvas.width + safeX];
}

function mergeRegionIds(labels, sizes, regionIds) {
  const uniqueIds = [...new Set(regionIds.filter((id) => id && sizes[id] >= 12))];
  if (uniqueIds.length < 2) return;
  const mergedId = uniqueIds[0];
  const mergedSet = new Set(uniqueIds.slice(1));
  let mergedSize = sizes[mergedId];
  for (let index = 0; index < labels.length; index += 1) {
    if (!mergedSet.has(labels[index])) continue;
    mergedSize += 1;
    labels[index] = mergedId;
  }
  sizes[mergedId] = mergedSize;
  uniqueIds.slice(1).forEach((id) => {
    sizes[id] = 0;
  });
}

function collectRegionIds(labels, x1, y1, x2, y2, step = 12, excludedIds = new Set()) {
  const ids = [];
  for (let y = y1; y <= y2; y += step) {
    for (let x = x1; x <= x2; x += step) {
      const id = regionAt(labels, x, y);
      if (id && !excludedIds.has(id)) ids.push(id);
    }
  }
  return ids;
}

function applyLineArtRegionMerges(pageId, labels, sizes) {
  if (pageId !== "trenostruzzo-original") return;
  const skyIds = new Set([
    regionAt(labels, 25, 65),
    regionAt(labels, 420, 100),
    regionAt(labels, 530, 145),
    regionAt(labels, 600, 65),
  ].filter(Boolean));
  mergeRegionIds(labels, sizes, [
    ...collectRegionIds(labels, 48, 28, 430, 112, 10, skyIds),
    regionAt(labels, 80, 80),
    regionAt(labels, 130, 70),
    regionAt(labels, 260, 70),
  ]);
}

function updateUndoButton() {
  undoButton.disabled = undoStack.length === 0;
}

function preparePageRegions() {
  const page = PAGES[currentPageIndex];
  const sourceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  if (page.id !== "tralalero") removeNumberLabels(sourceImageData);
  drawPageBoundaryGuides(sourceImageData, page.id);
  const visibleLineMask = strengthenLineMask(createLineMask(sourceImageData));
  virtualBarrierMask = createVirtualBarriers(page.id);
  lineMask = mergeMasks(visibleLineMask, virtualBarrierMask);
  normalizeLineArt(sourceImageData, visibleLineMask);
  context.putImageData(sourceImageData, 0, 0);
  baseImageData = cloneImageData(sourceImageData);
  workingImageData = cloneImageData(sourceImageData);
  const regions = buildRegions(lineMask);
  attachVirtualBarriersToRegions(regions.labels, virtualBarrierMask);
  applyLineArtRegionMerges(page.id, regions.labels, regions.sizes);
  regionMap = regions.labels;
  regionSizes = regions.sizes;
  regionColors = new Map();
  undoStack = [];
  updateUndoButton();
}

function loadCurrentPage() {
  const page = PAGES[currentPageIndex];
  pageTitle.textContent = `${page.hebrewName} · ${page.name}`;
  const requestId = ++loadRequestId;
  const image = new Image();
  loadingState.hidden = false;
  loadingState.textContent = "טוען דף צביעה…";
  baseImage = image;
  regionMap = null;
  image.onload = () => {
    if (requestId !== loadRequestId) return;
    try {
      context.save();
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.restore();
      preparePageRegions();
      setZoom(1, false);
      canvasFrame.scrollLeft = 0;
      canvasFrame.scrollTop = 0;
      statusMessage.textContent = "בחר צבע וגע בתוך שטח";
    } catch (error) {
      console.error("Coloring page preparation failed", error);
      baseImage = null;
      regionMap = null;
      statusMessage.textContent = "היתה בעיה בטעינת הדף. נסו לבחור דמות מחדש";
      showToast("טעינת הדף נכשלה");
    } finally {
      if (requestId === loadRequestId) {
        loadingState.hidden = true;
      }
    }
  };
  image.onerror = () => {
    if (requestId !== loadRequestId) return;
    baseImage = null;
    regionMap = null;
    loadingState.hidden = true;
    statusMessage.textContent = "לא הצלחנו לטעון את דף הצביעה";
    showToast("טעינת הדף נכשלה");
  };
  image.src = page.lineArt;
}

function selectPage(index) {
  if (index === currentPageIndex && baseImage) return;
  currentPageIndex = index;
  selectedColorIndex = 0;
  renderCharacters();
  renderPalette();
  loadCurrentPage();
  const activeButton = characterStrip.children[index];
  activeButton?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function hexToRgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function findNearestRegion(startX, startY, radius) {
  const width = canvas.width;
  const height = canvas.height;
  const directRegion = regionMap[startY * width + startX];
  if (directRegion && regionSizes[directRegion] >= 12) {
    return { regionId: directRegion, snapped: false };
  }

  let nearestRegion = 0;
  let nearestDistance = Infinity;
  for (let distance = 1; distance <= radius; distance += 1) {
    const minX = Math.max(0, startX - distance);
    const maxX = Math.min(width - 1, startX + distance);
    const minY = Math.max(0, startY - distance);
    const maxY = Math.min(height - 1, startY + distance);

    for (let x = minX; x <= maxX; x += 1) {
      const topRegion = regionMap[minY * width + x];
      const topDistance = (x - startX) ** 2 + (minY - startY) ** 2;
      if (topRegion && regionSizes[topRegion] >= 12 && topDistance < nearestDistance) {
        nearestRegion = topRegion;
        nearestDistance = topDistance;
      }
      const bottomRegion = regionMap[maxY * width + x];
      const bottomDistance = (x - startX) ** 2 + (maxY - startY) ** 2;
      if (bottomRegion && regionSizes[bottomRegion] >= 12 && bottomDistance < nearestDistance) {
        nearestRegion = bottomRegion;
        nearestDistance = bottomDistance;
      }
    }
    for (let y = minY + 1; y < maxY; y += 1) {
      const leftRegion = regionMap[y * width + minX];
      const leftDistance = (minX - startX) ** 2 + (y - startY) ** 2;
      if (leftRegion && regionSizes[leftRegion] >= 12 && leftDistance < nearestDistance) {
        nearestRegion = leftRegion;
        nearestDistance = leftDistance;
      }
      const rightRegion = regionMap[y * width + maxX];
      const rightDistance = (maxX - startX) ** 2 + (y - startY) ** 2;
      if (rightRegion && regionSizes[rightRegion] >= 12 && rightDistance < nearestDistance) {
        nearestRegion = rightRegion;
        nearestDistance = rightDistance;
      }
    }
    if (nearestRegion) return { regionId: nearestRegion, snapped: true };
  }
  return null;
}

function applyRegionColor(regionId, color, recordHistory = true) {
  const previousColor = regionColors.get(regionId) ?? null;
  if (previousColor === color) {
    statusMessage.textContent = "השטח כבר צבוע בצבע הזה";
    return false;
  }

  if (recordHistory) {
    undoStack.push({ regionId, previousColor });
    if (undoStack.length > MAX_UNDO_STEPS) undoStack.shift();
  }

  if (color) regionColors.set(regionId, color);
  else regionColors.delete(regionId);

  const fill = color ? hexToRgb(color) : null;
  for (let index = 0; index < regionMap.length; index += 1) {
    if (regionMap[index] !== regionId) continue;
    const offset = index * 4;
    if (fill) {
      workingImageData.data[offset] = fill[0];
      workingImageData.data[offset + 1] = fill[1];
      workingImageData.data[offset + 2] = fill[2];
      workingImageData.data[offset + 3] = 255;
    } else {
      workingImageData.data[offset] = baseImageData.data[offset];
      workingImageData.data[offset + 1] = baseImageData.data[offset + 1];
      workingImageData.data[offset + 2] = baseImageData.data[offset + 2];
      workingImageData.data[offset + 3] = baseImageData.data[offset + 3];
    }
  }
  context.putImageData(workingImageData, 0, 0);
  updateUndoButton();
  return true;
}

function undoLastColor() {
  const change = undoStack.pop();
  if (!change) return;
  applyRegionColor(change.regionId, change.previousColor, false);
  updateUndoButton();
  statusMessage.textContent = "הצביעה האחרונה בוטלה";
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.max(0, Math.min(canvas.width - 1, Math.floor((event.clientX - rect.left) * canvas.width / rect.width))),
    y: Math.max(0, Math.min(canvas.height - 1, Math.floor((event.clientY - rect.top) * canvas.height / rect.height))),
  };
}

function paintFromPointer(event) {
  if (!baseImage || !loadingState.hidden || !regionMap) return;
  const point = canvasPoint(event);
  const rect = canvas.getBoundingClientRect();
  const radius = Math.max(8, Math.min(34, Math.ceil(15 * canvas.width / rect.width)));
  const target = findNearestRegion(point.x, point.y, radius);
  if (!target) {
    showToast("נסה לגעת מעט בתוך השטח");
    return;
  }
  const colors = [...PAGES[currentPageIndex].palette, ...EXTRA_COLORS];
  const color = colors[selectedColorIndex];
  if (applyRegionColor(target.regionId, color)) {
    statusMessage.textContent = target.snapped
      ? "הצבע הוצמד לשטח הקרוב"
      : "נצבע שטח";
  }
}

let touchStart = null;

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") {
    touchStart = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    return;
  }
  event.preventDefault();
  paintFromPointer(event);
});

canvas.addEventListener("pointerup", (event) => {
  if (!touchStart || touchStart.pointerId !== event.pointerId) return;
  const movement = Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y);
  touchStart = null;
  if (movement <= 10) paintFromPointer(event);
});

canvas.addEventListener("pointercancel", () => {
  touchStart = null;
});

function setZoom(nextZoom, preserveCenter = true) {
  const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(nextZoom * 100) / 100));
  const previousZoom = zoomLevel;
  const centerX = canvasFrame.scrollLeft + canvasFrame.clientWidth / 2;
  const centerY = canvasFrame.scrollTop + canvasFrame.clientHeight / 2;
  zoomLevel = clamped;
  canvasSurface.style.width = `${zoomLevel * 100}%`;
  zoomValue.textContent = `${Math.round(zoomLevel * 100)}%`;
  zoomOutButton.disabled = zoomLevel <= MIN_ZOOM;
  zoomInButton.disabled = zoomLevel >= MAX_ZOOM;

  if (preserveCenter && previousZoom > 0) {
    const ratio = zoomLevel / previousZoom;
    window.requestAnimationFrame(() => {
      canvasFrame.scrollLeft = centerX * ratio - canvasFrame.clientWidth / 2;
      canvasFrame.scrollTop = centerY * ratio - canvasFrame.clientHeight / 2;
    });
  }
}

undoButton.addEventListener("click", undoLastColor);

zoomOutButton.addEventListener("click", () => setZoom(zoomLevel - ZOOM_STEP));
zoomInButton.addEventListener("click", () => setZoom(zoomLevel + ZOOM_STEP));
zoomResetButton.addEventListener("click", () => setZoom(1));

canvasFrame.addEventListener("wheel", (event) => {
  if (!event.ctrlKey && !event.metaKey) return;
  event.preventDefault();
  setZoom(zoomLevel + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
}, { passive: false });

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    undoLastColor();
    return;
  }
  if ((event.ctrlKey || event.metaKey) && (event.key === "+" || event.key === "=")) {
    event.preventDefault();
    setZoom(zoomLevel + ZOOM_STEP);
    return;
  }
  if ((event.ctrlKey || event.metaKey) && event.key === "-") {
    event.preventDefault();
    setZoom(zoomLevel - ZOOM_STEP);
    return;
  }
  if ((event.ctrlKey || event.metaKey) && event.key === "0") {
    event.preventDefault();
    setZoom(1);
  }
});

resetButton.addEventListener("click", () => {
  loadCurrentPage();
  showToast("דף הצביעה אופס");
});

saveButton.addEventListener("click", async () => {
  const page = PAGES[currentPageIndex];
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) return;
  const file = new File([blob], `${page.id}-coloring.png`, { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: `דף הצביעה של ${page.name}` });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(url);
  showToast("דף הצביעה נשמר");
});

renderCharacters();
renderPalette();
loadCurrentPage();
