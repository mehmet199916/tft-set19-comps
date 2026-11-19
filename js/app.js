(function () {
  'use strict';
  var C = window.TFT_COMPS, CH = window.TFT_CHEAT;
  if (!C || !CH) { document.body.insertAdjacentHTML('afterbegin', '<p style="padding:16px">Data files failed to load.</p>'); return; }
  var IMG = 'https://ap.tft.tools/img/s99/face/da_19_';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function $(id) { return document.getElementById(id); }
  function initials(n) { return n.replace(/\(.*\)/, '').split(/[\s'.&]+/).filter(Boolean).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase(); }

  var UNIT = {};
  CH.units.forEach(function (u) { UNIT[u.name] = u; });
  var ALL = C.early.concat(C.late, C.reroll), BYID = {};
  ALL.forEach(function (c) { BYID[c.id] = c; });
  function tabOf(id) { return id.charAt(0) === 'e' ? 'early' : id.charAt(0) === 'l' ? 'late' : 'reroll'; }
  function compHref(id) { return '#' + tabOf(id) + '/' + id; }

  $('data-gen').textContent = (C.source.generated || '').slice(0, 10);
  $('cheat-gen').textContent = 'PBE data from ' + (CH.source.generated || '').slice(0, 10) + '.';

  // ---------- shared pieces ----------
  function portrait(name, cls, extra) {
    var u = UNIT[name] || {}, cost = u.cost || 1, slug = u.slug || name.toLowerCase().replace(/[^a-z]/g, '');
    return '<span class="pt k' + cost + ' ' + (cls || '') + '" title="' + esc(name + ' (' + cost + ' gold)' + (u.unlock ? ' - unlock: ' + u.unlock : '')) + '">' +
      '<img src="' + IMG + slug + '.jpg?w=96" alt="' + esc(name) + '" width="96" height="96" loading="lazy" decoding="async" onerror="this.parentNode.classList.add(\'noimg\')">' +
      '<span class="ini" aria-hidden="true">' + initials(name) + '</span>' + (u.unlock ? '<span class="badge lock" aria-label="unlockable">&#128274;</span>' : '') + (extra || '') + '</span>';
  }
  function mini(names) { return '<span class="mini">' + names.map(function (n) { return portrait(n, 'sm'); }).join('') + '</span>'; }

  function hexBoard(b) {
    var grid = {};
    b.units.forEach(function (u) { grid[u.row + ':' + u.col] = u; });
    var rows = '';
    [3, 2, 1, 0].forEach(function (r, vi) {
      rows += '<div class="hrow' + (vi % 2 ? ' off' : '') + '">';
      for (var c = 0; c < 7; c++) {
        var u = grid[r + ':' + c];
        if (!u) { rows += '<span class="hex" aria-hidden="true"></span>'; continue; }
        rows += '<span class="hex filled k' + u.cost + '" data-unit="' + esc(u.name) + '" title="' + esc(u.name + ' (' + u.cost + 'g): ' + (u.active.length ? u.active.join(', ') : 'no active trait') + (u.unlock ? ' | unlock: ' + u.unlock : '')) + '">' +
          '<span class="in"><img src="' + IMG + u.slug + '.jpg?w=96" alt="' + esc(u.name) + '" width="96" height="96" loading="lazy" decoding="async" onerror="this.closest(\'.hex\').classList.add(\'noimg\')">' +
          '<span class="ini" aria-hidden="true">' + initials(u.name) + '</span></span>' +
          (u.star ? '<span class="tag' + (u.carry ? ' gold' : '') + '" title="3-star target">&#9733;&#9733;&#9733;</span>' : u.carry ? '<span class="tag gold">CARRY</span>' : '') +
          (u.unlock ? '<span class="lk">&#128274;</span>' : '') + '</span>';
      }
      rows += '</div>';
    });
    return '<div class="board-wrap"><div class="row-tags"><span>Front</span><span>Level ' + b.level + ' &middot; ' + b.n_units + ' units</span></div>' +
      '<div class="board" role="img" aria-label="Level ' + b.level + ' board: ' + esc(b.units.map(function (u) { return u.name; }).join(', ')) + '">' + rows + '</div>' +
      '<div class="row-tags"><span>Back</span><span></span></div></div>';
  }

  function traitPills(b) {
    return '<div class="traits" aria-label="Active traits">' + b.traits.map(function (t) {
      var tier = t.unique ? 'uq' : 't' + Math.min(4, t.tier);
      var pips = t.unique ? '' : '<span class="pips">' + t.bps.map(function (bp) { return '<span class="pip' + (t.c >= bp ? ' on' : '') + '"></span>'; }).join('') + '</span>';
      var next = t.bps.filter(function (x) { return x > t.c; })[0];
      var lab = t.unique ? '1' : t.c + (next ? '<span class="muted">/' + next + '</span>' : '');
      return '<button type="button" class="tp ' + tier + '" aria-pressed="false" data-units="' + esc(t.units.join('|')) +
        '" title="' + esc(t.t + ' ' + t.c + (t.unique ? '' : ' (breakpoints ' + t.bps.join('/') + ')') + ': ' + t.units.join(', ')) + '"><span class="nm">' + esc(t.t) + '</span><span class="ct">' + lab + '</span>' + pips + '</button>';
    }).join('') + b.near.map(function (n) { return '<span class="tp near" title="one unit away"><span class="nm">' + esc(n.t) + '</span><span class="ct">' + n.c + '&rarr;' + n.next + '</span></span>'; }).join('') + '</div>';
  }

  function boardPanel(b) {
    return '<div class="bp">' + hexBoard(b) +
      '<div class="stats"><span class="stat"><b>' + b.n_active + '</b> active traits</span><span class="stat">front <b>' + b.n_front + '</b> / back <b>' + b.n_back + '</b></span>' +
      '<span class="stat"><b>' + b.gold + '</b> gold of units</span>' + (b.unlockables.length ? '<span class="stat">&#128274; ' + esc(b.unlockables.join(', ')) + '</span>' : '') + '</div>' +
      traitPills(b) +
      '<div class="actions"><a class="btn" href="' + esc(b.link) + '" target="_blank" rel="noopener">Open in team builder &#8599;</a></div></div>';
  }

  function tabsFor(c, labels, def) {
    var tabs = '<div class="tabs" role="tablist" aria-label="Board level">' + c.boards.map(function (b, i) {
      return '<button type="button" class="tab" role="tab" id="t-' + c.id + '-' + i + '" aria-controls="p-' + c.id + '-' + i + '" aria-selected="' + (i === def) + '">' + labels[i] + '</button>';
    }).join('') + '</div>';
    return tabs + c.boards.map(function (b, i) { return '<div role="tabpanel" id="p-' + c.id + '-' + i + '" aria-labelledby="t-' + c.id + '-' + i + '"' + (i === def ? '' : ' hidden') + '>' + boardPanel(b) + '</div>'; }).join('');
  }

  function stageTable(st) {
    return '<table class="stage-table"><tbody>' + Object.keys(st || {}).map(function (k) { return '<tr><th scope="row">' + esc(k) + '</th><td>' + esc(st[k]) + '</td></tr>'; }).join('') + '</tbody></table>';
  }
  function itemsBlock(c) {
    return '<div class="items">' + portrait(c.carry, 'sm') + ' ' + (c.items || []).map(function (it, i) { return '<span class="item' + (i === 0 ? ' bis' : '') + '">' + esc(it) + '</span>'; }).join('') + '</div>' +
      (c.items2 ? '<p class="hint">' + esc(c.items2) + '</p>' : '') + (c.tank_items ? '<p class="hint">Tanks: ' + esc(c.tank_items) + '</p>' : '') + (c.emblem ? '<p class="hint">Emblem: ' + esc(c.emblem) + '</p>' : '');
  }

  function hero(c, pills) {
    var tagCls = c.tag === 'Combat' ? 'combat' : 'scaling';
    return '<div class="card-hero">' + portrait(c.carry, 'big', '<span class="badge carry">CARRY</span>') +
      '<div><h3>' + esc(c.name) + '</h3><div class="pills"><span class="pill ' + tagCls + '">' + esc(c.tag) + '</span>' + pills + '</div></div></div>';
  }

  function more(c) {
    var aug = c.augments ? '<div class="aug-grid">' + ['econ', 'combat', 'trait'].map(function (k) { return '<div class="aug"><b>' + (k === 'trait' ? 'Trait' : k === 'econ' ? 'Econ' : 'Combat') + '</b>' + esc((c.augments[k] || []).join(', ')) + '</div>'; }).join('') + '</div>' : '';
    var un = (c.unlocks || []).map(function (u) { return '<li><b>' + esc(u.unit) + '</b>: ' + esc(u.cond) + ' <span class="feas ' + esc(u.feas) + '">' + esc(u.feas) + ' chance</span></li>'; }).join('');
    return '<div class="more"><div class="more-grid">' +
      '<div><h3>Stage plan</h3>' + stageTable(c.stages) + '</div><div><h3>Carry &amp; items</h3>' + itemsBlock(c) + '</div>' +
      '<div><h3>Augments that fit</h3>' + aug + '</div>' +
      '<dl class="prose"><dt>Why it works</dt><dd>' + esc(c.why) + '</dd><dt>Shop priorities</dt><dd>' + esc(c.shop) + '</dd><dt>Flex slot</dt><dd>' + esc(c.flex) + '</dd><dt>If you miss</dt><dd>' + esc(c.pivot) + '</dd>' +
      (un ? '<dt>Unlocks</dt><dd><ul class="method">' + un + '</ul></dd>' : '') +
      '<dt>Transition</dt><dd>' + esc(c.transition) + '</dd><dt>Weaknesses</dt><dd>' + esc(c.weakness) + '</dd></dl></div></div>';
  }

  function flowEarly(c) {
    var L = BYID[c.into]; if (!L) return '';
    return '<div class="flow" aria-label="Transition"><span class="step"><span class="lb">Lv 5 opener</span>' + mini(c.boards[1].units.map(function (u) { return u.name; })) + '</span><span class="arrow">&rarr;</span>' +
      '<span class="step"><span class="lb">Grows into <a href="' + compHref(L.id) + '">' + esc(L.name) + '</a></span>' + mini(L.boards[1].units.map(function (u) { return u.name; })) + '</span></div>';
  }
  function flowLate(c) {
    var from = (c.from || []).map(function (f) { return BYID[f]; }).filter(Boolean);
    var h = '<div class="flow" aria-label="Transition">';
    if (from.length) h += '<span class="step"><span class="lb">From <a href="' + compHref(from[0].id) + '">' + esc(from[0].name) + '</a></span>' + mini(from[0].boards[1].units.map(function (u) { return u.name; })) + '</span><span class="arrow">&rarr;</span>';
    ['Lv 7', 'Lv 8 adds', 'Lv 9 adds'].forEach(function (lb, i) {
      var b = c.boards[i], prev = i ? c.boards[i - 1].units.map(function (u) { return u.name; }) : [];
      var names = b.units.map(function (u) { return u.name; }).filter(function (n) { return !i || prev.indexOf(n) < 0; });
      h += (i ? '<span class="arrow">&rarr;</span>' : '') + '<span class="step"><span class="lb">' + lb + '</span>' + mini(names) + '</span>';
    });
    return h + '</div>';
  }
  function flowReroll(c) {
    var roll = c.boards[0].units.map(function (u) { return u.name; }), late = c.boards[1].units.map(function (u) { return u.name; });
    return '<div class="flow" aria-label="Transition"><span class="step"><span class="lb">Roll at lv ' + c.roll_level + '</span>' + mini(roll) + '</span><span class="arrow">&rarr;</span>' +
      '<span class="step"><span class="lb">Lv 8 adds</span>' + mini(late.filter(function (n) { return roll.indexOf(n) < 0; })) + '</span>' +
      (roll.filter(function (n) { return late.indexOf(n) < 0; }).length ? '<span class="step"><span class="lb">Sold</span>' + mini(roll.filter(function (n) { return late.indexOf(n) < 0; })) + '</span>' : '') + '</div>';
  }

  function compactPanel(b) {
    return '<div class="bp">' + hexBoard(b) +
      '<div class="stats"><span class="stat"><b>' + b.n_active + '</b> traits</span><span class="stat">front <b>' + b.n_front + '</b> / back <b>' + b.n_back + '</b></span>' +
      (b.unlockables.length ? '<span class="stat">&#128274; ' + b.unlockables.length + ' unlock</span>' : '') + '</div>' +
      traitPills(b) + '</div>';
  }

  // One compact card: hero + one headline board + traits, with a "More details" drawer that holds
  // every level, the transition flow and the how-to-play sections.
  function card(c, pills, defIdx, intro, tabsHtml, flow, detail) {
    var b = c.boards[defIdx];
    return '<article class="card" id="' + c.id + '" data-tag="' + esc(c.tag) + '">' + hero(c, pills) +
      '<div class="card-body"><div class="lite">' + compactPanel(b) +
      '<div class="actions"><a class="btn" href="' + esc(b.link) + '" target="_blank" rel="noopener">Team builder &#8599;</a></div></div>' +
      '<details class="full"><summary><span class="s-open">More details</span><span class="s-close">Show less</span></summary>' +
      '<div class="full-body">' + (intro || '') + tabsHtml + flow + detail + '</div></details></div></article>';
  }
  function earlyCard(c) { return card(c, '<span class="pill">Lv 4-5</span>', 1, '', tabsFor(c, ['Level 4', 'Level 5'], 1), flowEarly(c), more(c)); }
  function lateCard(c) { return card(c, '<span class="pill">Lv 7-9</span>', 1, '', tabsFor(c, ['Level 7', 'Level 8', 'Level 9'], 1), flowLate(c), more(c)); }
  function rerollCard(c) {
    var plan = '<div class="more"><div class="more-grid"><div><h3>Roll plan</h3>' + stageTable(c.plan) + '</div>' +
      '<div><h3>Carry &amp; items</h3>' + itemsBlock(c) + '</div><dl class="prose"><dt>3-star targets</dt><dd>' + esc(c.stars.join(', ')) + '</dd>' +
      '<dt>Contested units</dt><dd>' + esc(c.hold) + '</dd><dt>If you hit</dt><dd>' + esc(c.hit) + '</dd><dt>If you miss</dt><dd>' + esc(c.miss) + '</dd></dl></div></div>';
    return card(c, '<span class="pill roll-pill">Roll lv ' + c.roll_level + '</span><span class="pill">' + UNIT[c.carry].cost + '-cost carry</span>', 0,
      '<p class="why3"><b>Why 3-star ' + esc(c.carry) + ':</b> ' + esc(c.why_3star) + '</p>',
      tabsFor(c, ['Roll board (lv ' + c.roll_level + ')', 'Level 8'], 0), flowReroll(c), plan);
  }

  $('early-list').innerHTML = C.early.map(earlyCard).join('');
  $('late-list').innerHTML = C.late.map(lateCard).join('');
  $('reroll-list').innerHTML = C.reroll.map(rerollCard).join('');

  // ---------- cheat sheet: grouped by use case ----------
  // [key, icon (HTML entity), title, "reach for this when...", source categories, reference?]
  var GROUPS = [
    ['heal', '&#129656;', 'Stop healing', 'Enemy lifesteal or healers', ['antiheal']],
    ['armor', '&#128737;', 'Break armor & MR', 'Their tanks are too sturdy', ['shred']],
    ['money', '&#128176;', 'Make money', 'Gold, XP, free units, items', ['econ']],
    ['control', '&#129482;', 'Lock down the fight', 'Stuns, knock-ups, taunts', ['cc']],
    ['survive', '&#128154;', 'Stay alive', 'Shields, heals, sustain', ['sustain']],
    ['burst', '&#128481;', 'Kill carries fast', 'Execute, true damage, assassins', ['execute', 'mobility']],
    ['aoe', '&#128165;', 'Hit everyone', 'Big area damage', ['aoe']],
    ['buff', '&#128227;', 'Buff the team', 'Make your allies stronger', ['support']],
    ['roles', '&#129521;', 'Tanks vs carries', 'Every unit by role', ['roles'], true],
    ['unlocks', '&#128275;', 'Unlockables', 'How to unlock each one', ['unlocks'], true],
    ['emblems', '&#128310;', 'Emblems', 'Spatula recipes', ['emblems'], true],
    ['traits', '&#128203;', 'All traits', 'Breakpoints and members', ['traits'], true],
    ['uniques', '&#11088;', 'Unique traits', 'One-unit traits', ['uniques'], true]
  ];
  var cheatState = { cat: 'all', q: '' }, DET = {};

  function usesLinks(name) {
    var u = UNIT[name]; if (!u || !u.comps.length) return '';
    return '<div class="uses">Used in: ' + u.comps.map(function (id) { return BYID[id] ? '<a href="' + compHref(id) + '">' + esc(BYID[id].name) + '</a>' : ''; }).join('') + '</div>';
  }
  function itemsFor(keys) {
    var out = [], seen = {};
    function add(it) {
      var k = it.k + ':' + it.name;
      if (seen[k]) { var p = seen[k]; if (it.note && p.note.indexOf(it.note) < 0) p.note += ' ' + it.note; (it.kws || []).forEach(function (w) { if (p.kws.indexOf(w) < 0) p.kws.push(w); }); return; }
      seen[k] = it; out.push(it);
    }
    keys.forEach(function (key) {
      (CH.cats[key] || []).forEach(function (r) { add({ k: 'unit', name: r.unit, note: r.note, kws: (r.kw || []).slice() }); });
      ((CH.extra || {})[key] || []).forEach(function (t) { add({ k: 'trait', name: t.trait, note: t.note, label: 'Trait', kws: [] }); });
      if (key === 'econ') (CH.econ_aug || []).forEach(function (a) { add({ k: 'aug', name: a.name, note: a.note, label: a.tier + ' aug', kws: [] }); });
      if (key === 'unlocks') CH.units.filter(function (u) { return u.unlock; }).forEach(function (u) { add({ k: 'unit', name: u.name, note: 'Unlock: ' + u.unlock, kws: [] }); });
    });
    return out;
  }
  function tile(g, it, i) {
    var u = UNIT[it.name] || {};
    var s = (it.name + ' ' + (u.traits || []).join(' ') + ' ' + it.note + ' ' + it.kws.join(' ') + ' ' + (it.label || '')).toLowerCase();
    if (it.k === 'unit') return '<button type="button" class="vtile" data-g="' + g + '" data-i="' + i + '" data-s="' + esc(s) + '">' + portrait(it.name, 'tl') + '<span class="vn">' + esc(it.name) + '</span></button>';
    return '<button type="button" class="vtile txt" data-g="' + g + '" data-i="' + i + '" data-s="' + esc(s) + '"><span class="vlab">' + esc(it.label || 'Trait') + '</span><span class="vn">' + esc(it.name) + '</span></button>';
  }
  function showDetail(g, i) {
    var it = DET[g][i], sec = document.querySelector('.cat[data-cat="' + g + '"]'); if (!it || !sec) return;
    var u = UNIT[it.name] || {};
    sec.querySelectorAll('.vtile').forEach(function (t) { t.classList.toggle('sel', t.dataset.i === String(i)); });
    sec.querySelector('.vdetail').innerHTML = it.k === 'unit'
      ? '<div class="vd-head">' + portrait(it.name, 'sm') + '<div><b>' + esc(it.name) + '</b><div class="meta">' + (u.cost || '?') + ' gold &middot; ' + esc((u.traits || []).join(', ')) + '</div></div></div><p>' + esc(it.note) + '</p>' +
        (it.kws.length ? '<div class="kws">' + it.kws.map(function (k) { return '<span class="kw">' + esc(k) + '</span>'; }).join('') + '</div>' : '') + usesLinks(it.name)
      : '<div class="vd-head"><span class="tchip">' + esc(it.label || 'Trait') + '</span><div><b>' + esc(it.name) + '</b></div></div><p>' + esc(it.note) + '</p>';
  }
  function catSection(g, inner, n) {
    var d = GROUPS.filter(function (x) { return x[0] === g; })[0];
    return '<section class="cat' + (d[5] ? ' ref' : '') + '" data-cat="' + g + '"><header class="cat-head"><span class="ic" aria-hidden="true">' + d[1] + '</span><div><h3>' + esc(d[2]) + ' <span class="n">' + n + '</span></h3><p class="sub">' + esc(d[3]) + '</p></div></header>' + inner + '</section>';
  }

  function buildCheat() {
    var h = '', nav = '';
    GROUPS.forEach(function (d) {
      var g = d[0], inner = '', n = 0;
      if (g === 'roles') {
        var groups = { 'Tanks': [], 'Melee fighters & assassins': [], 'Ranged carries & casters': [] };
        CH.units.forEach(function (u) { (u.tank ? groups.Tanks : u.pos === 'front' ? groups['Melee fighters & assassins'] : groups['Ranged carries & casters']).push(u); });
        inner = '<div class="rolegrid">' + Object.keys(groups).map(function (r) {
          n += groups[r].length;
          return '<div class="rolebox" data-s="' + esc((r + ' ' + groups[r].map(function (u) { return u.name; }).join(' ')).toLowerCase()) + '"><h4>' + r + ' <span class="muted">' + groups[r].length + '</span></h4><span class="mini">' + groups[r].map(function (u) { return portrait(u.name, 'sm'); }).join('') + '</span></div>';
        }).join('') + '</div>';
      } else if (g === 'emblems') {
        var em = CH.traits.filter(function (t) { return t.emblem; });
        n = em.length;
        inner = '<div class="ctable-wrap"><table class="ctable"><thead><tr><th>Emblem</th><th>Recipe</th><th>Breakpoints</th></tr></thead><tbody>' + em.map(function (t) {
          return '<tr data-s="' + esc((t.name + ' emblem ' + t.emblem).toLowerCase()) + '"><td><b>' + esc(t.name) + '</b></td><td>Spatula + ' + esc(t.emblem) + '</td><td class="bps">' + t.bps.join(' / ') + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      } else if (g === 'traits' || g === 'uniques') {
        var tr = CH.traits.filter(function (t) { return g === 'uniques' ? t.unique : !t.unique; });
        n = tr.length;
        inner = '<div class="ctable-wrap"><table class="ctable"><thead><tr><th>Trait</th>' + (g === 'traits' ? '<th>Breakpoints</th>' : '') + '<th>Members</th><th>What it does</th></tr></thead><tbody>' + tr.map(function (t) {
          return '<tr data-s="' + esc((t.name + ' ' + t.members.join(' ') + ' ' + t.text).toLowerCase()) + '"><td><b>' + esc(t.name) + '</b></td>' + (g === 'traits' ? '<td class="bps">' + t.bps.join(' / ') + '</td>' : '') +
            '<td><span class="mini">' + t.members.map(function (m) { return portrait(m, 'sm'); }).join('') + '</span></td><td>' + esc(t.text) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      } else {
        var items = itemsFor(d[4]); DET[g] = items; n = items.length;
        inner = '<div class="vgrid">' + items.map(function (it, i) { return tile(g, it, i); }).join('') + '</div><div class="vdetail" aria-live="polite"></div>';
      }
      h += catSection(g, inner, n);
      nav += '<button type="button" class="ucase' + (d[5] ? ' refc' : '') + '" data-cat="' + g + '" aria-pressed="false"><span class="ic" aria-hidden="true">' + d[1] + '</span><span class="ut">' + esc(d[2]) + '</span><span class="uw">' + esc(d[3]) + '</span><span class="un">' + n + '</span></button>';
    });
    $('cheat-chips').innerHTML = nav;
    $('cheat-body').innerHTML = h + '<p class="empty" id="cheat-empty" hidden>No matches.</p>';
    Object.keys(DET).forEach(function (g) { showDetail(g, 0); });
  }
  buildCheat();
  function applyCheat() {
    var q = cheatState.q.trim().toLowerCase(), any = false;
    document.querySelectorAll('#cheat-body .cat').forEach(function (sec) {
      var ref = sec.classList.contains('ref');
      var showSec = cheatState.cat === 'all' ? (!ref || !!q) : sec.dataset.cat === cheatState.cat, vis = 0;
      sec.querySelectorAll('[data-s]').forEach(function (el) {
        var ok = !q || el.dataset.s.indexOf(q) >= 0; el.hidden = !ok; if (ok) vis++;
      });
      sec.hidden = !showSec || (q && !vis);
      if (!sec.hidden) any = true;
    });
    $('cheat-empty').hidden = any;
  }
  $('cheat-q').addEventListener('input', function (e) { cheatState.q = e.target.value; applyCheat(); });
  $('cheat-chips').addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]'); if (!b) return;
    cheatState.cat = cheatState.cat === b.dataset.cat ? 'all' : b.dataset.cat;
    $('cheat-chips').querySelectorAll('[data-cat]').forEach(function (x) { var on = x.dataset.cat === cheatState.cat; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    applyCheat();
  });
  $('cheat-body').addEventListener('click', function (e) {
    var t = e.target.closest('.vtile'); if (t) showDetail(t.dataset.g, +t.dataset.i);
  });
  applyCheat();

  // ---------- routing ----------
  var TABS = ['early', 'late', 'reroll', 'cheatsheet'];
  function route() {
    var h = decodeURIComponent(location.hash.replace(/^#/, '')), parts = h.split('/');
    var tab = parts[0], target = parts[1];
    if (TABS.indexOf(tab) < 0) {
      if (BYID[tab]) { target = tab; tab = tabOf(tab); } else tab = 'early';
    }
    TABS.forEach(function (t) {
      $('panel-' + t).hidden = t !== tab;
      var a = document.querySelector('.maintab[data-tab="' + t + '"]'); a.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      if (t === tab) a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
    $('comp-filters').hidden = tab === 'cheatsheet';
    if (target && $(target)) {
      setTimeout(function () { var el = $(target); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'instant' }); }, 30);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
  window.addEventListener('hashchange', route);
  route();

  // ---------- interactions ----------
  var state = { tag: 'all' };
  document.querySelectorAll('[data-filter]').forEach(function (b) {
    b.addEventListener('click', function () {
      state.tag = b.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      document.querySelectorAll('.card').forEach(function (el) { el.hidden = !(state.tag === 'all' || el.dataset.tag === state.tag); });
    });
  });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (t) {
      t.parentNode.querySelectorAll('.tab').forEach(function (x) {
        var on = x === t; x.setAttribute('aria-selected', on ? 'true' : 'false');
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      return;
    }
    var tp = e.target.closest('.tp:not(.near)');
    if (tp) {
      var panel = tp.closest('.bp'), board = panel.querySelector('.board');
      var was = tp.getAttribute('aria-pressed') === 'true';
      panel.querySelectorAll('.tp').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      board.querySelectorAll('.hex.on').forEach(function (h) { h.classList.remove('on'); });
      if (was) { board.classList.remove('hl'); return; }
      tp.setAttribute('aria-pressed', 'true');
      var names = tp.dataset.units.split('|');
      board.classList.add('hl');
      board.querySelectorAll('.hex.filled').forEach(function (h) { if (names.indexOf(h.dataset.unit) >= 0) h.classList.add('on'); });
    }
  });
})();
