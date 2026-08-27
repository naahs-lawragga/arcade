document.addEventListener('DOMContentLoaded', () => {
  const { loadGame, unloadGame } = window.Arcade;
  const games = [
    ['snake','Neon Snake','Eat sparks. Don’t bite your trail.','🐍'],
    ['2048','2048','Slide and combine the tiles.','🔢'],
    ['breakout','Brick Burst','Clear the wall with a ricochet.','🧱'],
    ['flappy-clone','Sky Hopper','Thread the gates.','🐦'],
    ['custom-tetris','Block Fall','Stack, clear, survive.','🟪'],
    ['pong','Pong','A two-paddle classic.','🏓'],
    ['tic-tac-toe','Three in a Row','Take on the arcade brain.','⭕'],
    ['memory-match','Memory Match','Turn over every pair.','🃏'],
    ['fighter-lite','Duel Lite','Couch-versus brawl.','🥊'],
    ['slot-machine','Lucky Lights','A tiny purely-for-fun spinner.','🎰'],
    ['dark-room','Night Watch','Keep the lantern alive.','🕯️'],
    ['runner','Metro Dash','Jump the incoming blocks.','🏃']
  ].map(([slug,title,tagline,icon]) => ({ slug, title, tagline, icon }));

  const home = document.querySelector('#home-view');
  const play = document.querySelector('#play-view');
  const grid = document.querySelector('#game-grid');
  const stage = document.querySelector('#game-stage');
  const title = document.querySelector('#game-title');

  function render() {
    grid.innerHTML = games.map(g => `<article class="game-card"><div class="game-icon" aria-hidden="true">${g.icon}</div><h2>${g.title}</h2><p>${g.tagline}</p><button class="play-button" data-game="${g.slug}">Play</button></article>`).join('');
    grid.querySelectorAll('button').forEach(button => button.addEventListener('click', () => open(button.dataset.game)));
  }

  async function open(slug) {
    const game = games.find(g => g.slug === slug);
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
