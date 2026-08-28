(function () {
  window.ArcadeGames = window.ArcadeGames || {};

  window.ArcadeGames['space-invaders'] = {
    init: function (container) {
      container.innerHTML = '';

      const canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 500;
      canvas.style.display = 'block';
      canvas.style.margin = '0 auto';
      canvas.style.border = '2px solid rgba(139, 92, 246, 0.3)';
      canvas.style.borderRadius = '12px';
      canvas.style.boxShadow = '0 0 25px rgba(139, 92, 246, 0.15)';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      let animId;
      let playerX = 230, bullets = [], aliens = [], score = 0, gameOver = false;
      const keys = {};

      function spawnAliens() {
        aliens = [];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 7; c++) {
            aliens.push({ x: 50 + c * 55, y: 40 + r * 40, alive: true });
          }
        }
      }

      function handleKeydown(e) {
        keys[e.code] = true;
        if (e.code === 'Space' && !gameOver) {
          bullets.push({ x: playerX + 20, y: 440 });
        }
        if (gameOver && e.code === 'Space') { reset(); }
      }

      function handleKeyup(e) { keys[e.code] = false; }

      function reset() {
        playerX = 230; bullets = []; score = 0; gameOver = false; spawnAliens();
      }

      function loop() {
        ctx.fillStyle = '#0b0d19';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!gameOver) {
          if (keys['ArrowLeft'] || keys['KeyA']) playerX = Math.max(10, playerX - 5);
          if (keys['ArrowRight'] || keys['KeyD']) playerX = Math.min(canvas.width - 50, playerX + 5);

          // Bullets
          for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            b.y -= 7;
            if (b.y < 0) bullets.splice(i, 1);

            aliens.forEach(a => {
              if (a.alive && b.x > a.x && b.x < a.x + 35 && b.y > a.y && b.y < a.y + 25) {
                a.alive = false;
                bullets.splice(i, 1);
                score += 20;
              }
            });
          }

          if (aliens.every(a => !a.alive)) spawnAliens();
        }

        // Draw Player
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.fillRect(playerX, 450, 40, 15);

        // Draw Bullets
        ctx.fillStyle = '#ec4899';
        ctx.shadowColor = '#ec4899';
        bullets.forEach(b => ctx.fillRect(b.x - 2, b.y, 4, 10));

        // Draw Aliens
        ctx.fillStyle = '#8b5cf6';
        ctx.shadowColor = '#8b5cf6';
        aliens.forEach(a => {
          if (a.alive) ctx.fillRect(a.x, a.y, 35, 25);
        });

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(`Score: ${score}`, 15, 30);

        if (gameOver) {
          ctx.fillStyle = 'rgba(11, 13, 25, 0.85)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#f8fafc';
          ctx.textAlign = 'center';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('Defeated!', canvas.width / 2, canvas.height / 2 - 10);
          ctx.font = '16px sans-serif';
          ctx.fillStyle = '#94a3b8';
          ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 25);
          ctx.textAlign = 'left';
        }

        animId = requestAnimationFrame(loop);
      }

      window.addEventListener('keydown', handleKeydown);
      window.addEventListener('keyup', handleKeyup);
      spawnAliens();
      loop();

      return {
        destroy() {
          cancelAnimationFrame(animId);
          window.removeEventListener('keydown', handleKeydown);
          window.removeEventListener('keyup', handleKeyup);
          container.innerHTML = '';
        }
      };
    }
  };
})();