(function () {
  window.ArcadeGames = window.ArcadeGames || {};
  window.ArcadeGames['playtropolis'] = {
    init: function (container) {
      container.innerHTML = `
        <iframe 
          src="https://playtropolis.com/" 
          style="width: 100%; height: 620px; border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 12px; background: #0b0d19; display: block; margin: 0 auto;"
          allowfullscreen
        ></iframe>
      `;
      return {
        destroy() {
          container.innerHTML = '';
        }
      };
    }
  };
})();