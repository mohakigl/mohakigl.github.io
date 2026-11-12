(function () {
  "use strict";

  var data = window.PORTFOLIO;
  if (!data) return;

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var TYPE_NAMES = { job: "Job", achievement: "Achievement", experience: "Experience" };
  var state = { type: "all", skill: null };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "className") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function safeUrl(url) {
    return /^(https?:|mailto:|#|[\w./-]+$)/i.test(url || "") ? url : "#";
  }

  function formatDate(value) {
    if (!value) return "";
    if (value === "present") return "Present";
    var parts = String(value).split("-");
    return parts[1] ? MONTHS[parseInt(parts[1], 10) - 1] + " " + parts[0] : parts[0];
  }

  function sortKey(entry) {
    var p = String(entry.start || "0").split("-");
    return parseInt(p[0], 10) * 100 + (p[1] ? parseInt(p[1], 10) : 0);
  }

  /* ---------- Hero and links ---------- */
  function renderHero() {
    document.getElementById("name").textContent = data.name || "";
    document.getElementById("headline").textContent = data.headline || "";
    document.getElementById("now").textContent = data.now || "";
    document.getElementById("summary").textContent = data.summary || "";
    if (data.name) document.title = data.name + " — Portfolio";
    if (data.sample) document.getElementById("sample-note").hidden = false;

    ["links", "links-footer"].forEach(function (id) {
      var nav = document.getElementById(id);
      (data.links || []).forEach(function (link, i) {
        var a = el("a", { href: safeUrl(link.url), text: link.label });
        if (i === 0) a.className = "primary";
        if (/^https?:/i.test(link.url)) { a.target = "_blank"; a.rel = "noopener"; }
        nav.appendChild(a);
      });
    });
  }

  /* ---------- Skills ---------- */
  function skillCount(skill) {
    return (data.entries || []).filter(function (e) {
      return (e.skills || []).indexOf(skill) !== -1;
    }).length;
  }

  function renderSkills() {
    var wrap = document.getElementById("skill-groups");
    (data.skills || []).forEach(function (group) {
      var chips = el("div", { className: "chips" });
      group.items.forEach(function (skill) {
        var n = skillCount(skill);
        var btn = el("button", {
          type: "button",
          className: "chip",
          "aria-pressed": "false",
          "data-skill": skill
        }, [
          el("span", { text: skill }),
          el("span", { className: "count", text: String(n), "aria-label": n + (n === 1 ? " entry" : " entries") })
        ]);
        if (n === 0) btn.disabled = true;
        btn.addEventListener("click", function () {
          state.skill = state.skill === skill ? null : skill;
          update();
        });
        chips.appendChild(btn);
      });
      wrap.appendChild(el("div", { className: "skill-group" }, [
        el("h3", { text: group.group }),
        chips
      ]));
    });
  }

  /* ---------- Timeline ---------- */
  function renderTimeline() {
    var list = document.getElementById("timeline");
    var entries = (data.entries || []).slice().sort(function (a, b) { return sortKey(b) - sortKey(a); });
    var years = {};
    var order = [];

    entries.forEach(function (entry) {
      var y = String(entry.start || "").slice(0, 4);
      if (!years[y]) { years[y] = []; order.push(y); }
      years[y].push(entry);
    });

    order.forEach(function (y) {
      var items = el("ol", { className: "year-entries" });
      years[y].forEach(function (entry) { items.appendChild(renderEntry(entry)); });
      list.appendChild(el("li", { className: "year" }, [
        el("div", { className: "year-label", text: y }),
        items
      ]));
    });

    list.appendChild(el("li", { className: "empty", id: "empty", text: "Nothing matches these filters. Pick another type or clear the skill.", hidden: "" }));
  }

  function renderEntry(entry) {
    var dates = formatDate(entry.start) + (entry.end ? " – " + formatDate(entry.end) : "");
    var li = el("li", { className: "entry", "data-type": entry.type });
    li._skills = entry.skills || [];

    li.appendChild(el("p", { className: "entry-meta", text: (TYPE_NAMES[entry.type] || "") + ", " + dates }));

    var title = el("h3", { text: entry.title });
    if (entry.org) {
      title.appendChild(document.createTextNode(" "));
      title.appendChild(el("span", { className: "org", text: "at " + entry.org }));
    }
    li.appendChild(title);

    if (entry.summary) li.appendChild(el("p", { className: "entry-summary", text: entry.summary }));

    if (entry.details && entry.details.length) {
      var ul = el("ul");
      entry.details.forEach(function (d) { ul.appendChild(el("li", { text: d })); });
      li.appendChild(el("details", null, [el("summary", { text: "Show details" }), ul]));
    }

    if (li._skills.length) {
      var skills = el("ul", { className: "entry-skills", "aria-label": "Skills used" });
      li._skills.forEach(function (s) { skills.appendChild(el("li", { text: s, "data-skill": s })); });
      li.appendChild(skills);
    }
    return li;
  }

  /* ---------- Filters and highlighting ---------- */
  function update() {
    var visible = 0;
    var matches = 0;

    document.querySelectorAll(".filters button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.type === state.type));
    });
    document.querySelectorAll(".chip").forEach(function (c) {
      c.setAttribute("aria-pressed", String(c.dataset.skill === state.skill));
    });

    document.querySelectorAll(".year").forEach(function (year) {
      var shown = 0;
      year.querySelectorAll(".entry").forEach(function (entry) {
        var typeOk = state.type === "all" || entry.dataset.type === state.type;
        var hasSkill = state.skill && entry._skills.indexOf(state.skill) !== -1;
        entry.hidden = !typeOk;
        entry.classList.toggle("is-match", !!hasSkill);
        entry.classList.toggle("is-dim", !!state.skill && !hasSkill);
        entry.querySelectorAll(".entry-skills li").forEach(function (s) {
          s.classList.toggle("on", s.dataset.skill === state.skill);
        });
        if (typeOk) { shown++; visible++; if (hasSkill) matches++; }
      });
      year.hidden = shown === 0;
    });

    document.getElementById("empty").hidden = visible > 0;

    var status = document.getElementById("status");
    status.textContent = "";
    if (state.skill) {
      status.appendChild(document.createTextNode(
        matches + (matches === 1 ? " entry uses " : " entries use ") + state.skill + "."
      ));
      var clear = el("button", { type: "button", text: "Clear skill" });
      clear.addEventListener("click", function () { state.skill = null; update(); });
      status.appendChild(clear);
    }
  }

  document.querySelectorAll(".filters button").forEach(function (b) {
    b.addEventListener("click", function () { state.type = b.dataset.type; update(); });
  });

  renderHero();
  renderSkills();
  renderTimeline();
  update();
})();
