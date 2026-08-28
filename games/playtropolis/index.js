(function () {
  window.ArcadeGames = window.ArcadeGames || {};
  window.ArcadeGames['playtropolis'] = {
    init: function (container) {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
          <div style="width: 100%; display: flex; justify: flex-end; margin-bottom: 10px;">
            <button id="playtropolis-fullscreen-btn" style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
              Fullscreen ⛶
            </button>
          </div>
          <iframe 
            id="playtropolis-iframe"
            src="https://playtropolis.com/" 
            style="width: 100%; height: 620px; border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 12px; background: #0b0d19; display: block;"
            allowfullscreen
          ></iframe>
        </div>
      `;

      const iframe = container.querySelector('#playtropolis-iframe');
      const fullscreenBtn = container.querySelector('#playtropolis-fullscreen-btn');

      fullscreenBtn.addEventListener('click', () => {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) { /* Safari */
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { /* IE11 */
          iframe.msRequestFullscreen();
        }
      });

      return {
        destroy() {
          container.innerHTML = '';
        }
      };
    }
  };
})();