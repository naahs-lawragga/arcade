# Arcade

A **static, no-dependency browser game hub**. Every playable entry is **native DOM or Canvas code** dynamically imported into one in-page shell. It includes curated open-source classics, external web game launchers, and custom-built arcade games.

## Run locally & deployment

1. **Extract the folder:** Unzip or extract the downloaded arcade folder before attempting to run or deploy it.
2. **Run locally:** Open **`index.html`** directly in a modern browser, or serve the **`arcade/`** folder with any static web server. Both paths work; the loader uses ordinary local scripts so a double-click does not run into browser module restrictions.
3. **Deploy online:** Upload this extracted folder to **Vercel**, **Netlify**, or any free hosting website to get a live domain. Vercel hosting is recommended because Vercel domains are typically unblocked on school networks, allowing you to access your arcade anywhere.
4. **Google Sites / Presentation embedding:** Because security policies block direct iframe embedding of external websites or folders, you can add your hosted Vercel link onto a Google Sites page or slide deck using a clean launcher button or external link.

## Game Categories

### Open-Source

| Game | Description | Status |
| --- | --- | --- |
| **2048** | The real thing — official source by Gabriele Cirulli. | Real Game |
| **Hextris** | The real thing — official fast-paced hexagonal puzzle game. | Real Game |
| **Space Invaders** | The real thing — classic retro alien defense. | Real Game |

### Game Launchers

| Launcher | Description | Status |
| --- | --- | --- |
| **Playtropolis** | Pure fun, zero ads—instant play on any device. | Game Launcher |
| **The Pizza Edition** | Browser games with zero downloads or accounts. | Game Launcher |

### Coded Originals

| Game | Description | Status |
| --- | --- | --- |
| **Snake** | Eat sparks. Don't bite your trail. | Coded Original |
| **Brick Burst** | Clear the wall with a ricochet. | Coded Original |
| **Flappy Bird** | Thread the gates. | Coded Original |
| **Tetris** | Stack, clear, survive. | Coded Original |
| **Pong** | A two-paddle classic. | Coded Original |
| **Tic-Tac-Toe** | Take on the arcade brain. | Coded Original |
| **Memory Match** | Turn over every pair. | Coded Original |
| **Duel Lite** | Couch-versus brawl. | Coded Original |
| **Lucky Lights** | A tiny purely-for-fun spinner. | Coded Original |
| **Night Watch** | Keep the lantern alive. | Coded Original |
| **JagDev Runner** | Dodge, jump, and dash through the course. | Coded Original |

## Architecture

* **`js/main.js`** owns the game catalog, client-side view switching, and route hash.
* **`js/gameLoader.js`** loads a game script on demand and calls its `init(container)` function; changing games calls `destroy()` and removes its stylesheet.
* **`js/shared/input.js`** centralizes keyboard state plus swipe detection.
* **`js/shared/storage.js`** persists each game’s best score with namespaced `localStorage` keys.

## License

Copyright © 2026 Naahs Lawragga.

This project is released under the **MIT License**. You are free to use, play, and host this project free of charge. However, you may not pass this project off as your own original creation. Anyone hosting or distributing this code must include the original copyright notice and credit to Naahs Lawragga, as detailed in the `LICENSE` file.