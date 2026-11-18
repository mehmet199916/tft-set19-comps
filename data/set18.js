// Set 18 evidence, collected 2026-11-18 from MetaTFT (patch 18.7, Platinum+, last 3 days, 238,856 boards)
// and tactics.tools (patch 18.6, Diamond+, 4.0M comps). Full notes: ../set18-research-notes.md (not published).
window.SET18 = {
  sources: {
    metatft: 'https://www.metatft.com/comps',
    tactics: 'https://tactics.tools/team-compositions'
  },
  principles: [
    {
      title: 'Hit the LOWEST breakpoint, then layer another trait',
      body: 'In the 20 best MetaTFT comps, 101 of 117 active non-unique traits (86%) sit exactly at their first breakpoint. The most common winning pieces are 2-unit breakpoints: Brawler 2 (9 of 20 comps), Juggernaut 2 (7), Vanguard / Spellweaver / Lunar / Defender / Invoker / Summoner / Primal 2 (6 each).',
      stat: '86% of active traits at breakpoint 1',
      src: 'metatft'
    },
    {
      title: 'Every slot should feed 2+ active traits',
      body: 'The best Set 18 comp, Mama Beak / Hecarim (3.97 avg, 61.5% top 4), runs 7 active traits on 7 units at level 7: Mama Beak, Krug and Sentinel each sit in two or three active traits. Comparing boards of the SAME comp at the SAME level (1,293 variants, ~649k boards), versions with fewer "wasted" units (units above a breakpoint they do not reach) placed 0.17 better, versions with more placed 0.17 worse.',
      stat: '0.34-placement swing from wasted units',
      src: 'metatft'
    },
    {
      title: 'One more trait beats one more vertical unit',
      body: 'Same comp, same level 8: Elderwood Aphelios with Elderwood 6 + 3 small traits averaged 6.03; swapping one Elderwood unit for Diana (opens Lunar 2 + Vanguard 2, 6 traits) averaged 3.37. Riftbeast Sentry at level 8 with Taric (Vanguard 2 + Emerald) averaged 2.71 vs 5.10 with Sett in that slot. Across all comps, +1 active trait at the same level = -0.16 placement, +2 = -0.37, -1 = +0.26.',
      stat: 'Elderwood: 6.03 -> 3.37 by trading depth for width',
      src: 'metatft'
    },
    {
      title: 'Push exactly one carry trait past its first breakpoint',
      body: 'Pushing extra traits above the first breakpoint did not help on average (+0.10, same comp and level). The exception is the trait your carry uses: Invoker went 5.16 -> 3.67 -> 3.15 (Teemo), Adaptor 5.22 -> 4.24 -> 3.44 (Master Yi), Executioner 3.91 -> 2.79 -> 2.20 (Yunara), Summoner 4.56 -> 3.52 (Mama Beak).',
      stat: 'Executioner t1 3.91 -> t3 2.20',
      src: 'metatft'
    },
    {
      title: 'Vertical "stack one trait" boards are the losers',
      body: 'Bottom of the table: Sprykin Tristana (only 3 traits: Sprykin 5, Fae 4, Defender 2) 4.90 avg / 43% top 4; Elderwood Rengar (4 traits) 4.91; Kha\'Zix Rival 3 5.29 avg / 34.9% top 4; Fae Xayah 5.59. Fae Tristana got WORSE when it added a 4th Fae at level 8 (4.82) than its 6-trait level-7 board (3.74).',
      stat: 'Rival 3 vertical: 5.29 avg',
      src: 'tactics'
    },
    {
      title: 'Strong openers are cheap, wide and use 2-unit breakpoints',
      body: 'Alistar / Ornn / Shen / Varus / Xayah (5 one- and two-costs, 4 traits all at breakpoint 1) shows a 76-81% round-win rate as the early board of five different comps. Vertical Elderwood 5 at the same level: 64%. The Coven 4 opener wins only 27-31% of rounds and is used as a deliberate loss-streak econ start by Fast 9 comps.',
      stat: '81% round-win with 4 traits on 5 units',
      src: 'metatft'
    },
    {
      title: 'Grow by adding ONE bridge unit per level',
      body: 'Sprykin Teemo kept the same core and added one trait-opener per level: L4 Alistar/Kobuko/Teemo/Veigar (65% rounds) -> L5 +LeBlanc -> L6 +Hecarim -> L7 +Sentinel -> L8 +Morgana (3.74) -> L9 +Kog\'Maw (2.56). Late additions are almost always units that open a new trait at its first breakpoint (Taric, Ivern, Kennen, Soraka).',
      stat: 'Teemo L9 board: 2.56 avg',
      src: 'metatft'
    },
    {
      title: 'Levels are the biggest lever: plan the next level',
      body: 'Final level vs placement for reroll comps: Mama Beak L7 5.57 -> L8 3.47; Blossom Rengar L7 5.81 -> L8 3.26; Blossom Yunara L7 5.27 -> L8 2.88. Fast 9 comps: Juggernaut Amumu L9 4.72 -> L10 1.95. A clean trait web is worth ~0.2-0.4 placements; reaching the next level is worth ~2.',
      stat: 'L7 -> L8: about 2 placements',
      src: 'metatft'
    },
    {
      title: 'Combat comps top-4, Scaling comps win',
      body: 'Level-7 reroll comps had the best average (4.35) and top-4 (53.2%) as a group; Fast 9 comps the best win rate (18.4%, e.g. Vanguard Morgana 20.3%, Elderwood Draven 19.3%) but only ~50% top 4. Tag your plan: Combat (win now, stabilise) or Scaling/Econ (win later or earn gold).',
      stat: 'Fast 9: 18.4% win vs lvl 7: 10.8%',
      src: 'metatft'
    },
    {
      title: 'Keep 3-5 frontliners, never over-tank',
      body: '70% of level-8 final boards field 4-5 frontline units (Mama Beak: 4 front / 4 back). Boards with 7 frontliners averaged 5.76 vs 4.26 with 4; lean 2-3 front boards averaged 2.9-3.1 because they are strong reroll comps with one very tanky unit (Sprykin Azir, Blossom Yunara). At level 9, four true tanks was the best tank count (2.67 avg). Within the same comp, adding a frontliner instead of a carry was neutral (0.00).',
      stat: '7 frontliners at L8: 5.76 avg vs 4.26 with 4',
      src: 'metatft'
    }
  ],
  topComps: [
    { name: 'Mama Beak / Hecarim (Riftbeast Summoner)', lvl: 'lvl 7', avg: 3.97, top4: 61.5, win: 11.0, n: 4643, act: '7 traits / 7 units at L7', tag: 'Combat' },
    { name: 'Sprykin Teemo + Alistar', lvl: 'lvl 6', avg: 4.11, top4: 59.7, win: 7.3, n: 6284, act: '6 traits / 8 units', tag: 'Combat' },
    { name: 'Vanguard Morgana / Alune', lvl: 'Fast 9', avg: 4.15, top4: 55.0, win: 20.3, n: 10937, act: '10 traits / 9 units', tag: 'Scaling' },
    { name: 'Adaptor Master Yi', lvl: 'lvl 7', avg: 4.17, top4: 57.1, win: 10.4, n: 3136, act: '7 traits / 7 units', tag: 'Combat' },
    { name: 'Vanguard Ahri / Alune', lvl: 'Fast 9', avg: 4.21, top4: 54.9, win: 19.0, n: 5954, act: '8 traits / 8 units', tag: 'Scaling' },
    { name: 'Blossom Rengar', lvl: 'lvl 7', avg: 4.22, top4: 55.7, win: 12.0, n: 5436, act: '7 traits / 7 units', tag: 'Combat' },
    { name: 'Sprykin Azir', lvl: 'lvl 7', avg: 4.26, top4: 54.8, win: 12.5, n: 5883, act: '8 traits / 7 units', tag: 'Combat' },
    { name: 'Riftbeast Sentry / Elder Dragon', lvl: 'Fast 8', avg: 4.27, top4: 54.5, win: 11.6, n: 22461, act: '7 traits / 8 units', tag: 'Combat' },
    { name: 'Slayer Warwick', lvl: 'lvl 6', avg: 4.28, top4: 56.5, win: 7.3, n: 2119, act: '6 traits / 8 units', tag: 'Combat' },
    { name: 'Elderwood Aphelios', lvl: 'Fast 8', avg: 4.29, top4: 53.7, win: 13.4, n: 6434, act: '6 traits / 9 units', tag: 'Scaling' },
    { name: 'Rapidfire Kayle', lvl: 'lvl 6', avg: 4.36, top4: 53.7, win: 11.1, n: 4448, act: '6 traits / 8 units', tag: 'Combat' },
    { name: 'Lunar Aphelios / Nidalee', lvl: 'Fast 8', avg: 4.37, top4: 54.6, win: 7.6, n: 5455, act: '9 traits / 8 units', tag: 'Scaling' },
    { name: 'Elderwood Ezreal / Draven', lvl: 'Fast 9', avg: 4.37, top4: 50.3, win: 19.0, n: 11346, act: '9 traits / 9 units', tag: 'Scaling' },
    { name: 'Blossom Yunara (reroll)', lvl: 'lvl 5', avg: 4.37, top4: 53.4, win: 13.2, n: 11449, act: '4 traits / 7 units', tag: 'Combat' },
    { name: 'Spellweaver Veigar (reroll)', lvl: 'lvl 5', avg: 4.43, top4: 51.8, win: 11.5, n: 7256, act: '6 traits / 7 units', tag: 'Combat' },
    { name: 'Juggernaut Amumu / Draven (most played)', lvl: 'Fast 9', avg: 4.53, top4: 48.1, win: 18.3, n: 29225, act: '8 traits / 8 units (L9 core)', tag: 'Scaling' }
  ]
};
