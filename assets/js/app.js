/* Youパパ school — フィルタ / 進捗(localStorage) / ナビ */
(function () {
  "use strict";
  var STEPS = [
    { key: "s1", name: "STEP1 リサーチ", file: "step1.html", total: 5 },
    { key: "s2", name: "STEP2 商品",   file: "step2.html", total: 5 },
    { key: "s3", name: "STEP3 販売",   file: "step3.html", total: 7 },
    { key: "s4", name: "STEP4 集客",   file: "step4.html", total: 5 }
  ];
  var GRAND = STEPS.reduce(function (s, x) { return s + x.total; }, 0);
  var LSKEY = "yps:checks";

  function load() {
    try { return JSON.parse(localStorage.getItem(LSKEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(o) { try { localStorage.setItem(LSKEY, JSON.stringify(o)); } catch (e) {} }
  function stepDone(state, st) {
    var c = 0;
    for (var i = 1; i <= st.total; i++) { if (state[st.key + "-" + i]) c++; }
    return c;
  }
  function grandDone(state) {
    return STEPS.reduce(function (s, st) { return s + stepDone(state, st); }, 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var state = load();

    /* --- theme toggle (light/dark) --- */
    var THKEY = "yps:theme";
    var root = document.documentElement;
    function currentTheme() {
      return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    }
    function paintToggle(btn) {
      var dark = currentTheme() === "dark";
      btn.textContent = dark ? "☀️" : "🌙";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.title = dark ? "ライトモードに切替" : "ダークモードに切替";
    }
    var tBtn = document.querySelector(".theme-toggle");
    if (tBtn) {
      paintToggle(tBtn);
      tBtn.addEventListener("click", function () {
        var next = currentTheme() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(THKEY, next); } catch (e) {}
        paintToggle(tBtn);
      });
    }
    /* OS変更追従（手動選択が未保存のときだけ） */
    try {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onMq = function (e) {
        if (localStorage.getItem(THKEY)) return;
        root.setAttribute("data-theme", e.matches ? "dark" : "light");
        if (tBtn) paintToggle(tBtn);
      };
      if (mq.addEventListener) mq.addEventListener("change", onMq);
      else if (mq.addListener) mq.addListener(onMq);
    } catch (e) {}

    /* --- resume / next-step CTA（進捗連動の「次にやること」） --- */
    function nextLesson(st0) {
      for (var i = 0; i < STEPS.length; i++) {
        if (stepDone(st0, STEPS[i]) < STEPS[i].total) return { st: STEPS[i], idx: i };
      }
      return null;
    }
    (function () {
      var anyProgress = grandDone(state) > 0;
      var nx = nextLesson(state);
      document.querySelectorAll("[data-resume]").forEach(function (a) {
        var base = a.getAttribute("data-base") || "lessons/";
        if (!nx) {
          a.href = base + "pitfalls.html";
          a.textContent = "全レッスン完了 — 補講と見直しへ →";
        } else if (anyProgress && nx.idx > 0) {
          a.href = base + nx.st.file;
          a.textContent = "続きから：" + nx.st.name + " →";
        } else {
          a.href = base + nx.st.file;
          a.textContent = nx.idx === 0
            ? "STEP1から無料で始める →"
            : nx.st.name + " から始める →";
        }
      });
      document.querySelectorAll("[data-resume-hint]").forEach(function (h) {
        if (anyProgress) {
          h.hidden = false;
          h.textContent = "前回の進捗から再開できます（この端末に保存）";
        }
      });
    })();

    /* --- mobile: header nav + lesson toc --- */
    var toggle = document.querySelector(".menu-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var nav = document.querySelector(".nav");
        var toc = document.querySelector(".toc");
        if (toc) toc.classList.toggle("open");
        else if (nav) nav.classList.toggle("open");
      });
    }

    /* --- active nav (by data-nav vs body[data-page]) --- */
    var page = document.body.getAttribute("data-page");
    document.querySelectorAll(".nav a[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });

    /* --- course catalog filter (index) --- */
    var cards = document.querySelectorAll(".course-card[data-level]");
    if (cards.length) {
      var sel = { level: "all", cat: "all" };
      var chips = document.querySelectorAll(".chip[data-group]");
      var emptyNote = document.querySelector(".empty-note");
      function apply() {
        var shown = 0;
        cards.forEach(function (c) {
          var okL = sel.level === "all" || c.getAttribute("data-level") === sel.level;
          var okC = sel.cat === "all" || c.getAttribute("data-cat") === sel.cat;
          if (okL && okC) { c.classList.remove("is-hidden"); shown++; }
          else c.classList.add("is-hidden");
        });
        if (emptyNote) emptyNote.style.display = shown ? "none" : "block";
      }
      chips.forEach(function (ch) {
        ch.addEventListener("click", function () {
          var g = ch.getAttribute("data-group");
          document.querySelectorAll('.chip[data-group="' + g + '"]')
            .forEach(function (x) { x.classList.remove("active"); });
          ch.classList.add("active");
          sel[g] = ch.getAttribute("data-value");
          apply();
        });
      });
      var reset = document.querySelector(".filter-reset");
      if (reset) reset.addEventListener("click", function () {
        sel = { level: "all", cat: "all" };
        chips.forEach(function (x) {
          x.classList.toggle("active", x.getAttribute("data-value") === "all");
        });
        apply();
      });
      apply();
    }

    /* --- lesson checklists + progress --- */
    var boxes = document.querySelectorAll(".checklist input[type=checkbox]");
    boxes.forEach(function (b) {
      if (state[b.id]) b.checked = true;
      b.addEventListener("change", function () {
        if (b.checked) state[b.id] = true; else delete state[b.id];
        save(state); refresh();
      });
    });

    function refresh() {
      var pill = document.querySelector("[data-page-progress]");
      if (pill) {
        var d = 0; boxes.forEach(function (b) { if (b.checked) d++; });
        pill.textContent = "このレッスンの進捗  " + d + " / " + boxes.length;
      }
      var gd = grandDone(state);
      var pctAll = Math.round((gd / GRAND) * 100);
      var fill = document.querySelector(".progress-fill");
      if (fill) fill.style.width = pctAll + "%";
      var lbl = document.querySelector("[data-progress-label]");
      if (lbl) lbl.textContent = "コース達成 " + pctAll + "% (" + gd + "/" + GRAND + ")";

      document.querySelectorAll(".toc nav a, .curriculum li").forEach(function (el) {
        var href = el.tagName === "A" ? el.getAttribute("href")
                 : (el.querySelector("a") && el.querySelector("a").getAttribute("href"));
        if (!href) return;
        var fname = href.split("/").pop();
        var st = STEPS.filter(function (s) { return s.file === fname; })[0];
        if (st && stepDone(state, st) === st.total) el.classList.add("done");
        else el.classList.remove("done");
      });

      var dash = document.querySelector("[data-dashboard]");
      if (dash) {
        dash.innerHTML = "";
        STEPS.forEach(function (st) {
          var dn = stepDone(state, st), p = Math.round((dn / st.total) * 100);
          var cell = document.createElement("a");
          cell.href = "../lessons/" + st.file;
          cell.className = "cell" + (p === 100 ? " complete" : "");
          cell.innerHTML = '<div class="pct">' + p + '%</div><div class="nm">' +
            st.name + "<br>" + dn + " / " + st.total + "</div>";
          dash.appendChild(cell);
        });
      }
    }
    refresh();
  });
})();
