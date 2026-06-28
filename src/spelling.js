const CHARACTERS = [
  {
    id: "tralalero",
    english: "Tralalero Tralala",
    hebrew: "טרללרו טרללה",
    avatar: "assets/characters/tralalero.png",
    finalReward: "הכריש שוחה על גל גדול עם נעלי נייק.",
    finalAction: "שחייה על גל",
    words: ["כריש", "נעל", "נייק", "ים", "סנפיר", "גל"],
  },
  {
    id: "bombardiro",
    english: "Bombardiro Crocodilo",
    hebrew: "בומברדירו קרוקודילו",
    avatar: "assets/characters/bombardiro.png",
    finalReward: "התנין-מטוס מפיל פצצות ניצחון בשמיים.",
    finalAction: "הטלת פצצות",
    words: ["תנין", "מטוס", "טיל", "פצצה", "כנף", "מנוע"],
  },
  {
    id: "ballerina",
    english: "Ballerina Cappuccina",
    hebrew: "בלרינה קפוצ'ינה",
    avatar: "assets/characters/ballerina.png",
    finalReward: "הבלרינה מסתובבת בתוך קצף קפוצ'ינו נוצץ.",
    finalAction: "סיבוב בלט",
    words: ["בלרינה", "קפה", "קפוצינו", "ספל", "טוטו", "בלט"],
  },
  {
    id: "tung",
    english: "Tung Tung Tung Sahur",
    hebrew: "טונג טונג טונג סהור",
    avatar: "assets/characters/tung.png",
    finalReward: "תוף העץ מנופף במקל ומקפיץ את כל הבמה.",
    finalAction: "נפנוף במקל",
    words: ["עץ", "תוף", "מקל", "קצב", "לילה", "מכה"],
  },
  {
    id: "chimpanzini",
    english: "Chimpanzini Bananini",
    hebrew: "שימפנזיני בנניני",
    avatar: "assets/characters/chimpanzini.png",
    finalReward: "השימפנזה מדלג בין ענפי עצים ומפיל בננות.",
    finalAction: "דילוג על ענפים",
    words: ["שימפנזה", "בננה", "ג'ונגל", "קליפה", "עלים", "קפיצה"],
  },
  {
    id: "lirili",
    english: "Lirili Larila",
    hebrew: "לירילי לרילה",
    avatar: "assets/characters/lirili.png",
    finalReward: "לירילי רץ במדבר ומשאיר שובל אבק נוצץ.",
    finalAction: "ריצת מדבר",
    words: ["פיל", "קקטוס", "כפכף", "מדבר", "חול", "קוצים"],
  },
  {
    id: "cocofanto",
    english: "Cocofanto Elefanto",
    hebrew: "קוקופנטו אלפנטו",
    avatar: "assets/characters/cocofanto.png",
    finalReward: "פיל הקוקוס מרים את החדק ומשפריץ מים.",
    finalAction: "הרמת חדק",
    words: ["פיל", "קוקוס", "חדק", "אגוז", "קליפה", "עלה"],
  },
  {
    id: "trenostruzzo",
    english: "Trenostruzzo Turbo 3000",
    hebrew: "טרנוסטרוצו טורבו 3000",
    avatar: "assets/characters/trenostruzzo.png",
    finalReward: "היען-קטר נוסע על הפסים בטורבו 3000.",
    finalAction: "נסיעה על המסילה",
    words: ["יען", "רכבת", "טורבו", "קטר", "מסילה", "מנוע"],
  },
];

const LETTERS = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ך", "ל", "מ", "ם", "נ", "ן", "ס", "ע", "פ", "ף", "צ", "ץ", "ק", "ר", "ש", "ת"];
const KEYBOARD_MAP = {
  t: "א",
  c: "ב",
  d: "ג",
  s: "ד",
  v: "ה",
  u: "ו",
  z: "ז",
  j: "ח",
  y: "ט",
  h: "י",
  f: "כ",
  l: "ך",
  k: "ל",
  n: "מ",
  o: "ם",
  b: "נ",
  i: "ן",
  x: "ס",
  g: "ע",
  p: "פ",
  ";": "ף",
  m: "צ",
  ".": "ץ",
  e: "ק",
  r: "ר",
  a: "ש",
  ",": "ת",
};
const MAX_MISTAKES = 6;
const COMPONENT_VISUALS = {
  "כריש": { theme: "sea", icons: ["🦈", "🌊", "🫧"] },
  "נעל": { theme: "street", icons: ["👟", "🏃", "✨"] },
  "נייק": { theme: "street", icons: ["👟", "⚡", "🏁"] },
  "ים": { theme: "sea", icons: ["🌊", "🐚", "☀️"] },
  "סנפיר": { theme: "sea", icons: ["🐟", "🦈", "🌊"] },
  "גל": { theme: "sea", icons: ["🌊", "🏄", "🫧"] },
  "תנין": { theme: "jungle", icons: ["🐊", "🌿", "💧"] },
  "מטוס": { theme: "sky", icons: ["✈️", "☁️", "🛫"] },
  "טיל": { theme: "sky", icons: ["🚀", "🔥", "☁️"] },
  "פצצה": { theme: "action", icons: ["💣", "💥", "⚠️"] },
  "כנף": { theme: "sky", icons: ["🪽", "✈️", "☁️"] },
  "מנוע": { theme: "machine", icons: ["⚙️", "🔩", "🔥"] },
  "בלרינה": { theme: "stage", icons: ["🩰", "💃", "✨"] },
  "קפה": { theme: "cafe", icons: ["☕", "🤎", "♨️"] },
  "קפוצינו": { theme: "cafe", icons: ["☕", "🥛", "🤎"] },
  "ספל": { theme: "cafe", icons: ["🍵", "☕", "♨️"] },
  "טוטו": { theme: "stage", icons: ["🩰", "🎀", "✨"] },
  "בלט": { theme: "stage", icons: ["🩰", "🎭", "✨"] },
  "עץ": { theme: "forest", icons: ["🌳", "🍃", "🪵"] },
  "תוף": { theme: "music", icons: ["🥁", "🎵", "⚡"] },
  "מקל": { theme: "forest", icons: ["🪵", "🌳", "🤎"] },
  "קצב": { theme: "music", icons: ["🎵", "🥁", "👏"] },
  "לילה": { theme: "night", icons: ["🌙", "⭐", "🌌"] },
  "מכה": { theme: "action", icons: ["💥", "🥁", "⚡"] },
  "שימפנזה": { theme: "jungle", icons: ["🐵", "🌿", "🍌"] },
  "בננה": { theme: "jungle", icons: ["🍌", "🐵", "🌿"] },
  "ג'ונגל": { theme: "jungle", icons: ["🌴", "🌿", "🐵"] },
  "קליפה": { theme: "jungle", icons: ["🍌", "〰️", "✨"] },
  "עלים": { theme: "forest", icons: ["🍃", "🌿", "🌳"] },
  "קפיצה": { theme: "action", icons: ["⬆️", "🏃", "✨"] },
  "פיל": { theme: "jungle", icons: ["🐘", "🌿", "💧"] },
  "קקטוס": { theme: "desert", icons: ["🌵", "☀️", "🏜️"] },
  "כפכף": { theme: "desert", icons: ["🩴", "☀️", "🏜️"] },
  "מדבר": { theme: "desert", icons: ["🏜️", "☀️", "🌵"] },
  "חול": { theme: "desert", icons: ["🏜️", "⏳", "☀️"] },
  "קוצים": { theme: "desert", icons: ["🌵", "✨", "⚠️"] },
  "קוקוס": { theme: "tropic", icons: ["🥥", "🌴", "💧"] },
  "חדק": { theme: "jungle", icons: ["🐘", "💧", "🌿"] },
  "אגוז": { theme: "tropic", icons: ["🥥", "🌰", "🌴"] },
  "עלה": { theme: "forest", icons: ["🍃", "🌿", "💚"] },
  "יען": { theme: "desert", icons: ["🐦", "🏃", "🏜️"] },
  "רכבת": { theme: "machine", icons: ["🚂", "🛤️", "💨"] },
  "טורבו": { theme: "machine", icons: ["🔥", "💨", "⚙️"] },
  "קטר": { theme: "machine", icons: ["🚂", "⚙️", "💨"] },
  "מסילה": { theme: "machine", icons: ["🛤️", "🚂", "➡️"] },
};

const dom = {
  rewardAvatar: document.querySelector("#reward-avatar"),
  rewardAvatarColor: document.querySelector("#reward-avatar-color"),
  rewardStage: document.querySelector("#reward-stage"),
  rewardBurst: document.querySelector("#reward-burst"),
  componentEffects: document.querySelector("#component-effects"),
  componentTrack: document.querySelector("#component-track"),
  finalCeremony: document.querySelector("#final-ceremony"),
  finalTitle: document.querySelector("#final-title"),
  finalCopy: document.querySelector("#final-copy"),
  finalAvatar: document.querySelector("#final-avatar"),
  finalActionLabel: document.querySelector("#final-action-label"),
  finalConfetti: document.querySelector("#final-confetti"),
  finalScreen: document.querySelector("#final-screen"),
  finalScreenAvatar: document.querySelector("#final-screen-avatar"),
  finalScreenTitle: document.querySelector("#final-screen-title"),
  finalScreenAction: document.querySelector("#final-screen-action"),
  finalScreenConfetti: document.querySelector("#final-screen-confetti"),
  finalScreenClose: document.querySelector("#final-screen-close"),
  finalComponents: document.querySelector("#final-components"),
  hebrewName: document.querySelector("#hebrew-name"),
  targetWord: document.querySelector("#target-word"),
  targetCard: document.querySelector("#target-card"),
  targetVisual: document.querySelector("#target-visual"),
  maskedWord: document.querySelector("#masked-word"),
  status: document.querySelector("#game-status"),
  mistakeCount: document.querySelector("#mistake-count"),
  winCount: document.querySelector("#win-count"),
  lossCount: document.querySelector("#loss-count"),
  letterGrid: document.querySelector("#letter-grid"),
  retryButton: document.querySelector("#retry-button"),
  nextButton: document.querySelector("#next-button"),
  modeCopy: document.querySelector("#mode-copy"),
  modeVisual: document.querySelector("#mode-visual"),
  instructionsToggle: document.querySelector("#instructions-toggle"),
  instructionsPanel: document.querySelector("#instructions-panel"),
  characterList: document.querySelector("#spelling-character-list"),
  mistakePieces: [...document.querySelectorAll(".mistake-piece")],
  mistakeCopy: document.querySelector("#mistake-copy"),
};

const state = {
  characterIndex: 0,
  wordIndex: 0,
  guessed: new Set(),
  mistakes: 0,
  losses: 0,
  locked: false,
  completed: CHARACTERS.map(() => new Set()),
  rewardTimer: null,
  audioContext: null,
  mode: "copy",
  lastSolved: null,
};

function currentCharacter() {
  return CHARACTERS[state.characterIndex];
}

function currentWord() {
  return currentCharacter().words[state.wordIndex];
}

function currentVisual() {
  return COMPONENT_VISUALS[currentWord()] ?? { theme: "stage", icons: ["⭐", "✨", "🎯"] };
}

function completedSet() {
  return state.completed[state.characterIndex];
}

function isGuessable(character) {
  return LETTERS.includes(character);
}

function isSolved() {
  return [...currentWord()].every((character) => !isGuessable(character) || state.guessed.has(character));
}

function revealAllLetters() {
  [...new Set([...currentWord()].filter(isGuessable))].forEach((letter) => state.guessed.add(letter));
}

function firstIncompleteWordIndex(characterIndex = state.characterIndex) {
  const words = CHARACTERS[characterIndex].words;
  const done = state.completed[characterIndex];
  const index = words.findIndex((_, wordIndex) => !done.has(wordIndex));
  return index === -1 ? 0 : index;
}

function nextIncompleteWordIndex() {
  const words = currentCharacter().words;
  const done = completedSet();
  for (let offset = 1; offset <= words.length; offset += 1) {
    const index = (state.wordIndex + offset) % words.length;
    if (!done.has(index)) return index;
  }
  return state.wordIndex;
}

function setStatus(message, tone = "") {
  dom.status.textContent = message;
  dom.status.classList.toggle("win", tone === "win");
  dom.status.classList.toggle("lose", tone === "lose");
}

function unlockAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!state.audioContext) state.audioContext = new AudioContextClass();
  if (state.audioContext.state === "suspended") state.audioContext.resume();
  return state.audioContext;
}

function playJingle(kind = "word", theme = "") {
  const context = unlockAudio();
  if (!context) return;
  const now = context.currentTime;
  const playTone = ({ frequency, offset = 0, length = 0.18, type = "sine", volume = 0.09, bend = 1 }) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now + offset);
    if (bend !== 1) oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, frequency * bend), now + offset + length * 0.82);
    oscillator.connect(gain);
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.0001, now + offset);
    gain.gain.exponentialRampToValueAtTime(volume, now + offset + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + length);
    oscillator.start(now + offset);
    oscillator.stop(now + offset + length + 0.04);
  };
  if (kind === "final") {
    const patterns = {
      tralalero: [
        [196, 0, 0.5, "sine", 0.04, 1.65], [293.66, 0.28, 0.42, "triangle", 0.08, 1.18],
        [392, 0.62, 0.22, "sine", 0.1, 0.92], [493.88, 0.86, 0.32, "triangle", 0.09, 1.1],
        [261.63, 1.22, 0.45, "sine", 0.05, 1.7], [659.25, 1.48, 0.22, "triangle", 0.1, 1.05],
      ],
      bombardiro: [
        [130.81, 0, 0.52, "sawtooth", 0.055, 1.8], [82.41, 0.52, 0.16, "square", 0.08, 0.45],
        [164.81, 0.92, 0.44, "sawtooth", 0.055, 1.7], [73.42, 1.34, 0.18, "square", 0.085, 0.4],
        [220, 1.72, 0.46, "sawtooth", 0.055, 1.5], [98, 2.14, 0.2, "square", 0.08, 0.5],
      ],
      ballerina: [
        [523.25, 0, 0.24, "sine", 0.08, 1.02], [659.25, 0.22, 0.24, "sine", 0.08, 1.02],
        [783.99, 0.44, 0.3, "triangle", 0.09, 1.02], [1046.5, 0.82, 0.36, "sine", 0.08, 0.98],
        [1318.51, 1.22, 0.42, "triangle", 0.075, 1.01], [1567.98, 1.72, 0.44, "sine", 0.07, 0.99],
      ],
      tung: [
        [120, 0, 0.1, "square", 0.08, 0.55], [220, 0.18, 0.08, "square", 0.065, 0.6],
        [120, 0.36, 0.1, "square", 0.08, 0.55], [220, 0.54, 0.08, "square", 0.065, 0.6],
        [146.83, 0.82, 0.18, "sawtooth", 0.08, 0.7], [293.66, 1.02, 0.18, "triangle", 0.08, 1.1],
      ],
      chimpanzini: [
        [392, 0, 0.14, "triangle", 0.075, 1.08], [523.25, 0.2, 0.14, "triangle", 0.08, 1.08],
        [659.25, 0.42, 0.15, "triangle", 0.085, 1.04], [783.99, 0.68, 0.18, "sine", 0.08, 1.04],
        [523.25, 1.0, 0.16, "triangle", 0.08, 1.08], [880, 1.24, 0.24, "sine", 0.085, 1.02],
      ],
      lirili: [
        [220, 0, 0.12, "triangle", 0.06, 1.18], [246.94, 0.16, 0.12, "triangle", 0.065, 1.18],
        [293.66, 0.32, 0.12, "triangle", 0.07, 1.18], [349.23, 0.48, 0.12, "triangle", 0.075, 1.18],
        [440, 0.68, 0.2, "sine", 0.08, 1.05], [587.33, 0.94, 0.28, "triangle", 0.08, 1.02],
      ],
      cocofanto: [
        [174.61, 0, 0.46, "sine", 0.055, 0.72], [261.63, 0.38, 0.24, "triangle", 0.075, 1.08],
        [130.81, 0.78, 0.5, "sawtooth", 0.045, 0.62], [329.63, 1.18, 0.24, "triangle", 0.075, 1.06],
        [392, 1.56, 0.32, "sine", 0.08, 1.02], [220, 1.9, 0.42, "sine", 0.05, 0.7],
      ],
      trenostruzzo: [
        [164.81, 0, 0.18, "square", 0.06, 1.02], [164.81, 0.18, 0.18, "square", 0.06, 1.02],
        [246.94, 0.38, 0.16, "triangle", 0.075, 1.1], [329.63, 0.58, 0.16, "triangle", 0.08, 1.08],
        [493.88, 0.82, 0.24, "sawtooth", 0.075, 1.16], [659.25, 1.12, 0.3, "triangle", 0.075, 1.08],
      ],
    };
    (patterns[theme] ?? patterns.tralalero).forEach(([frequency, offset, length, type, volume, bend]) => {
      playTone({ frequency, offset, length, type, volume, bend });
    });
    return;
  }
  const notes = [659.25, 880];
  notes.forEach((frequency, index) => playTone({ frequency, offset: index * 0.105, length: 0.13, type: index % 2 ? "triangle" : "sine", volume: 0.075 }));
}

function setFinalActionClass(character) {
  CHARACTERS.forEach((item) => {
    dom.finalCeremony.classList.remove(`action-${item.id}`);
    dom.finalScreen.classList.remove(`action-${item.id}`);
  });
  dom.finalCeremony.classList.add(`action-${character.id}`);
  dom.finalScreen.classList.add(`action-${character.id}`);
}

function launchFinalConfetti(target = dom.finalConfetti, options = {}) {
  const count = options.count ?? 82;
  const timeout = options.timeout ?? 2400;
  const fullScreen = options.fullScreen ?? false;
  const colors = ["#ffd447", "#ef4b3f", "#8ce99a", "#4dabf7", "#f08ab8", "#7c5cff"];
  target.innerHTML = "";
  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("i");
    piece.style.setProperty("--x", `${Math.round(Math.random() * 100)}%`);
    piece.style.setProperty("--w", `${PhaserlessRandom.between(fullScreen ? 9 : 8, fullScreen ? 20 : 16)}px`);
    piece.style.setProperty("--h", `${PhaserlessRandom.between(fullScreen ? 14 : 12, fullScreen ? 28 : 22)}px`);
    piece.style.setProperty("--c", colors[index % colors.length]);
    piece.style.setProperty("--r", `${PhaserlessRandom.between(-70, 70)}deg`);
    piece.style.setProperty("--d", `${PhaserlessRandom.between(fullScreen ? 2300 : 1350, fullScreen ? 4200 : 2300)}ms`);
    piece.style.setProperty("--delay", `${PhaserlessRandom.between(0, fullScreen ? 1100 : 420)}ms`);
    piece.style.setProperty("--drift", `${PhaserlessRandom.between(fullScreen ? -190 : -110, fullScreen ? 190 : 110)}px`);
    piece.style.setProperty("--fall", fullScreen ? "116vh" : "360px");
    target.appendChild(piece);
  }
  window.setTimeout(() => {
    target.innerHTML = "";
  }, timeout);
}

const PhaserlessRandom = {
  between(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

function renderWord() {
  dom.maskedWord.innerHTML = "";
  currentWord().split("").forEach((character) => {
    const cell = document.createElement("span");
    cell.className = "word-cell";
    if (!isGuessable(character)) {
      cell.classList.add("fixed");
      cell.textContent = character === " " ? "\u00a0" : character;
    } else if (state.guessed.has(character)) {
      cell.classList.add("revealed");
      cell.textContent = character;
    } else {
      cell.textContent = "";
      cell.setAttribute("aria-label", "אות חסרה");
    }
    dom.maskedWord.appendChild(cell);
  });
}

function renderLetters() {
  dom.letterGrid.innerHTML = "";
  const word = currentWord();
  LETTERS.forEach((letter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "letter-button";
    button.textContent = letter;
    button.setAttribute("aria-label", `אות ${letter}`);
    if (state.guessed.has(letter)) {
      button.disabled = true;
      button.classList.add(word.includes(letter) ? "correct" : "wrong");
    }
    if (state.locked) button.disabled = true;
    button.addEventListener("click", () => guessLetter(letter));
    dom.letterGrid.appendChild(button);
  });
}

function renderCharacters() {
  dom.characterList.innerHTML = "";
  CHARACTERS.forEach((character, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "spelling-character";
    button.setAttribute("aria-pressed", String(index === state.characterIndex));
    button.setAttribute("aria-label", `תרגול רכיבי ${character.hebrew}`);
    button.title = character.hebrew;
    button.innerHTML = `
      <img src="${character.avatar}" alt="" />
    `;
    button.addEventListener("click", () => setCharacter(index));
    dom.characterList.appendChild(button);
  });
}

function renderComponents() {
  dom.componentTrack.innerHTML = "";
  const done = completedSet();
  currentCharacter().words.forEach((word, index) => {
    const chip = document.createElement("span");
    chip.className = "component-chip";
    if (done.has(index)) {
      chip.classList.add("done");
      chip.textContent = word;
    } else if (index === state.wordIndex) {
      chip.classList.add("active");
      chip.textContent = state.mode === "visual" ? "פעיל" : word;
    } else {
      chip.classList.add("locked");
      chip.textContent = "•";
      chip.setAttribute("aria-label", "רכיב נעול");
    }
    dom.componentTrack.appendChild(chip);
  });
}

function renderComponentEffects() {
  const character = currentCharacter();
  const done = completedSet();
  dom.componentEffects.innerHTML = "";
  character.words.forEach((word, index) => {
    if (!done.has(index)) return;
    const visual = COMPONENT_VISUALS[word] ?? { icons: ["⭐"] };
    const effect = document.createElement("span");
    effect.className = "component-effect";
    if (state.lastSolved?.characterIndex === state.characterIndex && state.lastSolved?.wordIndex === index) {
      effect.classList.add("fresh");
    }
    const angle = -90 + (360 / character.words.length) * index;
    const radians = angle * Math.PI / 180;
    const radius = 72;
    effect.style.setProperty("--effect-x", `${Math.round(Math.cos(radians) * radius)}px`);
    effect.style.setProperty("--effect-y", `${Math.round(Math.sin(radians) * radius)}px`);
    effect.textContent = visual.icons[0];
    effect.title = word;
    dom.componentEffects.appendChild(effect);
  });
}

function renderFinalCeremony(allComplete) {
  const character = currentCharacter();
  dom.finalCeremony.hidden = !allComplete;
  if (!allComplete) return;
  setFinalActionClass(character);
  dom.finalTitle.textContent = `${character.hebrew} השלים את כל הרכיבים`;
  dom.finalCopy.textContent = character.finalReward;
  dom.finalAvatar.src = character.avatar;
  dom.finalActionLabel.textContent = character.finalAction;
  dom.finalScreenAvatar.src = character.avatar;
  dom.finalScreenTitle.textContent = `${character.hebrew} במופע ניצחון`;
  dom.finalScreenAction.textContent = character.finalAction;
  dom.finalComponents.innerHTML = "";
  character.words.forEach((word) => {
    const chip = document.createElement("span");
    chip.textContent = word;
    dom.finalComponents.appendChild(chip);
  });
}

function renderScore() {
  const character = currentCharacter();
  dom.mistakeCount.textContent = `טעויות ${state.mistakes}/${MAX_MISTAKES}`;
  dom.winCount.textContent = `רכיבים ${completedSet().size}/${character.words.length}`;
  dom.lossCount.textContent = `פסילות ${state.losses}`;
  dom.mistakePieces.forEach((piece, index) => {
    piece.classList.toggle("used", index < state.mistakes);
  });
  dom.mistakeCopy.textContent = state.mistakes === 0
    ? "כל טעות מורידה פס אנרגיה."
    : `נשארו ${MAX_MISTAKES - state.mistakes} ניסיונות.`;
}

function render() {
  const character = currentCharacter();
  const allComplete = completedSet().size === character.words.length;
  const progress = completedSet().size / character.words.length;
  dom.rewardAvatar.src = character.avatar;
  dom.rewardAvatarColor.src = character.avatar;
  dom.rewardStage.style.setProperty("--reveal-progress", `${Math.round(progress * 100)}%`);
  dom.hebrewName.textContent = character.hebrew;
  dom.targetWord.textContent = currentWord();
  dom.targetWord.hidden = state.mode === "visual";
  const visual = currentVisual();
  dom.targetVisual.dataset.theme = visual.theme;
  dom.targetVisual.innerHTML = `<span class="visual-icon visual-icon-1">${visual.icons[0]}</span>`;
  dom.modeCopy.setAttribute("aria-pressed", String(state.mode === "copy"));
  dom.modeVisual.setAttribute("aria-pressed", String(state.mode === "visual"));
  dom.targetCard?.classList?.toggle("visual-mode", state.mode === "visual");
  dom.rewardStage.classList.toggle("final-reward", allComplete);
  renderWord();
  renderLetters();
  renderComponents();
  renderComponentEffects();
  renderFinalCeremony(allComplete);
  renderCharacters();
  renderScore();
  dom.retryButton.textContent = allComplete ? "תרגול מחדש" : "ניסיון נוסף";
  dom.nextButton.textContent = allComplete ? "הצג חגיגה שוב" : "למילה הבאה";
}

function resetRound(wordIndex = state.wordIndex) {
  state.wordIndex = wordIndex;
  state.guessed = new Set();
  state.mistakes = 0;
  state.locked = false;
}

function hideFinalScreen() {
  dom.finalScreen.hidden = true;
  dom.finalScreenConfetti.innerHTML = "";
}

function setCharacter(index) {
  state.characterIndex = index;
  state.lastSolved = null;
  hideFinalScreen();
  resetRound(firstIncompleteWordIndex(index));
  const character = currentCharacter();
  const allComplete = completedSet().size === character.words.length;
  setStatus(allComplete ? `${character.finalReward} אפשר לתרגל שוב או לבחור דמות אחרת.` : `בחרו את האותיות של ${currentWord()}.`);
  render();
}

function setMode(mode) {
  if (!["copy", "visual"].includes(mode)) return;
  state.mode = mode;
  setStatus(mode === "visual" ? "מצב כרטיסיה: ראו את הרמז ובחרו אותיות." : `מצב העתקה: בחרו את האותיות של ${currentWord()}.`);
  render();
}

function startNextWord() {
  const character = currentCharacter();
  if (completedSet().size === character.words.length) {
    showFinalCeremony();
    setStatus(character.finalReward, "win");
  } else {
    resetRound(nextIncompleteWordIndex());
    setStatus(`מילה חדשה: ${currentWord()}. בחרו אות.`);
  }
  render();
}

function showRewardTokens(pieces, duration = 1200) {
  window.clearTimeout(state.rewardTimer);
  dom.rewardStage.classList.add("word-reward");
  dom.rewardBurst.innerHTML = "";
  pieces.forEach((piece, index) => {
    const token = document.createElement("span");
    token.textContent = piece;
    token.style.setProperty("--token-x", `${index % 2 ? -95 : 95}px`);
    token.style.setProperty("--token-y", `${-42 - index * 18}px`);
    token.style.setProperty("--token-rotate", `${index % 2 ? -12 : 12}deg`);
    token.style.animationDelay = `${index * 90}ms`;
    dom.rewardBurst.appendChild(token);
  });
  state.rewardTimer = window.setTimeout(() => {
    dom.rewardStage.classList.remove("word-reward");
    dom.rewardBurst.innerHTML = "";
  }, duration);
}

function showReward(word, allComplete) {
  showRewardTokens(allComplete ? [word, "כל הכבוד", "מופע מיוחד", "הושלם"] : [word, "נאסף"], allComplete ? 1800 : 1200);
}

function showFinalCeremony() {
  const character = currentCharacter();
  dom.finalCeremony.hidden = false;
  setFinalActionClass(character);
  dom.finalAvatar.src = character.avatar;
  dom.finalActionLabel.textContent = character.finalAction;
  dom.finalScreen.hidden = false;
  dom.finalScreenAvatar.src = character.avatar;
  dom.finalScreenTitle.textContent = `${character.hebrew} במופע ניצחון`;
  dom.finalScreenAction.textContent = character.finalAction;
  dom.finalCeremony.scrollIntoView({ behavior: "smooth", block: "center" });
  if (dom.finalCeremony.animate) {
    dom.finalCeremony.animate(
      [
        { transform: "translateY(10px) scale(0.98)", opacity: 0.55 },
        { transform: "translateY(0) scale(1)", opacity: 1 },
      ],
      { duration: 340, easing: "ease-out" },
    );
  }
  launchFinalConfetti(dom.finalConfetti, { count: 92, timeout: 3000 });
  launchFinalConfetti(dom.finalScreenConfetti, { count: 190, timeout: 5600, fullScreen: true });
  playJingle("final", character.id);
  showRewardTokens(["מופע מיוחד", ...character.words.slice(0, 3), "ניצחון"], 2600);
}

function finishRound(won) {
  state.locked = true;
  revealAllLetters();
  if (won) {
    const word = currentWord();
    const solvedIndex = state.wordIndex;
    completedSet().add(solvedIndex);
    state.lastSolved = { characterIndex: state.characterIndex, wordIndex: solvedIndex };
    const character = currentCharacter();
    const allComplete = completedSet().size === character.words.length;
    showReward(word, allComplete);
    if (!allComplete) playJingle("word");
    setStatus(allComplete ? character.finalReward : `מצוין! הרכיב ${word} הצטרף לדמות.`, "win");
  } else {
    state.losses += 1;
    setStatus(`התשובה הייתה: ${currentWord()}`, "lose");
  }
  render();
  if (won && completedSet().size === currentCharacter().words.length) {
    window.setTimeout(showFinalCeremony, 0);
  }
}

function guessLetter(letter) {
  if (state.locked || state.guessed.has(letter) || !LETTERS.includes(letter)) return;
  unlockAudio();
  const word = currentWord();
  state.guessed.add(letter);

  if (word.includes(letter)) {
    if (isSolved()) {
      finishRound(true);
      return;
    }
    setStatus(`נכון, יש ${letter}.`);
  } else {
    state.mistakes += 1;
    if (state.mistakes >= MAX_MISTAKES) {
      finishRound(false);
      return;
    }
    setStatus(`אין ${letter}. נשארו ${MAX_MISTAKES - state.mistakes} טעויות.`);
  }
  render();
}

function keyboardLetter(event) {
  if (LETTERS.includes(event.key)) return event.key;
  return KEYBOARD_MAP[event.key.toLowerCase()] ?? "";
}

dom.retryButton.addEventListener("click", () => {
  hideFinalScreen();
  if (completedSet().size === currentCharacter().words.length) {
    state.completed[state.characterIndex] = new Set();
    state.lastSolved = null;
    resetRound(0);
    setStatus(`סבב חדש: ${currentWord()}.`);
    render();
    return;
  }
  resetRound();
  setStatus(`נסו שוב: ${currentWord()}.`);
  render();
});

dom.nextButton.addEventListener("click", startNextWord);
dom.finalScreenClose.addEventListener("click", hideFinalScreen);
dom.modeCopy.addEventListener("click", () => setMode("copy"));
dom.modeVisual.addEventListener("click", () => setMode("visual"));
dom.instructionsToggle.addEventListener("click", () => {
  const shouldOpen = dom.instructionsPanel.hidden;
  dom.instructionsPanel.hidden = !shouldOpen;
  dom.instructionsToggle.setAttribute("aria-expanded", String(shouldOpen));
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "Escape" && !dom.finalScreen.hidden) {
    hideFinalScreen();
    return;
  }
  const letter = keyboardLetter(event);
  if (letter) {
    event.preventDefault();
    guessLetter(letter);
  }
});

setStatus(`בחרו את האותיות של ${currentWord()}.`);
render();
