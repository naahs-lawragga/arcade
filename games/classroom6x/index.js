(function () {
  window.ArcadeGames = window.ArcadeGames || {};
  window.ArcadeGames['classroom6x'] = {
    init: function (container) {
      container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; min-height: 500px; background: #0b0d19; border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 40px; text-align: center;">
          <div style="font-size: 64px; margin-bottom: 16px;">🏫</div>
          <h2 style="font-size: 28px; margin-bottom: 12px; color: #fff;">Classroom 6x</h2>
          <p style="color: #94a3b8; max-width: 460px; margin-bottom: 28px; font-size: 16px; line-height: 1.5;">
            Homework done? Time for fun. Open your ultimate after-school gaming hub in a new tab.
          </p>
          <a href="https://sites.google.com/view/classroom6x/" target="_blank" rel="noopener noreferrer" style="padding: 14px 28px; background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 16px; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);">
            Open Classroom 6x ↗
          </a>
        </div>
      `;

      return {
        destroy() {
          container.innerHTML = '';
        }
      };
    }
  };
})();