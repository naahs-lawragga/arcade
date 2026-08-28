document.addEventListener('DOMContentLoaded', () => {
  const { loadGame, unloadGame } = window.Arcade;

  const classicsGames = [
    ['real-2048', '2048', 'The real thing — official source by Gabriele Cirulli.', '🔢'],
    ['hextris', 'Hextris', 'The real thing — official fast-paced hexagonal puzzle game.', '🔷'],
    ['space-invaders', 'Space Invaders', 'The real thing — classic retro alien defense.', '👾'],
  ].map(([slug, title, tagline, icon]) => ({ slug, title, tagline, icon, real: true }));

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

  const games = [...classicsGames, ...codexGames];

  const home = document.querySelector('#home-view');
  const play = document.querySelector('#play-view');
  const classicsGrid = document.querySelector('#classics-grid');
  const codexGrid = document.querySelector('#codex-grid');
  const stage = document.querySelector('#game-stage');
  const title = document.querySelector('#game-title');

  function cardHTML(g) {
    return `<article class="game-card">
      ${g.real ? '<span class="badge-real">REAL GAME</span>' : ''}
      <div class="game-icon" aria-hidden="true">${g.icon}</div>
      <h2>${g.title}</h2>
      <p>${g.tagline}</p>
      <button class="play-button" data-game="${g.slug}">Play</button>
    </article>`;
  }

  function renderGrid(container, list) {
    container.innerHTML = list.map(cardHTML).join('');
    container.querySelectorAll('button').forEach(button =>
      button.addEventListener('click', () => open(button.dataset.game))
    );
  }

  function render() {
    renderGrid(classicsGrid, classicsGames);
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
