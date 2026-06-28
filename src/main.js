const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const GROUND_Y = 430;

const CHARACTERS = [
  {
    id: "tralalero",
    name: "Tralalero Tralala",
    hebrewName: "טרללרו טרללה",
    short: "TT",
    color: "#8fd5e6",
    accent: "#2d79ff",
    asset: "assets/characters/tralalero.png",
    tagline: "כריש עם שלוש נעלי NIKE כחולות ומצב ספרינט טבעי.",
    stats: { speed: 1.25, jump: 1.08, power: 0.85 },
    ability: {
      name: "ספרינט NIKE משולש",
      description: "פרץ מהיר עם נעליים. פחות נזק, אבל cooldown הכי קצר ולחץ קבוע.",
      damage: 10,
      cooldown: 430,
      effect: "dash",
      status: "ספרינט NIKE משולש",
    },
  },
  {
    id: "bombardiro",
    name: "Bombardiro Crocodilo",
    hebrewName: "בומברדירו קרוקודילו",
    short: "BC",
    color: "#6dcc58",
    accent: "#ef4b3f",
    asset: "assets/characters/bombardiro.png",
    tagline: "קרוקודיל מפציץ: איטי יותר, אבל מכה חזק.",
    stats: { speed: 0.9, jump: 0.92, power: 1.35 },
    ability: {
      name: "בומברדירו בום",
      description: "פיצוץ כבד ואיטי. הרבה נזק ורעידת מסך חזקה.",
      damage: 18,
      cooldown: 820,
      effect: "boom",
      status: "בומברדירו בום",
    },
  },
  {
    id: "ballerina",
    name: "Ballerina Cappuccina",
    hebrewName: "בלרינה קפוצ'ינה",
    short: "BA",
    color: "#f0c6d7",
    accent: "#7c5cff",
    asset: "assets/characters/ballerina.png",
    tagline: "בלרינה קטנה וזריזה, עם קפיצות אלגנטיות.",
    stats: { speed: 1.05, jump: 1.22, power: 0.95 },
    ability: {
      name: "פירואטת קפוצ׳ינה",
      description: "מכה מהירה שמרפאת קצת את הרקדנית אחרי פגיעה נקייה.",
      damage: 9,
      cooldown: 480,
      effect: "heal",
      status: "פירואטת קפוצ׳ינה",
    },
  },
  {
    id: "tung",
    name: "Tung Tung Tung Sahur",
    hebrewName: "טונג טונג טונג סהור",
    short: "TS",
    color: "#bd8451",
    accent: "#ffd447",
    asset: "assets/characters/tung.png",
    tagline: "כאוס של תוף עץ, קפיצות קצרות ומכות קצב.",
    stats: { speed: 1.0, jump: 1.0, power: 1.12 },
    ability: {
      name: "מקצב טונג מהמם",
      description: "מכת קצב שמממת לרגע את היריב ועוצרת תנופה.",
      damage: 12,
      cooldown: 660,
      effect: "stun",
      status: "מקצב טונג מהמם",
    },
  },
  {
    id: "chimpanzini",
    name: "Chimpanzini Bananini",
    hebrewName: "שימפנזיני בנניני",
    short: "CB",
    color: "#ffe066",
    accent: "#00a99d",
    asset: "assets/characters/chimpanzini.png",
    tagline: "מהיר וחלקלק, עם טריקים של בננה בזירה.",
    stats: { speed: 1.18, jump: 1.12, power: 0.9 },
    ability: {
      name: "החלקת בנניני",
      description: "יריית בננה שמאטה את היריב אחרי פגיעה.",
      damage: 11,
      cooldown: 560,
      effect: "slow",
      status: "החלקת בנניני",
    },
  },
  {
    id: "lirili",
    name: "Lirili Larila",
    hebrewName: "לירילי לרילה",
    short: "LL",
    color: "#6fae45",
    accent: "#f0c46a",
    asset: "assets/characters/lirili.png",
    tagline: "פיל־קקטוס מדברי עם כפכפים, קפיצה גבוהה ונחיתה מדויקת.",
    stats: { speed: 1.03, jump: 1.35, power: 0.98 },
    ability: {
      name: "דילוג קקטוס",
      description: "זינוק קוצני ומהיר שמאפשר לסגור מרחק ולבלבל את היריב.",
      damage: 12,
      cooldown: 590,
      effect: "dash",
      status: "דילוג קקטוס",
    },
  },
  {
    id: "cocofanto",
    name: "Cocofanto Elefanto",
    hebrewName: "קוקופנטו אלפנטו",
    short: "CE",
    color: "#8b5a2b",
    accent: "#65a844",
    asset: "assets/characters/cocofanto.png",
    tagline: "פיל־קוקוס כבד ויציב: איטי יותר, אבל חזק וקשה להזיז אותו.",
    stats: { speed: 0.82, jump: 0.86, power: 1.45 },
    ability: {
      name: "מכת קוקוס",
      description: "מכה כבדה עם קליפת קוקוס שיוצרת הדף חזק ורעידת מסך.",
      damage: 19,
      cooldown: 880,
      effect: "boom",
      status: "מכת קוקוס",
    },
  },
  {
    id: "trenostruzzo",
    name: "Trenostruzzo Turbo 3000",
    hebrewName: "טרנוסטרוצו טורבו 3000",
    short: "T3",
    color: "#d94336",
    accent: "#d9e2e8",
    asset: "assets/characters/trenostruzzo.png",
    tagline: "יען־קטר טורבו מהיר במיוחד, עם תאוצה חזקה וקפיצות ארוכות.",
    stats: { speed: 1.42, jump: 1.1, power: 1.08 },
    ability: {
      name: "טורבו 3000",
      description: "פרץ מהירות של מנוע וקפיצת יען שמסתערים קדימה.",
      damage: 13,
      cooldown: 460,
      effect: "dash",
      status: "טורבו 3000",
    },
  },
];

const appState = {
  selectedId: "tralalero",
  mode: "menu",
  raceLevel: "stage1",
  labHistory: [],
};

const BACKGROUND_ASSETS = {
  home: "assets/backgrounds/stage1-home.jpg",
  gymboree: "assets/backgrounds/stage2-gymboree.jpg",
  playground: "assets/backgrounds/stage3-playground.jpg",
  city: "assets/backgrounds/stage4-city.jpg",
  desert: "assets/backgrounds/stage5-desert.jpg",
  jungle: "assets/backgrounds/stage6-jungle.jpg",
  waterpark: "assets/backgrounds/stage7-waterpark.jpg",
  lunapark: "assets/backgrounds/stage8-lunapark.jpg",
  space: "assets/backgrounds/stage9-space.jpg",
  final: "assets/backgrounds/stage10-final.jpg",
};

const MAZE_THEME_STYLES = {
  home: {
    pathA: 0xfff4de,
    pathB: 0xf7e7d0,
    blocked: 0xdcc7a6,
    route: 0xffb45f,
    wallPalette: [0xe7b56d, 0xd89b5f, 0xf0c982],
    wallTop: 0xffdfab,
    stroke: 0x76513a,
    highlight: 0xffffff,
    motif: "home",
  },
  gymboree: {
    pathA: 0xf8f1ff,
    pathB: 0xe9fbff,
    blocked: 0xd8d3ef,
    route: 0xffd447,
    wallPalette: [0xff6b6b, 0x4dabf7, 0xffd447, 0x8ce99a],
    wallTop: 0xffffff,
    stroke: 0x3d315f,
    highlight: 0xffffff,
    motif: "foam",
  },
  playground: {
    pathA: 0xffefcf,
    pathB: 0xf0e0bd,
    blocked: 0xcaa56f,
    route: 0x8ce99a,
    wallPalette: [0xb8773d, 0xd59655, 0x8b5a2b],
    wallTop: 0xf1c27d,
    stroke: 0x5f3d22,
    highlight: 0xffe4b5,
    motif: "wood",
  },
  city: {
    pathA: 0x2f3655,
    pathB: 0x222842,
    blocked: 0x10162a,
    route: 0xff4fd8,
    wallPalette: [0x1c2541, 0x2a2f5f, 0x12253f],
    wallTop: 0x6ef3ff,
    stroke: 0xf8fbff,
    highlight: 0xff4fd8,
    motif: "neon",
  },
  desert: {
    pathA: 0xf4d38b,
    pathB: 0xe9bd72,
    blocked: 0xc98d48,
    route: 0xfff2a8,
    wallPalette: [0xb9783c, 0x9f6a38, 0xc98d48],
    wallTop: 0xf7c16f,
    stroke: 0x654321,
    highlight: 0xffe1a1,
    motif: "stone",
  },
  jungle: {
    pathA: 0x6c8f4b,
    pathB: 0x53733f,
    blocked: 0x2d4b2d,
    route: 0x8ce99a,
    wallPalette: [0x2f6f3e, 0x3f8f4f, 0x1f5636],
    wallTop: 0x9be58b,
    stroke: 0x173b22,
    highlight: 0xd8ffd0,
    motif: "vine",
  },
  waterpark: {
    pathA: 0xb9f1ff,
    pathB: 0x91ddf2,
    blocked: 0x62b3d2,
    route: 0xffffff,
    wallPalette: [0x29a8df, 0x5cc8ff, 0x00b894],
    wallTop: 0xe5fbff,
    stroke: 0x105c7a,
    highlight: 0xffffff,
    motif: "water",
  },
  lunapark: {
    pathA: 0x4d2b6f,
    pathB: 0x3a2458,
    blocked: 0x2b183f,
    route: 0xffd447,
    wallPalette: [0xff477e, 0x7c5cff, 0xffd447, 0x00d1ff],
    wallTop: 0xffffff,
    stroke: 0xfff4bd,
    highlight: 0xffffff,
    motif: "bulbs",
  },
  space: {
    pathA: 0x25304e,
    pathB: 0x1c253d,
    blocked: 0x10182b,
    route: 0x6ef3ff,
    wallPalette: [0x303b5f, 0x1f2a44, 0x465170],
    wallTop: 0x8ea4ff,
    stroke: 0xbfd7ff,
    highlight: 0x6ef3ff,
    motif: "panel",
  },
  final: {
    pathA: 0xf2dfb8,
    pathB: 0xd9c8f5,
    blocked: 0x7a5f7f,
    route: 0xffd447,
    wallPalette: [0xff6b6b, 0x7c5cff, 0x29a8df, 0x8ce99a, 0xf4d38b],
    wallTop: 0xffffff,
    stroke: 0x171717,
    highlight: 0xfff5bd,
    motif: "final",
  },
};

const modeCopy = {
  menu: {
    title: "בית",
    copy: "בחר מירוץ, אתגר תהום, מעבדת ממים או קרב כדי להתחיל.",
    action: "התחל מירוץ",
  },
  runner: {
    title: "מירוץ בריינרוט",
    copy: "בחר אחד מ-10 שלבי מבוך. המטרה: להגיע לשער הסיום לפני היריב. חצים או WASD מזיזים, Space מפעיל טורבו, פסטה נותנת +58% מהירות ל-3.6 שניות ורוטב חותך מהירות ל-2.1 שניות.",
    action: "התחל מירוץ מחדש",
  },
  lab: {
    title: "מעבדת ממים",
    copy: "ערבב חיה, אוכל ותכונה כדי ליצור בריינרוט משפחתי חדש.",
    action: "ערבב בריינרוט חדש",
  },
  battle: {
    title: "זירת קרב",
    copy: "מנצחים כשמורידים את היריב ל-0 HP. מכה עובדת מקרוב, יכולת עובדת מרחוק וצורכת פוקוס, הגנה מצמצמת נזק והתחמקות בורחת מפגיעה.",
    action: "התחל קרב מחדש",
  },
  cliff: {
    title: "אתגר התהום",
    copy: "הדמות רצה מעצמה. קפוץ בין המצוקים, אסוף פסטה והגע ל-1,000 מטר בלי לאבד שלוש נפילות. המשחק כולל זמן חסד בקצה וקפיצה שנקלטת רגע לפני הנחיתה.",
    action: "התחל אתגר תהום מחדש",
  },
};

const sceneKeys = ["MenuScene", "RunnerScene", "CliffScene", "LabScene", "BattleScene"];

const MAZE_COLS = 15;
const MAZE_ROWS = 8;
const MAZE_CELL_W = 54;
const MAZE_CELL_H = 48;
const MAZE_START_X = 82;
const MAZE_START_Y = 88;
const PASTA_BOOST_DURATION = 3600;
const PASTA_SPEED_BOOST = 1.58;
const PASTA_ENERGY_GAIN = 45;
const SAUCE_SLOW_DURATION = 2100;
const SAUCE_SPEED_CAP = 0.42;
const SAUCE_ENERGY_PENALTY = 8;

function mixColor(color, target, amount) {
  const r = (color >> 16) & 255;
  const g = (color >> 8) & 255;
  const b = color & 255;
  const tr = (target >> 16) & 255;
  const tg = (target >> 8) & 255;
  const tb = target & 255;
  return (
    (Math.round(r + (tr - r) * amount) << 16)
    | (Math.round(g + (tg - g) * amount) << 8)
    | Math.round(b + (tb - b) * amount)
  );
}

function colorRgba(color, alpha = 1) {
  return `rgba(${(color >> 16) & 255}, ${(color >> 8) & 255}, ${color & 255}, ${alpha})`;
}

function roundedCanvasPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function mazeKey(cell) {
  return `${cell[0]},${cell[1]}`;
}

function mazePoint(cell) {
  return {
    x: MAZE_START_X + cell[0] * MAZE_CELL_W,
    y: MAZE_START_Y + cell[1] * MAZE_CELL_H,
  };
}

function buildRaceLevel(config) {
  const openCells = new Set();
  [...config.route, ...(config.branches || []), ...(config.pasta || []), ...(config.mud || [])]
    .forEach((cell) => openCells.add(mazeKey(cell)));

  const walls = [];
  for (let row = 0; row < MAZE_ROWS; row += 1) {
    for (let col = 0; col < MAZE_COLS; col += 1) {
      if (!openCells.has(`${col},${row}`)) {
        const point = mazePoint([col, row]);
        const gap = config.wallGap ?? 10;
        walls.push({ x: point.x, y: point.y, w: MAZE_CELL_W - gap, h: MAZE_CELL_H - gap });
      }
    }
  }

  const start = mazePoint(config.route[0]);
  const finishPoint = mazePoint(config.route[config.route.length - 1]);
  return {
    ...config,
    walls,
    start,
    finish: { x: finishPoint.x, y: finishPoint.y, w: MAZE_CELL_W - 8, h: MAZE_CELL_H - 8 },
    pasta: (config.pasta || []).map((cell) => mazePoint(cell)),
    mud: (config.mud || []).map((cell) => {
      const point = mazePoint(cell);
      return { x: point.x, y: point.y, w: MAZE_CELL_W - 10, h: MAZE_CELL_H - 16 };
    }),
    rivalPath: config.route.map((cell) => mazePoint(cell)),
    openCells,
  };
}

const RACE_LEVELS = {
  stage1: {
    label: "שלב 1",
    theme: "home",
    hint: "רחב, ברור וסלחני. מתאים ללימוד התנועה והטורבו.",
    rivalSpeed: 88,
    wallGap: 18,
    sprintDrain: 16,
    energyRegen: 18,
    mudDrag: 0.72,
    route: [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [14, 6], [14, 5], [14, 4], [14, 3], [14, 2], [14, 1], [14, 0]],
    branches: [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [13, 5], [13, 4], [13, 3], [13, 2], [13, 1]],
    pasta: [[3, 7], [8, 7], [13, 4]],
    mud: [[10, 6]],
  },
  stage2: {
    label: "שלב 2",
    theme: "gymboree",
    hint: "פניות ראשונות ושלוליות קלות. צריך לשחרר טורבו בפנייה.",
    rivalSpeed: 106,
    wallGap: 14,
    sprintDrain: 20,
    energyRegen: 14,
    mudDrag: 0.62,
    route: [[0, 7], [1, 7], [2, 7], [2, 6], [2, 5], [3, 5], [4, 5], [4, 6], [5, 6], [6, 6], [6, 5], [6, 4], [7, 4], [8, 4], [8, 3], [8, 2], [9, 2], [10, 2], [10, 1], [11, 1], [12, 1], [12, 0], [13, 0], [14, 0]],
    branches: [[0, 6], [1, 6], [3, 7], [4, 7], [5, 5], [7, 6], [8, 6], [9, 4], [10, 4], [10, 3], [11, 2], [13, 1], [14, 1]],
    pasta: [[1, 7], [5, 6], [9, 2], [13, 0]],
    mud: [[3, 5], [7, 4], [11, 1]],
  },
  stage3: {
    label: "שלב 3",
    theme: "playground",
    hint: "מבוך אמיתי עם נתיבי צד. פסטה לפני טורבו ארוך תעשה הבדל.",
    rivalSpeed: 124,
    wallGap: 10,
    sprintDrain: 25,
    energyRegen: 11,
    mudDrag: 0.52,
    route: [[0, 7], [0, 6], [1, 6], [2, 6], [2, 5], [3, 5], [4, 5], [4, 4], [4, 3], [3, 3], [3, 2], [4, 2], [5, 2], [6, 2], [6, 3], [7, 3], [8, 3], [8, 2], [8, 1], [9, 1], [10, 1], [10, 2], [11, 2], [12, 2], [12, 1], [13, 1], [14, 1], [14, 0]],
    branches: [[1, 7], [2, 7], [1, 5], [0, 5], [3, 6], [5, 5], [6, 5], [6, 4], [7, 4], [9, 3], [10, 3], [11, 1], [12, 0], [13, 0], [2, 2], [1, 2]],
    pasta: [[0, 6], [4, 5], [6, 2], [10, 1], [13, 1]],
    mud: [[2, 5], [4, 3], [8, 2], [11, 2]],
  },
  stage4: {
    label: "שלב 4",
    theme: "city",
    hint: "צפוף ומהיר. טעויות בטורבו עולות זמן ואנרגיה.",
    rivalSpeed: 142,
    wallGap: 7,
    sprintDrain: 30,
    energyRegen: 9,
    mudDrag: 0.44,
    route: [[0, 7], [1, 7], [1, 6], [1, 5], [2, 5], [3, 5], [3, 6], [4, 6], [5, 6], [5, 7], [6, 7], [7, 7], [7, 6], [7, 5], [6, 5], [5, 5], [5, 4], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [9, 4], [10, 4], [11, 4], [11, 3], [11, 2], [10, 2], [9, 2], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [13, 0], [14, 0]],
    branches: [[0, 6], [2, 7], [3, 7], [4, 7], [6, 6], [8, 7], [9, 7], [10, 7], [11, 7], [11, 6], [12, 4], [13, 4], [13, 3], [12, 2], [8, 2], [7, 2], [6, 2], [4, 3], [3, 3], [2, 3]],
    pasta: [[1, 5], [5, 6], [7, 3], [10, 1], [14, 0]],
    mud: [[3, 5], [7, 5], [9, 4], [11, 2], [9, 1]],
  },
  stage5: {
    label: "שלב 5",
    theme: "desert",
    hint: "נקודת מעבר: מסלול ארוך, קירות הדוקים, מעט התאוששות ויריב מהיר.",
    rivalSpeed: 158,
    wallGap: 4,
    sprintDrain: 36,
    energyRegen: 7,
    mudDrag: 0.36,
    route: [[0, 7], [0, 6], [1, 6], [2, 6], [2, 7], [3, 7], [4, 7], [4, 6], [5, 6], [6, 6], [6, 7], [7, 7], [8, 7], [8, 6], [9, 6], [10, 6], [10, 7], [11, 7], [12, 7], [12, 6], [12, 5], [11, 5], [10, 5], [9, 5], [8, 5], [8, 4], [7, 4], [6, 4], [5, 4], [4, 4], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [10, 2], [9, 2], [8, 2], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [12, 0], [13, 0], [14, 0]],
    branches: [[1, 7], [3, 6], [5, 7], [7, 6], [9, 7], [11, 6], [13, 7], [14, 7], [14, 6], [13, 5], [14, 5], [14, 4], [13, 3], [12, 3], [11, 3], [7, 2], [6, 2], [5, 2], [4, 2], [3, 2], [3, 3], [2, 3], [1, 3], [0, 3], [0, 4], [11, 0], [13, 1], [14, 1]],
    pasta: [[1, 6], [5, 6], [7, 3], [11, 5], [9, 1], [14, 0]],
    mud: [[2, 7], [6, 4], [9, 3], [12, 5], [8, 1], [4, 3], [10, 6]],
  },
  stage6: {
    label: "שלב 6",
    theme: "jungle",
    hint: "קשה: פניות צפופות, מסלול ארוך יותר, וטורבו חייב להישמר לישורות.",
    rivalSpeed: 172,
    wallGap: 3,
    sprintDrain: 40,
    energyRegen: 6,
    mudDrag: 0.32,
    sprintBoost: 1.44,
    route: [[0, 7], [1, 7], [1, 6], [2, 6], [3, 6], [3, 7], [4, 7], [5, 7], [5, 6], [5, 5], [4, 5], [3, 5], [2, 5], [1, 5], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [6, 5], [7, 5], [8, 5], [8, 6], [9, 6], [10, 6], [10, 5], [10, 4], [9, 4], [8, 4], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [12, 2], [11, 2], [10, 2], [9, 2], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [13, 0], [14, 0]],
    branches: [[0, 6], [0, 5], [2, 7], [4, 6], [6, 7], [7, 7], [7, 6], [9, 7], [11, 6], [12, 6], [13, 6], [13, 5], [12, 4], [11, 4], [7, 4], [7, 3], [6, 3], [5, 3], [4, 3], [3, 3], [2, 3], [0, 4], [13, 2], [14, 2], [14, 1]],
    pasta: [[1, 6], [5, 5], [8, 5], [10, 3], [13, 1]],
    mud: [[3, 7], [2, 5], [6, 5], [8, 4], [12, 3], [10, 2], [9, 1], [13, 0]],
  },
  stage7: {
    label: "שלב 7",
    theme: "waterpark",
    hint: "קשה מאוד: נתיבי צד מבלבלים ורוטב במרכזי הפנייה.",
    rivalSpeed: 186,
    wallGap: 2,
    sprintDrain: 44,
    energyRegen: 5,
    mudDrag: 0.3,
    sprintBoost: 1.42,
    route: [[0, 7], [0, 6], [0, 5], [1, 5], [2, 5], [2, 6], [3, 6], [4, 6], [4, 7], [5, 7], [6, 7], [6, 6], [6, 5], [5, 5], [5, 4], [6, 4], [7, 4], [7, 3], [6, 3], [5, 3], [4, 3], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [8, 3], [9, 3], [10, 3], [10, 4], [11, 4], [12, 4], [12, 3], [13, 3], [13, 2], [12, 2], [11, 2], [10, 2], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1], [14, 0]],
    branches: [[1, 7], [1, 6], [2, 7], [3, 7], [3, 5], [4, 5], [7, 7], [8, 7], [8, 6], [7, 5], [8, 5], [9, 5], [10, 5], [3, 3], [3, 2], [2, 2], [1, 2], [9, 2], [9, 1], [11, 0], [12, 0], [13, 0], [14, 2]],
    pasta: [[0, 5], [5, 4], [7, 2], [11, 4], [13, 1]],
    mud: [[2, 6], [4, 7], [6, 5], [7, 3], [4, 2], [8, 3], [10, 4], [13, 3], [10, 1]],
  },
  stage8: {
    label: "שלב 8",
    theme: "lunapark",
    hint: "מומחים: מעט פסטה, יריב מהיר, וקירות כמעט בלי מרווח.",
    rivalSpeed: 202,
    wallGap: 1,
    sprintDrain: 49,
    energyRegen: 4,
    mudDrag: 0.27,
    sprintBoost: 1.4,
    route: [[0, 7], [1, 7], [2, 7], [2, 6], [1, 6], [1, 5], [2, 5], [3, 5], [3, 4], [2, 4], [1, 4], [1, 3], [2, 3], [3, 3], [4, 3], [4, 4], [5, 4], [6, 4], [6, 5], [7, 5], [8, 5], [8, 4], [8, 3], [7, 3], [6, 3], [6, 2], [7, 2], [8, 2], [9, 2], [9, 3], [10, 3], [11, 3], [11, 2], [12, 2], [13, 2], [13, 1], [12, 1], [11, 1], [10, 1], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0]],
    branches: [[0, 6], [0, 5], [0, 4], [3, 7], [4, 7], [4, 6], [5, 6], [6, 6], [7, 6], [9, 5], [10, 5], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [5, 3], [5, 2], [4, 2], [3, 2], [2, 2], [9, 1], [14, 1], [14, 2], [14, 3]],
    pasta: [[2, 6], [6, 4], [9, 2], [12, 1]],
    mud: [[1, 6], [3, 4], [1, 3], [4, 4], [6, 5], [8, 4], [7, 3], [11, 3], [13, 2], [10, 0]],
  },
  stage9: {
    label: "שלב 9",
    theme: "space",
    hint: "כמעט סופי: אין מקום לטעויות, והטורבו נגמר מהר.",
    rivalSpeed: 218,
    wallGap: 0,
    sprintDrain: 55,
    energyRegen: 3.5,
    mudDrag: 0.24,
    sprintBoost: 1.38,
    route: [[0, 7], [0, 6], [1, 6], [1, 7], [2, 7], [3, 7], [3, 6], [4, 6], [4, 5], [3, 5], [2, 5], [2, 4], [3, 4], [4, 4], [5, 4], [5, 5], [6, 5], [7, 5], [7, 6], [8, 6], [9, 6], [9, 5], [10, 5], [11, 5], [11, 4], [10, 4], [9, 4], [8, 4], [7, 4], [7, 3], [8, 3], [9, 3], [10, 3], [10, 2], [9, 2], [8, 2], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [12, 2], [13, 2], [14, 2], [14, 1], [14, 0]],
    branches: [[0, 5], [1, 5], [2, 6], [4, 7], [5, 7], [5, 6], [6, 6], [6, 4], [6, 3], [5, 3], [4, 3], [3, 3], [2, 3], [1, 3], [0, 3], [8, 7], [10, 6], [12, 5], [13, 5], [13, 4], [12, 4], [11, 3], [12, 3], [13, 3], [11, 0], [12, 0], [13, 0]],
    pasta: [[0, 6], [5, 4], [9, 5], [10, 2]],
    mud: [[1, 7], [4, 5], [2, 4], [5, 5], [7, 6], [10, 5], [8, 4], [7, 3], [10, 3], [8, 1], [12, 2], [14, 1]],
  },
  stage10: {
    label: "שלב 10",
    theme: "final",
    hint: "סיוט: יריב אגרסיבי, אנרגיה איטית, וכל טעות כמעט סוגרת את המירוץ.",
    rivalSpeed: 236,
    wallGap: 0,
    sprintDrain: 62,
    energyRegen: 3,
    mudDrag: 0.2,
    sprintBoost: 1.36,
    route: [[0, 7], [1, 7], [1, 6], [0, 6], [0, 5], [1, 5], [2, 5], [2, 6], [3, 6], [3, 7], [4, 7], [5, 7], [5, 6], [4, 6], [4, 5], [5, 5], [6, 5], [6, 4], [5, 4], [4, 4], [4, 3], [5, 3], [6, 3], [7, 3], [7, 4], [8, 4], [9, 4], [9, 5], [10, 5], [10, 6], [11, 6], [12, 6], [12, 5], [11, 5], [11, 4], [12, 4], [13, 4], [13, 3], [12, 3], [11, 3], [10, 3], [10, 2], [9, 2], [8, 2], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [13, 0], [14, 0]],
    branches: [[0, 4], [1, 4], [2, 4], [3, 4], [2, 7], [4, 2], [5, 2], [6, 2], [7, 2], [7, 1], [6, 1], [5, 1], [8, 5], [8, 6], [9, 6], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [14, 6], [14, 5], [14, 4], [14, 3], [13, 2], [12, 2], [11, 2], [10, 0], [11, 0], [12, 0], [14, 1]],
    pasta: [[1, 5], [6, 5], [10, 3]],
    mud: [[1, 6], [2, 6], [3, 7], [5, 6], [4, 4], [7, 4], [9, 5], [10, 6], [12, 5], [13, 4], [10, 2], [8, 1], [12, 1], [13, 0]],
  },
};

const dom = {
  modeButtons: [...document.querySelectorAll("[data-mode]")],
  characterList: document.querySelector("#character-list"),
  selectedName: document.querySelector("#selected-name"),
  selectedTagline: document.querySelector("#selected-tagline"),
  statSpeed: document.querySelector("#stat-speed"),
  statJump: document.querySelector("#stat-jump"),
  statPower: document.querySelector("#stat-power"),
  abilityName: document.querySelector("#ability-name"),
  abilityCopy: document.querySelector("#ability-copy"),
  panelTitle: document.querySelector("#panel-title"),
  modeTitle: document.querySelector("#mode-title"),
  modeCopy: document.querySelector("#mode-copy"),
  primaryAction: document.querySelector("#primary-action"),
  levelTools: document.querySelector("#level-tools"),
  levelButtons: [...document.querySelectorAll("[data-level]")],
  labTools: document.querySelector("#lab-tools"),
  mixButton: document.querySelector("#mix-button"),
  labHistory: document.querySelector("#lab-history"),
  touchButtons: {
    left: document.querySelector('[data-action="left"]'),
    right: document.querySelector('[data-action="right"]'),
    jump: document.querySelector('[data-action="jump"]'),
    duck: document.querySelector('[data-action="duck"]'),
    attack: document.querySelector('[data-action="attack"]'),
    special: document.querySelector('[data-action="special"]'),
    dodge: document.querySelector('[data-action="dodge"]'),
  },
  hudMode: document.querySelector("#hud-mode"),
  hudScore: document.querySelector("#hud-score"),
  hudLives: document.querySelector("#hud-lives"),
  hudStatus: document.querySelector("#hud-status"),
};

function getCharacter(id = appState.selectedId) {
  return CHARACTERS.find((character) => character.id === id) || CHARACTERS[0];
}

function fitCharacterSprite(sprite, targetHeight, maxWidth = targetHeight * 1.35) {
  const scale = Math.min(targetHeight / sprite.height, maxWidth / sprite.width);
  sprite.setScale(scale);
  return sprite;
}

function fitCharacterBody(sprite, widthRatio = 0.46, heightRatio = 0.62, topRatio = 0.24) {
  if (!sprite.body) return sprite;
  const bodyWidth = sprite.width * widthRatio;
  const bodyHeight = sprite.height * heightRatio;
  sprite.body.setSize(bodyWidth, bodyHeight);
  sprite.body.setOffset((sprite.width - bodyWidth) / 2, sprite.height * topRatio);
  return sprite;
}

function setHud({ mode, score, lives, status, playerHp, enemyHp } = {}) {
  if (mode !== undefined) dom.hudMode.textContent = mode;
  if (score !== undefined) {
    dom.hudScore.textContent = typeof score === "string" ? score : `ניקוד ${Math.max(0, Math.floor(score))}`;
  }
  if (lives !== undefined) {
    dom.hudLives.textContent = typeof lives === "string" ? lives : `חיים ${Math.max(0, lives)}`;
  }
  if (playerHp !== undefined && enemyHp !== undefined) {
    dom.hudLives.textContent = `אתה ${Math.max(0, playerHp)} | יריב ${Math.max(0, enemyHp)}`;
  }
  if (status !== undefined) dom.hudStatus.textContent = status;
}

window.BrainrotUI = {
  setHud,
  addLabCreature(creature) {
    appState.labHistory.unshift(creature);
    appState.labHistory = appState.labHistory.slice(0, 6);
    renderLabHistory();
  },
};

function renderCharacterList() {
  dom.characterList.innerHTML = "";
  CHARACTERS.forEach((character) => {
    const button = document.createElement("button");
    button.className = `character-chip${character.id === appState.selectedId ? " selected" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="chip-avatar">${character.short}</span>
      <span class="chip-names">
        <strong>${character.hebrewName}</strong>
        <small>${character.name}</small>
      </span>
    `;
    button.addEventListener("click", () => {
      appState.selectedId = character.id;
      renderUI();
      if (appState.mode === "runner" || appState.mode === "cliff" || appState.mode === "battle") {
        startMode(appState.mode);
      }
    });
    dom.characterList.appendChild(button);
  });
}

function renderLabHistory() {
  dom.labHistory.innerHTML = "";
  appState.labHistory.forEach((creature) => {
    const item = document.createElement("li");
    item.textContent = `${creature.name} - ${creature.recipe}`;
    dom.labHistory.appendChild(item);
  });
}

function setTouchButtonLabels(labels) {
  Object.entries(dom.touchButtons).forEach(([action, button]) => {
    if (!button) return;
    const label = labels[action];
    button.hidden = !label;
    if (label) button.textContent = label;
  });
}

function renderUI() {
  const selected = getCharacter();
  const copy = modeCopy[appState.mode] || modeCopy.menu;
  dom.modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === appState.mode);
  });
  dom.selectedName.textContent = `${selected.hebrewName} · ${selected.name}`;
  dom.selectedTagline.textContent = selected.tagline;
  dom.statSpeed.textContent = selected.stats.speed.toFixed(2);
  dom.statJump.textContent = selected.stats.jump.toFixed(2);
  dom.statPower.textContent = selected.stats.power.toFixed(2);
  dom.abilityName.textContent = selected.ability.name;
  dom.abilityCopy.textContent = selected.ability.description;
  dom.modeTitle.textContent = copy.title;
  dom.modeCopy.textContent = copy.copy;
  dom.primaryAction.textContent = copy.action;
  dom.primaryAction.hidden = appState.mode === "lab";
  dom.levelTools.hidden = !(appState.mode === "menu" || appState.mode === "runner");
  dom.levelButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.level === appState.raceLevel);
  });
  dom.labTools.hidden = appState.mode !== "lab";
  dom.panelTitle.textContent = appState.mode === "battle" ? "בחר לוחם" : "בחר דמות";
  if (appState.mode === "runner") {
    setTouchButtonLabels({
      left: "שמאלה",
      right: "ימינה",
      jump: "למעלה",
      duck: "למטה",
      attack: "טורבו",
    });
  } else if (appState.mode === "cliff") {
    setTouchButtonLabels({
      jump: "קפיצה",
    });
  } else if (appState.mode === "battle") {
    setTouchButtonLabels({
      left: "שמאלה",
      right: "ימינה",
      jump: "קפיצה",
      duck: "הגנה",
      attack: "מכה",
      special: "יכולת",
      dodge: "התחמקות",
    });
  } else {
    setTouchButtonLabels({
      left: "שמאלה",
      right: "ימינה",
      jump: "קפיצה",
      duck: "התכופף",
      attack: "יכולת",
    });
  }
  renderCharacterList();
}

function startMode(mode) {
  appState.mode = mode;
  renderUI();
  const sceneMap = {
    menu: "MenuScene",
    runner: "RunnerScene",
    cliff: "CliffScene",
    lab: "LabScene",
    battle: "BattleScene",
  };
  const targetScene = sceneMap[mode] || "MenuScene";
  sceneKeys.forEach((sceneKey) => {
    if (sceneKey !== targetScene && game.scene.isActive(sceneKey)) {
      game.scene.stop(sceneKey);
    }
  });
  game.scene.start(targetScene, { selectedId: appState.selectedId });
}

dom.modeButtons.forEach((button) => {
  button.addEventListener("click", () => startMode(button.dataset.mode));
});

dom.levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appState.raceLevel = button.dataset.level;
    renderUI();
    if (appState.mode === "runner") startMode("runner");
  });
});

dom.primaryAction.addEventListener("click", () => {
  if (appState.mode === "lab") {
    window.dispatchEvent(new CustomEvent("brainrot:lab-mix"));
    return;
  }
  startMode(appState.mode === "menu" ? "runner" : appState.mode);
});

dom.mixButton.addEventListener("click", () => {
  window.dispatchEvent(new CustomEvent("brainrot:lab-mix"));
});

document.querySelectorAll("[data-action]").forEach((button) => {
  const action = button.dataset.action;
  const emit = (pressed) => {
    window.dispatchEvent(new CustomEvent("brainrot:touch", { detail: { action, pressed } }));
  };
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    emit(true);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach((name) => {
    button.addEventListener(name, () => emit(false));
  });
  if (action === "jump") {
    button.addEventListener("click", () => emit(true));
  }
});

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawText(ctx, text, x, y, size = 18, color = "#171717", align = "center") {
  ctx.fillStyle = color;
  ctx.font = `900 ${size}px Arial, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function drawSpark(ctx, x, y, radius, color = "#ffd447") {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const angle = (Math.PI * 2 * i) / 8;
    const length = i % 2 === 0 ? radius : radius * 0.42;
    ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawCharacterBackdrop(ctx, character) {
  const accent = character.accent;
  const glow = ctx.createRadialGradient(124, 100, 12, 124, 100, 106);
  glow.addColorStop(0, `${accent}66`);
  glow.addColorStop(0.7, `${accent}18`);
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(124, 99, 108, 82, -0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `${accent}99`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(25, 38);
  ctx.quadraticCurveTo(83, 11, 153, 28);
  ctx.moveTo(32, 136);
  ctx.quadraticCurveTo(92, 177, 184, 151);
  ctx.stroke();
}

function drawCharacterFinish(ctx, character) {
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(58, 45);
  ctx.quadraticCurveTo(116, 24, 178, 48);
  ctx.stroke();
  ctx.globalAlpha = 1;
  drawSpark(ctx, 207, 36, 13, character.accent);
  drawSpark(ctx, 36, 132, 10, "#ffd447");
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 3;
  roundRect(ctx, 154, 150, 50, 24, 10);
  ctx.fill();
  ctx.stroke();
  drawText(ctx, character.short, 179, 163, 12, "#171717");
  ctx.restore();
}

function drawShoe(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#1f6fff";
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 4;
  roundRect(ctx, -22, -6, 48, 24, 10);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-8, 5);
  ctx.lineTo(2, 12);
  ctx.lineTo(20, -1);
  ctx.stroke();
  drawText(ctx, "NIKE", 3, 4, 9, "#ffffff");
  ctx.restore();
}

function drawRealEye(ctx, x, y, scale = 1, iris = "#8b5a2b") {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 9, 7, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = iris;
  ctx.beginPath();
  ctx.arc(2, 0, 4.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#171717";
  ctx.beginPath();
  ctx.arc(3, 0, 2.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.arc(4, -2, 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawScaleTexture(ctx, points, color = "rgba(255,255,255,0.25)") {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  points.forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, Math.PI * 0.1, Math.PI * 1.1);
    ctx.stroke();
  });
  ctx.restore();
}

function generateCharacterTexture(scene, character) {
  const key = `character-${character.id}`;
  if (scene.textures.exists(key)) return key;
  const texture = scene.textures.createCanvas(key, 240, 190);
  const canvas = texture.getSourceImage();
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(120, 170, 72, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  drawCharacterBackdrop(ctx, character);

  if (character.id === "tralalero") drawTralalero(ctx, character);
  if (character.id === "bombardiro") drawBombardiro(ctx, character);
  if (character.id === "ballerina") drawBallerina(ctx, character);
  if (character.id === "tung") drawTung(ctx, character);
  if (character.id === "chimpanzini") drawChimpanzini(ctx, character);
  drawCharacterFinish(ctx, character);

  texture.refresh();
  return key;
}

function drawTralalero(ctx, character) {
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  const body = ctx.createLinearGradient(40, 38, 192, 126);
  body.addColorStop(0, "#d8f8ff");
  body.addColorStop(0.45, character.color);
  body.addColorStop(1, "#4c97b6");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.ellipse(118, 78, 85, 38, -0.11, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  const belly = ctx.createLinearGradient(76, 80, 190, 118);
  belly.addColorStop(0, "#f7fdff");
  belly.addColorStop(1, "#b9e4ef");
  ctx.fillStyle = belly;
  ctx.beginPath();
  ctx.ellipse(132, 92, 58, 17, -0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(23,23,23,0.32)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  ctx.fillStyle = "#5ca9c6";
  ctx.beginPath();
  ctx.moveTo(34, 78);
  ctx.lineTo(2, 43);
  ctx.lineTo(9, 103);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#4b93b0";
  ctx.beginPath();
  ctx.moveTo(110, 47);
  ctx.lineTo(143, 13);
  ctx.lineTo(134, 61);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  drawRealEye(ctx, 167, 66, 0.86, "#5b7f93");
  ctx.strokeStyle = "rgba(23,23,23,0.55)";
  ctx.lineWidth = 2;
  [138, 146, 154].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 84);
    ctx.lineTo(x - 11, 101);
    ctx.stroke();
  });
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(174, 88);
  ctx.quadraticCurveTo(190, 96, 209, 86);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  for (let x = 181; x < 205; x += 8) {
    ctx.beginPath();
    ctx.moveTo(x, 88);
    ctx.lineTo(x + 4, 97);
    ctx.lineTo(x + 8, 88);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(61, 61);
  ctx.quadraticCurveTo(114, 43, 170, 59);
  ctx.stroke();
  [78, 116, 154].forEach((x) => {
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x, 112);
    ctx.lineTo(x - 2, 143);
    ctx.stroke();
    drawShoe(ctx, x + 6, 154, 0.82);
  });
}

function drawBombardiro(ctx, character) {
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  const metal = ctx.createLinearGradient(34, 44, 210, 118);
  metal.addColorStop(0, "#54606a");
  metal.addColorStop(0.45, "#202b34");
  metal.addColorStop(1, "#0f171d");
  ctx.fillStyle = metal;
  ctx.beginPath();
  ctx.moveTo(34, 88);
  ctx.quadraticCurveTo(86, 38, 159, 58);
  ctx.lineTo(224, 78);
  ctx.quadraticCurveTo(171, 110, 72, 121);
  ctx.quadraticCurveTo(42, 117, 34, 88);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#1a242c";
  ctx.beginPath();
  ctx.moveTo(92, 62);
  ctx.lineTo(125, 19);
  ctx.lineTo(138, 65);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(151, 74);
  ctx.lineTo(220, 45);
  ctx.lineTo(201, 92);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(116, 106);
  ctx.lineTo(191, 142);
  ctx.lineTo(132, 127);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  const croc = ctx.createLinearGradient(36, 67, 165, 117);
  croc.addColorStop(0, "#5f7a4d");
  croc.addColorStop(0.55, "#263c30");
  croc.addColorStop(1, "#15251f");
  ctx.fillStyle = croc;
  ctx.beginPath();
  ctx.moveTo(23, 88);
  ctx.quadraticCurveTo(62, 53, 137, 63);
  ctx.quadraticCurveTo(151, 80, 132, 101);
  ctx.quadraticCurveTo(77, 124, 32, 111);
  ctx.quadraticCurveTo(15, 102, 23, 88);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  drawScaleTexture(ctx, [[52, 76, 4], [67, 69, 4], [83, 67, 4], [99, 69, 4], [115, 73, 4], [57, 94, 5], [76, 91, 5], [96, 91, 5], [115, 94, 5]], "rgba(190,220,170,0.32)");
  ctx.fillStyle = "#ffffff";
  for (let x = 35; x < 116; x += 10) {
    ctx.beginPath();
    ctx.moveTo(x, 103);
    ctx.lineTo(x + 4, 114);
    ctx.lineTo(x + 8, 103);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  drawRealEye(ctx, 96, 76, 0.72, "#c5b46a");
  ctx.fillStyle = "#2e3a44";
  roundRect(ctx, 112, 90, 46, 25, 11);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#141b20";
  roundRect(ctx, 171, 72, 44, 25, 11);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(19, 88, 22, 0, Math.PI * 2);
  ctx.moveTo(3, 72);
  ctx.lineTo(35, 104);
  ctx.moveTo(35, 72);
  ctx.lineTo(3, 104);
  ctx.stroke();
  ctx.fillStyle = "#222";
  roundRect(ctx, 89, 127, 38, 30, 13);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = character.accent;
  ctx.beginPath();
  ctx.moveTo(108, 151);
  ctx.lineTo(92, 179);
  ctx.lineTo(126, 179);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  drawText(ctx, "BC", 109, 142, 10, "#ffffff");
}

function drawBallerina(ctx, character) {
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  const cup = ctx.createLinearGradient(84, 25, 158, 87);
  cup.addColorStop(0, "#fff5e6");
  cup.addColorStop(0.45, "#f0ceb3");
  cup.addColorStop(1, "#c99172");
  ctx.fillStyle = cup;
  roundRect(ctx, 79, 29, 82, 56, 18);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f5d9c1";
  ctx.beginPath();
  ctx.ellipse(121, 31, 43, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#b9652d";
  ctx.beginPath();
  ctx.ellipse(121, 31, 35, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#fff7e8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(99, 31);
  ctx.bezierCurveTo(111, 17, 137, 20, 143, 31);
  ctx.bezierCurveTo(131, 27, 117, 39, 101, 31);
  ctx.stroke();
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(82, 58, 18, 24, 0.1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#8c5a35";
  ctx.beginPath();
  ctx.ellipse(121, 48, 26, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  drawRealEye(ctx, 108, 57, 0.78, "#8a4a2c");
  drawRealEye(ctx, 135, 57, 0.78, "#8a4a2c");
  ctx.strokeStyle = "#9d4b34";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(112, 73);
  ctx.quadraticCurveTo(122, 80, 134, 72);
  ctx.stroke();
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  ctx.fillStyle = character.color;
  roundRect(ctx, 99, 84, 44, 38, 12);
  ctx.fill();
  ctx.stroke();
  const tutu = ctx.createRadialGradient(121, 124, 4, 121, 124, 64);
  tutu.addColorStop(0, "#fff1f8");
  tutu.addColorStop(0.45, character.color);
  tutu.addColorStop(1, "#cfa4d8");
  ctx.fillStyle = tutu;
  ctx.beginPath();
  ctx.moveTo(56, 128);
  ctx.lineTo(186, 128);
  ctx.lineTo(145, 103);
  ctx.lineTo(98, 103);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(102, 94);
  ctx.lineTo(58, 108);
  ctx.moveTo(142, 94);
  ctx.lineTo(185, 65);
  ctx.stroke();
  ctx.strokeStyle = "#e8a4b5";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(185, 65);
  ctx.quadraticCurveTo(191, 58, 197, 64);
  ctx.stroke();
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(102, 120);
  ctx.lineTo(84, 152);
  ctx.moveTo(138, 120);
  ctx.lineTo(154, 152);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 67, 148, 36, 15, 7);
  ctx.fill();
  ctx.stroke();
  roundRect(ctx, 140, 148, 36, 15, 7);
  ctx.fill();
  ctx.stroke();
}

function drawTung(ctx, character) {
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  const wood = ctx.createLinearGradient(88, 34, 156, 136);
  wood.addColorStop(0, "#d7a66c");
  wood.addColorStop(0.5, character.color);
  wood.addColorStop(1, "#7c4d2d");
  ctx.fillStyle = wood;
  roundRect(ctx, 88, 34, 68, 102, 18);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(80,42,22,0.62)";
  ctx.lineWidth = 2;
  for (let y = 48; y < 126; y += 14) {
    ctx.beginPath();
    ctx.moveTo(97, y);
    ctx.quadraticCurveTo(122, y + 7, 147, y - 2);
    ctx.stroke();
  }
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  ctx.fillStyle = "#e6b57a";
  roundRect(ctx, 94, 58, 56, 48, 14);
  ctx.fill();
  ctx.stroke();
  drawRealEye(ctx, 110, 73, 0.65, "#5d3b22");
  drawRealEye(ctx, 134, 73, 0.65, "#5d3b22");
  ctx.strokeStyle = "#5f321e";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(108, 94);
  ctx.quadraticCurveTo(122, 103, 137, 94);
  ctx.stroke();
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(92, 118);
  ctx.lineTo(48, 93);
  ctx.moveTo(154, 118);
  ctx.lineTo(196, 93);
  ctx.stroke();
  ctx.fillStyle = character.accent;
  ctx.beginPath();
  ctx.arc(48, 93, 12, 0, Math.PI * 2);
  ctx.arc(196, 93, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#6a3b22";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(183, 64);
  ctx.lineTo(217, 42);
  ctx.stroke();
  [101, 140].forEach((x) => drawShoe(ctx, x, 154, 0.7));
  drawText(ctx, "TUNG", 122, 119, 16, "#171717");
}

function drawChimpanzini(ctx, character) {
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  const fur = ctx.createRadialGradient(116, 80, 15, 116, 88, 64);
  fur.addColorStop(0, "#7aa562");
  fur.addColorStop(0.55, "#466f3c");
  fur.addColorStop(1, "#233f2a");
  ctx.fillStyle = fur;
  ctx.beginPath();
  ctx.ellipse(121, 88, 58, 50, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(18,45,25,0.6)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 18; i += 1) {
    const x = 73 + (i % 6) * 17;
    const y = 55 + Math.floor(i / 6) * 18;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 9, y + 12);
    ctx.stroke();
  }
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  ctx.fillStyle = "#d38a5b";
  ctx.beginPath();
  ctx.ellipse(121, 96, 36, 27, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#efb078";
  ctx.beginPath();
  ctx.ellipse(70, 92, 22, 27, -0.3, 0, Math.PI * 2);
  ctx.ellipse(172, 92, 22, 27, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  drawRealEye(ctx, 109, 76, 0.8, "#6b3f21");
  drawRealEye(ctx, 135, 76, 0.8, "#6b3f21");
  ctx.fillStyle = "#5c2c21";
  ctx.beginPath();
  ctx.ellipse(121, 98, 13, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#171717";
  ctx.beginPath();
  ctx.arc(116, 98, 2, 0, Math.PI * 2);
  ctx.arc(126, 98, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#6c2f24";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(103, 113);
  ctx.quadraticCurveTo(121, 124, 142, 112);
  ctx.stroke();
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 5;
  const banana = ctx.createLinearGradient(58, 119, 184, 168);
  banana.addColorStop(0, "#fff1a8");
  banana.addColorStop(0.45, character.color);
  banana.addColorStop(1, "#f0a52f");
  ctx.fillStyle = banana;
  ctx.beginPath();
  ctx.moveTo(59, 128);
  ctx.bezierCurveTo(80, 174, 157, 182, 194, 128);
  ctx.bezierCurveTo(161, 149, 94, 150, 59, 128);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  [76, 104, 132, 160].forEach((x) => {
    ctx.strokeStyle = "#9d6a1f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, 130);
    ctx.quadraticCurveTo(x + 8, 150, x - 6, 164);
    ctx.stroke();
  });
  drawText(ctx, "BANANINI", 124, 146, 11, "#315f3d");
  [98, 146].forEach((x) => drawShoe(ctx, x, 164, 0.64));
}

function generateStaticTextures(scene) {
  if (!scene.textures.exists("collectible-pasta")) {
    const texture = scene.textures.createCanvas("collectible-pasta", 54, 54);
    const ctx = texture.getSourceImage().getContext("2d");
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#ffd447";
    ctx.beginPath();
    ctx.arc(27, 27, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#ef4b3f";
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      ctx.moveTo(14 + i * 6, 30);
      ctx.quadraticCurveTo(18 + i * 6, 16, 24 + i * 5, 28);
    }
    ctx.stroke();
    texture.refresh();
  }

  if (!scene.textures.exists("obstacle-spaghetti")) {
    const texture = scene.textures.createCanvas("obstacle-spaghetti", 70, 84);
    const ctx = texture.getSourceImage().getContext("2d");
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 5;
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, 9, 20, 52, 48, 12);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#ef4b3f";
    ctx.lineWidth = 4;
    for (let i = 0; i < 6; i += 1) {
      ctx.beginPath();
      ctx.moveTo(18 + i * 7, 18);
      ctx.quadraticCurveTo(8 + i * 9, 43, 24 + i * 5, 70);
      ctx.stroke();
    }
    texture.refresh();
  }

  if (!scene.textures.exists("hazard-sauce")) {
    const texture = scene.textures.createCanvas("hazard-sauce", 128, 128);
    const ctx = texture.getSourceImage().getContext("2d");
    ctx.fillStyle = "#ef4b3f";
    ctx.strokeStyle = "#b52422";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(65, 18);
    for (let i = 0; i < 14; i += 1) {
      const angle = (i / 14) * Math.PI * 2;
      const radius = i % 2 ? 58 : 31;
      ctx.lineTo(64 + Math.cos(angle) * radius, 64 + Math.sin(angle) * radius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.38)";
    ctx.beginPath();
    ctx.ellipse(50, 44, 18, 9, -0.4, 0, Math.PI * 2);
    ctx.fill();
    texture.refresh();
  }

  if (!scene.textures.exists("projectile-player")) {
    makeProjectileTexture(scene, "projectile-player", "#ffd447");
    makeProjectileTexture(scene, "projectile-enemy", "#ef4b3f");
  }
}

function makeProjectileTexture(scene, key, color) {
  const texture = scene.textures.createCanvas(key, 42, 22);
  const ctx = texture.getSourceImage().getContext("2d");
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 4;
  ctx.fillStyle = color;
  roundRect(ctx, 3, 4, 34, 14, 7);
  ctx.fill();
  ctx.stroke();
  texture.refresh();
}

function generateBackgroundTexture(scene, theme = "street") {
  const key = `background-${theme}`;
  if (scene.textures.exists(key)) return key;
  const texture = scene.textures.createCanvas(key, GAME_WIDTH, GAME_HEIGHT);
  const canvas = texture.getSourceImage();
  const ctx = canvas.getContext("2d");
  const sky = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
  if (theme === "battle") {
    sky.addColorStop(0, "#ffd6bd");
    sky.addColorStop(0.55, "#ffe9c8");
    sky.addColorStop(1, "#f9f3d7");
  } else if (theme === "lab") {
    sky.addColorStop(0, "#fff7d8");
    sky.addColorStop(0.6, "#dff9ff");
    sky.addColorStop(1, "#fffdf7");
  } else {
    sky.addColorStop(0, "#9fe8ff");
    sky.addColorStop(0.58, "#fff4d6");
    sky.addColorStop(1, "#fffdf7");
  }
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  for (let i = 0; i < 7; i += 1) {
    const x = 44 + i * 145;
    const y = 42 + (i % 3) * 18;
    ctx.beginPath();
    ctx.ellipse(x, y, 44, 16, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 35, y + 3, 34, 13, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const colors = theme === "battle"
    ? ["#ef4b3f", "#ffd447", "#7c5cff", "#00a99d"]
    : ["#00a99d", "#ffd447", "#ef4b3f", "#ffffff"];
  for (let i = 0; i < 12; i += 1) {
    const x = -16 + i * 88;
    const h = 78 + (i % 4) * 25;
    ctx.fillStyle = colors[i % colors.length];
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 4;
    roundRect(ctx, x, GROUND_Y - h - 8, 58, h, 7);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.62)";
    for (let wy = GROUND_Y - h + 8; wy < GROUND_Y - 22; wy += 24) {
      ctx.fillRect(x + 12, wy, 12, 10);
      ctx.fillRect(x + 34, wy, 12, 10);
    }
  }

  if (theme === "battle") {
    ctx.fillStyle = "rgba(255,212,71,0.72)";
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 4;
    roundRect(ctx, 325, 72, 310, 52, 16);
    ctx.fill();
    ctx.stroke();
    drawText(ctx, "זירת בריינרוט", 480, 99, 25, "#171717");
    for (let i = 0; i < 6; i += 1) drawSpark(ctx, 190 + i * 112, 158 + (i % 2) * 24, 11, colors[i % colors.length]);
  }

  if (theme === "lab") {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 4;
    roundRect(ctx, 84, 88, 792, 210, 20);
    ctx.fill();
    ctx.stroke();
    for (let i = 0; i < 8; i += 1) {
      ctx.fillStyle = colors[i % colors.length];
      roundRect(ctx, 140 + i * 86, 128, 36, 92, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillRect(149 + i * 86, 142, 18, 52);
    }
  }

  ctx.fillStyle = theme === "battle" ? "#ce6c52" : "#39d98a";
  ctx.fillRect(0, GROUND_Y + 6, GAME_WIDTH, 112);
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  for (let x = 0; x < GAME_WIDTH; x += 72) ctx.fillRect(x, GROUND_Y + 32, 46, 8);
  ctx.fillStyle = "#171717";
  ctx.fillRect(0, GROUND_Y + 1, GAME_WIDTH, 13);
  ctx.fillStyle = theme === "battle" ? "#ffd447" : "#8ce99a";
  ctx.fillRect(0, GROUND_Y + 14, GAME_WIDTH, 7);
  texture.refresh();
  return key;
}

function createBackground(scene, theme = "street") {
  const key = `background-${theme}`;
  const textureKey = scene.textures.exists(key) ? key : generateBackgroundTexture(scene, theme);
  return scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, textureKey)
    .setDisplaySize(GAME_WIDTH, GAME_HEIGHT)
    .setDepth(-35);
}

function createGround(scene) {
  const ground = scene.add.rectangle(GAME_WIDTH / 2, GROUND_Y + 34, GAME_WIDTH, 68, 0x39d98a);
  scene.physics.add.existing(ground, true);
  return ground;
}

class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    CHARACTERS.forEach((character) => {
      this.load.image(`character-${character.id}`, character.asset);
    });
    Object.entries(BACKGROUND_ASSETS).forEach(([theme, path]) => {
      this.load.image(`background-${theme}`, path);
    });
    this.load.image("collectible-pasta", "assets/items/pasta-pickup.png");
    this.load.image("hazard-sauce", "assets/items/tomato-sauce.png");
  }

  create() {
    CHARACTERS.forEach((character) => generateCharacterTexture(this, character));
    generateStaticTextures(this);
    this.scene.start("MenuScene");
  }
}

class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    appState.mode = "menu";
    renderUI();
    setHud({ mode: "בית", score: 0, lives: 3, status: "בחר מצב משחק" });
    createBackground(this);
    this.add.text(54, 74, "בחר מצב וקפוץ פנימה", {
      fontFamily: "Arial",
      fontSize: "38px",
      fontStyle: "900",
      color: "#171717",
    });
    this.add.text(57, 122, "מירוץ, אתגר תהום, מעבדת ממים וקרב משתמשים באותן דמויות.", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#303030",
    });
    CHARACTERS.forEach((character, index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);
      const sprite = this.add.image(135 + col * 230, 265 + row * 165, `character-${character.id}`);
      fitCharacterSprite(sprite, 112, 160);
      this.tweens.add({
        targets: sprite,
        y: sprite.y - 12,
        duration: 680 + index * 80,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    });
  }
}

class OldRunnerScene extends Phaser.Scene {
  constructor() {
    super("RunnerScene");
  }

  init(data) {
    this.selected = getCharacter(data.selectedId);
    const rivals = CHARACTERS.filter((character) => character.id !== this.selected.id);
    this.rival = Phaser.Math.RND.pick(rivals);
  }

  create() {
    appState.mode = "runner";
    renderUI();
    setHud({
      mode: "מירוץ",
      score: "אתה 0מ׳ / 500מ׳",
      lives: "יריב 0מ׳ | אנרגיה 100%",
      status: "החזק Space או טורבו כדי להגביר מהירות",
    });
    createBackground(this);
    this.ground = createGround(this);
    this.physics.world.gravity.y = 1350;
    this.finishDistance = 500;
    this.playerDistance = 0;
    this.rivalDistance = 0;
    this.sprintEnergy = 100;
    this.stumbles = 0;
    this.hurtUntil = 0;
    this.finished = false;
    this.scrollSpeed = 315 + this.selected.stats.speed * 44;
    this.trackStart = 105;
    this.trackEnd = 830;
    this.touch = { jumpQueued: false, duck: false, sprint: false };

    this.drawRaceTrack();

    this.rivalSprite = this.add.image(this.trackStart, 236, `character-${this.rival.id}`);
    this.rivalSprite.setScale(0.45);
    this.rivalSprite.setDepth(4);

    this.player = this.physics.add.sprite(this.trackStart, 285, `character-${this.selected.id}`);
    this.player.setScale(0.64);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(132, 128);
    this.player.body.setOffset(50, 44);
    this.physics.add.collider(this.player, this.ground);

    this.obstacles = this.physics.add.group();
    this.collectibles = this.physics.add.group();
    this.physics.add.overlap(this.player, this.collectibles, this.collectPasta, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

    this.keys = this.input.keyboard.addKeys({
      up: "UP",
      w: "W",
      space: "SPACE",
      down: "DOWN",
      s: "S",
      right: "RIGHT",
      d: "D",
      r: "R",
    });

    this.touchHandler = (event) => {
      if (event.detail.action === "jump" && event.detail.pressed) this.touch.jumpQueued = true;
      if (event.detail.action === "duck") this.touch.duck = event.detail.pressed;
      if (event.detail.action === "right" || event.detail.action === "attack") this.touch.sprint = event.detail.pressed;
    };
    window.addEventListener("brainrot:touch", this.touchHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener("brainrot:touch", this.touchHandler);
    });

    this.spawnTimer = this.time.addEvent({
      delay: 1050,
      loop: true,
      callback: () => this.spawnPattern(),
    });
    this.spawnPattern();
  }

  drawRaceTrack() {
    this.add.rectangle(GAME_WIDTH / 2, 236, 770, 68, 0xf9f2df).setStrokeStyle(4, 0x171717);
    this.add.rectangle(GAME_WIDTH / 2, 386, 770, 68, 0xf9f2df).setStrokeStyle(4, 0x171717);
    this.add.text(58, 222, "יריב",
    {
      fontFamily: "Arial",
      fontSize: "16px",
      fontStyle: "900",
      color: "#171717",
    });
    this.add.text(58, 372, "אתה", {
      fontFamily: "Arial",
      fontSize: "16px",
      fontStyle: "900",
      color: "#171717",
    });
    this.add.rectangle(this.trackEnd + 22, 311, 16, 222, 0xffffff).setStrokeStyle(4, 0x171717);
    for (let i = 0; i < 8; i += 1) {
      this.add.rectangle(this.trackEnd + 22, 210 + i * 28, 16, 14, i % 2 ? 0xffffff : 0x171717);
    }
    this.add.text(this.trackEnd - 28, 176, "סיום 500מ׳", {
      fontFamily: "Arial",
      fontSize: "18px",
      fontStyle: "900",
      color: "#171717",
    }).setOrigin(0.5);

    this.playerProgress = this.add.rectangle(this.trackStart, 404, 8, 10, 0x2d79ff).setOrigin(0, 0.5);
    this.rivalProgress = this.add.rectangle(this.trackStart, 254, 8, 10, 0xef4b3f).setOrigin(0, 0.5);
  }

  spawnPattern() {
    if (this.finished) return;
    const obstacle = this.physics.add.image(GAME_WIDTH + 60, GROUND_Y - 36, "obstacle-spaghetti");
    obstacle.setVelocityX(-this.scrollSpeed);
    obstacle.body.allowGravity = false;
    obstacle.setImmovable(true);
    this.obstacles.add(obstacle);

    const collectibleCount = Phaser.Math.Between(2, 4);
    for (let i = 0; i < collectibleCount; i += 1) {
      const y = Phaser.Math.RND.pick([GROUND_Y - 105, GROUND_Y - 145, GROUND_Y - 190]);
      const collectible = this.physics.add.image(GAME_WIDTH + 180 + i * 58, y, "collectible-pasta");
      collectible.setVelocityX(-this.scrollSpeed);
      collectible.body.allowGravity = false;
      this.collectibles.add(collectible);
    }
  }

  collectPasta(_player, collectible) {
    collectible.destroy();
    this.playerDistance = Phaser.Math.Clamp(this.playerDistance + 18, 0, this.finishDistance);
    this.sprintEnergy = Phaser.Math.Clamp(this.sprintEnergy + 18, 0, 100);
    this.flashStatus("בוסט פסטה: +18מ׳ וגם אנרגיה");
  }

  hitObstacle() {
    if (this.time.now < this.hurtUntil || this.finished) return;
    this.hurtUntil = this.time.now + 900;
    this.stumbles += 1;
    this.playerDistance = Phaser.Math.Clamp(this.playerDistance - 22, 0, this.finishDistance);
    this.sprintEnergy = Phaser.Math.Clamp(this.sprintEnergy - 18, 0, 100);
    this.cameras.main.shake(110, 0.008);
    this.player.setTint(0xff5a4f);
    this.time.delayedCall(180, () => this.player.clearTint());
    this.flashStatus(`נתקלת! מעידה ${this.stumbles}: -22מ׳`);
  }

  flashStatus(message) {
    this.lastStatus = message;
    this.statusUntil = this.time.now + 900;
  }

  updateRaceHud() {
    const leader = this.playerDistance >= this.rivalDistance ? this.selected.name : this.rival.name;
    let status = `מוביל: ${leader}`;
    if (this.isSprinting) status = "טורבו פעיל: יותר מהירות, פחות אנרגיה";
    if (this.sprintEnergy < 12) status = "אין מספיק אנרגיה לטורבו";
    if (this.time.now < this.statusUntil) status = this.lastStatus;
    setHud({
      mode: "מירוץ",
      score: `אתה ${Math.floor(this.playerDistance)}מ׳ / ${this.finishDistance}מ׳`,
      lives: `יריב ${Math.floor(this.rivalDistance)}מ׳ | אנרגיה ${Math.floor(this.sprintEnergy)}%`,
      status,
    });
  }

  endRace(playerWon) {
    this.finished = true;
    this.spawnTimer.paused = true;
    this.physics.pause();
    const winner = playerWon ? this.selected : this.rival;
    const message = playerWon ? "ניצחת במירוץ" : "היריב ניצח במירוץ";
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 500, 178, 0xffffff, 0.94)
      .setStrokeStyle(4, 0x171717);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 48, message, {
      fontFamily: "Arial",
      fontSize: "34px",
      fontStyle: "900",
      color: "#171717",
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, `מנצח: ${winner.name}`, {
      fontFamily: "Arial",
      fontSize: "24px",
      fontStyle: "900",
      color: playerWon ? "#00a99d" : "#ef4b3f",
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 42, "לחץ R כדי להתחיל מירוץ מחדש", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#303030",
    }).setOrigin(0.5);
    this.celebrateAt(playerWon ? this.player.x : this.rivalSprite.x, playerWon ? this.player.y - 80 : this.rivalSprite.y - 70);
    setHud({
      mode: "מירוץ",
      score: `אתה ${Math.floor(this.playerDistance)}מ׳`,
      lives: `יריב ${Math.floor(this.rivalDistance)}מ׳`,
      status: message,
    });
  }

  celebrateAt(x, y) {
    for (let i = 0; i < 34; i += 1) {
      const confetti = this.add.rectangle(x, y, 8, 12, Phaser.Math.RND.pick([0xffd447, 0xef4b3f, 0x00a99d, 0x7c5cff]));
      this.tweens.add({
        targets: confetti,
        x: x + Phaser.Math.Between(-210, 210),
        y: y + Phaser.Math.Between(-120, 120),
        angle: Phaser.Math.Between(-240, 240),
        alpha: 0,
        duration: 900,
        ease: "Cubic.easeOut",
      });
    }
  }

  update(_time, delta) {
    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.keys.up) ||
      Phaser.Input.Keyboard.JustDown(this.keys.w) ||
      this.touch.jumpQueued;
    const duckPressed = this.keys.down.isDown || this.keys.s.isDown || this.touch.duck;
    const sprintPressed = this.keys.space.isDown || this.touch.sprint;
    this.touch.jumpQueued = false;

    if (this.finished) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.r)) startMode("runner");
      return;
    }

    if (jumpPressed && this.player.body.blocked.down) {
      this.player.setVelocityY(-610 * this.selected.stats.jump);
    }

    if (duckPressed && this.player.body.blocked.down) {
      this.player.setScale(0.64, 0.48);
      this.player.body.setSize(132, 88);
      this.player.body.setOffset(50, 86);
    } else {
      this.player.setScale(0.64);
      this.player.body.setSize(132, 128);
      this.player.body.setOffset(50, 44);
    }

    const seconds = delta / 1000;
    const baseRate = 34 + this.selected.stats.speed * 15;
    const rivalRate = 34 + this.rival.stats.speed * 12;
    const stumbleDrag = this.time.now < this.hurtUntil ? 0.55 : 1;
    this.isSprinting = sprintPressed && this.sprintEnergy > 4 && this.time.now >= this.hurtUntil;
    if (this.isSprinting) {
      this.sprintEnergy = Phaser.Math.Clamp(this.sprintEnergy - 28 * seconds, 0, 100);
    } else {
      this.sprintEnergy = Phaser.Math.Clamp(this.sprintEnergy + 12 * seconds, 0, 100);
    }
    const sprintBoost = this.isSprinting ? 1.52 : 1;
    this.playerDistance = Phaser.Math.Clamp(this.playerDistance + baseRate * seconds * stumbleDrag * sprintBoost, 0, this.finishDistance);
    this.rivalDistance = Phaser.Math.Clamp(this.rivalDistance + rivalRate * seconds, 0, this.finishDistance);

    if (!this.nextRivalStumbleAt) this.nextRivalStumbleAt = this.time.now + Phaser.Math.Between(1800, 3300);
    if (this.time.now > this.nextRivalStumbleAt) {
      this.rivalDistance = Phaser.Math.Clamp(this.rivalDistance - Phaser.Math.Between(8, 22), 0, this.finishDistance);
      this.rivalSprite.setTint(0xff5a4f);
      this.time.delayedCall(160, () => this.rivalSprite.clearTint());
      this.nextRivalStumbleAt = this.time.now + Phaser.Math.Between(2100, 3900);
    }

    const playerX = Phaser.Math.Linear(this.trackStart, this.trackEnd, this.playerDistance / this.finishDistance);
    const rivalX = Phaser.Math.Linear(this.trackStart, this.trackEnd, this.rivalDistance / this.finishDistance);
    this.player.x = playerX;
    this.rivalSprite.x = rivalX;
    this.playerProgress.width = Math.max(8, playerX - this.trackStart);
    this.rivalProgress.width = Math.max(8, rivalX - this.trackStart);
    this.updateRaceHud();

    if (this.playerDistance >= this.finishDistance || this.rivalDistance >= this.finishDistance) {
      this.endRace(this.playerDistance >= this.rivalDistance);
    }

    [...this.obstacles.getChildren(), ...this.collectibles.getChildren()].forEach((object) => {
      if (object.x < -90) object.destroy();
    });
  }
}

class RunnerScene extends Phaser.Scene {
  constructor() {
    super("RunnerScene");
  }

  init(data) {
    this.selected = getCharacter(data.selectedId);
    const rivals = CHARACTERS.filter((character) => character.id !== this.selected.id);
    this.rival = Phaser.Math.RND.pick(rivals);
    this.level = buildRaceLevel(RACE_LEVELS[appState.raceLevel] || RACE_LEVELS.stage1);
  }

  create() {
    appState.mode = "runner";
    renderUI();
    this.physics.world.gravity.y = 0;
    this.physics.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.finished = false;
    this.sprintEnergy = 100;
    this.boostUntil = 0;
    this.mudUntil = 0;
    this.nextMudMessageAt = 0;
    this.nextMudPenaltyAt = 0;
    this.statusText = `רמה ${this.level.label}: נווט במבוך אל שער הסיום`;
    this.statusUntil = 0;
    this.mazeStyle = MAZE_THEME_STYLES[this.level.theme] || MAZE_THEME_STYLES.home;
    this.wallTextureKeys = [];
    this.waitingForRaceStart = true;
    this.touch = { left: false, right: false, up: false, down: false, sprint: false };

    createBackground(this, this.level.theme || "home");
    this.drawMazeBase();
    this.walls = this.physics.add.staticGroup();
    this.drawWalls();
    this.drawPickupsAndHazards();

    this.finishZone = this.add.rectangle(
      this.level.finish.x,
      this.level.finish.y,
      this.level.finish.w,
      this.level.finish.h,
      0x8ce99a,
      0.78,
    ).setStrokeStyle(5, 0x171717);
    this.physics.add.existing(this.finishZone, true);
    this.add.text(this.level.finish.x, this.level.finish.y, "סיום", {
      fontFamily: "Arial",
      fontSize: "21px",
      fontStyle: "900",
      color: "#171717",
    }).setOrigin(0.5);

    this.player = this.physics.add.sprite(this.level.start.x, this.level.start.y, `character-${this.selected.id}`);
    fitCharacterSprite(this.player, 104, 128);
    this.player.setDepth(8);
    this.player.setCollideWorldBounds(true);
    fitCharacterBody(this.player, 0.46, 0.58, 0.27);
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.overlap(this.player, this.finishZone, () => this.endMazeRace(true), null, this);

    this.rivalSprite = this.add.image(this.level.rivalPath[0].x, this.level.rivalPath[0].y, `character-${this.rival.id}`);
    fitCharacterSprite(this.rivalSprite, 90, 112);
    this.rivalSprite.setDepth(7);
    this.rivalTargetIndex = 1;
    this.rivalDistance = 0;
    this.rivalPathDistances = [0];
    this.rivalPathTotal = this.level.rivalPath.reduce((total, point, index, path) => {
      if (index === 0) return total;
      const previous = path[index - 1];
      const nextTotal = total + Phaser.Math.Distance.Between(previous.x, previous.y, point.x, point.y);
      this.rivalPathDistances[index] = nextTotal;
      return nextTotal;
    }, 0);
    this.rivalProgress = 0;

    this.collectibles = this.physics.add.staticGroup();
    this.level.pasta.forEach((spot) => {
      const pasta = this.collectibles.create(spot.x, spot.y, "collectible-pasta");
      pasta.setDisplaySize(48, 48);
      pasta.setDepth(6);
      pasta.refreshBody();
    });
    this.physics.add.overlap(this.player, this.collectibles, this.collectPasta, null, this);

    this.mudZones = this.physics.add.staticGroup();
    this.level.mud.forEach((mud) => {
      const zone = this.add.rectangle(mud.x, mud.y, mud.w * 0.9, mud.h * 0.74, 0xef4b3f, 0.001)
        .setDepth(2);
      this.physics.add.existing(zone, true);
      this.mudZones.add(zone);
    });
    this.physics.add.overlap(this.player, this.mudZones, () => this.hitMud(), null, this);

    this.keys = this.input.keyboard.addKeys({
      up: "UP",
      down: "DOWN",
      left: "LEFT",
      right: "RIGHT",
      w: "W",
      a: "A",
      s: "S",
      d: "D",
      space: "SPACE",
      r: "R",
    });
    this.domKeys = { space: false };
    this.keydownHandler = (event) => {
      if (event.code === "Space" || event.key === " ") {
        this.domKeys.space = true;
        event.preventDefault();
      }
      this.startRaceFromInstructions();
    };
    this.keyupHandler = (event) => {
      if (event.code === "Space" || event.key === " ") this.domKeys.space = false;
    };
    window.addEventListener("keydown", this.keydownHandler, true);
    window.addEventListener("keyup", this.keyupHandler, true);
    this.input.keyboard.once("keydown", () => this.startRaceFromInstructions());

    this.touchHandler = (event) => {
      const { action, pressed } = event.detail;
      if (pressed) this.startRaceFromInstructions();
      if (action === "left") this.touch.left = pressed;
      if (action === "right") this.touch.right = pressed;
      if (action === "jump") this.touch.up = pressed;
      if (action === "duck") this.touch.down = pressed;
      if (action === "attack") this.touch.sprint = pressed;
    };
    window.addEventListener("brainrot:touch", this.touchHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener("brainrot:touch", this.touchHandler);
      window.removeEventListener("keydown", this.keydownHandler, true);
      window.removeEventListener("keyup", this.keyupHandler, true);
      (this.wallTextureKeys || []).forEach((key) => {
        if (this.textures.exists(key)) this.textures.remove(key);
      });
    });

    this.countdownText = this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      `${this.level.label}\nתנועה: חצים / WASD\nטורבו: Space\nפסטה: +58% מהירות ל-3.6 שניות\nרוטב: האטה כבדה ל-2.1 שניות\nלחץ על מקש כלשהו להתחלה`,
      {
        fontFamily: "Arial",
        fontSize: "23px",
        fontStyle: "900",
        color: "#171717",
        align: "center",
        lineSpacing: 8,
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: { x: 22, y: 16 },
      },
    ).setOrigin(0.5).setDepth(18).setStroke("#ffffff", 4);

    this.updateMazeHud();
  }

  startRaceFromInstructions() {
    if (!this.waitingForRaceStart || this.finished) return;
    this.waitingForRaceStart = false;
    if (this.countdownText) {
      this.countdownText.destroy();
      this.countdownText = null;
    }
    this.flashStatus("קדימה: מצא את הדרך לשער הסיום");
  }

  drawMazeBase() {
    const style = this.mazeStyle || MAZE_THEME_STYLES.home;
    const isDarkMaze = ["city", "lunapark", "space"].includes(this.level.theme);
    const panelTextColor = isDarkMaze ? "#ffffff" : "#171717";
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, style.pathA, 0.13).setDepth(-30);
    this.add.rectangle(GAME_WIDTH / 2, 273, 900, 430, style.pathB, 0.38)
      .setStrokeStyle(2, style.highlight, 0.34)
      .setDepth(-28);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 18, GAME_WIDTH, 36, style.pathA, 0.44).setDepth(-26);
    for (let row = 0; row < MAZE_ROWS; row += 1) {
      for (let col = 0; col < MAZE_COLS; col += 1) {
        const { x, y } = mazePoint([col, row]);
        const isOpen = this.level.openCells.has(`${col},${row}`);
        const even = (row + col) % 2 === 0;
        const fill = isOpen ? (even ? style.pathA : style.pathB) : style.blocked;
        this.add.rectangle(x, y, MAZE_CELL_W - 8, MAZE_CELL_H - 8, fill, isOpen ? 0.74 : 0.36)
          .setStrokeStyle(1, isOpen ? style.highlight : style.stroke, isOpen ? 0.28 : 0.34)
          .setDepth(-20);
      }
    }

    const route = this.level.rivalPath;
    const routeLine = this.add.graphics().setDepth(-18);
    routeLine.lineStyle(8, style.route, 0.28);
    routeLine.beginPath();
    routeLine.moveTo(route[0].x, route[0].y);
    route.slice(1).forEach((point) => routeLine.lineTo(point.x, point.y));
    routeLine.strokePath();

    for (let x = 78; x < 900; x += 124) {
      this.add.circle(x, 78, 18, style.route, 0.36).setDepth(-19);
      this.add.rectangle(x + 26, 80, 26, 10, style.highlight, 0.28).setDepth(-19);
    }
    this.add.rectangle(GAME_WIDTH / 2, 528, 720, 24, style.pathA, 0.86)
      .setStrokeStyle(2, style.stroke, 0.75)
      .setDepth(-16);
    const hintLabel = this.add.text(GAME_WIDTH / 2, 528, `${this.level.label}: ${this.level.hint}`, {
      fontFamily: "Arial",
      fontSize: "14px",
      fontStyle: "900",
      color: panelTextColor,
      align: "center",
    }).setOrigin(0.5).setDepth(-15);
    if (isDarkMaze) hintLabel.setStroke("#171717", 3);
  }

  createWallTexture(x, y, w, h, index) {
    const style = this.mazeStyle || MAZE_THEME_STYLES.home;
    const textureKey = `wall-${this.level.theme}-${index}-${Math.round(x)}-${Math.round(y)}-${Math.round(w)}-${Math.round(h)}`;
    const padding = 12;
    const width = Math.ceil(w + padding * 2);
    const height = Math.ceil(h + padding * 2);
    const radius = Math.min(14, Math.max(6, Math.floor(Math.min(w, h) / 2.4)));

    if (this.textures.exists(textureKey)) this.textures.remove(textureKey);
    const texture = this.textures.createCanvas(textureKey, width, height);
    const canvas = texture.getSourceImage();
    const ctx = canvas.getContext("2d");
    const color = style.wallPalette[index % style.wallPalette.length];
    const dark = mixColor(color, 0x000000, 0.28);
    const light = mixColor(color, 0xffffff, 0.28);

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.38)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 6;
    roundedCanvasPath(ctx, padding, padding, w, h, radius);
    ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
    ctx.fill();
    ctx.restore();

    ctx.save();
    roundedCanvasPath(ctx, padding, padding, w, h, radius);
    ctx.clip();
    this.paintWallBackgroundSample(ctx, padding, x, y, w, h);

    ctx.globalAlpha = 0.88;
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + h);
    gradient.addColorStop(0, colorRgba(light, 0.94));
    gradient.addColorStop(0.44, colorRgba(color, 0.82));
    gradient.addColorStop(1, colorRgba(dark, 0.9));
    ctx.fillStyle = gradient;
    ctx.fillRect(padding, padding, w, h);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
    ctx.fillRect(padding + 5, padding + 5, Math.max(4, w - 10), Math.max(4, Math.min(8, h * 0.24)));
    this.paintWallMaterial(ctx, padding, w, h, style, index);
    ctx.restore();

    roundedCanvasPath(ctx, padding, padding, w, h, radius);
    ctx.lineWidth = 3;
    ctx.strokeStyle = colorRgba(style.stroke, 0.9);
    ctx.stroke();
    roundedCanvasPath(ctx, padding + 3, padding + 3, Math.max(2, w - 6), Math.max(2, h - 6), Math.max(4, radius - 3));
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = colorRgba(style.highlight, 0.38);
    ctx.stroke();

    texture.refresh();
    if (this.wallTextureKeys) this.wallTextureKeys.push(textureKey);
    return textureKey;
  }

  paintWallBackgroundSample(ctx, padding, x, y, w, h) {
    const backgroundKey = `background-${this.level.theme || "home"}`;
    if (!this.textures.exists(backgroundKey)) return;
    const source = this.textures.get(backgroundKey).getSourceImage();
    if (!source || !source.width || !source.height) return;
    const sampleW = Math.min(source.width, Math.max(18, Math.round((w / GAME_WIDTH) * source.width)));
    const sampleH = Math.min(source.height, Math.max(18, Math.round((h / GAME_HEIGHT) * source.height)));
    const sx = Phaser.Math.Clamp(Math.round((x / GAME_WIDTH) * source.width - sampleW / 2), 0, Math.max(0, source.width - sampleW));
    const sy = Phaser.Math.Clamp(Math.round((y / GAME_HEIGHT) * source.height - sampleH / 2), 0, Math.max(0, source.height - sampleH));
    ctx.globalAlpha = 0.62;
    ctx.drawImage(source, sx, sy, sampleW, sampleH, padding, padding, w, h);
    ctx.globalAlpha = 1;
  }

  paintWallMaterial(ctx, padding, w, h, style, index) {
    const left = padding;
    const top = padding;
    const right = padding + w;
    const bottom = padding + h;

    if (style.motif === "home") {
      this.paintHomeWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    if (style.motif === "foam") {
      this.paintFoamWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    if (style.motif === "wood") {
      this.paintWoodWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    if (style.motif === "neon") {
      this.paintCityWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    if (style.motif === "stone") {
      this.paintStoneWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    if (style.motif === "vine") {
      this.paintJungleWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    if (style.motif === "water") {
      this.paintWaterWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    if (style.motif === "bulbs") {
      this.paintLunaparkWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    if (style.motif === "panel") {
      this.paintSpaceWall(ctx, left, top, right, bottom, style, index);
      return;
    }
    this.paintFinalWall(ctx, left, top, right, bottom, style, index);
  }

  paintHomeWall(ctx, left, top, right, bottom, style, index) {
    const colors = [0x2f9e91, 0xe8590c, 0xf0c419, 0x79a86b, 0xb87842];
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(70, 45, 28, 0.45)";
    for (let x = left + 14; x < right - 8; x += 34) {
      ctx.fillStyle = colorRgba(colors[(index + x) % colors.length], 0.68);
      roundedCanvasPath(ctx, x, top + 10, Math.min(22, right - x - 5), Math.max(10, bottom - top - 20), 5);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
    ctx.fillRect(left + 9, top + 8, Math.max(10, right - left - 18), 5);
    ctx.fillStyle = colorRgba(style.stroke, 0.28);
    for (let x = left + 18; x < right - 8; x += 46) ctx.fillRect(x, bottom - 12, 18, 4);
  }

  paintFoamWall(ctx, left, top, right, bottom, style, index) {
    const colors = [0xff6b6b, 0x4dabf7, 0xffd447, 0x8ce99a, 0xffa8d8];
    ctx.lineWidth = 2;
    for (let x = left + 10; x < right - 6; x += 28) {
      const color = colors[(index + x) % colors.length];
      ctx.fillStyle = colorRgba(color, 0.62);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.58)";
      roundedCanvasPath(ctx, x, top + 9, Math.min(22, right - x - 5), Math.max(12, bottom - top - 18), 8);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.24)";
    for (let x = left + 18; x < right - 8; x += 42) ctx.beginPath(), ctx.arc(x, top + 14, 5, 0, Math.PI * 2), ctx.fill();
  }

  paintWoodWall(ctx, left, top, right, bottom, style) {
    ctx.lineWidth = 2;
    for (let y = top + 12; y < bottom - 6; y += 13) {
      ctx.strokeStyle = "rgba(74, 43, 19, 0.44)";
      ctx.beginPath();
      ctx.moveTo(left + 8, y);
      ctx.bezierCurveTo(left + 40, y - 3, right - 45, y + 4, right - 8, y);
      ctx.stroke();
    }
    ctx.fillStyle = colorRgba(style.highlight, 0.22);
    for (let x = left + 18; x < right - 8; x += 44) ctx.fillRect(x, top + 8, 18, 4);
    ctx.fillStyle = "rgba(62, 34, 15, 0.32)";
    for (let x = left + 22; x < right - 8; x += 58) ctx.beginPath(), ctx.ellipse(x, (top + bottom) / 2, 13, 5, 0, 0, Math.PI * 2), ctx.fill();
  }

  paintCityWall(ctx, left, top, right, bottom, style, index) {
    ctx.fillStyle = "rgba(8, 12, 26, 0.44)";
    for (let x = left + 10; x < right - 8; x += 28) ctx.fillRect(x, top + 9, 14, Math.max(8, bottom - top - 18));
    ctx.strokeStyle = colorRgba(style.highlight, 0.62);
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(left + 8, top + 10 + (index % 3) * 4);
    ctx.lineTo(right - 8, top + 10 + (index % 3) * 4);
    ctx.stroke();
    ctx.fillStyle = colorRgba(style.route, 0.7);
    for (let x = left + 14; x < right - 10; x += 42) ctx.fillRect(x, bottom - 14, 16, 6);
  }

  paintStoneWall(ctx, left, top, right, bottom, style, index) {
    ctx.strokeStyle = "rgba(74, 45, 21, 0.45)";
    ctx.lineWidth = 2;
    for (let x = left + 9; x < right - 8; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, top + 8);
      ctx.lineTo(x + 14 + (index % 3), bottom - 8);
      ctx.stroke();
      ctx.fillStyle = colorRgba(style.highlight, 0.22);
      ctx.beginPath();
      ctx.ellipse(x + 10, (top + bottom) / 2, 13, 7, -0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(255, 238, 186, 0.25)";
    ctx.beginPath();
    ctx.moveTo(left + 8, top + 8);
    ctx.lineTo(right - 10, top + 13);
    ctx.stroke();
  }

  paintJungleWall(ctx, left, top, right, bottom, style, index) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(51, 26, 12, 0.45)";
    for (let y = top + 12; y < bottom - 5; y += 14) {
      ctx.beginPath();
      ctx.moveTo(left + 7, y);
      ctx.bezierCurveTo(left + 28, y - 5, right - 40, y + 5, right - 7, y - 1);
      ctx.stroke();
    }
    ctx.strokeStyle = colorRgba(style.highlight, 0.5);
    ctx.lineWidth = 2.4;
    for (let x = left + 12; x < right - 12; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, bottom - 7);
      ctx.bezierCurveTo(x + 8, top + 8, x + 20, bottom - 15, x + 28, top + 9);
      ctx.stroke();
      ctx.fillStyle = "rgba(178, 235, 146, 0.46)";
      ctx.beginPath();
      ctx.ellipse(x + 14, (top + bottom) / 2, 11, 6, -0.45, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  paintWaterWall(ctx, left, top, right, bottom, style) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.58)";
    ctx.lineWidth = 3;
    for (let y = top + 13; y < bottom - 5; y += 15) {
      ctx.beginPath();
      for (let x = left + 8; x < right - 8; x += 18) {
        if (x === left + 8) ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + 8, y - 7, x + 18, y);
      }
      ctx.stroke();
    }
    ctx.fillStyle = colorRgba(style.route, 0.35);
    for (let x = left + 16; x < right - 8; x += 44) ctx.beginPath(), ctx.ellipse(x, bottom - 12, 16, 7, 0, 0, Math.PI * 2), ctx.fill();
  }

  paintLunaparkWall(ctx, left, top, right, bottom, style, index) {
    const stripeColors = [0xe03131, 0xfff4bd, 0x364fc7, 0xffd43b];
    for (let x = left; x < right; x += 22) {
      ctx.fillStyle = colorRgba(stripeColors[(index + x) % stripeColors.length], 0.36);
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x + 16, top);
      ctx.lineTo(x + 28, bottom);
      ctx.lineTo(x + 8, bottom);
      ctx.closePath();
      ctx.fill();
    }
    ctx.strokeStyle = colorRgba(style.highlight, 0.55);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(left + 8, top + 9);
    ctx.lineTo(right - 8, top + 9);
    ctx.stroke();
    for (let x = left + 13; x < right - 6; x += 22) {
      ctx.fillStyle = colorRgba(Phaser.Math.RND.pick(style.wallPalette), 0.82);
      ctx.beginPath();
      ctx.arc(x, top + 9, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  paintSpaceWall(ctx, left, top, right, bottom, style, index) {
    ctx.strokeStyle = "rgba(210, 225, 255, 0.48)";
    ctx.lineWidth = 2;
    for (let x = left + 18; x < right - 8; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, top + 7);
      ctx.lineTo(x, bottom - 7);
      ctx.stroke();
      ctx.fillStyle = colorRgba(style.highlight, 0.48);
      ctx.fillRect(x - 5, (top + bottom) / 2 - 4, 10, 8);
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
    for (let x = left + 11; x < right - 8; x += 43) ctx.fillRect(x, top + 10 + (index % 2) * 9, 3, 3);
    ctx.strokeStyle = colorRgba(style.route, 0.55);
    ctx.beginPath();
    ctx.moveTo(left + 8, bottom - 10);
    ctx.lineTo(right - 8, bottom - 10);
    ctx.stroke();
  }

  paintFinalWall(ctx, left, top, right, bottom, style, index) {
    this.paintLunaparkWall(ctx, left, top, right, bottom, style, index);
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    for (let x = left + 17; x < right - 8; x += 32) {
      ctx.save();
      ctx.translate(x, (top + bottom) / 2);
      ctx.rotate(((index + x) % 5) * 0.16);
      ctx.fillRect(-6, -4, 12, 8);
      ctx.restore();
    }
  }

  drawWallMotif(graphics, x, y, w, h, style, index) {
    const left = x - w / 2;
    const top = y - h / 2;
    const right = x + w / 2;
    const bottom = y + h / 2;
    const step = Math.max(24, Math.min(52, Math.floor(Math.max(w, h) / 3)));

    graphics.lineStyle(2, style.highlight, 0.34);
    if (style.motif === "wood") {
      for (let yy = top + 12; yy < bottom - 4; yy += 14) {
        graphics.lineBetween(left + 8, yy, right - 8, yy + ((index + yy) % 2 ? 2 : -2));
      }
      graphics.fillStyle(0x5f3d22, 0.24);
      for (let xx = left + 15; xx < right - 8; xx += step) {
        graphics.fillEllipse(xx, y, 12, 6);
      }
      return;
    }

    if (style.motif === "neon" || style.motif === "panel") {
      for (let xx = left + 18; xx < right - 8; xx += step) {
        graphics.lineBetween(xx, top + 6, xx, bottom - 6);
        graphics.fillStyle(style.highlight, 0.42);
        graphics.fillRect(xx - 5, y - 4, 10, 8);
      }
      graphics.lineStyle(3, style.route, 0.42);
      graphics.lineBetween(left + 8, top + 8, right - 8, top + 8);
      return;
    }

    if (style.motif === "vine") {
      graphics.lineStyle(3, style.stroke, 0.42);
      for (let xx = left + 10; xx < right - 8; xx += 28) {
        graphics.lineBetween(xx, bottom - 8, xx + 18, top + 8);
        graphics.fillStyle(style.highlight, 0.38);
        graphics.fillEllipse(xx + 10, y - 2, 14, 8);
      }
      return;
    }

    if (style.motif === "water") {
      graphics.lineStyle(3, style.highlight, 0.42);
      for (let yy = top + 13; yy < bottom - 4; yy += 16) {
        for (let xx = left + 8; xx < right - 16; xx += 34) {
          graphics.lineBetween(xx, yy, xx + 11, yy - 5);
          graphics.lineBetween(xx + 11, yy - 5, xx + 24, yy);
        }
      }
      return;
    }

    if (style.motif === "bulbs" || style.motif === "final") {
      graphics.lineStyle(2, style.highlight, 0.32);
      graphics.lineBetween(left + 8, top + 9, right - 8, top + 9);
      for (let xx = left + 13; xx < right - 6; xx += 22) {
        graphics.fillStyle(Phaser.Math.RND.pick(style.wallPalette), 0.72);
        graphics.fillCircle(xx, top + 9, 5);
      }
      return;
    }

    if (style.motif === "stone") {
      for (let xx = left + 12; xx < right - 8; xx += 30) {
        graphics.lineBetween(xx, top + 8, xx + 18, bottom - 8);
        graphics.fillStyle(style.highlight, 0.22);
        graphics.fillEllipse(xx + 12, y, 16, 9);
      }
      return;
    }

    for (let xx = left + 12; xx < right - 8; xx += step) {
      graphics.fillStyle(style.highlight, 0.28);
      graphics.fillRoundedRect(xx, top + 9, 22, Math.max(8, h - 18), 5);
    }
  }

  addWall(x, y, w, h) {
    const index = this.wallIndex || 0;
    this.wallIndex = index + 1;
    const textureKey = this.createWallTexture(x, y, w, h, index);
    this.add.image(x, y, textureKey).setDepth(4);
    const wall = this.add.rectangle(x, y, w, h, 0xffffff, 0.001).setVisible(false);
    this.physics.add.existing(wall, true);
    this.walls.add(wall);
  }

  drawWalls() {
    this.wallIndex = 0;
    this.addWall(GAME_WIDTH / 2, 58, 856, 28);
    this.addWall(GAME_WIDTH / 2, GAME_HEIGHT - 42, 856, 28);
    this.addWall(38, GAME_HEIGHT / 2 + 8, 28, 438);
    this.addWall(GAME_WIDTH - 38, GAME_HEIGHT / 2 + 8, 28, 438);
    this.level.walls.forEach((wall) => this.addWall(wall.x, wall.y, wall.w, wall.h));
  }

  drawPickupsAndHazards() {
    this.level.pasta.forEach((spot) => {
      this.add.circle(spot.x, spot.y, 31, 0xfff3bf, 0.34).setDepth(1);
      this.add.circle(spot.x, spot.y, 19, 0xffffff, 0.22).setDepth(1);
    });
    this.level.mud.forEach((mud) => {
      this.add.ellipse(mud.x + 5, mud.y + 5, mud.w + 14, mud.h + 12, 0x000000, 0.16).setDepth(1);
      const sauce = this.add.image(mud.x, mud.y, "hazard-sauce").setDepth(2);
      const scale = Math.max((mud.w + 24) / 128, (mud.h + 26) / 128);
      sauce.setScale(scale);
      sauce.setAngle(((mud.x + mud.y) % 7 - 3) * 7);
      sauce.setAlpha(0.96);
    });
    this.add.circle(this.level.start.x, this.level.start.y, 42, 0x2d79ff, 0.18).setDepth(1);
    this.add.text(this.level.start.x, this.level.start.y + 50, "זינוק", {
      fontFamily: "Arial",
      fontSize: "16px",
      fontStyle: "900",
      color: "#171717",
    }).setOrigin(0.5);
  }

  collectPasta(_player, pasta) {
    pasta.destroy();
    const now = this.raceClock();
    this.sprintEnergy = Phaser.Math.Clamp(this.sprintEnergy + PASTA_ENERGY_GAIN, 0, 100);
    this.boostUntil = Math.max(this.boostUntil, now + PASTA_BOOST_DURATION);
    this.flashStatus("פסטה! +58% מהירות ל-3.6 שניות");
    this.cameras.main.shake(80, 0.002);
  }

  hitMud() {
    const now = this.raceClock();
    this.mudUntil = Math.max(this.mudUntil, now + SAUCE_SLOW_DURATION);
    if (now >= this.nextMudPenaltyAt) {
      this.sprintEnergy = Phaser.Math.Clamp(this.sprintEnergy - SAUCE_ENERGY_PENALTY, 0, 100);
      this.nextMudPenaltyAt = now + 600;
    }
    if (now < this.nextMudMessageAt) return;
    this.nextMudMessageAt = now + 650;
    this.flashStatus("רוטב! האטה כבדה ל-2.1 שניות");
  }

  flashStatus(message) {
    this.statusText = message;
    this.statusUntil = this.raceClock() + 1100;
  }

  raceClock() {
    return this.currentTime || 0;
  }

  playerProgress() {
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    this.level.rivalPath.forEach((point, index) => {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, point.x, point.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    return Phaser.Math.Clamp((this.rivalPathDistances[nearestIndex] / this.rivalPathTotal) * 100, 0, 100);
  }

  updateMazeHud() {
    const now = this.raceClock();
    const boostLeft = Math.max(0, this.boostUntil - now) / 1000;
    const sauceLeft = Math.max(0, this.mudUntil - now) / 1000;
    let status = now < this.statusUntil
      ? this.statusText
      : `רמה ${this.level.label}: מצא את הדרך לשער הסיום`;
    if (this.isSprinting) status = "טורבו פעיל: מהיר יותר, אבל האנרגיה יורדת";
    if (this.sprintEnergy < 10) status = "אין מספיק אנרגיה לטורבו";
    if (boostLeft > 0) status = `פסטה: +58% מהירות לעוד ${boostLeft.toFixed(1)} שניות`;
    if (sauceLeft > 0) status = `רוטב: האטה כבדה לעוד ${sauceLeft.toFixed(1)} שניות`;
    const effects = [];
    if (boostLeft > 0) effects.push(`פסטה ${boostLeft.toFixed(1)}ש׳`);
    if (sauceLeft > 0) effects.push(`רוטב ${sauceLeft.toFixed(1)}ש׳`);
    setHud({
      mode: "מירוץ",
      score: `התקדמות ${Math.floor(this.playerProgress())}%`,
      lives: `יריב ${Math.floor(this.rivalProgress)}% | אנרגיה ${Math.floor(this.sprintEnergy)}%${effects.length ? ` | ${effects.join(" | ")}` : ""}`,
      status,
    });
  }

  moveRival(delta) {
    if (this.rivalTargetIndex >= this.level.rivalPath.length) {
      this.rivalProgress = 100;
      this.endMazeRace(false);
      return;
    }
    const target = this.level.rivalPath[this.rivalTargetIndex];
    const dx = target.x - this.rivalSprite.x;
    const dy = target.y - this.rivalSprite.y;
    const distance = Math.hypot(dx, dy);
    const step = (this.level.rivalSpeed + this.rival.stats.speed * 18) * (delta / 1000);
    const moveDistance = Math.min(distance, step);
    if (distance <= step) {
      this.rivalSprite.setPosition(target.x, target.y);
      this.rivalTargetIndex += 1;
    } else {
      this.rivalSprite.x += (dx / distance) * step;
      this.rivalSprite.y += (dy / distance) * step;
      this.rivalSprite.setFlipX(dx < 0);
    }
    this.rivalDistance += moveDistance;
    this.rivalProgress = Phaser.Math.Clamp((this.rivalDistance / this.rivalPathTotal) * 100, 0, 100);
    if (this.rivalTargetIndex >= this.level.rivalPath.length) this.endMazeRace(false);
  }

  endMazeRace(playerWon) {
    if (this.finished) return;
    this.finished = true;
    this.physics.pause();
    const winner = playerWon ? this.selected : this.rival;
    const message = playerWon ? "ניצחת במירוץ המבוך" : "היריב ניצח במירוץ המבוך";
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 560, 176, 0xffffff, 0.94)
      .setStrokeStyle(5, 0x171717)
      .setDepth(20);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 48, message, {
      fontFamily: "Arial",
      fontSize: "34px",
      fontStyle: "900",
      color: "#171717",
      align: "center",
    }).setOrigin(0.5).setDepth(21);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, `מנצח: ${winner.name}`, {
      fontFamily: "Arial",
      fontSize: "23px",
      fontStyle: "900",
      color: playerWon ? "#00a99d" : "#ef4b3f",
    }).setOrigin(0.5).setDepth(21);
    this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 42, "לחץ R כדי להתחיל מחדש", {
      fontFamily: "Arial",
      fontSize: "19px",
      color: "#303030",
    }).setOrigin(0.5).setDepth(21);
    this.celebrateAt(playerWon ? this.player.x : this.rivalSprite.x, playerWon ? this.player.y : this.rivalSprite.y);
    setHud({
      mode: "מירוץ",
      score: `התקדמות ${Math.floor(this.playerProgress())}%`,
      lives: `יריב ${Math.floor(this.rivalProgress)}%`,
      status: message,
    });
  }

  celebrateAt(x, y) {
    for (let i = 0; i < 42; i += 1) {
      const confetti = this.add.rectangle(x, y, 8, 12, Phaser.Math.RND.pick([0xffd447, 0xef4b3f, 0x00a99d, 0x7c5cff])).setDepth(22);
      this.tweens.add({
        targets: confetti,
        x: x + Phaser.Math.Between(-240, 240),
        y: y + Phaser.Math.Between(-150, 150),
        angle: Phaser.Math.Between(-260, 260),
        alpha: 0,
        duration: 1100,
        ease: "Cubic.easeOut",
      });
    }
  }

  update(time, delta) {
    this.currentTime = time;
    if (this.finished) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.r)) startMode("runner");
      return;
    }

    if (this.waitingForRaceStart) {
      this.player.setVelocity(0, 0);
      this.isSprinting = false;
      this.statusText = "ההוראות נשארות פתוחות: לחץ על מקש כלשהו להתחלה";
      this.statusUntil = this.raceClock() + 120;
      this.updateMazeHud();
      return;
    }

    const horizontal = Number(this.keys.right.isDown || this.keys.d.isDown || this.touch.right)
      - Number(this.keys.left.isDown || this.keys.a.isDown || this.touch.left);
    const vertical = Number(this.keys.down.isDown || this.keys.s.isDown || this.touch.down)
      - Number(this.keys.up.isDown || this.keys.w.isDown || this.touch.up);
    const length = Math.hypot(horizontal, vertical) || 1;
    const sprintPressed = this.keys.space.isDown || this.domKeys.space || this.touch.sprint;
    const now = this.raceClock();
    const inMud = now < this.mudUntil;
    const boosted = now < this.boostUntil;
    this.isSprinting = sprintPressed && this.sprintEnergy > 4 && !inMud;
    if (this.isSprinting) {
      this.sprintEnergy = Phaser.Math.Clamp(this.sprintEnergy - (this.level.sprintDrain || 26) * (delta / 1000), 0, 100);
    } else {
      this.sprintEnergy = Phaser.Math.Clamp(this.sprintEnergy + (this.level.energyRegen || 10) * (delta / 1000), 0, 100);
    }
    const sprintBoost = this.isSprinting ? (this.level.sprintBoost || 1.48) : 1;
    const sauceDrag = inMud ? Math.min(this.level.mudDrag || SAUCE_SPEED_CAP, SAUCE_SPEED_CAP) : 1;
    const pastaBoost = boosted ? PASTA_SPEED_BOOST : 1;
    const speed = (128 + this.selected.stats.speed * 42) * sprintBoost * sauceDrag * pastaBoost;
    this.player.setVelocity((horizontal / length) * speed, (vertical / length) * speed);
    if (horizontal !== 0) this.player.setFlipX(horizontal < 0);
    if (inMud) {
      this.player.setTint(0xb85a2b);
    } else if (boosted) {
      this.player.setTint(0xffd447);
    } else {
      this.player.clearTint();
    }

    this.moveRival(delta);
    this.updateMazeHud();
  }
}

class CliffScene extends Phaser.Scene {
  constructor() {
    super("CliffScene");
  }

  init(data) {
    this.selected = getCharacter(data.selectedId);
  }

  create() {
    appState.mode = "cliff";
    renderUI();
    this.physics.world.gravity.y = 1500;
    this.finished = false;
    this.waitingForStart = true;
    this.respawning = false;
    this.distance = 0;
    this.goalDistance = 1000;
    this.lives = 3;
    this.zone = 1;
    this.lastPlatformY = 424;
    this.coyoteUntil = 0;
    this.jumpBufferUntil = 0;
    this.statusText = "קפוץ בזמן ואל תיפול לתהום";
    this.statusUntil = 0;
    this.touch = { jumpQueued: false, jumpHeld: false };

    createBackground(this, "desert");
    this.drawCliffWorld();
    this.platforms = this.add.group();
    this.collectibles = this.add.group();

    this.spawnPlatform(140, 430, 430, false, true);
    this.ensurePlatforms();

    this.player = this.physics.add.sprite(190, 310, `character-${this.selected.id}`);
    fitCharacterSprite(this.player, 104, 142);
    fitCharacterBody(this.player, 0.42, 0.58, 0.28);
    this.player.setDepth(8);
    this.player.setCollideWorldBounds(false);
    this.physics.add.collider(this.player, this.platforms, this.landOnPlatform, null, this);
    this.physics.add.overlap(this.player, this.collectibles, this.collectPasta, null, this);

    this.landingShadow = this.add.ellipse(this.player.x, 420, 58, 14, 0x0b1020, 0.34).setDepth(5);

    this.keys = this.input.keyboard.addKeys({
      up: "UP",
      w: "W",
      space: "SPACE",
      r: "R",
    });

    this.input.keyboard.once("keydown", () => this.startChallenge());
    this.touchHandler = (event) => {
      if (event.detail.action !== "jump") return;
      this.touch.jumpHeld = event.detail.pressed;
      if (event.detail.pressed) {
        this.touch.jumpQueued = true;
        this.startChallenge();
      }
    };
    window.addEventListener("brainrot:touch", this.touchHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener("brainrot:touch", this.touchHandler);
    });

    this.instructions = this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      "אתגר התהום\nהדמות רצה מעצמה\nקפיצה: Space / חץ למעלה / W\nלחיצה קצרה = קפיצה נמוכה\nלחיצה ארוכה = קפיצה גבוהה\n3 נפילות בלבד | יעד: 1,000 מטר\nלחץ על מקש כלשהו להתחלה",
      {
        fontFamily: "Arial",
        fontSize: "22px",
        fontStyle: "900",
        color: "#171717",
        align: "center",
        lineSpacing: 7,
        backgroundColor: "rgba(255,255,255,0.94)",
        padding: { x: 24, y: 18 },
      },
    ).setOrigin(0.5).setDepth(30).setStroke("#ffffff", 3);
    this.updateCliffHud();
  }

  drawCliffWorld() {
    this.add.rectangle(GAME_WIDTH / 2, 456, GAME_WIDTH, 168, 0x111827, 0.74).setDepth(-12);
    this.add.rectangle(GAME_WIDTH / 2, 510, GAME_WIDTH, 70, 0x05070d, 0.88).setDepth(-11);
    for (let x = 40; x < GAME_WIDTH; x += 120) {
      const fog = this.add.ellipse(x, 485 + (x % 3) * 9, 170, 38, 0xd9ecff, 0.12).setDepth(-9);
      this.tweens.add({
        targets: fog,
        x: fog.x + 52,
        alpha: 0.22,
        duration: 2600 + x * 2,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    }
    this.add.text(42, 72, "גשר התהום", {
      fontFamily: "Arial",
      fontSize: "34px",
      fontStyle: "900",
      color: "#ffffff",
    }).setDepth(2).setStroke("#171717", 5);
    this.add.text(44, 112, "חמישה אזורים. שלוש נפילות. קפיצה אחת מדויקת.", {
      fontFamily: "Arial",
      fontSize: "17px",
      fontStyle: "900",
      color: "#fff4bd",
    }).setDepth(2).setStroke("#171717", 4);
  }

  startChallenge() {
    if (!this.waitingForStart || this.finished) return;
    this.waitingForStart = false;
    if (this.instructions) {
      this.instructions.destroy();
      this.instructions = null;
    }
    this.flashCliffStatus("קדימה: קפוץ אל המצוק הבא");
  }

  createCliffPlatformTexture(width, fragile, index) {
    const roundedWidth = Math.max(90, Math.round(width));
    const key = `cliff-platform-${roundedWidth}-${fragile ? 1 : 0}-${index % 4}`;
    if (this.textures.exists(key)) return key;
    const height = 58;
    const texture = this.textures.createCanvas(key, roundedWidth, height);
    const canvas = texture.getSourceImage();
    const ctx = canvas.getContext("2d");
    const base = fragile ? 0xb96735 : [0x6d4b31, 0x745237, 0x5f4635, 0x805c3d][index % 4];
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colorRgba(mixColor(base, 0xffffff, 0.24), 1));
    gradient.addColorStop(0.2, colorRgba(base, 1));
    gradient.addColorStop(1, colorRgba(mixColor(base, 0x000000, 0.42), 1));
    roundedCanvasPath(ctx, 1, 1, roundedWidth - 2, height - 3, 12);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(35, 24, 17, 0.9)";
    ctx.stroke();
    ctx.fillStyle = fragile ? "#f2a65a" : "#6f9f54";
    ctx.fillRect(8, 5, roundedWidth - 16, 9);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(12, 6, roundedWidth - 24, 3);
    for (let x = 18; x < roundedWidth - 12; x += 34) {
      ctx.fillStyle = `rgba(255,255,255,${0.08 + ((x + index) % 3) * 0.04})`;
      ctx.beginPath();
      ctx.ellipse(x, 30 + ((x + index) % 12), 11, 6, -0.25, 0, Math.PI * 2);
      ctx.fill();
    }
    if (fragile) {
      ctx.strokeStyle = "rgba(74, 31, 18, 0.82)";
      ctx.lineWidth = 2;
      for (let x = 44; x < roundedWidth - 24; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, 10);
        ctx.lineTo(x - 8, 27);
        ctx.lineTo(x + 5, 37);
        ctx.lineTo(x - 3, 52);
        ctx.stroke();
      }
    }
    texture.refresh();
    return key;
  }

  spawnPlatform(x, y, width, fragile = false, safe = false) {
    const index = this.platforms ? this.platforms.getLength() : 0;
    const textureKey = this.createCliffPlatformTexture(width, fragile, index);
    const platform = this.physics.add.image(x, y, textureKey);
    platform.body.allowGravity = false;
    platform.setImmovable(true);
    platform.setDepth(4);
    platform.body.setSize(Math.max(40, width - 8), 48);
    platform.setData("width", width);
    platform.setData("fragile", fragile);
    platform.setData("safe", safe);
    this.platforms.add(platform);

    if (!safe && Phaser.Math.Between(0, 100) < 34) {
      const pasta = this.physics.add.image(x, y - 74, "collectible-pasta");
      pasta.setDisplaySize(42, 42);
      pasta.body.allowGravity = false;
      pasta.setDepth(6);
      this.collectibles.add(pasta);
    }
    return platform;
  }

  ensurePlatforms() {
    const children = this.platforms ? this.platforms.getChildren() : [];
    let rightEdge = children.length
      ? Math.max(...children.map((platform) => platform.x + platform.getData("width") / 2))
      : 330;
    const difficulty = Phaser.Math.Clamp(this.distance / this.goalDistance, 0, 1);
    while (rightEdge < GAME_WIDTH + 520) {
      const minGap = 58 + Math.floor(difficulty * 35);
      const maxGap = 96 + Math.floor(difficulty * 82);
      const minWidth = Math.max(112, 188 - Math.floor(difficulty * 62));
      const maxWidth = Math.max(minWidth + 34, 286 - Math.floor(difficulty * 78));
      const gap = Phaser.Math.Between(minGap, maxGap);
      const width = Phaser.Math.Between(minWidth, maxWidth);
      const riseOptions = difficulty < 0.3 ? [-34, -18, 0, 18] : [-58, -34, -16, 0, 22, 42];
      const y = Phaser.Math.Clamp(this.lastPlatformY + Phaser.Math.RND.pick(riseOptions), 330, 430);
      const x = rightEdge + gap + width / 2;
      const fragile = this.distance > 360 && Phaser.Math.Between(0, 100) < 12 + difficulty * 18;
      this.spawnPlatform(x, y, width, fragile, false);
      this.lastPlatformY = y;
      rightEdge = x + width / 2;
    }
  }

  landOnPlatform(player, platform) {
    if (!player.body.touching.down || !platform.body.touching.up) return;
    this.coyoteUntil = this.time.now + 135;
    if (!platform.getData("fragile") || platform.getData("crumbling")) return;
    platform.setData("crumbling", true);
    platform.setTint(0xffb36b);
    this.time.delayedCall(520, () => {
      if (!platform.active || this.finished) return;
      platform.body.enable = false;
      this.tweens.add({
        targets: platform,
        y: platform.y + 150,
        angle: Phaser.Math.Between(-12, 12),
        alpha: 0,
        duration: 430,
        onComplete: () => platform.destroy(),
      });
    });
  }

  collectPasta(_player, pasta) {
    pasta.destroy();
    this.distance = Math.min(this.goalDistance, this.distance + 32);
    this.flashCliffStatus("פסטה באוויר: +32 מטר");
    this.cameras.main.flash(90, 255, 230, 110, false);
  }

  flashCliffStatus(message, duration = 1200) {
    this.statusText = message;
    this.statusUntil = this.time.now + duration;
  }

  updateCliffHud() {
    const status = this.time.now < this.statusUntil
      ? this.statusText
      : "Space / חץ למעלה / W לקפיצה";
    setHud({
      mode: "תהום",
      score: `${Math.floor(this.distance)}מ׳ / ${this.goalDistance}מ׳`,
      lives: `חיים ${this.lives} | אזור ${this.zone}/5`,
      status,
    });
  }

  handleFall() {
    if (this.respawning || this.finished) return;
    this.lives -= 1;
    this.cameras.main.shake(220, 0.014);
    if (this.lives <= 0) {
      this.endCliffChallenge(false);
      return;
    }
    this.respawning = true;
    this.player.disableBody(true, true);
    this.flashCliffStatus(`נפלת! נשארו ${this.lives} חיים`, 1500);
    this.spawnPlatform(205, 430, 390, false, true);
    this.time.delayedCall(520, () => {
      if (this.finished) return;
      this.player.enableBody(true, 190, 300, true, true);
      this.player.setVelocity(0, 0);
      this.player.setAlpha(0.58);
      this.time.delayedCall(520, () => {
        if (this.player.active) this.player.setAlpha(1);
      });
      this.respawning = false;
    });
  }

  updateLandingShadow() {
    const platforms = this.platforms.getChildren()
      .filter((platform) => {
        const halfWidth = platform.getData("width") / 2;
        return platform.active
          && platform.body?.enable
          && this.player.x > platform.x - halfWidth
          && this.player.x < platform.x + halfWidth
          && platform.y > this.player.y;
      })
      .sort((a, b) => a.y - b.y);
    const target = platforms[0];
    if (!target || this.player.body.blocked.down) {
      this.landingShadow.setVisible(false);
      return;
    }
    const distance = Math.max(1, target.y - this.player.y);
    const scale = Phaser.Math.Clamp(1.2 - distance / 420, 0.45, 1.05);
    this.landingShadow.setVisible(true).setPosition(this.player.x, target.y - 31).setScale(scale, 0.7);
  }

  endCliffChallenge(won) {
    if (this.finished) return;
    this.finished = true;
    this.physics.pause();
    this.landingShadow.setVisible(false);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 620, 230, 0xffffff, 0.95)
      .setStrokeStyle(5, 0x171717)
      .setDepth(30);
    const winnerSprite = this.add.image(GAME_WIDTH / 2 - 210, GAME_HEIGHT / 2, `character-${this.selected.id}`).setDepth(32);
    fitCharacterSprite(winnerSprite, 150, 190);
    this.add.text(GAME_WIDTH / 2 + 75, GAME_HEIGHT / 2 - 62, won ? "חצית את התהום" : "התהום ניצחה הפעם", {
      fontFamily: "Arial",
      fontSize: "31px",
      fontStyle: "900",
      color: won ? "#087f5b" : "#c92a2a",
      align: "center",
    }).setOrigin(0.5).setDepth(32);
    this.add.text(GAME_WIDTH / 2 + 75, GAME_HEIGHT / 2 - 12, `${Math.floor(this.distance)} מטר עם ${this.selected.name}`, {
      fontFamily: "Arial",
      fontSize: "20px",
      fontStyle: "900",
      color: "#171717",
      align: "center",
    }).setOrigin(0.5).setDepth(32);
    this.add.text(GAME_WIDTH / 2 + 75, GAME_HEIGHT / 2 + 42, "לחץ R כדי להתחיל מחדש", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#303030",
    }).setOrigin(0.5).setDepth(32);
    if (won) {
      for (let i = 0; i < 38; i += 1) {
        const confetti = this.add.rectangle(GAME_WIDTH / 2, 120, 8, 13, Phaser.Math.RND.pick([0xffd447, 0xef4b3f, 0x00a99d, 0x7c5cff])).setDepth(31);
        this.tweens.add({
          targets: confetti,
          x: Phaser.Math.Between(120, 850),
          y: Phaser.Math.Between(360, 530),
          angle: Phaser.Math.Between(-280, 280),
          duration: Phaser.Math.Between(850, 1350),
        });
      }
    }
    setHud({
      mode: "תהום",
      score: `${Math.floor(this.distance)}מ׳ / ${this.goalDistance}מ׳`,
      lives: `חיים ${this.lives}`,
      status: won ? "ניצחת באתגר התהום" : "לחץ R לניסיון נוסף",
    });
  }

  update(time, delta) {
    if (this.finished) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.r)) startMode("cliff");
      return;
    }

    const keyboardJumpDown = Phaser.Input.Keyboard.JustDown(this.keys.space)
      || Phaser.Input.Keyboard.JustDown(this.keys.up)
      || Phaser.Input.Keyboard.JustDown(this.keys.w);
    const keyboardJumpHeld = this.keys.space.isDown || this.keys.up.isDown || this.keys.w.isDown;
    const keyboardJumpReleased = Phaser.Input.Keyboard.JustUp(this.keys.space)
      || Phaser.Input.Keyboard.JustUp(this.keys.up)
      || Phaser.Input.Keyboard.JustUp(this.keys.w);
    if (keyboardJumpDown || this.touch.jumpQueued) this.jumpBufferUntil = time + 145;
    this.touch.jumpQueued = false;

    if (this.waitingForStart) {
      this.platforms.getChildren().forEach((platform) => platform.setVelocityX(0));
      this.collectibles.getChildren().forEach((pasta) => pasta.setVelocityX(0));
      this.updateCliffHud();
      return;
    }

    if (this.respawning) {
      this.platforms.getChildren().forEach((platform) => platform.setVelocityX(0));
      this.collectibles.getChildren().forEach((pasta) => pasta.setVelocityX(0));
      this.updateCliffHud();
      return;
    }

    const grounded = this.player.body.blocked.down || this.player.body.touching.down;
    if (grounded) this.coyoteUntil = time + 135;
    if (time <= this.jumpBufferUntil && time <= this.coyoteUntil) {
      const jumpPower = 565 + this.selected.stats.jump * 72;
      this.player.setVelocityY(-jumpPower);
      this.jumpBufferUntil = 0;
      this.coyoteUntil = 0;
      this.flashCliffStatus("קפיצה", 420);
    }
    if ((keyboardJumpReleased || (!keyboardJumpHeld && !this.touch.jumpHeld)) && this.player.body.velocity.y < -260) {
      this.player.setVelocityY(this.player.body.velocity.y * 0.56);
    }

    const difficulty = Phaser.Math.Clamp(this.distance / this.goalDistance, 0, 1);
    const scrollSpeed = (178 + difficulty * 122) * (0.96 + this.selected.stats.speed * 0.04);
    this.platforms.getChildren().forEach((platform) => platform.setVelocityX(-scrollSpeed));
    this.collectibles.getChildren().forEach((pasta) => pasta.setVelocityX(-scrollSpeed));
    this.player.setVelocityX(Phaser.Math.Clamp((190 - this.player.x) * 5, -115, 115));
    if (this.player.body.velocity.y < -20) this.player.setAngle(-4);
    else if (this.player.body.velocity.y > 120) this.player.setAngle(5);
    else this.player.setAngle(0);

    this.distance = Math.min(this.goalDistance, this.distance + scrollSpeed * (delta / 1000) * 0.22);
    const nextZone = Math.min(5, Math.floor(this.distance / 200) + 1);
    if (nextZone > this.zone) {
      this.zone = nextZone;
      this.lives = Math.min(3, this.lives + 1);
      this.flashCliffStatus(`נקודת ביקורת: אזור ${this.zone}. החיים מולאו`, 1700);
      this.cameras.main.flash(140, 255, 230, 120, false);
    }

    this.platforms.getChildren().forEach((platform) => {
      if (platform.x + platform.getData("width") / 2 < -90) platform.destroy();
    });
    this.collectibles.getChildren().forEach((pasta) => {
      if (pasta.x < -70) pasta.destroy();
    });
    this.ensurePlatforms();
    this.updateLandingShadow();

    if (this.player.y > GAME_HEIGHT + 90 || this.player.x < -80) this.handleFall();
    if (this.distance >= this.goalDistance) this.endCliffChallenge(true);
    this.updateCliffHud();
  }
}

class LabScene extends Phaser.Scene {
  constructor() {
    super("LabScene");
  }

  create() {
    appState.mode = "lab";
    renderUI();
    this.creatureSprite = null;
    setHud({ mode: "מעבדה", score: appState.labHistory.length, lives: 3, status: "לחץ ערבוב" });
    createBackground(this, "lab");
    this.add.rectangle(GAME_WIDTH / 2, 250, 520, 250, 0xffffff, 0.35).setStrokeStyle(4, 0x171717);
    this.add.rectangle(GAME_WIDTH / 2, 382, 720, 118, 0xffffff).setStrokeStyle(4, 0x171717);
    for (let i = 0; i < 5; i += 1) {
      this.add.rectangle(704 + i * 32, 134, 18, 68, Phaser.Math.RND.pick([0xffd447, 0xef4b3f, 0x00a99d, 0x7c5cff]))
        .setStrokeStyle(3, 0x171717);
    }
    this.add.text(64, 72, "מעבדת ממים", {
      fontFamily: "Arial",
      fontSize: "42px",
      fontStyle: "900",
      color: "#171717",
    });
    this.add.text(66, 122, "מערבבים חיה, אוכל וכאוס לבריינרוט משפחתי חדש.", {
      fontFamily: "Arial",
      fontSize: "21px",
      color: "#303030",
    });
    this.nameText = this.add.text(GAME_WIDTH / 2, 360, "", {
      fontFamily: "Arial",
      fontSize: "28px",
      fontStyle: "900",
      color: "#171717",
    }).setOrigin(0.5);
    this.recipeText = this.add.text(GAME_WIDTH / 2, 402, "", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#303030",
    }).setOrigin(0.5);

    this.mixHandler = () => this.mixCreature();
    window.addEventListener("brainrot:lab-mix", this.mixHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener("brainrot:lab-mix", this.mixHandler);
    });

    this.keys = this.input.keyboard.addKeys({ space: "SPACE" });
    this.mixCreature();
  }

  mixCreature() {
    const animals = [
      { id: "Shark", label: "כריש" },
      { id: "Crocodile", label: "קרוקודיל" },
      { id: "Capybara", label: "קפיברה" },
      { id: "Gorilla", label: "גורילה" },
      { id: "Penguin", label: "פינגווין" },
      { id: "Lizard", label: "לטאה" },
    ];
    const foods = [
      { id: "Spaghetti", label: "ספגטי" },
      { id: "Cappuccino", label: "קפוצ׳ינו" },
      { id: "Cannoli", label: "קנולי" },
      { id: "Bananini", label: "בנניני" },
      { id: "Pizzetta", label: "פיצטה" },
      { id: "Gelato", label: "ג׳לאטו" },
    ];
    const chaos = [
      { id: "Turbo", label: "טורבו" },
      { id: "Ballet", label: "בלט" },
      { id: "Volante", label: "וולנטה" },
      { id: "Notturno", label: "נוטורנו" },
      { id: "Fortissimo", label: "פורטיסימו" },
      { id: "Sprintarelli", label: "ספרינטרלי" },
    ];
    const animal = Phaser.Math.RND.pick(animals);
    const food = Phaser.Math.RND.pick(foods);
    const trait = Phaser.Math.RND.pick(chaos);
    const name = `${animal.label}${food.label} ${trait.label}`;
    const recipe = `${animal.label} + ${food.label} + ${trait.label}`;
    const key = this.drawLabTexture(name, animal.id, food.id, trait.id);

    if (!this.creatureSprite) {
      this.creatureSprite = this.add.image(GAME_WIDTH / 2, 238, key).setScale(0.82);
    } else {
      this.creatureSprite.setTexture(key);
    }
    this.creatureSprite.setScale(0.82);
    this.creatureSprite.setAngle(0);
    this.tweens.add({
      targets: this.creatureSprite,
      angle: { from: -3, to: 3 },
      duration: 160,
      yoyo: true,
      repeat: 2,
    });
    this.nameText.setText(name);
    this.recipeText.setText(recipe);
    window.BrainrotUI.addLabCreature({ name, recipe });
    setHud({ mode: "מעבדה", score: appState.labHistory.length, lives: 3, status: name });
  }

  drawLabTexture(name, animal, food, trait) {
    const key = `lab-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const texture = this.textures.createCanvas(key, 360, 270);
    const ctx = texture.getSourceImage().getContext("2d");
    ctx.clearRect(0, 0, 360, 270);
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 5;
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.beginPath();
    ctx.ellipse(180, 226, 100, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    const bodyColor = trait === "Turbo" ? "#ef4b3f" : trait === "Ballet" ? "#f0c6d7" : trait === "Notturno" ? "#7c5cff" : "#00a99d";
    const foodColor = food === "Cappuccino" ? "#8c5a35" : food === "Bananini" ? "#ffd447" : food === "Gelato" ? "#f0c6d7" : "#ffffff";

    if (trait === "Turbo" || trait === "Sprintarelli") {
      ctx.fillStyle = "#ffd447";
      ctx.beginPath();
      ctx.moveTo(76, 152);
      ctx.lineTo(18, 132);
      ctx.lineTo(72, 118);
      ctx.lineTo(34, 86);
      ctx.lineTo(100, 110);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    if (trait === "Volante") {
      ctx.fillStyle = "#d9f7ff";
      ctx.beginPath();
      ctx.ellipse(101, 132, 55, 28, -0.5, 0, Math.PI * 2);
      ctx.ellipse(259, 132, 55, 28, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = bodyColor;
    if (animal === "Shark") {
      ctx.beginPath();
      ctx.ellipse(180, 132, 92, 48, -0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(91, 132);
      ctx.lineTo(48, 98);
      ctx.lineTo(54, 164);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(173, 88);
      ctx.lineTo(209, 43);
      ctx.lineTo(211, 103);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (animal === "Crocodile") {
      roundRect(ctx, 88, 96, 164, 74, 24);
      ctx.fill();
      ctx.stroke();
      roundRect(ctx, 232, 115, 82, 38, 18);
      ctx.fill();
      ctx.stroke();
    } else if (animal === "Penguin") {
      ctx.beginPath();
      ctx.ellipse(180, 135, 66, 78, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(180, 151, 42, 49, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (animal === "Gorilla") {
      ctx.beginPath();
      ctx.ellipse(180, 131, 78, 61, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(104, 139, 34, 42, -0.3, 0, Math.PI * 2);
      ctx.ellipse(256, 139, 34, 42, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      roundRect(ctx, 112, 88, 136, 96, 34);
      ctx.fill();
      ctx.stroke();
      if (animal === "Lizard") {
        ctx.beginPath();
        ctx.moveTo(113, 152);
        ctx.lineTo(38, 177);
        ctx.lineTo(110, 179);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      if (animal === "Capybara") {
        ctx.fillStyle = "#bd8451";
        ctx.beginPath();
        ctx.arc(130, 88, 16, 0, Math.PI * 2);
        ctx.arc(230, 88, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    }

    ctx.fillStyle = foodColor;
    ctx.beginPath();
    ctx.ellipse(180, 120, 48, 29, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(162, 111, 8, 0, Math.PI * 2);
    ctx.arc(198, 111, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171717";
    ctx.beginPath();
    ctx.arc(164, 111, 3, 0, Math.PI * 2);
    ctx.arc(200, 111, 3, 0, Math.PI * 2);
    ctx.fill();

    if (food === "Spaghetti") {
      ctx.strokeStyle = "#ffd447";
      ctx.lineWidth = 5;
      for (let i = 0; i < 8; i += 1) {
        ctx.beginPath();
        ctx.moveTo(139 + i * 12, 72);
        ctx.quadraticCurveTo(132 + i * 11, 95, 154 + i * 8, 119);
        ctx.stroke();
      }
    } else if (food === "Cappuccino") {
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, 151, 57, 58, 35, 12);
      ctx.fill();
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = 4;
      ctx.stroke();
      drawText(ctx, "CAF", 180, 75, 13, "#8c5a35");
    } else if (food === "Cannoli") {
      ctx.fillStyle = "#d89a4a";
      roundRect(ctx, 117, 74, 126, 22, 11);
      ctx.fill();
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = 4;
      ctx.stroke();
    } else if (food === "Pizzetta") {
      ctx.fillStyle = "#ffd447";
      ctx.beginPath();
      ctx.moveTo(180, 52);
      ctx.lineTo(232, 99);
      ctx.lineTo(128, 99);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = "#ef4b3f";
      ctx.beginPath();
      ctx.arc(180, 82, 7, 0, Math.PI * 2);
      ctx.arc(204, 91, 6, 0, Math.PI * 2);
      ctx.arc(155, 91, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (food === "Gelato") {
      ctx.fillStyle = "#f0c6d7";
      ctx.beginPath();
      ctx.arc(180, 69, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(120, 157);
    ctx.lineTo(68, 132);
    ctx.moveTo(240, 157);
    ctx.lineTo(292, 132);
    ctx.moveTo(150, 183);
    ctx.lineTo(130, 215);
    ctx.moveTo(210, 183);
    ctx.lineTo(230, 215);
    ctx.stroke();
    drawShoe(ctx, 130, 219, 0.62);
    drawShoe(ctx, 230, 219, 0.62);

    if (trait === "Ballet") {
      ctx.fillStyle = "#7c5cff";
      ctx.beginPath();
      ctx.moveTo(106, 177);
      ctx.lineTo(254, 177);
      ctx.lineTo(210, 150);
      ctx.lineTo(150, 150);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (trait === "Fortissimo") {
      ctx.strokeStyle = "#171717";
      ctx.lineWidth = 4;
      [42, 64, 296, 318].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, 112, 24, -0.9, 0.9);
        ctx.stroke();
      });
      drawText(ctx, "!!!", 180, 38, 24, "#ef4b3f");
    } else if (trait === "Notturno") {
      ctx.fillStyle = "#ffd447";
      ctx.beginPath();
      ctx.arc(283, 54, 22, 0, Math.PI * 2);
      ctx.arc(292, 49, 22, 0, Math.PI * 2);
      ctx.fill("evenodd");
    }

    ctx.fillStyle = "#fffdf7";
    roundRect(ctx, 65, 13, 230, 33, 12);
    ctx.fill();
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 4;
    ctx.stroke();
    drawText(ctx, name.slice(0, 22), 180, 31, 15, "#171717");
    drawText(ctx, animal[0], 68, 132, 22, "#ffffff");
    drawText(ctx, food[0], 292, 132, 22, "#ffffff");
    texture.refresh();
    return key;
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keys.space)) this.mixCreature();
  }
}

class BattleScene extends Phaser.Scene {
  constructor() {
    super("BattleScene");
  }

  init(data) {
    this.selected = getCharacter(data.selectedId);
    const opponents = CHARACTERS.filter((character) => character.id !== this.selected.id);
    this.enemyCharacter = Phaser.Math.RND.pick(opponents);
  }

  create() {
    appState.mode = "battle";
    renderUI();
    createBackground(this, "battle");
    this.physics.world.gravity.y = 1300;
    this.ground = createGround(this);
    this.playerHp = 100;
    this.enemyHp = 100;
    this.finished = false;
    this.playerStunnedUntil = 0;
    this.enemyStunnedUntil = 0;
    this.playerSlowedUntil = 0;
    this.enemySlowedUntil = 0;
    this.playerInvulnerableUntil = 0;
    this.enemyInvulnerableUntil = 0;
    this.playerFocus = 30;
    this.enemyFocus = 30;
    this.playerMeleeCooldown = 0;
    this.enemyMeleeCooldown = 0;
    this.playerDodgeCooldown = 0;
    this.enemyDodgeCooldown = 0;
    this.playerGuarding = false;
    this.enemyGuarding = false;
    this.touch = {
      left: false,
      right: false,
      guard: false,
      jumpQueued: false,
      meleeQueued: false,
      specialQueued: false,
      dodgeQueued: false,
    };
    this.playerCooldown = 0;
    this.enemyCooldown = Number.POSITIVE_INFINITY;
    this.time.delayedCall(1400, () => {
      this.enemyCooldown = this.time.now;
    });

    this.player = this.physics.add.sprite(190, 280, `character-${this.selected.id}`);
    fitCharacterSprite(this.player, 120, 155);
    this.player.setCollideWorldBounds(true);
    fitCharacterBody(this.player);

    this.enemy = this.physics.add.sprite(760, 280, `character-${this.enemyCharacter.id}`);
    fitCharacterSprite(this.enemy, 120, 155);
    this.enemy.setFlipX(true);
    this.enemy.setCollideWorldBounds(true);
    fitCharacterBody(this.enemy);

    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.enemy, this.ground);
    this.platforms = this.physics.add.staticGroup();
    this.addBattlePlatform(300, 332, 176, 20);
    this.addBattlePlatform(660, 332, 176, 20);
    this.addBattlePlatform(480, 252, 160, 18);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemy, this.platforms);
    this.physics.add.collider(this.player, this.enemy);

    this.projectiles = this.physics.add.group();
    this.physics.add.overlap(this.projectiles, this.player, this.projectileHitPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemy, this.projectileHitEnemy, null, this);

    this.keys = this.input.keyboard.addKeys({
      left: "LEFT",
      right: "RIGHT",
      down: "DOWN",
      up: "UP",
      a: "A",
      d: "D",
      s: "S",
      w: "W",
      space: "SPACE",
      f: "F",
      j: "J",
      e: "E",
      k: "K",
      shift: "SHIFT",
      r: "R",
    });

    this.touchHandler = (event) => {
      const { action, pressed } = event.detail;
      if (action === "left" || action === "right") this.touch[action] = pressed;
      if (action === "duck") this.touch.guard = pressed;
      if (action === "jump" && pressed) this.touch.jumpQueued = true;
      if (action === "attack" && pressed) this.touch.meleeQueued = true;
      if (action === "special" && pressed) this.touch.specialQueued = true;
      if (action === "dodge" && pressed) this.touch.dodgeQueued = true;
    };
    window.addEventListener("brainrot:touch", this.touchHandler);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener("brainrot:touch", this.touchHandler);
    });

    this.add.text(52, 70, this.selected.name, {
      fontFamily: "Arial",
      fontSize: "22px",
      fontStyle: "900",
      color: "#171717",
    });
    this.add.text(908, 70, this.enemyCharacter.name, {
      fontFamily: "Arial",
      fontSize: "22px",
      fontStyle: "900",
      color: "#171717",
    }).setOrigin(1, 0);
    this.add.rectangle(GAME_WIDTH / 2, 176, 500, 38, 0xffffff, 0.86)
      .setStrokeStyle(3, 0x171717)
      .setDepth(2);
    this.add.text(GAME_WIDTH / 2, 176, "מכה = קרוב | יכולת = מרחוק | הגנה = פחות נזק | התחמקות = לברוח", {
      fontFamily: "Arial",
      fontSize: "16px",
      fontStyle: "900",
      color: "#171717",
      align: "center",
    }).setOrigin(0.5).setDepth(3);

    this.drawBattleHud();
    this.playerGuardBubble = this.add.ellipse(this.player.x, this.player.y, 112, 136, 0x8ce99a, 0.24)
      .setStrokeStyle(4, 0x171717, 0.65)
      .setVisible(false)
      .setDepth(5);
    this.enemyGuardBubble = this.add.ellipse(this.enemy.x, this.enemy.y, 112, 136, 0xffd447, 0.22)
      .setStrokeStyle(4, 0x171717, 0.65)
      .setVisible(false)
      .setDepth(5);
    this.updateBattleHud("מכה מקרוב, יכולת מרחוק, הגנה סופגת, התחמקות בורחת מפגיעה");
  }

  addBattlePlatform(x, y, w, h) {
    const shadow = this.add.rectangle(x + 5, y + 6, w, h, 0x000000, 0.2).setDepth(-3);
    const platform = this.add.rectangle(x, y, w, h, 0xfff4d6).setStrokeStyle(4, 0x171717).setDepth(-2);
    this.add.rectangle(x, y - 4, w - 18, 5, 0xffffff, 0.6).setDepth(-1);
    this.physics.add.existing(platform, true);
    this.platforms.add(platform);
    return { platform, shadow };
  }

  drawBattleHud() {
    this.add.rectangle(151, 113, 202, 22, 0xffffff).setStrokeStyle(3, 0x171717);
    this.add.rectangle(809, 113, 202, 22, 0xffffff).setStrokeStyle(3, 0x171717);
    this.playerHpFill = this.add.rectangle(52, 113, 198, 18, 0x00a99d).setOrigin(0, 0.5);
    this.enemyHpFill = this.add.rectangle(710, 113, 198, 18, 0xef4b3f).setOrigin(0, 0.5);
    this.add.rectangle(151, 143, 202, 16, 0xffffff).setStrokeStyle(3, 0x171717);
    this.add.rectangle(809, 143, 202, 16, 0xffffff).setStrokeStyle(3, 0x171717);
    this.playerFocusFill = this.add.rectangle(52, 143, 198, 12, 0xffd447).setOrigin(0, 0.5);
    this.enemyFocusFill = this.add.rectangle(710, 143, 198, 12, 0xffd447).setOrigin(0, 0.5);
    this.playerAbilityText = this.add.text(52, 132, this.selected.ability.name, {
      fontFamily: "Arial",
      fontSize: "13px",
      fontStyle: "900",
      color: "#171717",
    });
    this.enemyAbilityText = this.add.text(908, 132, this.enemyCharacter.ability.name, {
      fontFamily: "Arial",
      fontSize: "13px",
      fontStyle: "900",
      color: "#171717",
    }).setOrigin(1, 0);
  }

  updateBattleHud(status) {
    this.refreshBattleMeters();
    setHud({
      mode: "קרב",
      score: `פוקוס ${Math.floor(this.playerFocus)} | E מכה | F יכולת | Shift התחמקות`,
      playerHp: this.playerHp,
      enemyHp: this.enemyHp,
      status,
    });
  }

  refreshBattleMeters() {
    this.playerHpFill.width = Math.max(0, 198 * (this.playerHp / 100));
    this.enemyHpFill.width = Math.max(0, 198 * (this.enemyHp / 100));
    this.playerFocusFill.width = Math.max(0, 198 * (this.playerFocus / 100));
    this.enemyFocusFill.width = Math.max(0, 198 * (this.enemyFocus / 100));
  }

  projectileHitPlayer(projectile) {
    if (projectile.getData("owner") !== "enemy" || projectile.getData("spent") || this.finished) return;
    projectile.setData("spent", true);
    projectile.destroy();
    this.applyAbilityHit("enemy");
  }

  projectileHitEnemy(projectile) {
    if (projectile.getData("owner") !== "player" || projectile.getData("spent") || this.finished) return;
    projectile.setData("spent", true);
    projectile.destroy();
    this.applyAbilityHit("player");
  }

  applyAbilityHit(owner) {
    const isPlayer = owner === "player";
    const attacker = isPlayer ? this.selected : this.enemyCharacter;
    const targetSprite = isPlayer ? this.enemy : this.player;
    const ability = attacker.ability;
    const invulnerableUntil = isPlayer ? this.enemyInvulnerableUntil : this.playerInvulnerableUntil;
    if (this.time.now < invulnerableUntil) {
      this.updateBattleHud(`${isPlayer ? this.enemyCharacter.name : this.selected.name} התחמק מהיכולת`);
      return;
    }

    const guarded = isPlayer ? this.enemyGuarding : this.playerGuarding;
    const baseDamage = Math.round(ability.damage * attacker.stats.power);
    const damage = guarded ? Math.max(2, Math.round(baseDamage * 0.35)) : baseDamage;

    if (isPlayer) this.enemyHp = Phaser.Math.Clamp(this.enemyHp - damage, 0, 100);
    else this.playerHp = Phaser.Math.Clamp(this.playerHp - damage, 0, 100);
    if (isPlayer) {
      this.playerFocus = Phaser.Math.Clamp(this.playerFocus + 10, 0, 100);
      if (guarded) this.enemyFocus = Phaser.Math.Clamp(this.enemyFocus + 14, 0, 100);
    } else {
      this.enemyFocus = Phaser.Math.Clamp(this.enemyFocus + 10, 0, 100);
      if (guarded) this.playerFocus = Phaser.Math.Clamp(this.playerFocus + 14, 0, 100);
    }

    targetSprite.setTint(guarded ? 0x8ce99a : ability.effect === "stun" ? 0xffd447 : 0xff5a4f);
    this.time.delayedCall(140, () => targetSprite.clearTint());
    this.showHitBurst(targetSprite.x, targetSprite.y - 42, guarded ? 0x8ce99a : Phaser.Display.Color.HexStringToColor(attacker.accent).color);

    if (ability.effect === "heal" && !guarded) {
      if (isPlayer) this.playerHp = Phaser.Math.Clamp(this.playerHp + 5, 0, 100);
      else this.enemyHp = Phaser.Math.Clamp(this.enemyHp + 5, 0, 100);
    }
    if (ability.effect === "stun" && !guarded) {
      if (isPlayer) this.enemyStunnedUntil = this.time.now + 850;
      else this.playerStunnedUntil = this.time.now + 850;
    }
    if (ability.effect === "slow" && !guarded) {
      if (isPlayer) this.enemySlowedUntil = this.time.now + 1200;
      else this.playerSlowedUntil = this.time.now + 1200;
    }
    if (ability.effect === "boom") {
      this.cameras.main.shake(140, 0.012);
    } else {
      this.cameras.main.shake(70, 0.005);
    }

    this.updateBattleHud(guarded ? `${ability.status} נחסם חלקית (-${damage})` : `${attacker.name}: ${ability.status} (-${damage})`);
    this.checkWinner();
  }

  showHitBurst(x, y, color) {
    for (let i = 0; i < 9; i += 1) {
      const shard = this.add.rectangle(x, y, 8, 8, color).setStrokeStyle(2, 0x171717).setDepth(12);
      this.tweens.add({
        targets: shard,
        x: x + Phaser.Math.Between(-58, 58),
        y: y + Phaser.Math.Between(-50, 22),
        angle: Phaser.Math.Between(-180, 180),
        alpha: 0,
        duration: 360,
        ease: "Cubic.easeOut",
        onComplete: () => shard.destroy(),
      });
    }
  }

  meleeAttack(owner) {
    const isPlayer = owner === "player";
    const source = isPlayer ? this.player : this.enemy;
    const target = isPlayer ? this.enemy : this.player;
    const attacker = isPlayer ? this.selected : this.enemyCharacter;
    const targetInvulnerable = isPlayer ? this.enemyInvulnerableUntil : this.playerInvulnerableUntil;
    const direction = target.x > source.x ? 1 : -1;
    const slash = this.add.arc(source.x + direction * 58, source.y - 24, 58, -58, 58, false, Phaser.Display.Color.HexStringToColor(attacker.accent).color, 0.42)
      .setStrokeStyle(6, 0x171717, 0.55)
      .setDepth(11);
    this.tweens.add({ targets: slash, alpha: 0, scale: 1.35, duration: 220, onComplete: () => slash.destroy() });

    const closeEnough = Math.abs(source.x - target.x) < 150 && Math.abs(source.y - target.y) < 112;
    if (!closeEnough) {
      this.updateBattleHud(`${attacker.name} פספס מכה קרובה`);
      return;
    }
    if (this.time.now < targetInvulnerable) {
      this.updateBattleHud(`${isPlayer ? this.enemyCharacter.name : this.selected.name} התחמק מהמכה`);
      return;
    }

    const guarded = isPlayer ? this.enemyGuarding : this.playerGuarding;
    const baseDamage = Math.round((7 + attacker.stats.power * 5) * (guarded ? 0.45 : 1));
    if (isPlayer) {
      this.enemyHp = Phaser.Math.Clamp(this.enemyHp - baseDamage, 0, 100);
      this.playerFocus = Phaser.Math.Clamp(this.playerFocus + 16, 0, 100);
      if (guarded) this.enemyFocus = Phaser.Math.Clamp(this.enemyFocus + 10, 0, 100);
    } else {
      this.playerHp = Phaser.Math.Clamp(this.playerHp - baseDamage, 0, 100);
      this.enemyFocus = Phaser.Math.Clamp(this.enemyFocus + 16, 0, 100);
      if (guarded) this.playerFocus = Phaser.Math.Clamp(this.playerFocus + 10, 0, 100);
    }
    target.setVelocityX(direction * 210);
    target.setTint(guarded ? 0x8ce99a : 0xfff0a3);
    this.time.delayedCall(120, () => target.clearTint());
    this.showHitBurst(target.x, target.y - 34, guarded ? 0x8ce99a : 0xffd447);
    this.updateBattleHud(guarded ? `מכה קרובה נחסמה חלקית (-${baseDamage})` : `${attacker.name} פגע במכה קרובה (-${baseDamage})`);
    this.checkWinner();
  }

  dodge(owner) {
    const isPlayer = owner === "player";
    const sprite = isPlayer ? this.player : this.enemy;
    const target = isPlayer ? this.enemy : this.player;
    const direction = sprite.x < target.x ? -1 : 1;
    if (isPlayer) {
      this.playerInvulnerableUntil = this.time.now + 360;
      this.playerFocus = Phaser.Math.Clamp(this.playerFocus - 8, 0, 100);
    } else {
      this.enemyInvulnerableUntil = this.time.now + 360;
      this.enemyFocus = Phaser.Math.Clamp(this.enemyFocus - 8, 0, 100);
    }
    sprite.setVelocityX(direction * 460);
    sprite.setTint(0xffffff);
    this.time.delayedCall(180, () => sprite.clearTint());
    this.updateBattleHud(`${isPlayer ? this.selected.name : this.enemyCharacter.name} התחמק לאחור`);
  }

  fireProjectile(owner) {
    const isPlayer = owner === "player";
    const source = isPlayer ? this.player : this.enemy;
    const target = isPlayer ? this.enemy : this.player;
    const attacker = isPlayer ? this.selected : this.enemyCharacter;
    const ability = attacker.ability;
    if (isPlayer) this.playerFocus = Phaser.Math.Clamp(this.playerFocus - 18, 0, 100);
    else this.enemyFocus = Phaser.Math.Clamp(this.enemyFocus - 18, 0, 100);
    const direction = target.x > source.x ? 1 : -1;
    const key = isPlayer ? "projectile-player" : "projectile-enemy";
    const projectile = this.physics.add.image(source.x + direction * 58, source.y - 2, key);
    projectile.setData("owner", owner);
    projectile.setTint(Phaser.Display.Color.HexStringToColor(attacker.accent).color);
    projectile.setVelocityX(direction * (520 + attacker.stats.speed * 85));
    projectile.body.allowGravity = false;
    projectile.body.setSize(42, 28);
    projectile.setFlipX(direction < 0);
    this.projectiles.add(projectile);
    if (ability.effect === "dash") {
      source.setVelocityX(direction * 220);
    }
    if (isPlayer) {
      this.enemyCooldown = Math.max(this.enemyCooldown, this.time.now + 720);
    }
    this.updateBattleHud(`${attacker.name} מפעיל ${ability.name}`);
  }

  checkWinner() {
    if (this.playerHp > 0 && this.enemyHp > 0) return;
    this.finished = true;
    this.physics.pause();
    const playerWon = this.playerHp > 0;
    this.showVictoryCeremony(playerWon);
  }

  showVictoryCeremony(playerWon) {
    const winner = playerWon ? this.selected : this.enemyCharacter;
    const winnerTexture = `character-${winner.id}`;
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x171717, 0.44);
    const spotlight = this.add.circle(GAME_WIDTH / 2, 270, 128, 0xfff4b8, 0.74);
    const winnerSprite = this.add.image(GAME_WIDTH / 2, 262, winnerTexture);
    fitCharacterSprite(winnerSprite, 190, 260);
    const winnerScale = winnerSprite.scaleX;
    this.tweens.add({
      targets: winnerSprite,
      y: 235,
      scaleX: winnerScale * 1.12,
      scaleY: winnerScale * 1.12,
      duration: 420,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.tweens.add({
      targets: spotlight,
      alpha: 0.45,
      duration: 520,
      yoyo: true,
      repeat: -1,
    });
    for (let i = 0; i < 52; i += 1) {
      const confetti = this.add.rectangle(Phaser.Math.Between(120, 840), Phaser.Math.Between(70, 170), 8, 14, Phaser.Math.RND.pick([0xffd447, 0xef4b3f, 0x00a99d, 0x7c5cff]));
      this.tweens.add({
        targets: confetti,
        y: Phaser.Math.Between(380, 520),
        x: confetti.x + Phaser.Math.Between(-90, 90),
        angle: Phaser.Math.Between(-360, 360),
        duration: Phaser.Math.Between(900, 1500),
        repeat: -1,
      });
    }
    this.add.rectangle(GAME_WIDTH / 2, 398, 590, 144, 0xffffff, 0.94)
      .setStrokeStyle(4, 0x171717);
    this.add.text(GAME_WIDTH / 2, 360, playerWon ? "טקס ניצחון" : "טקס ניצחון ליריב", {
      fontFamily: "Arial",
      fontSize: "34px",
      fontStyle: "900",
      color: "#171717",
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, 401, `${winner.name} מנצח עם ${winner.ability.name}`, {
      fontFamily: "Arial",
      fontSize: "17px",
      fontStyle: "900",
      color: "#303030",
      align: "center",
      wordWrap: { width: 520, useAdvancedWrap: true },
    }).setOrigin(0.5);
    this.add.text(GAME_WIDTH / 2, 440, "לחץ R כדי להתחיל קרב מחדש", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#303030",
    }).setOrigin(0.5);
    this.updateBattleHud(playerWon ? "ניצחת בקרב" : "היריב ניצח בקרב");
  }

  update(time, delta) {
    if (this.finished) {
      if (Phaser.Input.Keyboard.JustDown(this.keys.r)) startMode("battle");
      return;
    }

    const movingLeft = this.keys.left.isDown || this.keys.a.isDown || this.touch.left;
    const movingRight = this.keys.right.isDown || this.keys.d.isDown || this.touch.right;
    const guardPressed = this.keys.down.isDown || this.keys.s.isDown || this.touch.guard;
    const jumpPressed =
      Phaser.Input.Keyboard.JustDown(this.keys.up) ||
      Phaser.Input.Keyboard.JustDown(this.keys.w) ||
      Phaser.Input.Keyboard.JustDown(this.keys.space) ||
      this.touch.jumpQueued;
    const keyboardAbilityPressed = Phaser.Input.Keyboard.JustDown(this.keys.f) || Phaser.Input.Keyboard.JustDown(this.keys.j);
    const keyboardMeleePressed = Phaser.Input.Keyboard.JustDown(this.keys.e) || Phaser.Input.Keyboard.JustDown(this.keys.k);
    const dodgePressed = Phaser.Input.Keyboard.JustDown(this.keys.shift) || this.touch.dodgeQueued;
    const distance = this.player.x - this.enemy.x;
    const meleePressed = keyboardMeleePressed || this.touch.meleeQueued;
    const abilityPressed = keyboardAbilityPressed || this.touch.specialQueued;
    this.touch.jumpQueued = false;
    this.touch.meleeQueued = false;
    this.touch.specialQueued = false;
    this.touch.dodgeQueued = false;

    const playerStunned = time < this.playerStunnedUntil;
    const enemyStunned = time < this.enemyStunnedUntil;
    const playerSlow = time < this.playerSlowedUntil ? 0.48 : 1;
    const enemySlow = time < this.enemySlowedUntil ? 0.48 : 1;
    this.playerFocus = Phaser.Math.Clamp(this.playerFocus + (guardPressed ? 7 : 3) * (delta / 1000), 0, 100);
    this.enemyFocus = Phaser.Math.Clamp(this.enemyFocus + (this.enemyGuarding ? 7 : 3) * (delta / 1000), 0, 100);
    this.playerGuarding = guardPressed && !playerStunned && this.player.body.blocked.down;
    if (!this.enemyNextDecisionAt || time > this.enemyNextDecisionAt) {
      this.enemyDecision = Phaser.Math.RND.pick(["advance", "advance", "guard", "ability", "dodge"]);
      this.enemyNextDecisionAt = time + Phaser.Math.Between(520, 940);
    }
    this.enemyGuarding = !enemyStunned && this.enemyDecision === "guard" && Math.abs(distance) < 310 && this.enemy.body.blocked.down;

    const moveSpeed = 245 * this.selected.stats.speed * playerSlow * (this.playerGuarding ? 0.42 : 1);
    if (playerStunned) this.player.setVelocityX(0);
    else if (this.playerGuarding) this.player.setVelocityX(0);
    else if (movingLeft) this.player.setVelocityX(-moveSpeed);
    else if (movingRight) this.player.setVelocityX(moveSpeed);
    else this.player.setVelocityX(0);

    if (!playerStunned && !this.playerGuarding && jumpPressed && this.player.body.blocked.down) {
      this.player.setVelocityY(-560 * this.selected.stats.jump);
    }

    if (!playerStunned && dodgePressed && time > this.playerDodgeCooldown && this.playerFocus >= 8) {
      this.playerDodgeCooldown = time + 900;
      this.dodge("player");
    }

    if (!playerStunned && meleePressed && time > this.playerMeleeCooldown) {
      this.playerMeleeCooldown = time + 460;
      this.meleeAttack("player");
    }

    if (!playerStunned && abilityPressed && time > this.playerCooldown && this.playerFocus >= 18) {
      this.playerCooldown = time + this.selected.ability.cooldown;
      this.fireProjectile("player");
    } else if (!playerStunned && abilityPressed && this.playerFocus < 18) {
      this.updateBattleHud("צריך עוד פוקוס ליכולת: הגן או פגע במכה קרובה");
    } else if (playerStunned && (abilityPressed || meleePressed)) {
      this.updateBattleHud("אתה המום: חכה שהקצב ייגמר");
    }

    const enemySpeed = 178 * this.enemyCharacter.stats.speed * enemySlow;
    if (enemyStunned) this.enemy.setVelocityX(0);
    else if (this.enemyGuarding) this.enemy.setVelocityX(0);
    else if (Math.abs(distance) < 96 && time > this.enemyDodgeCooldown && this.enemyFocus >= 8) {
      this.enemyDodgeCooldown = time + Phaser.Math.Between(900, 1300);
      this.dodge("enemy");
    } else if (Math.abs(distance) > 210) this.enemy.setVelocityX(Math.sign(distance) * enemySpeed);
    else if (Math.abs(distance) < 118) this.enemy.setVelocityX(-Math.sign(distance) * enemySpeed * 0.62);
    else this.enemy.setVelocityX(0);

    if (!enemyStunned && Math.abs(distance) < 150 && time > this.enemyMeleeCooldown) {
      this.enemyMeleeCooldown = time + Phaser.Math.Between(640, 980);
      this.meleeAttack("enemy");
    }

    if (!enemyStunned && Math.abs(distance) < 560 && time > this.enemyCooldown && this.enemyFocus >= 18 && this.enemyDecision !== "guard") {
      this.enemyCooldown = time + this.enemyCharacter.ability.cooldown + Phaser.Math.Between(380, 760);
      this.fireProjectile("enemy");
    }

    this.player.setFlipX(this.enemy.x < this.player.x);
    this.enemy.setFlipX(this.player.x < this.enemy.x);
    this.playerGuardBubble.setPosition(this.player.x, this.player.y - 16).setVisible(this.playerGuarding);
    this.enemyGuardBubble.setPosition(this.enemy.x, this.enemy.y - 16).setVisible(this.enemyGuarding);
    this.player.setAlpha(time < this.playerInvulnerableUntil ? 0.62 : 1);
    this.enemy.setAlpha(time < this.enemyInvulnerableUntil ? 0.62 : 1);

    this.projectiles.getChildren().forEach((projectile) => {
      if (projectile.getData("owner") === "player") {
        const closeToEnemy = Phaser.Math.Distance.Between(projectile.x, projectile.y, this.enemy.x, this.enemy.y) < 95;
        if (closeToEnemy) this.projectileHitEnemy(projectile);
      } else if (projectile.getData("owner") === "enemy") {
        const closeToPlayer = Phaser.Math.Distance.Between(projectile.x, projectile.y, this.player.x, this.player.y) < 95;
        if (closeToPlayer) this.projectileHitPlayer(projectile);
      }
      if (projectile.x < -70 || projectile.x > GAME_WIDTH + 70) projectile.destroy();
    });
    this.refreshBattleMeters();
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game-root",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#aee8ff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1200 },
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, RunnerScene, CliffScene, LabScene, BattleScene],
};

renderUI();
const game = new Phaser.Game(config);
