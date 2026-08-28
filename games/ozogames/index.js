(function () {
  window.ArcadeGames = window.ArcadeGames || {};
  window.ArcadeGames['ozogames'] = {
    init: function (container) {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
          <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 10px;">
            <button id="ozo-fullscreen-btn" style="padding: 8px 16px; background: #10b981; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
              Fullscreen ⛶
            </button>
          </div>
          <iframe 
            id="ozo-iframe"
            src="https://ozogames.com/" 
            style="width: 100%; height: 620px; border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 12px; background: #0b0d19; display: block;"
            allowfullscreen
          ></iframe>
        </div>
      `;

      const iframe = container.querySelector('#ozo-iframe');
      const fullscreenBtn = container.querySelector('#ozo-fullscreen-btn');

      fullscreenBtn.addEventListener('click', () => {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
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