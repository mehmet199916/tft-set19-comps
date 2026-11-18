# Set 19 Trait-Web Comps

A static, no-build site with theory-crafted TFT Set 19 (Prismatic Tour) comps, designed from Set 18 ladder patterns:
hit low trait breakpoints with few units, make every unit feed 2+ active traits, keep a 4-5 unit frontline,
push only the carry's trait, and add one bridge unit per level.

**Set 19 is PBE-only (PBE 2026-11-17, live 2026-12-02).** Nothing here is ladder-tested; Set 18 numbers are real
(MetaTFT patch 18.7 and tactics.tools patch 18.6, pulled 2026-11-18), Set 19 comps are hypotheses.

## What is on the page

- Set 18 lessons: 10 principles with small charts, plus a reference table.
- Set 18 case studies: 14 comps with the board at each stage, bridge units, items, economy, lobby matchups.
- 12 openers (level 4-5) and 10 late boards (level 7 / 8 / 9) rendered as hex boards with champion portraits,
  trait pills (tap a trait to highlight its units), transition flow, game plan (stages, items, augments, pivots, unlock feasibility),
  a tactics.tools team-builder link and a "Copy team code" button.

## Files

```
index.html             page shell
css/style.css          styles (light/dark via prefers-color-scheme, mobile-first, hex board)
js/app.js              renders everything, tabs, trait highlight, filters, copy button
data/set18.js          Set 18 principles + chart numbers + reference table
data/set18_cases.js    Set 18 case studies
data/comps.js          GENERATED - comps, boards, trait counts, scores, links, team codes
```

All paths are relative, so the folder works from a GitHub Pages subpath. Portraits are loaded from
`https://ap.tft.tools/img/s99/face/da_19_<slug>.jpg`; if one fails, a cost-colored initials tile is shown.

## Regenerating the data (tools live next to this folder in `../tools/`)

- `set19.py` - trait calculator on MetaTFT's PBE lookup (`set19_raw.json`).
- `score.py` - the explicit scoring model (terms T1-T13 documented in the file); `python score.py score "A,B,C" --level 8 --carry A`.
- `run_search.py` - wide beam search for 47 forced carries plus openers -> `search_results.txt/json`.
- `comps.py` - curated boards and write-ups. `teambuilder.py` - tactics.tools links. `teamcode.py` - Team Planner codes.
- `build_site.py` - writes `data/comps.js`; run after editing `comps.py`.

## Team codes

Codes use MetaTFT's Team Planner format: `02` + 3 hex characters per unit (cheapest first, up to 10, padded with `000`) + `TFTSet19`.
A generated code imported into MetaTFT's team builder loads the same units. tactics.tools and MetaTFT do not export Set 19 codes
yet, so in-game acceptance is unverified; Graves, Mordekaiser and Nasus share one id in the PBE file and are flagged.

Not endorsed by Riot Games.
