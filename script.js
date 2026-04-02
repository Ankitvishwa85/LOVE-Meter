/* =============================================
   LOVE METER — script.js
   ============================================= */

// ---- Language System ----
let currentLang = 'en';

const LANG = {
  en: {
    shakeNames:    "Please enter both names 💌",
    shakeDob:      "Please enter Date of Birth 📅",
    shakeAge:      "Age must be 18+ 🙏",
    ageLabel:      (age) => `🎂 Age: ${age} years`,
    ageWarn:       (age) => `⚠️ Age ${age} — must be 18+`,
    commLabel:     "Communication",
    breakdown: {
      hobbies:   "Shared Hobbies",
      patience:  "Patience Match",
      lifestyle: "Lifestyle Sync",
      goals:     "Relationship Goals",
      relative:  "Not Related",
      comm:      "Communication",
    },
    results: [
      { min: 85, emoji: "🥰😍🎉💖✨", congrats: true,
        msg: (b,g) => `<strong>${b} & ${g}</strong> are an absolutely magical match! Your hearts beat in perfect harmony. The universe definitely had a plan when it brought you two together. This is a love story worth telling for generations! 🌟` },
      { min: 70, emoji: "😊💕🌸", congrats: true,
        msg: (b,g) => `<strong>${b} & ${g}</strong> share a beautiful bond with great compatibility! A few differences make the relationship exciting. Nurture this love — it has all the ingredients to last a lifetime! 💫` },
      { min: 55, emoji: "🤗💛", congrats: false,
        msg: (b,g) => `<strong>${b} & ${g}</strong> have a decent foundation. With open communication and compromise, this relationship can truly flourish. Love is a journey — enjoy every step! 🌻` },
      { min: 35, emoji: "🤔💭", congrats: false,
        msg: (b,g) => `<strong>${b} & ${g}</strong> have some differences to work through. That's okay! Focus on understanding each other deeply and your bond will strengthen. 💪` },
      { min: 0,  emoji: "😅🌈", congrats: false,
        msg: (b,g) => `<strong>${b} & ${g}</strong> may face some challenges. But real love is about accepting differences and choosing each other every single day. ❤️` },
    ]
  },
  hi: {
    shakeNames:    "कृपया दोनों के नाम डालें 💌",
    shakeDob:      "कृपया जन्म तिथि डालें 📅",
    shakeAge:      "उम्र 18+ होनी चाहिए 🙏",
    ageLabel:      (age) => `🎂 उम्र: ${age} साल`,
    ageWarn:       (age) => `⚠️ उम्र ${age} — 18+ होनी चाहिए`,
    commLabel:     "बातचीत / मुलाकात",
    breakdown: {
      hobbies:   "साझा शौक",
      patience:  "धैर्य मिलान",
      lifestyle: "जीवनशैली",
      goals:     "रिश्ते का लक्ष्य",
      relative:  "रिश्तेदार नहीं",
      comm:      "बातचीत / मुलाकात",
    },
    results: [
      { min: 85, emoji: "🥰😍🎉💖✨", congrats: true,
        msg: (b,g) => `<strong>${b} और ${g}</strong> का रिश्ता बेहद खास है! दोनों के दिल एक ही धड़कन पर चलते हैं। यह प्रेम कहानी पीढ़ियों तक याद रहेगी! 🌟` },
      { min: 70, emoji: "😊💕🌸", congrats: true,
        msg: (b,g) => `<strong>${b} और ${g}</strong> का रिश्ता बहुत सुंदर है! थोड़े-थोड़े अंतर रिश्ते को रोमांचक बनाते हैं। इस प्यार को संजोकर रखें! 💫` },
      { min: 55, emoji: "🤗💛", congrats: false,
        msg: (b,g) => `<strong>${b} और ${g}</strong> की नींव अच्छी है। खुलकर बात करें और समझदारी से काम लें — यह रिश्ता जरूर खिलेगा! 🌻` },
      { min: 35, emoji: "🤔💭", congrats: false,
        msg: (b,g) => `<strong>${b} और ${g}</strong> के बीच कुछ मतभेद हैं। घबराएं नहीं! एक-दूसरे को समझने की कोशिश करें। 💪` },
      { min: 0,  emoji: "😅🌈", congrats: false,
        msg: (b,g) => `<strong>${b} और ${g}</strong> के सामने कुछ चुनौतियां हैं। लेकिन सच्चा प्यार हर दिन एक-दूसरे को चुनने में है। ❤️` },
    ]
  }
};

function setLang(lang) {
  currentLang = lang;
  document.getElementById('langEN').classList.toggle('active', lang === 'en');
  document.getElementById('langHI').classList.toggle('active', lang === 'hi');

  // Update all elements with data-en / data-hi text
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
    el.textContent = el.getAttribute('data-' + lang);
  });

  // Update placeholders
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
  });

  // Update select options
  document.querySelectorAll('select option[data-en]').forEach(opt => {
    opt.textContent = opt.getAttribute('data-' + lang);
  });
}

// ---- SVG Gradient Injection ----
const svgNS = "http://www.w3.org/2000/svg";
function injectSVGGradient() {
  const svg = document.querySelector(".meter-svg");
  if (!svg) return;
  const defs = document.createElementNS(svgNS, "defs");
  const grad = document.createElementNS(svgNS, "linearGradient");
  grad.setAttribute("id", "meterGrad");
  grad.setAttribute("x1", "0%"); grad.setAttribute("y1", "0%");
  grad.setAttribute("x2", "100%"); grad.setAttribute("y2", "0%");
  const stops = [
    { offset: "0%",   color: "#6ec6f5" },
    { offset: "50%",  color: "#e8609a" },
    { offset: "100%", color: "#f5c842" }
  ];
  stops.forEach(s => {
    const stop = document.createElementNS(svgNS, "stop");
    stop.setAttribute("offset", s.offset);
    stop.setAttribute("stop-color", s.color);
    grad.appendChild(stop);
  });
  defs.appendChild(grad);
  svg.insertBefore(defs, svg.firstChild);
}

// ---- Floating Background Hearts ----
function createBgHearts() {
  const container = document.getElementById("bgHearts");
  const emojis = ["💖", "💕", "🌹", "💗", "✨", "💓", "💞", "🌸"];
  for (let i = 0; i < 22; i++) {
    const el = document.createElement("span");
    el.className = "fheart";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.setProperty("--lx", Math.random() * 100 + "%");
    el.style.setProperty("--dur", (6 + Math.random() * 8) + "s");
    el.style.setProperty("--delay", (Math.random() * 10) + "s");
    container.appendChild(el);
  }
}

// ---- Hobby Chip Toggle ----
function initChips() {
  document.querySelectorAll(".hobby-chips").forEach(group => {
    group.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => chip.classList.toggle("selected"));
    });
  });
}

// ---- Toggle Pill ----
function initToggles() {
  document.querySelectorAll(".toggle-pill").forEach(pill => {
    pill.querySelectorAll(".pill-opt").forEach(opt => {
      opt.addEventListener("click", () => {
        pill.querySelectorAll(".pill-opt").forEach(o => o.classList.remove("active"));
        opt.classList.add("active");
        pill.dataset.val = opt.dataset.choice;
      });
    });
  });
}

// ---- DOB → Age Calculator ----
function calcAge(dob) {
  if (!dob) return null;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function initDOBFields() {
  [["boyDob", "boyAgeDisplay"], ["girlDob", "girlAgeDisplay"]].forEach(([id, dispId]) => {
    const input = document.getElementById(id);
    const display = document.getElementById(dispId);
    // Set max date to today
    input.max = new Date().toISOString().split("T")[0];
    input.addEventListener("change", () => {
      const age = calcAge(input.value);
      if (age === null) { display.textContent = ""; return; }
      if (age < 18) {
        display.textContent = LANG[currentLang].ageWarn(age);
        display.style.color = "#f5c842";
      } else {
        display.textContent = LANG[currentLang].ageLabel(age);
        display.style.color = "var(--pink-light)";
      }
    });
  });
}

// ---- Range Slider Live Value ----
function initSliders() {
  [["boyPatience", "boyPatienceVal"], ["girlPatience", "girlPatienceVal"]].forEach(([id, valId]) => {
    const slider = document.getElementById(id);
    const display = document.getElementById(valId);
    slider.addEventListener("input", () => { display.textContent = slider.value; });
  });
}

// ---- Collect Hobbies ----
function getHobbies(groupId) {
  return [...document.querySelectorAll(`#${groupId} .chip.selected`)]
    .map(c => c.dataset.val);
}

// ---- Score Calculation ----
function calcScore(data) {
  let total = 0;
  const breakdown = {};

  // 1. Hobbies match (0-25)
  const common = data.boyHobbies.filter(h => data.girlHobbies.includes(h));
  const hobbyScore = Math.min(25, common.length * 5 + (data.boyHobbies.length > 0 && data.girlHobbies.length > 0 ? 5 : 0));
  breakdown.hobbies = { label: "Shared Hobbies", score: hobbyScore, max: 25, color: "#e8609a" };
  total += hobbyScore;

  // 2. Patience compatibility (0-20)
  const patienceDiff = Math.abs(data.boyPatience - data.girlPatience);
  const patienceScore = Math.round((1 - patienceDiff / 9) * 20);
  breakdown.patience = { label: "Patience Match", score: patienceScore, max: 20, color: "#a78bfa" };
  total += patienceScore;

  // 3. Drinking & smoking compatibility (0-20)
  let lifestyleScore = 0;
  if (data.boyDrinks === data.girlDrinks) lifestyleScore += 10;
  if (data.boySmoking === data.girlSmoking) lifestyleScore += 10;
  breakdown.lifestyle = { label: "Lifestyle Sync", score: lifestyleScore, max: 20, color: "#6ec6f5" };
  total += lifestyleScore;

  // 4. Relationship goal match (0-20)
  let goalScore = 0;
  if (data.boyRelGoal && data.girlRelGoal) {
    if (data.boyRelGoal === data.girlRelGoal) goalScore = 20;
    else if (
      (data.boyRelGoal === "marriage" && data.girlRelGoal === "longterm") ||
      (data.boyRelGoal === "longterm" && data.girlRelGoal === "marriage")
    ) goalScore = 14;
    else goalScore = 6;
  }
  breakdown.goals = { label: "Relationship Goals", score: goalScore, max: 20, color: "#f5c842" };
  total += goalScore;

  // 5. Relative check — if relatives, reduce score heavily
  const isRelative = data.boyRelative === "yes" || data.girlRelative === "yes";
  let relativeScore = isRelative ? 0 : 15;
  breakdown.relative = { label: "Not Related", score: relativeScore, max: 15, color: "#f4a0c5" };
  total += relativeScore;

  // 6. Communication / Meeting frequency (0-10)
  const commScoreMap = { daily: 10, weekly: 8, biweekly: 6, monthly: 4, rarely: 1, longdistance: 3, "": 5 };
  const boyComm  = commScoreMap[data.boyCommFreq]  ?? 5;
  const girlComm = commScoreMap[data.girlCommFreq] ?? 5;
  const commScore = Math.round((boyComm + girlComm) / 2);
  breakdown.comm = { label: LANG[currentLang].breakdown.comm, score: commScore, max: 10, color: "#34d399" };
  total += commScore;

  // Update breakdown labels to current language
  breakdown.hobbies.label  = LANG[currentLang].breakdown.hobbies;
  breakdown.patience.label = LANG[currentLang].breakdown.patience;
  breakdown.lifestyle.label= LANG[currentLang].breakdown.lifestyle;
  breakdown.goals.label    = LANG[currentLang].breakdown.goals;
  breakdown.relative.label = LANG[currentLang].breakdown.relative;
  const avgYears = (parseFloat(data.boyRelYear) || 0 + parseFloat(data.girlRelYear) || 0) / 2;
  if (avgYears >= 3) total = Math.min(100, total + 5);

  // Bonus: Age compatibility
  const ageDiff = Math.abs(data.boyAge - data.girlAge);
  if (ageDiff <= 3) total = Math.min(100, total + 5);
  else if (ageDiff > 12) total = Math.max(0, total - 5);

  // If relatives, cap score at 30 max
  if (isRelative) total = Math.min(total, 30);

  return { percent: Math.min(100, Math.max(0, Math.round(total))), breakdown };
}

// ---- Result Messages ----
function getResult(percent, boyName, girlName) {
  const results = LANG[currentLang].results;
  for (const r of results) {
    if (percent >= r.min) {
      return { emoji: r.emoji, msg: r.msg(boyName, girlName), congrats: r.congrats };
    }
  }
}

// ---- Animate Meter ----
function animateMeter(percent) {
  const fill   = document.getElementById("meterFill");
  const display = document.getElementById("meterPercent");
  const total  = 251; // half-circle perimeter
  const offset = total - (total * percent / 100);

  setTimeout(() => {
    fill.style.strokeDashoffset = offset;
  }, 100);

  // count-up
  let current = 0;
  const step = Math.ceil(percent / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, percent);
    display.textContent = current + "%";
    if (current >= percent) clearInterval(timer);
  }, 25);
}

// ---- Render Breakdown ----
function renderBreakdown(breakdown) {
  const container = document.getElementById("resultBreakdown");
  container.innerHTML = "";
  let idx = 0;
  for (const key in breakdown) {
    const item = breakdown[key];
    const pct  = Math.round((item.score / item.max) * 100);
    const delay = (idx * 0.15).toFixed(2) + "s";

    const div = document.createElement("div");
    div.className = "breakdown-item";
    div.innerHTML = `
      <label>${item.label}</label>
      <div class="breakdown-bar-bg">
        <div class="breakdown-bar-fill" style="--delay:${delay}; background:${item.color}; width:0%"></div>
      </div>
      <div class="breakdown-score">${item.score}/${item.max}</div>
    `;
    container.appendChild(div);

    setTimeout(() => {
      div.querySelector(".breakdown-bar-fill").style.width = pct + "%";
    }, 300 + idx * 120);
    idx++;
  }
}

// ---- Confetti ----
function launchConfetti() {
  const zone = document.getElementById("confettiZone");
  zone.innerHTML = "";
  const colors = ["#e8609a", "#f5c842", "#6ec6f5", "#a78bfa", "#f4a0c5", "#ffffff"];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.setProperty("--cx", Math.random() * 100 + "%");
    piece.style.setProperty("--cdur", (2 + Math.random() * 2.5) + "s");
    piece.style.setProperty("--cdelay", (Math.random() * 1.5) + "s");
    piece.style.setProperty("--cc", colors[Math.floor(Math.random() * colors.length)]);
    piece.style.setProperty("--crot", Math.random() * 360 + "deg");
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    zone.appendChild(piece);
  }
}

// ---- Main Validate & Calculate ----
function calculate() {
  const boyName  = document.getElementById("boyName").value.trim();
  const girlName = document.getElementById("girlName").value.trim();
  const boyDob   = document.getElementById("boyDob").value;
  const girlDob  = document.getElementById("girlDob").value;
  const boyAge   = calcAge(boyDob);
  const girlAge  = calcAge(girlDob);

  if (!boyName || !girlName) {
    shakeBtn(LANG[currentLang].shakeNames);
    return;
  }
  if (!boyDob || !girlDob) {
    shakeBtn(LANG[currentLang].shakeDob);
    return;
  }
  if (boyAge < 18 || girlAge < 18) {
    shakeBtn(LANG[currentLang].shakeAge);
    return;
  }

  const data = {
    boyName, girlName, boyAge, girlAge,
    boyHobbies:  getHobbies("boyHobbies"),
    girlHobbies: getHobbies("girlHobbies"),
    boyPatience:  parseInt(document.getElementById("boyPatience").value),
    girlPatience: parseInt(document.getElementById("girlPatience").value),
    boyDrinks:   document.getElementById("boyDrinks").dataset.val,
    girlDrinks:  document.getElementById("girlDrinks").dataset.val,
    boySmoking:  document.getElementById("boySmoking").dataset.val,
    girlSmoking: document.getElementById("girlSmoking").dataset.val,
    boyRelGoal:  document.getElementById("boyRelGoal").value,
    girlRelGoal: document.getElementById("girlRelGoal").value,
    boyRelative: document.getElementById("boyRelative").dataset.val,
    girlRelative:document.getElementById("girlRelative").dataset.val,
    boyCommFreq: document.getElementById("boyCommFreq").value,
    girlCommFreq:document.getElementById("girlCommFreq").value,
    boyRelYear:  document.getElementById("boyRelYear").value,
    girlRelYear: document.getElementById("girlRelYear").value,
  };

  const { percent, breakdown } = calcScore(data);
  const result = getResult(percent, boyName, girlName);

  // Show section
  const section = document.getElementById("resultSection");
  section.classList.add("visible");
  section.scrollIntoView({ behavior: "smooth", block: "start" });

  // Animate
  animateMeter(percent);
  renderBreakdown(breakdown);

  // Names
  document.getElementById("resultNames").innerHTML =
    `${boyName} <span style="color:var(--pink)">❤</span> ${girlName}`;

  // Emoji
  const emojiEl = document.getElementById("resultEmoji");
  emojiEl.textContent = result.emoji;
  emojiEl.style.animation = "none";
  void emojiEl.offsetWidth;
  emojiEl.style.animation = "emojiPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both";

  // Message
  document.getElementById("resultMessage").innerHTML = result.msg;

  // Confetti if high score
  if (result.congrats) {
    setTimeout(launchConfetti, 600);
  } else {
    document.getElementById("confettiZone").innerHTML = "";
  }
}

// ---- Shake btn on error ----
function shakeBtn(msg) {
  const btn = document.getElementById("calcBtn");
  btn.style.animation = "none";
  btn.classList.add("shake");
  btn.querySelector(".btn-text").textContent = "⚠️ " + msg;
  setTimeout(() => {
    btn.classList.remove("shake");
    btn.querySelector(".btn-text").textContent = "✨ Calculate Love Score";
  }, 2200);
}

// ---- Shake keyframes (injected) ----
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  .shake { animation: shakeFn 0.5s cubic-bezier(.36,.07,.19,.97) both !important; }
  @keyframes shakeFn {
    10%, 90% { transform: translateX(-3px); }
    20%, 80% { transform: translateX(5px); }
    30%, 50%, 70% { transform: translateX(-7px); }
    40%, 60% { transform: translateX(7px); }
  }
`;
document.head.appendChild(shakeStyle);

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  injectSVGGradient();
  createBgHearts();
  initChips();
  initToggles();
  initSliders();
  initDOBFields();
  document.getElementById("calcBtn").addEventListener("click", calculate);
});