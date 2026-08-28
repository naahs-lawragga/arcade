(function () {
  window.ArcadeGames = window.ArcadeGames || {};

  window.ArcadeGames['flappy-clone'] = {
    init: function (container) {
      container.innerHTML = '';
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 500;
      canvas.style.display = 'block';
      canvas.style.margin = '0 auto';
      canvas.style.border = '2px solid rgba(139, 92, 246, 0.3)';
      canvas.style.borderRadius = '12px';
      canvas.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.15)';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');

      let animId;
      let birdY = 200, velocity = 0, pipes = [], score = 0, gameOver = false;
      const gravity = 0.22, jump = -5.5, pipeGap = 130, pipeWidth = 50;

      function handleInput(e) {
        if (e.type === 'click' || e.code === 'Space') {
          if (gameOver) reset();
          else velocity = jump;
        }
      }

      function reset() {
        birdY = 200; velocity = 0; pipes = []; score = 0; gameOver = false;
      }

      function loop() {
        ctx.fillStyle = '#0b0d19';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!gameOver) {
          velocity += gravity;
          birdY += velocity;

          if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
            const topH = Math.floor(Math.random() * (canvas.height - pipeGap - 100)) + 40;
            pipes.push({ x: canvas.width, top: topH, passed: false });
          }

          pipes.forEach(pipe => {
            pipe.x -= 1.8;
            if (!pipe.passed && pipe.x < 100) {
              score++;
              pipe.passed = true;
            }

            if (100 + 14 > pipe.x && 100 - 14 < pipe.x + pipeWidth) {
              if (birdY - 14 < pipe.top || birdY + 14 > pipe.top + pipeGap) {
                gameOver = true;
              }
            }
          });

          if (pipes.length > 0 && pipes[0].x + pipeWidth < 0) pipes.shift();
          if (birdY < 0 || birdY > canvas.height) gameOver = true;
        }

        // Purple Obstacles/Pipes
        ctx.fillStyle = '#8b5cf6';
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 6;
        pipes.forEach(pipe => {
          ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
          ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
        });

        // Cyan Glowing Player Bird
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(100, birdY, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 24px monospace';
        ctx.fillText(`Score: ${score}`, 20, 40);

        if (gameOver) {
          ctx.fillStyle = 'rgba(11, 13, 25, 0.85)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#f8fafc';
          ctx.textAlign = 'center';
          ctx.font = '20px sans-serif';
          ctx.fillText('Game Over! Click or Space to Restart', canvas.width / 2, canvas.height / 2);
          ctx.textAlign = 'left';
        }

        animId = requestAnimationFrame(loop);
      }

      window.addEventListener('keydown', handleInput);
      canvas.addEventListener('click', handleInput);
      loop();

      return {
        destroy() {
          cancelAnimationFrame(animId);
          window.removeEventListener('keydown', handleInput);
          canvas.removeEventListener('click', handleInput);
          container.innerHTML = '';
        }
      };
    }
  };
})();
