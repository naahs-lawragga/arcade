(function () {
  window.ArcadeGames = window.ArcadeGames || {};

  window.ArcadeGames['hextris'] = {
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
      let angle = 0, targetAngle = 0;
      let blocks = [], score = 0, gameOver = false;
      const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#eab308'];

      function spawnBlock() {
        const side = Math.floor(Math.random() * 6);
        const color = colors[Math.floor(Math.random() * colors.length)];
        blocks.push({ side, dist: 220, color });
      }

      function handleKeydown(e) {
        if (gameOver && e.code === 'Space') { reset(); return; }
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') targetAngle -= Math.PI / 3;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') targetAngle += Math.PI / 3;
      }

      function reset() {
        blocks = []; score = 0; gameOver = false; angle = 0; targetAngle = 0;
      }

      let spawnTimer = setInterval(() => { if (!gameOver) spawnBlock(); }, 1200);

      function loop() {
        ctx.fillStyle = '#0b0d19';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        angle += (targetAngle - angle) * 0.2;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Center Hexagon
        ctx.save();
        ctx.rotate(angle);
        ctx.strokeStyle = '#8b5cf6';
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          const x = 40 * Math.cos(a);
          const y = 40 * Math.sin(a);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        // Update & Render Blocks
        if (!gameOver) {
          for (let i = blocks.length - 1; i >= 0; i--) {
            const b = blocks[i];
            b.dist -= 1.5;

            if (b.dist <= 45) {
              score += 10;
              blocks.splice(i, 1);
              continue;
            }

            const blockAngle = (b.side * Math.PI) / 3 + angle;
            const bx = b.dist * Math.cos(blockAngle);
            const by = b.dist * Math.sin(blockAngle);

            ctx.fillStyle = b.color;
            ctx.shadowColor = b.color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(bx, by, 10, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 20px monospace';
        ctx.fillText(`Score: ${score}`, 20, 40);

        if (gameOver) {
          ctx.fillStyle = 'rgba(11, 13, 25, 0.85)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#f8fafc';
          ctx.textAlign = 'center';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 10);
          ctx.font = '16px sans-serif';
          ctx.fillStyle = '#94a3b8';
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
          clearInterval(spawnTimer);
          window.removeEventListener('keydown', handleKeydown);
          container.innerHTML = '';
        }
      };
    }
  };
})();