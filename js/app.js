(function () {
  'use strict';
  var C = window.TFT_COMPS, S = window.SET18;
  if (!C || !S) { document.body.insertAdjacentHTML('afterbegin', '<p style="padding:16px">Data files failed to load.</p>'); return; }

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function $(id) { return document.getElementById(id); }

  $('last-updated').textContent = C.generated;
  $('data-gen').textContent = 'PBE file generated ' + (C.source.generated || '').slice(0, 10);

  // Set 18 principles
  $('principles').innerHTML = S.principles.map(function (p, i) {
    return '<article class="principle"><h3><span class="num">' + (i + 1) + '.</span>' + esc(p.title) + '</h3>' +
      '<p>' + esc(p.body) + '</p><span class="stat">' + esc(p.stat) + '</span>' +
      '<a class="src" href="' + esc(S.sources[p.src]) + '" rel="noopener">' + (p.src === 'metatft' ? 'MetaTFT' : 'tactics.tools') + '</a></article>';
  }).join('');
  $('ref-body').innerHTML = S.topComps.map(function (c) {
    return '<tr><td>' + esc(c.name) + '</td><td>' + esc(c.lvl) + '</td><td>' + c.avg.toFixed(2) + '</td><td>' + c.top4.toFixed(1) +
      '%</td><td>' + c.win.toFixed(1) + '%</td><td>' + c.n.toLocaleString('en-US') + '</td><td>' + esc(c.act) + '</td></tr>';
  }).join('');

  var byId = {};
  C.early.concat(C.late).forEach(function (c) { byId[c.id] = c; });

  function unitChip(u) {
    var title = u.traits.join(' / ') + (u.unlock ? ' | Unlock: ' + u.unlock : '');
    return '<span class="unit k' + u.cost + '" title="' + esc(title) + '">' + (u.unlock ? '<span class="lock" aria-label="unlockable">&#9670;</span>' : '') +
      esc(u.name) + ' <span class="cost">' + u.cost + 'g</span></span>';
  }
  function traitBadge(t) {
    var cls = t.unique ? 'tb tb-u' : 'tb tb-' + Math.min(t.tier, 4);
    var bp = t.unique ? '' : '<span class="bp">' + (t.c !== t.bp ? 'uses ' + t.bp + ' &middot; ' : '') + t.bps.join('/') + '</span>';
    var title = t.t + ': ' + t.units.join(', ');
    return '<span class="' + cls + '" title="' + esc(title) + '">' + esc(t.t) + ' <span class="n">' + t.c + '</span>' + bp + '</span>';
  }
  function boardHtml(b) {
    var tr = b.traits.map(traitBadge).join('');
    var near = b.near.map(function (n) { return '<span class="tb tb-near" title="one unit away">' + esc(n.t) + ' ' + n.c + '&rarr;' + n.next + '</span>'; }).join('');
    var warn = [];
    if (b.unlockables.length) warn.push('Unlockables: ' + b.unlockables.join(', '));
    if (b.dead.length) warn.push('Units with no active trait: ' + b.dead.join(', '));
    return '<div class="summary">' +
      '<span><b>' + b.n_units + '</b> units</span>' +
      '<span><b>' + b.n_active + '</b> active traits (' + b.n_nonunique + ' non-unique' + (b.n_unique ? ', ' + b.n_unique + ' unique' : '') + ')</span>' +
      '<span><b>' + (b.n_active / b.n_units).toFixed(2) + '</b> traits per slot</span>' +
      '<span>front <b>' + b.n_front + '</b> / back <b>' + b.n_back + '</b></span>' +
      '<span><b>' + b.gold + '</b>g board</span></div>' +
      '<div class="rows"><div class="row"><span class="row-label">Front</span><div class="units">' + b.front.map(unitChip).join('') + '</div></div>' +
      '<div class="row"><span class="row-label">Back</span><div class="units">' + b.back.map(unitChip).join('') + '</div></div></div>' +
      '<div class="traits" aria-label="Active traits">' + tr + near + '</div>' +
      (warn.length ? '<p class="summary">' + esc(warn.join(' | ')) + '</p>' : '') +
      '<p class="card-foot" style="border:0;padding:0;margin:0 0 6px"><a href="' + esc(b.link) + '" target="_blank" rel="noopener">Open this board in the tactics.tools team builder &#8599;</a></p>';
  }

  function card(c, kind) {
    var alt = kind === 'early' ? c.lv4 : c.lv9;
    var mainLabel = kind === 'early' ? 'Level 5' : 'Level 8';
    var altLabel = kind === 'early' ? 'Level 4' : 'Level 9';
    var tagCls = c.tag === 'Combat' ? 'combat' : 'scaling';
    var flow = '';
    if (kind === 'early' && byId[c.into]) flow = 'Flows into <a href="#' + c.into + '">' + esc(byId[c.into].name) + '</a>';
    if (kind === 'late' && c.from && c.from.length) flow = 'Starts from ' + c.from.map(function (f) { return '<a href="#' + f + '">' + esc(byId[f].name) + '</a>'; }).join(', ');
    var dl = '<dl class="prose">' +
      '<dt>Why it works</dt><dd>' + esc(c.why) + '</dd>' +
      (c.carry && kind === 'early' ? '<dt>Carry &amp; items</dt><dd>' + esc(c.carry) + '</dd>' : '') +
      (c.items ? '<dt>Carry &amp; items</dt><dd><b>' + esc(c.carry) + '</b>. ' + esc(c.items) + '</dd>' : '') +
      '<dt>Set 18 pattern behind it</dt><dd>' + esc(c.inspired) + '</dd>' +
      '<dt>Transition</dt><dd>' + esc(c.transition) + '</dd>' +
      '<dt>Weaknesses</dt><dd>' + esc(c.weakness) + '</dd></dl>';
    var tid = 't-' + c.id;
    return '<article class="card" id="' + c.id + '" data-tag="' + esc(c.tag) + '" data-kind="' + kind + '">' +
      '<div class="card-head"><h3>' + esc(c.name) + '</h3><span class="tag ' + tagCls + '">' + esc(c.tag) + '</span>' +
      '<span class="lvl">' + (kind === 'early' ? 'Lv 4-5' : 'Lv 8-9') + '</span></div>' +
      '<div class="tabs" role="tablist">' +
      '<button class="tab" role="tab" aria-selected="true" aria-controls="' + tid + '-a" id="' + tid + '-ta">' + mainLabel + '</button>' +
      '<button class="tab" role="tab" aria-selected="false" aria-controls="' + tid + '-b" id="' + tid + '-tb">' + altLabel + '</button></div>' +
      '<div role="tabpanel" id="' + tid + '-a" aria-labelledby="' + tid + '-ta">' + boardHtml(c.board) + '</div>' +
      '<div role="tabpanel" id="' + tid + '-b" aria-labelledby="' + tid + '-tb" hidden>' + boardHtml(alt) + '</div>' +
      dl + (flow ? '<div class="card-foot"><span class="flow">' + flow + '</span></div>' : '') + '</article>';
  }

  $('early-list').innerHTML = C.early.map(function (c) { return card(c, 'early'); }).join('');
  $('late-list').innerHTML = C.late.map(function (c) { return card(c, 'late'); }).join('');

  document.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (!t) return;
    var tabs = t.parentNode.querySelectorAll('.tab');
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', on ? 'true' : 'false');
      document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
    });
  });

  var state = { tag: 'all', level: 'all' };
  function apply() {
    document.querySelectorAll('.card').forEach(function (el) {
      var okTag = state.tag === 'all' || el.dataset.tag === state.tag;
      var okLvl = state.level === 'all' || el.dataset.kind === state.level;
      el.hidden = !(okTag && okLvl);
    });
    $('early').hidden = state.level === 'late';
    $('late').hidden = state.level === 'early';
  }
  document.querySelectorAll('[data-filter],[data-level]').forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.dataset.filter !== undefined ? 'tag' : 'level';
      var val = b.dataset.filter !== undefined ? b.dataset.filter : b.dataset.level;
      state[key] = val;
      document.querySelectorAll(key === 'tag' ? '[data-filter]' : '[data-level]').forEach(function (x) {
        var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply();
    });
  });
})();
