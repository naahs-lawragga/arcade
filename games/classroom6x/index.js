(function () {
  window.ArcadeGames = window.ArcadeGames || {};
  window.ArcadeGames['classroom6x'] = {
    init: function (container) {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
          <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 10px;">
            <button id="c6x-fullscreen-btn" style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
              Fullscreen ⛶
            </button>
          </div>
          <iframe 
            id="c6x-iframe"
            src="https://sites.google.com/view/classroom6x/" 
            style="width: 100%; height: 620px; border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 12px; background: #0b0d19; display: block;"
            allowfullscreen
          ></iframe>
        </div>
      `;

      const iframe = container.querySelector('#c6x-iframe');
      const fullscreenBtn = container.querySelector('#c6x-fullscreen-btn');

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