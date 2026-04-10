const WORKER_BASE = "https://idleon-upgrade-advisor.zodiacgolem.workers.dev";

const demoData = {
  "CauldronP2W": [
    [35, 20, 15, 40, 25, 20, 30, 18, 10, 50, 30, 22],
    [20, 12, 15, 10, 12, 8, 9, 7],
    [4, 12]
  ],
  "StampLv": [
    { "0": 12, "1": 18, "2": 20, "length": 3 },
    { "0": 15, "1": 10, "length": 2 },
    { "0": 8, "length": 1 }
  ],
  "StampLvM": [
    { "0": 15, "1": 20, "2": 25, "length": 3 },
    { "0": 17, "1": 16, "length": 2 },
    { "0": 12, "length": 1 }
  ],
  "CauldronInfo": [
    { "0": 12, "1": 20, "2": 8, "length": 3 },
    { "0": 25, "1": 14, "length": 2 },
    { "0": 18, "length": 1 },
    { "0": 30, "1": 33, "length": 2 }
  ]
};

function $(id) {
  return document.getElementById(id);
}

function setStatus(message, type = "idle") {
  const el = $("status");
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

function toSlug(input) {
  const value = String(input || "").trim();
  const m = value.match(/^https?:\/\/([a-zA-Z0-9_-]+)\.idleonefficiency\.com\/?$/i);
  return m ? m[1] : value;
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

function scoreRecommendations(data) {
  const recs = [];
  let dataSourcesFound = 0;

  const p2w = getNested(data, ["CauldronP2W"], []);
  if (Array.isArray(p2w) && p2w.length >= 3) {
    dataSourcesFound++;
    const cauld = Array.isArray(p2w[0]) ? p2w[0] : [];
    const liq = Array.isArray(p2w[1]) ? p2w[1] : [];
    const vial = Array.isArray(p2w[2]) ? p2w[2] : [];

    ["Power", "Quicc", "High-IQ", "Kazam"].forEach((name, idx) => {
      const base = idx * 3;
      const values = base + 2 < cauld.length ? cauld.slice(base, base + 3) : [0, 0, 0];

      [
        ["Cauldron Speed", Number(values[0]), 150, 9],
        ["New Bubble", Number(values[1]), 125, 9],
        ["Boost Req", Number(values[2]), 100, 6]
      ].forEach(([label, level, cap, impact]) => {
        const gap = Math.max(0, cap - level);
        if (!gap) return;

        const effort = level < cap * 0.5 ? 2 : level < cap * 0.8 ? 4 : 6;
        const score = impact * 10 - effort * 3 + Math.min(gap, 25);

        recs.push({
          title: `${name} ${label}`,
          category: "Alchemy P2W",
          impact,
          effort,
          confidence: 9,
          score,
          why: `${label} is below cap (${level}/${cap}) and usually improves broad account progression.`
        });
      });
    });

    ["Water", "N2", "Trench", "Toxic"].forEach((name, idx) => {
      const base = idx * 2;
      const values = base + 1 < liq.length ? liq.slice(base, base + 2) : [0, 0];

      [
        ["Liquid Regen", Number(values[0]), 100, 7],
        ["Liquid Capacity", Number(values[1]), 80, 7]
      ].forEach(([label, level, cap, impact]) => {
        const gap = Math.max(0, cap - level);
        if (!gap) return;

        const effort = level < cap * 0.5 ? 2 : level < cap * 0.8 ? 4 : 6;
        const score = impact * 10 - effort * 3 + Math.min(gap, 20);

        recs.push({
          title: `${name} ${label}`,
          category: "Alchemy P2W",
          impact,
          effort,
          confidence: 8,
          score,
          why: `${label} is below cap (${level}/${cap}) and helps many systems feel smoother.`
        });
      });
    });

    if (vial.length >= 2) {
      [
        ["Vial Attempts", Number(vial[0]), 15, 6],
        ["Vial RNG", Number(vial[1]), 45, 5]
      ].forEach(([label, level, cap, impact]) => {
        const gap = Math.max(0, cap - level);
        if (!gap) return;

        const effort = level < cap * 0.5 ? 2 : level < cap * 0.8 ? 4 : 6;
        const score = impact * 10 - effort * 3 + Math.min(gap, 15);

        recs.push({
          title: label,
          category: "Alchemy P2W",
          impact,
          effort,
          confidence: 8,
          score,
          why: `${label} is below cap (${level}/${cap}) and is often a cheap account-wide upgrade.`
        });
      });
    }
  }

  const stampLv = getNested(data, ["StampLv"], []);
  const stampMax = getNested(data, ["StampLvM"], []);
  if (Array.isArray(stampLv) && Array.isArray(stampMax)) {
    dataSourcesFound++;
    stampLv.forEach((tab, tabIndex) => {
      if (!tab || typeof tab !== "object") return;

      const maxTab = stampMax[tabIndex] && typeof stampMax[tabIndex] === "object"
        ? stampMax[tabIndex]
        : {};

      Object.entries(tab).forEach(([key, value]) => {
        if (key === "length") return;

        const cur = Number(value);
        const mx = Number(maxTab[key] ?? cur);
        const gap = Math.max(0, mx - cur);

        if (cur > 0 && gap > 0 && gap <= 10) {
          recs.push({
            title: `Stamp tab ${tabIndex + 1} slot ${key}`,
            category: "Stamps",
            impact: 5,
            effort: 2,
            confidence: 7,
            score: 62 + (10 - gap),
            why: `This stamp is close to its current max (${cur}/${mx}), making it an easy cleanup win.`
          });
        }
      });
    });
  }

  const bubbles = getNested(data, ["CauldronInfo"], []);
  if (Array.isArray(bubbles) && bubbles.length > 0) {
    dataSourcesFound++;
    bubbles.slice(0, 4).forEach((group, groupIndex) => {
      if (!group || typeof group !== "object") return;

      Object.entries(group).forEach(([key, value]) => {
        if (key === "length") return;

        const lvl = Number(value);
        if (lvl >= 5 && lvl <= 35) {
          recs.push({
            title: `Cauldron ${groupIndex + 1} bubble ${key}`,
            category: "Bubbles",
            impact: 5,
            effort: 3,
            confidence: 6,
            score: 58 - Math.abs(20 - lvl),
            why: "Mid-low bubble levels are often some of the fastest broad progression wins."
          });
        }
      });
    });
  }

  recs.sort((a, b) => b.score - a.score);

  const categoryCounts = {};
  for (const rec of recs) {
    categoryCounts[rec.category] = (categoryCounts[rec.category] || 0) + 1;
  }

  const quality = [
    {
      label: "Alchemy P2W data",
      found: Array.isArray(p2w) && p2w.length >= 3,
      detail: Array.isArray(p2w) && p2w.length >= 3 ? "Detected and used in scoring." : "Missing from payload."
    },
    {
      label: "Stamp data",
      found: Array.isArray(stampLv) && stampLv.length > 0,
      detail: Array.isArray(stampLv) && stampLv.length > 0 ? "Detected and used in scoring." : "Missing from payload."
    },
    {
      label: "Bubble data",
      found: Array.isArray(bubbles) && bubbles.length > 0,
      detail: Array.isArray(bubbles) && bubbles.length > 0 ? "Detected and used in scoring." : "Missing from payload."
    },
    {
      label: "Overall confidence",
      found: true,
      detail: dataSourcesFound >= 3 ? "High" : dataSourcesFound === 2 ? "Medium" : "Low"
    }
  ];

  return { recs, categoryCounts, quality };
}

function renderRecCard(rec, rank = null) {
  return `
    <article class="rec-card">
      <div class="rec-top">
        <div>
          ${rank ? `<div class="pill">#${rank}</div>` : ""}
          <h4 class="rec-title">${rec.title}</h4>
          <div class="muted">${rec.why}</div>
        </div>
        <div class="score-pill">Score ${rec.score}</div>
      </div>
      <div class="rec-meta">
        <span class="tag">${rec.category}</span>
        <span class="tag">Impact ${rec.impact}</span>
        <span class="tag">Effort ${rec.effort}</span>
        <span class="tag">Confidence ${rec.confidence}</span>
      </div>
    </article>
  `;
}

function renderResults(result) {
  const { recs, categoryCounts, quality } = result;
  if (!recs.length) {
    throw new Error("No recommendations were produced from this profile.");
  }

  const best = recs[0];

  $("emptyState").classList.add("hidden");
  $("results").classList.remove("hidden");

  $("primaryCategory").textContent = best.category;
  $("primaryScore").textContent = `Score ${best.score}`;
  $("primaryTitle").textContent = best.title;
  $("primaryWhy").textContent = best.why;
  $("primaryImpact").textContent = best.impact;
  $("primaryEffort").textContent = best.effort;
  $("primaryConfidence").textContent = best.confidence;

  $("kpiTotal").textContent = recs.length;
  $("kpiEasy").textContent = recs.filter(r => r.effort <= 3).length;
  $("kpiCategories").textContent = Object.keys(categoryCounts).length;
  $("kpiBest").textContent = best.score;

  $("top3List").innerHTML = recs.slice(0, 3).map((rec, i) => renderRecCard(rec, i + 1)).join("");
  $("backupList").innerHTML = recs.slice(3, 8).map(rec => renderRecCard(rec)).join("");

  const maxCategoryCount = Math.max(...Object.values(categoryCounts), 1);
  $("categoryBreakdown").innerHTML = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => `
      <div class="breakdown-row">
        <div class="breakdown-top">
          <strong>${name}</strong>
          <span>${count}</span>
        </div>
        <div class="bar">
          <span style="width: ${(count / maxCategoryCount) * 100}%"></span>
        </div>
      </div>
    `)
    .join("");

  $("qualityList").innerHTML = quality.map(item => `
    <div class="quality-card">
      <div class="rec-top">
        <strong>${item.label}</strong>
        <span class="tag">${item.found ? "Yes" : "No"}</span>
      </div>
      <div class="muted">${item.detail}</div>
    </div>
  `).join("");
}

function clearResults() {
  $("results").classList.add("hidden");
  $("emptyState").classList.remove("hidden");
  $("top3List").innerHTML = "";
  $("backupList").innerHTML = "";
  $("categoryBreakdown").innerHTML = "";
  $("qualityList").innerHTML = "";
}

async function analyze() {
  const jsonInput = $("jsonInput").value.trim();
  const profileInput = $("profileInput").value.trim();

  try {
    setStatus("Loading profile data...", "loading");
    clearResults();

    let data;
    if (jsonInput) {
      data = JSON.parse(jsonInput);
    } else if (profileInput) {
      data = await fetchProfileJson(profileInput);
    } else {
      throw new Error("Enter a profile URL/slug or paste Raw JSON.");
    }

    const result = scoreRecommendations(data);
    renderResults(result);
    setStatus(`Loaded ${result.recs.length} recommendations.`, "success");
  } catch (err) {
    setStatus(err.message || "Something went wrong.", "error");
  }
}

function loadDemo() {
  $("jsonInput").value = JSON.stringify(demoData, null, 2);
  $("profileInput").value = "";
  analyze();
}

function clearAll() {
  $("profileInput").value = "";
  $("jsonInput").value = "";
  clearResults();
  setStatus("Ready.", "idle");
}

$("analyzeBtn").addEventListener("click", analyze);
$("demoBtn").addEventListener("click", loadDemo);
$("clearBtn").addEventListener("click", clearAll);
