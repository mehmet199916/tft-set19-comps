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
    return hexBoard(b) +
      '<div class="stats"><span class="stat"><b>' + b.n_active + '</b> active traits</span><span class="stat">front <b>' + b.n_front + '</b> / back <b>' + b.n_back + '</b></span>' +
      '<span class="stat"><b>' + b.gold + '</b> gold of units</span>' + (b.unlockables.length ? '<span class="stat">&#128274; ' + esc(b.unlockables.join(', ')) + '</span>' : '') + '</div>' +
      traitPills(b) +
      '<div class="actions"><a class="btn" href="' + esc(b.link) + '" target="_blank" rel="noopener">Open in team builder &#8599;</a></div>';
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
    return '<details class="more"><summary>How to play: stages, items, augments, pivots</summary><div class="more-grid">' +
      '<div><h3>Stage plan</h3>' + stageTable(c.stages) + '</div><div><h3>Carry &amp; items</h3>' + itemsBlock(c) + '</div>' +
      '<div><h3>Augments that fit</h3>' + aug + '</div>' +
      '<dl class="prose"><dt>Why it works</dt><dd>' + esc(c.why) + '</dd><dt>Shop priorities</dt><dd>' + esc(c.shop) + '</dd><dt>Flex slot</dt><dd>' + esc(c.flex) + '</dd><dt>If you miss</dt><dd>' + esc(c.pivot) + '</dd>' +
      (un ? '<dt>Unlocks</dt><dd><ul class="method">' + un + '</ul></dd>' : '') +
      '<dt>Transition</dt><dd>' + esc(c.transition) + '</dd><dt>Weaknesses</dt><dd>' + esc(c.weakness) + '</dd></dl></div></details>';
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

  function earlyCard(c) {
    return '<article class="card" id="' + c.id + '" data-tag="' + esc(c.tag) + '">' + hero(c, '<span class="pill">Lv 4-5</span>') +
      '<div class="card-body">' + tabsFor(c, ['Level 4', 'Level 5'], 1) + flowEarly(c) + more(c) + '</div></article>';
  }
  function lateCard(c) {
    return '<article class="card" id="' + c.id + '" data-tag="' + esc(c.tag) + '">' + hero(c, '<span class="pill">Lv 7-9</span>') +
      '<div class="card-body">' + tabsFor(c, ['Level 7', 'Level 8', 'Level 9'], 1) + flowLate(c) + more(c) + '</div></article>';
  }
  function rerollCard(c) {
    var plan = '<details class="more"><summary>How to play it</summary><div class="more-grid"><div><h3>Roll plan</h3>' + stageTable(c.plan) + '</div>' +
      '<div><h3>Carry &amp; items</h3>' + itemsBlock(c) + '</div><dl class="prose"><dt>3-star targets</dt><dd>' + esc(c.stars.join(', ')) + '</dd>' +
      '<dt>Contested units</dt><dd>' + esc(c.hold) + '</dd><dt>If you hit</dt><dd>' + esc(c.hit) + '</dd><dt>If you miss</dt><dd>' + esc(c.miss) + '</dd></dl></div></details>';
    return '<article class="card" id="' + c.id + '" data-tag="' + esc(c.tag) + '">' + hero(c, '<span class="pill roll-pill">Roll at level ' + c.roll_level + '</span><span class="pill">' + UNIT[c.carry].cost + '-cost carry</span>') +
      '<div class="card-body"><p class="why3"><b>Why 3-star ' + esc(c.carry) + ':</b> ' + esc(c.why_3star) + '</p>' +
      tabsFor(c, ['Roll board (lv ' + c.roll_level + ')', 'Level 8'], 0) + flowReroll(c) + plan + '</div></article>';
  }

  $('early-list').innerHTML = C.early.map(earlyCard).join('');
  $('late-list').innerHTML = C.late.map(lateCard).join('');
  $('reroll-list').innerHTML = C.reroll.map(rerollCard).join('');

  // ---------- cheat sheet ----------
  var CATS = [
    ['antiheal', 'Anti-heal', 'Wound reduces healing; Burn deals damage over time.'],
    ['shred', 'Armor / MR shred & debuffs', 'Armor or Magic Resist reduction, armor ignore, Vulnerable, Weaken, Slow.'],
    ['econ', 'Money, XP & loot', 'Units, traits and augments that hand out gold, XP, champions or items.'],
    ['cc', 'Crowd control', 'Stun, knock-up, Captivate, taunt, pull.'],
    ['sustain', 'Shields, heals & sustain', 'Self or team shields, heals, Omnivamp, Durability.'],
    ['execute', 'Execute & true damage', 'Executes, true damage and max-Health damage.'],
    ['mobility', 'Dash, untargetable & assassins', 'Units that dash, blink, teleport or become untargetable.'],
    ['aoe', 'Big AoE', 'Damage to all enemies, across the board, or in lines and cones.'],
    ['support', 'Team buffs', 'Units and traits that buff allies.'],
    ['roles', 'Tanks vs carries', 'Every unit by role.'],
    ['unlocks', 'Unlockable units', 'Units that start locked and the condition to unlock them.'],
    ['emblems', 'Emblems', 'Trait emblem recipes (Spatula + component), from the MetaTFT set page.'],
    ['traits', 'Trait breakpoints', 'Every trait with its breakpoints and members.'],
    ['uniques', 'Unique 1-unit traits', 'Traits that only one champion has.']
  ];
  var cheatState = { cat: 'all', q: '' };
  $('cheat-chips').innerHTML = '<button class="chip-btn is-on" data-cat="all" aria-pressed="true">All</button>' + CATS.map(function (c) { return '<button class="chip-btn" data-cat="' + c[0] + '" aria-pressed="false">' + esc(c[1]) + '</button>'; }).join('');

  function usesLinks(name) {
    var u = UNIT[name]; if (!u || !u.comps.length) return '';
    return '<div class="uses">In: ' + u.comps.map(function (id) { return BYID[id] ? '<a href="' + compHref(id) + '">' + esc(BYID[id].name) + '</a>' : ''; }).join('') + '</div>';
  }
  function unitEntry(name, note, kws) {
    var u = UNIT[name] || { cost: '?', traits: [] };
    return '<div class="centry" data-s="' + esc((name + ' ' + u.traits.join(' ') + ' ' + note + ' ' + (kws || []).join(' ')).toLowerCase()) + '">' + portrait(name) +
      '<div><div class="nm">' + esc(name) + '</div><div class="meta">' + u.cost + ' gold &middot; ' + esc(u.traits.join(', ')) + '</div>' +
      '<div class="note">' + esc(note) + '</div>' + (kws && kws.length ? '<div class="kws">' + kws.map(function (k) { return '<span class="kw">' + esc(k) + '</span>'; }).join('') + '</div>' : '') + usesLinks(name) + '</div></div>';
  }
  function traitEntry(t, note, label) {
    return '<div class="centry" data-s="' + esc((t + ' ' + note + ' trait').toLowerCase()) + '"><span class="tchip">' + esc(label || 'Trait') + '</span><div><div class="nm">' + esc(t) + '</div><div class="note">' + esc(note) + '</div></div></div>';
  }
  function section(key, title, sub, inner, count) {
    return '<section class="cat" data-cat="' + key + '"><h3>' + esc(title) + ' <span class="n">' + count + '</span></h3><p class="sub">' + esc(sub) + '</p>' + inner + '</section>';
  }

  function buildCheat() {
    var h = '';
    CATS.forEach(function (c) {
      var key = c[0], inner = '', n = 0;
      if (CH.cats[key] || (CH.extra && CH.extra[key])) {
        var rows = (CH.cats[key] || []).map(function (r) { n++; return unitEntry(r.unit, r.note, r.kw); });
        (CH.extra[key] || []).forEach(function (t) { n++; rows.push(traitEntry(t.trait, t.note)); });
        if (key === 'econ') (CH.econ_aug || []).forEach(function (a) { n++; rows.push(traitEntry(a.name, a.note, a.tier + ' aug')); });
        inner = '<div class="cgrid">' + rows.join('') + '</div>';
      } else if (key === 'roles') {
        var groups = { 'Tanks': [], 'Melee fighters & assassins': [], 'Ranged carries & casters': [] };
        CH.units.forEach(function (u) { (u.tank ? groups.Tanks : u.pos === 'front' ? groups['Melee fighters & assassins'] : groups['Ranged carries & casters']).push(u); });
        inner = '<div class="ctable-wrap"><table class="ctable"><thead><tr><th>Role</th><th>Units (by cost)</th></tr></thead><tbody>' + Object.keys(groups).map(function (g) {
          n += groups[g].length;
          return '<tr data-s="' + esc((g + ' ' + groups[g].map(function (u) { return u.name; }).join(' ')).toLowerCase()) + '"><td><b>' + g + '</b><br><span class="muted">' + groups[g].length + ' units</span></td><td><span class="mini">' + groups[g].map(function (u) { return portrait(u.name, 'sm'); }).join('') + '</span></td></tr>';
        }).join('') + '</tbody></table></div>';
      } else if (key === 'unlocks') {
        var ul = CH.units.filter(function (u) { return u.unlock; });
        n = ul.length;
        inner = '<div class="cgrid">' + ul.map(function (u) { return unitEntry(u.name, 'Unlock: ' + u.unlock, []); }).join('') + '</div>';
      } else if (key === 'emblems') {
        var em = CH.traits.filter(function (t) { return t.emblem; });
        n = em.length;
        inner = '<div class="ctable-wrap"><table class="ctable"><thead><tr><th>Emblem</th><th>Recipe</th><th>Breakpoints</th></tr></thead><tbody>' + em.map(function (t) {
          return '<tr data-s="' + esc((t.name + ' emblem ' + t.emblem).toLowerCase()) + '"><td><b>' + esc(t.name) + '</b></td><td>Spatula + ' + esc(t.emblem) + '</td><td class="bps">' + t.bps.join(' / ') + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      } else if (key === 'traits' || key === 'uniques') {
        var tr = CH.traits.filter(function (t) { return key === 'uniques' ? t.unique : !t.unique; });
        n = tr.length;
        inner = '<div class="ctable-wrap"><table class="ctable"><thead><tr><th>Trait</th>' + (key === 'traits' ? '<th>Breakpoints</th>' : '') + '<th>Members</th><th>What it does</th></tr></thead><tbody>' + tr.map(function (t) {
          return '<tr data-s="' + esc((t.name + ' ' + t.members.join(' ') + ' ' + t.text).toLowerCase()) + '"><td><b>' + esc(t.name) + '</b></td>' + (key === 'traits' ? '<td class="bps">' + t.bps.join(' / ') + '</td>' : '') +
            '<td><span class="mini">' + t.members.map(function (m) { return portrait(m, 'sm'); }).join('') + '</span></td><td>' + esc(t.text) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      }
      h += section(key, c[1], c[2], inner, n);
    });
    $('cheat-body').innerHTML = h + '<p class="empty" id="cheat-empty" hidden>No matches.</p>';
  }
  buildCheat();
  function applyCheat() {
    var q = cheatState.q.trim().toLowerCase(), any = false;
    document.querySelectorAll('#cheat-body .cat').forEach(function (sec) {
      var showSec = cheatState.cat === 'all' || sec.dataset.cat === cheatState.cat, vis = 0;
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
    cheatState.cat = b.dataset.cat;
    $('cheat-chips').querySelectorAll('[data-cat]').forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    applyCheat();
  });

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
      var panel = tp.closest('[role="tabpanel"]'), board = panel.querySelector('.board');
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
