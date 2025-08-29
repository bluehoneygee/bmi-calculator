const els = {
  formBox: document.getElementById("formBox"),
  resultBox: document.getElementById("resultBox"),
  w: document.getElementById("weight"),
  h: document.getElementById("height"),
  errW: document.getElementById("errW"),
  errH: document.getElementById("errH"),
  btn: document.getElementById("calcBtn"),
  again: document.getElementById("againBtn"),
  bmiVal: document.getElementById("bmiVal"),
  needle: document.getElementById("needle"),
  badge: document.getElementById("badge"),
  meta: document.getElementById("meta"),
  advice: document.getElementById("advice"),
  tip: document.getElementById("tip"),
  hShow: document.getElementById("hShow"),
  range: document.getElementById("range"),
  delta: document.getElementById("delta"),
  ticks: document.getElementById("ticks"),
  gsvg: document.getElementById("gsvg"),
};

const fmt = (n) => Number(n).toFixed(1);

function validateField(input, min, max) {
  const v = input.value.trim();
  if (!v) return { ok: false, msg: "Required." };
  const num = Number(v);
  if (Number.isNaN(num)) return { ok: false, msg: "Enter a valid number." };
  if (num < min || num > max)
    return { ok: false, msg: `Must be between ${min}–${max}.` };
  return { ok: true, msg: "" };
}
function updateValidity() {
  const vw = validateField(els.w, 20, 300);
  const vh = validateField(els.h, 80, 250);
  els.errW.textContent = vw.msg;
  els.errH.textContent = vh.msg;
  els.btn.disabled = !(vw.ok && vh.ok);
}
els.w.addEventListener("input", updateValidity);
els.h.addEventListener("input", updateValidity);

els.btn.addEventListener("click", () => {
  const vw = validateField(els.w, 20, 300);
  const vh = validateField(els.h, 80, 250);
  if (!(vw.ok && vh.ok)) return;
  compute();
});
els.again.addEventListener("click", () => {
  els.resultBox.classList.add("hide");
  els.formBox.classList.remove("hide");
  setNeedle(0);
  updateValidity();
});

function compute() {
  const w = Number(els.w.value);
  const hcm = Number(els.h.value);
  const m = hcm / 100;
  const bmi = w / (m * m);
  const b = Number(fmt(bmi));

  els.formBox.classList.add("hide");
  els.resultBox.classList.remove("hide");

  setNeedle(angleFromBmi(b));
  els.bmiVal.textContent = fmt(b);
  els.meta.textContent = `${fmt(w)} kg | ${fmt(hcm)} cm`;

  let cat = "",
    cls = "";
  if (b < 18.5) {
    cat = "Underweight";
    cls = "under";
  } else if (b < 25) {
    cat = "Normal";
    cls = "normal";
  } else if (b < 30) {
    cat = "Overweight";
    cls = "over";
  } else {
    cat = "Obese";
    cls = "obese";
  }
  els.badge.className = `badge ${cls}`;
  els.badge.textContent = cat;
  els.badge.style.display = "inline-flex";

  const minW = 18.5 * m * m,
    maxW = 24.9 * m * m;
  els.hShow.textContent = fmt(hcm);
  els.range.textContent = `${fmt(minW)} kg – ${fmt(maxW)} kg`;
  const over = w - maxW,
    under = minW - w;

  if (over > 0) {
    els.delta.style.display = "inline-block";
    els.delta.textContent = `+${fmt(over)} kg now`;
    els.tip.textContent =
      "👍 Time to start taking steps toward your target weight.";
  } else if (under > 0) {
    els.delta.style.display = "inline-block";
    els.delta.textContent = `-${fmt(under)} kg (under)`;
    els.tip.textContent =
      "💡 Your weight is below ideal. Consider increasing healthy calories & strength training.";
  } else {
    els.delta.style.display = "none";
    els.tip.textContent =
      "🥳 Keep a balanced diet & regular activity to maintain your ideal weight.";
  }
  els.advice.style.display = "block";
}

function angleFromBmi(b) {
  const MIN = 17,
    MAX = 40;
  if (b < MIN) b = MIN;
  if (b > MAX) b = MAX;
  return ((b - MIN) / (MAX - MIN)) * 180 - 90;
}
function setNeedle(a) {
  els.needle.style.transform = `translate(-50%,0) rotate(${a}deg)`;
}
function angleSvgFromBmi(b) {
  return angleFromBmi(b) + 270; // to absolute 180..360
}

(function () {
  const cx = 150,
    cy = 150,
    R = 120,
    STROKE = 44;
  const marks = [17, 18.5, 25, 30, 35, 40];
  const colors = ["#1f69e0", "#56c271", "#ffd042", "#f59a2f", "#e53a32"];

  const rad = (d) => (d * Math.PI) / 180;
  const pt = (deg) => ({
    x: cx + R * Math.cos(rad(deg)),
    y: cy + R * Math.sin(rad(deg)),
  });
  const arc = (a1, a2) => {
    const delta = (a2 - a1 + 360) % 360;
    const large = delta > 180 ? 1 : 0;
    const p1 = pt(a1),
      p2 = pt(a2);
    return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${large} 1 ${p2.x} ${p2.y}`;
  };

  const degs = marks.map(angleSvgFromBmi);
  const segs = [
    [degs[0], degs[1]],
    [degs[1], degs[2]],
    [degs[2], degs[3]],
    [degs[3], degs[4]],
    [degs[4], degs[5]],
  ];
  segs.forEach((pair, i) => {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", arc(pair[0], pair[1]));
    p.setAttribute("stroke", colors[i]);
    p.setAttribute("stroke-width", STROKE);
    p.setAttribute("fill", "none");
    p.setAttribute("class", "seg");
    p.setAttribute("stroke-linecap", "round");
    els.gsvg.appendChild(p);
  });

  const tickBmi = [17, 18.5, 25, 30, 35, 40];
  tickBmi.forEach((v) => {
    const a = angleFromBmi(v);
    const d = document.createElement("div");
    d.className = "tick";
    d.style.transform = `translate(-50%,0) rotate(${a}deg)`;
    const s = document.createElement("span");
    s.style.setProperty("--rot", a + "deg");
    s.textContent = String(v);
    d.appendChild(s);
    els.ticks.appendChild(d);
  });
})();

setNeedle(0);
updateValidity();
