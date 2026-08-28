(function () {
  window.ArcadeGames = window.ArcadeGames || {};

  window.ArcadeGames['slot-machine'] = {
    init: function (container) {
      let intervalId;
      const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣', '🍉'];

      container.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:20px; font-family:sans-serif; color:#fff; padding-top:40px;">
          <div style="display:flex; gap:15px; background:#1e293b; padding:20px; border-radius:12px; border:2px solid #334155;">
            <div id="r1" style="font-size:64px; background:#0f172a; padding:10px 20px; border-radius:8px;">💎</div>
            <div id="r2" style="font-size:64px; background:#0f172a; padding:10px 20px; border-radius:8px;">💎</div>
            <div id="r3" style="font-size:64px; background:#0f172a; padding:10px 20px; border-radius:8px;">💎</div>
          </div>
          <button id="spinBtn" style="padding:12px 32px; font-size:18px; font-weight:bold; background:#3b82f6; color:#fff; border:none; border-radius:8px; cursor:pointer;">SPIN</button>
          <div id="status" style="font-size:20px; height:24px;"></div>
        </div>
      `;

      const btn = container.querySelector('#spinBtn');
      const r1 = container.querySelector('#r1');
      const r2 = container.querySelector('#r2');
      const r3 = container.querySelector('#r3');
      const status = container.querySelector('#status');

      btn.addEventListener('click', () => {
        btn.disabled = true;
        status.textContent = 'Spinning...';
        let ticks = 0;

        intervalId = setInterval(() => {
          r1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
          r2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
          r3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
          ticks++;

          if (ticks > 15) {
            clearInterval(intervalId);
            btn.disabled = false;
            if (r1.textContent === r2.textContent && r2.textContent === r3.textContent) {
              status.textContent = '🎉 JACKPOT!';
            } else if (r1.textContent === r2.textContent || r2.textContent === r3.textContent || r1.textContent === r3.textContent) {
              status.textContent = '✨ Match 2!';
            } else {
              status.textContent = 'Try again!';
            }
          }
        }, 80);
      });

      return {
        destroy() {
          if (intervalId) clearInterval(intervalId);
          container.innerHTML = '';
        }
      };
    }
  };
})();
