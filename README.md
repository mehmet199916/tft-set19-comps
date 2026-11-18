# Set 19 Trait-Web Comps

A static, no-build site with theory-crafted TFT Set 19 (Prismatic Tour) comps, designed from Set 18 ladder patterns:
hit low trait breakpoints with few units, make every unit feed 2+ active traits, keep a real frontline,
and add one bridge unit per level.

**Set 19 is PBE-only (PBE 2026-11-17, live 2026-12-02).** Nothing here is ladder-tested; Set 18 numbers are real
(MetaTFT patch 18.7 and tactics.tools patch 18.6, pulled 2026-11-18), Set 19 comps are hypotheses.

## Files

```
index.html        page shell
css/style.css     styles (light/dark via prefers-color-scheme, mobile-first)
js/app.js         renders cards, tabs (lv4/5, lv8/9) and filter chips
data/set18.js     Set 18 lessons + reference comp stats (hand-entered from the research notes)
data/comps.js     GENERATED - comps with script-computed trait counts and team-builder links
```

All paths are relative, so the folder works from a GitHub Pages repo subpath (e.g. `user.github.io/repo/`).

## Publishing on GitHub Pages

Copy this folder into a repo (root or `/docs`), then enable Pages for that branch/folder in the repo settings.
No build step is needed.

## Regenerating the comp data

The generator lives next to this folder in `../tools/`:

- `set19.py` - loads `set19_raw.json` (MetaTFT PBE lookup `TFTSet19_latest_en_us.json`) and computes active traits for any board.
  `python set19.py eval "Ahri,Lillia,Leona"` or `python set19.py search --size 8 --level 8 --must Ahri --push K/DA:7`.
- `comps.py` - the curated boards and the write-ups.
- `teambuilder.py` - tactics.tools team-builder code generator.
- `build_site.py` - writes `data/comps.js`. Run `python build_site.py` after editing `comps.py` or refreshing `set19_raw.json`.

Assumptions baked into the calculator: Beach Pop uses 3/5/7 (the data file lists 0); K/DA counts star levels
(1-3 costs assumed 2-star on lv8-9 boards, only 1-costs on lv4-5 boards); Collab is ignored (randomised per game);
unique traits are counted as active but reported separately (Jazz/Smeech count non-unique traits only).

Not endorsed by Riot Games.
