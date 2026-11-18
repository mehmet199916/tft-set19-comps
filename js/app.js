(function () {
  'use strict';
  var C = window.TFT_COMPS, S = window.SET18, K = window.SET18_CASES || [];
  if (!C || !S) { document.body.insertAdjacentHTML('afterbegin', '<p style="padding:16px">Data files failed to load.</p>'); return; }
  var IMG = 'https://ap.tft.tools/img/s99/face/da_19_';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function $(id) { return document.getElementById(id); }
  function initials(n) { return n.replace(/\(.*\)/, '').split(/[\s'.&]+/).filter(Boolean).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase(); }
  var COSTS = {};
  C.early.concat(C.late).forEach(function (c) { c.boards.forEach(function (b) { b.units.forEach(function (u) { COSTS[u.name] = u; }); }); });

  $('last-updated').textContent = C.generated;
  $('data-gen').textContent = 'PBE file generated ' + (C.source.generated || '').slice(0, 10);

  // ---------- hero stats ----------
  var heroStats = [['86%', 'of winning traits sit at their first breakpoint'], ['-0.37', 'placement for +2 active traits, same comp and level'],
    ['81%', 'round-win of the best 5-unit, 4-trait opener'], ['~2', 'placements gained by reaching level 8 from 7']];
  $('hero-stats').innerHTML = heroStats.map(function (h) { return '<div class="hstat"><b>' + h[0] + '</b><span>' + esc(h[1]) + '</span></div>'; }).join('');

  // ---------- charts ----------
  function chart(ch) {
    if (!ch) return '';
    var h = '<div class="chart"><span class="cap">' + esc(ch.unit || '') + '</span>';
    if (ch.type === 'split') {
      var tot = ch.a + ch.b, pa = Math.round(ch.a / tot * 100);
      return '<div class="chart"><div class="split" role="img" aria-label="' + pa + '% ' + esc(ch.la) + '"><span class="a" style="width:' + pa + '%"></span><span class="b" style="width:' + (100 - pa) + '%"></span></div>' +
        '<span class="cap">' + ch.a + ' ' + esc(ch.la) + ' &middot; ' + ch.b + ' ' + esc(ch.lb) + '</span></div>';
    }
    if (ch.type === 'delta') {
      var mx = Math.max.apply(null, ch.rows.map(function (r) { return Math.abs(r[1]); })) || 1;
      ch.rows.forEach(function (r) {
        var w = Math.abs(r[1]) / mx * 50, left = r[1] < 0 ? 50 - w : 50;
        h += '<div class="bar-row"><span class="lab">' + esc(r[0]) + '</span><span class="bar-track center"><span class="bar ' + (r[1] < 0 ? 'good' : 'bad') +
          '" style="position:absolute;left:' + left + '%;width:' + w + '%"></span></span><span class="val">' + (r[1] > 0 ? '+' : '') + r[1].toFixed(2) + '</span></div>';
      });
      return h + '</div>';
    }
    var max = ch.max || 100;
    ch.rows.forEach(function (r) {
      h += '<div class="bar-row"><span class="lab">' + esc(r[0]) + '</span><span class="bar-track"><span class="bar" style="width:' + Math.min(100, r[1] / max * 100) + '%"></span></span><span class="val">' +
        (ch.type === 'pct' ? r[1] + '%' : r[1].toFixed(2)) + '</span></div>';
    });
    return h + '</div>';
  }
  $('principles').innerHTML = S.principles.map(function (p, i) {
    return '<article class="principle"><h3><span class="num">' + (i + 1) + '</span>' + esc(p.title) + '</h3>' + chart(p.chart) +
      '<p>' + esc(p.body) + '</p><span class="callout">' + esc(p.stat) + '</span>' +
      '<a class="src" href="' + esc(S.sources[p.src]) + '" rel="noopener">Source: ' + (p.src === 'metatft' ? 'MetaTFT' : 'tactics.tools') + '</a></article>';
  }).join('');
  $('ref-body').innerHTML = S.topComps.map(function (c) {
    return '<tr><td>' + esc(c.name) + '</td><td>' + esc(c.lvl) + '</td><td>' + c.avg.toFixed(2) + '</td><td>' + c.top4.toFixed(1) +
      '%</td><td>' + c.win.toFixed(1) + '%</td><td>' + c.n.toLocaleString('en-US') + '</td><td>' + esc(c.act) + '</td></tr>';
  }).join('');

  // ---------- case studies ----------
  $('case-list').innerHTML = K.map(function (k) {
    var s = k.stats;
    return '<details class="case" id="case-' + k.id + '"><summary><div class="case-top"><h3>' + esc(k.name) + '</h3>' +
      '<span class="pill ' + (k.tag === 'Combat' ? 'combat' : 'scaling') + '">' + esc(k.tag) + '</span><span class="pill">' + esc(k.plan) + '</span><span class="chev" aria-hidden="true">&#9654;</span></div>' +
      '<div class="kpis"><span class="kpi">avg <b>' + s.avg.toFixed(2) + '</b></span><span class="kpi">top 4 <b>' + s.top4 + '%</b></span><span class="kpi">win <b>' + s.win + '%</b></span>' +
      '<span class="kpi">play <b>' + s.pick + '</b>/game</span><span class="kpi"><b>' + s.n.toLocaleString('en-US') + '</b> boards</span></div></summary>' +
      '<div class="case-body"><div class="timeline">' + k.phases.map(function (p) {
        return '<div class="tl"><div class="when">' + esc(p[0]) + '</div><div class="units">' + esc(p[1]) + '</div><div class="tr">' + esc(p[2]) + '</div><div class="res">' + esc(p[3]) + '</div></div>';
      }).join('') + '</div><dl class="kv">' +
      '<dt>Bridges</dt><dd>' + esc(k.bridges) + '</dd><dt>Front / back</dt><dd>' + esc(k.frontback) + '</dd>' +
      '<dt>Carry &amp; items</dt><dd>' + esc(k.carry) + '</dd><dt>Why it wins</dt><dd>' + esc(k.why) + '</dd>' +
      '<dt>Lobby matchups</dt><dd>' + esc(k.matchups) + '</dd><dt>Economy</dt><dd>' + esc(k.econ) + '</dd><dt>Top-4 jump</dt><dd>' + esc(k.jump) + '</dd></dl></div></details>';
  }).join('');

  // ---------- portraits ----------
  function portrait(name, cls, extra) {
    var u = COSTS[name] || {}, cost = u.cost || 1;
    var slug = u.slug || name.toLowerCase().replace(/[^a-z]/g, '');
    return '<span class="pt k' + cost + ' ' + (cls || '') + '" title="' + esc(name + ' (' + cost + ' gold)' + (u.unlock ? ' - unlock: ' + u.unlock : '')) + '">' +
      '<img src="' + IMG + slug + '.jpg?w=96" alt="' + esc(name) + '" width="96" height="96" loading="lazy" decoding="async" onerror="this.parentNode.classList.add(\'noimg\')">' +
      '<span class="ini" aria-hidden="true">' + initials(name) + '</span>' + (u.unlock ? '<span class="badge lock" aria-label="unlockable">&#128274;</span>' : '') + (extra || '') + '</span>';
  }

  // ---------- hex board ----------
  function hexBoard(b, comp) {
    var grid = {};
    b.units.forEach(function (u) { grid[u.row + ':' + u.col] = u; });
    var rows = '';
    [3, 2, 1, 0].forEach(function (r, vi) {
      rows += '<div class="hrow' + (vi % 2 ? ' off' : '') + '">';
      for (var c = 0; c < 7; c++) {
        var u = grid[r + ':' + c];
        if (!u) { rows += '<span class="hex" aria-hidden="true"></span>'; continue; }
        var star = (comp.stars || []).indexOf(u.name) >= 0;
        rows += '<span class="hex filled k' + u.cost + '" data-unit="' + esc(u.name) + '" title="' + esc(u.name + ' (' + u.cost + 'g): ' + (u.active.length ? u.active.join(', ') : 'no active trait') + (u.unlock ? ' | unlock: ' + u.unlock : '')) + '">' +
          '<span class="in"><img src="' + IMG + u.slug + '.jpg?w=96" alt="' + esc(u.name) + '" width="96" height="96" loading="lazy" decoding="async" onerror="this.closest(\'.hex\').classList.add(\'noimg\')">' +
          '<span class="ini" aria-hidden="true">' + initials(u.name) + '</span></span>' +
          (u.carry ? '<span class="tag">CARRY</span>' : star ? '<span class="tag">&#9733;3</span>' : u.bridge ? '<span class="tag">' + u.active.length + ' traits</span>' : '') +
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
      var pips = t.unique ? '' : '<span class="pips">' + t.bps.map(function (bp) { return '<span class="pip' + (t.c >= bp ? ' on' : '') + '" title="' + bp + '"></span>'; }).join('') + '</span>';
      var lab = t.unique ? '1' : t.c + '<span class="muted">/' + (t.bps.filter(function (x) { return x > t.c; })[0] || t.bp) + '</span>';
      return '<button type="button" class="tp ' + tier + (t.t === b.carry_trait ? ' carry-t' : '') + '" aria-pressed="false" data-units="' + esc(t.units.join('|')) +
        '" title="' + esc(t.t + ' ' + t.c + (t.unique ? '' : ' (breakpoints ' + t.bps.join('/') + ')') + ': ' + t.units.join(', ')) + '"><span class="nm">' + esc(t.t) + '</span><span class="ct">' + lab + '</span>' + pips + '</button>';
    }).join('') + b.near.map(function (n) { return '<span class="tp near" title="one unit away"><span class="nm">' + esc(n.t) + '</span><span class="ct">' + n.c + '&rarr;' + n.next + '</span></span>'; }).join('') + '</div>';
  }

  function boardPanel(b, comp) {
    var warn = [];
    if (b.unlockables.length) warn.push('Unlockable: ' + b.unlockables.join(', '));
    if (b.dead.length) warn.push('No active trait: ' + b.dead.join(', '));
    return hexBoard(b, comp) +
      '<div class="stats"><span class="stat"><b>' + b.n_active + '</b> active traits (' + b.n_nonunique + ' non-unique' + (b.n_unique ? ' + ' + b.n_unique + ' unique' : '') + ')</span>' +
      '<span class="stat"><b>' + (b.n_active / b.n_units).toFixed(2) + '</b> traits / slot</span><span class="stat"><b>' + b.multi + '/' + b.n_units + '</b> units in 2+ traits</span>' +
      '<span class="stat">front <b>' + b.n_front + '</b> / back <b>' + b.n_back + '</b></span><span class="stat"><b>' + b.gold + '</b>g</span>' +
      '<span class="stat" title="tools/score.py">model score <b>' + b.score.toFixed(1) + '</b></span>' + (b.carry_trait ? '<span class="stat">pushed: <b>' + esc(b.carry_trait) + '</b></span>' : '') + '</div>' +
      traitPills(b) + (warn.length ? '<p class="warn">' + esc(warn.join(' | ')) + '</p>' : '') +
      '<div class="actions"><a class="btn" href="' + esc(b.link) + '" target="_blank" rel="noopener">Open in team builder &#8599;</a>' +
      '<button type="button" class="btn primary copy" data-code="' + esc(b.code) + '">Copy team code</button><span class="copied" hidden>Copied!</span></div>' +
      '<div class="code" tabindex="0" role="button" aria-label="Show full team code" title="Click to expand">' + esc(b.code) + '</div>' +
      (b.code_ambiguous.length ? '<p class="warn">' + esc(b.code_ambiguous.join(', ')) + ' share one unit id in the PBE data, so this code may load a different unit.</p>' : '') +
      '<p class="hint">Team planner code (MetaTFT format): paste it into the League Client Team Planner. Generated from PBE ids; not yet confirmed in game.</p>';
  }

  function mini(names) { return '<span class="mini">' + names.map(function (n) { return portrait(n, 'sm'); }).join('') + '</span>'; }

  function flow(c, kind, byId) {
    if (kind === 'early') {
      var L = byId[c.into]; if (!L) return '';
      return '<div class="flow" aria-label="Transition path"><span class="step"><span class="lb">Lv ' + c.boards[1].level + ' opener</span>' + mini(c.boards[1].units.map(function (u) { return u.name; })) + '</span><span class="arrow">&rarr;</span>' +
        '<span class="step"><span class="lb">Lv 8: <a href="#' + L.id + '">' + esc(L.name) + '</a></span>' + mini(L.boards[1].units.map(function (u) { return u.name; })) + '</span></div>';
    }
    var from = (c.from || []).map(function (f) { return byId[f]; }).filter(Boolean)[0];
    var h = '<div class="flow" aria-label="Transition path">';
    if (from) h += '<span class="step"><span class="lb">Opener: <a href="#' + from.id + '">' + esc(from.name) + '</a></span>' + mini(from.boards[1].units.map(function (u) { return u.name; })) + '</span><span class="arrow">&rarr;</span>';
    ['Lv 7', 'Lv 8', 'Lv 9'].forEach(function (lb, i) {
      var b = c.boards[i], prev = i ? c.boards[i - 1].units.map(function (u) { return u.name; }) : [];
      var added = b.units.map(function (u) { return u.name; }).filter(function (n) { return prev.indexOf(n) < 0; });
      h += (i ? '<span class="arrow">&rarr;</span>' : '') + '<span class="step"><span class="lb">' + lb + (i ? ' adds' : '') + '</span>' + mini(i ? added : b.units.map(function (u) { return u.name; })) + '</span>';
    });
    return h + '</div>';
  }

  function more(c) {
    var st = Object.keys(c.stages || {}).map(function (k) { return '<tr><th scope="row">' + esc(k) + '</th><td>' + esc(c.stages[k]) + '</td></tr>'; }).join('');
    var aug = c.augments ? '<div class="aug-grid">' + ['econ', 'combat', 'trait'].map(function (k) { return '<div class="aug"><b>' + (k === 'trait' ? 'Trait-specific' : k === 'econ' ? 'Econ' : 'Combat') + '</b>' + esc((c.augments[k] || []).join(', ')) + '</div>'; }).join('') + '</div>' : '';
    var un = (c.unlocks || []).map(function (u) { return '<li><b>' + esc(u.unit) + '</b>: ' + esc(u.cond) + ' <span class="feas ' + esc(u.feas) + '">' + esc(u.feas) + ' feasibility</span></li>'; }).join('');
    return '<details class="more"><summary>Game plan: stages, items, augments, pivots</summary><div class="more-grid">' +
      '<div><h3>Stage plan</h3><table class="stage-table"><tbody>' + st + '</tbody></table></div>' +
      '<div><h3>Carry &amp; items</h3><div class="items">' + portrait(c.carry, 'sm') + ' ' + (c.items || []).map(function (it, i) { return '<span class="item' + (i === 0 ? ' bis' : '') + '">' + esc(it) + '</span>'; }).join('') + '</div>' +
      (c.items2 ? '<p class="hint">' + esc(c.items2) + '</p>' : '') + (c.tank_items ? '<p class="hint">Tank: ' + esc(c.tank_items) + '</p>' : '') + (c.emblem ? '<p class="hint">Emblem: ' + esc(c.emblem) + '</p>' : '') + '</div>' +
      '<div><h3>Augments that fit</h3>' + aug + '</div>' +
      '<dl class="prose"><dt>Shop priorities</dt><dd>' + esc(c.shop) + '</dd><dt>Flex slot</dt><dd>' + esc(c.flex) + '</dd><dt>If you miss / pivot</dt><dd>' + esc(c.pivot) + '</dd>' +
      (un ? '<dt>Unlock conditions</dt><dd><ul class="method">' + un + '</ul></dd>' : '') +
      '<dt>Why it works</dt><dd>' + esc(c.why) + '</dd><dt>Set 18 pattern it mirrors</dt><dd>' + esc(c.mirrors) + '</dd><dt>Transition</dt><dd>' + esc(c.transition) + '</dd><dt>Weaknesses</dt><dd>' + esc(c.weakness) + '</dd></dl></div></details>';
  }

  function card(c, kind, byId) {
    var tagCls = c.tag === 'Combat' ? 'combat' : 'scaling';
    var levels = c.boards.map(function (b) { return b.level; });
    var def = kind === 'early' ? 1 : 1;
    var tabs = '<div class="tabs" role="tablist" aria-label="Board level">' + c.boards.map(function (b, i) {
      return '<button type="button" class="tab" role="tab" id="t-' + c.id + '-' + i + '" aria-controls="p-' + c.id + '-' + i + '" aria-selected="' + (i === def) + '">Level ' + b.level + '</button>';
    }).join('') + '</div>';
    var panels = c.boards.map(function (b, i) { return '<div role="tabpanel" id="p-' + c.id + '-' + i + '" aria-labelledby="t-' + c.id + '-' + i + '"' + (i === def ? '' : ' hidden') + '>' + boardPanel(b, c) + '</div>'; }).join('');
    return '<article class="card" id="' + c.id + '" data-tag="' + esc(c.tag) + '" data-kind="' + kind + '">' +
      '<div class="card-hero">' + portrait(c.carry, 'big', '<span class="badge carry">CARRY</span>') +
      '<div><h3>' + esc(c.name) + '</h3><div class="pills"><span class="pill ' + tagCls + '">' + esc(c.tag) + '</span><span class="pill">Lv ' + levels[0] + '-' + levels[levels.length - 1] + '</span>' +
      '<span class="pill' + (c.confidence === 'Low' ? ' conf-low' : '') + '">Confidence: ' + esc(c.confidence) + '</span></div></div></div>' +
      '<div class="card-body">' + tabs + panels + flow(c, kind, byId) + more(c) + '</div></article>';
  }

  var byId = {};
  C.early.concat(C.late).forEach(function (c) { byId[c.id] = c; });
  $('early-list').innerHTML = C.early.map(function (c) { return card(c, 'early', byId); }).join('');
  $('late-list').innerHTML = C.late.map(function (c) { return card(c, 'late', byId); }).join('');
  $('rejected-list').innerHTML = (C.rejected || []).slice(0, 6).map(function (r) {
    return '<li><b>' + esc(r.carry) + '</b>: ' + esc(r.units.join(', ')) + ' (' + r.n_active + ' traits' + (r.raw != null ? ', raw ' + r.raw : '') + ') - <span class="muted">' + esc(r.reasons.join('; ')) + '</span></li>';
  }).join('');

  // ---------- interactions ----------
  var live = $('live');
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? res() : rej(new Error('copy failed')); } catch (e) { rej(e); }
      document.body.removeChild(ta);
    });
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (t) {
      t.parentNode.querySelectorAll('.tab').forEach(function (x) {
        var on = x === t; x.setAttribute('aria-selected', on ? 'true' : 'false');
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      return;
    }
    var cp = e.target.closest('.copy');
    if (cp) {
      var ok = cp.parentNode.querySelector('.copied');
      copyText(cp.dataset.code).then(function () {
        ok.textContent = 'Copied!'; ok.hidden = false; live.textContent = 'Team code copied to clipboard';
        setTimeout(function () { ok.hidden = true; }, 2200);
      }, function () { ok.textContent = 'Copy failed - select the code below'; ok.hidden = false; live.textContent = 'Copy failed'; });
      return;
    }
    var code = e.target.closest('.code');
    if (code) { code.classList.toggle('full'); return; }
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
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('code')) { e.preventDefault(); e.target.classList.toggle('full'); }
  });

  var state = { tag: 'all', level: 'all' };
  function apply() {
    document.querySelectorAll('.card').forEach(function (el) {
      el.hidden = !((state.tag === 'all' || el.dataset.tag === state.tag) && (state.level === 'all' || el.dataset.kind === state.level));
    });
    $('early').hidden = state.level === 'late';
    $('late').hidden = state.level === 'early';
  }
  document.querySelectorAll('[data-filter],[data-level]').forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.dataset.filter !== undefined ? 'tag' : 'level';
      state[key] = key === 'tag' ? b.dataset.filter : b.dataset.level;
      document.querySelectorAll(key === 'tag' ? '[data-filter]' : '[data-level]').forEach(function (x) {
        var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply();
    });
  });
})();
