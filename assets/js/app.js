/* youpapa-school — サイドバー / 進捗(localStorage) / モバイル開閉 */
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
  function save(o) {
    try { localStorage.setItem(LSKEY, JSON.stringify(o)); } catch (e) {}
  }
  function stepDoneCount(state, step) {
    var c = 0;
    for (var i = 1; i <= step.total; i++) { if (state[step.key + "-" + i]) c++; }
    return c;
  }
  function grandDone(state) {
    return STEPS.reduce(function (s, st) { return s + stepDoneCount(state, st); }, 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var state = load();

    /* --- mobile sidebar toggle --- */
    var toggle = document.querySelector(".menu-toggle");
    var sidebar = document.querySelector(".sidebar");
    if (toggle && sidebar) {
      toggle.addEventListener("click", function () { sidebar.classList.toggle("open"); });
      sidebar.addEventListener("click", function (e) {
        if (e.target.tagName === "A") sidebar.classList.remove("open");
      });
    }

    /* --- active nav by current file --- */
    var here = (location.pathname.split("/").pop() || "index.html");
    if (here === "") here = "index.html";
    var navLinks = document.querySelectorAll(".sidebar nav a");
    navLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === here) a.classList.add("active");
    });

    /* --- restore checkboxes + wire change --- */
    var boxes = document.querySelectorAll(".checklist input[type=checkbox]");
    boxes.forEach(function (b) {
      if (state[b.id]) b.checked = true;
      b.addEventListener("change", function () {
        if (b.checked) state[b.id] = true; else delete state[b.id];
        save(state);
        refresh();
      });
    });

    function refresh() {
      /* page-level pill */
      var pill = document.querySelector("[data-page-progress]");
      if (pill) {
        var total = boxes.length;
        var done = 0;
        boxes.forEach(function (b) { if (b.checked) done++; });
        pill.textContent = "このSTEPの進捗  " + done + " / " + total;
      }
      /* header global strip */
      var gd = grandDone(state);
      var pctAll = Math.round((gd / GRAND) * 100);
      var fill = document.querySelector(".progress-fill");
      if (fill) fill.style.width = pctAll + "%";
      var lbl = document.querySelector("[data-progress-label]");
      if (lbl) lbl.textContent = "全体達成 " + pctAll + "% (" + gd + "/" + GRAND + ")";
      /* sidebar done marks */
      navLinks.forEach(function (a) {
        var href = a.getAttribute("href");
        var st = STEPS.filter(function (s) { return s.file === href; })[0];
        if (st && stepDoneCount(state, st) === st.total) a.classList.add("done");
        else a.classList.remove("done");
      });
      /* index dashboard */
      var dash = document.querySelector("[data-dashboard]");
      if (dash) {
        dash.innerHTML = "";
        STEPS.forEach(function (st) {
          var d = stepDoneCount(state, st);
          var p = Math.round((d / st.total) * 100);
          var cell = document.createElement("a");
          cell.href = st.file;
          cell.className = "cell" + (p === 100 ? " complete" : "");
          cell.innerHTML = '<div class="pct">' + p + '%</div><div class="nm">' +
            st.name + "<br>" + d + " / " + st.total + "</div>";
          dash.appendChild(cell);
        });
      }
    }
    refresh();
  });
})();
