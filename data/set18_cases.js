// Set 18 case studies. Source: MetaTFT comp pages / comp_details API (patch 18.7, Platinum+, last 3 days, pulled 2026-11-18),
// cross-checked with tactics.tools team-compositions (patch 18.6, Diamond+). Trait counts per phase recomputed from MetaTFT's
// Set 18 unit data. "rw" = round-win rate of that early board. "Rolls" = average shop rerolls per game at that level.
// Augments: both sites return empty augment/portal tables for Set 18, so no per-comp augment numbers exist.
window.SET18_CASES = [
  {
    id: 'mamabeak', name: 'Mama Beak / Hecarim (Riftbeast Summoner)', plan: 'Level 7 slow-roll', tag: 'Combat',
    stats: { avg: 3.99, top4: 61.2, win: 10.7, pick: 0.16, n: 5349 },
    phases: [
      ['2-2, lv4', 'Rakan 1, Xayah 1, Yorick 1, Mama Beak 3', 'Fae 2, Juggernaut 2, Rapidfire 2, Summoner 2 (4 traits on 4 units)', 'rw 55%'],
      ['2-6, lv5', 'Alistar 2, Hecarim 3, Xayah 1, Mama Beak 3, Krug 3', 'Elderwood 3, Brawler 2, Rapidfire 2, Summoner 2', 'rw 68%'],
      ['4-1, lv7 (roll)', 'Alistar, Hecarim, Xayah, Zyra 4, Mama Beak, Krug, Sentinel 4', 'Elderwood 3, Brawler 2, Vanguard 2, Rapidfire 2, Summoner 3, Riftbeast 3, Thornmaiden 1 (7 traits on 7 units)', '3.64 avg, 27.5k boards'],
      ['6-1, lv8', '+ Azir 3', 'Summoner 4 (+ all of the above)', '3.34 avg'],
      ['7-2, lv9', '+ Aphelios 4', 'Rapidfire 3', '2.60 avg']
    ],
    bridges: 'Mama Beak (Riftbeast + Summoner + Rapidfire), Krug (Riftbeast + Brawler + Summoner), Sentinel (Riftbeast + Vanguard + Invoker), Alistar (Elderwood + Brawler), Hecarim (Elderwood + Vanguard). Every unit is in 2+ active traits.',
    frontback: '4 front (Hecarim, Alistar, Krug, Sentinel) / 4 back',
    carry: 'Mama Beak: Guinsoo + Hextech Gunblade + Titan\'s Resolve (4.16, 9.7k). Hecarim tank: Gargoyle + Spirit Visage + Warmog (3.93); Bramble + Gargoyle + Warmog (3.59) is the strongest tank variant.',
    why: 'Three 3-cost bridge units turn on Summoner and Riftbeast together, so the level-7 board already has 7 traits. The comp needs 3-star Mama Beak (2-star 5.91 vs 3-star 3.68) and Hecarim (5.22 vs 3.47), which a 3-cost slow roll at level 7 delivers. Summoner 1 -> 2 is worth a lot: 4.56 -> 3.55 (MetaTFT), 5.02 -> 2.99 (tactics.tools variants).',
    matchups: 'Strong in lobbies with Riftbeast Gromp (-0.66) and Executioner Kha\'Zix (-0.48); weaker with Blackthorn Yunara (+0.38) and Hunter Malphite (+0.35) in the lobby.',
    econ: 'Level 4 at 2-2, 5 at 2-6, 6 at 3-2, 7 at 4-1, then 4.3 rolls per game at level 7 (slow roll), level 8 at 6-1.',
    jump: 'Final level 7 = 5.57 avg, level 8 = 3.47, level 9 = 2.48: the top-4 jump comes from stabilising at 7 and then reaching 8.'
  },
  {
    id: 'teemo', name: 'Sprykin Teemo + Alistar (Invoker)', plan: 'Level 6 reroll', tag: 'Combat',
    stats: { avg: 4.12, top4: 59.7, win: 7.3, pick: 0.21, n: 7256 },
    phases: [
      ['2-2, lv4', 'Alistar 2, Kobuko 1, Teemo 2, Veigar 1', 'Brawler 2, Sprykin 3', 'rw 65%, 11k boards'],
      ['3-1, lv5', '+ LeBlanc 2', 'Spellweaver 2', 'rw 67%, 20k'],
      ['3-2, lv6 (roll)', '+ Hecarim 3', 'Elderwood 3', '108k boards'],
      ['4-6, lv7', '+ Sentinel 4', 'Vanguard 2, Invoker 2', '3.91'],
      ['5-5, lv8', '+ Morgana 4', 'Invoker 3', '3.74, 15.8k'],
      ['6-6, lv9', '+ Kog\'Maw 3', 'Invoker 4, Caustic 1', '2.55']
    ],
    bridges: 'Alistar (Elderwood + Brawler), Hecarim (Elderwood + Vanguard), Sentinel (Vanguard + Invoker), Morgana (Coven + Invoker). Each level adds exactly one unit that opens or upgrades a trait.',
    frontback: '5 front / 3 back at level 8',
    carry: 'Teemo: Jeweled Gauntlet + Shojin + Striker\'s Flail (4.03, 22k); JG + Rabadon + Shojin (3.98). Alistar: Gargoyle x2 + Warmog (3.99).',
    why: 'Cheap 2-cost carry rerolled to 3 star at level 6 (90% of games reach 3-star Teemo; 2-star 6.21 vs 3-star 4.00). The carry trait Invoker is pushed every level: tier 1 5.15 -> tier 2 3.67 -> tier 3 3.14 -> tier 4 2.79.',
    matchups: 'Hurt by Defender Rengar (+0.51, contests Alistar/Veigar-adjacent pieces) and Invoker Morgana (+0.35, contests Invoker); good vs Fae Xayah (-0.34).',
    econ: 'Roll at level 6 (4.2 rolls/game), then level and roll again at 8 (3.5) and 9 (3.8).',
    jump: 'Final level 6 7.30, 7 5.75, 8 3.86, 9 2.61.'
  },
  {
    id: 'yi', name: 'Adaptor Master Yi (Blossom)', plan: 'Level 7 slow-roll', tag: 'Combat',
    stats: { avg: 4.15, top4: 57.4, win: 10.5, pick: 0.11, n: 3618 },
    phases: [
      ['2-x, lv4', 'Master Yi 3, Rakan 1, Yorick 1, Karma 1', 'Blossom 3, Juggernaut 2', 'rw 61%'],
      ['2-6, lv5', 'Master Yi, Yorick, Karma, Kog\'Maw 3, Vi 3', 'Blossom 3, Adaptor 2, Juggernaut 2, Caustic 1 (4 traits on 5)', 'rw 72%'],
      ['3-6, lv7 (roll)', 'Master Yi, Sett 4, Yorick, Kog\'Maw, Krug 3, Nidalee 4, Vi', 'Blossom 3, Adaptor 3, Brawler 2, Juggernaut 2, Summoner 2, Caustic 1, Primal 2', '3.45, 38k'],
      ['6-1, lv8', '+ Gromp 2', 'Adaptor 4', '3.21'],
      ['lv9', '+ Sentinel 4', 'Riftbeast 3, Invoker 2 (9 traits)', '2.19']
    ],
    bridges: 'Kog\'Maw (Caustic + Adaptor + Invoker), Krug (Riftbeast + Brawler + Summoner), Nidalee (Primal + Adaptor), Vi (Juggernaut + Primal).',
    frontback: '4 front / 4 back at level 8',
    carry: 'Master Yi: Brawler Emblem + Edge of Night + Guinsoo (3.96, 7k) beats EoN + Guinsoo + Titan\'s (4.13). Kog\'Maw second carry: Giant Slayer + Red Buff + Shojin (3.41).',
    why: 'Adaptor is the carry trait and is pushed: tier 1 5.23 -> tier 2 4.24 -> tier 3 3.44. The Brawler emblem on Yi turns Brawler 2 on without spending a slot. 3-star Yi 3.48 vs 2-star 5.77.',
    matchups: 'Hurt by Rapidfire Aphelios (+0.26); good vs Riftbeast Gromp (-0.34) and Blackthorn Yunara (-0.32).',
    econ: 'Level 7 at 3-6, 3.9 rolls/game at 7, level 8 at 6-1.',
    jump: 'Final level 7 5.42, 8 3.34, 9 2.48.'
  },
  {
    id: 'rengar', name: 'Blossom Rengar', plan: 'Level 7 slow-roll', tag: 'Combat',
    stats: { avg: 4.21, top4: 55.9, win: 12.1, pick: 0.18, n: 6187 },
    phases: [
      ['2-2, lv4', 'Master Yi 3, Rengar 3, Yorick 1, Karma 1', 'Blossom 3, Rival 1', 'rw 54%'],
      ['2-5, lv5', '+ Vi 3', 'Juggernaut 2', 'rw 69%'],
      ['3-6, lv7 (roll)', 'Yi, Rengar, Sett 4, Yorick, Krug 3, Nidalee 4, Vi', '7 traits on 7 units (Blossom 3, Adaptor 2, Rival 1, Brawler 2, Juggernaut 2, Summoner 2, Primal 2)', '3.63, 51.8k'],
      ['6-1, lv8', '+ Kog\'Maw 3', 'Adaptor 3, Caustic 1', '3.15'],
      ['7-1, lv9', '+ Gromp 2', 'Adaptor 4', '2.14']
    ],
    bridges: 'Same skeleton as Master Yi; Rengar adds the unique Rival trait. Vi at level 5 is the first bridge (Juggernaut with Yorick).',
    frontback: '5 front / 3 back',
    carry: 'Rengar: Edge of Night + Guinsoo + Titan\'s (3.85, 9.9k) or Guinsoo + Sterak + Titan\'s (3.82). Yi: Brawler Emblem + EoN + Guinsoo. Vi tank: Evenshroud + Gargoyle + Sunfire (3.38).',
    why: 'Two 3-cost reroll carries share one frontline. Adaptor 1 -> 2 -> 3: 4.75 -> 3.67 -> 2.92. Pushing Rival to 2-3 (second Rengar-style unit) is bad: 5.42-5.53.',
    matchups: 'Contested by Defender Rengar (+0.35); good vs Slayer Brambleback (-0.41).',
    econ: 'Level 7 at 3-6, 4.1 rolls at 7, level 8 at 6-1.',
    jump: 'Final level 7 5.81 -> level 8 3.26 -> level 9 2.13.'
  },
  {
    id: 'azir', name: 'Sprykin Azir (Executioner / Flora Fatalis)', plan: 'Level 7 slow-roll', tag: 'Combat',
    stats: { avg: 4.27, top4: 54.6, win: 12.2, pick: 0.20, n: 6737 },
    phases: [
      ['2-2, lv4', 'Azir 3, Rammus 3, Teemo 2, Veigar 1', 'Blackthorn 2, Sprykin 3', 'rw 46%'],
      ['2-6, lv5', '+ Fiddlesticks 3', 'Defender 2, Spellweaver 2, Flora Fatalis 1 (5 traits on 5)', 'rw 62%'],
      ['4-1, lv7 (roll)', 'Azir, Rammus, Soraka 4, Teemo, Veigar, Zyra 4, Fiddlesticks', '8 traits on 7 units', '3.52, 71k'],
      ['6-1, lv8', '+ Ezreal 4', 'Executioner 3', '2.93'],
      ['lv9', '+ Kennen 5', 'Executioner 4, Sprykin 4', '2.03']
    ],
    bridges: 'Fiddlesticks (Flora Fatalis + Defender + Spellweaver), Azir (Blackthorn + Executioner + Summoner), Soraka (Flora + Executioner).',
    frontback: 'Only 2 front (Rammus, Fiddlesticks) / 6 back - works because Rammus 3-star with double Gargoyle holds the line.',
    carry: 'Azir: Guinsoo + Hextech Gunblade + Rabadon (3.82, 21k). Rammus: Crownguard + Gargoyle x2 (3.59).',
    why: 'Flora Fatalis 2 (Fiddlesticks + Soraka) is the key: 5.92 at 1 vs 4.04 at 2. Executioner, the carry trait, is pushed: 4.77 -> 3.55 -> 2.99.',
    matchups: 'Hurt by Blackthorn Yunara (+0.20); good vs Fae Xayah (-0.32).',
    econ: 'Level 7 at 4-1, 4.1 rolls at 7, level 8 at 6-1.',
    jump: 'Final level 7 5.57 -> 8 3.18 -> 9 2.31.'
  },
  {
    id: 'yunara', name: 'Blossom Yunara / Karma (1-cost reroll)', plan: 'Level 5 reroll', tag: 'Combat',
    stats: { avg: 4.38, top4: 53.2, win: 13.1, pick: 0.38, n: 13058 },
    phases: [
      ['2-3, lv4', 'Sejuani 2, Yorick 1, Yunara 2, Karma 1', 'Juggernaut 2, Blossom 3', '26k boards'],
      ['3-2, lv5 (roll)', '+ LeBlanc 2', 'Spellweaver 2', '87k boards'],
      ['5-1, lv7', '+ Kayle 2, Leona 1', 'Solar 3', '3.45, rw 68%'],
      ['6-1, lv8', '+ Azir 3', 'Executioner 2, Summoner 2', '3.03, 20k'],
      ['lv9', '+ Kennen 5', 'Executioner 3', '1.91']
    ],
    bridges: 'Azir at 8 is the bridge that adds TWO traits (Executioner + Summoner); tactics.tools variant data: without him 5.55, with him 2.92.',
    frontback: '3 front (Sejuani, Leona, Yorick) / 5 back',
    carry: 'Karma: Blue Buff + Jeweled Gauntlet + Rabadon (3.98, 21.8k); Executioner Emblem + Blue Buff + Rabadon (3.82). Sejuani: Crownguard + Gargoyle + Warmog (3.55).',
    why: 'Pure 3-star power: Karma 2-star 6.89 vs 3-star 4.21 (92% hit), Yunara 6.39 vs 3.90, Yorick 6.33 vs 4.08. Late Executioner push is the scaling: 3.91 -> 2.79 -> 2.19.',
    matchups: 'Most lobby-sensitive comp: hurt by Defender Rengar (+0.39) and Master Yi (+0.35); good vs Vanguard Elise (-0.55).',
    econ: 'Rolls at 5 (3.3/game) and 6 (4.4/game), level 7 only at 5-1.',
    jump: 'Final level 6 7.12, 7 5.27, 8 2.88 (!), 9 1.92 - reroll comps still need level 8.'
  },
  {
    id: 'veigar', name: 'Spellweaver Veigar (1-cost reroll)', plan: 'Level 5 reroll', tag: 'Combat',
    stats: { avg: 4.43, top4: 51.7, win: 11.4, pick: 0.24, n: 8238 },
    phases: [
      ['2-3, lv4', 'Alistar 2, LeBlanc 2, Ornn 1, Veigar 1', 'Elderwood 3, Spellweaver 2', 'rw 50%'],
      ['3-2, lv5 (roll)', '+ Rek\'Sai 1', 'Brawler 2, Blackthorn 2 (4 traits on 5)', 'rw 70%, 70k'],
      ['4-1, lv6', '+ Fiddlesticks 3', 'Spellweaver 3, Defender 2, Flora 1', 'rw 69%'],
      ['4-6, lv7', '+ Cassiopeia 3', 'Spellweaver 4', '3.61'],
      ['lv8 / lv9', '+ Soraka (Flora 2) / + Ahri + Alune', 'Spellweaver 6 at 9', '3.59 / 2.30']
    ],
    bridges: 'Rek\'Sai (Blackthorn + Brawler with Alistar), Fiddlesticks (Defender with Ornn + Spellweaver + Flora).',
    frontback: '4 front / 4 back',
    carry: 'Veigar (3-star 96%: 2-star 7.06 vs 3-star 4.29). Tank Alistar: Bramble + Gargoyle + Spirit Visage (2.90) is the best tank build of the set sample.',
    why: 'Spellweaver is the carry trait and the only one pushed: tier 2 4.23 -> tier 3 2.74. Brawler 2 (3.25) and Blackthorn 2 (3.16) come free from two 1-costs.',
    matchups: 'Contested by Sprykin comps (+0.19 to +0.23).',
    econ: 'Rolls spread over 4-6 (1.3, 3.4, 2.8 per game).',
    jump: 'Final level 6 7.16, 7 5.28, 8 3.80, 9 2.54.'
  },
  {
    id: 'warwick', name: 'Slayer (Ravager) Warwick', plan: 'Level 6 reroll', tag: 'Combat',
    stats: { avg: 4.30, top4: 55.8, win: 7.2, pick: 0.07, n: 2463 },
    phases: [
      ['2-2, lv4', 'Kobuko 1, Rek\'Sai 1, Warwick 2, Murkwolf 2', 'Brawler 2, Blackthorn 2, Ravager 2 (3 traits on 4)', 'rw 65%'],
      ['2-6, lv5', 'Akali 1, Camille 1, Rek\'Sai, Warwick, Murkwolf', 'Ravager 4, Blackthorn 2', 'rw 73%'],
      ['3-2, lv6 (roll)', 'Diana 3, Rek\'Sai, Warwick, Brambleback 4, Krug 3, Murkwolf', 'Ravager 4, Blackthorn 2, Brawler 2, Riftbeast 3', 'rw 70%'],
      ['5-3, lv8', '+ Azir 3, Malphite 4', 'Blackthorn 4, Summoner 2, Monolith 1', '3.70'],
      ['lv9', '+ Taric 5', 'Vanguard 2, Emerald 1 (8 traits)', '2.40']
    ],
    bridges: 'Rek\'Sai (Blackthorn + Brawler), Krug (Riftbeast + Brawler + Summoner), Azir (Blackthorn + Summoner).',
    frontback: '6 front / 2 back: a melee wall',
    carry: 'Warwick: Shojin + Sterak + Titan\'s (4.09). Malphite: Crownguard + Evenshroud + Gargoyle (3.37).',
    why: 'Both carry traits are pushed to tier 2: Ravager 5.60 -> 4.08, Blackthorn 5.06 -> 4.08. 3-star Warwick 4.18 vs 5.97.',
    matchups: 'Hurt by Hunter Malphite (+0.36); good vs Blossom Yunara (-0.22).',
    econ: 'Roll at 6 (3.8/game), level 8 at 5-3.',
    jump: 'Final level 6 7.24, 7 5.61, 8 3.91, 9 2.90.'
  },
  {
    id: 'kayle', name: 'Rapidfire Kayle (Solar / Inferno)', plan: 'Level 6 reroll', tag: 'Combat',
    stats: { avg: 4.35, top4: 53.8, win: 11.6, pick: 0.15, n: 5251 },
    phases: [
      ['2-3, lv4', 'Kayle 2, Leona 1, Sejuani 2, Varus 1', 'Solar 3, Rapidfire 2', 'rw 45%'],
      ['3-1, lv5', '+ Shen 2', 'Defender 2, Inferno 2 (4 traits on 5)', 'rw 62%, 14.8k'],
      ['3-5, lv6 (roll)', '+ Diana 3', '-', 'rw 60%'],
      ['5-1, lv7', '+ Aphelios 4', 'Lunar 2, Rapidfire 3', '3.47'],
      ['6-1 / 7-3', '+ Amumu 4 / + Alune 5', 'Juggernaut 2, Inferno 3 / Lunar 3', '3.52 / 1.99']
    ],
    bridges: 'Shen (Defender + Inferno), Diana (Lunar + Vanguard), Amumu (Inferno + Juggernaut).',
    frontback: '5 front / 3 back',
    carry: 'Kayle: Guinsoo + Jeweled Gauntlet + Rabadon (3.97); Lunar Emblem + Guinsoo + Rabadon (3.93).',
    why: 'Carry trait Rapidfire pushed (5.12 -> 3.96 -> 3.63) while Lunar (4.87 -> 3.64) and Inferno (4.79 -> 3.85) also climb as the board grows.',
    matchups: 'Contested by Rapidfire Aphelios (+0.30).',
    econ: 'Rolls at 5 (2.4) and 6 (4.3).',
    jump: 'Final level 6 6.73, 7 5.18, 8 3.63, 9 2.66.'
  },
  {
    id: 'riftbeast', name: 'Riftbeast Sentry / Elder Dragon (most played)', plan: 'Fast 8', tag: 'Combat',
    stats: { avg: 4.27, top4: 54.6, win: 11.9, pick: 0.75, n: 25604 },
    phases: [
      ['2-x, lv4', 'Rakan 1, Pebbles 1, Cinderling 1, Scuttlecrab 2', 'Juggernaut 2, Riftbeast 3', 'rw 56%'],
      ['2-5, lv5', 'Pebbles, Cinderling, Krug 3, Murkwolf 2, Scuttlecrab', 'Riftbeast 5', 'rw 53%'],
      ['3-6, lv7', '+ Gromp, Mama Beak', 'Riftbeast 7, Summoner 2', 'rw 69%'],
      ['4-2, lv8 (roll)', 'Elder Dragon 5, Pebbles, Brambleback 4, Krug, Murkwolf, Sentinel 4, Taric 5', 'Riftbeast 6, Invoker 2, Ravager 2, Vanguard 2, Apex 1, Emerald 1', '2.71, 36k'],
      ['5-5, lv9', '+ Sett 4', 'Brawler 2', '3.12']
    ],
    bridges: 'Sentinel + Taric (Vanguard 2 + Emerald), Brambleback (Riftbeast + Ravager).',
    frontback: '5 front / 3 back',
    carry: 'Brambleback: Edge of Night + Guinsoo + Quicksilver (4.00, 122k). Elder Dragon: IE + Last Whisper + Red Buff (2.73) or + Flail (2.94).',
    why: 'Riftbeast is one of the few traits where the high tier is the payoff: 3 units 6.47, 5 units 4.26, 7 units 2.36. Then Taric opens Vanguard + Emerald: level-8 board with Taric 2.71 vs 5.10 with Sett.',
    matchups: 'Lobby-robust (worst +0.09).',
    econ: 'No rolling before level 8 (0.2-0.7 rolls per level); level 8 at 4-2, roll 2.9 there, 3.7 at 9.',
    jump: 'Final level 8 5.67 vs 9 3.51 vs 10 2.18.'
  },
  {
    id: 'morgana', name: 'Vanguard Morgana / Alune (Fast 9)', plan: 'Fast 9', tag: 'Scaling',
    stats: { avg: 4.14, top4: 55.2, win: 20.3, pick: 0.36, n: 12419 },
    phases: [
      ['2-x, lv4', 'Caitlyn 2, Camille 1, Cassiopeia 3, Elise 2', 'Coven 4', 'rw 30% - deliberate loss streak'],
      ['2-5, lv5', '+ Rakan 1', 'Vanguard 2', 'rw 51%'],
      ['3-5, lv7', 'Caitlyn, Camille, Cass, Diana 3, Elise, Hecarim 3, Rakan', 'Coven 4, Ravager 2, Vanguard 4', 'rw 48%'],
      ['4-2, lv8', 'Alune 5, Diana, Lillia 4, Morgana 4, Rakan, Fiddlesticks 3, Sentinel 4, Taric 5', '9 traits', '5.73'],
      ['5-1, lv9 (roll)', '+ Ivern 5', '10 traits', '3.82, 11.9k']
    ],
    bridges: 'Diana (Lunar + Ravager + Vanguard), Rakan (Fae + Juggernaut + Vanguard), Fiddlesticks (Flora + Defender + Spellweaver).',
    frontback: '7 front / 2 back at 9',
    carry: 'Alune: JG + Shojin + Flail (3.58) or Archangel + Blue Buff + JG (3.77). Morgana: Gunblade + Morello + Void Staff (3.58).',
    why: 'Econ first: almost no rolling until level 8-9 (0.1-0.3 rolls per level before 8). Vanguard is the pushed trait: 2 units 5.38, 4 units 3.91, 6 units 3.54.',
    matchups: 'Hurt by Defender Rengar (+0.29).',
    econ: 'Lose-streak Coven, level 8 at 4-2, 9 at 5-1, 10 at 7-1.',
    jump: 'Final level 8 6.28, 9 4.31, 10 1.89 - the win rate (20.3%) comes from level 10.'
  },
  {
    id: 'draven', name: 'Elderwood Ezreal / Draven (Fast 9 legendaries)', plan: 'Fast 9', tag: 'Scaling',
    stats: { avg: 4.38, top4: 50.3, win: 18.9, pick: 0.38, n: 12854 },
    phases: [
      ['2-x, lv4', 'Alistar 2, Ornn 1, Varus 1, Xayah 1', 'Elderwood 3, Rapidfire 2', 'rw 61%'],
      ['2-5, lv5', '+ Shen 2', 'Defender 2, Inferno 2 (4 traits on 5)', 'rw 80% - best opener of the set'],
      ['3-5, lv7', '+ Hecarim 3, LeBlanc 2', 'Elderwood 5', 'rw 67%'],
      ['4-2, lv8', 'Alistar, Ezreal 4, Ivern 5, Kennen 5, Maokai 5, Amumu 4, Draven 5, Taric 5', '8 traits', '3.72, 22k'],
      ['5-1, lv9 (roll)', '+ Lux 5 or + Sentinel 4', '9 traits', '1.66 / 1.84']
    ],
    bridges: 'Kennen (Inferno + Executioner + Sprykin), Amumu (Inferno + Juggernaut), Taric (Emerald + Vanguard with Sentinel).',
    frontback: '4 front / 4-5 back',
    carry: 'Draven: Deathblade + Guinsoo + Kraken (3.80, 14.8k); Executioner Emblem + Guinsoo + Kraken (3.49).',
    why: 'A cheap, wide, strong opener buys HP while saving gold, then the board is replaced by 5-costs whose unique traits plus small 2-unit traits give 8-9 active traits.',
    matchups: 'Lobby-robust (worst +0.10).',
    econ: 'Almost no rolling before 9 (1.4 at 8, 3.9 at 9).',
    jump: 'Final level 8 6.63, 9 4.66, 10 1.92.'
  },
  {
    id: 'aphelios', name: 'Elderwood Aphelios (vertical vs wide test)', plan: 'Fast 8', tag: 'Scaling',
    stats: { avg: 4.29, top4: 53.6, win: 13.3, pick: 0.21, n: 7260 },
    phases: [
      ['2-x, lv4', 'Alistar 2, Ornn 1, Varus 1, Xayah 1', 'Elderwood 3, Rapidfire 2', 'rw 57%'],
      ['2-5, lv5', 'Alistar, Hecarim 3, LeBlanc 2, Ornn, Xayah', 'Elderwood 5', 'rw 64%'],
      ['3-6, lv7', '+ Shen 2, Varus', 'Elderwood 5, Defender 2, Inferno 2, Rapidfire 2', 'rw 61%'],
      ['4-2, lv8', 'Alistar, Aphelios 4, Ezreal 4, Hecarim, LeBlanc, Lillia 4, Ornn, Xayah', 'Elderwood 6 + 3 traits', '6.03 (vertical)'],
      ['lv8 alt', 'swap LeBlanc -> Diana 3', 'Elderwood 5, Lunar 2, Vanguard 2 (6 traits)', '3.37 (wide)']
    ],
    bridges: 'Diana is the decisive bridge: one slot, two new traits.',
    frontback: '4-5 front / 4 back',
    carry: 'Aphelios: Elderwood Emblem + Guinsoo + Kraken (3.93, 11.8k). Ezreal: IE + Last Whisper + Shojin (3.85).',
    why: 'The cleanest natural experiment in the data: same comp, same level, one unit swapped. Elderwood itself only pays at tier 4-5 (2.82 / 1.08), which needs level 9-10 or an emblem.',
    matchups: 'Lobby-robust.',
    econ: 'Level 8 at 4-2, rolls 2.8 at 8 and 3.0 at 9.',
    jump: 'Final level 8 5.87, 9 3.72, 10 1.99.'
  },
  {
    id: 'lunar', name: 'Lunar Aphelios / Nidalee (all-2s board)', plan: 'Fast 8', tag: 'Scaling',
    stats: { avg: 4.38, top4: 54.5, win: 7.4, pick: 0.18, n: 6107 },
    phases: [
      ['2-5, lv5', 'Alistar 2, Ornn 1, Shen 2, Varus 1, Xayah 1', 'Elderwood 3, Defender 2, Inferno 2, Rapidfire 2', 'rw 76%'],
      ['3-6, lv7', 'Aphelios 4, Diana 3, Varus, Amumu 4, Kog\'Maw 3, Nidalee 4, Vi 3', '7 traits on 7 units', 'rw 66%'],
      ['4-2, lv8', '+ Sentinel 4', '9 traits, all at the first breakpoint', '4.95, 16k'],
      ['6-2, lv9', '+ Alune 5', 'Lunar 3 (10 traits)', '3.36']
    ],
    bridges: 'Everything is a bridge; nothing is pushed.',
    frontback: '4 front / 4 back',
    carry: 'Nidalee: Bloodthirster + Edge of Night + Sterak (3.74). Aphelios: Guinsoo + IE + Kraken (4.23).',
    why: 'Counter-example: 9 traits but NO carry trait above its first breakpoint gives only 4.95 at level 8 and a 7.4% win rate. Wide is not enough; the carry trait must also be pushed.',
    matchups: 'Lobby-robust.',
    econ: 'Fast 8 at 4-2 (3.4 rolls at 8).',
    jump: 'Final level 8 5.07 vs level 9 3.33 - the comp only works if it reaches 9 and pushes Lunar to 3.'
  }
];
