const WORKER_BASE = "https://idleon-upgrade-advisor.zodiacgolem.workers.dev";

/*
  Set this to your icon folder if you add PNGs.
  Example:
  const ICON_BASE = "./icons";
*/
const ICON_BASE = "";

/* Demo payload */
const demoData = {
  CauldronP2W: [
    [35, 20, 15, 40, 25, 20, 30, 18, 10, 50, 30, 22],
    [20, 12, 15, 10, 12, 8, 9, 7],
    [4, 12]
  ],
  StampLv: [
    { 0: 12, 1: 18, 2: 20, length: 3 },
    { 0: 15, 1: 10, length: 2 },
    { 0: 8, length: 1 }
  ],
  StampLvM: [
    { 0: 15, 1: 20, 2: 25, length: 3 },
    { 0: 17, 1: 16, length: 2 },
    { 0: 12, length: 1 }
  ],
  CauldronInfo: [
    { 0: 12, 1: 20, 2: 8, length: 3 },
    { 0: 25, 1: 14, length: 2 },
    { 0: 18, length: 1 },
    { 0: 30, 1: 33, length: 2 }
  ],
  LibBooks: 7,
  LibraryLevel: 18,
  LibrarySpeed: 2.4,
  LibraryMaxBooks: 14
};

const CAULDRON_NAMES = ["Power", "Quicc", "High-IQ", "Kazam"];

const BUBBLE_NAMES = {
  0: [
    "Roid Ragin","Warriors Rule","Hearty Diggy","Wyoming Blood","Reely Smart","Big Meaty Claws",
    "Sploosh Sploosh","Stronk Tools","FMJ","Bappity Boopity","Brittley Spears","Call Me Bob",
    "Carpenter","Buff Boi Talent","Orange Bargain","Penny Of Strength","Multorange","Dream Of Ironfish",
    "Shimmeron","Bite But Not Chew","Spear Powah","Slabi Orefish","Gamer At Heart","Slabi Strength",
    "Power Trione","Farquad Force","Endgame Eff I","Tome Strength","Essence Boost","Crop Chapter"
  ],
  1: [
    "Swift Steppin","Archer Or Bust","Hammer Hammer","Lil Big Damage","Anvilnomics","Quick Slap",
    "Sanic Tools","Bug²","Shaquracy","Cheap Shot","Bow Jack","Call Me Ash","Cuz I Catch Em All",
    "Fast Boi Talent","Green Bargain","Dollar Of Agility","Premigreen","Fly In Mind","Kill Per Kill",
    "AFK Expexp","Bow Power","Slabo Critterbug","Sailor At Heart","Slabo Agility","Power Tritwo",
    "Quickdraw Quiver","Essence Boost","Endgame Eff II","Tome Agility","Stealth Chapter"
  ],
  2: [
    "Stable Jenius","Mage Is Best","Hocus Choppus","Molto Loggo","Noodubble","Name I Guess",
    "Le Brain Tools","Cookin Roadkill","Brewstachio","All For Kill","Matty Stafford","Call Me Pope",
    "Gospel Leader","Smart Boi Talent","Purple Bargain","Nickel Of Wisdom","Severapurple","Tree Sleeper",
    "Hyperswift","Matrix Evolved","Wand Pawur","Slabe Logsoul","Pious At Heart","Slabe Wisdom",
    "Power Trithree","Smarter Spells","Endgame Eff III","Essence Boost","Tome Wisdom","Essence Chapter"
  ],
  3: [
    "Lotto Skills","Droppin Loads","Startue Exp","Level Up Gift","Prowesessary","Stamp Tramp",
    "Undeveloped Costs","Da Daily Drip","Grind Time","Laaarrrryyyy","Cogs For Hands","Sample It",
    "Big Game Hunter","Ignore Overdues","Yellow Bargain","Mr Massacre","Egg Ink","Diamond Chef",
    "Card Champ","Petting The Rift","Boaty Bubble","Big P","Bit By Bit","Gifts Abound",
    "Atom Split","Cropius Mapper","Essence Boost","Hinge Buster","Ninja Looter","Lo Cost Mo Jade"
  ]
};

const STAMP_NAME_MAP = {
  0: {
    0: "Sword Stamp",
    1: "Heart Stamp",
    2: "Mana Stamp",
    3: "Tomahawk Stamp",
    4: "Target Stamp",
    5: "Shield Stamp",
    6: "Longsword Stamp",
    7: "Kapow Stamp",
    8: "Fist Stamp",
    9: "Battleaxe Stamp",
    10: "Scimitar Stamp",
    11: "Bullseye Stamp",
    12: "Feather Stamp",
    13: "Polearm Stamp",
    14: "Violence Stamp"
  },
  1: {
    0: "Pickaxe Stamp",
    1: "Hatchet Stamp",
    2: "Anvil Stamp",
    3: "Fishing Rod Stamp",
    4: "Catching Net Stamp",
    5: "Worship Stamp",
    6: "Trapping Stamp",
    7: "Duple Logs Stamp",
    8: "Matty Bag Stamp",
    9: "Smart Dirt Stamp",
    10: "Cool Diggy Tool Stamp",
    11: "Oceanman Stamp",
    12: "Swag Swingy Stamp",
    13: "Alch Go Brrr Stamp",
    14: "Lab Tube Stamp"
  },
  2: {
    0: "Book Stamp",
    1: "Storage Stamp",
    2: "Mason Jar Stamp",
    3: "Pocketwatch Stamp",
    4: "Postage Stamp",
    5: "Stat Graph Stamp",
    6: "Talent I Stamp",
    7: "Talent II Stamp",
    8: "Talent III Stamp",
    9: "Talent S Stamp",
    10: "Multitool Stamp",
    11: "Refinery Stamp",
    12: "Crystal Stamp",
    13: "Clover Stamp",
    14: "DNA Stamp"
  }
};

const STAMP_COST_HINTS = {
  "Sword Stamp": "Needs Spore Cap.",
  "Heart Stamp": "Needs Oak Logs.",
  "Mana Stamp": "Needs Copper Ore.",
  "Tomahawk Stamp": "Needs Copper Bar.",
  "Target Stamp": "Needs Thread.",
  "Shield Stamp": "Needs Iron Ore.",
  "Longsword Stamp": "Needs Bean Slices.",
  "Kapow Stamp": "Needs Trusty Nails.",
  "Fist Stamp": "Needs Bleach Logs.",
  "Battleaxe Stamp": "Needs Grass Leaf.",
  "Scimitar Stamp": "Needs Goldfish.",
  "Bullseye Stamp": "Needs Sentient Cereal.",
  "Feather Stamp": "Needs Coconotnotto.",
  "Polearm Stamp": "Needs Steel Axe.",
  "Violence Stamp": "Needs Dementia Ore.",
  "Pickaxe Stamp": "Needs Oak Logs.",
  "Hatchet Stamp": "Needs Thread.",
  "Anvil Stamp": "Needs Copper Ore.",
  "Matty Bag Stamp": "Needs Cramped Material Pouch.",
  "Smart Dirt Stamp": "Needs Plank.",
  "Cool Diggy Tool Stamp": "Needs Iron Hatchet.",
  "Mason Jar Stamp": "Needs Glass Shard.",
  "Refinery Stamp": "Needs Cheesy Crumbs.",
  "DNA Stamp": "Needs Worker Bee."
};

let lastResult = null;
let activeFilter = "all";

function $(id) {
  return document.getElementById(id);
}

function setStatus(message, type = "idle") {
  const el = $("status");
  if (!el) return;
  el.textContent = message;
  el.className = `status ${type}`;
}

function getNested(obj, path, fallback = null) {
  let cur = obj;
  for (const key of path) {
    if (Array.isArray(cur) && Number.isInteger(key)) {
      cur = key < cur.length ? cur[key] : fallback;
    } else if (cur && typeof cur === "object") {
      cur = Object.prototype.hasOwnProperty.call(cur, key) ? cur[key] : fallback;
    } else {
      return fallback;
    }
  }
  return cur;
}

function average(nums) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function toSlug(input) {
  const value = String(input || "").trim();
  const match = value.match(/^https?:\/\/([a-zA-Z0-9_-]+)\.idleonefficiency\.com\/?$/i);
  return match ? match[1] : value;
}

async function fetchProfileJson(profileInput) {
  const slug = toSlug(profileInput);
  const url = `${WORKER_BASE}/?slug=${encodeURIComponent(slug)}`;

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || `Proxy failed with status ${res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Worker returned non-JSON data.");
  }
}

function scoreFormula({
  impact,
  effort,
  urgency = 0,
  accountWide = 0,
  catchUp = 0,
  confidence = 7
}) {
  return Math.round(
    impact * 8 +
    accountWide * 6 +
    urgency * 5 +
    catchUp * 4 +
    confidence * 2 -
    effort * 6
  );
}

function inferStage(data) {
  const p2w = getNested(data, ["CauldronP2W"], []);
  const cauld = Array.isArray(p2w[0]) ? p2w[0] : [];

  const bubbleLevels = getNested(data, ["CauldronInfo"], [])
    .slice(0, 4)
    .flatMap(group => group && typeof group === "object"
      ? Object.entries(group)
          .filter(([k]) => k !== "length")
          .map(([, v]) => Number(v))
      : []
    );

  const stampLevels = getNested(data, ["StampLv"], [])
    .flatMap(group => group && typeof group === "object"
      ? Object.entries(group)
          .filter(([k]) => k !== "length")
          .map(([, v]) => Number(v))
      : []
    );

  const stageScore =
    average(cauld.map(Number).filter(Number.isFinite)) * 0.5 +
    average(bubbleLevels.filter(Number.isFinite)) * 1.2 +
    average(stampLevels.filter(Number.isFinite)) * 0.9;

  if (stageScore < 22) return "early";
  if (stageScore < 50) return "mid";
  return "late";
}

function makeBubbleName(cauldronIndex, bubbleIndex) {
  const cauldronName = CAULDRON_NAMES[cauldronIndex] || `Cauldron ${cauldronIndex + 1}`;
  const bubbleName = BUBBLE_NAMES[cauldronIndex]?.[bubbleIndex] || `Bubble ${bubbleIndex + 1}`;
  return `${cauldronName} - ${bubbleName}`;
}

function makeStampName(tabIndex, slotIndex) {
  const stampName = STAMP_NAME_MAP[tabIndex]?.[slotIndex] || `Stamp ${slotIndex + 1}`;
  return `Stamp Tab ${tabIndex + 1} - ${stampName}`;
}

function findNumbersDeep(node, path = [], hits = []) {
  if (Array.isArray(node)) {
    node.forEach((value, index) => findNumbersDeep(value, path.concat(index), hits));
    return hits;
  }

  if (node && typeof node === "object") {
    Object.entries(node).forEach(([key, value]) => findNumbersDeep(value, path.concat(key), hits));
    return hits;
  }

  if (typeof node === "number" && Number.isFinite(node)) {
    hits.push({ path, value: node });
  }

  return hits;
}

function extractLibraryState(data) {
  const state = {
    currentBooks: null,
    libraryLevel: null,
    checkoutSpeed: null,
    maxBooks: null,
    source: "not found"
  };

  const explicitBooks = [
    ["LibBooks"],
    ["LibraryBooks"],
    ["Library", "Books"],
    ["BookCheckouts"],
    ["Tower", "Library", "Books"]
  ];

  const explicitSpeed = [
    ["LibrarySpeed"],
    ["Library", "Speed"],
    ["Tower", "Library", "Speed"],
    ["BookSpeed"]
  ];

  const explicitMax = [
    ["LibraryMaxBooks"],
    ["LibMaxBooks"],
    ["Library", "MaxBooks"],
    ["Tower", "Library", "MaxBooks"],
    ["BookMax"]
  ];

  const explicitLevel = [
    ["LibraryLevel"],
    ["Library", "Level"],
    ["Tower", "Library", "Level"]
  ];

  for (const path of explicitBooks) {
    const value = getNested(data, path);
    if (typeof value === "number" && Number.isFinite(value)) {
      state.currentBooks = value;
      state.source = "explicit";
      break;
    }
  }

  for (const path of explicitSpeed) {
    const value = getNested(data, path);
    if (typeof value === "number" && Number.isFinite(value)) {
      state.checkoutSpeed = value;
      break;
    }
  }

  for (const path of explicitMax) {
    const value = getNested(data, path);
    if (typeof value === "number" && Number.isFinite(value)) {
      state.maxBooks = value;
      break;
    }
  }

  for (const path of explicitLevel) {
    const value = getNested(data, path);
    if (typeof value === "number" && Number.isFinite(value)) {
      state.libraryLevel = value;
      break;
    }
  }

  if (
    state.currentBooks == null ||
    state.checkoutSpeed == null ||
    state.maxBooks == null ||
    state.libraryLevel == null
  ) {
    const hits = findNumbersDeep(data).filter(hit =>
      hit.path.some(part => {
        const s = String(part).toLowerCase();
        return s.includes("book") || s.includes("lib") || s.includes("checkout");
      })
    );

    for (const hit of hits) {
      const joined = hit.path.map(String).join(".").toLowerCase();

      if (state.currentBooks == null && (joined.includes("book") || joined.includes("checkout")) && hit.value >= 0 && hit.value <= 500) {
        state.currentBooks = hit.value;
      }

      if (state.maxBooks == null && joined.includes("max") && joined.includes("book") && hit.value >= 0 && hit.value <= 500) {
        state.maxBooks = hit.value;
      }

      if (state.checkoutSpeed == null && joined.includes("speed") && hit.value >= 0 && hit.value <= 10000) {
        state.checkoutSpeed = hit.value;
      }

      if (state.libraryLevel == null && joined.includes("level") && joined.includes("lib") && hit.value >= 0 && hit.value <= 500) {
        state.libraryLevel = hit.value;
      }
    }

    if (hits.length && state.source === "not found") {
      state.source = "heuristic";
    }
  }

  return state;
}

function getIconPath(iconKey) {
  if (!ICON_BASE) return "";
  return `${ICON_BASE.replace(/\/$/, "")}/${iconKey}.png`;
}

function renderIcon(iconKey, fallback) {
  const src = getIconPath(iconKey);
  if (!src) return fallback;
  return `<img class="icon-img" src="${src}" alt="" onerror="this.style.display='none'; this.parentElement.textContent='${fallback}'">`;
}

function buildAlchemyP2WRecs(data, stage) {
  const recs = [];
  const p2w = getNested(data, ["CauldronP2W"], []);
  if (!Array.isArray(p2w) || p2w.length < 3) return recs;

  const cauld = Array.isArray(p2w[0]) ? p2w[0] : [];
  const liq = Array.isArray(p2w[1]) ? p2w[1] : [];
  const vial = Array.isArray(p2w[2]) ? p2w[2] : [];
  const stageImpactBoost = { early: 1.15, mid: 1.0, late: 0.9 }[stage];

  ["Power", "Quicc", "High-IQ", "Kazam"].forEach((name, idx) => {
    const base = idx * 3;
    const values = base + 2 < cauld.length ? cauld.slice(base, base + 3).map(Number) : [0, 0, 0];

    [
      { label: "Cauldron Speed", level: values[0], cap: 150, impact: 9.5, accountWide: 9.5, preferredBelow: 110 },
      { label: "New Bubble", level: values[1], cap: 125, impact: 9.2, accountWide: 9.0, preferredBelow: 95 },
      { label: "Boost Req", level: values[2], cap: 100, impact: 6.5, accountWide: 7.0, preferredBelow: 75 }
    ].forEach(item => {
      const gap = Math.max(0, item.cap - item.level);
      if (!gap) return;

      const progress = item.level / item.cap;
      const effort = progress < 0.35 ? 2 : progress < 0.7 ? 3 : progress < 0.9 ? 5 : 7;
      const urgency = item.level < item.preferredBelow ? 8 : 4;
      const catchUp = gap >= item.cap * 0.5 ? 8 : gap >= item.cap * 0.3 ? 6 : 3;

      recs.push({
        title: `${name} ${item.label}`,
        category: "Alchemy P2W",
        impact: Math.round(item.impact),
        effort,
        confidence: 9,
        score: scoreFormula({
          impact: item.impact * stageImpactBoost,
          effort,
          urgency,
          accountWide: item.accountWide,
          catchUp,
          confidence: 9
        }),
        why: `${item.label} is still low at ${item.level}/${item.cap}.`,
        detail: `Gap to cap: ${gap}.`,
        currentLevel: item.level,
        nextTarget: Math.min(item.level + 1, item.cap),
        costText: "Exact cost not available from current payload.",
        iconKey: "alchemy-p2w",
        fallback: "🧪"
      });
    });
  });

  ["Water", "N2", "Trench", "Toxic"].forEach((name, idx) => {
    const base = idx * 2;
    const values = base + 1 < liq.length ? liq.slice(base, base + 2).map(Number) : [0, 0];

    [
      { label: "Liquid Regen", level: values[0], cap: 100, impact: 7.8, accountWide: 8.0 },
      { label: "Liquid Capacity", level: values[1], cap: 80, impact: 7.0, accountWide: 7.5 }
    ].forEach(item => {
      const gap = Math.max(0, item.cap - item.level);
      if (!gap) return;

      const effort = item.level < item.cap * 0.35 ? 2 : item.level < item.cap * 0.75 ? 3 : 5;
      const urgency = gap > item.cap * 0.45 ? 7 : gap > item.cap * 0.2 ? 5 : 3;
      const catchUp = item.level < item.cap * 0.4 ? 8 : item.level < item.cap * 0.7 ? 5 : 2;

      recs.push({
        title: `${name} ${item.label}`,
        category: "Alchemy P2W",
        impact: Math.round(item.impact),
        effort,
        confidence: 8,
        score: scoreFormula({
          impact: item.impact,
          effort,
          urgency,
          accountWide: item.accountWide,
          catchUp,
          confidence: 8
        }),
        why: `${item.label} is behind at ${item.level}/${item.cap}.`,
        detail: `Gap to cap: ${gap}.`,
        currentLevel: item.level,
        nextTarget: Math.min(item.level + 1, item.cap),
        costText: "Exact cost not available from current payload.",
        iconKey: "alchemy-p2w",
        fallback: "💧"
      });
    });
  });

  if (vial.length >= 2) {
    [
      { label: "Vial Attempts", level: Number(vial[0]), cap: 15, impact: 6.2, accountWide: 6.4 },
      { label: "Vial RNG", level: Number(vial[1]), cap: 45, impact: 5.2, accountWide: 5.5 }
    ].forEach(item => {
      const gap = Math.max(0, item.cap - item.level);
      if (!gap) return;
      const effort = item.level < item.cap * 0.35 ? 2 : item.level < item.cap * 0.75 ? 3 : 5;

      recs.push({
        title: item.label,
        category: "Alchemy P2W",
        impact: Math.round(item.impact),
        effort,
        confidence: 8,
        score: scoreFormula({
          impact: item.impact,
          effort,
          urgency: 5,
          accountWide: item.accountWide,
          catchUp: gap > item.cap * 0.4 ? 6 : 3,
          confidence: 8
        }),
        why: `${item.label} is below a healthy level at ${item.level}/${item.cap}.`,
        detail: `Gap to cap: ${gap}.`,
        currentLevel: item.level,
        nextTarget: Math.min(item.level + 1, item.cap),
        costText: "Exact cost not available from current payload.",
        iconKey: "alchemy-p2w",
        fallback: "🧴"
      });
    });
  }

  return recs;
}

function buildStampRecs(data, stage) {
  const recs = [];
  const stampLv = getNested(data, ["StampLv"], []);
  const stampMax = getNested(data, ["StampLvM"], []);
  if (!Array.isArray(stampLv) || !Array.isArray(stampMax)) return recs;

  stampLv.forEach((tab, tabIndex) => {
    if (!tab || typeof tab !== "object") return;
    const maxTab = stampMax[tabIndex] && typeof stampMax[tabIndex] === "object" ? stampMax[tabIndex] : {};

    Object.entries(tab).forEach(([key, value]) => {
      if (key === "length") return;
      const slotIndex = Number(key);
      const cur = Number(value);
      const mx = Number(maxTab[key] ?? cur);
      const gap = Math.max(0, mx - cur);

      if (cur <= 0 || gap <= 0 || gap > 8) return;

      const title = makeStampName(tabIndex, slotIndex);
      const impact = tabIndex === 0 ? 5.5 : tabIndex === 1 ? 6.0 : 5.0;
      const effort = gap <= 2 ? 1 : gap <= 4 ? 2 : gap <= 6 ? 3 : 4;
      const urgency = gap <= 3 ? 8 : gap <= 5 ? 6 : 4;
      const catchUp = stage === "early" ? 5 : stage === "mid" ? 6 : 7;

      recs.push({
        title,
        category: "Stamps",
        impact: Math.round(impact),
        effort,
        confidence: 7,
        score: scoreFormula({
          impact,
          effort,
          urgency,
          accountWide: 6.5,
          catchUp,
          confidence: 7
        }),
        why: `${title} is near its current cap at ${cur}/${mx}.`,
        detail: `Missing ${gap} levels to current cap.`,
        currentLevel: cur,
        nextTarget: cur + 1,
        costText: STAMP_COST_HINTS[title] || "Exact stamp cost not available from current payload.",
        iconKey: `stamp-${tabIndex}-${slotIndex}`,
        fallback: "📮"
      });
    });
  });

  return recs;
}

function buildBubbleRecs(data, stage) {
  const recs = [];
  const bubbles = getNested(data, ["CauldronInfo"], []);
  if (!Array.isArray(bubbles)) return recs;

  bubbles.slice(0, 4).forEach((group, groupIndex) => {
    if (!group || typeof group !== "object") return;

    Object.entries(group).forEach(([key, value]) => {
      if (key === "length") return;
      const bubbleIndex = Number(key);
      const lvl = Number(value);
      if (!Number.isFinite(lvl) || lvl < 1) return;

      let impact = 0;
      let urgency = 0;
      let effort = 0;

      if (lvl >= 5 && lvl <= 20) {
        impact = 7.0;
        urgency = 8.0;
        effort = 2;
      } else if (lvl > 20 && lvl <= 35) {
        impact = 6.0;
        urgency = 5.0;
        effort = 3;
      } else if (lvl > 35 && lvl <= 50 && stage !== "early") {
        impact = 4.5;
        urgency = 3.0;
        effort = 4;
      } else {
        return;
      }

      const name = makeBubbleName(groupIndex, bubbleIndex);
      let costText = "Exact bubble cost not available from current payload.";
      if (name === "Ignore Overdues") {
        costText = "Library-related bubble. Exact material cost needs richer payload data.";
      }

      recs.push({
        title: name,
        category: "Bubbles",
        impact: Math.round(impact),
        effort,
        confidence: 6,
        score: scoreFormula({
          impact,
          effort,
          urgency,
          accountWide: 5.5,
          catchUp: stage === "early" ? 7 : 5,
          confidence: 6
        }),
        why: `${name} is at level ${lvl}, which is still a useful catch-up range.`,
        detail: `${CAULDRON_NAMES[groupIndex]} Cauldron bubble.`,
        currentLevel: lvl,
        nextTarget: lvl + 1,
        costText,
        iconKey: `bubble-${groupIndex}-${bubbleIndex}`,
        fallback: "🫧"
      });
    });
  });

  return recs;
}

function buildLibraryRecs(data, stage) {
  const state = extractLibraryState(data);
  const recs = [];

  if (state.currentBooks != null) {
    recs.push({
      title: "Spend your library books",
      category: "Library",
      impact: 8,
      effort: 1,
      confidence: state.source === "explicit" ? 8 : 5,
      score: scoreFormula({
        impact: 8,
        effort: 1,
        urgency: state.currentBooks >= 10 ? 9 : state.currentBooks >= 5 ? 7 : 4,
        accountWide: 7,
        catchUp: 5,
        confidence: state.source === "explicit" ? 8 : 5
      }),
      why: `You currently have ${state.currentBooks} available book${state.currentBooks === 1 ? "" : "s"}.`,
      detail: state.currentBooks > 0
        ? "Unused books are immediate value if you have strong talents ready to push."
        : "No spare books detected right now.",
      currentLevel: state.currentBooks,
      nextTarget: Math.max(0, state.currentBooks - 1),
      costText: "Uses 1 checkout per normal book. Special systems may vary.",
      iconKey: "library-books",
      fallback: "📚"
    });
  }

  if (typeof state.libraryLevel === "number" && state.libraryLevel < (stage === "early" ? 20 : stage === "mid" ? 40 : 70)) {
    recs.push({
      title: "Upgrade Talent Book Library construction",
      category: "Library",
      impact: 8,
      effort: 3,
      confidence: 7,
      score: scoreFormula({
        impact: 8,
        effort: 3,
        urgency: 7,
        accountWide: 8,
        catchUp: 6,
        confidence: 7
      }),
      why: `Your library level looks low at ${state.libraryLevel}.`,
      detail: "Library level improves checkout speed over time.",
      currentLevel: state.libraryLevel,
      nextTarget: state.libraryLevel + 1,
      costText: "Construction cost depends on current tower level and materials.",
      iconKey: "library-speed",
      fallback: "🏗️"
    });
  }

  if (typeof state.maxBooks === "number" && typeof state.currentBooks === "number" && state.currentBooks >= state.maxBooks - 1) {
    recs.push({
      title: "Increase library capacity / max books",
      category: "Library",
      impact: 7,
      effort: 3,
      confidence: 7,
      score: scoreFormula({
        impact: 7,
        effort: 3,
        urgency: 8,
        accountWide: 7,
        catchUp: 5,
        confidence: 7
      }),
      why: `Your books are near cap at ${state.currentBooks}/${state.maxBooks}.`,
      detail: "More max books means less overflow and more stored value.",
      currentLevel: state.maxBooks,
      nextTarget: state.maxBooks + 1,
      costText: "Exact capacity upgrade source depends on your progression systems.",
      iconKey: "library-max",
      fallback: "📚"
    });
  }

  recs.push({
    title: "Push library speed sources",
    category: "Library",
    impact: 7,
    effort: 2,
    confidence: 6,
    score: scoreFormula({
      impact: 7,
      effort: 2,
      urgency: 6,
      accountWide: 7,
      catchUp: 5,
      confidence: 6
    }),
    why: "Library speed upgrades are strong long-term account value.",
    detail: "Look at Biblio Stamp, library speed bonuses, and library-related bubbles.",
    currentLevel: state.checkoutSpeed,
    nextTarget: state.checkoutSpeed != null ? state.checkoutSpeed + 1 : null,
    costText: "Exact source costs vary by system.",
    iconKey: "library-speed",
    fallback: "📘"
  });

  return recs;
}

function dedupeRecommendations(recs) {
  const seen = new Set();
  const out = [];

  for (const rec of recs) {
    const key = `${rec.category}::${rec.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(rec);
  }

  return out;
}

function sortRecommendations(recs, mode) {
  const out = [...recs];

  if (mode === "score-asc") {
    return out.sort((a, b) => a.score - b.score);
  }

  if (mode === "title-asc") {
    return out.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (mode === "title-desc") {
    return out.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (mode === "category-asc") {
    return out.sort((a, b) => {
      const cmp = a.category.localeCompare(b.category);
      return cmp !== 0 ? cmp : b.score - a.score;
    });
  }

  return out.sort((a, b) => b.score - a.score);
}

function rankRecommendations(data) {
  const stage = inferStage(data);
  const libraryState = extractLibraryState(data);

  const recs = dedupeRecommendations([
    ...buildAlchemyP2WRecs(data, stage),
    ...buildStampRecs(data, stage),
    ...buildBubbleRecs(data, stage),
    ...buildLibraryRecs(data, stage)
  ]);

  const categoryCounts = {};
  for (const rec of recs) {
    categoryCounts[rec.category] = (categoryCounts[rec.category] || 0) + 1;
  }

  const p2w = getNested(data, ["CauldronP2W"], []);
  const stampLv = getNested(data, ["StampLv"], []);
  const bubbles = getNested(data, ["CauldronInfo"], []);

  const quality = [
    {
      label: "Alchemy P2W data",
      found: Array.isArray(p2w) && p2w.length >= 3,
      detail: Array.isArray(p2w) && p2w.length >= 3 ? "Detected and weighted." : "Missing from payload."
    },
    {
      label: "Stamp data",
      found: Array.isArray(stampLv) && stampLv.length > 0,
      detail: Array.isArray(stampLv) && stampLv.length > 0 ? "Named stamp recommendations enabled." : "Missing from payload."
    },
    {
      label: "Bubble data",
      found: Array.isArray(bubbles) && bubbles.length > 0,
      detail: Array.isArray(bubbles) && bubbles.length > 0 ? "Named bubble recommendations enabled." : "Missing from payload."
    },
    {
      label: "Library current books",
      found: libraryState.currentBooks != null,
      detail: libraryState.currentBooks != null
        ? `Detected ${libraryState.currentBooks} books (${libraryState.source}).`
        : "Could not confidently detect current books in this payload."
    },
    {
      label: "Library speed",
      found: libraryState.checkoutSpeed != null,
      detail: libraryState.checkoutSpeed != null
        ? `Detected speed value: ${libraryState.checkoutSpeed}.`
        : "No clear library speed field found."
    },
    {
      label: "Library max books",
      found: libraryState.maxBooks != null,
      detail: libraryState.maxBooks != null
        ? `Detected max books: ${libraryState.maxBooks}.`
        : "No clear max books field found."
    },
    {
      label: "Estimated account stage",
      found: true,
      detail: stage.charAt(0).toUpperCase() + stage.slice(1)
    }
  ];

  return { recs, categoryCounts, quality, stage, libraryState };
}

function renderPrimary(best, stage) {
  const primaryContent = $("primaryContent");
  if (!primaryContent) return;

  primaryContent.innerHTML = `
    <div class="primary-main">
      <div class="primary-icon-wrap">${renderIcon(best.iconKey, best.fallback || "⭐")}</div>
      <div>
        <div class="card-top">
          <span class="pill">${best.category} • ${stage}</span>
          <span class="score-pill">Score ${best.score}</span>
        </div>
        <h2>${best.title}</h2>
        <p class="muted">${best.why}</p>
        ${best.detail ? `<p class="muted small-text">${best.detail}</p>` : ""}
      </div>
    </div>

    <div class="stat-grid">
      <div class="mini-stat"><span>Impact</span><strong>${best.impact}</strong></div>
      <div class="mini-stat"><span>Effort</span><strong>${best.effort}</strong></div>
      <div class="mini-stat"><span>Confidence</span><strong>${best.confidence}</strong></div>
    </div>
  `;
}

function renderRecCard(rec, rank = null) {
  return `
    <article class="rec-card">
      <div class="rec-main">
        <div class="rec-icon-wrap">${renderIcon(rec.iconKey, rec.fallback || "⭐")}</div>
        <div class="rec-copy">
          <div class="rec-top">
            <div>
              ${rank ? `<div class="pill">#${rank}</div>` : ""}
              <h4 class="rec-title">${rec.title}</h4>
              <div class="muted">${rec.why}</div>
              ${rec.detail ? `<div class="muted small-text">${rec.detail}</div>` : ""}
            </div>
            <div class="score-pill">Score ${rec.score}</div>
          </div>

          <div class="rec-meta">
            <span class="tag">${rec.category}</span>
            <span class="tag">Impact ${rec.impact}</span>
            <span class="tag">Effort ${rec.effort}</span>
            ${rec.currentLevel != null ? `<span class="tag">Current ${rec.currentLevel}</span>` : ""}
            ${rec.nextTarget != null ? `<span class="tag">Next ${rec.nextTarget}</span>` : ""}
          </div>

          <div class="cost-box">
            <strong>Cost / notes</strong>
            <div class="muted">${rec.costText || "No cost data available."}</div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderLibraryOverview(result) {
  const libraryOverview = $("libraryOverview");
  if (!libraryOverview) return;

  const library = result.libraryState;
  const cards = [
    {
      label: "Current books",
      value: library.currentBooks != null ? library.currentBooks : "?",
      detail: library.currentBooks != null ? `Detected via ${library.source} lookup.` : "Not confidently found in this payload.",
      iconKey: "library-books",
      fallback: "📚"
    },
    {
      label: "Library level",
      value: typeof library.libraryLevel === "number" ? library.libraryLevel : "?",
      detail: "Used to decide whether library construction looks behind.",
      iconKey: "library-speed",
      fallback: "🏗️"
    },
    {
      label: "Checkout speed",
      value: typeof library.checkoutSpeed === "number" ? library.checkoutSpeed : "?",
      detail: "Shown only if the payload exposed a likely library speed value.",
      iconKey: "library-speed",
      fallback: "📘"
    },
    {
      label: "Max books",
      value: typeof library.maxBooks === "number" ? library.maxBooks : "?",
      detail: "Shown only if the payload exposed a max books value.",
      iconKey: "library-max",
      fallback: "📚"
    }
  ];

  libraryOverview.innerHTML = cards.map(card => `
    <div class="quality-card">
      <div class="rec-top">
        <div style="display:flex; gap:12px; align-items:center;">
          <div class="rec-icon-wrap" style="width:48px;height:48px;">${renderIcon(card.iconKey, card.fallback)}</div>
          <strong>${card.label}</strong>
        </div>
        <span class="tag">${card.value}</span>
      </div>
      <div class="muted" style="margin-top:8px;">${card.detail}</div>
    </div>
  `).join("");
}

function renderCategoryBreakdown(categoryCounts) {
  const categoryBreakdown = $("categoryBreakdown");
  if (!categoryBreakdown) return;

  const maxCategoryCount = Math.max(...Object.values(categoryCounts), 1);
  categoryBreakdown.innerHTML = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => `
      <div class="breakdown-row">
        <div class="breakdown-top">
          <strong>${name}</strong>
          <span>${count}</span>
        </div>
        <div class="bar"><span style="width:${(count / maxCategoryCount) * 100}%"></span></div>
      </div>
    `)
    .join("");
}

function renderRecommendations() {
  if (!lastResult) return;

  const recommendationList = $("recommendationList");
  const sortSelect = $("sortSelect");
  if (!recommendationList || !sortSelect) return;

  let filtered = activeFilter === "all"
    ? [...lastResult.recs]
    : lastResult.recs.filter(rec => rec.category === activeFilter);

  filtered = sortRecommendations(filtered, sortSelect.value);
  recommendationList.innerHTML = filtered.map(rec => renderRecCard(rec)).join("");
}

function renderResults(result) {
  lastResult = result;

  const bestSorted = sortRecommendations(result.recs, "score-desc");
  const best = bestSorted[0];

  if (!best) {
    throw new Error("No recommendations were produced from this profile.");
  }

  const emptyState = $("emptyState");
  const results = $("results");
  if (emptyState) emptyState.classList.add("hidden");
  if (results) results.classList.remove("hidden");

  renderPrimary(best, result.stage);

  if ($("kpiTotal")) $("kpiTotal").textContent = result.recs.length;
  if ($("kpiEasy")) $("kpiEasy").textContent = result.recs.filter(r => r.effort <= 2).length;
  if ($("kpiBooks")) $("kpiBooks").textContent = result.libraryState.currentBooks != null ? result.libraryState.currentBooks : "?";
  if ($("kpiBest")) $("kpiBest").textContent = best.score;

  renderLibraryOverview(result);
  renderCategoryBreakdown(result.categoryCounts);
  renderRecommendations();

  const top3List = $("top3List");
  if (top3List) {
    top3List.innerHTML = bestSorted.slice(0, 3).map((rec, i) => renderRecCard(rec, i + 1)).join("");
  }

  const qualityList = $("qualityList");
  if (qualityList) {
    qualityList.innerHTML = result.quality.map(item => `
      <div class="quality-card">
        <div class="rec-top">
          <strong>${item.label}</strong>
          <span class="tag">${item.found ? "Yes" : "No"}</span>
        </div>
        <div class="muted">${item.detail}</div>
      </div>
    `).join("");
  }
}

function clearResults() {
  const results = $("results");
  const emptyState = $("emptyState");
  const primaryContent = $("primaryContent");
  const top3List = $("top3List");
  const recommendationList = $("recommendationList");
  const libraryOverview = $("libraryOverview");
  const categoryBreakdown = $("categoryBreakdown");
  const qualityList = $("qualityList");

  if (results) results.classList.add("hidden");
  if (emptyState) emptyState.classList.remove("hidden");
  if (primaryContent) primaryContent.innerHTML = "";
  if (top3List) top3List.innerHTML = "";
  if (recommendationList) recommendationList.innerHTML = "";
  if (libraryOverview) libraryOverview.innerHTML = "";
  if (categoryBreakdown) categoryBreakdown.innerHTML = "";
  if (qualityList) qualityList.innerHTML = "";

  lastResult = null;
}

async function analyze() {
  const jsonInput = $("jsonInput")?.value.trim() || "";
  const profileInput = $("profileInput")?.value.trim() || "";

  try {
    setStatus("Loading profile data...", "loading");
    clearResults();

    let data;
    if (jsonInput) {
      data = JSON.parse(jsonInput);
    } else if (profileInput) {
      data = await fetchProfileJson(profileInput);
    } else {
      throw new Error("Enter a profile URL/slug or paste raw JSON.");
    }

    const result = rankRecommendations(data);
    renderResults(result);
    setStatus(`Loaded ${result.recs.length} recommendations.`, "success");
  } catch (err) {
    setStatus(err.message || "Something went wrong.", "error");
    console.error(err);
  }
}

function loadDemo() {
  const jsonInput = $("jsonInput");
  const profileInput = $("profileInput");
  if (jsonInput) jsonInput.value = JSON.stringify(demoData, null, 2);
  if (profileInput) profileInput.value = "";
  analyze();
}

function clearAll() {
  const profileInput = $("profileInput");
  const jsonInput = $("jsonInput");
  if (profileInput) profileInput.value = "";
  if (jsonInput) jsonInput.value = "";
  clearResults();
  setStatus("Ready.", "idle");
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderRecommendations();
  });
});

const sortSelect = $("sortSelect");
if (sortSelect) sortSelect.addEventListener("change", renderRecommendations);

const analyzeBtn = $("analyzeBtn");
const demoBtn = $("demoBtn");
const clearBtn = $("clearBtn");

if (analyzeBtn) analyzeBtn.addEventListener("click", analyze);
if (demoBtn) demoBtn.addEventListener("click", loadDemo);
if (clearBtn) clearBtn.addEventListener("click", clearAll);
