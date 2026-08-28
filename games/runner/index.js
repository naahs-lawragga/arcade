(function () {
  window.ArcadeGames = window.ArcadeGames || {};

  window.ArcadeGames.runner = {
    init: function (container) {
      container.innerHTML = '';
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 500;
      canvas.style.display = 'block';
      canvas.style.margin = '0 auto';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      let animId;
      let currentLane = 1, isJumping = false, jumpY = 0, jumpVel = 0, score = 0, obstacles = [], gameOver = false;
      const lanes = [100, 200, 300];

      function handleKeydown(e) {
        if (gameOver && e.code === 'Space') { reset(); return; }
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') currentLane = Math.max(0, currentLane - 1);
        if (e.code === 'ArrowRight' || e.code === 'KeyD') currentLane = Math.min(2, currentLane + 1);
        if ((e.code === 'Space' || e.code === 'ArrowUp') && !isJumping) {
          isJumping = true;
          jumpVel = 12;
        }
      }

      function reset() {
        currentLane = 1; isJumping = false; jumpY = 0; jumpVel = 0; score = 0; obstacles = []; gameOver = false;
      }

      function loop() {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#334155';
        ctx.setLineDash([10, 10]);
        [150, 250].forEach(x => {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        });
        ctx.setLineDash([]);

        if (!gameOver) {
          score++;
          if (isJumping) {
            jumpY += jumpVel;
            jumpVel -= 0.8;
            if (jumpY <= 0) { jumpY = 0; isJumping = false; }
          }

          if (Math.random() < 0.03) {
            obstacles.push({ lane: Math.floor(Math.random() * 3), y: -40 });
          }

          for (let i = obstacles.length - 1; i >= 0; i--) {
            const obs = obstacles[i];
            obs.y += 6;
            if (obs.y > canvas.height) obstacles.splice(i, 1);

            if (obs.lane === currentLane && obs.y > 420 && obs.y < 480 && jumpY < 25) {
              gameOver = true;
            }
          }
        }

        ctx.fillStyle = '#ef4444';
        obstacles.forEach(obs => {
          ctx.fillRect(lanes[obs.lane] - 20, obs.y, 40, 40);
        });

        const playerX = lanes[currentLane];
        const playerY = 450 - jumpY;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(playerX - 15, playerY - 30, 30, 30);

        ctx.fillStyle = '#fff';
        ctx.font = '20px monospace';
        ctx.fillText(`Distance: ${score}m`, 10, 30);

        if (gameOver) {
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('JagDev Crashed!', canvas.width / 2, canvas.height / 2 - 10);
          ctx.font = '16px sans-serif';
          ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 25);
          ctx.textAlign = 'left';
        }

        animId = requestAnimationFrame(loop);
      }

      window.addEventListener('keydown', handleKeydown);
      loop();

      return {
        destroy() {
          cancelAnimationFrame(animId);
          window.removeEventListener('keydown', handleKeydown);
          container.innerHTML = '';
        }
      };
    }
  };
})();
