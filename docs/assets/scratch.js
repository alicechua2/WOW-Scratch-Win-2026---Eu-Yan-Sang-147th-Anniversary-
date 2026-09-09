/**
 * Replace these dummy codes later with the real series.
 * Each amount needs at least one unused code.
 */
const VOUCHERS = {
  5:    ["DUMMY-RM5-001", "DUMMY-RM5-002", "DUMMY-RM5-003", "DUMMY-RM5-004", "DUMMY-RM5-005"],
  10:   ["DUMMY-RM10-001", "DUMMY-RM10-002", "DUMMY-RM10-003", "DUMMY-RM10-004"],
  20:   ["DUMMY-RM20-001", "DUMMY-RM20-002", "DUMMY-RM20-003"],
  50:   ["DUMMY-RM50-001", "DUMMY-RM50-002"],
  100:  ["DUMMY-RM100-001", "DUMMY-RM100-002"],
  1000: ["DUMMY-RM1000-001"]
};

/** Higher chance for smaller amounts. */
const WEIGHTS = [
  { amount: 5, weight: 40 },
  { amount: 10, weight: 25 },
  { amount: 20, weight: 18 },
  { amount: 50, weight: 10 },
  { amount: 100, weight: 6 },
  { amount: 1000, weight: 1 }
];

const STORE_KEY = "eys147_redemptions_v1";
const ADMIN_PIN = "eys147";
const ESTORE = "https://www.euyansang.com.my/en_MY/home";
const VALID_TILL = "31/10/2026";

let person = null;
let prize = null;
let revealed = false;

const $ = (id) => document.getElementById(id);
const show = (id) => $(id).classList.remove("hidden");
const hide = (id) => $(id).classList.add("hidden");

function loadRows() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); }
  catch { return []; }
}
function saveRows(rows) {
  localStorage.setItem(STORE_KEY, JSON.stringify(rows));
}
function usedCodes() {
  return new Set(loadRows().map((r) => r.code));
}
function normalizeIc(raw) {
  return String(raw || "").replace(/\D/g, "");
}
function formatIc(raw) {
  const d = normalizeIc(raw);
  if (d.length === 12) return d.slice(0, 6) + "-" + d.slice(6, 8) + "-" + d.slice(8);
  return raw.trim();
}
function validIc(raw) {
  return /^\d{12}$/.test(normalizeIc(raw));
}
function pickAmount() {
  const remaining = WEIGHTS.filter((w) => VOUCHERS[w.amount].some((c) => !usedCodes().has(c)));
  if (!remaining.length) return null;
  const total = remaining.reduce((s, w) => s + w.weight, 0);
  let n = Math.random() * total;
  for (const w of remaining) {
    n -= w.weight;
    if (n <= 0) return w.amount;
  }
  return remaining[remaining.length - 1].amount;
}
function assignPrize() {
  const amount = pickAmount();
  if (amount == null) return null;
  const code = VOUCHERS[amount].find((c) => !usedCodes().has(c));
  return { amount, code };
}

$("detailsForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = $("fullName").value.trim();
  const email = $("email").value.trim().toLowerCase();
  const ic = normalizeIc($("ic").value);
  const err = $("formError");
  err.classList.add("hidden");

  if (!fullName || !email) {
    err.textContent = "Please fill in name and email.";
    err.classList.remove("hidden");
    return;
  }
  if (!validIc(ic)) {
    err.textContent = "Please enter a valid 12-digit IC number.";
    err.classList.remove("hidden");
    return;
  }

  const existing = loadRows().find((r) => r.ic === ic || r.email === email);
  person = { fullName, email, ic, icDisplay: formatIc(ic) };

  if (existing) {
    prize = { amount: existing.amount, code: existing.code, existing: true };
    hide("step-form");
    fillDone();
    document.querySelector("#step-done .ok").textContent = "You already redeemed. Here is your voucher.";
    show("step-done");
    return;
  }

  hide("step-form");
  show("step-quiz");
});

document.querySelectorAll(".choice").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.answer !== "yes") {
      hide("step-quiz");
      show("step-wrong");
      return;
    }
    prize = assignPrize();
    if (!prize) {
      hide("step-quiz");
      show("step-done");
      $("doneAmt").textContent = "—";
      $("doneCode").textContent = "All dummy codes have been used on this device.";
      document.querySelector("#step-done .ok").textContent = "No vouchers left on this device.";
      return;
    }
    $("prizeAmt").textContent = "RM " + prize.amount;
    $("prizeCode").textContent = prize.code;
    hide("step-quiz");
    show("step-scratch");
    requestAnimationFrame(setupScratch);
  });
});

$("retryQuiz").addEventListener("click", () => {
  hide("step-wrong");
  show("step-quiz");
});

function fillDone() {
  document.querySelector("#step-done .ok").textContent = "Your voucher is ready.";
  $("doneAmt").textContent = "RM " + prize.amount;
  $("doneCode").textContent = prize.code;
}

function recordRedemption() {
  if (prize.existing) return;
  const rows = loadRows();
  if (rows.some((r) => r.ic === person.ic || r.code === prize.code)) return;
  rows.push({
    when: new Date().toISOString(),
    name: person.fullName,
    email: person.email,
    ic: person.ic,
    icDisplay: person.icDisplay,
    amount: prize.amount,
    code: prize.code,
    shop: ESTORE,
    validTill: VALID_TILL
  });
  saveRows(rows);
  prize.existing = true;
}

function setupScratch() {
  const wrap = $("scratchWrap");
  const canvas = $("scratchCanvas");
  const ctx = canvas.getContext("2d");
  const rect = wrap.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * devicePixelRatio);
  canvas.height = Math.floor(rect.height * devicePixelRatio);
  ctx.scale(devicePixelRatio, devicePixelRatio);
  const w = rect.width;
  const h = rect.height;

  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#cfc7bb");
  g.addColorStop(0.45, "#f4efe4");
  g.addColorStop(1, "#b7ad9e");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(122,31,43,0.55)";
  ctx.font = "700 16px Noto Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("SCRATCH HERE", w / 2, h / 2 - 8);
  ctx.font = "12px Noto Sans, sans-serif";
  ctx.fillText("to reveal your code", w / 2, h / 2 + 14);

  revealed = false;
  let drawing = false;

  function pos(ev) {
    const r = canvas.getBoundingClientRect();
    const t = ev.touches ? ev.touches[0] : ev;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  }
  function scratchAt(x, y) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  }
  function clearedRatio() {
    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < sample.length; i += 16) {
      if (sample[i] < 40) clear++;
    }
    return clear / (sample.length / 16);
  }
  function maybeReveal() {
    if (revealed) return;
    if (clearedRatio() > 0.45) {
      revealed = true;
      ctx.clearRect(0, 0, w, h);
      canvas.style.pointerEvents = "none";
      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 0.35s";
      recordRedemption();
      fillDone();
      setTimeout(() => {
        hide("step-scratch");
        show("step-done");
      }, 700);
    }
  }

  function start(ev) { drawing = true; const p = pos(ev); scratchAt(p.x, p.y); ev.preventDefault(); }
  function move(ev) {
    if (!drawing) return;
    const p = pos(ev);
    scratchAt(p.x, p.y);
    maybeReveal();
    ev.preventDefault();
  }
  function end() { drawing = false; maybeReveal(); }

  canvas.onmousedown = start;
  canvas.onmousemove = move;
  window.addEventListener("mouseup", end);
  canvas.ontouchstart = start;
  canvas.ontouchmove = move;
  canvas.ontouchend = end;
}

function renderReport() {
  const rows = loadRows().slice().sort((a, b) => a.when.localeCompare(b.when));
  $("reportBody").innerHTML = rows.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${new Date(r.when).toLocaleString()}</td>
      <td>${escapeHtml(r.name)}</td>
      <td>${escapeHtml(r.email)}</td>
      <td>${escapeHtml(r.icDisplay || r.ic)}</td>
      <td>RM ${r.amount}</td>
      <td>${escapeHtml(r.code)}</td>
    </tr>
  `).join("") || `<tr><td colspan="7">No redemptions yet.</td></tr>`;

  const byAmt = {};
  rows.forEach((r) => { byAmt[r.amount] = (byAmt[r.amount] || 0) + 1; });
  $("adminStats").innerHTML = `<div class="stat"><b>${rows.length}</b>people</div>` +
    [5, 10, 20, 50, 100, 1000].map((a) => `<div class="stat"><b>${byAmt[a] || 0}</b>RM ${a}</div>`).join("");
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function toCsv() {
  const rows = loadRows();
  const header = ["when", "name", "email", "ic", "amount", "code", "validTill", "shop"];
  const lines = [header.join(",")].concat(rows.map((r) => header.map((k) => {
    const v = k === "ic" ? (r.icDisplay || r.ic) : r[k];
    return `"${String(v ?? "").replace(/"/g, '""')}"`;
  }).join(",")));
  return lines.join("\n");
}
function download(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

$("openAdmin").addEventListener("click", () => {
  ["step-form", "step-quiz", "step-wrong", "step-scratch", "step-done"].forEach(hide);
  show("step-admin");
});
$("unlockAdmin").addEventListener("click", () => {
  if ($("pin").value !== ADMIN_PIN) {
    $("pinError").classList.remove("hidden");
    return;
  }
  $("pinError").classList.add("hidden");
  hide("adminLock");
  show("adminData");
  renderReport();
});
$("exportCsv").addEventListener("click", () => download("eys-147-redemptions.csv", toCsv(), "text/csv"));
$("exportJson").addEventListener("click", () => download("eys-147-redemptions.json", JSON.stringify(loadRows(), null, 2), "application/json"));
$("printReport").addEventListener("click", () => window.print());
