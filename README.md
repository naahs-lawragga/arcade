# Arcade

A static, no-dependency browser game hub. Every playable entry is native DOM or Canvas code dynamically imported into one in-page shell. There are no iframes, embedded third-party games, network calls, copied sprites, sound effects, or external game bundles.

## Run locally

Open `index.html` directly in a modern browser, or serve the `arcade/` folder with any static web server. Both paths work; the loader uses ordinary local scripts so a double-click does not run into browser module restrictions.

## Playable games

| Game | Description | Status |
| --- | --- | --- |
| Snake | Grid-based spark-eating arcade game | Built for Arcade |
| 2048 | Slide equal numbered tiles together | Built for Arcade; the name/concept is separately represented by the MIT original below, but no upstream code was copied |
| Brick Burst | Canvas paddle-and-brick game | Built for Arcade |
| Sky Hopper | Tap-to-flap obstacle game | Built for Arcade |
| Block Fall | Falling-block line clearer | Built for Arcade |
| Pong | Two-player local paddle match | Built for Arcade |
| Three in a Row | DOM board game against a light CPU | Built for Arcade |
| Memory Match | Turn over matching emoji pairs | Built for Arcade |
| Duel Lite | Two-player local canvas brawler | Built for Arcade |
| Lucky Lights | Non-monetary three-reel spinner | Built for Arcade |
| Night Watch | Tiny text-and-button survival loop | Built for Arcade |
| Metro Dash | One-button obstacle runner | Built for Arcade |

## Upstream license survey

The requested title search was performed before deciding what to include. **No repository code or assets were adapted into this project**; the table is retained for traceability and to make later, deliberate adaptation safer. “Not included” means it was not copied, not that the game is unavailable elsewhere.

| Requested project | Candidate source reviewed | License result | Decision |
| --- | --- | --- | --- |
| 2048 | [gabrielecirulli/2048](https://github.com/gabrielecirulli/2048) | MIT | Not copied; independently built implementation |
| JavaScript Snake | [gamedolphin/javascript_snake](https://github.com/gamedolphin/JavaScript_snake) | MIT | Not copied; independently built implementation |
| Coffee Snake | Search did not produce an unambiguous repository with a clear permitted license | Unverified | Skipped |
| Clumsy Bird | [ellisonleao/clumsy-bird](https://github.com/ellisonleao/clumsy-bird) | MIT | Not copied; independently built Sky Hopper |
| HTML5 multiplayer Breakout | Search did not identify an unambiguous, clearly permissive candidate | Unverified | Skipped; Brick Burst is built |
| Custom Tetris | ondras/custom-tetris candidate | No clear permitted license located during review | Skipped; Block Fall is built |
| HexGL | [BKcore/HexGL](https://github.com/BKcore/HexGL) | MIT for code/resources unless otherwise specified | Not copied; requires separate 3D integration/assets review |
| JavaScript Racer | [jakesgordon/javascript-racer](https://github.com/jakesgordon/javascript-racer) | License not confirmed in this review | Skipped |
| mk.js | [mgechev/mk.js](https://github.com/mgechev/mk.js) | MIT | Not copied; Duel Lite is built |
| DuckHunt-JS | [MattSurabian/DuckHunt-JS](https://github.com/MattSurabian/DuckHunt-JS) | MIT | Not copied; its recognizable original-game assets are intentionally not used |
| HTML5 Slot Machine | [johakr/html5-slot-machine](https://github.com/johakr/html5-slot-machine) | MIT | Not copied; Lucky Lights is built |
| A Dark Room | [doublespeakgames/adarkroom](https://github.com/doublespeakgames/adarkroom) | MPL-2.0 (not in allowed set) | Skipped; Night Watch is built, unrelated writing/design |
| Captain Rogers | Search did not identify a source project with a clear permitted license | Unverified | Skipped |
| Chromacore | [Murkantilism/Chromacore](https://github.com/Murkantilism/Chromacore) | MIT | Not copied; requires Unity/platform build migration review |
| Jolly Jumper | Search did not identify an unambiguous source project with a clear permitted license | Unverified | Skipped |
| Color Quest | Search did not identify an unambiguous source project with a clear permitted license | Unverified | Skipped |
| Coil | [leereilly/Coil](https://github.com/leereilly/Coil) | MIT | Not copied; needs a separate adaptation pass |
| CanyonRunner | Search did not identify an unambiguous source project with a clear permitted license | Unverified | Skipped |
| d3shooter | Search did not identify an unambiguous source project with a clear permitted license | Unverified | Skipped |
| Circus Charlie | eugenioclrc/circushtml5 candidate | License not confirmed in this review | Skipped |

## Architecture

- `js/main.js` owns the game catalog, client-side view switching, and route hash.
- `js/gameLoader.js` loads a game script on demand and calls its `init(container)` function; changing games calls `destroy()` and removes its stylesheet.
- `js/shared/input.js` centralizes keyboard state plus swipe detection.
- `js/shared/storage.js` persists each game’s best score with namespaced `localStorage` keys.
- Each `games/<slug>/index.js` exports `init(container)` and returns `{ destroy() }`.

## Project license

The original Arcade hub code in this folder is released under the MIT License. The playable games are original work for this project, not ports of the surveyed repositories.
