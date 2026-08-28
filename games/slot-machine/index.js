(function () {
  window.ArcadeGames = window.ArcadeGames || {};

  window.ArcadeGames['slot-machine'] = {
    init: function (container) {
      let intervalId;
      const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣', '🍉'];

      container.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:20px; font-family:sans-serif; color:#fff; padding-top:40px;">
          <div style="display:flex; gap:15px; background:#16192e; padding:24px; border-radius:16px; border:2px solid rgba(139, 92, 246, 0.3); box-shadow:0 0 25px rgba(139, 92, 246, 0.2);">
            <div id="r1" style="font-size:64px; background:#0b0d19; padding:15px 25px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">💎</div>
            <div id="r2" style="font-size:64px; background:#0b0d19; padding:15px 25px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">💎</div>
            <div id="r3" style="font-size:64px; background:#0b0d19; padding:15px 25px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">💎</div>
          </div>
          <button id="spinBtn" style="padding:14px 40px; font-size:18px; font-weight:bold; background:linear-gradient(135deg, #8b5cf6, #06b6d4); color:#fff; border:none; border-radius:10px; cursor:pointer; box-shadow:0 4px 15px rgba(139, 92, 246, 0.4); transition:transform 0.1s;">SPIN</button>
          <div id="status" style="font-size:20px; height:24px; color:#94a3b8; font-weight:600;"></div>
        </div>
      `;

      const btn = container.querySelector('#spinBtn');
      const r1 = container.querySelector('#r1');
      const r2 = container.querySelector('#r2');
      const r3 = container.querySelector('#r3');
      const status = container.querySelector('#status');

      btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
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
            btn.style.opacity = '1';
            if (r1.textContent === r2.textContent && r2.textContent === r3.textContent) {
              status.style.color = '#38bdf8';
              status.textContent = '🎉 JACKPOT!';
            } else if (r1.textContent === r2.textContent || r2.textContent === r3.textContent || r1.textContent === r3.textContent) {
              status.style.color = '#c084fc';
              status.textContent = '✨ Match 2!';
            } else {
              status.style.color = '#94a3b8';
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
