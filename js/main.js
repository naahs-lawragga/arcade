document.addEventListener('DOMContentLoaded', () => {
  const { loadGame, unloadGame } = window.Arcade;

  const classicsGames = [
    ['real-2048', '2048', 'The real thing — official source by Gabriele Cirulli.', '🔢'],
    ['hextris', 'Hextris', 'The real thing — official fast-paced hexagonal puzzle game.', '🔷'],
    ['space-invaders', 'Space Invaders', 'The real thing — classic retro alien defense.', '👾'],
  ].map(([slug, title, tagline, icon]) => ({ slug, title, tagline, icon, real: true, badgeText: 'REAL GAME' }));

  const playtropolisIcon = `<svg viewBox="0 0 100 100" width="1em" height="1em" style="display: inline-block; vertical-align: middle;">
    <circle cx="50" cy="50" r="48" fill="#6366f1"/>
    <path d="M 32 25 L 68 33 L 73 54 L 54 59 L 52 46 L 43 44 L 38 75 L 26 72 Z M 44 34 L 46 40 L 53 42 L 54 36 Z" fill="#ffffff"/>
  </svg>`;

  const classroomIcon = `<svg viewBox="0 0 100 100" width="1em" height="1em" style="display: inline-block; vertical-align: middle;">
    <rect x="10" y="15" width="80" height="70" rx="10" fill="#0f9d58"/>
    <rect x="16" y="21" width="68" height="58" rx="6" fill="#e8f5e9"/>
    <rect x="22" y="27" width="56" height="46" rx="4" fill="#0f9d58"/>
    <path d="M 50 38 A 7 7 0 1 0 50 52 A 7 7 0 1 0 50 38 Z M 36 65 C 36 57 43 54 50 54 C 57 54 64 57 64 65 Z" fill="#f4b400"/>
    <path d="M 36 42 A 5 5 0 1 0 36 52 A 5 5 0 1 0 36 42 Z M 26 63 C 26 57 31 54 36 54 C 39 54 42 55 44 57 C 42 60 41 63 41 65 L 26 65 Z" fill="#ffffff" opacity="0.9"/>
    <path d="M 64 42 A 5 5 0 1 0 64 52 A 5 5 0 1 0 64 42 Z M 74 63 C 74 57 69 54 64 54 C 61 54 58 55 56 57 C 58 60 59 63 59 65 L 74 65 Z" fill="#ffffff" opacity="0.9"/>
  </svg>`;

  const launcherGames = [
    ['playtropolis', 'Playtropolis', 'Pure fun, zero ads—instant play on any device.', playtropolisIcon],
    ['pizza-edition', 'The Pizza Edition', 'Browser games with zero downloads or accounts.', '🍕'],
    ['classroom6x', 'Classroom 6x', 'Homework done? Time for fun. Your ultimate gaming hub.', classroomIcon],
  ].map(([slug, title, tagline, icon]) => ({ slug, title, tagline, icon, real: true, badgeText: 'GAME LAUNCHER' }));

  const codexGames = [
    ['snake', 'Snake', 'Eat sparks. Don’t bite your trail.', '🐍'],
    ['breakout', 'Brick Burst', 'Clear the wall with a ricochet.', '🧱'],
    ['flappy-clone', 'Flappy Bird', 'Thread the gates.', '🐦'],
    ['custom-tetris', 'Tetris', 'Stack, clear, survive.', '🟪'],
    ['pong', 'Pong', 'A two-paddle classic.', '🏓'],
    ['tic-tac-toe', 'Tic-Tac-Toe', 'Take on the arcade brain.', '⭕'],
    ['memory-match', 'Memory Match', 'Turn over every pair.', '🃏'],
    ['fighter-lite', 'Duel Lite', 'Couch-versus brawl.', '🥊'],
    ['slot-machine', 'Lucky Lights', 'A tiny purely-for-fun spinner.', '🎰'],
    ['dark-room', 'Night Watch', 'Keep the lantern alive.', '🕯️'],
    ['runner', 'JagDev Runner', 'Dodge, jump, and dash through the course.', '🏃'],
  ].map(([slug, title, tagline, icon]) => ({ slug, title, tagline, icon, real: false }));

  const games = [...classicsGames, ...launcherGames, ...codexGames];

  const home = document.querySelector('#home-view');
  const play = document.querySelector('#play-view');
  const classicsGrid = document.querySelector('#classics-grid');
  const launchersGrid = document.querySelector('#launchers-grid');
  const codexGrid = document.querySelector('#codex-grid');
  const stage = document.querySelector('#game-stage');
  const title = document.querySelector('#game-title');

  function cardHTML(g) {
    return `<article class="game-card">
      ${g.real ? `<span class="badge-real">${g.badgeText}</span>` : ''}
      <div class="game-icon" aria-hidden="true">${g.icon}</div>
      <h2>${g.title}</h2>
      <p>${g.tagline}</p>
      <button class="play-button" data-game="${g.slug}">Play</button>
    </article>`;
  }

  function renderGrid(container, list) {
    if (!container) return;
    container.innerHTML = list.map(cardHTML).join('');
    container.querySelectorAll('button').forEach(button =>
      button.addEventListener('click', () => open(button.dataset.game))
    );
  }

  function render() {
    renderGrid(classicsGrid, classicsGames);
    renderGrid(launchersGrid, launcherGames);
    renderGrid(codexGrid, codexGames);
  }

  async function open(slug) {
    const game = games.find(g => g.slug === slug);
    if (!game) return;
    home.hidden = true;
    play.hidden = false;
    title.textContent = game.title;
    stage.replaceChildren();
    history.replaceState(null, '', `#${slug}`);
    await loadGame(game, stage);
  }

  function close() {
    unloadGame();
    stage.replaceChildren();
    play.hidden = true;
    home.hidden = false;
    history.replaceState(null, '', location.pathname);
  }

  document.querySelector('#back-button').addEventListener('click', close);
  document.querySelector('#restart-button').addEventListener('click', () => {
    const slug = location.hash.slice(1);
    if (slug) open(slug);
  });
  window.addEventListener('hashchange', () => {
    const slug = location.hash.slice(1);
    slug && games.some(g => g.slug === slug) ? open(slug) : close();
  });

  render();
  if (location.hash) open(location.hash.slice(1));
});